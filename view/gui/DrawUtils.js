export class DrawUtils {
    // Waveform drawing functions

    static getColor(intensity) {
        // intensity: 0.0 = dark gray, 1.0 = white
        // Interpolate between dark gray (#989898) and bright cyan (#aff7ff)
        const darkGray = { r: 152, g: 152, b: 152 };
        const brightCyan = { r: 175, g: 247, b: 255 };
        
        const r = Math.round(darkGray.r + (brightCyan.r - darkGray.r) * intensity);
        const g = Math.round(darkGray.g + (brightCyan.g - darkGray.g) * intensity);
        const b = Math.round(darkGray.b + (brightCyan.b - darkGray.b) * intensity);
        
        return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    static drawSine(ctx, x, y, intensity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        for (let i = 0; i <= 16; i++) {
            const t = i / 16;
            const px = (t - 0.5) * 12;
            const py = Math.sin(t * Math.PI * 2) * 4;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = DrawUtils.getColor(intensity);
        ctx.lineWidth = 1.0 + intensity * 0.8; // 1.0 to 1.8
        ctx.stroke();
        ctx.restore();
    }

    static drawSquare(ctx, x, y, intensity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(-6, 4);
        ctx.lineTo(-6, -4);
        ctx.lineTo(-1, -4);
        ctx.lineTo(-1, 4);
        ctx.lineTo(3, 4);
        ctx.lineTo(3, -4);
        ctx.lineTo(6, -4);
        ctx.strokeStyle = DrawUtils.getColor(intensity);
        ctx.lineWidth = 1.0 + intensity * 0.8;
        ctx.stroke();
        ctx.restore();
    }

    static drawSawtooth(ctx, x, y, intensity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(-6, 4);
        ctx.lineTo(-1, -4);
        ctx.lineTo(-1, 4);
        ctx.lineTo(3, -4);
        ctx.lineTo(3, 4);
        ctx.lineTo(6, -1);
        ctx.strokeStyle = DrawUtils.getColor(intensity);
        ctx.lineWidth = 1.0 + intensity * 0.8;
        ctx.stroke();
        ctx.restore();
    }

    static drawTriangle(ctx, x, y, intensity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(-6, 4);
        ctx.lineTo(-3, -4);
        ctx.lineTo(0, 4);
        ctx.lineTo(3, -4);
        ctx.lineTo(6, 1);
        ctx.strokeStyle = DrawUtils.getColor(intensity);
        ctx.lineWidth = 1.0 + intensity * 0.8;
        ctx.stroke();
        ctx.restore();
    }

    // Waveform generation for LFO visualization

    /**
     * Generate waveform samples
     * @param {number} waveShape - 0:sine, 1:triangle, 2:square, 3:sawUp, 4:sawDown, 5:random
     * @param {number} numPeriods - Number of complete periods to generate (0.1 to 20)
     * @param {number} samplesPerPeriod - Number of samples per period (resolution)
     * @returns {Array} Array of values from -1 to 1
     */
    static generateWaveformSamples(waveShape, numPeriods, samplesPerPeriod = 500) {
        const points = [];
        const totalSamples = Math.ceil(numPeriods * samplesPerPeriod);
        
        for (let i = 0; i < totalSamples; i++) {
            const phase = (i / samplesPerPeriod) * 2 * Math.PI;
            const normalizedPhase = phase % (2 * Math.PI);
            const cycleProgress = normalizedPhase / (2 * Math.PI);
            
            let value = 0;
            
            switch (waveShape) {
                case 0: // Sine
                    value = Math.sin(phase);
                    break;
                case 1: // Triangle
                    value = cycleProgress < 0.5 
                        ? -1 + 4 * cycleProgress 
                        : 3 - 4 * cycleProgress;
                    break;
                case 2: // Square
                    value = cycleProgress < 0.5 ? 1 : -1;
                    break;
                case 3: // Sawtooth Up
                    value = 2 * cycleProgress - 1;
                    break;
                case 4: // Sawtooth Down
                    value = 1 - 2 * cycleProgress;
                    break;
                case 5: // Random (constant per period)
                    const periodIndex = Math.floor(i / samplesPerPeriod);
                    value = Math.sin(periodIndex * 12.9898) * 43758.5453;
                    value = value - Math.floor(value);
                    value = 2 * value - 1;
                    break;
                default:
                    value = 0;
            }
            
            points.push(value);
        }
        
        return points;
    }

    /**
     * Apply ramp envelope to waveform
     * @param {Array} points - Waveform sample array
     * @param {number} rampDuration - Ramp time in seconds
     * @returns {Array} Ramped waveform samples
     */
    static applyRampToWaveform(points, rampDuration) {


        if (rampDuration <= 0) {
            return points;
        }

        console.log(`DrawUtils.applyRampToWaveform: rampDuration=${rampDuration}`);
        
        const ramped = [...points];
        const rampSamples = Math.round(rampDuration * points.length / 5);
        
        for (let i = 0; i < Math.min(rampSamples, points.length); i++) {
            const rampProgress = i / Math.max(rampSamples, 1);
            ramped[i] = points[i] * rampProgress;
        }
        
        return ramped;
    }

    /**
     * Draw waveform on canvas with fill
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Array} points - Waveform samples
     * @param {number} startX - Left edge of drawing area
     * @param {number} endX - Right edge of drawing area
     * @param {number} centerY - Center line Y position
     * @param {number} amplitude - Vertical amplitude (half height)
     * @param {string} lineColor - Line color
     * @param {boolean} fill - Whether to fill below line
     */
    static drawWaveformOnCanvas(ctx, points, startX, endX, centerY, amplitude, lineColor, fill = true) {
        const drawWidth = endX - startX;
        
        if (fill) {
            // Draw fill
            ctx.fillStyle = lineColor + '30'; // 30 = semi-transparent
            ctx.beginPath();
            ctx.moveTo(startX, centerY);
            
            for (let i = 0; i < points.length; i++) {
                const x = startX + (i / points.length) * drawWidth;
                const y = centerY - (points[i] * amplitude);
                ctx.lineTo(x, y);
            }
            
            ctx.lineTo(endX, centerY);
            ctx.closePath();
            ctx.fill();
        }
        
        // Draw line
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2.5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        for (let i = 0; i < points.length; i++) {
            const x = startX + (i / points.length) * drawWidth;
            const y = centerY - (points[i] * amplitude);
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    }

    /**
     * Draw ramp indicator overlay
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} startX - Left edge
     * @param {number} startY - Top edge
     * @param {number} rampDuration - Ramp time in seconds
     * @param {number} totalDuration - Total display duration in seconds
     * @param {number} displayHeight - Height of display area
     * @param {number} displayWidth - Width of display area
     */
    static drawRampIndicator(ctx, startX, startY, rampDuration, displayHeight, displayWidth) {
        if (rampDuration <= 0) {
            return;
        }       
        const rampWidth = (rampDuration / 5.0) * displayWidth;
        const middleY = startY + displayHeight / 2;
        
        ctx.strokeStyle = '#ff9999';
        ctx.globalAlpha = 0.6;
        ctx.lineWidth = 1.0; 
        ctx.moveTo(startX, middleY);
        ctx.lineTo(startX + rampWidth, startY);
        ctx.lineTo(startX + displayWidth, startY);
        ctx.moveTo(startX, middleY);
        ctx.lineTo(startX + rampWidth, startY + displayHeight);
        ctx.lineTo(startX + displayWidth, startY + displayHeight);
        ctx.stroke();
    }
}