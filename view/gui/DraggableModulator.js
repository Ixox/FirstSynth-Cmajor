/**
 * DraggableModulator
 * Handles drag-drop of envelope cross to knobs for modulation assignment
 * 
 * Usage:
 * const modulator = new DraggableModulator(parentElement, onDropCallback);
 * 
 * Callback signature:
 * onDropCallback(envelopeNumber, knobId)
 */
export class DraggableModulator {
    constructor(parentElement, onDropCallback) {
        this.parent = parentElement;
        this.onDropCallback = onDropCallback;
        this.knobRegistry = [];
        this.currentDragTarget = null;
        this.currentEnvelopeNumber = null;
        
        // Initialize knob detection and drag/drop handlers
        this.initKnobRegistry();
        this.initDragDropHandlers();
    }

    /**
     * Builds a registry of all knob canvases with their IDs
     * Called once during initialization
     */
    initKnobRegistry() {
        // Get all knob canvases
        const knobCanvases = this.parent.querySelectorAll('.control-canvas');
        const modulableKnobs = "osc1Transpose osc1Pan osc2Transpose osc2Pan osc3Transpose osc3Pan filterCutoff".split(" ");
        
        modulableKnobs.forEach(knobId => {
            const knobCanvases = this.parent.querySelectorAll(`.control-canvas[id='${knobId}-canvas']`);
            if (knobCanvases.length === 0) {
                console.warn(`[DraggableModulator] Knob canvas not found for ID: ${knobId}`);
                return;
            }
            const canvas = knobCanvases[0];
            this.knobRegistry.push({
                knobId: knobId,
                canvas: canvas,
                rect: null, // Will be cached during drag
                isHighlighted: false
            });
        });
        
        console.log(`[DraggableModulator] Registered ${this.knobRegistry.length} knobs`);
    }

    /**
     * Initialize drag-drop event handlers for the cross element
     */
    initDragDropHandlers() {
        const cross = this.parent.querySelector('.envelope-cross');

        if (!cross) {
            console.warn('[DraggableModulator] Cross element not found');
            return;
        }

        // DRAG START - Initialize drag operation
        cross.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'copy';
            e.dataTransfer.setData('text/plain', 'envelope-modulator');
            
            // Store the current active envelope number
            this.currentEnvelopeNumber = this.parent.activeEnvIndex;
           
            cross.classList.add('dragging');

            this.highlightAllModulableKnobs()

            console.log(`[DraggableModulator] dragstart ** envelope ${this.currentEnvelopeNumber}`);
        });

        // DRAG OVER - Detect which knob is under cursor
        document.addEventListener('dragover', (e) => {
            // First, verify this is our envelope drag by checking dataTransfer types
            // (we set 'text/plain' data in dragstart)
            if (!e.dataTransfer.types || !e.dataTransfer.types.includes('text/plain')) {
                return;
            }

            if (!this.currentEnvelopeNumber) {
                return;
            }

            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';

            // Get current mouse position
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Find knob under cursor
            const targetKnob = this.findKnobAtPosition(mouseX, mouseY);

            // Update visual feedback
            if (targetKnob !== null && targetKnob !== this.currentDragTarget) {
                this.highlightKnob(targetKnob);

                // Store current target for drop event
                this.currentDragTarget = targetKnob;
            }   
        });

        // DROP - Execute the modulation assignment
        document.addEventListener('drop', (e) => {
            // Verify this is our envelope drag
            if (!e.dataTransfer.types || !e.dataTransfer.types.includes('text/plain')) {
                return;
            }

            if (!this.currentEnvelopeNumber) {
                return;
            }

            e.preventDefault();

            if (this.currentDragTarget) {
                const envelopeNumber = this.currentEnvelopeNumber;
                const knobId = this.currentDragTarget.knobId;

                console.log(`[DraggableModulator] Dropped envelope ${envelopeNumber} on knob: ${knobId}`);

                // Trigger the callback
                if (this.onDropCallback) {
                    this.onDropCallback(envelopeNumber, knobId);
                }
            }

            // Clean up
            this.cleanup();
        });

        // DRAG END - Clean up
        cross.addEventListener('dragend', (e) => {
            this.cleanup();
        });

        // Also clean up if drag leaves the window
/*        document.addEventListener('dragleave', (e) => {
            // Only cleanup if leaving the document
            if (!e.relatedTarget) {
                this.cleanup();
            }
        });*/
    }

    /**
     * Find which knob (if any) is at the given mouse position
     * @param {number} mouseX - Client X coordinate
     * @param {number} mouseY - Client Y coordinate
     * @returns {Object|null} - Knob info object or null
     */
    findKnobAtPosition(mouseX, mouseY) {
        const hitPadding = 12; // pixels - expand hit area for easier dropping

        for (let knobInfo of this.knobRegistry) {
            // Get current position of knob canvas
            const rect = knobInfo.canvas.getBoundingClientRect();

            // Check if mouse is within expanded bounds
            if (mouseX >= rect.left - hitPadding &&
                mouseX <= rect.right + hitPadding &&
                mouseY >= rect.top - hitPadding &&
                mouseY <= rect.bottom + hitPadding) {
                return knobInfo;
            }
        }

        return null; // No knob found
    }

    /**
     * Highlight a knob with visual feedback
     * @param {Object|null} knobInfo - Knob to highlight or null to clear
     */
    highlightKnob(knobInfo) {
        // Clear previous highlight
        this.knobRegistry.forEach(k => {
            if (k.isHighlighted) {
//                k.canvas.style.boxShadow = '0 0 12px rgba(102, 126, 234, 0.9), inset 0 0 8px rgba(102, 126, 234, 0.5)';
                k.canvas.style.filter = 'brightness(1.1)';
                k.isHighlighted = false;
            }
        });

        // Apply highlight to new knob
        if (knobInfo) {
            // Blue glow effect
 //           knobInfo.canvas.style.boxShadow = '0 0 12px rgba(168, 179, 226, 0.9), inset 0 0 8px rgba(168, 179, 226, 0.5)';
            knobInfo.canvas.style.filter = 'brightness(1.5)';
            knobInfo.isHighlighted = true;
        }
    }

    highlightAllModulableKnobs() {
        this.knobRegistry.forEach(k => {
            k.canvas.style.boxShadow = '0 0 12px rgba(102, 126, 234, 0.9), inset 0 0 8px rgba(102, 126, 234, 0.5)';
            k.canvas.style.filter = 'brightness(1.1)';
            k.isHighlighted = false;
        });
    }

    /**
     * Clean up drag state
     */
    cleanup() {
        this.knobRegistry.forEach(k => {
            k.canvas.style.boxShadow = 'none';
            k.canvas.style.filter = 'brightness(1)';
            k.isHighlighted = false;
        });


        const cross = this.parent.querySelector('.envelope-cross');
        if (cross) {
            cross.classList.remove('dragging');
        }
        this.highlightKnob(null);
        this.currentDragTarget = null;
        this.currentEnvelopeNumber = null;
    }
}
