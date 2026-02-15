// NOT USED ANYMORE IN THIS PROJECT BUT KEEPING FOR REFERENCE

import { DrawUtils } from './DrawUtils.js';

export class OscMorphSlider {
    constructor(paramName, parent) {
        this.parent = parent;
        this.slider = parent.querySelector('#osc3MorphValue-slider');
        this.canvas = parent.querySelector('#osc3-morph-preview');
        
        // Draw sine and square wave icons
        this.drawMorphWaveIcon('osc3-morph-sine', 'sine');
        this.drawMorphWaveIcon('osc3-morph-square', 'square');
        
        
        // Initial preview
        this.updateMorphPreview(0);
        
        this.slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            const morphValue = value / 100.0;
            this.updateMorphPreview(morphValue);
            this.parent.patchConnection.sendEventOrValue('osc3MorphValue', value);
        });
    }

    // Function to update morphed waveform preview
    updateMorphPreview(morphValue)  
    {
        const ctx = this.canvas.getContext('2d');
        this.canvas.width = 40;
        this.canvas.height = 20;
        
        ctx.clearRect(0, 0, 50, 20);
        ctx.strokeStyle = '#96a6ebff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        const samples = 50;
        for (let i = 0; i < samples; i++) {
            const phase = i / samples;
            const sine = Math.sin(phase * Math.PI * 2);
            const square = phase < 0.5 ? 1 : -1;
            
            // Morph between sine and square
            const morphed = (1 - morphValue) * sine + morphValue * square;
            
            const x = i;
            const y = 10 - morphed * 8;  // Center vertically and scale
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    };


    drawMorphWaveIcon(canvasId, waveType)
    {
        const canvas = this.parent.querySelector(`#${canvasId}`);
        const ctx = canvas.getContext('2d');
        
        canvas.width = 16;
        canvas.height = 16;
        
        ctx.clearRect(0, 0, 16, 16);
        
        if (waveType === 'sine') {
            DrawUtils.drawSine(ctx, 8, 8, true);
        } else if (waveType === 'square') {
            DrawUtils.drawSquare(ctx, 8, 8, true);
        }
    }

}