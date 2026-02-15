/*
    Rotary Knob Component
    Creates an interactive rotary knob with vertical drag control
*/
export class RotaryKnob {
    // Static flag to track if any knob is currently being dragged
    static isAnyKnobDragging = false;

    constructor(canvasId, name, patchConnection, callbackWhenValueChanges, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found.`);
        }
        this.ctx = this.canvas.getContext('2d');
        this.name = name;
        this.patchConnection = patchConnection;
        this.callbackWhenValueChanges = callbackWhenValueChanges;
        // Configurable options
        this.min = options.min || 0;
        this.max = options.max || 1;
        this.value = options.defaultValue || this.min;
        this.defaultValue = options.defaultValue || this.min;
        this.step = options.step || 0.01;
        this.knobColor = options.knobColor || '#667eea';
        this.trackColor = options.trackColor || '#ffffffff';
        this.sensitivity = options.sensitivity || 0.005; // How fast it responds to movement
        this.displayFormatter = options.displayFormatter || null; // Custom display formatter function
        this.middleValue = options.middleValue || null; // Value at middle position for non-linear scaling
        
        // Dragging state
        this.isDragging = false;
        this.startY = 0;
        this.shiftKeyWasPressed = false;
        
        // Create tooltip element
        this.tooltip = this.createTooltip();
        this.tooltipHideTimeout = null;
        
        // Bind event handlers
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('dblclick', this.onDoubleClick.bind(this));
        this.canvas.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));


        // Canvas sizing - defer until CSS is loaded and size is available
        this.resizeAttempts = 0;
        this.resizeWithRetry();
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'knob-tooltip';
        tooltip.style.position = 'fixed';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '10000';
        tooltip.style.pointerEvents = 'none';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    showTooltip(e = null) {
        if (this.tooltipHideTimeout) {
            clearTimeout(this.tooltipHideTimeout);
            this.tooltipHideTimeout = null;
        }
        
        this.updateTooltipContent();
        this.tooltip.style.display = 'block';
        
        // Position to the right of the canvas
        const rect = this.canvas.getBoundingClientRect();
        this.tooltip.style.left = (rect.right + 10) + 'px';
        this.tooltip.style.top = (rect.top + rect.height / 2) + 'px';
        this.tooltip.style.transform = 'translateY(-50%)';
    }

    hideTooltip() {
        if (this.tooltipHideTimeout) {
            clearTimeout(this.tooltipHideTimeout);
        }
        this.tooltipHideTimeout = setTimeout(() => {
            this.tooltip.style.display = 'none';
        }, 200);
    }

    updateTooltipContent() {
        if (this.displayFormatter) {
            this.tooltip.textContent = this.displayFormatter(this.value);
        } else {
            const decimals = Math.max(0, -Math.floor(Math.log10(this.step)));
            this.tooltip.textContent = this.value.toFixed(decimals);
        }
    }

    resizeWithRetry() {
        requestAnimationFrame(() => {
            const rect = this.canvas.getBoundingClientRect();
            let size = Math.round(rect.width);

            // Sometimes it's 300 the first time it's loaded
            if (size < 10 || size > 200) {
                this.resizeAttempts++;
                if (this.resizeAttempts < 10) {
                    // Retry with increasing delays
                    setTimeout(() => this.resizeWithRetry(), Math.min(100 * this.resizeAttempts, 200));
                    return;
                } else {
                    // Fallback: use default size from CSS (45px)
                    size = 45;
                    this.resizeAttempts = 0;
                    this.knobColor = '#ff0000'; // Red color to indicate fallback sizing
                    console.warn(`[RotaryKnob] Failed to detect valid canvas size after multiple attempts. Falling back to default size: ${size}px`);
                }
            } else {
                this.resizeAttempts = 0;
            }
            
            this.resizeCanvas(size);
            this.draw();
        });
    }
    
    resizeCanvas(size = null) {        
        // Force square canvas to keep knobs circular
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 2;
    }

    setKnobColor(color) {
        this.knobColor = color;
        this.draw();
    }
    
    // Convert value to normalized position (0 to 1) using exponential scaling if middleValue is set
    valueToNormalized(value) {
        if (!this.middleValue || this.middleValue === (this.min + this.max) / 2) {
            // Linear scaling
            return (value - this.min) / (this.max - this.min);
        }
        
        // Clamp to valid range
        value = Math.max(this.min, Math.min(this.max, value));
        
        // Exponential scaling with two curves meeting at middleValue
        if (value < this.middleValue) {
            // Lower half: exponential from min to middleValue
            const ratio = Math.log(value / this.min) / Math.log(this.middleValue / this.min);
            return ratio * 0.5;
        } else if (value > this.middleValue) {
            // Upper half: exponential from middleValue to max
            const ratio = Math.log(value / this.middleValue) / Math.log(this.max / this.middleValue);
            return 0.5 + ratio * 0.5;
        } else {
            // Exactly at middleValue
            return 0.5;
        }
    }
    
    // Convert normalized position (0 to 1) to value using exponential scaling if middleValue is set
    normalizedToValue(normalized) {
        if (!this.middleValue || this.middleValue === (this.min + this.max) / 2) {
            // Linear scaling
            return this.min + normalized * (this.max - this.min);
        }
        
        // Clamp to valid range
        normalized = Math.max(0, Math.min(1, normalized));
        
        // Debug
        const isLower = normalized < 0.5;
        const isUpper = normalized > 0.5;
        const isExact = !isLower && !isUpper;
        
        // Exponential scaling with two curves meeting at middleValue
        if (isLower) {
            // Lower half: exponential from min to middleValue
            const ratio = normalized * 2; // 0 to 1
            const result = this.min * Math.pow(this.middleValue / this.min, ratio);
            return result;
        } else if (isUpper) {
            // Upper half: exponential from middleValue to max
            const ratio = (normalized - 0.5) * 2; // 0 to 1
            const power = this.max / this.middleValue;
            const powResult = Math.pow(power, ratio);
            const result = this.middleValue * powResult;
            return result;
        } else {
            // Exactly at 0.5
            return this.middleValue;
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Calculate rotation angle based on value
        const normalizedValue = this.valueToNormalized(this.value);
        const startAngle = 0.75 * Math.PI; // Start at 7:30 position
        const endAngle = 2.25 * Math.PI; // End at 4:30 position
        const angleRange = endAngle - startAngle;
        const currentAngle = startAngle + normalizedValue * angleRange;
        
        // Draw outer track (inactive range)
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
        this.ctx.strokeStyle = this.trackColor;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        // Draw active value arc
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, startAngle, currentAngle);
        this.ctx.strokeStyle = this.knobColor;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        // Draw inner knob body (flat circle)
        const knobRadius = this.radius * 0.65;
        

        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetY = 8;
        this.ctx.shadowOffsetX = 3;

        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, knobRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#cce6e7";
       //  this.ctx.fillStyle = this.trackColor;
        this.ctx.fill();
        

        this.ctx.shadowColor = 'transparent';

        // Draw knob border
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, knobRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = this.trackColor;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Draw position indicator (line from center to edge)
        const notchLength = knobRadius * 0.7;
        const notchX = this.centerX + Math.cos(currentAngle) * notchLength;
        const notchY = this.centerY + Math.sin(currentAngle) * notchLength;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.lineTo(notchX, notchY);
        this.ctx.strokeStyle = this.knobColor;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        // Draw center dot
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 4, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.knobColor;
        this.ctx.fill();
    }

    onMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if click is within the knob area
        const dist = (x - this.centerX) ** 2 + (y - this.centerY) ** 2;
        if (dist <= (this.radius ** 2)) {
            this.isDragging = true;
            RotaryKnob.isAnyKnobDragging = true;
            this.startY = e.clientY;
            this.initValue = this.value;
            this.shiftKeyWasPressed = e.shiftKey;
            this.showTooltip(e);
        }
    }
    
    onMouseMove(e) {
        if (!this.isDragging) return;

        // Detect shift key state change and reset reference point to prevent jumps
        if (e.shiftKey !== this.shiftKeyWasPressed) {
            this.startY = e.clientY;
            this.initValue = this.value;
            this.shiftKeyWasPressed = e.shiftKey;
        }

        let delta = - (e.clientY - this.startY) * this.sensitivity;
        
        // Fine control with SHIFT key
        if (e.shiftKey) {
            delta = delta / 10;
        }
        
        const initNormalized = this.valueToNormalized(this.initValue);
        const newNormalized = Math.max(0, Math.min(1, initNormalized + delta));
        const rawValue = this.normalizedToValue(newNormalized);
        
        // Round to nearest step
        const steppedValue = Math.round(rawValue / this.step) * this.step;
        this.value = Math.max(this.min, Math.min(this.max, steppedValue));        

        this.draw();
        this.updateDisplay();
        this.updateTooltipContent();
        this.sendValue();
    }


    onMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            RotaryKnob.isAnyKnobDragging = false;
            this.hideTooltip();
        }
    }
    
    onMouseEnter(e) {
        // Don't show tooltip if any knob is being dragged
        if (!this.isDragging && !RotaryKnob.isAnyKnobDragging) {
            this.showTooltip(e);
        }
    }

    onMouseLeave() {
        if (!this.isDragging) {
            this.hideTooltip();
        }
    }
    
    onPointerLockChange() {
        // Placeholder for pointer lock change events
    }
    
    onDoubleClick() {
        this.value = this.defaultValue;
        this.draw();
        this.updateDisplay();
        this.sendValue();
    }
    
    updateDisplay() {
        const displayElement = document.getElementById(`${this.name}-value`);
        if (displayElement) {
            if (this.displayFormatter) {
                displayElement.textContent = this.displayFormatter(this.value);
            } else {
                // Calculate number of decimal places based on step
                const decimals = Math.max(0, -Math.floor(Math.log10(this.step)));
                displayElement.textContent = this.value.toFixed(decimals);
            }
        }
    }
    
    sendValue() {
        this.callbackWhenValueChanges(this.value);
    }
    
    setValue(value) {
        // Ignore external updates while dragging to prevent display flickering
        if (this.isDragging) return false;
        // If no change, do nothing
        if (value === this.value) return false;
        
        this.value = Math.max(this.min, Math.min(this.max, value));
        this.draw();
        this.updateDisplay();
        this.updateTooltipContent();
        return true;
    }
}
