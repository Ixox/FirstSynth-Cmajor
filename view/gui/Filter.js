export class Filter {
    constructor(canvasId, parentView) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.parentView = parentView;
        
        // State
        // filterType: 0 = None, 1=Low Pass, 2=Band Pass, 3=High Pass
        this.filterType = 1; // Default to Low Pass
        this.cutoff = 2000;
        this.resonance = 50;
        
        // Initial draw
        this.requestDraw();
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
    
    updateValue(paramName, value) {
        switch(paramName) {
            case 'filterType':
                this.filterType = value;                
                break;
            case 'filterCutoff':
                this.cutoff = value;
                break;
            case 'filterResonance':
                this.resonance = value;
                break;
        }
        this.draw();
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
        
        // Clear canvas
        this.ctx.fillStyle = '#1a2a3a';
        this.ctx.fillRect(0, 0, logicalWidth, logicalHeight);
        
        // Draw border
        this.ctx.strokeStyle = '#4a6a8a';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(0, 0, logicalWidth, logicalHeight);
        
        // Draw reference lines
        this.drawReferenceLines(logicalWidth, logicalHeight);
        
        // Draw frequency response curve
        this.drawFrequencyResponse(logicalWidth, logicalHeight);
        
        this.ctx.restore();
    }
    
    drawFrequencyResponse(logicalWidth, logicalHeight) {
        const { ctx } = this;
        const paddingX = 0;
        const paddingTop = 40;
        const paddingBottom = 5;

        const graphWidth = logicalWidth - paddingX * 2;
        const graphHeight = logicalHeight - paddingTop - paddingBottom;
        const startX = paddingX;
        const startY = paddingTop;       
        
        // Draw frequency response curve
        ctx.strokeStyle = '#f9f97e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const sampleCount = 280;
        for (let i = 0; i <= sampleCount; i++) {
            // Frequency from 20Hz to 20000Hz (log scale)
            const freqRatio = i / sampleCount;
            const freq = 20 * Math.pow(1000, freqRatio); // 20 to 20000Hz
            
            // Calculate magnitude response
            const magnitude = this.getFilterResponse(freq);
            
            // Map to canvas coordinates (dB scale, -40 to 0 dB)
            const dB = 20 * Math.log10(Math.max(0.001, magnitude));
            const y = startY + graphHeight - ((dB + 40) / 40) * graphHeight;
            const x = startX + (freqRatio * graphWidth);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }
    
    drawReferenceLines(logicalWidth, logicalHeight) {
        const { ctx } = this;
        const paddingX = 0;
        const paddingTop = 40;
        const paddingBottom = 15;
        
        const graphWidth = logicalWidth - paddingX * 2;
        const graphHeight = logicalHeight - paddingTop - paddingBottom;
        const startX = paddingX;
        const startY = paddingTop;
        
        // Reference frequencies: 100Hz (0.1kHz), 1kHz, 10kHz
        const refFrequencies = [
            { freq: 100, label: '0.1k' },
            { freq: 1000, label: '1k' },
            { freq: 10000, label: '10k' }
        ];
        const minFreq = 20;
        const maxFreq = 20000;
        
        ctx.strokeStyle = 'rgba(100, 150, 200, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]); // Dashed lines
        
        refFrequencies.forEach(({ freq, label }) => {
            // Calculate position on logarithmic scale
            const freqRatio = (Math.log10(freq) - Math.log10(minFreq)) / 
                            (Math.log10(maxFreq) - Math.log10(minFreq));
            const x = startX + (freqRatio * graphWidth);
            
            // Draw line from top to bottom
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, startY + graphHeight);
            ctx.stroke();
            
            // Draw label at bottom
            ctx.setLineDash([]); // Reset for text
            ctx.fillStyle = 'rgba(100, 150, 200, 0.8)';
            ctx.font = '11px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(label, x, logicalHeight - 2);
            ctx.setLineDash([4, 4]); // Resume dashed pattern
        });
        
        ctx.setLineDash([]); // Reset to solid lines
    }
    
    getFilterResponse(freq) {
        // Second-order filter response with proper resonance peak
        const normalizedFreq = freq / this.cutoff;
        
        // Convert resonance (20-1000) to Q factor (0.5 to ~10)
        // Q controls the height of the resonance peak at cutoff frequency
        const Q = 0.4 + (this.resonance / 100); // Q ranges from 0.6 to 10.4
        
        // Standard second-order biquad filter transfer function
        const w2 = normalizedFreq * normalizedFreq;
        const denomSquared = (1 - w2) * (1 - w2) + (normalizedFreq / Q) * (normalizedFreq / Q);
        const denom = Math.sqrt(Math.max(0.001, denomSquared));
        
        if (this.filterType === 0) {
            // None: flat response across all frequencies
            return 1;
        } else if (this.filterType === 1) {
            // Low Pass: output magnitude = 1 / denominator
            return 1 / denom;
        } else if (this.filterType === 2) {
            // Band Pass: output magnitude = normalizedFreq / denominator
            // Creates a peak at cutoff frequency with roll-off on both sides
            return normalizedFreq / denom;
        } else if (this.filterType === 3) {
            // High Pass: output magnitude = w² / denominator
            return w2 / denom;
        }
        
        return 1; // Default fallback
    }    
}
