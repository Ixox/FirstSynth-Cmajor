/**
 * Draggable Modulator - Generic Framework
 * Handles drag-drop of various draggable sources (envelope, destinations) to configurable drop zones
 * 
 * Usage:
 * const dropZoneConfig = {
 *   MATRIX_SOURCE: { selector: '.matrix-row', selectIndex: 0, valueResolver: (value) => {...} },
 *   KNOB: { type: 'canvas', selector: '.control-canvas', valueResolver: (knobElement) => {...} }
 * };
 * const dragSourceConfig = {
 *   'envelope': ['MATRIX_SOURCE'],
 *   'destination': ['KNOB']
 * };
 * const modulator = new DraggableModulator(parentElement, dropZoneConfig, dragSourceConfig, onDropCallback);
 * 
 * Callback signature:
 * onDropCallback(sourceType, zoneType, zoneId, element)
 */
export class DraggableModulator {
    constructor(parentElement, dropZoneConfig, dragSourceConfig, onDropCallback) {
        this.parent = parentElement;
        this.dropZoneConfig = dropZoneConfig;
        this.dragSourceConfig = dragSourceConfig;
        this.onDropCallback = onDropCallback;
        this.dropZones = [];
        this.currentDragTarget = null;
        this.currentDragSource = null;  // Stores info about the drag source (type, data)
        this.validZoneTypes = [];
        
        // Initialize drop zone detection and drag/drop handlers
        this.initDropZoneRegistry();
        this.initDragDropHandlers();
    }

    /**
     * Builds a registry of all drop zones based on configuration
     * Called once during initialization
     */
    initDropZoneRegistry() {
        // Iterate through each zone type in the config
        Object.entries(this.dropZoneConfig).forEach(([zoneType, zoneConfig]) => {
            // Handle canvas type zones (knobs)
            if (zoneConfig.type === 'canvas') {
                const canvases = this.parent.querySelectorAll(zoneConfig.selector);
                let zoneId = 1;
                
                canvases.forEach(canvas => {
                    const knobId = canvas.id ? canvas.id.replace(/-canvas|-knob$/, '') : `knob-${zoneId}`;
                    
                    // Skip this knob if it doesn't pass the filter
                    if (zoneConfig.filter && !zoneConfig.filter(knobId)) {
                        return;
                    }
                    
                    this.dropZones.push({
                        type: zoneType,
                        id: zoneId,
                        element: canvas,
                        knobId: knobId,
                        valueResolver: zoneConfig.valueResolver,
                        isHighlighted: false
                    });
                    zoneId++;
                });
            } 
            // Handle select type zones (matrix sources/destinations)
            else {
                const containers = this.parent.querySelectorAll(zoneConfig.selector);
                let zoneId = 1;
                
                containers.forEach(container => {
                    const selects = container.querySelectorAll('.matrix-select');
                    if (selects.length <= zoneConfig.selectIndex) {
                        console.warn(`[DraggableModulator] Select not found at index ${zoneConfig.selectIndex} for zone type ${zoneType}`);
                        return;
                    }
                    
                    const selectElement = selects[zoneConfig.selectIndex];
                    this.dropZones.push({
                        type: zoneType,
                        id: zoneId,
                        element: selectElement,
                        valueResolver: zoneConfig.valueResolver,
                        isHighlighted: false
                    });
                    
                    zoneId++;
                });
            }
        });
        
        console.log(`[DraggableModulator] Registered ${this.dropZones.length} drop zones`);
    }

    /**
     * Initialize drag-drop event handlers for all draggable elements
     */
    initDragDropHandlers() {
        // Handle envelope cross drag
        const cross = this.parent.querySelector('.envelope-cross');
        if (cross) {
            cross.addEventListener('dragstart', (e) => this.handleDragStart(e, 'envelope', this.parent.activeEnvIndex));
            cross.addEventListener('dragend', (e) => this.handleDragEnd(e));
        }

        // Handle LFO cross drag
        const lfoCross = this.parent.querySelector('.lfo-cross');
        if (lfoCross) {
            lfoCross.addEventListener('dragstart', (e) => this.handleDragStart(e, 'lfo', this.parent.activeLFOIndex));
            lfoCross.addEventListener('dragend', (e) => this.handleDragEnd(e));
        }

        // Handle destination cross drags
        const destCrosses = this.parent.querySelectorAll('.destination-cross');
        destCrosses.forEach(cross => {
            cross.addEventListener('dragstart', (e) => {
                const rowIndex = parseInt(cross.dataset.rowIndex);
                const destIndex = parseInt(cross.dataset.destIndex);
                this.handleDragStart(e, 'destination', { rowIndex, destIndex });
            });
            cross.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        // Global drag over handler
        document.addEventListener('dragover', (e) => this.handleDragOver(e));
        
        // Global drop handler
        document.addEventListener('drop', (e) => this.handleDrop(e));
    }

    handleDragStart(e, sourceType, sourceData) {
        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', `modulator-${sourceType}`);
        
        // Store drag source info
        this.currentDragSource = { type: sourceType, data: sourceData };
        
        // Determine valid zone types
        this.validZoneTypes = this.dragSourceConfig[sourceType] || [];
       
        e.target.classList.add('dragging');

        this.highlightValidDropZones('1px solid rgba(78, 177, 47, 0.8)');

        console.log(`[DraggableModulator] dragstart ** ${sourceType} ${JSON.stringify(sourceData)}, valid zones: ${this.validZoneTypes.join(', ')}`);
    }

    handleDragEnd(e) {
        this.cleanup();
    }

    handleDragOver(e) {
        if (!e.dataTransfer.types || !e.dataTransfer.types.includes('text/plain')) {
            return;
        }

        if (!this.currentDragSource) {
            return;
        }

        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        // Get current mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Find drop zone under cursor
        const targetZone = this.findDropZoneAtPosition(mouseX, mouseY);

        // Update visual feedback - only if zone type is valid
        if (targetZone !== null && targetZone !== this.currentDragTarget && this.validZoneTypes.includes(targetZone.type)) {
            this.highlightDropZone(targetZone);
            this.currentDragTarget = targetZone;
        }   
    }

    handleDrop(e) {
        if (!e.dataTransfer.types || !e.dataTransfer.types.includes('text/plain')) {
            return;
        }

        if (!this.currentDragSource) {
            return;
        }

        e.preventDefault();

        if (this.currentDragTarget && this.validZoneTypes.includes(this.currentDragTarget.type)) {
            const sourceType = this.currentDragSource.type;
            const sourceData = this.currentDragSource.data;
            const zoneType = this.currentDragTarget.type;
            const zoneId = this.currentDragTarget.id;
            
            // Use the zone's valueResolver to calculate the value to set
            let resolvedValue;
            if (zoneType === 'KNOB') {
                // For knobs, pass the knobId to valueResolver
                resolvedValue = this.currentDragTarget.valueResolver(this.currentDragTarget.knobId);
            } else {
                // For matrix sources/destinations, pass the source data and type
                resolvedValue = this.currentDragTarget.valueResolver(sourceData, sourceType);
            }
            
            this.currentDragTarget.element.value = resolvedValue;
            this.currentDragTarget.element.dispatchEvent(new Event('change', { bubbles: true }));

            console.log(`[DraggableModulator] Dropped ${sourceType} on ${zoneType} zone ${zoneId} (value: ${resolvedValue})`);

            // Trigger the callback
            if (this.onDropCallback) {
                this.onDropCallback(sourceType, zoneType, zoneId, this.currentDragTarget.element, sourceData, resolvedValue);
            }
        }

        this.cleanup();
    }

    /**
     * Find which drop zone (if any) is at the given mouse position
     * Only matches zones with valid types for current drag
     * @param {number} mouseX - Client X coordinate
     * @param {number} mouseY - Client Y coordinate
     * @returns {Object|null} - Drop zone info object or null
     */
    findDropZoneAtPosition(mouseX, mouseY) {
        const hitPadding = 8; // pixels - expand hit area for easier dropping

        for (let zoneInfo of this.dropZones) {
            // Only consider zones with valid types
            if (!this.validZoneTypes.includes(zoneInfo.type)) {
                continue;
            }
            
            // Get current position of zone element
            const rect = zoneInfo.element.getBoundingClientRect();

            // Check if mouse is within expanded bounds
            if (mouseX >= rect.left - hitPadding &&
                mouseX <= rect.right + hitPadding &&
                mouseY >= rect.top - hitPadding &&
                mouseY <= rect.bottom + hitPadding) {
                return zoneInfo;
            }
        }

        return null; // No valid drop zone found
    }

    /**
     * Highlight drop zones with visual feedback
     * @param {Object|null} zoneInfo - Drop zone to highlight or null to clear
     */
    highlightDropZone(zoneInfo) {
        // Reset valid zones to just green border
        this.highlightValidDropZones('1px solid rgba(78, 177, 47, 0.8)');

        // Apply hover highlight to new zone
        if (zoneInfo) {
            zoneInfo.element.style.backgroundColor = 'rgba(78, 177, 47, 0.2)';
            zoneInfo.element.style.border = '1px solid rgba(78, 177, 47, 0.9)';
            zoneInfo.element.style.borderRadius = '4px';
            zoneInfo.isHighlighted = true;
        }
    }

    /**
     * Highlight only valid drop zones (based on current drag source)
     */
    highlightValidDropZones(borderColor) {
        this.dropZones.forEach(z => {
            if (this.validZoneTypes.includes(z.type)) {
                z.element.style.border = borderColor || '';
                z.element.style.borderRadius = '4px';
                z.element.style.backgroundColor = '';
            } else {
                // Clear invalid zones
                z.element.style.border = '';
                z.element.style.borderRadius = '';
                z.element.style.backgroundColor = '';
            }
            z.isHighlighted = false;
        });
    }

    /**
     * Clear all highlights
     */
    clearAllHighlights() {
        this.dropZones.forEach(z => {
            z.element.style.border = '';
            z.element.style.borderRadius = '';
            z.element.style.backgroundColor = '';
            z.isHighlighted = false;
        });
    }

    /**
     * Clean up drag state
     */
    cleanup() {
        this.clearAllHighlights();

        const cross = this.parent.querySelector('.envelope-cross');
        if (cross) {
            cross.classList.remove('dragging');
        }
        
        const destCrosses = this.parent.querySelectorAll('.destination-cross');
        destCrosses.forEach(cross => {
            cross.classList.remove('dragging');
        });

        this.highlightDropZone(null);
        this.currentDragTarget = null;
        this.currentDragSource = null;
        this.validZoneTypes = [];
    }
}
