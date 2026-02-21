/**
 * ControllerMappings - Maps MIDI controllers to FirstSynth parameters
 */

export class ControllerMappings {
    constructor() {
        this.endpoints = [];
        
        // Default MIDI CC mappings (CC number -> parameter name)
        this.defaultMappings = {
            7: { parameter: 'mainGain', mapping: v => Math.round((v / 127) * 141) }, // CC7: Main Gain (0-141 dB)
            10: { parameter: 'stereoSpread', mapping: v => Math.round((v / 127) * 100) },
            11: { parameter: 'chorusAmount', mapping: v => Math.round((v / 127) * 100) },
            21: { parameter: 'filterCutoff', mapping: v => 20 * Math.pow(1000, v / 127) },          
            22: { parameter: 'filterResonance', mapping: v => 20 + (v / 127) * 980 },       
            23: { parameter: 'lfo1Rate', mapping: v => Math.round(10 + (v / 127) * 590) },              
            24: { parameter: 'lfo2Rate', mapping: v => Math.round(10 + (v / 127) * 590) },              
            25: { parameter: 'lfo3Rate', mapping: v => Math.round(10 + (v / 127) * 590) },
            26: { parameter: 'mtxRow1Multiplier', mapping: v => -10 + (v / 127) * 20 },
            27: { parameter: 'mtxRow2Multiplier', mapping: v => -10 + (v / 127) * 20 },
            28: { parameter: 'mtxRow3Multiplier', mapping: v => -10 + (v / 127) * 20 }
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
     * @param {Object} patchConnection - Connection to patch
     * @param {number} controllerNumber - MIDI CC number
     * @param {number} controllerValue - MIDI CC value (0-127)
     */
    applyController(patchConnection, controllerNumber, controllerValue) {

        const mapping = this.defaultMappings[controllerNumber];
        
        if (!mapping) {
            // Unmapped controller
            return;
        }

        const key = `${controllerNumber}`;
        const paramName = mapping.parameter;

        // Skip redundant sends
        if (this.activeControllers.get(key) === controllerValue) {
            return;
        }

        this.activeControllers.set(key, controllerValue);

        // Convert MIDI value (0-127) to appropriate range for parameter
        const mappedValue = mapping.mapping(controllerValue);
        
        // Send to patch
        patchConnection.sendEventOrValue(paramName, mappedValue);
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
        this.defaultMappings[controllerNumber] = { parameter: parameterName, mapping: v => v };
    }

    /**
     * Get all current mappings
     */
    getAllMappings() {
        return { ...this.defaultMappings };
    }
}
