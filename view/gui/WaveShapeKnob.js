import { DrawUtils } from './DrawUtils.js';

export class WaveShapeKnob {
    constructor(paramName, parent, callbackWhenValueChanges, options) {
        this.callbackWhenValueChanges = callbackWhenValueChanges;
        this.paramName = paramName;
        this.parent = parent;
        this.canvas = parent.querySelector(`#${paramName}-knob`);        
        this.ctx = this.canvas.getContext('2d');       
        this.knobColor = (options && options.knobColor) ? options.knobColor : "#667eea";

        this.canvas.width = 80;
        this.canvas.height = 80;
        
        this.currentValue = 0; // 0-99
        this.isDragging = false;
        
        this.canvas.addEventListener('mousedown', () => {
             this.isDragging = true; 
             this.startDragTime = Date.now();
        });

        this.canvas.addEventListener('mouseup', () => {
            if (Date.now() - this.startDragTime < 200) {                
                console.log('Short click detected, current value:', this.currentValue);
                let newValue = Math.round(this.currentValue / 25) * 25;
                console.log('Snapping to nearest waveform at value:', newValue);
                if (newValue == this.currentValue) {
                    newValue = (newValue + 25) % 100;
                }
                this.setValue(newValue);
            }
            this.isDragging = false; 
        });


        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - 40;
            const y = e.clientY - rect.top - 40;
            const angle = Math.atan2(y, x);
            let degrees = (angle * 180 / Math.PI + 90 + 360) % 360;
            
            // Map 0-360 degrees to 0-99 value
            // 0° = 0, 90° = 25, 180° = 50, 270° = 75, 360° = 99
            const newValue = Math.round((degrees / 360) * 99);
            
            if (newValue !== this.currentValue) this.setValue(newValue);
        });
        
        document.addEventListener('mouseup', () => { 
            this.isDragging = false; 
        });
        
        this.drawWaveshapeKnob(this.currentValue);
    }

    // Calculate blend percentages for each waveform based on value (0-99)
    calculateBlend(value) {
        // Waveform positions: 0=sine, 25=square, 50=sawtooth, 75=triangle
        const positions = [0, 25, 50, 75];
        const percentages = [0, 0, 0, 0];
        
        if (value <= 25) {
            // Between sine and square
            const t = value / 25;
            percentages[0] = 1 - t; // sine
            percentages[1] = t;     // square
        } else if (value <= 50) {
            // Between square and sawtooth
            const t = (value - 25) / 25;
            percentages[1] = 1 - t; // square
            percentages[2] = t;     // sawtooth
        } else if (value <= 75) {
            // Between sawtooth and triangle
            const t = (value - 50) / 25;
            percentages[2] = 1 - t; // sawtooth
            percentages[3] = t;     // triangle
        } else {
            // Between triangle and sine (wrapping around)
            const t = (value - 75) / 24; // 75-99 = 24 steps
            percentages[3] = 1 - t; // triangle
            percentages[0] = t;     // sine
        }
        
        return percentages;
    }

    drawWaveshapeKnob(value) {
        const centerX = 40;
        const centerY = 40;
        const knobRadius = 14;
        const outerRadius = 18;
        const iconDistance = 24;
        
        this.ctx.clearRect(0, 0, 80, 80);
        
        // Calculate blend percentages
        const blend = this.calculateBlend(value);
        
        const waveforms = [
            { angle: -Math.PI / 2, draw: DrawUtils.drawSine },      // 0
            { angle: 0, draw: DrawUtils.drawSquare },               // 25
            { angle: Math.PI / 2, draw: DrawUtils.drawSawtooth },   // 50
            { angle: Math.PI, draw: DrawUtils.drawTriangle }        // 75
        ];
        
        waveforms.forEach((wf, index) => {
            const x = centerX + Math.cos(wf.angle) * iconDistance;
            const y = centerY + Math.sin(wf.angle) * iconDistance;
            const intensity = blend[index]; // 0.0 to 1.0
            wf.draw(this.ctx, x, y, intensity);
        });
        
        
        // Draw inner knob body with shadow
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowOffsetX = 1;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, knobRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#cce6e7";
        this.ctx.fill();
        
        this.ctx.shadowColor = 'transparent';
        
        // Draw position indicator - longer pointer extending outside circle
        const pointerAngle = ((value / 99) * 2 * Math.PI) - Math.PI / 2;
        const pointerLength = knobRadius + 2; 
        const pointerX = centerX + Math.cos(pointerAngle) * pointerLength;
        const pointerY = centerY + Math.sin(pointerAngle) * pointerLength;
        
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY);
        this.ctx.lineTo(pointerX, pointerY);
        this.ctx.strokeStyle = this.knobColor;
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
        
        // Draw center dot
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.knobColor;
        this.ctx.fill();
    };

    setValue(value) {
        this.currentValue = Math.max(0, Math.min(99, value));
        this.drawWaveshapeKnob(this.currentValue);
        this.callbackWhenValueChanges(this.currentValue);
    };
}