# LFO UI Implementation Plan

## Overview
Add a new LFO (Low Frequency Oscillator) panel to the synth UI, mirroring the existing envelope panel structure. This will provide controls for 3 independent LFOs with waveform selection, rate, and ramp time controls.

---

## 1. Data Model & State Management

### 1.1 LFO Parameters Definition
In `index.js`, add LFO parameters to the `allKnobs` array:

```
For each LFO (1, 2, 3):
- lfo[i]WaveShape: values 0-5 (sine, triangle, square, sawtoothUp, sawtoothDown, random)
- lfo[i]Rate: values 0.1-20 Hz
- lfo[i]Ramp: values 0-10s (linear attack time)
```

### 1.2 State Tracking
Add to the `constructor`:
- `activeLFOIndex`: tracks currently selected LFO (1, 2, or 3)
- `lfoParamsState`: object storing parameters for each LFO
  ```javascript
  lfoParamsState = {
      1: { waveShape: 0, rate: 1.0, ramp: 0 },
      2: { waveShape: 0, rate: 1.0, ramp: 0 },
      3: { waveShape: 0, rate: 1.0, ramp: 0 }
  }
  ```
- `lfoKnobs`: object to store references to UI knob objects

---

## 2. Create LFO Visualization Class

### 2.1 New File: `view/gui/LFO.js`
Create an `LFO` class similar to `Envelope.js`:

**Features:**
- Canvas-based drawing of LFO waveform
- Updates based on selected waveShape, rate, and ramp parameters
- Displays one cycle of the waveform
- Visual representation of ramp time as a linear rise at the beginning

**Implementation Details:**
```javascript
export class LFO {
    constructor(canvasId, parent, mapping) {
        // canvasId: 'lfo-canvas'
        // mapping: { 'uiLfoWaveShape': 'waveShape', 'uiLfoRate': 'rate', 'uiLfoRamp': 'ramp' }
        
        this.values = {
            waveShape: 0,  // 0=sine, 1=triangle, 2=square, 3=sawUp, 4=sawDown, 5=random
            rate: 1.0,     // Hz
            ramp: 0        // seconds
        };
        
        this.lineColor = '#00ff00';
    }
    
    updateValue(paramName, value) { }
    draw() {
        // Draws the current waveform with ramp visualization
        // Canvas shows ~2-3 cycles or scaled to show ramp clearly
    }
    
    drawWaveform(waveShape, rate, ramp) {
        // Helper to generate waveform points
    }
    
    applyRamp(points, rampDuration, totalDuration) {
        // Apply linear ramp to amplitude for ramp duration
    }
}
```

**Drawing Logic:**
1. Calculate period = 1 / rate
2. Dynamically determine cycles to display: `cycles = 1 + (rate - 0.1) / 19.9 * 5`
3. Scale canvas to show appropriate time range (cyclesToDisplay * period)
4. Draw the calculated number of complete cycles
5. If ramp > 0:
   - Draw linear amplitude rise from 0 to 1 over ramp duration at the start
   - Then apply full waveform for remaining cycles
6. Use line drawing with smooth curves for waveforms

---

## 3. UI Structure (plugin.html)

### 3.1 New LFO Module Section
Add after the Envelope module in the "Bottom row":

```html
<!-- LFO Module -->
<div class="module cyan">
  <div class="module-header">
    <span>LFOs</span>
    <select id="lfo-selector" class="lfo-selector">
      <option value="1" selected>LFO 1</option>
      <option value="2">LFO 2</option>
      <option value="3">LFO 3</option>
    </select>
  </div>
  <div class="module-content">
    <canvas class="visualization-canvas" id="lfo-canvas"></canvas>
    <div class="control-group horizontal">
      <div class="control small">
        <button class="control-button" id="uiLfoWaveShape-button">Sine</button>
        <div class="control-value" id="uiLfoWaveShape-value">Sine</div>
      </div>
      <div class="control small">
        <div class="control-label">Rate</div>
        <canvas class="control-canvas small" id="uiLfoRate-canvas"></canvas>
        <div class="control-value" id="uiLfoRate-value">1.0 Hz</div>
      </div>
      <div class="control small">
        <div class="control-label">Ramp</div>
        <canvas class="control-canvas small" id="uiLfoRamp-canvas"></canvas>
        <div class="control-value" id="uiLfoRamp-value">0s</div>
      </div>
    </div>
  </div>
</div>
```

### 3.2 CSS Styling
Add to `plugin.css`:
- `#lfo-selector`: dropdown/select styling (similar to envelope-selector dimensions)
- `.module.cyan`: color scheme for LFO module (suggest cyan/turquoise)
- Support for small button styling (WaveShape button)
- Style the select element to match the header design

---

## 4. JavaScript Implementation (index.js)

### 4.1 Initialization in `connectedCallback()`

```javascript
// Initialize LFO Visualization
this.lfo = new LFO('lfo-canvas', this, {
    'uiLfoWaveShape': 'waveShape',
    'uiLfoRate': 'rate',
    'uiLfoRamp': 'ramp'
});

// Listen to all LFO parameters
for (let i = 1; i <= 3; i++) {
    ['WaveShape', 'Rate', 'Ramp'].forEach(param => {
        const paramId = `lfo${i}${param}`;
        const paramKey = param.toLowerCase();
        
        this.patchConnection.addParameterListener(paramId, value => {
            this.lfoParamsState[i][paramKey] = value;
            if (this.activeLFOIndex === i) {
                this.updateUILFOControl(param, value);
            }
        });
        this.patchConnection.requestParameterValue(paramId);
    });
}
```

### 4.2 LFO Selector (ComboBox)
```javascript
initLFOSelector() {
    const selector = this.querySelector('#lfo-selector');
    
    selector.addEventListener('change', (e) => {
        const lfoIndex = parseInt(e.target.value);
        this.switchLFO(lfoIndex);
    });
}

switchLFO(lfoIndex) {
    // Update active LFO
    this.activeLFOIndex = lfoIndex;
    
    // Update selector value
    this.querySelector('#lfo-selector').value = lfoIndex;
    
    // Update UI knobs and visualization to show this LFO's parameters
    this.updateLFOUI();
}
```

### 4.3 Dynamic Cycle Calculation
The LFO visualization automatically adjusts the number of displayed cycles based on rate:
- **Rate 0.1 Hz** → **1 cycle** displayed
- **Rate 20 Hz** → **6 cycles** displayed
- Linear interpolation between: `cycles = 1 + (rate - 0.1) / 19.9 * 5`

This is calculated in the `LFO.draw()` method:
```javascript
calculateCyclesToDisplay(rate) {
    const minRate = 0.1;
    const maxRate = 20;
    const minCycles = 1;
    const maxCycles = 6;
    
    const cycles = minCycles + (rate - minRate) / (maxRate - minRate) * (maxCycles - minCycles);
    return cycles;
}
```

### 4.4 LFO UI Controls

**WaveShape Button:**
```javascript
initLFOWaveShapeButton() {
    const button = this.querySelector('#uiLfoWaveShape-button');
    const waveNames = ['Sine', 'Triangle', 'Square', 'SawUp', 'SawDown', 'Random'];
    let currentShape = 0;
    
    button.addEventListener('click', () => {
        const newShape = (currentShape + 1) % 6;
        this.setLFOWaveShape(newShape);
    });
    
    this.listeners.uiLfoWaveShape = value => {
        currentShape = value;
        button.textContent = waveNames[value];
        this.lfo.updateValue('uiLfoWaveShape', value);
    };
}

setLFOWaveShape(shape) {
    this.patchConnection.sendEventOrValue(`lfo${this.activeLFOIndex}WaveShape`, shape);
}
```

**Rate Knob:**
```javascript
// In allKnobs array:
{
    id: 'uiLfoRate',
    min: 0.1,
    max: 20,
    defaultValue: 1.0,
    step: 0.1,
    knobColor: "#00ffcc",
    isLFO: true,
    displayFormatter: (v) => `${v.toFixed(1)} Hz`,
    middleValue: 1.0
}
```

When Rate changes, the LFO visualization automatically updates the number of cycles:
```javascript
// In updateUILFOControl() method, when param === 'Rate':
this.lfoKnobs.Rate?.setValue(value);
this.querySelector(`#uiLfoRate-value`).textContent = `${value.toFixed(1)} Hz`;
this.lfo.updateValue('uiLfoRate', value);  // This triggers cycle recalculation
```

**Ramp Knob:**
```javascript
// In allKnobs array:
{
    id: 'uiLfoRamp',
    min: 0,
    max: 10,
    defaultValue: 0,
    step: 0.1,
    knobColor: "#00ffcc",
    isLFO: true,
    displayFormatter: (v) => `${v.toFixed(1)}s`
}
```

### 4.4 Update Methods

```javascript
updateUILFOControl(param, value) {
    const paramName = `uiLfo${param}`;
    
    if (param === 'WaveShape') {
        const waveNames = ['Sine', 'Triangle', 'Square', 'SawUp', 'SawDown', 'Random'];
        const button = this.querySelector('#uiLfoWaveShape-button');
        button.textContent = waveNames[value];
        this.querySelector(`#${paramName}-value`).textContent = waveNames[value];
    } else if (param === 'Rate') {
        this.lfoKnobs.Rate?.setValue(value);
        this.querySelector(`#${paramName}-value`).textContent = `${value.toFixed(1)} Hz`;
    } else if (param === 'Ramp') {
        this.lfoKnobs.Ramp?.setValue(value);
        this.querySelector(`#${paramName}-value`).textContent = `${value.toFixed(1)}s`;
    }
    
    // Update visualization
    this.lfo.updateValue(paramName, value);
}

updateLFOUI() {
    const params = this.lfoParamsState[this.activeLFOIndex];
    this.updateUILFOControl('WaveShape', params.waveShape);
    this.updateUILFOControl('Rate', params.rate);
    this.updateUILFOControl('Ramp', params.ramp);
}
```

---

## 5. Implementation Steps (Sequential)

### Phase 1: Foundation
1. [ ] Create `view/gui/LFO.js` with LFO visualization class
2. [ ] Add LFO module HTML to `plugin.html`
3. [ ] Add CSS styling for `.module.cyan` and `.lfo-selector` to `plugin.css`

### Phase 2: State & Initialization
4. [ ] Add LFO parameters to `allKnobs` in `index.js`
5. [ ] Add `lfoParamsState` and `lfoKnobs` to constructor
6. [ ] Initialize LFO object and parameter listeners in `connectedCallback()`

### Phase 3: UI Controls
7. [ ] Implement LFO selector combobox logic
8. [ ] Implement WaveShape button with cycling
9. [ ] Create LFO knobs (Rate and Ramp) similar to envelope knobs
10. [ ] Wire up knob change events to send to patch

### Phase 4: Visualization & Polish
11. [ ] Implement LFO waveform drawing in `LFO.js`
12. [ ] Test switching between LFOs
13. [ ] Verify all parameter updates reflect in UI and visualization

---

## 6. Key Integration Points

- **Parameter Naming Convention**: `lfo[1-3][WaveShape|Rate|Ramp]`
- **UI Parameter Names**: `uiLfo[WaveShape|Rate|Ramp]` (for currently selected LFO)
- **Knob Storage**: Store in `this.lfoKnobs` object (similar to `this.envKnobs`)
- **Color Scheme**: Use cyan/turquoise (#00ffcc or similar) to distinguish from envelopes
- **Visualization**: Single canvas showing 2-3 cycles of selected waveform with ramp overlay

---

## 7. Testing Checklist

- [ ] Can switch between 3 LFOs using combobox selector
- [ ] WaveShape button cycles through all 6 types
- [ ] Rate knob changes frequency of visualization
- [ ] Visualization shows 1 cycle at 0.1 Hz
- [ ] Visualization shows 6 cycles at 20 Hz
- [ ] Cycles scale linearly with rate between min and max
- [ ] Ramp knob shows linear rise in visualization
- [ ] Parameters persist when switching LFOs
- [ ] All changes send to patch correctly
- [ ] LFO visualization updates in real-time
- [ ] Colors match design theme
