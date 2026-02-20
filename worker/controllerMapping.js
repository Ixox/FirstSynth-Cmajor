/**
 * ControllerMappings - Maps MIDI controllers to FirstSynth parameters
 */

export class ControllerMappings {
    constructor() {
        this.endpoints = [];
        
        // Default MIDI CC mappings (CC number -> parameter name)
        this.defaultMappings = {
            1: 'filterCutoff',           // Modulation wheel -> Filter Cutoff
            7: 'mainGain',               // Volume (CC 7)
            10: 'stereoSpread',          // Pan (CC 10)
            11: 'chorusAmount',          // Expression pedal
            64: 'osc2Sync',              // Sustain pedal -> OSC2 Sync toggle
            70: 'filterResonance',       // CC 70
            71: 'osc1Gain',              // CC 71
            72: 'osc2Gain',              // CC 72
            73: 'osc3Gain',              // CC 73
            74: 'lfo1Rate',              // CC 74
            75: 'lfo2Rate',              // CC 75
            76: 'lfo3Rate',              // CC 76
        };

        // Track active parameters to avoid redundant sends
        this.activeControllers = new Map();
    }

    /**
     * Add an endpoint (audio input/output) information
     */
    addEndpoint(endpointInfo) {
        if (!this.endpoints.find(e => e.name === endpointInfo.name)) {
            this.endpoints.push(endpointInfo);
        }
    }

    /**
     * Apply a MIDI controller value to the patch
     */
    applyController(patchConnection, controllerNumber, controllerValue) {
        const paramName = this.defaultMappings[controllerNumber];
        
        if (!paramName) {
            // Unmapped controller
            return;
        }

        // Skip redundant sends
        const key = `${controllerNumber}`;
        if (this.activeControllers.get(key) === controllerValue) {
            return;
        }

        this.activeControllers.set(key, controllerValue);

        // Convert MIDI value (0-127) to appropriate range for parameter
        const mappedValue = this.mapControllerValueToParameter(paramName, controllerValue);
        
        // Send to patch
        patchConnection.sendEventOrValue(paramName, mappedValue);
    }

    /**
     * Apply pitch wheel modulation (±0.5 semitones)
     * MIDI pitch bend is 14-bit (0-16383), where 8192 is center
     * Pass baseTranspose values to apply correct modulation
     */
    applyPitchWheel(patchConnection, pitchBendValue, baseTransposeValues = {}) {
        // Normalize to -1.0 to +1.0 (center is 8192)
        const normalized = (pitchBendValue - 8192) / 8192;

        // Map to ±0.5 semitones
        const pitchModulation = normalized * 0.5;

        console.log(`Pitch wheel: raw=${pitchBendValue}, normalized=${normalized.toFixed(3)}, mod=${pitchModulation.toFixed(3)} semitones`);

        // Send absolute transpose values (base + pitch wheel offset)
        if (baseTransposeValues.osc1 !== undefined) {
            const osc1Value = baseTransposeValues.osc1 + pitchModulation;
            patchConnection.sendEventOrValue('osc1Transpose', osc1Value);
        }
        if (baseTransposeValues.osc2 !== undefined) {
            const osc2Value = baseTransposeValues.osc2 + pitchModulation;
            patchConnection.sendEventOrValue('osc2Transpose', osc2Value);
        }
        if (baseTransposeValues.osc3 !== undefined) {
            const osc3Value = baseTransposeValues.osc3 + pitchModulation;
            patchConnection.sendEventOrValue('osc3Transpose', osc3Value);
        }
    }

    /**
     * Map MIDI CC value (0-127) to parameter-specific range
     */
    mapControllerValueToParameter(paramName, midiValue) {
        // Normalize MIDI value to 0-1 range
        const normalized = midiValue / 127;

        // Parameter-specific mappings
        switch (paramName) {
            case 'filterCutoff':
                // Map to 20-20000 Hz logarithmically
                return 20 * Math.pow(1000, normalized);
            
            case 'filterResonance':
                // Map to 20-1000
                return 20 + normalized * 980;
            
            case 'mainGain':
            case 'osc1Gain':
            case 'osc2Gain':
            case 'osc3Gain':
                // Map to 0-141 dB range
                return Math.round(normalized * 141);
            
            case 'lfo1Rate':
            case 'lfo2Rate':
            case 'lfo3Rate':
                // Map to 10-600 Hz
                return Math.round(10 + normalized * 590);
            
            case 'stereoSpread':
                // Map to 0-100%
                return Math.round(normalized * 100);
            
            case 'chorusAmount':
                // Map to 0-100%
                return Math.round(normalized * 100);
            
            case 'osc2Sync':
                // Toggle: 0 or 1
                return midiValue >= 64 ? 1 : 0;
            
            default:
                // Default: scale to 0-100
                return Math.round(normalized * 100);
        }
    }

    /**
     * Get the current mapping for a controller number
     */
    getMapping(controllerNumber) {
        return this.defaultMappings[controllerNumber] || null;
    }

    /**
     * Set custom mapping
     */
    setMapping(controllerNumber, parameterName) {
        this.defaultMappings[controllerNumber] = parameterName;
    }

    /**
     * Get all current mappings
     */
    getAllMappings() {
        return { ...this.defaultMappings };
    }
}
