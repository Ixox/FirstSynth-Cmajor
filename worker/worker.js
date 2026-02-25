
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

// Helper function to convert MIDI note number to note name
function getMidiNoteName(noteNumber) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(noteNumber / 12) - 2;
    const noteInOctave = noteNumber % 12;
    return noteNames[noteInOctave] + octave;
}

export default function runWorker (pc)
{
    patchConnection = pc;

    console.log('Worker: runWorker() initialized');

    const midi = patchConnection.utilities.midi;

    const midiInListener = event =>
    {
        try {
            if (midi.isController(event.message))
            {                
                const ccNum = midi.getControllerNumber(event.message);
                const ccVal = midi.getControllerValue(event.message);
                
                if (ccNum == 0) // bank select
                    lastBank = ccVal;
                else if (ccNum == 1) { // mod wheel - send to stored state for UI
                    const normalizedValue = ccVal / 127.0;
                    patchConnection.sendStoredStateValue("modWheelValue", normalizedValue);
                }
                else
                    controllerMappings.applyController(patchConnection, ccNum, ccVal)
            }

            if (midi.isNoteOn(event.message))
            {
                const noteNumber = midi.getNoteNumber(event.message);
                const noteName = getMidiNoteName(noteNumber);
                patchConnection.sendStoredStateValue("currentNote", noteName);
            }

            if (midi.isNoteOff(event.message))
            {
                patchConnection.sendStoredStateValue("currentNote", "");
            }

            if (midi.isProgramChange(event.message))
            {
                const programNum = midi.getProgramChangeNumber(event.message);
                const programIndex = lastBank * 128 + programNum;
                patchConnection.sendStoredStateValue("currentProgram", presets.PresetBank.getIDOfIndex(programIndex));
            }

            if (midi.isPitchWheel(event.message))
            {
                const bendValue = midi.getPitchWheelValue(event.message);
                // bendValue is 0-16384, center is 8192. Convert to -1 to 1 range
                const normalizedValue = (bendValue - 8192) / 8192.0;
                patchConnection.sendStoredStateValue("pitchBendValue", normalizedValue);
            }
        } catch (error) {
            console.error("Error in MIDI handler:", error);
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
