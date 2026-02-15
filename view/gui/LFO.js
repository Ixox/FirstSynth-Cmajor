import { DrawUtils } from './DrawUtils.js';

export class LFO {
    constructor(canvasId, parent) {
        this.parent = parent;
        this.canvas = parent.querySelector(`#${canvasId}`);
        this.ctx = this.canvas.getContext('2d');
        
        // Store LFO values (names must correspond to parameter names)
        this.values = {
            lfoWaveShape: 0,  // 0=sine, 1=triangle, 2=square, 3=sawUp, 4=sawDown, 5=random
            lfoRate: 1.0,     // Hz
            lfoRamp: 0        // seconds
        };

        this.lineColor = '#00ffcc';
        
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

    calculateDisplayDuration(rate) {
        // Return the real number of periods to display
        // 0.1 Hz = 0.1 period, 1 Hz = 1 period, 20 Hz = 20 periods
        return rate;
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
        
        // Get parameters
        const waveShape = parseInt(this.values.lfoWaveShape) || 0;
        const rate = parseFloat(this.values.lfoRate) || 1.0;
        const ramp = parseFloat(this.values.lfoRamp) || 0;
        
        // Get real number of periods to display
        const numPeriods = this.calculateDisplayDuration(rate);
        
        // Generate waveform using DrawUtils
        let points = DrawUtils.generateWaveformSamples(waveShape, numPeriods, 500);
        
        // Apply ramp using DrawUtils (ramp is relative to actual time)
        points = DrawUtils.applyRampToWaveform(points, ramp);
        
        // Draw center line
        this.ctx.strokeStyle = '#667eea40';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(padding, padding + drawHeight / 2);
        this.ctx.lineTo(padding + drawWidth, padding + drawHeight / 2);
        this.ctx.stroke();
        
        // Draw waveform using DrawUtils
        DrawUtils.drawWaveformOnCanvas(
            this.ctx,
            points,
            padding,
            padding + drawWidth,
            padding + drawHeight / 2,
            drawHeight / 2.5,
            this.lineColor,
            true
        );
        
        // Draw ramp indicator using DrawUtils
        // Ramp display is relative to max ramp value (10 seconds)
        // so 5s ramp = 50% width, 10s ramp = 100% width
        DrawUtils.drawRampIndicator(
            this.ctx,
            padding,
            padding,
            ramp,
            drawHeight,
            drawWidth
        );
        
        this.ctx.restore();
    }
}
