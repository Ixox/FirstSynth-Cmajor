import { RotaryKnob } from './gui/RotaryKnob.js';
import { WaveShapeKnob } from './gui/WaveShapeKnob.js';
import { OscMorphSlider } from './gui/OscMorphSlider.js';
import { Envelope } from './gui/Envelope.js';
import { LFO } from './gui/LFO.js';
import { DraggableModulator } from './gui/DraggableModulator.js';
import { Filter } from './gui/Filter.js';

// Matrix Modulation Enums
const MtxSource = {
    NONE: 0,
    LFO1: 1,
    LFO2: 2,
    LFO3: 3,
    ENV1: 4,
    ENV2: 5,
    ENV3: 6,
    KEYTRACK: 7,
    VELOCITY: 8
};

const MtxSourceNames = {
    0: 'None',
    1: 'LFO 1',
    2: 'LFO 2',
    3: 'LFO 3',
    4: 'ENV 1',
    5: 'ENV 2',
    6: 'ENV 3',
    7: 'Keytrack',
    8: 'Velocity'
};

const MtxDestination = {    
    0: 'None',
    1: 'OSC1 Wave',
    2: 'OSC2 Wave',
    3: 'OSC3 Wave',
    4: 'OSC1 Pitch',
    5: 'OSC2 Pitch',
    6: 'OSC3 Pitch',
    7: 'OSC1 Pan',
    8: 'OSC2 Pan',
    9: 'OSC3 Pan',
    10: 'OSC1 Gain',
    11: 'OSC2 Gain',
    12: 'OSC3 Gain',
    13: 'Filter Cut',
    14: 'Filter Res',
    15: 'Lfo1 Rate',
    16: 'Lfo2 Rate',
    17: 'Lfo3 Rate'
};


class test_View extends HTMLElement
{
    allKnobs = [
        {id:'osc1Transpose', min:-48, max:48, defaultValue:0, modulable:true, knobColor:"#8299f9", displayFormatter: (v) => `${v}` },
        {id:'osc1Detune', min:-50, max:50, defaultValue:0, knobColor:"#8299f9", displayFormatter: (v) => `${v}¢` },
        {id:'osc1Pan', min:-100, max:100, defaultValue:0, modulable:true, knobColor:"#8299f9", displayFormatter: (v) => this.valueToPanString(v) },
        {id:'osc1Gain', min:0, max:141, defaultValue:80, knobColor:"#8299f9", displayFormatter: (v) => this.valueToDBString(v) },
        {id:'osc1Saturation', min:0, max:100, defaultValue:0, knobColor:"#8299f9", displayFormatter: (v) => `${v}%` },

        {id:'osc2Transpose', min:-48, max:48, defaultValue:0, modulable:true, knobColor:"#26ee9b", displayFormatter: (v) => `${v}` },
        {id:'osc2Detune', min:-50, max:50, defaultValue:5, knobColor:"#26ee9b", displayFormatter: (v) => `${v}¢` },
        {id:'osc2Pan', min:-100, max:100, defaultValue:0, modulable:true, knobColor:"#26ee9b", displayFormatter: (v) => this.valueToPanString(v) },
        {id:'osc2Gain', min:0, max:141, defaultValue:50, knobColor:"#26ee9b", displayFormatter: (v) => this.valueToDBString(v) },
        {id:'osc2Saturation', min:0, max:100, defaultValue:0, knobColor:"#26ee9b", displayFormatter: (v) => `${v}%` },

        {id:'osc3Transpose', min:-48, max:48, defaultValue:-1, modulable:true, knobColor:"#eea826", displayFormatter: (v) => `${v}` },
        {id:'osc3Detune', min:-50, max:50, defaultValue:0, knobColor:"#eea826", displayFormatter: (v) => `${v}¢` },
        {id:'osc3Pan', min:-100, max:100, defaultValue:0, modulable:true, knobColor:"#eea826", displayFormatter: (v) => this.valueToPanString(v) },
        {id:'osc3Gain', min:0, max:141, defaultValue:30, knobColor:"#eea826", displayFormatter: (v) => this.valueToDBString(v) },
        {id:'osc3Saturation', min:0, max:100, defaultValue:0, knobColor:"#eea826", displayFormatter: (v) => `${v}%` },
        {id:'osc3NoiseAmount', min:0, max:100, defaultValue:0, knobColor:"#eea826", displayFormatter: (v) => `${v}%` },

        {id:'rmAmount', min:0, max:100, defaultValue:0, knobColor:"#26ee9b", displayFormatter: (v) => `${v}%` },

        {id:'filterCutoff', min:20, max:20000, defaultValue:2000, middleValue:2000, modulable:true, knobColor:"#f9f97e", displayFormatter: (v) => v < 1000 ? `${Math.round(v)} Hz` : `${(v/1000).toFixed(1)} kHz` },
        {id:'filterResonance', min:20, max:1000, defaultValue:50, knobColor:"#f9f97e", displayFormatter: (v) => (v / 100).toFixed(2) },
        {id:'stereoSpread', min:0, max:100, defaultValue:0, knobColor:"#d16ff0", displayFormatter: (v) => `${v}%` },
        {id:'chorusAmount', min:0, max:100, defaultValue:0, knobColor:"#d16ff0", displayFormatter: (v) => `${v}%` },
        {id:'mainGain', min:0, max:141, defaultValue:80, knobColor:"#d16ff0", displayFormatter: (v) => this.valueToDBString(v) },

        // LFO Generic Controls
        {id:'lfoRate',  min:1, max:600, defaultValue:50,  knobColor:"#00ffcc", isLFO: true, middleValue: 80, displayFormatter: (v) => `${(v/10).toFixed(1)}Hz` },
        {id:'lfoRamp',  min:0, max:5000, defaultValue:0, knobColor:"#00ffcc", isLFO: true, displayFormatter: (v) => `${v}ms`},
        // Envelope Generic Controls
        {id:'envAttack',  min:1, max:5000, defaultValue:100, knobColor:"#ff7b7b", isEnv: true, stage: 'Attack',  displayFormatter: (v) => `${Math.round(v)}ms`, middleValue: 1000 },
        {id:'envDecay',   min:1, max:5000, defaultValue:100, knobColor:"#ff7b7b", isEnv: true, stage: 'Decay',   displayFormatter: (v) => `${Math.round(v)}ms`, middleValue: 1000 },
        {id:'envSustain', min:0, max:100,  defaultValue:70,  knobColor:"#ff7b7b", isEnv: true, stage: 'Sustain', displayFormatter: (v) => `${Math.round(v)}%` },
        {id:'envRelease', min:1, max:5000, defaultValue:300, knobColor:"#ff7b7b", isEnv: true, stage: 'Release', displayFormatter: (v) => `${Math.round(v)}ms`, middleValue: 1000 },
        ];

    constructor (patchConnection)
    {
        super();
        this.patchConnection = patchConnection;
        this.classList = "main-view-element";
        this.innerHTML = this.getHTML();
        this.listeners = {};
        this.activeEnvIndex = 1; // 1, 2, or 3
        this.envParamsState = {};
        this.activeLFOIndex = 1; // 1, 2, or 3
        this.lfoParamsState = {};
        
        // Initialize matrix state with 8 rows
        this.mtxState = {
            rows: Array.from({length: 8}, (_, i) => ({
                index: i,
                source: MtxSource.NONE,
                multiplier: 0.0,
                dest1: 0,
                dest2: 0
            }))
        };
        
        // Initialize matrix multiplier knobs container
        this.mtxMultiplierKnobs = {};


    }    

    connectedCallback()
    {
        // Initialize state for the envelopes correctly
        this.envParamsState = {
            env1Attack: 10, env1Decay: 100, env1Sustain: 70, env1Release: 300,
            env2Attack: 10, env2Decay: 100, env2Sustain: 70, env2Release: 300,
            env3Attack: 10, env3Decay: 100, env3Sustain: 70, env3Release: 300
        };

        // Initialize Envelope Visualization next
        this.envelope = new Envelope('envelope-canvas', this);

        this.lfoParamsState = {
            lfo1WaveShape: 0, lfo1Rate: 50, lfo1Ramp: 0,
            lfo2WaveShape: 0, lfo2Rate: 50, lfo2Ramp: 0,
            lfo3WaveShape: 0, lfo3Rate: 50, lfo3Ramp: 0
        };

        // Initialize LFO Visualization
        this.lfo = new LFO('lfo-canvas', this);

        // Initialize Filter Visualization
        this.filter = new Filter('filter-visualization-canvas', this);

        // Initialize All Hidden Parameter Listeners for Envelopes
        for (let i = 1; i <= 3; i++) {
            ['env*Attack', 'env*Decay', 'env*Sustain', 'env*Release'].forEach(stage => {
                const paramId = stage.replace('*', i.toString());
                
                this.patchConnection.addParameterListener(paramId, value => {
                    this.envParamsState[paramId] = value;
                    if (this.activeEnvIndex === i) {
                        this.updateEnvelopeKnob(paramId, value);
                    }
                });
                this.patchConnection.requestParameterValue(paramId);
            });
        }

        // Initialize All Parameter Listeners for LFOs
        for (let i = 1; i <= 3; i++) {
            ['lfo*WaveShape', 'lfo*Rate', 'lfo*Ramp'].forEach(param => {
                const paramId = param.replace('*', i.toString());
                
                this.patchConnection.addParameterListener(paramId, value => {

                    this.lfoParamsState[paramId] = value;
                    if (this.activeLFOIndex === i) {
                        this.updateLFOControl(paramId, value);
                    }
                });
                this.patchConnection.requestParameterValue(paramId);
            });
        }

        // Initialize oscillator 1 and 2 waveshape knobs
        this.initWaveshapeKnob('osc1WaveshapeIn', "#8299f9");
        this.initWaveshapeKnob('osc2WaveshapeIn', "#26ee9b");
        this.initWaveshapeKnob('osc3WaveshapeIn', "#eea826");
        
        // Initialize OSC2 sync button
        this.initSyncButton();
        
        // Initialize saturation type buttons
        this.initSaturationTypeButton('osc1SaturationType');
        this.initSaturationTypeButton('osc2SaturationType');
        this.initSaturationTypeButton('osc3SaturationType');

        // Initialize noise type buttons
        this.initNoiseTypeButtons();

        // Initialize Filter Type
        this.initFilterTypeSelect();

        // Initialize all knobs (including new envelope ones)
        this.allKnobs.forEach(knobInfo => {
            this.initKnob(knobInfo);
        });
        
        // Initialize Selectors
        this.initEnvelopeSelector();
        this.initLFOSelector();

        // Initialize LFO Controls
        this.initLFOWaveShapeButton();

        // Matrix updates are now handled through individual mtxRowN events
        // (mtxRowNSource, mtxRowNMultiplier, mtxRowNDest1, mtxRowNDest2)

        // Initialize Draggable Modulator (envelope cross drag-drop)
        this.draggableModulator = new DraggableModulator(this, (envNumber, knobId) => {
            this.onEnvelopeDroppedOnKnob(envNumber, knobId);
        });

        // Initialize Matrix Modulation UI
        this.initMatrixRows();

        // Initial UI Sync
        this.refreshEnvelope();
        this.refreshLFO();



        // Display event key and value 
        this.patchConnection.addStoredStateValueListener(event => {
            console.log(`#### Received stored state value update for key ${event.key}:`, JSON.stringify(event.value));
        });

        this.patchConnection.requestStoredStateValue("row0");
        this.patchConnection.requestStoredStateValue("row3");

        console.log("============================= connectedCallback done =============================");
    }

    initEnvelopeSelector()
    {
        const buttons = this.querySelectorAll('.envelope-selector .selector-btn');
        const cross = this.querySelector('.envelope-cross');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeEnvIndex = parseInt(btn.dataset.env);
                
                // Update the cross to show the current envelope number
                if (cross) {
                    cross.textContent = this.activeEnvIndex;
                }
                
                this.refreshEnvelope();
            });
        });
    }

    updateEnvelopeKnob(paramId, value)
    {
        // Remove enveloppe number or placeholder
        const uiparamName = paramId.replace(/env\d/, 'env');
        this.envelope.updateValue(uiparamName, value);
    }

    refreshEnvelope()
    {
        ['env*Attack', 'env*Decay', 'env*Sustain', 'env*Release'].forEach(stage => {
            const paramId = stage.replace('*', this.activeEnvIndex.toString());
            const value = this.envParamsState[paramId];
            this.updateEnvelopeKnob(paramId, value);
        });
    }

    // Initialization for the 3 buttons to select active LFO
    initLFOSelector()
    {
        const buttons = this.querySelectorAll('.lfo-selector .selector-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeLFOIndex = parseInt(btn.dataset.lfo);
                //this.switchLFO(lfoIndex);
                this.refreshLFO();  
            });
        });
    }

    // Initialization for LFO Wave Shape selector
    initLFOWaveShapeButton()
    {
        const select = this.querySelector('#lfoWaveShape-select');
        const waveNames = ['Sine', 'Triangle', 'Square', 'SawUp', 'SawDown', 'Random'];

        select.addEventListener('change', (e) => {
            const newShape = parseInt(e.target.value);
            const waveShapeParamName = `lfo${this.activeLFOIndex}WaveShape`;
            this.patchConnection.sendEventOrValue(waveShapeParamName, newShape);
        });

        this.listeners.lfoWaveShape = value => {
            const waveShapeParamName = `lfo${this.activeLFOIndex}WaveShape`;
            this.lfoParamsState[waveShapeParamName] = value;
            this.updateLFOControl(waveShapeParamName, value);
            select.value = value;
        };

        // Register the listener for parameter updates from patch
        this.patchConnection.addParameterListener('lfoWaveShape', this.listeners.lfoWaveShape);
    }

    // Send LFO Wave Shape change to patch
    setLFOWaveShape(shape)
    {
        this.patchConnection.sendEventOrValue(`lfo${this.activeLFOIndex}WaveShape`, shape);
    }

    // Update LFO UI controls based on parameter changes
    updateLFOControl(paramId, value)
    {    
        const uiParamName = paramId.replace(/lfo\d/, 'lfo');
        if (uiParamName === 'lfoWaveShape') {
            const select = this.querySelector('#lfoWaveShape-select');
            select.value = value;
            this.lfo.updateValue(uiParamName, value);
        } else if (uiParamName === 'lfoRate') {
            this.lfo.updateValue(uiParamName, value / 10); // Convert from 1-200 to 0.1-20 Hz
        } else if (uiParamName === 'lfoRamp') {
            this.lfo.updateValue(uiParamName, value / 1000); // Convert from ms to seconds
        }
    }

    refreshLFO()
    {

        ['lfo*WaveShape', 'lfo*Rate', 'lfo*Ramp'].forEach(param => {
            const paramId = param.replace('*', this.activeLFOIndex.toString());
            const value = this.lfoParamsState[paramId];
            this.updateLFOControl(paramId, value);
        });
    }

    initKnob(knobInfo)
    {
       
        const callback = value => {
            const roundedValue = Math.round(value);
            let realParamName = knobInfo.id;

            if (knobInfo.isEnv) {
                realParamName = knobInfo.id.replace(/env/, 'env' + this.activeEnvIndex);
            } else if (knobInfo.isLFO) {
                realParamName = knobInfo.id.replace(/lfo/, 'lfo' + this.activeLFOIndex);
            }   
            this.patchConnection.sendEventOrValue(realParamName, roundedValue);
        }

        const knob = new RotaryKnob(
            `${knobInfo.id}-canvas`,
            knobInfo.id,
            this.patchConnection,
            callback, 
            {
                min: knobInfo.min,
                max: knobInfo.max,
                step: knobInfo.step || 1,
                defaultValue: knobInfo.defaultValue,
                knobColor: knobInfo.knobColor || '#ffffffff',
                trackColor: knobInfo.trackColor || '#464854ff',
                displayFormatter: knobInfo.displayFormatter,
                middleValue: knobInfo.middleValue                
            }
        );

        this.listeners[knobInfo.id] = value => {
            // Knob does nothing if the value is the same
            // Returns true if value was changed and not dragging. 
            if (knob.setValue(value)) {
                // HERE: value was changed by host, not UI.

                if (knobInfo.isLFO) {
                    // Extract lfo number
                    const lfoNumber = knobInfo.id.match(/lfo(\d)/)[1];
                    // Update LFO visualization if this is the active LFO
                    if (this.activeLFOIndex.toString() === lfoNumber) {
                        this.lfo.updateLFOControl(knobInfo.id, value);
                    }
                }
                if (knobInfo.isEnv) {
                    // Extract env number
                    const envNumber = knobInfo.id.match(/env(\d)/)[1];
                    // Update Envelope visualization if this is the active envelope
                    if (this.activeEnvIndex.toString() === envNumber) {
                        this.envelope.updateEnvelopeControl(knobInfo.id, value);
                    }
                }

            }

            // Update filter visualization for filter parameters
            if ((knobInfo.id === 'filterCutoff' || knobInfo.id === 'filterResonance') && this.filter) {
                this.filter.updateValue(knobInfo.id, value);
            }
        };

        // Standard knobs listen to their own parameter
        // Env UI knobs and LFO UI knobs don't listen to their parameters (they're virtual UI controls)
        this.patchConnection.addParameterListener(knobInfo.id, this.listeners[knobInfo.id]);
        this.patchConnection.requestParameterValue(knobInfo.id);
    }

    initWaveshapeKnob(paramId, color)
    {      
        const callback = value => {
            this.patchConnection.sendEventOrValue(paramId, value);
        }

        const waveShapeKnob = new WaveShapeKnob(paramId, this, callback, {knobColor: color});
    
        this.listeners[paramId] = value => {
            console.log(`Updating waveshape knob for ${paramId} with value ${value}`);
            waveShapeKnob.currentWaveshape = value;
            waveShapeKnob.drawWaveshapeKnob(value);
        };
        this.patchConnection.addParameterListener(paramId, this.listeners[paramId]);
        this.patchConnection.requestParameterValue(paramId);

        return waveShapeKnob;
    }


    initSyncButton()
    {
        const syncButton = this.querySelector('#osc2-sync-button');
        let syncActive = false;

        syncButton.addEventListener('click', () => {
            syncActive = !syncActive;
            syncButton.classList.toggle('active', syncActive);
            this.patchConnection.sendEventOrValue('osc2Sync', syncActive ? 1 : 0);


        });

        this.listeners.osc2Sync = value => {
            syncActive = (value === 1);
            syncButton.classList.toggle('active', syncActive);
        };

        this.patchConnection.addParameterListener('osc2Sync', this.listeners.osc2Sync);
        this.patchConnection.requestParameterValue('osc2Sync');
    }

    initSaturationTypeButton(paramId)
    {
        const button = this.querySelector(`#${paramId}-button`);
        const typeNames = ['No', 'Tube', 'Clip', 'Wave'];
        let currentType = 0;

        const updateButtonText = (type) => {
            currentType = type;
            button.textContent = typeNames[type];
        };

        button.addEventListener('click', () => {
            const newType = (currentType + 1) % 4;
            updateButtonText(newType);
            this.patchConnection.sendEventOrValue(paramId, newType);
        });

        this.listeners[paramId] = value => {
            updateButtonText(value);
        };

        this.patchConnection.addParameterListener(paramId, this.listeners[paramId]);
        this.patchConnection.requestParameterValue(paramId);
    }

    initNoiseTypeButtons()
    {
        const buttons = [
            { selector: '#osc3NoiseType-white-button', type: 0, label: 'white' },
            { selector: '#osc3NoiseType-pink-button', type: 1, label: 'pink' },
            { selector: '#osc3NoiseType-brown-button', type: 2, label: 'brown' }
        ];

        let currentType = 0;

        buttons.forEach(btnInfo => {
            const button = this.querySelector(btnInfo.selector);
            
            button.addEventListener('click', () => {
                currentType = btnInfo.type;
                this.updateNoiseTypeButtonStates(currentType, buttons);
                this.patchConnection.sendEventOrValue('osc3NoiseType', currentType);
            });
        });

        this.listeners.osc3NoiseType = value => {
            currentType = value;
            this.updateNoiseTypeButtonStates(currentType, buttons);
        };

        this.patchConnection.addParameterListener('osc3NoiseType', this.listeners.osc3NoiseType);
        this.patchConnection.requestParameterValue('osc3NoiseType');
    }

    updateNoiseTypeButtonStates(currentType, buttons)
    {
        buttons.forEach(btnInfo => {
            const button = this.querySelector(btnInfo.selector);
            const isActive = currentType === btnInfo.type;
            button.classList.toggle('active', isActive);
        });
    }

    initFilterTypeSelect()
    {
        const selectElement = this.querySelector('#filterTypeSelect');
        
        const updateFilterType = () => {
            const value = parseInt(selectElement.value);
            this.patchConnection.sendEventOrValue('filterType', value);
        };
        
        selectElement.addEventListener('change', updateFilterType);
        
        this.listeners.filterType = value => {
            selectElement.value = value.toString();
            // Update filter visualization
            if (this.filter) {
                this.filter.updateValue('filterType', value);
            }
        };
        
        this.patchConnection.addParameterListener('filterType', this.listeners.filterType);
        this.patchConnection.requestParameterValue('filterType');
    }

    initMatrixRows()
    {
        // Get both matrix grids - left (rows 1-4) and right (rows 5-8)
        const leftMatrixGrid = this.querySelector('.matrix-column-left .matrix-grid');
        const rightMatrixGrid = this.querySelector('.matrix-column-right .matrix-grid');
        
        // Create UI elements for each of the 8 rows
        for (let i = 0; i < 8; i++) {
            const rowIndex = i;
            const rowEl = document.createElement('div');
            rowEl.className = 'matrix-row';
            
            // Determine which grid to append to (left: 0-3, right: 4-7)
            const targetGrid = i < 4 ? leftMatrixGrid : rightMatrixGrid;
            
            // Row number
            const rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row-num';
            rowDiv.textContent = `${i + 1}`;
            
            // Source dropdown
            const sourceSelect = document.createElement('select');
            sourceSelect.className = 'matrix-select';
            sourceSelect.id = `mtx-source-${i}`;
            Object.entries(MtxSourceNames).forEach(([key, name]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = name;
                sourceSelect.appendChild(option);
            });
            
            // Multiplier knob canvas
            const multiplierCanvas = document.createElement('canvas');
            multiplierCanvas.className = 'matrix-multiplier-canvas';
            multiplierCanvas.id = `mtx-multiplier-${i}-canvas`;
            
            // Dest1 dropdown
            const dest1Select = document.createElement('select');
            dest1Select.className = 'matrix-select';
            dest1Select.id = `mtx-dest1-${i}`;
            Object.entries(MtxDestination).forEach(([key, name]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = name;
                dest1Select.appendChild(option);
            });
            
            // Dest2 dropdown
            const dest2Select = document.createElement('select');
            dest2Select.className = 'matrix-select';
            dest2Select.id = `mtx-dest2-${i}`;
            Object.entries(MtxDestination).forEach(([key, name]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = name;
                dest2Select.appendChild(option);
            });
            
            // Append all elements to row
            rowEl.appendChild(rowDiv);
            rowEl.appendChild(sourceSelect);
            rowEl.appendChild(multiplierCanvas);
            rowEl.appendChild(dest1Select);
            rowEl.appendChild(dest2Select);
            
            targetGrid.appendChild(rowEl);
            
            // Create RotaryKnob for multiplier
            const multiplierKnob = new RotaryKnob(
                `mtx-multiplier-${i}-canvas`,
                `mtx-multiplier-${i}`,
                this.patchConnection,
                (value) => {
                    this.onMatrixRowChange(rowIndex, 'multiplier', value);
                },
                {
                    min: -10,
                    max: 10,
                    step: 0.1,
                    defaultValue: 1,
                    knobColor: '#667eea',
                    trackColor: '#464854ff'
                }
            );
            
            // Store knob reference for later updates
            this.mtxMultiplierKnobs[i] = multiplierKnob;
            
            // Add event listeners for UI changes
            sourceSelect.addEventListener('change', (e) => {
                this.onMatrixRowChange(rowIndex, 'source', parseInt(e.target.value));
            });
            
            dest1Select.addEventListener('change', (e) => {
                this.onMatrixRowChange(rowIndex, 'dest1', parseInt(e.target.value));
            });
            
            dest2Select.addEventListener('change', (e) => {
                this.onMatrixRowChange(rowIndex, 'dest2', parseInt(e.target.value));
            });

            // Add parameter listeners for Cmajor updates (1-indexed row numbers)
            const rowNum = i + 1;
            
            // Source parameter listener
            const sourceParamId = `mtxRow${rowNum}Source`;
            this.patchConnection.addParameterListener(sourceParamId, (value) => {
                this.mtxState.rows[rowIndex].source = value;
                sourceSelect.value = value;
            });
            this.patchConnection.requestParameterValue(sourceParamId);
            
            // Multiplier parameter listener
            const multiplierParamId = `mtxRow${rowNum}Multiplier`;
            this.patchConnection.addParameterListener(multiplierParamId, (value) => {
                this.mtxState.rows[rowIndex].multiplier = value;
                multiplierKnob.setValue(value);
            });
            this.patchConnection.requestParameterValue(multiplierParamId);
            
            // Dest1 parameter listener
            const dest1ParamId = `mtxRow${rowNum}Dest1`;
            this.patchConnection.addParameterListener(dest1ParamId, (value) => {
                this.mtxState.rows[rowIndex].dest1 = value;
                dest1Select.value = value;
            });
            this.patchConnection.requestParameterValue(dest1ParamId);
            
            // Dest2 parameter listener
            const dest2ParamId = `mtxRow${rowNum}Dest2`;
            this.patchConnection.addParameterListener(dest2ParamId, (value) => {
                this.mtxState.rows[rowIndex].dest2 = value;
                dest2Select.value = value;
            });
            this.patchConnection.requestParameterValue(dest2ParamId);
        }
    }

    onMatrixRowChange(rowIndex, field, value)
    {
        // Update internal state
        this.mtxState.rows[rowIndex][field] = value;
        
        // Send individual events to Cmajor for each field (1-indexed row numbers)
        const rowNum = rowIndex + 1;
        
        if (field === 'source' || field === undefined) {
            this.patchConnection.sendEventOrValue(`mtxRow${rowNum}Source`, this.mtxState.rows[rowIndex].source);
        }
        if (field === 'multiplier' || field === undefined) {
            this.patchConnection.sendEventOrValue(`mtxRow${rowNum}Multiplier`, this.mtxState.rows[rowIndex].multiplier);
        }
        if (field === 'dest1' || field === undefined) {
            this.patchConnection.sendEventOrValue(`mtxRow${rowNum}Dest1`, this.mtxState.rows[rowIndex].dest1);
        }
        if (field === 'dest2' || field === undefined) {
            this.patchConnection.sendEventOrValue(`mtxRow${rowNum}Dest2`, this.mtxState.rows[rowIndex].dest2);
        }
    }



    valueToDBString(value) {
        if (value === 0) return '-∞ dB';
        const linear = value / 100;
        const db = 20 * Math.log10(linear);
        return `${db.toFixed(1)} dB`;
    }

    valueToPanString(value)
    {
        if (value === 0) return 'C';
        else if (value < 0) return `L${Math.abs(value)}`;
        else return `R${value}`;
    }


    disconnectedCallback()
    {
        // Remove all parameter listeners
        Object.keys(this.listeners).forEach(paramName => {
            this.patchConnection.removeParameterListener(paramName, this.listeners[paramName]);
        });
    }

    loadHTML()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './view/plugin.html', false); // false makes it synchronous
        xhr.send();
        return xhr.responseText;
    }

    /**
     * Callback handler when envelope is dropped on a knob
     * @param {number} envelopeNumber - The envelope number (1, 2, or 3)
     * @param {string} knobId - The knob ID (e.g., "osc1Transpose")
     */
    onEnvelopeDroppedOnKnob(envelopeNumber, knobId) {
        console.log(`[Envelope Modulation] Envelope ${envelopeNumber} assigned to knob: ${knobId}`);
        
        // TODO: Implement your modulation logic here
        // Example: You could send a message to your Cmajor patch:
        // this.patchConnection.sendEventOrValue(`env${envelopeNumber}AssignTo`, knobId);
        
        // Or update your UI to show the assignment
        // this.showModulationAssignment(envelopeNumber, knobId);
    }

    getHTML()
    {
        return this.loadHTML();
    }
}

window.customElements.define ("test-view", test_View);

/* This is the function that a host (the command line patch player, or a Cmajor plugin
   loader, or our VScode extension, etc) will call in order to create a view for your patch.

   Ultimately, a DOM element must be returned to the caller for it to append to its document.
   However, this function can be `async` if you need to perform asyncronous tasks, such as
   fetching remote resources for use in the view, before completing.
*/
export default function createPatchView (patchConnection)
{    
    return new test_View (patchConnection);
}
