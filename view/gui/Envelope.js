export class Envelope {
    constructor(canvasId, parent) {
        this.parent = parent;
        this.canvas = parent.querySelector(`#${canvasId}`);
        this.ctx = this.canvas.getContext('2d');
        
        // Store envelope values
        this.values = {
            envAttack: 10,
            envDecay: 100,
            envSustain: 70,
            envRelease: 300
        };

        this.lineColor = '#667eea';
        
        // Initial draw
        this.requestDraw();
    }

    setLineColor(color) {
        this.lineColor = color;
        this.requestDraw();
    }
    
    updateValue(paramName, value) {
        if (this.values.hasOwnProperty(paramName)) {
            this.values[paramName] = value;
            this.requestDraw();
        }
    }

    requestDraw() {
        if (!this.drawRequested) {
            this.drawRequested = true;
            requestAnimationFrame(() => {
                this.drawRequested = false;
                this.draw();
            });
        }
    }
    
    draw() {
        if (!this.canvas) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        if (rect.width > 0 && rect.height > 0) {
            const targetWidth = Math.floor(rect.width * dpr);
            const targetHeight = Math.floor(rect.height * dpr);
            
            if (this.canvas.width !== targetWidth || this.canvas.height !== targetHeight) {
                this.canvas.width = targetWidth;
                this.canvas.height = targetHeight;
            }
        } else {
            // Re-schedule if still zero size
            this.requestDraw();
            return;
        }

        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.save();
        this.ctx.scale(dpr, dpr);
        
        const logicalWidth = width / dpr;
        const logicalHeight = height / dpr;

        const padding = 15;
        const drawWidth = logicalWidth - 2 * padding;
        const drawHeight = logicalHeight - 2 * padding;
        
        // Clear
        this.ctx.fillStyle = '#1e2a47';
        this.ctx.fillRect(0, 0, logicalWidth, logicalHeight);
        
        // Calculate points based on values
        const a = parseFloat(this.values.envAttack) || 10;
        const d = parseFloat(this.values.envDecay) || 100;
        const s = (parseFloat(this.values.envSustain) + 0.01 || 70) / 100;
        const r = parseFloat(this.values.envRelease) || 300;
        
        const totalTime = Math.max(a + d + 300 + r, 1000);
        
        const x0 = padding;
        const y0 = padding + drawHeight;
        
        const x1 = x0 + (a / totalTime) * drawWidth;
        const y1 = padding;
        
        const x2 = x1 + (d / totalTime) * drawWidth;
        const y2 = padding + drawHeight * (1 - s);
        
        const x3 = x2 + (300 / totalTime) * drawWidth; // 300ms sustain region
        const y3 = y2;
        
        const x4 = x3 + (r / totalTime) * drawWidth;
        const y4 = y0;
        
        // Draw fill first
        this.ctx.fillStyle = this.lineColor + '30';
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.lineTo(x4, y0);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw envelope line
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = 2.5;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
}
