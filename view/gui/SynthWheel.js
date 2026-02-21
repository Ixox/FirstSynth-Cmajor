/**
 * SynthWheel - A visual MIDI wheel control (like pitch bend or mod wheel)
 * Displays as a vertical slider that can be manipulated
 */
export class SynthWheel {
    constructor(canvasElement, options = {}) {
        this.canvas = canvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.value = options.initialValue || 0; // -1 to 1 for pitch bend, 0 to 1 for mod wheel
        this.isDragging = false;
        this.wheelLabel = options.label || 'Wheel';
        this.isBipolar = options.bipolar !== false; // pitch bend is bipolar, mod wheel is unipolar
        
        // Set canvas size
        this.canvas.width = 20;
        this.canvas.height = 140;
        
        // Setup event listeners
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('mouseleave', (e) => this.onMouseUp(e));
        
        // Touch support
        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
        
        this.draw();
    }

    setValue(value) {
        this.value = Math.max(this.isBipolar ? -1 : 0, Math.min(1, value));
        this.draw();
    }

    getValue() {
        return this.value;
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.handleInput(e);
    }

    onMouseMove(e) {
        if (this.isDragging) {
            this.handleInput(e);
        }
    }

    onMouseUp(e) {
        this.isDragging = false;
        // Reset to center when released (for pitch bend)
        if (this.isBipolar) {
            this.value = 0;
        }
        this.draw();
    }

    onTouchStart(e) {
        this.isDragging = true;
        this.handleInput(e.touches[0]);
    }

    onTouchMove(e) {
        if (this.isDragging) {
            this.handleInput(e.touches[0]);
        }
    }

    onTouchEnd(e) {
        this.isDragging = false;
        if (this.isBipolar) {
            this.value = 0;
        }
        this.draw();
    }

    handleInput(e) {
        const rect = this.canvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        
        // Map Y position to value
        // Top = max/+1, bottom = min/-1 for bipolar, bottom = 0 for unipolar
        const normalizedY = y / this.canvas.height;
        
        if (this.isBipolar) {
            // Pitch bend: -1 (top) to +1 (bottom)
            this.value = 1 - (normalizedY * 2); // invert and scale
        } else {
            // Mod wheel: 0 (top) to 1 (bottom)
            this.value = 1 - normalizedY;
        }
        
        this.value = Math.max(this.isBipolar ? -1 : 0, Math.min(1, this.value));
        this.draw();
    }

    draw() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const trackX = width / 2;
        const trackWidth = 4;
        const thumbHeight = 12;

        // Clear canvas completely
        this.ctx.clearRect(0, 0, width, height);

        // Draw track background
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(trackX - trackWidth / 2, 5, trackWidth, height - 10);

        // Draw center line for bipolar
        if (this.isBipolar) {
            this.ctx.strokeStyle = '#555';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(trackX - 2, height / 2);
            this.ctx.lineTo(trackX + 2, height / 2);
            this.ctx.stroke();
        }

        // Calculate thumb position
        // value -1 to 1 maps to y 0 to height (for pitch bend)
        // value 0 to 1 maps to y (height - thumbHeight) to 0 (for mod wheel)
        let thumbY;
        if (this.isBipolar) {
            // -1 (top) to +1 (bottom)
            thumbY = ((1 - this.value) / 2) * (height - thumbHeight);
        } else {
            // 0 (top) to 1 (bottom)
            thumbY = (1 - this.value) * (height - thumbHeight);
        }

        // Draw thumb
        this.ctx.fillStyle = this.isDragging ? '#ff6b6b' : '#ff9999';
        this.ctx.fillRect(trackX - width / 2 + 2, thumbY, width - 4, thumbHeight);
        
        // Draw thumb border
        this.ctx.strokeStyle = '#ff4444';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(trackX - width / 2 + 2, thumbY, width - 4, thumbHeight);
    }
}
