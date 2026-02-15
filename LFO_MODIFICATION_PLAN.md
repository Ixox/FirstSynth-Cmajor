# LFO Visualization Modification Plan

## Overview
Update the LFO visualization to show real waveform periods based on rate and apply proper ramp visualization. Move waveform drawing logic to DrawUtils.js for code reuse.

---

## 1. HTML Changes

### 1.1 Remove WaveShape Value Field
In `plugin.html`, remove the `control-value` div under the WaveShape select:

```html
<!-- REMOVE THIS: -->
<div class="control-value" id="uiLfoWaveShape-value">Sine</div>

<!-- The select already shows the selected value -->
```

**Location**: Remove from the LFO control-group in plugin.html

---

## 2. DrawUtils.js Enhancement

### 2.1 Analyze Existing Waveform Drawers
Check DrawUtils.js for existing waveform drawing methods:
- Likely has: drawSineWave(), drawSquareWave(), drawTriangleWave(), etc.
- Or generic waveform generation methods

### 2.2 Create Generic Waveform Generator Method
Create a new method in DrawUtils.js:

```javascript
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
            case 5: // Random (pseudo-random based on phase)
                value = Math.sin(phase * 12.9898 + phase * 78.233);
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
 * @param {number} totalDuration - Total display duration in seconds
 * @returns {Array} Ramped waveform samples
 */
static applyRampToWaveform(points, rampDuration, totalDuration) {
    if (rampDuration <= 0 || totalDuration <= 0) {
        return points;
    }
    
    const ramped = [...points];
    const rampSamples = Math.round((rampDuration / totalDuration) * points.length);
    
    for (let i = 0; i < Math.min(rampSamples, points.length); i++) {
        const rampProgress = i / Math.max(rampSamples, 1);
        ramped[i] = points[i] * rampProgress;
    }
    
    return ramped;
}
```

### 2.3 Create Canvas Drawing Method
```javascript
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
 */
static drawRampIndicator(ctx, startX, startY, rampDuration, totalDuration, displayHeight) {
    if (rampDuration <= 0 || totalDuration <= 0) {
        return;
    }
    
    const rampWidth = (rampDuration / totalDuration) * (ctx.canvas.width - 2 * startX);
    
    ctx.fillStyle = '#ff9999';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(startX, startY, rampWidth, displayHeight);
    ctx.globalAlpha = 1.0;
}
```

---

## 3. LFO.js Modifications

### 3.1 Simplified Period Calculation
```javascript
calculateDisplayDuration(rate) {
    // Return the real number of periods to display
    // This shows exactly how many cycles occur in the rate range
    return rate; // 0.1Hz = 0.1 period, 1Hz = 1 period, 20Hz = 20 periods
}
```

**Note**: This replaces the current dynamic cycle calculation (1-6 cycles).
- At 0.1 Hz: Shows 0.1 period (10% of one cycle)
- At 1 Hz: Shows exactly 1 complete cycle
- At 20 Hz: Shows 20 complete cycles (heavily compressed)

### 3.2 Import DrawUtils
```javascript
import { DrawUtils } from './DrawUtils.js';
```

### 3.3 Refactor draw() Method
Replace the current waveform generation and drawing with calls to DrawUtils:

```javascript
draw() {
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // ... sizing/scaling code (unchanged) ...
    
    const waveShape = parseInt(this.values.waveShape) || 0;
    const rate = parseFloat(this.values.rate) || 1.0;
    const ramp = parseFloat(this.values.ramp) || 0;
    
    // Get real number of periods to display
    const numPeriods = this.calculateDisplayDuration(rate);
    
    // Generate waveform using DrawUtils
    let points = DrawUtils.generateWaveformSamples(waveShape, numPeriods, 500);
    
    // Apply ramp
    const totalDuration = numPeriods / rate; // Convert periods to seconds
    points = DrawUtils.applyRampToWaveform(points, ramp, totalDuration);
    
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
    DrawUtils.drawRampIndicator(
        this.ctx,
        padding,
        padding,
        ramp,
        totalDuration,
        drawHeight
    );
    
    this.ctx.restore();
}
```

### 3.4 Remove Duplicate Methods from LFO.js
- Remove `generateWaveform()`
- Remove `applyRamp()`
- Remove `calculateCyclesToDisplay()`
- Keep only: `draw()`, `updateValue()`, `requestDraw()`, `setLineColor()`

---

## 4. Visualization Behavior Changes

### Current Behavior (Before)
- Dynamic cycles: 0.1 Hz → 1 cycle, 20 Hz → 6 cycles
- Cycles scaled logarithmically/interpolated for readability

### New Behavior (After)
- Real periods: 0.1 Hz → 0.1 period, 20 Hz → 20 periods
- Shows actual waveform frequency mathematically
- At low Hz: Waveform is spread out (readable)
- At high Hz: Waveform is compressed (shows density)

### Ramp Visualization
- **0s ramp**: No indicator shown
- **10s ramp**: Red overlay covers 100% of canvas width
- **5s ramp**: Red overlay covers 50% of canvas width
- Ramp duration as percentage: `(rampTime / (numPeriods / rate)) * 100%`

---

## 5. Implementation Steps

### Phase 1: HTML Cleanup
1. [ ] Remove WaveShape value field from plugin.html

### Phase 2: DrawUtils Enhancement
2. [ ] Add `generateWaveformSamples()` method
3. [ ] Add `applyRampToWaveform()` method
4. [ ] Add `drawWaveformOnCanvas()` method
5. [ ] Add `drawRampIndicator()` method

### Phase 3: LFO.js Refactor
6. [ ] Import DrawUtils
7. [ ] Remove duplicate waveform generation methods
8. [ ] Update `calculateDisplayDuration()` for real periods
9. [ ] Refactor `draw()` to use DrawUtils methods
10. [ ] Remove `generateWaveform()`, `applyRamp()`, `calculateCyclesToDisplay()`

### Phase 4: Testing
11. [ ] Test at 0.1 Hz (should show 0.1 period)
12. [ ] Test at 1 Hz (should show 1 complete period)
13. [ ] Test at 20 Hz (should show 20 periods)
14. [ ] Test ramp at 0s (no indicator)
15. [ ] Test ramp at 10s (100% width)
16. [ ] Test ramp at 5s (50% width)

---

## 6. Expected Results

### Visual Examples

**At 1 Hz with 0s ramp:**
```
One complete sine wave cycle
No red overlay
```

**At 1 Hz with 5s ramp:**
```
One sine wave with linear rise at start
Red overlay on left 50% of canvas
```

**At 0.1 Hz with 0s ramp:**
```
0.1 of a sine wave (just the start/rise)
Very stretched waveform
```

**At 20 Hz with 0s ramp:**
```
20 complete sine wave cycles
Very compressed, shows density pattern
```

---

## 7. Code Reuse Strategy

### Existing DrawUtils Methods to Check
Before implementation, review DrawUtils.js for existing:
- Sine/triangle/square wave generators
- Waveform drawing functions
- Canvas scaling/DPI handling
- Envelope/ramp visualization

### Adaptation Approach
- Copy logic from existing methods
- Parameterize for waveShape (0-5)
- Ensure same DPI/scaling handling as Envelope
- Match existing code style and patterns

---

## Files to Modify

1. **view/plugin.html**: Remove WaveShape value field
2. **view/gui/DrawUtils.js**: Add 4 new static methods
3. **view/gui/LFO.js**: Import DrawUtils, refactor draw(), remove duplicate methods

---

## Notes

- Real periods mode shows waveforms at their true frequency
- Low frequencies are visually readable
- High frequencies show as dense patterns (mathematically correct)
- Ramp indicator always relative to total display time
- All existing LFO functionality preserved (selector, rate knob, etc.)
