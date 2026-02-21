
import * as presets from "../view/gui/presets/presetBank.js"
import * as controllers from "./controllerMapping.js"

let patchConnection;
let presetBank = new presets.PresetBank();
let controllerMappings = new controllers.ControllerMappings();

let currentParameterValues = new Map();
let programNumber = 0;
let recording = 0;


let isSessionConnected = false;

const stateValueChangeListener = event =>
{
    // Record current parameter values if recording is enabled
    if (recording == 1)
        presetBank.setPresetParameters(programNumber, Object.fromEntries(currentParameterValues));

    if (event.key == "currentProgram")
    {
        if (! event.value)
        {
            patchConnection.sendStoredStateValue("currentProgram", 0);
            return;
        }

        const oldProgramNumber = programNumber;
        programNumber = event.value ^ 0;
        const preset = presetBank.getPreset(programNumber);

        if (preset)
        {
            currentParameterValues.clear();

            // Load the preset into the patch
            if (oldProgramNumber != programNumber)
                presetBank.sendParametersToPatchConnection(patchConnection, programNumber);

            patchConnection.sendStoredStateValue("presetName", preset.name);
        }
    }

    if (event.key == "recordEnabled")
    {
        recording = event.value;
    }

    if (event.key == "setPresetName")
    {
        presetBank.setPresetName(programNumber, event.value);
    }

    if (event.key == "presetList")
    {
        patchConnection.sendStoredStateValue("presetList", presetBank.getPresetList());
    }
}

const statusListener = status =>
{
    if (status.connected != isSessionConnected)
    {
        isSessionConnected = !! status.connected;
        patchConnection.requestStoredStateValue("currentProgram");
    }

    if (status.details?.inputs)
    {
        for (const endpointInfo of status.details.inputs)
            controllerMappings.addEndpoint(endpointInfo)
    }
}

let lastBank = 0;

const parameterListener = event =>
{
    currentParameterValues.set(event.endpointID, event.value);
}

export default function runWorker (pc)
{
    patchConnection = pc;

    const midi = patchConnection.utilities.midi;

    // Debug: Log MIDI object to see what's available
    console.log("MIDI object:", midi);

    const midiInListener = event =>
    {
        try {
            if (midi.isController(event.message))
            {
                const ccNum = midi.getControllerNumber(event.message);
                const ccVal = midi.getControllerValue(event.message);
                
                if (ccNum == 0) // bank select
                    lastBank = ccVal;

                controllerMappings.applyController(patchConnection, ccNum, ccVal)
            }

            if (midi.isProgramChange(event.message))
            {
                const programNum = midi.getProgramChangeNumber(event.message);
                const programIndex = lastBank * 128 + programNum;
                patchConnection.sendStoredStateValue("currentProgram", presets.PresetBank.getIDOfIndex(programIndex));
            }
        } catch (error) {
            console.error("Error in MIDI handler:", error, error.stack);
        }
    };

    patchConnection.addStatusListener(statusListener);
    patchConnection.requestStatusUpdate();

    patchConnection.addStoredStateValueListener(stateValueChangeListener);
    patchConnection.addEndpointListener("midiIn", midiInListener);
    patchConnection.addAllParameterListener(parameterListener);

    patchConnection.requestStoredStateValue("currentProgram");

    console.log("FirstSynth worker initialized successfully");
}
