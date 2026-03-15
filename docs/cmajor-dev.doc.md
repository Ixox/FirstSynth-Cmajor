### Cmajor VSCode Extension: View Example Patches Command

Source: https://cmajor.dev/docs/GettingStarted

Describes the 'Cmajor: View some example patches' command, which directs users to the Cmajor GitHub repository for example patches, allowing cloning or specific downloads.

```APIDOC
Cmajor: View some example patches
This command will take you to the Cmajor repository where you can find our example patches. You can either clone the whole repository from github, or just download specific examples from the examples folder.
```

--------------------------------

### Initialize Voice State (start)

Source: https://cmajor.dev/docs/StandardLibrary

The `start` function initializes a voice state, typically used for setting up a new voice with its channel and pitch.

```APIDOC
start(this: VoiceState&, channel: int32, pitch: float32) -> void
  this: Reference to the VoiceState object.
  channel: The channel ID for the voice.
  pitch: The initial pitch value for the voice.
```

--------------------------------

### Example ONNX to Cmajor Conversion Command

Source: https://cmajor.dev/docs/Tools/MachineLearning

This example demonstrates the typical usage of the `onnxToCmajor.py` script. It shows how to specify the input ONNX model file and the desired output directory for the generated Cmajor patch, ensuring proper conversion.

```Python
onnxToCmajor.py --model "path/to/your/model.onnx" --patchDir "path/to/output/patch"
```

--------------------------------

### Cmajor Connection Syntax Examples

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates different ways to establish connections between nodes and graph endpoints in Cmajor. Examples cover explicit endpoint naming, implicit naming for single-port nodes, chaining connections, sending output to multiple destinations, and using a braced block for multiple connection declarations.

```Cmajor
// Node endpoints use the syntax <node name>.<endpoint name>
connection node1.output1 -> node3.input2;

// The graph's top-level endpoints are referred to by using their name on its own
connection node3.output7 -> output3;

// For nodes that only have a single input or output, the endpoint name can
// be omitted, and you can write chains of connections as a single statement:
connection node1.output1 -> node2 -> node3 -> output3;

// You can use a comma-separated list to send an output to multiple destinations:
connection node.output1 -> node2.in1, node3.in3;

// As for nodes and endpoints, you can also use a braced block to declare the connections:
connection
{
    node3.output7 -> output3;
    node1.output1 -> node2 -> node3 -> output3;
}
```

--------------------------------

### Play Cmajor Patch

Source: https://cmajor.dev/docs/GettingStarted

Command-line instruction to run a Cmajor patch. This command starts the audio playback of the specified Cmajor patch file.

```Shell
$ cmaj play AnnoyingBeep/AnnoyingBeep.cmajorpatch
```

--------------------------------

### Example RTNeural to Cmajor Conversion Command

Source: https://cmajor.dev/docs/Tools/MachineLearning

This example illustrates how to execute the `rtneuralToCmajor.py` script. It shows the command structure for providing the input RTNeural model file and the target output directory for the generated Cmajor patch files.

```Python
rtneuralToCmajor.py --model "path/to/your/model.json" --patchDir "path/to/output/patch"
```

--------------------------------

### Cmajor Node Declaration Examples

Source: https://cmajor.dev/docs/LanguageReference

Illustrates various practical examples of node declarations in Cmajor, including simple instances, array instances, instances with specialization parameters, multiple nodes declared on a single line, and a multi-line block declaration using braces.

```Cmajor
node myNode1 = MyProcessor;  // simple instance of a processor
node myNode2 = SomeProcessor[4]; // declares a node which has an array of 4 instances of this processor
node myNode3 = OtherProc (float, 100); // declares an instance of a processor which has some specialisation parameters
node n1 = MyProcessor, n2 = MyProcessor; // you can use a comma to declare more than one node

// An alternative syntax for declaring multiple nodes is to use braces like this:
node
{
    n1 = MyProcessor;
    n2 = OtherProcessor;
}
```

--------------------------------

### Cmajor VSCode Extension: Create New Patch Command

Source: https://cmajor.dev/docs/GettingStarted

Explains the 'Cmajor: Create a new patch' command, which prompts for a filename and generates a template .cmajorpatch file with placeholder code for quick starting.

```APIDOC
Cmajor: Create a new patch
This command will prompt you to select the name of a new .cmajorpatch file. It will then create a template patch and some simple placeholder code as a way of getting started. You can run it with the Cmajor: Run patch command, and use it as a starting point to build upon.
```

--------------------------------

### Accessing Cmajor Built-in JavaScript Utilities

Source: https://cmajor.dev/docs/PatchFormat

Example JavaScript code demonstrating how to access Cmajor runtime utilities and API methods, such as getting the Cmajor version, MIDI descriptions, and instantiating utility classes like PianoKeyboard, via the `patchConnection` object.

```JavaScript
export default function createPatchView (patchConnection)
{
    console.log (`Cmajor version: ${patchConnection.getCmajorVersion()}`);
    console.log (`MIDI message: ${patchConnection.midi.getMIDIDescription (0x924030)}`);

    const keyboard = new patchConnection.utilities.PianoKeyboard();
}
```

--------------------------------

### Cmajor Processor Declaration Example

Source: https://cmajor.dev/docs/GettingStarted

Illustrates the structure of a Cmajor `processor` declaration. Processors contain a `main()` function with an infinite loop to read inputs, perform processing, and write outputs. This example shows a simple gain processor that halves the input stream.

```Cmajor
processor GainProcessor
{
    input  stream float in;    // declare an input and output stream of floats
    output stream float out;

    void main()
    {
        loop   // infinite loop
        {
            out <- in * 0.5f;  // read our next input value, multiply by 0.5, and send it to our output
            advance();         // advance to the next frame
        }
    }
}
```

--------------------------------

### Cmajor Graph with Pitch and Volume Parameters

Source: https://cmajor.dev/docs/GettingStarted

Expands on the previous example by adding a pitch control parameter to the Cmajor graph. Declaring `input sine.frequencyIn;` exposes a GUI control for the sine wave's frequency, alongside the existing volume control.

```Cmajor
graph AnnoyingBeep  [[main]]
{
    output stream float out;
    input gain.volume;
    input sine.frequencyIn;

    node sine = std::oscillators::Sine (float, 440);
    node gain = std::levels::SmoothedGain (float);

    connection sine -> gain.in;
    connection gain.out -> out;
}
```

--------------------------------

### Cmajor Processor Definition for Input Event/Value Example

Source: https://cmajor.dev/docs/TestFileFormat

An example Cmajor processor definition illustrating input event and value endpoints, used to explain the naming convention for corresponding JSON input files in the golden data directory.

```Cmajor
processor Test [[ main ]]
{
    input event float in;
    input value float valueIn;
    output event float out;
}
```

--------------------------------

### Cmajor Basic Function Definition Syntax

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the standard syntax for defining functions in Cmajor, which closely resembles C/C++/Java/C#. It shows examples of a void function and a function returning a float, demonstrating parameter declaration and return statements.

```Cmajor
void doSomething (int parameter1, bool parameter2)
{
    // ...
}

float calculateAverage (float f1, float f2)
{
    return (f1 + f2) / 2.0f;
}
```

--------------------------------

### Declare a Cmajor Graph with Nodes and Connections

Source: https://cmajor.dev/docs/GettingStarted

Provides an example of a Cmajor `graph` declaration, a high-level structure for defining audio processing flows. It shows how to specify inputs, outputs, declare internal nodes (which can be processors or other graphs), and define connections between these nodes.

```Cmajor
// Example of a graph declaration:
graph TwoGainsInSeries
{
    // This section declares the inputs and outputs of the graph:
    input  stream float in;
    output stream float out;

    // This section declares the nodes:
    node gain1 = GainProcessor;  // declare two nodes, each one a GainProcessor
    node gain2 = GainProcessor;

    // And here we list the connections between the nodes:
    connection in -> gain1 -> gain2 -> out;  // send our input through both gains, and the result to our output
}
```

--------------------------------

### Cmajor Type Metafunctions Usage Examples

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to use Cmajor's compile-time type metafunctions for type introspection and derivation, showing both dot notation and free function syntax. Examples include extracting element types and checking array properties.

```Cmajor
using MyArrayType = int64[10];
using T1 = MyArrayType.elementType;    // T1 is now int64.
using T2 = elementType (MyArrayType);  // (alternative syntax)
int[MyArrayType.size] x; // x is an array of 10 ints
```

```Cmajor
using T = int32[4];
T x;                // declares x as an int32[4]
x.elementType[5] y; // declares y as an int32[5]
static_assert (MyType.isFixedSizeArray, "MyType must be a fixed-size array!")
```

--------------------------------

### Cmaj Unit Test Function Example (`testFunction`)

Source: https://cmajor.dev/docs/TestFileFormat

Demonstrates the usage of the built-in `testFunction`. It wraps the provided Cmajor code in a dummy namespace, identifies functions that take no parameters and return a `bool`, and calls them. The test fails if any of these functions return `false`.

```Cmajor
## testFunction()

bool test1()    { return 1 + 1 == 2; }  // this will pass
bool test2()    { return 1 + 2 == 3; }  // this will fail
int notATest() {}  // this function will be ignored since it doesn't return a bool
```

--------------------------------

### Cmajor Function Overloading Examples

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates function overloading in Cmajor, where multiple functions can share the same name as long as their argument types differ. This allows for different implementations based on the input parameters.

```Cmajor
void handleMessage(std::notes::NoteOn n){}
```

```Cmajor
void handleMessage(std::notes::NoteOff n){}
```

--------------------------------

### Generate Native JUCE Project for VST/AudioUnit from Cmajor Patch

Source: https://cmajor.dev/docs/PatchFormat

Command line example using the `cmaj` tool to generate a JUCE C++ project from a Cmajor patch file, enabling native compilation into VST, AudioUnit, or AAX plugins. The resulting code translates Cmajor to pure C++ for static building.

```Shell
% cmaj generate --target=juce
                --output=[path to a target folder for the project]
                --jucePath=[path to your JUCE folder]
                MyAmazingPatch.cmajorpatch
```

--------------------------------

### Cmaj Unit Test Console Output Example (`testConsole`)

Source: https://cmajor.dev/docs/TestFileFormat

Shows how `testConsole` works by instantiating a main processor from the code chunk. The test checks the content written to the console against an expected value provided as a parameter. The processor's stream output is ignored for this test type.

```Cmajor
## testConsole ("hello world")

processor P
{
    output stream int out;
    void main()  { console <- "hello " <- "world"; out <- -1; advance(); }
}
```

--------------------------------

### Cmajor Patch Manifest with Worker Entry

Source: https://cmajor.dev/docs/PatchFormat

Example of a Cmajor patch manifest file (`.cmajorpatch`) demonstrating how to include a JavaScript worker by adding a `worker` entry pointing to the worker script. This file is loaded at patch startup or reset.

```JSON
{
    "CmajorVersion":    1,
    "ID":               "dev.cmajor.examples.helloworld",
    "version":          "1.0",
    "name":             "Hello World",
    "source":           "HelloWorld.cmajor",

    "worker":           "./my_worker.js"
}
```

--------------------------------

### Cmajor Test Directive: runScript with Processor and Expected Outputs

Source: https://cmajor.dev/docs/TestFileFormat

An example demonstrating the `runScript` directive with a `processor Gain` definition, illustrating how input streams (WAV) and values (JSON) are provided, and how output golden data files are automatically generated and prefixed.

```Cmajor
## runScript ({ frequency:1000, blockSize:32, samplesToRender:1000, subDir:"gain"})

processor Gain [[ main ]]
{
    input stream float<2> in;
    input value float gain;
    output stream float<2> out;
}
```

--------------------------------

### Example Cmajor Patch Manifest (JSON)

Source: https://cmajor.dev/docs/PatchFormat

This JSON snippet shows a typical `.cmajorpatch` manifest file, defining essential properties for a Cmajor patch such as CmajorVersion, ID, version, name, description, manufacturer, category, isInstrument, and the main source file. These properties are crucial for a host application to correctly identify and load the patch.

```JSON
{
    "CmajorVersion":    1,
    "ID":               "dev.cmajor.examples.helloworld",
    "version":          "1.0",
    "name":             "Hello World",
    "description":      "The classic audio Hello World",
    "manufacturer":     "Cmajor Software Ltd",
    "category":         "generator",
    "isInstrument":     false,
    "source":           "HelloWorld.cmajor"
}
```

--------------------------------

### Generate WebAudio/JavaScript/WebAssembly from Cmajor Patch

Source: https://cmajor.dev/docs/PatchFormat

Command line example using the `cmaj` tool to translate a Cmajor patch into a self-contained JavaScript class with WebAssembly for DSP, suitable for Web Audio integration. This provides JavaScript helper classes for Web Audio and MIDI.

```Shell
% cmaj generate --target=webaudio-html
                --output=/path/to/MyAmazingSynthPatchFolder
                MyAmazingSynthPatch.cmajorpatch
```

--------------------------------

### Cmaj Functional Style Type Casting Examples

Source: https://cmajor.dev/docs/LanguageReference

Illustrates Cmaj's functional style for type casting. Examples include casting a float to an integer, creating a float vector from an integer vector, and initializing an integer vector with a single value.

```Cmaj
let x = int (2.5);  // x has value 2 (int32)
let y = float<3> (int<3> (1, 2, 3));   // y is a float<3> vector 1.0f, 2.0f, 3.0f
let z = int<3> (3);   // z is (3, 3, 3)
```

--------------------------------

### Cmaj `for` Loop Syntax and Variations

Source: https://cmajor.dev/docs/LanguageReference

Explains the Cmaj `for` loop, which follows the familiar C/C++/Java/Javascript syntax for initialization, condition, and iteration. It includes examples for standard iteration, infinite loops, and iterating over range types like `wrap` and `clamp`.

```Cmaj
for (int i = 0; i < 5; ++i)
    console <- i;             // prints 0, 1, 2, 3, 4

for (;;)        // an infinite loop
   advance();

int i = 0;
for (; i < j; ++i)
    console <- i;             // prints 0, 1, 2, 3, 4
```

```Cmaj
for (wrap<5> i)
    console <- i;               // prints 0, 1, 2, 3, 4

for (clamp<5> i = 2)            // you can set an initial value
    console <- i;               // prints 2, 3, 4
```

--------------------------------

### Define a Cmajor Graph with Nodes and Connections

Source: https://cmajor.dev/docs/LanguageReference

Provides a complete example of a Cmajor graph definition, including input/output declarations, node instantiation, and connection statements. This graph applies a constant gain to a mono stream of floats, demonstrating a typical graph structure.

```Cmajor
// This example graph just applies a gain of 0.5 to a mono stream of floats
graph GainExample
{
    // Declare the graph's inputs and outputs first - this is done with exactly the same
    // syntax as used in a processor declaration
    output stream float out;
    input stream float in;

    // now declare the nodes that the graph contains:
    node attenuatorNode = std::levels::ConstantGain (float, 0.5f);

    // now declare how the nodes are connected:
    connection in -> attenuatorNode -> out;
}
```

--------------------------------

### Generate Native CLAP Plugin from Cmajor Patch

Source: https://cmajor.dev/docs/PatchFormat

Command line example using the `cmaj` tool to generate a static C++ CLAP plugin project from a Cmajor patch file. This creates a pure static C++ project that doesn’t perform any JIT compilation.

```Shell
% cmaj generate --target=clap
                --output=[path to a target folder for the project]
                --clapIncludePath=[path to your CLAP include folder]
                MyAmazingPatch.cmajorpatch
```

--------------------------------

### Cmaj Parameter Types: Using, Processor, Namespace, and Constant

Source: https://cmajor.dev/docs/LanguageReference

Provides examples of the various types of parameters that can be declared for Cmaj processors, including type parameters using the `using` keyword, processor parameters, namespace parameters, and constant value parameters with their specified types.

```Cmaj
// Examples of all the types of parameter that can be used:
processor Example (using TypeName, processor MyProcessor, namespace MyNamespace, float<2> myConstant)
{
    ...

```

--------------------------------

### Cmajor Vector Declaration and Operations

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to declare and initialize vectors with angle-bracket syntax, access individual elements or ranges, and use built-in functions like `sum()` for vector operations. Highlights that vector indexing starts from 0 and ranges are inclusive of the start and exclusive of the end.

```cmajor
int<4> x = (1, 2, 3, 4);
var x = int64<2> (7L, 8L);
let f = float<8> (2.0f);

let y = x[2];
let g = f[2:4];

int<> h;

let s = sum (x);
```

--------------------------------

### Initial Cmajor Graph Declaration (Sine Wave)

Source: https://cmajor.dev/docs/GettingStarted

An example of a basic Cmajor `graph` declaration. This graph generates a 440 Hz sine wave using the `std::oscillators::Sine` node and connects it to the output stream via a `std::levels::ConstantGain` node.

```Cmajor
graph AnnoyingBeep  [[main]]
{
    output stream float out;

    node sine = std::oscillators::Sine (float, 440);

    connection sine -> std::levels::ConstantGain (float, 0.15f) -> out;
}
```

--------------------------------

### Cmajor Local Variable and Parameter Declaration Syntax

Source: https://cmajor.dev/docs/LanguageReference

Provides examples of declaring local variables and function parameters in Cmajor, showcasing `int64`, `const`, `let`, and `var` keywords for different mutability and type deduction behaviors. Also includes declarations for arrays, complex numbers, and custom structs.

```Cmajor
void myFunction (int param1, const float param2)
{
    int64 a = 1;         // a is a mutable int64
    const int c = 2;     // c is a const int32
    let b = 2;           // b is a const int32
    var d = 2;           // d is a mutable int32
    var e = bool[10]();  // e is a mutable array of 10 bools
    bool[10] f;          // f is a mutable array of 10 bools
    complex64 g;         // g is a complex number, initialised to zero
    MyStruct h;          // h is an object, with all its fields zero-initialised.
}

```

--------------------------------

### Cmajor Struct Object Creation and Member Access

Source: https://cmajor.dev/docs/LanguageReference

Shows how to define a struct, create a zero-initialized object of that struct type, and then access and modify its individual members using dot notation. The example defines a `Position` struct and a function to return a new, moved position.

```cmajor
struct Position { float x, y; }

Position getMovedPosition (Position p)
{
    Position newPos; // creates a zero-initialised object of type Position
    newPos.x = p.x + 10.0f;
    newPos.y = p.y - 5.0f;
    return newPos;
}
```

--------------------------------

### Cmajor Command-Line Tool: Display Help

Source: https://cmajor.dev/docs/GettingStarted

Demonstrates how to use the `cmaj help` command to view available arguments and options for the Cmajor command-line tool.

```bash
$ cmaj help
```

--------------------------------

### Cmaj Unit Test Processor Example (`testProcessor`)

Source: https://cmajor.dev/docs/TestFileFormat

Illustrates how `testProcessor` compiles and instantiates a Cmajor processor from the code block. The processor is expected to emit a stream of `int` values (1 for pass, 0 for fail) and a -1 to signal test completion. Any emitted 0 values will cause the test to fail.

```Cmajor
## testProcessor()

processor P
{
    output stream int out;

    void main()
    {
        out <- 1; advance();  // this is a pass
        out <- 0; advance();  // sending a zero will cause a fail to be logged

        out <- -1; advance(); // always send a -1 at the end to stop the test
    }
}
```

--------------------------------

### Cmajor Processor Parameter Definition Example

Source: https://cmajor.dev/docs/PatchFormat

This Cmajor code snippet illustrates how to define parameters within a processor. It demonstrates using 'input event' and 'input value' types with annotations like 'name', 'min', and 'max' to expose them as host-controllable parameters, contrasting with 'input stream' which is not considered a parameter.

```Cmajor
processor HelloWorld  [[ main ]]
{
    input stream float audioIn;  // Parameters cannot be streams, so this is ignored

    // This parameter is a float called "foo" and has the range 0.5 to 10
    input event float in1   [[ name: "foo", min: 0.5, max: 10.0 ]];

    // This parameter is an int called "foo2" between 1 and 99
    input value int32 in2   [[ name: "foo2", min: 1, max: 99 ]];


```

--------------------------------

### Initial `expectError` Directive for Auto-Update

Source: https://cmajor.dev/docs/TestFileFormat

This example shows the `expectError` directive used without arguments. When the test tool runs, it will automatically populate this directive with the actual error message if a compilation error occurs, and then re-save the test file.

```Cmajor
## expectError

void f (XX& x) {}
```

--------------------------------

### Cmaj 32-bit Integer Literals

Source: https://cmajor.dev/docs/LanguageReference

Examples of 32-bit signed integer literals in Cmaj, demonstrating decimal, hexadecimal (prefixed with `0x`), and binary (prefixed with `0b`) representations. These integers are written without a suffix.

```Cmaj
-12345      // 32-bit signed decimal
0x12345     // 32-bit hex
0b101101    // 32-bit binary
```

--------------------------------

### Rename Hoisted and Wildcarded Endpoints in Cmajor Graph

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to rename individual hoisted endpoints and how to apply a renaming pattern to wildcarded hoisted endpoints. The example includes a `Child` graph definition to illustrate the source of the outputs.

```Cmajor
graph Parent
{
    output child1.outL child1outL;      // Rename outL as child1outL
    output child1.outR child1outR;      // Rename outR as child1outR;

    output child2.* child2*;            // Hoist child2 outL and outR renamed as child2outL and child2outR

    node child1 = Child;
    node child2 = Child;
}

graph Child
{
    output stream float outL, outR;
}
```

--------------------------------

### Cmaj Test File Format Block Delimiter Example

Source: https://cmajor.dev/docs/TestFileFormat

Illustrates the basic structure of a Cmajor test file, showing how test blocks are separated by `##` followed by a JavaScript function call. Content before the first delimiter is parsed as global JavaScript, available to all tests.

```Cmajor/Javascript
// All the text before the first delimiter line is parsed as javascript, and is available globally to all the tests. This is where you'd put any shared helper functions that your tests need to use.

## testFunction()

...The chunk of text in each section is provided to the test function that is called above...

## expectError ("...")

...Likewise, this chunk of text is passed to the "expectError" function...
```

--------------------------------

### Cmajor Type Alias Declaration with `using`

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the use of the `using` keyword to create type aliases for existing types. Examples include aliasing primitive types, vector types, and array types, improving code readability and maintainability.

```cmajor
using MyInt = int64;
using VectorOfInts = int<4>;
using MyThingArray = some_namespace::Thing[10];
```

--------------------------------

### Clone and Initialize GuitarLSTM Repository

Source: https://cmajor.dev/docs/Examples/GuitarLSTM

Instructions to clone the GuitarLSTM repository from GitHub and initialize its Git submodules. This step is essential for setting up the project environment locally before training the model.

```Shell
git clone git@github.com:cmajor-lang/GuitarLSTM.git
cd GuitarLSTM
git submodule init
git submodule update
```

--------------------------------

### Cmajor Struct: NoteOn Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a 'NoteOn' event in Cmajor, used to signal the start of a musical note. It includes a unique channel ID for voice association, the pitch in semitones (0-127), and velocity (0-1).

```APIDOC
struct NoteOn
  channel: int32 (This channel ID is used to associate events which act on a particular voice. When a NoteOn object is sent, the sender will create a unique ID, and use the same ID for any subsequent pitch and control events, and for the final matching NoteOff event.)
  pitch: float32 (The pitch uses the same semitone scale as MIDI note numbers, between 0 and 127, where middle C = 60.)
  velocity: float32 (Velocity is between 0 and 1)
```

--------------------------------

### Play a Cmajor Patch with Console App

Source: https://cmajor.dev/docs/GettingStarted

Demonstrates how to run a Cmajor patch using the `cmaj play` command-line tool. This command opens a window for controls, plays audio, and can handle MIDI input if the patch requires it.

```Shell
$ cmaj play /path-to-your-repo/examples/patches/HelloWorld/HelloWorld.cmajorpatch
```

--------------------------------

### Cmajor VSCode Extension: Run Patch Command

Source: https://cmajor.dev/docs/GettingStarted

Details the 'Cmajor: Run patch' command within the VSCode extension, explaining how it builds and executes .cmajorpatch files, handles compilation errors, displays GUI, and supports live reloading.

```APIDOC
Cmajor: Run patch
If you open a .cmajorpatch file in the editor, then invoking this command will build and run it.
Any compile errors will be reported in the problems panel, making it easy to fix mistakes. When your patch compiles successfully, it’ll open a separate pop-up window showing its GUI, and any output while running will appear in the embedded terminal inside VScode. To stop the patch running, you can either close its popup window, or kill the process in the terminal.
While a patch is running, re-saving any of the patch source files should automatically trigger a rebuild and reload, so you can immediately see the effect of your changes.
```

--------------------------------

### Cmajor Enum Declaration and Usage

Source: https://cmajor.dev/docs/LanguageReference

Shows how to declare an enum with named members and how to access these members using the scope resolution operator (`::`). The example also demonstrates using enum values in a comparison within a function, highlighting their strong typing.

```cmajor
enum Animal
{
    cat, dog
}

let c = Animal::cat;
let d = Animal::dog;

void isThisACat (Animal a)    { return a == Animal::cat; }
```

--------------------------------

### Create New Cmajor Patch

Source: https://cmajor.dev/docs/GettingStarted

Command-line instruction to create a new, empty Cmajor patch using the `cmaj` utility. This command initializes a project folder with a basic Cmajor graph file.

```Shell
$ cmaj create AnnoyingBeep
```

--------------------------------

### Cmajor Reference Type Declaration and Usage

Source: https://cmajor.dev/docs/LanguageReference

Explains how to declare reference types by adding the `&` suffix to a type. The example demonstrates passing both an integer and a struct by reference to a function, showing how modifications within the function affect the original variables outside its scope.

```cmajor
struct MyObject
{
    float y;
}

void mangle (int& x, const MyObject& o)
{
    x = 2;
    o.y = 3.0;
}

int x = 1;
MyObject o;
mangle (x, o);
console <- x <- o.y;
```

--------------------------------

### Cmajor VSCode Extension: Export Patch as JUCE Plugin

Source: https://cmajor.dev/docs/GettingStarted

Explains the 'Cmajor: Export patch as JUCE plugin' command, enabling the creation of a JUCE C++ project from a Cmajor patch for native VST/AU/AAX plugin development. Mentions the equivalent command-line tool operation.

```APIDOC
Cmajor: Export patch as JUCE plugin
This will prompt you for a folder in which to create a new JUCE project containing a complete C++ version of the patch that has focus. This allows you to build a native VST/AU/AAX plugin of your patch.
The command-line tool equivalent of this operation is `cmaj generate --target=juce`
```

--------------------------------

### Creating Feedback Loops in Cmajor Graphs

Source: https://cmajor.dev/docs/LanguageReference

This example illustrates how to legally create a feedback loop within a Cmajor graph. A compile error occurs if a loop is declared without a delay; inserting at least a 1-sample delay somewhere in the loop makes it valid.

```Cmajor
graph G
{
    // declare 3 nodes
    node p1 = MyProcessor,
         p2 = MyProcessor,
         p3 = MyProcessor;

    // Declaring a loop like this would cause a compile error:
    connection p1 -> p2 -> p3 -> p1;

    // ...but if you insert a delay somewhere, it becomes legal:
    connection p1 -> p2 -> [1] -> p3 -> p1;
}
```

--------------------------------

### Create a New Empty Cmajor Patch

Source: https://cmajor.dev/docs/GettingStarted

Illustrates how to generate boilerplate files for a new Cmajor patch using the `cmaj create` command. This command creates a new folder containing a basic patch structure, ready for development.

```Shell
$ cmaj create --name="Hello" MyNewPatchFolderName
```

--------------------------------

### Setting Resampling Policies for Cmajor Graph Connections

Source: https://cmajor.dev/docs/LanguageReference

When connecting to a resampled node, this example demonstrates how to explicitly set the interpolation policy for stream connections. Options include `latch` (low overhead), `linear` (quick, low quality), and `sinc` (highest quality, slowest). Default policies are applied if none are specified.

```Cmajor
connection [latch]  node2 -> out;       // chooses latched interpolation (repeats the last value, very low overhead)
connection [linear] node1.out -> out;   // chooses linear interpolation (low quality but quick)
connection [sinc]   node3.out2 -> out;  // chooses sinc interpolation (highest quality but slowest)
```

--------------------------------

### Cmajor Standard Library Modules and Components

Source: https://cmajor.dev/docs/GettingStarted

A comprehensive listing of modules and their contained classes, processors, and functions within the Cmajor Standard Library, organized hierarchically. This includes components for audio processing (filters, envelopes, mixers), signal generation (oscillators, noise), MIDI handling, and general utilities.

```APIDOC
      * [Convolve](https://cmajor.dev/docs/StandardLibrary#Convolve)
  + [std.envelopes](https://cmajor.dev/docs/StandardLibrary#std_envelopes)
    - [envelopes](https://cmajor.dev/docs/StandardLibrary#envelopes)
      * [FixedASR](https://cmajor.dev/docs/StandardLibrary#FixedASR)
  + [std.filters](https://cmajor.dev/docs/StandardLibrary#std_filters)
    - [filters](https://cmajor.dev/docs/StandardLibrary#filters)
      * [tpt](https://cmajor.dev/docs/StandardLibrary#tpt)
        + [onepole](https://cmajor.dev/docs/StandardLibrary#onepole)
          - [Processor](https://cmajor.dev/docs/StandardLibrary#Processor)
          - [Mode](https://cmajor.dev/docs/StandardLibrary#Mode)
        + [svf](https://cmajor.dev/docs/StandardLibrary#svf)
          - [Processor](https://cmajor.dev/docs/StandardLibrary#Processor2)
          - [MultimodeProcessor](https://cmajor.dev/docs/StandardLibrary#MultimodeProcessor)
          - [Mode](https://cmajor.dev/docs/StandardLibrary#Mode2)
      * [dcblocker](https://cmajor.dev/docs/StandardLibrary#dcblocker)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor3)
      * [butterworth](https://cmajor.dev/docs/StandardLibrary#butterworth)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor4)
        + [Mode](https://cmajor.dev/docs/StandardLibrary#Mode3)
      * [crossover](https://cmajor.dev/docs/StandardLibrary#crossover)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor5)
      * [simper](https://cmajor.dev/docs/StandardLibrary#simper)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor6)
        + [Mode](https://cmajor.dev/docs/StandardLibrary#Mode4)
  + [std.frequency](https://cmajor.dev/docs/StandardLibrary#std_frequency)
    - [frequency](https://cmajor.dev/docs/StandardLibrary#frequency7)
  + [std.intrinsics](https://cmajor.dev/docs/StandardLibrary#std_intrinsics)
    - [intrinsics](https://cmajor.dev/docs/StandardLibrary#intrinsics)
  + [std.levels](https://cmajor.dev/docs/StandardLibrary#std_levels)
    - [smoothing](https://cmajor.dev/docs/StandardLibrary#smoothing)
      * [SmoothedValueStream](https://cmajor.dev/docs/StandardLibrary#SmoothedValueStream)
    - [levels](https://cmajor.dev/docs/StandardLibrary#levels)
      * [ConstantGain](https://cmajor.dev/docs/StandardLibrary#ConstantGain)
      * [DynamicGain](https://cmajor.dev/docs/StandardLibrary#DynamicGain)
      * [SmoothedGain](https://cmajor.dev/docs/StandardLibrary#SmoothedGain)
      * [SmoothedGainParameter](https://cmajor.dev/docs/StandardLibrary#SmoothedGainParameter)
    - [pan_law](https://cmajor.dev/docs/StandardLibrary#pan_law)
  + [std.matrix](https://cmajor.dev/docs/StandardLibrary#std_matrix)
    - [matrix](https://cmajor.dev/docs/StandardLibrary#matrix)
  + [std.midi](https://cmajor.dev/docs/StandardLibrary#std_midi)
    - [midi](https://cmajor.dev/docs/StandardLibrary#midi)
      * [MPEConverter](https://cmajor.dev/docs/StandardLibrary#MPEConverter)
      * [NoteToMIDI](https://cmajor.dev/docs/StandardLibrary#NoteToMIDI)
  + [std.mixers](https://cmajor.dev/docs/StandardLibrary#std_mixers)
    - [mixers](https://cmajor.dev/docs/StandardLibrary#mixers)
      * [StereoToMono](https://cmajor.dev/docs/StandardLibrary#StereoToMono)
      * [MonoToStereo](https://cmajor.dev/docs/StandardLibrary#MonoToStereo)
      * [DynamicSum](https://cmajor.dev/docs/StandardLibrary#DynamicSum)
      * [ConstantSum](https://cmajor.dev/docs/StandardLibrary#ConstantSum)
      * [Interpolator](https://cmajor.dev/docs/StandardLibrary#Interpolator)
  + [std.noise](https://cmajor.dev/docs/StandardLibrary#std_noise)
    - [noise](https://cmajor.dev/docs/StandardLibrary#noise)
      * [White](https://cmajor.dev/docs/StandardLibrary#White)
      * [Brown](https://cmajor.dev/docs/StandardLibrary#Brown)
      * [Pink](https://cmajor.dev/docs/StandardLibrary#Pink)
  + [std.notes](https://cmajor.dev/docs/StandardLibrary#std_notes)
    - [notes](https://cmajor.dev/docs/StandardLibrary#notes)
  + [std.oscillators](https://cmajor.dev/docs/StandardLibrary#std_oscillators)
    - [oscillators](https://cmajor.dev/docs/StandardLibrary#oscillators)
      * [Phasor](https://cmajor.dev/docs/StandardLibrary#Phasor)
      * [Sine](https://cmajor.dev/docs/StandardLibrary#Sine)
      * [PolyblepOscillator](https://cmajor.dev/docs/StandardLibrary#PolyblepOscillator)
      * [LFO](https://cmajor.dev/docs/StandardLibrary#LFO)
      * [waveshape](https://cmajor.dev/docs/StandardLibrary#waveshape)
  + [std.random](https://cmajor.dev/docs/StandardLibrary#std_random)
    - [random](https://cmajor.dev/docs/StandardLibrary#random)
  + [std.timeline](https://cmajor.dev/docs/StandardLibrary#std_timeline)
    - [timeline](https://cmajor.dev/docs/StandardLibrary#timeline)
  + [std.voices](https://cmajor.dev/docs/StandardLibrary#std_voices)
    - [voices](https://cmajor.dev/docs/StandardLibrary#voices)
```

--------------------------------

### Cmajor Processor Composition with Internal DSP Nodes

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how Cmajor processors can compose other DSP processors using the `node` concept. This example shows a `FilterComposition` processor that instantiates a `onepole` filter node and manages its input, advancement, and output within its `main` loop, enabling complex DSP chains within a single processor.

```Cmajor
processor FilterComposition
{
    input stream float in;
    output stream float out;

    node lowPass = std::filters::tpt::onepole::Processor (0, 1000);

    void main()
    {
        loop
        {
            lowPass.in <- in;
            lowPass.advance();
            out <- lowPass.out;

            advance();
        }
    }
}
```

--------------------------------

### Cmajor Array Node Connection Rules and Type Handling

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the rules for connecting to and from array nodes in Cmajor graphs. It highlights valid and invalid connection patterns when dealing with array types, emphasizing that the language does not support arrays of arrays. Examples show how to correctly access elements of array nodes or entire array outputs.

```Cmajor
graph ReturnsArray
{
    output stream float32 out1[3];
    output stream float32 out2;
}
```

```Cmajor
graph Test
{
    output stream float32 out;
    output stream float32 instanceOut[3];
    output stream float32 arrayElement[10];

    node n = ReturnsArray[10];

    connection
    {
        n.out1       -> arrayElement;    // invalid - the node is an array, and the endpoint is also an array type
        n.out1[1]    -> arrayElement;    // invalid - as above, n.out1 is an invalid type, so you can't take an index
        n[2].out1    -> instanceOut;     // valid - n[2] selects a node, so the type is float32[3]
        n[2].out1[2] -> out;             // valid - n[2] selects a node, out1[2] selects an array member, so type is float

        n.out2        -> arrayElement;   // valid - type is float[10]
        n[1].out2     -> out;            // valid - type is float
    }
}
```

--------------------------------

### Cmajor Graph with Volume Parameter

Source: https://cmajor.dev/docs/GettingStarted

Demonstrates how to add a controllable volume parameter to a Cmajor graph. By declaring `input gain.volume;`, a GUI control for the gain level is automatically exposed, allowing real-time adjustment.

```Cmajor
graph AnnoyingBeep  [[main]]
{
    output stream float out;
    input gain.volume;

    node sine = std::oscillators::Sine (float, 440);
    node gain = std::levels::SmoothedGain (float);

    connection sine -> gain.in;
    connection gain.out -> out;
}
```

--------------------------------

### Cmajor VSCode Extension: Export Patch as HTML/JS/WebAssembly

Source: https://cmajor.dev/docs/GettingStarted

Details the 'Cmajor: Export patch as HTML/Javascript/WebAssembly' command, which exports the current patch as a web-ready bundle. Includes the equivalent command-line tool operation.

```APIDOC
Cmajor: Export patch as HTML/Javascript/WebAssembly
This will prompt you for a folder, into which it will export a bundle of HTML and Javascript that will run the currently focused patch.
The command-line tool equivalent of this operation is `cmaj generate --target=webaudio-html`
```

--------------------------------

### Cmaj 64-bit Integer Literals

Source: https://cmajor.dev/docs/LanguageReference

Examples of 64-bit integer literals in Cmaj, which require a suffix like `L`, `_L`, `i64`, or `_i64`. This snippet shows decimal, hexadecimal, and binary forms, noting that lowercase 'l' is disallowed due to its visual similarity to '1'.

```Cmaj
12345L      // 64-bit decimal    (NB: lower-case 'l' is not allowed, since it looks too much like '1')
12345_i64   // 64-bit decimal
0x12345_L   // 64-bit hex
0b101101L   // 64-bit binary
```

--------------------------------

### Cmajor Generic Function with Compile-Time Type Validation using `static_assert`

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to apply metafunctions like `Type.isArray` and `Type.elementType` with `static_assert` within generic functions to enforce type constraints at compile time. Shows examples of successful execution and a compile-time error due to assertion failure.

```Cmajor
Type.elementType getFirstElement<Type> (Type array)
{
    static_assert (Type.isArray, "The argument supplied to this function must be an array!");
    return array[0];
}

console <- getFirstElement (int[] (2, 3, 4));  // prints "2"
console <- getFirstElement (123.0f);  // An error is thrown by the static_assert failing

```

--------------------------------

### Cmajor Standard Library Modules and Components Reference

Source: https://cmajor.dev/docs/Examples/CompuFart

This section provides a structured reference to the Cmajor Standard Library, outlining its organization into modules and sub-modules, and listing the key classes and processors available within each. It serves as an API documentation for navigating the library's functionalities.

```APIDOC
std.audio:
  Convolve
std.envelopes:
  envelopes:
    FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
std.frequency:
  frequency
std.intrinsics:
  intrinsics
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix:
  matrix
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise:
  noise:
    White
    Brown
    Pink
std.notes:
  notes
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random:
  random
std.timeline:
  timeline
std.voices:
  voices
```

--------------------------------

### Cmajor Slice Range Assignment

Source: https://cmajor.dev/docs/LanguageReference

This example demonstrates how to assign values to a range within an array using slice syntax. It shows that a slice can be used to reference a target array, and then a range from a source array can be assigned to it. The snippet also illustrates the wrapping behavior when the source range provides fewer elements than the target range requires.

```Cmajor
int[4] sourceArray = (1, 2, 3, 4);
int[4] targetArray = (0, 0, 0, 0);

int[] slice = targetArray;                  // slice references all of targetArray
slice[:] = sourceArray[0:2];                // targetArray now contains (1, 2, 1, 2) - first two elements of sourceArray written to all elements of the slice
```

--------------------------------

### Run Cmajor Unit Tests via Command Line

Source: https://cmajor.dev/docs/TestFileFormat

Demonstrates how to execute Cmajor unit test files or directories using the `cmaj test` command-line tool. This command scans for and runs all tests within the specified path, providing a summary of results.

```Bash
$ cmaj test my_tests/TestFile1.cmajtest
```

--------------------------------

### Declare Cmajor Processor Endpoints

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates various ways to declare input and output endpoints within a Cmajor processor. Examples include simple streams of floats, vector streams, multiple value inputs, single and complex object event outputs, multi-type event outputs, arrays of streams, and void input events. It also shows how to group endpoint declarations using braces for better organization.

```Cmajor
processor P
{
    input stream float  input1;      // a simple stream of floats
    input stream float<4> input2;    // a stream where each element is a float<4> vector
    input value int64 in3, in4;      // two input value streams that hold int64s
    output event int out1;           // an output which sends simple integers as events
    output event MyStruct out2;      // an output of more complex object events
    output event (string, int) out3; // an output event stream which can accept either strings or ints
    output stream float<2> out4[4];  // an array of 4 output streams which each hold float<2> vectors
    input event void in;             // An input event with no value

    // If you have a lot of endpoints, you can also use braces to group together definitions:
    output
    {
        stream int x;
        stream float y;
    }

    // ..or..
    input event
    {
        int<2> x;
        float64 y;
    }
}
```

--------------------------------

### Cmajor Array Copy vs. Slice Reference Behavior

Source: https://cmajor.dev/docs/LanguageReference

This example demonstrates the core difference between copying an array by value and referencing it with a slice. It shows that modifying the original array affects slices but not copies. The snippet also illustrates how slices can be emptied and reassigned to point to different sections of an array.

```Cmajor
int[4] originalArray = (1, 2, 3, 4);

int[4] arrayCopy  = originalArray; // creates a copy of the original
int[]  arraySlice = originalArray; // creates a slice of the original

console <- arrayCopy[1]  <- " "    // prints 2
        <- arraySlice[1] <- " ";   // prints 2

originalArray[1] = 456; // modifying the original array

console <- arrayCopy[1]  <- " "    // prings 2
        <- arraySlice[1] <- " ";   // prints 456

arraySlice = (); // sets the slice to be empty

console <- arraySlice.size <- " "   // prints 0
        <- arraySlice[1]   <- " ";  // prints 0

arraySlice = originalArray[2:4]; // now make our slice point at the last two elements

console <- arraySlice.size <- " " // prints 2
        <- arraySlice[1];         // prints 4
```

--------------------------------

### cmaj::Engine Class API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

The `Engine` class acts as a compiler, taking a Cmajor program and compiling it into a `Performer` object for execution. This snippet outlines the general 8-step sequence for using the `Engine` to load, link, and create performer instances.

```APIDOC
cmaj::Engine:
  Purpose: Acts like a compiler; compiles a Cmajor program into a Performer object.
  Usage Sequence:
    1. Create an Engine: `cmaj::Engine::create()`
    2. Apply build settings (optional): `cmaj::Engine::setBuildSettings()`
    3. Create a `cmaj::Program` object with your code.
    4. Load the program: `Engine::load(program, ExternalVariableProviderFn)`
    5. Get program endpoints: `Engine::getInputEndpoints()`
    6. Get endpoint handles: `Engine::getEndpointHandle(endpointID)`
    7. Link the program: `Engine::link()`
    8. Create performer instances: `Engine::createPerformer()`
```

--------------------------------

### Example Cmajor Patch Worker JavaScript Function

Source: https://cmajor.dev/docs/PatchFormat

A JavaScript module exporting a default function that serves as a Cmajor patch worker. It demonstrates using the `PatchConnection` object to listen for status updates, request status, and send events/values, along with `setTimeout` for timed actions. Workers have access to basic JavaScript features and timers.

```JavaScript
export default function myWorker (patchConnection)
{
    patchConnection.addStatusListener ((status) => console.log (status));
    patchConnection.requestStatusUpdate();

    setTimeout (() => { patchConnection.sendEventOrValue ("myevent", 1234); }, 1000);
}
```

--------------------------------

### JUCE Plugin Integration: cmaj::JUCEPluginBase & cmaj::JUCEPluginFormat

Source: https://cmajor.dev/docs/Tools/C++API

Helper classes for creating `juce::AudioPluginInstance` objects from Cmajor patches, enabling VST/AU/AAX plugin development. `cmaj::JITLoaderPlugin` allows dynamic loading via drag-and-drop, while `cmaj::SinglePatchJITPlugin` is for fixed patches with better host compatibility. `cmaj::JUCEPluginFormat` scans and loads Cmajor patches as JUCE plugins.

```APIDOC
JUCE Plugin Integration:
  cmaj::JUCEPluginBase:
    Description: Base class for creating juce::AudioPluginInstance objects for Cmajor patches.
    Purpose: Enables building (or hosting) Cmajor patches as VST/AU/AAX plugins.
    Derived Classes:
      - cmaj::JITLoaderPlugin:
          Description: Provides a plugin that can dynamically load different Cmajor patches.
          Features: Allows drag-and-drop of patches onto its GUI for dynamic loading and re-JIT.
          Limitations: Involves compromises due to host limitations with dynamic parameter/I/O changes.
      - cmaj::SinglePatchJITPlugin:
          Description: For building plugins that load a particular, unchanging patch.
          Features: Uses JIT engine, supports live-reload of patch changes, takes patch on construction, pre-loads it, ensures correct host I/O and parameter list from start.
          Limitations: Does not allow drag-and-drop to load different patches.
  cmaj::JUCEPluginFormat:
    Description: A juce::AudioPluginFormat class.
    Purpose: Scans for and loads Cmajor patches as JUCE plugins.
    Usage: Uses the cmaj::SinglePatchJITPlugin wrapper. Recommended for JUCE-based hosts to load Cmajor patches (give to juce::AudioPluginFormatManager).
```

--------------------------------

### Cmaj Processor State Variables Declaration and Usage

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to declare variables within a Cmaj processor definition. These variables persist for the instance's lifetime and can be modified by any processor function. Examples include float, int, and constant 'let' variables, showing initial value assignment and modification within `main` and other functions.

```Cmaj
processor NumberGenerator
{
    output stream float out;

    // These are all processor state variables.
    float value;
    int counter = 10;
    let increment = 2.5f; // this one is a constant

    void main()
    {
        value = 100.0f;

        while (--counter > 0)
        {
            emitNextNumber();
            advance();
        }
    }

    void emitNextNumber()
    {
        // Any function in a processor can read and modify its state variables
        out <- value;
        value += increment;
    }
}
```

--------------------------------

### ONNX to Cmajor Python Script Command-Line Options

Source: https://cmajor.dev/docs/Tools/MachineLearning

This snippet outlines the command-line arguments available for the `onnxToCmajor.py` script. It specifies how to provide the ONNX model file and an optional directory for the generated Cmajor patch files. If no patch directory is supplied, a single Cmajor file is outputted.

```Python
    --model <file>       Specifies the ONNX model file to convert
    --patchDir <folder>  Specifies a folder into which the generated patch will be written

  If no patchDir argument is supplied, the output will be a single Cmajor file.
```

--------------------------------

### Cmajor MIDI Message Accessor Functions

Source: https://cmajor.dev/docs/StandardLibrary

Provides a comprehensive set of functions for extracting various data points from a Cmajor `Message` object, including individual bytes, message types, channel information, note data (on/off, number, pitch, velocity), program change, pitch wheel, aftertouch, and controller values. Also includes functions to check for specific MIDI message types like clock, start, stop, etc.

```APIDOC
int32 getByte1 (const Message& this)
int32 getByte2 (const Message& this)
int32 getByte3 (const Message& this)
int32 getMessageType (const Message& this)
int32 getChannel0to15 (const Message& this)
int32 getChannel1to16 (const Message& this)
int32 get14BitValue (const Message& this)
bool isNoteOn (const Message& this)
bool isNoteOff (const Message& this)
int32 getNoteNumber (const Message& this)
float32 getPitch (const Message& this)
int32 getVelocity (const Message& this)
float32 getFloatVelocity (const Message& this)
bool isProgramChange (const Message& this)
int32 getProgramChangeNumber (const Message& this)
bool isPitchWheel (const Message& this)
int32 getPitchWheelValue (const Message& this)
bool isAftertouch (const Message& this)
int32 getAfterTouchValue (const Message& this)
bool isChannelPressure (const Message& this)
int32 getChannelPressureValue (const Message& this)
float32 getFloatChannelPressureValue (const Message& this)
bool isController (const Message& this)
bool isControllerNumber (const Message& this, int32 number)
int32 getControllerNumber (const Message& this)
int32 getControllerValue (const Message& this)
float32 getFloatControllerValue (const Message& this)
bool isAllNotesOff (const Message& this)
bool isAllSoundOff (const Message& this)
bool isQuarterFrame (const Message& this)
bool isClock (const Message& this)
bool isStart (const Message& this)
bool isContinue (const Message& this)
bool isStop (const Message& this)
bool isActiveSense (const Message& this)
bool isMetaEvent (const Message& this)
bool isSongPositionPointer (const Message& this)
int32 getSongPositionPointerValue (const Message& this)
```

--------------------------------

### Cmajor Standard Library: Level and Gain Control Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.levels` module, offering components for managing audio levels, gain, smoothing, and pan law calculations.

```APIDOC
std.levels:
  smoothing:
    - SmoothedValueStream
  levels:
    - ConstantGain
    - DynamicGain
    - SmoothedGain
    - SmoothedGainParameter
  - pan_law
```

--------------------------------

### Cmajor VSCode Extension: Export Patch as CLAP Plugin

Source: https://cmajor.dev/docs/GettingStarted

Describes the 'Cmajor: Export patch as a CLAP plugin' command, which exports a self-contained C++ version of a Cmajor patch as a CLAP plugin project. Includes the equivalent command-line tool operation.

```APIDOC
Cmajor: Export patch as a CLAP plugin
This will prompt you for a folder in which to create a new CLAP plugin project. It will export a self-contained C++ version of the focused patch.
The command-line tool equivalent of this operation is `cmaj generate --target=clap`
```

--------------------------------

### Cmajor Standard Library: std.midi Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.midi' module, providing components for MIDI processing, including MPE conversion and note-to-MIDI conversion.

```APIDOC
std.midi:
  midi:
    - MPEConverter
    - NoteToMIDI
```

--------------------------------

### Cmajor Standard Library - Mixers Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.mixers` module, offering components for audio mixing, such as stereo/mono conversion, dynamic summing, and interpolation.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor Standard Library: std.timeline Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.timeline' module, likely containing components for timeline or sequencing operations.

```APIDOC
std.timeline:
  - timeline
```

--------------------------------

### Cmajor Standard Library: std.mixers Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.mixers' module, including components for audio mixing, such as stereo/mono conversion, dynamic summing, and interpolation.

```APIDOC
std.mixers:
  mixers:
    - StereoToMono
    - MonoToStereo
    - DynamicSum
    - ConstantSum
    - Interpolator
```

--------------------------------

### Cmajor: std::levels::SmoothedGainParameter Processor

Source: https://cmajor.dev/docs/StandardLibrary

Demonstrates the instantiation and connection of the `SmoothedGainParameter` processor, and provides its detailed API definition including constructor, endpoints, internal variables, and associated functions. This processor takes input events to change the level in decibels and produces a smoothed gain factor output.

```Cmajor
gainParameter = std::levels::SmoothedGainParameter(smoothingTimeSeconds)

connection in * gainParameter.gain -> out
```

```APIDOC
processor std::levels::SmoothedGainParameter (float32 smoothingTimeSeconds = 0.2f)

Endpoints:
* output  stream gain (float32)
* input  event volume (float32)

Variables:
std::smoothing::SmoothedValue  smoothedGain

Functions:
volume
event volume (float32 newVolumeDecibels)

main
void main()

init
void init()
```

--------------------------------

### cmaj::BuildSettings Class API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

The `BuildSettings` class encapsulates various compile options that can be applied to an `Engine` before it builds a Cmajor program. These settings influence aspects like audio parameters and optimization levels.

```APIDOC
cmaj::BuildSettings:
  Purpose: Holds compile options for the Engine.
  Contents: Includes sample-rate, block size, optimisation level, buffer sizes, etc.
  Usage: Given to an Engine before building a program.
```

--------------------------------

### Cmajor `std::filters::simper` Module API

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::filters::simper` module in Cmajor, covering filter creation, mode setting, processing, and various filter parameters and modes. It includes function signatures, processor constructor details, input/output endpoints, internal variables, and predefined filter mode constants.

```APIDOC
Functions:
  create(mode: int32, processorFrequency: float64, filterFrequency: float64, Q: float64, gain: float64) -> Implementation
  setMode(this: Implementation&, m: int32) -> void
  reset(this: Implementation&) -> void
  setFrequency(this: Implementation&, processorFrequency: float64, filterFrequency: float64, Q: float64, gain: float64) -> void
  process(this: Implementation&, v0: FrameType) -> FrameType

Processor:
  std::filters::simper::Processor(initialMode: int32 = Mode::lowPass, initialFrequency: float32 = defaultFrequency, initialQ: float32 = defaultQ, initialGain: float32 = defaultGain)

Endpoints:
  output stream out (FrameType)
  input stream in (FrameType)
  input event mode (int32)
  input event frequency (float32)
  input event q (float32)
  input event gain (float32)

Variables:
  filter
  updateFilter: bool = false
  filterFrequency: float32
  filterMode: int32
  filterQ: float32
  filterGain: float32

Event Functions:
  mode(m: int32) -> event
  frequency(f: float32) -> event
  q(q: float32) -> event
  gain(f: float32) -> event
  main() -> void
  reset() -> void

Constants (std::filters::simper::Mode):
  lowPass: int32 = 0
  highPass: int32 = 1
  bandPass: int32 = 2
  notchPass: int32 = 3
  peakPass: int32 = 4
  allPass: int32 = 5
  lowShelf: int32 = 6
  highShelf: int32 = 7
  bell: int32 = 8
```

--------------------------------

### Cmajor Standard Library: std.matrix Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.matrix' module, likely containing components for matrix operations.

```APIDOC
std.matrix:
  - matrix
```

--------------------------------

### Cmajor Standard Library Modules and Components Overview

Source: https://cmajor.dev/docs/ScriptFileFormat

A structured listing of all top-level modules and their nested components (classes, processors, modes) within the Cmajor Standard Library, categorized by functionality such as audio, envelopes, filters, MIDI, and oscillators. This provides a quick reference to available library elements.

```APIDOC
std.audio:
  Convolve
std.envelopes:
  envelopes:
    FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
std.frequency:
  frequency
std.intrinsics:
  intrinsics
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix:
  matrix
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise:
  noise:
    White
    Brown
    Pink
std.notes:
  notes
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random:
  random
std.timeline:
  timeline
std.voices:
  voices
```

--------------------------------

### Export Cmajor Patch to Web Audio HTML

Source: https://cmajor.dev/docs/Examples

This command generates a folder containing HTML, Javascript, and WebAssembly files from a Cmajor patch. It utilizes Web Audio and Web MIDI to run the exported patches in a web browser, leveraging LLVM WebAssembly optimiser for efficient DSP.

```Shell
cmaj generate --target=webaudio-html <patch file> --output=<target folder>
```

--------------------------------

### Cmajor Standard Library: std.mixers Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.mixers` module, which includes various components for audio mixing and signal summation.

```APIDOC
mixers:
  - StereoToMono
  - MonoToStereo
  - DynamicSum
  - ConstantSum
  - Interpolator
```

--------------------------------

### Cmajor Standard Library API Reference

Source: https://cmajor.dev/docs/Examples/HelloWorld

This section provides a structured reference to the modules, sub-modules, classes, and functions available in the Cmajor Standard Library. It details the hierarchical organization of the library's components, including audio processing elements, signal generators, utility functions, and MIDI handling.

```APIDOC
std.audio:
  Convolve

std.envelopes:
  envelopes:
    FixedASR

std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode

std.frequency:
  frequency

std.intrinsics:
  intrinsics

std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law

std.matrix:
  matrix

std.midi:
  midi:
    MPEConverter
    NoteToMIDI

std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator

std.noise:
  noise:
    White
    Brown
    Pink

std.notes:
  notes

std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape

std.random:
  random

std.timeline:
  timeline

std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library: Matrix Operations Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.matrix` module, which provides functionalities for matrix-based operations, potentially for audio routing or transformations.

```APIDOC
std.matrix:
  - matrix
```

--------------------------------

### Cmajor Standard Library: std.audio Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.audio' module, including components for audio processing like convolution.

```APIDOC
std.audio:
  - Convolve
```

--------------------------------

### Cmajor Standard Library: std.levels Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.levels' module, including components for level control, smoothing, and pan law.

```APIDOC
std.levels:
  smoothing:
    - SmoothedValueStream
  levels:
    - ConstantGain
    - DynamicGain
    - SmoothedGain
    - SmoothedGainParameter
  - pan_law
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.intrinsics' module, providing access to fundamental intrinsic operations.

```APIDOC
std.intrinsics:
  - intrinsics
```

--------------------------------

### Cmajor Processor Main Attribute Declaration

Source: https://cmajor.dev/docs/PatchFormat

This Cmajor code snippet demonstrates how to declare a top-level processor using the `[[ main ]]` attribute. This attribute signals to the host which processor within the Cmajor source files should be used as the primary entry point for the patch, enabling the host to correctly instantiate and run the audio processing logic.

```Cmajor
processor HelloWorld  [[ main ]]
{
    ...
}
```

--------------------------------

### Cmajor Basic Connection Expressions and Graph Definitions

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates fundamental connection syntax in Cmajor, including constant assignments, arithmetic operations, and function calls within connections. It also illustrates how to define custom graphs with input/output streams and internal connection logic, such as converting mid-side to stereo or merging stereo channels.

```Cmajor
0.5f -> node1.in;
```

```Cmajor
in1 * in2 -> node2.in;
```

```Cmajor
std::min (in1, in2) -> node2.in;
```

```Cmajor
graph ConvertMidSide
{
    input stream float32<2> midSideInput;
    output stream float32<2> stereoOut;

    float32<2> convert (float32<2> v)
    {
        return float32<2> (v[0] - v[1], v[0] + v[1]);
    }

    connection
        convert (midSideIn) -> stereoOut;
}
```

```Cmajor
graph MergeStereo
{
    input stream float leftIn, rightIn;
    output stream float<2> stereoOut;

    connection
        float<2> (leftIn, rightIn) -> stereoOut;
}
```

--------------------------------

### Cmajor Standard Library: Voice Management Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.voices` module, which likely provides utilities for managing multiple voices in a polyphonic context.

```APIDOC
std.voices:
  - voices
```

--------------------------------

### Cmajor Standard Library: std.matrix Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.matrix` module, likely containing utilities for matrix operations.

```APIDOC
matrix:
```

--------------------------------

### Cmajor Standard Library: std.notes Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.notes' module, likely containing components related to musical note processing.

```APIDOC
std.notes:
  - notes
```

--------------------------------

### Cmajor Standard Library - MIDI Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.midi` module, providing components for MIDI message processing, including MPE conversion and note-to-MIDI mapping.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.envelopes' module, providing components for envelope generation, such as FixedASR.

```APIDOC
std.envelopes:
  envelopes:
    - FixedASR
```

--------------------------------

### Cmajor Standard Library: std.voices Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.voices' module, likely containing components for voice management in synthesizers.

```APIDOC
std.voices:
  - voices
```

--------------------------------

### Cmajor std.audio_data Namespace API

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std.audio_data` namespace in Cmajor, defining structures for mono and stereo floating-point audio data, and a `SamplePlayer` processor for playing audio chunks with speed control. It outlines the types, members, endpoints, variables, and functions available.

```APIDOC
namespace std::audio_data
  description: These structures are useful for representing chunks of audio data with a known sample-rate. They are useful types when you are declaring an external variable which is going to hold audio file data or generated waveform data.
  note: Duck-typing is used for the types of externals which contain audio data, so you can use your own classes as long as they contain a couple of fields which can hold the frame data and a sample rate. If you need a struct for audio data with more than 2 channels, you can just declare your own type using an appropriately-sized vector for the frames.

  Structs:
    struct Mono
      description: Represents a chunk of mono floating-point audio data.
      members:
        - const float32[] frames
        - float64 sampleRate

    struct Stereo
      description: Represents a chunk of stereo, interleaved floating-point audio data.
      members:
        - const float32<2>[] frames
        - float64 sampleRate

  processor std::audio_data::SamplePlayer (using SampleContent)
    description: This processor will play chunks of audio sample data with a speed ratio applied. It provides input events to set the audio data, speed ratio and other properties to control playback. The SampleContent type must be a struct containing a 'frames' member, which is an array of audio frames, and a 'sampleRate' member with the original rate of the audio data.
    Endpoints:
      - output stream out (SampleContent::frames.elementType)
      - input event content (SampleContent)
      - input event speedRatio (float32)
      - input event shouldLoop (bool)
      - input event position (float32)
    Variables:
      - SampleContent currentContent
      - float32 currentSpeed = 1.0f
      - float64 currentIndex
      - float64 indexDelta
      - bool isLooping = false
    Functions:
      - event content (SampleContent newContent)
      - event speedRatio (float32 newSpeed)
      - event position (float32 newPosition)
      - bool shouldLoop (bool shouldLoop)
      - void main()
```

--------------------------------

### Cmajor Standard Library: MIDI Processing Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.midi` module, providing tools for processing MIDI data, including MPE conversion and note-to-MIDI transformations.

```APIDOC
std.midi:
  midi:
    - MPEConverter
    - NoteToMIDI
```

--------------------------------

### cmaj::Patch Class

Source: https://cmajor.dev/docs/Tools/C++API

A high-level helper for asynchronously loading, building, and processing Cmajor patches. It takes a `PatchManifest`, handles background compilation, and intelligently determines audio, MIDI, and parameter endpoints for plugin-like interaction.

```APIDOC
cmaj::Patch:
  Description: High-level helper object for asynchronous patch operations.
  Purpose: Loads, builds, and processes a patch.
  Features:
    - Can be given a PatchManifest to load.
    - Runs a background thread for compilation.
    - Heuristics to determine audio, MIDI, or parameter endpoints.
    - Interacts with the underlying performer in a plugin-like style.
```

--------------------------------

### Cmajor Standard Library: Timeline Management Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.timeline` module, which likely offers components for managing time-based events or sequences.

```APIDOC
std.timeline:
  - timeline
```

--------------------------------

### Cmajor Standard Library Modules and Components

Source: https://cmajor.dev/docs/StandardLibrary

This section provides a hierarchical listing of the modules and components available in the Cmajor Standard Library. It covers various audio processing utilities, MIDI tools, level controls, and general-purpose functions, organized by their respective namespaces.

```APIDOC
std.audio:
  Convolve

std.envelopes:
  envelopes:
    FixedASR

std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode

std.frequency:
  frequency

std.intrinsics:
  intrinsics

std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law

std.matrix:
  matrix

std.midi:
  midi:
    MPEConverter
    NoteToMIDI

std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator

std.noise:
  noise:
    White
    Brown
    Pink

std.notes:
  notes

std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape

std.random:
  random

std.timeline:
  timeline

std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library - Levels Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.levels` module, covering components for gain control, smoothing, and pan law applications.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### std.mixers Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.mixers` module, offering various mixing functionalities including stereo-to-mono, mono-to-stereo conversion, dynamic and constant summing, and signal interpolation.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor Standard Library: Mixer Components Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.mixers` module, which includes components for audio mixing, such as stereo/mono conversion, dynamic summing, constant summing, and interpolation.

```APIDOC
std.mixers:
  mixers:
    - StereoToMono
    - MonoToStereo
    - DynamicSum
    - ConstantSum
    - Interpolator
```

--------------------------------

### Cmajor MIDI Message Creation and Utility Functions

Source: https://cmajor.dev/docs/StandardLibrary

Includes functions for creating a `Message` object from raw bytes and a utility function to clamp and convert float values to MIDI byte range.

```APIDOC
createMessage: Creates a short MIDI message object from the raw bytes
  Message createMessage (int32 byte1, int32 byte2, int32 byte3)
clampFloatToByte: Clamps and converts a 0-1 float value to a MIDI byte 0-127
  int32 clampFloatToByte (float32 value)
```

--------------------------------

### Cmajor Standard Library Module and Component Hierarchy

Source: https://cmajor.dev/docs/Examples/Tremolo

This section outlines the complete structure of the Cmajor Standard Library, presenting its various modules and the classes or processors contained within them. It provides a quick reference to navigate the library's functionalities, from basic audio operations to complex signal processing and MIDI handling.

```APIDOC
std.audio
  Convolve
std.envelopes
  envelopes
    FixedASR
std.filters
  filters
    tpt
      onepole
        Processor
        Mode
      svf
        Processor
        MultimodeProcessor
        Mode
    dcblocker
      Processor
    butterworth
      Processor
      Mode
    crossover
      Processor
    simper
      Processor
      Mode
std.frequency
  frequency
std.intrinsics
  intrinsics
std.levels
  smoothing
    SmoothedValueStream
  levels
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix
  matrix
std.midi
  midi
    MPEConverter
    NoteToMIDI
std.mixers
  mixers
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise
  noise
    White
    Brown
    Pink
std.notes
  notes
std.oscillators
  oscillators
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random
  random
std.timeline
  timeline
std.voices
  voices
```

--------------------------------

### Cmajor Standard Library: Envelope Generation Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.envelopes` module, offering components for generating and shaping audio envelopes, such as fixed attack-sustain-release envelopes.

```APIDOC
std.envelopes:
  envelopes:
    - FixedASR
```

--------------------------------

### Cmajor Standard Library: std.mixers Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.mixers` module in the Cmajor Standard Library, offering various mixer components for audio signal routing and summing. This includes stereo/mono converters, dynamic/constant sum mixers, and interpolators.

```APIDOC
std.mixers
  mixers
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor Intrinsic Comparison and Utility Functions

Source: https://cmajor.dev/docs/LanguageReference

Outlines additional utility functions in Cmajor's standard library, such as `max()`, `min()`, `select()`, and `lerp()`, describing their functionality.

```APIDOC
Comparison & Other Functions:
  max(): Returns largest value
  min(): Returns smallest value
  select(): Compares two input vectors and choses based on boolean input
  lerp(): Linear Interpolation
```

--------------------------------

### Cmajor Standard Library Module Hierarchy

Source: https://cmajor.dev/index

This snippet provides a hierarchical overview of the modules and components available within the Cmajor Standard Library. It categorizes various audio processing, utility, and MIDI-related functionalities, illustrating the relationships between modules, sub-modules, and individual processors or classes. This structure helps in understanding the library's organization and locating specific functionalities.

```APIDOC
std.audio:
  Convolve
std.envelopes:
  envelopes:
    FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
std.frequency:
  frequency
std.intrinsics:
  intrinsics
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix:
  matrix
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise:
  noise:
    White
    Brown
    Pink
std.notes:
  notes
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random:
  random
std.timeline:
  timeline
std.voices:
  voices
```

--------------------------------

### RTNeural to Cmajor Python Script Command-Line Options

Source: https://cmajor.dev/docs/Tools/MachineLearning

This snippet details the command-line arguments for the `rtneuralToCmajor.py` script. It covers options for specifying the RTNeural model file, the output patch directory, an optional model name, and the ability to use float64 precision instead of the default float32.

```Python
    --model <file>       Specifies the RTNeural model file to convert
    --patchDir <folder>  Specifies a folder into which the generated patch will be written
    --name <name>        Optional name for the model - defaults to "Model"
    --useFloat64         By default we use float32, but this changes the generated model to float64

  If no patchDir argument is supplied, the output will be a single Cmajor file.
```

--------------------------------

### Cmajor Standard Library: std.levels Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.levels` module, which includes components for gain control, smoothing, and pan law applications.

```APIDOC
smoothing:
  - SmoothedValueStream
levels:
  - ConstantGain
  - DynamicGain
  - SmoothedGain
  - SmoothedGainParameter
pan_law:
```

--------------------------------

### std::filters Module API Reference

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::filters` module, detailing its parameterized namespace and the common functions provided by filter `Implementation` structures.

```APIDOC
namespace std::filters (using FrameType = float32, using CoefficientType = float32, int32 framesPerParameterUpdate = 32)
  The `std::filters` namespace is parameterised, allowing both the `FrameType` and the `CoefficientType` to be modified. By default the filters are `float32`, and hence use 32 bit precision, and filter frames of a single channel. `FrameType` can be specified as a vector to support more channels (e.g. `float<2>` for a stereo filter).
  For efficiency reasons, modulated parameters are not applied every frame, and the `framesPerParameterUpdate` parameter can be used to tune the frequency of updates.
  Each filter type is provided as both a Processor, which can be included in graphs, and as an `Implementation` structure, suitable for being composed into a user processor.
  The filter processors are parameterised with these parameters setting the initial state of the filter. Parameter modulation is provided by input events.
  The filter `Implementation` structure provides the following functions:
  * `create()` functions which construct an `Implementation` with the specified initial properties - this is the typical way that the structs are constructed
  * `process()` which generates an output frame from an input frame
  * `setFrequency()`/`setMode()` functions for filter parameters to allow the filter to be modified post construction.
  * `reset()` which clears out any internal state, returning it to the state post creation
```

--------------------------------

### Cmajor std.timeline Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.timeline` module of the Cmajor Standard Library, related to timeline and sequencing operations.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### std::envelopes Module API Reference

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::envelopes` module, including the `FixedASR` processor for attack-sustain-release envelope generation.

```APIDOC
namespace std::envelopes
  Utilities for calculating and applying static and dynamic gain levels.

processor std::envelopes::FixedASR (float32 attackSeconds, float32 releaseSeconds)
  A very minimal, fixed-length, attack-sustain-release envelope generator.
  This has fixed-length attach and release times. Given input events of NoteOn and NoteOff objects, it will emit a stream of output gain levels that can be used to attenuate a voice.
  Endpoints:
    output stream gainOut (float32)
    input event eventIn (std::notes::NoteOn, std::notes::NoteOff)
  Variables:
    float32 keyDownVelocity
    float32 currentLevel
  Functions:
    event eventIn (std::notes::NoteOn noteOn)
    event eventIn (std::notes::NoteOff noteOff)
    void main()
```

--------------------------------

### Cmajor Standard Library - Audio Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.audio` module, including components for audio processing like convolution.

```APIDOC
std.audio:
  Convolve
```

--------------------------------

### Executing Cmaj JavaScript Files

Source: https://cmajor.dev/docs/ScriptFileFormat

Demonstrates how to run a JavaScript script using the `cmaj` command-line tool. This command executes the specified `.js` file, allowing it to perform Cmajor-related tasks programmatically.

```Shell
$ cmaj play my_script.js
```

--------------------------------

### Cmajor Standard Library: std.timeline Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.timeline` module in the Cmajor Standard Library, which likely contains components for managing or synchronizing events over time.

```APIDOC
std.timeline
  timeline
```

--------------------------------

### Cmajor Standard Library: std.midi Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.midi module in the Cmajor Standard Library, containing components for MIDI message processing and conversion.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### CMAJOR Standard Library Modules and Components

Source: https://cmajor.dev/docs/Examples/Piano

This documentation outlines the hierarchical structure of the CMAJOR Standard Library, detailing its various modules such as `std.audio`, `std.filters`, `std.midi`, and `std.oscillators`, along with the components and processors available within each. It serves as a high-level API reference for navigating the library's functionalities.

```APIDOC
std.audio
  Convolve
std.envelopes
  envelopes
    FixedASR
std.filters
  filters
    tpt
      onepole
        Processor
        Mode
      svf
        Processor
        MultimodeProcessor
        Mode
    dcblocker
      Processor
    butterworth
      Processor
      Mode
    crossover
      Processor
    simper
      Processor
      Mode
std.frequency
  frequency
std.intrinsics
  intrinsics
std.levels
  smoothing
    SmoothedValueStream
  levels
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix
  matrix
std.midi
  midi
    MPEConverter
    NoteToMIDI
std.mixers
  mixers
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise
  noise
    White
    Brown
    Pink
std.notes
  notes
std.oscillators
  oscillators
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random
  random
std.timeline
  timeline
std.voices
  voices
```

--------------------------------

### cmaj::Program Class API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

A `Program` is a collection of source files that have been parsed and are ready for compilation. It serves as the input for the `cmaj::Engine::load()` method to initiate the build process.

```APIDOC
cmaj::Program:
  Purpose: A collection of source files parsed and ready for compiling.
  Creation:
    - Get a `cmaj::Program` object.
    - Call `parse()` method for each file or code chunk.
  Usage: Passed to `cmaj::Engine::load()` to start the build process.
```

--------------------------------

### Cmajor Standard Library: std.frequency Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.frequency' module, likely containing components related to frequency analysis or manipulation.

```APIDOC
std.frequency:
  - frequency
```

--------------------------------

### Cmajor Standard Library: std.voices Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.voices` module, likely containing components related to voice management or polyphony.

```APIDOC
voices:
```

--------------------------------

### Cmajor Standard Library: std.notes Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.notes` module, likely containing utilities related to musical notes or pitch processing.

```APIDOC
notes:
```

--------------------------------

### Cmajor Implicit Struct Creation from Value List

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how a struct object can be implicitly created from a list of values when the target type is known, such as in a return statement. This provides a very concise way to construct and return struct instances.

```cmajor
struct Position { float x, y; }

Position getMovedPosition (Position p)
{
    return (p.x + 10.0f,
            p.y - 5.0f);
}
```

--------------------------------

### Cmajor std::midi::MPEConverter Processor API

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `MPEConverter` processor, which transforms raw MIDI MPE events into structured note event objects. Details its output and input event endpoints, and the `parseMIDI` function.

```APIDOC
processor std::midi::MPEConverter: Accepts an input stream of raw MIDI MPE events and converts them to a stream of note event objects which can be more easily used by synthesiser classes.
  Endpoints:
    output event eventOut (NoteOn, NoteOff, PitchBend, Slide, Pressure, Control)
    input event parseMIDI (Message)
  Functions:
    event parseMIDI (Message message)
```

--------------------------------

### Cmajor Standard Library: std.midi Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.midi` module in the Cmajor Standard Library, providing components for MIDI message processing and conversion, such as `MPEConverter` and `NoteToMIDI`.

```APIDOC
std.midi
  midi
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor std::midi::NoteToMIDI Processor API

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `NoteToMIDI` processor, responsible for converting note event objects back into a stream of short MIDI messages. Details its output and input event endpoints, and the various `eventIn` overload functions.

```APIDOC
processor std::midi::NoteToMIDI: Accepts an input of note events, and converts them to a stream of short midi messages.
  Endpoints:
    output event midiOut (Message)
    input event eventIn (NoteOn, NoteOff, PitchBend, Slide, Pressure, Control)
  Functions:
    event eventIn (NoteOn e)
    event eventIn (NoteOff e)
    event eventIn (PitchBend e)
    event eventIn (Pressure e)
    event eventIn (Slide e)
    event eventIn (Control e)
```

--------------------------------

### std.timeline Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.timeline` module, which likely provides utilities for managing or synchronizing events over time.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Struct Initialization with Parenthesized List

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates an alternative method for initializing struct members directly during object creation using a parenthesized list of values. This allows for concise initialization without separate member assignments.

```cmajor
struct Position { float x, y; }

Position getMovedPosition (Position p)
{
    let newPos = Position (p.x + 10.0f,
                           p.y - 5.0f);
    return newPos;
}
```

--------------------------------

### Cmajor Standard Library: std.mixers Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.mixers module in the Cmajor Standard Library, providing various mixing and interpolation components.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor Standard Library - Timeline Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.timeline` module, which likely contains components for managing or processing events over time.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Standard Library: std.midi Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.midi` module, providing components for MIDI message processing and conversion, such as `MPEConverter` and `NoteToMIDI`.

```APIDOC
midi:
  - MPEConverter
  - NoteToMIDI
```

--------------------------------

### Cmajor Standard Library: Frequency Analysis Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.frequency` module, providing utilities related to frequency analysis and manipulation.

```APIDOC
std.frequency:
  - frequency
```

--------------------------------

### Configure External piano::samples Data in Cmajor Patch Manifest (JSON)

Source: https://cmajor.dev/docs/PatchFormat

This JSON configuration for a `.cmajorpatch` file specifies the data for the `piano::samples` external variable. It provides an array of objects, each containing `source` (audio file path) and `rootNote` properties, which the runtime coerces into `PianoSample` objects.

```JSON
    "externals": {
        "piano::samples": [ { "source": "piano_36.ogg",  "rootNote": 36 },
                            { "source": "piano_48.ogg",  "rootNote": 48 },
                            { "source": "piano_60.ogg",  "rootNote": 60 },
                            { "source": "piano_72.ogg",  "rootNote": 72 },
                            { "source": "piano_84.ogg",  "rootNote": 84 } ]
    }

```

--------------------------------

### Cmajor Standard Library: std.levels Module

Source: https://cmajor.dev/docs/Examples/RingMod

Details the `std.levels` module, which includes components for gain control, smoothing values, and pan law implementations, such as ConstantGain, DynamicGain, and SmoothedGain.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### cmaj::Performer Class API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

A `Performer` is an object containing a compiled, ready-to-run instance of a Cmajor program. An `Engine` can create multiple independent `Performer` instances for a single program. This class provides low-level, real-time safe methods for interaction.

```APIDOC
cmaj::Performer:
  Purpose: A compiled, ready-to-run instance of a Cmajor program.
  Capabilities:
    - Write data and events to input endpoints.
    - Read data and events from output endpoints.
    - Synchronously render the next 'n' frames.
    - Get status information (over/underrun counts, runtime errors).
  Note: Methods are designed for synchronous calls on real-time threads; helper classes provide thread-safe abstractions.
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module

Source: https://cmajor.dev/docs/Examples/STunedBar6

Documents the components available within the Cmajor Standard Library's envelopes module, focusing on dynamic amplitude shaping and envelope generation.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR:
```

--------------------------------

### Hoist Child Processor Endpoints Using Wildcard in Cmajor Graph

Source: https://cmajor.dev/docs/LanguageReference

Illustrates using a wildcard pattern (`*`) to hoist multiple child processor outputs that match a specific naming convention to the parent graph's top-level outputs. This is useful for exposing many related endpoints concisely.

```Cmajor
graph Parent
{
    output child.out*; // expose all of this node's outputs that begin with the characters "out"

    node child = MyChildProcessor;
}
```

--------------------------------

### Cmajor Standard Library: std.matrix Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.matrix` module in the Cmajor Standard Library, which likely contains functionalities for matrix operations or multi-channel signal processing.

```APIDOC
std.matrix
  matrix
```

--------------------------------

### Hoist Child Processor Endpoints Directly in Cmajor Graph

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the shortcut syntax for 'hoisting' specific child processor outputs directly to the parent graph's top-level outputs without explicit `connection` statements. This simplifies graph definitions by implicitly creating the necessary connections.

```Cmajor
graph Parent
{
    output child.out1, child.out2;

    node child = MyChildProcessor;
}
```

--------------------------------

### Cmajor Single-Dimensional Array Initialization

Source: https://cmajor.dev/docs/LanguageReference

Illustrates various ways to declare and initialize single-dimensional arrays in Cmajor. This includes direct initialization with a list of values and different syntaxes for zero-initialization.

```Cmajor
let x = int[4] (1, 2, 3, 4);    // these all declare an array containing 1, 2, 3, 4
let x = int[] (1, 2, 3, 4);
int[] x = (1, 2, 3, 4);

int[4] y;           // these are all zero-initialised
int[4] y = ();
var y = int[4]();
```

--------------------------------

### Cmajor Standard Library: Noise Generation Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.noise` module, providing various noise generation algorithms, including white, brown, and pink noise.

```APIDOC
std.noise:
  noise:
    - White
    - Brown
    - Pink
```

--------------------------------

### Cmajor Standard Library: std.mixers Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.mixers` module in the Cmajor Standard Library, providing components for audio mixing and channel conversion, including `StereoToMono`, `MonoToStereo`, `DynamicSum`, `ConstantSum`, and `Interpolator`.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor Standard Library: std.audio Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.audio` module, which contains core audio processing components like `Convolve`.

```APIDOC
audio:
  - Convolve
```

--------------------------------

### Cmajor Supported RTNeural Layers and Activations

Source: https://cmajor.dev/docs/Tools/MachineLearning

This section enumerates the RTNeural layers and activation functions that Cmajor currently supports for conversion. These include common neural network components, enabling the integration of various RTNeural models into Cmajor.

```APIDOC
Supported RTNeural Features:
- Layers: Dense, conv1d, conv2d, GRU, PReLU, BatchNorm1D, BatchNorm2D, LSTM
- Activations: tanh, ReLU, Sigmoid, Softmax, ELu, PReLU
```

--------------------------------

### Cmaj Performer Management Class (JavaScript API)

Source: https://cmajor.dev/docs/ScriptFileFormat

Created by `Engine.createPerformer()`, this class wraps the C++ `cmaj::Performer` and is used to render a Cmajor processor. It provides methods for setting block size, advancing processing, and retrieving output.

```APIDOC
class Performer
{
    constructor (performerID)
    release()
    setBlockSize (frames)
    advance()
    getOutputFrames (h)
    getOutputEvents (h)
    getOutputValue (h)
    setInputFrames (h, d)
    setInputValue (h, d, f)
    addInputEvent (h, d)
    getXRuns()
    calculateRenderPerformance (bs, f)
}
```

--------------------------------

### Train GuitarLSTM Model

Source: https://cmajor.dev/docs/Examples/GuitarLSTM

Command to train the GuitarLSTM model using the provided Python script. This process uses specified input and output WAV files to train the model, generating the output in 'models/test' and the Cmajor patch in 'models/test/patch'.

```Shell
./train.py data/ts9_test1_in_FP32.wav data/ts9_test1_out_FP32.wav test
```

--------------------------------

### cmaj::GeneratedCppEngine Class

Source: https://cmajor.dev/docs/Tools/C++API

A templated class that wraps code-generated C++ classes from the `cmaj` tool into a `cmaj::Engine` object. This allows static C++ output to be used similarly to the JIT engine, facilitating integration into `cmaj::Patch` or `cmaj::GeneratedPlugin`. It's recommended to use `cmaj::createEngineForGeneratedCppProgram()` for instantiation.

```APIDOC
cmaj::GeneratedCppEngine:
  Description: Templated class to create a cmaj::Engine object from code-generated C++ classes.
  Purpose: Wraps bare-bones, dependency-free C++ classes (emitted by cmaj tool's code-generator) into an Engine object.
  Usage:
    - Can be used in the same way as the JIT engine.
    - Easily wrapped into a cmaj::Patch or used with cmaj::GeneratedPlugin to create a JUCE plugin.
  Recommendation: Call cmaj::createEngineForGeneratedCppProgram() function to get a cmaj::Engine object instead of dealing directly with this class.
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module

Source: https://cmajor.dev/docs/Examples/RingMod

Describes the `std.envelopes` module, which provides classes for generating and managing audio envelopes, such as the FixedASR envelope.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### std::convolution Module API Reference

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::convolution` module, including processors for time-domain convolution, FFT, iFFT, and general convolution, along with associated functions and endpoints.

```APIDOC
Functions:
  event impulseData (ImpulseType[] impulse)
  float32<N> arrayToVector<N> (float32[N] a)

processor std::convolution::TimeDomainProcessor (int32 maxImpulseFrames)
  A simple time domain convolution algorithm. This will be costly to execute for longer impulses
  Endpoints:
    output stream out (ImpulseType)
    input stream in (float32)
    input event impulseData (ImpulseType[])
  Variables:
    float32<maxImpulseFrames>[ImpulseChannelCount] impulse
  Functions:
    event impulseData (ImpulseType[] v)
    void main()

processor std::convolution::FFT (int32 blockSize)
  Endpoints:
    output event out (complex32[blockSize])
    input stream in (float32)
  Variables:
    complex32[blockSize] buffer
  Functions:
    void main()

processor std::convolution::iFFT (int32 blockSize)
  Endpoints:
    output stream out (float32)
    input event in (complex32[blockSize])
  Variables:
    complex32[blockSize] buffer
  Functions:
    event in (const complex32[blockSize]& data)
    void main()

processor std::convolution::Convolve (int32 maxImpulseFrames, int32 blockSize)
  Endpoints:
    output event out (complex32[blockSize])
    input event in (complex32[blockSize])
    input event impulseData (ImpulseChannel)
  Variables:
    int32 activeBlocks = 0
    numBlocks = (2 * maxImpulseFrames) / blockSize
    complex32[numBlocks, blockSize] impulseFFT
    complex32[numBlocks, blockSize] blockData
    wrap<numBlocks> currentBlock
  Functions:
    event in (const complex32[blockSize]& newBlock)
    event impulseData (ImpulseChannel impulse)
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.envelopes` module in the Cmajor Standard Library, which includes components for envelope generation and manipulation, such as the `FixedASR` processor.

```APIDOC
std.envelopes
  envelopes
    FixedASR
```

--------------------------------

### Event Input Handlers (eventIn)

Source: https://cmajor.dev/docs/StandardLibrary

These `eventIn` functions serve as handlers for various MIDI-related input events, allowing the Cmajor device to react to different types of musical data.

```APIDOC
eventIn(noteOn: std::notes::NoteOn) -> event
  noteOn: A NoteOn event object.
```

```APIDOC
eventIn(noteOff: std::notes::NoteOff) -> event
  noteOff: A NoteOff event object.
```

```APIDOC
eventIn(bend: std::notes::PitchBend) -> event
  bend: A PitchBend event object.
```

```APIDOC
eventIn(pressure: std::notes::Pressure) -> event
  pressure: A Pressure event object.
```

```APIDOC
eventIn(slide: std::notes::Slide) -> event
  slide: A Slide event object.
```

```APIDOC
eventIn(control: std::notes::Control) -> event
  control: A Control event object.
```

--------------------------------

### Cmajor Standard Library - Envelopes Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.envelopes` module, providing components for envelope generation and manipulation, such as `FixedASR`.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### Cmajor Standard Library: std.midi Module

Source: https://cmajor.dev/docs/Examples/RingMod

Outlines the `std.midi` module, offering tools for MIDI processing, including converters for MPE (MIDI Polyphonic Expression) and general note-to-MIDI conversion.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor Complex Number Initialization and Property Access

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates various methods for initializing `complex32` and `complex64` types in Cmajor, including using imaginary literals (e.g., `2.0fi`) and the `complex()` constructor. It also shows how to extract the real and imaginary components of a complex number and declare a vector of complex numbers.

```Cmajor
// These 3 statements are different ways to create the same complex value:
complex32 c1 = 2.0fi + 3.0f;
let c2 = 3.0f + 2.0fi;
let c3 = complex (3.0f, 2.0f);

let c4 = complex (4.0);  // creates a value (4 + 0i)

let ci = c1.imag;  // extracts the imaginary part a complex number
let cr = c1.real;  // extracts the real part a complex number

complex64<4> v = (2.0i + 5.0);  // declares a vector of 4 complex 64-bits numbers.

let r = v.real;     // extracts the real elements from the vector so has type float64<4>
```

--------------------------------

### Cmajor Processor `main` Function for Stream Processing

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates a Cmajor processor that continuously reads an integer from an input stream, adds one to it, and writes the result to an output stream. It highlights the `loop` keyword for infinite execution and `advance()` for frame progression, typical for real-time audio processing.

```Cmajor
processor AddOne
{
    input stream int in;    // an input stream of integers
    output stream int out;  // an output stream of integers

    void main()
    {
        loop
        {
            out <- in + 1;  // reads the next value from 'in', adds 1, and writes the result to 'out'
            advance();  // moves forward to the next frame
        }
    }
}

```

--------------------------------

### Cmajor Standard Library: Musical Note Utilities Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.notes` module, which likely contains utilities for handling musical note data and transformations.

```APIDOC
std.notes:
  - notes
```

--------------------------------

### std.envelopes Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.envelopes` module, which provides tools for generating and manipulating audio envelopes, such as fixed attack-sustain-release envelopes.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### Cmajor Standard Library: std.timeline Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.timeline` module, likely providing components for managing or processing events over time.

```APIDOC
timeline:
```

--------------------------------

### std.audio Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.audio` module, primarily focusing on audio processing functionalities like convolution.

```APIDOC
std.audio:
  audio:
    Convolve
```

--------------------------------

### Cmajor std.mixers Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.mixers` module of the Cmajor Standard Library, covering various audio mixing and interpolation functionalities.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Handle Cmajor Void and Mixed Type Events

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates handling `void` datatype events and mixed-type events in Cmajor processors. It illustrates how to define handlers for both `void` and other data types, and shows the special syntax (`myOutput <- void;`) for writing a `void` event to an output endpoint.

```Cmajor
processor P
{
    input event (void, int) myInput;        // Input endpoint taking either a void or int value
    output event void myOutput;

    event myInput() {}                      // Handler for the void datatype
    event myInput (int i) {}                // Handler for the int datatype

    void main()
    {
        myOutput <- void;                   // Write a void event to myOutput
        advance();
    }
}
```

--------------------------------

### Cmajor Standard Library: std.voices Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.voices` module in the Cmajor Standard Library, which likely provides components for voice management in polyphonic synthesizers or similar applications.

```APIDOC
std.voices
  voices
```

--------------------------------

### Cmajor Standard Library: std.timeline Module

Source: https://cmajor.dev/docs/Examples/RingMod

Documents the `std.timeline` module, which probably offers components for managing time-based events or sequences in Cmajor applications.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Standard Library: std.midi Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.midi` module in the Cmajor Standard Library, offering MIDI-related utilities such as `MPEConverter` and `NoteToMIDI`.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### std.matrix Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.matrix` module, which likely offers functionalities for matrix operations or multi-channel signal processing.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Test Directive: runScript Configuration Options

Source: https://cmajor.dev/docs/TestFileFormat

Defines the available configuration parameters for the `runScript` directive, controlling aspects like sample rate, render frames, block size, and paths for golden data and patches.

```APIDOC
runScript Options:
  frequency: The sample rate for the session (mandatory)
  samplesToRender: How many frames to render (mandatory)
  blockSize: Specifies the maximum block size for the render (mandatory)
  subDir: Relative subdirectory for golden data (optional)
  patch: Relative path to a patch for testing, allowing tests on a patch instead of an embedded processor (optional)
  mainProcessor: Overrides the main processor when a patch is specified, enabling component testing within the patch (optional)
  maxDiffDb: Maximum acceptable difference in stream value; defaults to -100db (optional)
```

--------------------------------

### Cmajor Standard Library: std.frequency Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.frequency` module, likely containing utilities related to frequency analysis or manipulation.

```APIDOC
frequency:
```

--------------------------------

### Cmajor Standard Library: std.random Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.random' module, likely containing components for random number generation.

```APIDOC
std.random:
  - random
```

--------------------------------

### Cmajor Standard Library: std.timeline Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.timeline module in the Cmajor Standard Library, likely providing utilities for time-based events or sequencing.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.oscillators' module, including various oscillator types like Phasor, Sine, Polyblep, and LFO, along with waveshaping.

```APIDOC
std.oscillators:
  oscillators:
    - Phasor
    - Sine
    - PolyblepOscillator
    - LFO
    - waveshape
```

--------------------------------

### cmaj::AudioMIDIPerformer Class

Source: https://cmajor.dev/docs/Tools/C++API

Manages a `cmaj::Performer` for audio/MIDI processing, providing a `process()` function. It includes lock-free FIFOs for safe event injection and allows callback attachment for output event data. Usage involves creating an `Engine`, configuring `AudioMIDIPerformer::Builder` for I/O, and then creating the performer object.

```APIDOC
cmaj::AudioMIDIPerformer:
  Description: Helper class owning and managing a cmaj::Performer.
  Purpose: Provides a simple process() function for audio/MIDI buffer handling, similar to a traditional C++ audio processor.
  Features:
    - Lock-free FIFOs for safe event and value changes from other threads.
    - Callback attachment for handling output event data.
  Usage Steps:
    1. Create a suitable cmaj::Engine, add code, and link it.
    2. Create an AudioMIDIPerformer::Builder object with the engine.
    3. Use Builder methods to set appropriate audio I/O channel mappings.
    4. Call Builder::createPerfomer() to get the AudioMIDIPerformer object for playback.
```

--------------------------------

### Cmajor Standard Library Module and Component Hierarchy

Source: https://cmajor.dev/docs/Examples/808

A comprehensive listing of modules, sub-modules, classes, and components available in the Cmajor Standard Library, organized hierarchically. This reference details the structure of the 'std' namespace, covering areas such as audio processing, signal generation, MIDI handling, and utility functions.

```APIDOC
std.audio
  audio
    Convolve
std.envelopes
  envelopes
    FixedASR
std.filters
  filters
    tpt
      onepole
        Processor
        Mode
      svf
        Processor
        MultimodeProcessor
        Mode
    dcblocker
      Processor
    butterworth
      Processor
      Mode
    crossover
      Processor
    simper
      Processor
      Mode
std.frequency
  frequency
std.intrinsics
  intrinsics
std.levels
  smoothing
    SmoothedValueStream
  levels
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix
  matrix
std.midi
  midi
    MPEConverter
    NoteToMIDI
std.mixers
  mixers
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise
  noise
    White
    Brown
    Pink
std.notes
  notes
std.oscillators
  oscillators
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random
  random
std.timeline
  timeline
std.voices
  voices
```

--------------------------------

### Cmajor std.midi Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.midi` module of the Cmajor Standard Library, providing utilities for MIDI message processing and conversion.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor Standard Library: Timeline Module

Source: https://cmajor.dev/docs/Tools

Contains components for managing and processing events over a timeline, crucial for sequencing and automation.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Standard Library - Matrix Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.matrix` module, likely containing utilities for matrix operations or transformations.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Standard Library: std.noise Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.noise' module, providing various noise generators like White, Brown, and Pink noise.

```APIDOC
std.noise:
  noise:
    - White
    - Brown
    - Pink
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.intrinsics` module, likely providing fundamental or built-in operations.

```APIDOC
intrinsics:
```

--------------------------------

### Cmajor Standard Library - Notes Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.notes` module, which likely contains components related to musical note processing or generation.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor Standard Library: Levels Module

Source: https://cmajor.dev/docs/Tools

Includes components for managing and smoothing audio levels and gains, offering various gain types and value stream smoothing.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Cmajor Standard Library: Matrix Module

Source: https://cmajor.dev/docs/Tools

Provides functionalities for matrix operations, useful for multi-channel audio processing or transformations.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor std::voices Namespace API

Source: https://cmajor.dev/docs/StandardLibrary

Demonstrates a simple voice-allocation algorithm. It processes incoming note events and redirects them to an array of destination processors, ensuring each target voice receives events from only one channel at a time.

```APIDOC
namespace std::voices

processor std::voices::VoiceAllocator:
  signature: (int32 numVoices, int32 MPEMasterChannel = 0)
  description: A basic least-recently-used voice allocator. Assigns new notes to inactive voices or steals the least-recently-used active voice.
  Endpoints:
    output event voiceEventOut (std::notes::NoteOn, std::notes::NoteOff, std::notes::PitchBend, std::notes::Slide, std::notes::Pressure, std::notes::Control)
    input event eventIn (std::notes::NoteOn, std::notes::NoteOff, std::notes::PitchBend, std::notes::Slide, std::notes::Pressure, std::notes::Control)

Structs:
  struct VoiceState:
    bool isActive
    bool isReleasing
    int32 channel
    int32 age
    float32 pitch

Variables:
  VoiceState[numVoices] voiceState
  int32 nextActiveTime = 0x70000000
  int32 nextInactiveTime = 1
  bool mpeMasterSustainActive
  int64 perChannelSustainActive
```

--------------------------------

### Cmajor Standard Library: std.notes Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.notes` module in the Cmajor Standard Library, which likely contains utilities or components related to musical note processing or representation.

```APIDOC
std.notes
  notes
```

--------------------------------

### Cmajor Standard Library: std.random Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.random` module, likely containing utilities for random number generation.

```APIDOC
random:
```

--------------------------------

### Cmajor Standard Library - Oscillators Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.oscillators` module, offering various oscillator types for sound synthesis, including Phasor, Sine, Polyblep, and LFO.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.envelopes` module, providing components for envelope generation, such as `FixedASR`.

```APIDOC
envelopes:
  - FixedASR
```

--------------------------------

### Cmajor Standard Library: std.timeline Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.timeline` module in the Cmajor Standard Library, likely for managing time-based events or sequences.

```APIDOC
std.timeline:
  timeline
```

--------------------------------

### Cmajor Standard Library: std.levels Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.levels module in the Cmajor Standard Library, containing components for level control, smoothing, and pan law applications.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Cmajor Standard Library: std.voices Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.voices module in the Cmajor Standard Library, likely containing components related to voice management in synthesizers.

```APIDOC
std.voices:
  voices
```

--------------------------------

### C Major TPT One-Pole Filter API (`std::filters::tpt::onepole`)

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the one-pole filter implementation in C Major, providing low and high pass options. It includes struct definitions, core functions for creation and parameter manipulation, processor details, and available endpoints for control and data flow.

```APIDOC
namespace std::filters::tpt::onepole

Structs:
  struct Implementation:
    CoefficientType b
    FrameType z1
    int32 mode

Functions:
  create(int32 mode, float64 processorFrequency, float64 filterFrequency) -> Implementation
  setFrequency(Implementation& this, float64 processorFrequency, float64 filterFrequency) -> void
  reset(Implementation& this) -> void
  setMode(Implementation& this, int32 mode) -> void
  process(Implementation& this, FrameType x) -> FrameType

Processor:
  processor std::filters::tpt::onepole::Processor(int32 initialMode = Mode::lowPass, float32 initialFrequency = defaultFrequency)

Endpoints:
  output stream out (FrameType)
  input stream in (FrameType)
  input event mode (int32)
  input event frequency (float32)

Variables (Processor):
  filter
  bool updateFilter = false
  float32 filterFrequency
  int32 filterMode

Functions (Processor Events):
  event mode (int32 m)
  event frequency (float32 f)
  void main()
  void reset()

Mode Constants:
  int32 lowPass = 0
  int32 highPass = 1
```

--------------------------------

### Cmajor Standard Library: MIDI Module

Source: https://cmajor.dev/docs/Tools

Offers components for MIDI message processing and conversion, including MPE and note-to-MIDI functionalities.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor std.envelopes Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.envelopes` module of the Cmajor Standard Library, focusing on envelope generation and manipulation.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### std.midi Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.midi` module, providing utilities for MIDI message processing and conversion, such as MPE (MIDI Polyphonic Expression) conversion and note-to-MIDI transformations.

```APIDOC
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
```

--------------------------------

### Cmajor Standard Library: std.matrix Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.matrix module in the Cmajor Standard Library, likely providing utilities for matrix operations.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Patch Connection Asset Handling Methods

Source: https://cmajor.dev/docs/PatchFormat

Method for converting relative asset paths within a patch bundle to paths relative to the browser's root, essential for correct HTML DOM usage in GUI modules.

```APIDOC
getResourceAddress (path)
  This takes a relative path to an asset within the patch bundle, and converts it to a path relative to the root of the browser that is showing the view.
  You need to use this in your view code to translate your asset URLs to a form that can be safely used in your view’s HTML DOM (e.g. in its CSS). This is needed because the host’s HTTP server (which is delivering your view pages) may have a different ‘/’ root than the root of your patch (e.g. if a single server is serving multiple patch GUIs).
```

--------------------------------

### Cmajor Standard Library: Intrinsic Functions Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.intrinsics` module, which likely exposes fundamental, highly optimized operations or built-in functions.

```APIDOC
std.intrinsics:
  - intrinsics
```

--------------------------------

### Cmajor Standard Library: std.voices Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.voices` module in the Cmajor Standard Library, which likely handles voice management for polyphonic synthesis.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library: std.mixers Module

Source: https://cmajor.dev/docs/Examples/RingMod

Covers the `std.mixers` module, which provides various audio mixing components such as stereo-to-mono, mono-to-stereo converters, dynamic and constant sum mixers, and interpolators.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmajor std.levels Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.levels` module of the Cmajor Standard Library, focusing on level control, smoothing, and gain management.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Cmajor Standard Library: std.frequency Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.frequency` module in the Cmajor Standard Library, which likely contains utilities or components related to frequency analysis or manipulation.

```APIDOC
std.frequency
  frequency
```

--------------------------------

### Cmajor Standard Library: std.notes Module

Source: https://cmajor.dev/docs/Examples/RingMod

Describes the `std.notes` module, which likely contains utilities or components related to musical note handling and processing within the Cmajor environment.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor Standard Library: Audio Processing Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.audio` module, which provides core audio processing functionalities like convolution.

```APIDOC
std.audio:
  - Convolve
```

--------------------------------

### Cmajor Standard Library: Voices Module

Source: https://cmajor.dev/docs/Tools

Offers components related to voice management in synthesizers, facilitating polyphony and voice allocation.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmaj Engine Interaction Class (JavaScript API)

Source: https://cmajor.dev/docs/ScriptFileFormat

Binds to the C++ `cmaj::Engine` class, providing functionality to compile and manage Cmajor programs. This class allows setting build configurations, loading programs, linking, and creating performers.

```APIDOC
class Engine
{
    constructor (engineArgs)
    release()
    isValid()
    getBuildSettings()
    setBuildSettings (settings)
    load (program) // takes a Program object, as detailed below.
    unload()
    getInputEndpoints()
    getOutputEndpoints()
    link()
    isLoaded()
    isLinked()
    createPerformer()  // returns a new Performer object (see below) or an error
    getEndpointHandle (endpointID)
    getExternalVariables()
    setExternalVariable(fullyQualifiedName, value)
    getAvailableCodeGenTargetTypes()
    generateCode (target, options)
}
```

--------------------------------

### Cmajor Standard Library: std.frequency Module

Source: https://cmajor.dev/docs/Examples/STunedBar6

Documents the components available within the Cmajor Standard Library's frequency module, providing utilities related to frequency analysis and manipulation.

```APIDOC

```

--------------------------------

### Cmaj Module Aliases: Shortcutting Parameterized Processor/Namespace Names

Source: https://cmajor.dev/docs/LanguageReference

Shows how to create aliases for parameterized Cmaj processors and namespaces. This syntax provides a convenient shorthand for their full declarations, simplifying code and making it easier to reuse complex parameterized module configurations.

```Cmaj
processor MyAlias1 = my_namespace::MyProcessor(float<2>, 1234),
          MyAlias2 = my_namespace::MyProcessor(float<3>, 5432);

namespace n123 = some_namespace(float64)::other_namespace(1.0f);

```

--------------------------------

### Cmajor Standard Library: std.noise Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.noise` module, providing different types of noise generators like White, Brown, and Pink noise.

```APIDOC
noise:
  - White
  - Brown
  - Pink
```

--------------------------------

### Cmajor Standard Library API Structure

Source: https://cmajor.dev/docs/Examples

Detailed hierarchical overview of modules, sub-modules, and components within the Cmajor Standard Library, including audio processing, MIDI, levels, and various utility classes. This structure helps in understanding the organization and available functionalities.

```APIDOC
std.audio:
  audio:
    Convolve
std.envelopes:
  envelopes:
    FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
std.frequency:
  frequency
std.intrinsics:
  intrinsics
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix:
  matrix
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise:
  noise:
    White
    Brown
    Pink
std.notes:
  notes
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random:
  random
std.timeline:
  timeline
std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library: std.noise Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.noise module in the Cmajor Standard Library, containing components for generating different types of noise signals.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### Cmajor Standard Library: std.levels Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.levels` module in the Cmajor Standard Library, focusing on components for gain control, smoothing, and pan law. This includes `SmoothedValueStream`, various `Gain` types, and `pan_law` utilities.

```APIDOC
std.levels
  smoothing
    SmoothedValueStream
  levels
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Implement Auto-Scaling GUI with getScaleFactorLimits() in Cmajor

Source: https://cmajor.dev/docs/PatchFormat

This JavaScript code demonstrates how to make a Cmajor patch GUI automatically scale when its window is resized. By implementing the `getScaleFactorLimits()` method within a custom `HTMLElement` class, developers can define the minimum and maximum scaling factors for their web component, ensuring a responsive user interface.

```JavaScript
class MyAmazingPatchView extends HTMLElement {
    // constructor and other methods...

    getScaleFactorLimits()
    {
        return { minScale: 0.5, maxScale: 1.25 };
    }
}
```

--------------------------------

### Cmajor Standard Library: Notes Module

Source: https://cmajor.dev/docs/Tools

Includes components related to musical note processing and manipulation.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor Standard Library API Structure

Source: https://cmajor.dev/docs/Examples/SubtractOne

Detailed hierarchical listing of all modules, sub-modules, and individual components (processors, modes, etc.) available within the Cmajor Standard Library. This structure outlines the organization of functionalities such as envelopes, filters, levels, MIDI, mixers, noise, and oscillators.

```APIDOC
    Convolve\nstd.envelopes:\n  envelopes:\n    FixedASR\nstd.filters:\n  filters:\n    tpt:\n      onepole:\n        Processor\n        Mode\n      svf:\n        Processor\n        MultimodeProcessor\n        Mode\n    dcblocker:\n      Processor\n    butterworth:\n      Processor\n      Mode\n    crossover:\n      Processor\n    simper:\n      Processor\n      Mode\nstd.frequency:\n  frequency:\nstd.intrinsics:\n  intrinsics:\nstd.levels:\n  smoothing:\n    SmoothedValueStream\n  levels:\n    ConstantGain\n    DynamicGain\n    SmoothedGain\n    SmoothedGainParameter\n  pan_law\nstd.matrix:\n  matrix:\nstd.midi:\n  midi:\n    MPEConverter\n    NoteToMIDI\nstd.mixers:\n  mixers:\n    StereoToMono\n    MonoToStereo\n    DynamicSum\n    ConstantSum\n    Interpolator\nstd.noise:\n  noise:\n    White\n    Brown\n    Pink\nstd.notes:\n  notes:\nstd.oscillators:\n  oscillators:\n    Phasor\n    Sine\n    PolyblepOscillator\n    LFO\n    waveshape\nstd.random:\n  random:\nstd.timeline:\n  timeline:\nstd.voices:\n  voices:
```

--------------------------------

### Cmajor std.voices Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.voices` module of the Cmajor Standard Library, related to voice management in synthesizers.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmajor std.matrix Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.matrix` module of the Cmajor Standard Library, related to matrix operations.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Standard Library - Frequency Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.frequency` module, which likely contains components related to frequency analysis or manipulation.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.envelopes module in the Cmajor Standard Library, containing components related to envelope generation and processing.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### Cmajor Standard Library: std.audio Module

Source: https://cmajor.dev/docs/Examples/STunedBar6

Documents the components available within the Cmajor Standard Library's audio module, including core audio processing functionalities like convolution.

```APIDOC
std.audio:
  Convolve:
```

--------------------------------

### std::filters::tpt::svf Functions

Source: https://cmajor.dev/docs/StandardLibrary

Core functions and event handlers for the tpt::svf filter, managing frequency, Q factor, and general processor lifecycle.

```APIDOC
Functions:
  event frequency (float32 f)
  event q (float32 q)
  void main()
  void reset()
```

--------------------------------

### Cmajor Standard Library: Envelopes Module

Source: https://cmajor.dev/docs/Tools

Contains classes for generating and processing audio envelopes, such as the FixedASR envelope generator.

```APIDOC
std.envelopes:
  envelopes:
    FixedASR
```

--------------------------------

### std.frequency Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.frequency` module, which likely provides utilities related to frequency analysis or manipulation.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### std.voices Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.voices` module, which may provide functionalities related to voice management in polyphonic synthesizers or similar applications.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library: std.audio Module Components

Source: https://cmajor.dev/docs/Examples/GuitarLSTM

This section details the components available within the `std.audio` module of the Cmajor Standard Library, primarily focusing on audio processing utilities like convolution.

```APIDOC
std.audio
  - audio
      * Convolve
```

--------------------------------

### Cmajor Standard Library: std.filters Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.filters` module, which offers various filter types and their associated processors and modes for audio signal processing.

```APIDOC
filters:
  tpt:
    onepole:
      - Processor
      - Mode
    svf:
      - Processor
      - MultimodeProcessor
      - Mode
  dcblocker:
    - Processor
  butterworth:
    - Processor
    - Mode
  crossover:
    - Processor
  simper:
    - Processor
    - Mode
```

--------------------------------

### PatchConnection Object API for Cmajor Workers

Source: https://cmajor.dev/docs/PatchFormat

Documentation for the `PatchConnection` object available to Cmajor patch workers and GUI code. It details methods for status updates, sending events, and asynchronously reading resources from the patch bundle.

```APIDOC
PatchConnection:
  addStatusListener(callback: (status: any) => void):
    callback: A function to be called when the patch status changes.
  requestStatusUpdate():
    Purpose: Requests an immediate status update from the patch.
  sendEventOrValue(eventName: string, value: any):
    eventName: The name of the event to send.
    value: The value associated with the event.
  async readResource(path: string): Thenable<any>:
    path: Path relative to the root of the patch bundle.
    Returns: A Thenable object that will deliver the resource data asynchronously.
  async readResourceAsAudioData(path: string): Thenable<AudioData>:
    path: Path relative to the root of the patch bundle.
    Returns: A Thenable object that will deliver the audio data asynchronously.
```

--------------------------------

### Cmajor Standard Library: std.notes Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.notes` module in the Cmajor Standard Library, which likely handles musical note-related functionalities.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor Standard Library: std.frequency Module

Source: https://cmajor.dev/docs/Examples/RingMod

Covers the `std.frequency` module, which likely contains utilities or components related to frequency analysis or manipulation within the Cmajor environment.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### std.notes Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.notes` module, which likely deals with musical note representations or processing.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Configure External Raw Audio Data in Cmajor Patch Manifest (JSON)

Source: https://cmajor.dev/docs/PatchFormat

This JSON configuration for a `.cmajorpatch` file demonstrates how to load a single audio file directly into an `external` raw float array declared in Cmajor. The string value 'piano_36.ogg' is coerced into the `MyProcessor::audioData` array.

```JSON
    "externals": {
        "MyProcessor::audioData" : "piano_36.ogg",
    }

```

--------------------------------

### Cmajor Standard Library: std.levels Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.levels` module in the Cmajor Standard Library, including components for smoothing values (`SmoothedValueStream`), various gain controls (`ConstantGain`, `DynamicGain`, `SmoothedGain`, `SmoothedGainParameter`), and `pan_law`.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Cmajor Standard Library - Random Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.random` module, providing components for generating random numbers or sequences.

```APIDOC
std.random:
  random
```

--------------------------------

### Cmaj Processor and Graph Alias Declaration

Source: https://cmajor.dev/docs/LanguageReference

Explains how to create short aliases for existing Cmaj processors or graphs, allowing for more concise referencing, potentially with parameterized instantiations.

```Cmaj
processor MyAlias1 = some_namespace::MyProcessor(1234),
          MyAlias2 = some_namespace::MyGraph(float64, bool);
```

--------------------------------

### Cmajor Standard Library - Voices Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.voices` module, which likely contains components for voice management or polyphony in audio applications.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmajor std::notes Namespace and Event Structures

Source: https://cmajor.dev/docs/StandardLibrary

This namespace defines strongly typed, floating-point data structures for musical note events (start/stop/control). These objects include a channel ID field, allowing multi-channel input devices to specify which events apply to active notes, offering a robust alternative to raw MIDI.

```APIDOC
namespace std::notes
  Description:
    These structs are used for events that model the start/stop/control of notes that are playing in synthesisers.
    Unlike sending raw MIDI around, these are strongly typed and use floating point data so are far nicer to work with.
    The objects include a channel ID field, so that a multi-channel input device can indicate which events should be applied to each of the active notes that are being played.
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module Components

Source: https://cmajor.dev/docs/Examples/GuitarLSTM

This section outlines the envelope generators provided by the `std.envelopes` module in the Cmajor Standard Library, including fixed attack-sustain-release envelopes.

```APIDOC
std.envelopes
    - envelopes
      * FixedASR
```

--------------------------------

### APIDOC: Cmajor std::levels Namespace

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::levels` namespace, offering functions for decibel-to-gain conversion and processor graphs for applying constant, dynamic, and smoothed gain to audio streams. It supports various `FrameType`s for different data types.

```APIDOC
namespace std::levels

  Functions:
    T dBtoGain<T> (T decibels)
      Converts a relative gain in decibels to a gain.
    T gainTodB<T> (T gainFactor)
      Converts a gain to a relative number of decibels.

  graph std::levels::ConstantGain (using FrameType, float32 gain)
    This helper processor simply passes its input through to its output with a constant gain applied.
    The FrameType parameter could be a float, or a vector of floats.

    Endpoints:
      output stream out (FrameType)
      input stream in (FrameType)

    Connections:
      connection in * gain -> out

  graph std::levels::DynamicGain (using FrameType)
    This helper processor takes two input streams - one for data and the other for a gain level, and emits the input signal with the gain applied.
    The FrameType parameter could be a float, or a vector of floats.

    Endpoints:
      output stream out (FrameType)
      input stream gain (float32)
      input stream in (FrameType)

    Connections:
      connection in * gain -> out

  graph std::levels::SmoothedGain (using FrameType, float32 smoothingTimeSeconds = 0.2f)
    Takes an input stream of the given FrameType, and passes it through using a SmoothedGainParameter processor to apply a smoothed gain to it.
    The gain level is exposed via the 'volume' input.

    Endpoints:
      output stream out (FrameType)
      input stream volume gainParameter.volume
      input stream in (FrameType)
```

--------------------------------

### Cmajor Standard Library: std.notes Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.notes module in the Cmajor Standard Library, likely providing utilities related to musical notes or pitch.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor std::timeline Namespace API

Source: https://cmajor.dev/docs/StandardLibrary

Defines types and functions for managing musical timelines, including tempo, time signatures, transport states, and position tracking. This namespace is crucial for applications requiring precise control over DAW-style timing.

```APIDOC
namespace std::timeline

Structs:
  struct Tempo:
    float32 bpm (BPM = beats per minute)

  struct TimeSignature:
    int32 numerator
    int32 denominator

  struct TransportState:
    int32 flags (bit-field: bit 0 = playing, bit 1 = recording, bit 2 = looping)

  struct Position:
    int64 frameIndex (The frame index, from the start of the host's timeline.)
    float64 quarterNote (A floating-point count of quarter-notes from the start of the host's timeline.)
    float64 barStartQuarterNote (Position of the start of the current bar, measured as quarter-notes from timeline start.)

Functions:
  secondsPerBeat(this: const Tempo&): float32
  framesPerBeat(this: const Tempo&, framesPerSecond: float64): float64
  secondsPerQuarterNote(this: const Tempo&, timeSig: TimeSignature): float32
  framesPerQuarterNote(this: const Tempo&, timeSig: TimeSignature, framesPerSecond: float64): float64
  beatsPerQuarterNote(this: const TimeSignature&): float32
  quarterNotesPerBeat(this: const TimeSignature&): float32
  isStopped(this: const TransportState&): bool
  isPlaying(this: const TransportState&): bool
  isRecording(this: const TransportState&): bool
  isLooping(this: const TransportState&): bool
```

--------------------------------

### Cmajor Function: Calculate Playback Speed Ratio

Source: https://cmajor.dev/docs/StandardLibrary

Provides functions to calculate the necessary playback speed ratio to re-pitch audio. Overloads handle calculations based on source and target MIDI notes, or by including source/target sample rates for more complex scenarios.

```APIDOC
getSpeedRatioBetween (float32 sourceMIDINote, float32 targetMIDINote) -> float32 (Calculates the speed ratio by which playback must be changed to re-pitch a given source note to a target note.)
```

```APIDOC
getSpeedRatioBetween (float64 sourceSampleRate, float32 sourceMIDINote, float64 targetSampleRate, float32 targetMIDINote) -> float64 (Given a source with a known sample rate and pitch, this calculates the ratio at which it would need to be sped-up in order to achieve a target pitch and sample-rate.)
```

--------------------------------

### Cmaj Command Line Test Options

Source: https://cmajor.dev/docs/TestFileFormat

Lists various command-line switches available for customizing Cmajor test execution. Options include controlling threading, running disabled tests, specifying a single test number, generating JUNIT compatible XML output, and setting the number of test iterations.

```Bash
--singleThread      Use a single thread to run the tests
--threads=n         Run with the given number of threads, defaults to the available cores
--runDisabled       Run all tests including any marked disabled
--testToRun=n       Only run the specified test number in the test files
--xmlOutput=file    Generate a JUNIT compatible xml file containing the test results
--iterations=n      How many times to repeat the tests
```

--------------------------------

### Cmajor std.notes Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.notes` module of the Cmajor Standard Library, related to musical note processing.

```APIDOC
std.notes:
  notes
```

--------------------------------

### Cmajor std.intrinsics Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.intrinsics` module of the Cmajor Standard Library, providing access to fundamental intrinsic operations.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### std.levels Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.levels` module, providing functionalities for gain control, smoothing, and pan law applications, including various types of gain processors and value stream smoothers.

```APIDOC
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.intrinsics` module in the Cmajor Standard Library, providing access to intrinsic functions.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module

Source: https://cmajor.dev/docs/Examples/RingMod

Outlines the `std.oscillators` module, providing various oscillator types for sound generation, such as Phasor, Sine, PolyblepOscillator, LFO, and waveshape functions.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library: Mixers Module

Source: https://cmajor.dev/docs/Tools

Contains various mixer components for audio channel manipulation and summing, such as stereo/mono converters and dynamic/constant sum mixers.

```APIDOC
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
```

--------------------------------

### Cmaj Processor Specialization: Defining Parameterized Processors

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the definition of a Cmaj processor that accepts parameters, enabling the creation of specialized instances. Parameters can include types (using `using`) and constant values, which are then utilized within the processor's logic.

```Cmaj
// When anything tries to create an instant of this processor, the type MySampleType
// and the integer myConstant must be provided.
processor MyProcessor (using MySampleType, int myConstant)
{
    output stream MySampleType out;

    void main()
    {
        MySampleType x[myConstant];

        out <- MySampleType (myConstant + 10);
        advance();
    }
}

graph G
{
    // when instantiating a processor that takes parameters, you put the values
    // in parentheses after the name. In this example, the compiler will create
    // two different versions of MyProcessor with these two sets of parameters.
    node p1 = MyProcessor (float, 100),
         p2 = MyProcessor (float64<2>, 200);
}

```

--------------------------------

### Cmajor Standard Library: Oscillator Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.oscillators` module, providing various oscillator types for sound synthesis, including phasors, sine waves, polyblep oscillators, LFOs, and waveshaping utilities.

```APIDOC
std.oscillators:
  oscillators:
    - Phasor
    - Sine
    - PolyblepOscillator
    - LFO
    - waveshape
```

--------------------------------

### Cmajor Patch Connection Listener Methods

Source: https://cmajor.dev/docs/PatchFormat

Methods for attaching and removing listeners for endpoint events, audio data, and parameter changes within a Cmajor patch. Includes details on callback arguments and data formats for various listener types.

```APIDOC
addEndpointListener (endpointID, listener, granularity)
  Attaches a listener function that will receive updates with the events or audio data that is being sent or received by an endpoint.
  If the endpoint is an event or value, the callback will be given an argument which is the new value.
  If the endpoint has the right shape to be treated as “audio” then the callback will receive a stream of updates of the min/max range of chunks of data that is flowing through it. There will be one callback per chunk of data, and the size of chunks is specified by the optional granularity parameter.
  If sendFullAudioData is false, the listener will receive an argument object containing two properties ‘min’ and ‘max’, which are each an array of values, one element per audio channel. This allows you to find the highest and lowest samples in that chunk for each channel.
  If sendFullAudioData is true, the listener’s argument will have a property ‘data’ which is an array containing one array per channel of raw audio samples data.

removeEndpointListener (endpointID, listener)
  Removes a listener that was previously added with addEndpointListener()

requestParameterValue (endpointID)
  This will trigger an asynchronous callback to any parameter listeners that are
  attached, providing them with its up-to-date current value for the given endpoint.
  Use addAllParameterListener() to attach a listener to receive the result.

addParameterListener (endpointID, listener)
  Attaches a listener function which will be called whenever the value of a specific parameter changes.
  The listener function will be called with an argument which is the new value.

removeParameterListener (endpointID, listener)
  Removes a listener that was previously added with addParameterListener()

addAllParameterListener (listener)
  Attaches a listener function which will be called whenever the value of any parameter changes in the patch.
  The listener function will be called with an argument object with the fields endpointID and value.

removeAllParameterListener (listener)
  Removes a listener that was previously added with addAllParameterListener()
```

--------------------------------

### Cmajor Standard Library: std.envelopes Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.envelopes` module in the Cmajor Standard Library, covering envelope processing components like `Convolve` and `FixedASR`.

```APIDOC
std.envelopes:
  Convolve
  envelopes:
    FixedASR
```

--------------------------------

### Cmajor Standard Library: std.noise Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.noise` module in the Cmajor Standard Library, providing generators for different types of noise signals, including `White`, `Brown`, and `Pink` noise.

```APIDOC
std.noise
  noise
    White
    Brown
    Pink
```

--------------------------------

### std.oscillators Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.oscillators` module, offering various types of oscillators for sound synthesis, including Phasor, Sine, Polyblep, and LFO (Low-Frequency Oscillator), along with waveshaping utilities.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library: std.frequency Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.frequency` module in the Cmajor Standard Library, which likely contains frequency-related utilities.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### C Major TPT State Variable Filter (SVF) API (`std::filters::tpt::svf`)

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the state variable filter (SVF) implementation in C Major, designed for modulation. It covers struct definitions, functions for filter creation and manipulation, processor details, and endpoints for control and data flow, including a multimode variant.

```APIDOC
namespace std::filters::tpt::svf

Structs:
  struct Implementation:
    CoefficientType d
    CoefficientType a
    CoefficientType g1
    FrameType[2] z
    int32 mode

Functions:
  create(int32 mode, float64 processorFrequency, float64 filterFrequency, float64 Q) -> Implementation
  setFrequency(Implementation& this, float64 processorFrequency, float64 filterFrequency, float64 Q) -> void
  reset(Implementation& this) -> void
  setMode(Implementation& this, int32 mode) -> void
  processMultimode(Implementation& this, FrameType x) -> FrameType[3]
  process(Implementation& this, FrameType x) -> FrameType

Processor:
  processor std::filters::tpt::svf::Processor(int32 initialMode = Mode::lowPass, float32 initialFrequency = defaultFrequency, float32 initialQ = defaultQ)

Endpoints:
  output stream out (FrameType)
  input stream in (FrameType)
  input event mode (int32)
  input event frequency (float32)
  input event q (float32)

Variables (Processor):
  filter
  bool updateFilter = false
  float32 filterFrequency
  int32 filterMode
  float32 filterQ

Functions (Processor Events):
  event mode (int32 m)
  event frequency (float32 f)
  event q (float32 q)
  void main()
  void reset()

Multimode Processor:
  processor std::filters::tpt::svf::MultimodeProcessor(float32 initialFrequency = defaultFrequency, float32 initialQ = defaultQ)

Multimode Processor Endpoints:
  output stream lowOut (FrameType)
  output stream highOut (FrameType)
  output stream bandOut (FrameType)
  input stream in (FrameType)
  input event frequency (float32)
  input event q (float32)

Multimode Processor Variables:
  filter
  bool updateFilter = true
  float32 filterFrequency
  float32 filterQ
```

--------------------------------

### Cmajor `std::frequency` Module API (FFT)

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::frequency` module in Cmajor, providing functions for Discrete Fourier Transform (DFT) implementations for complex and real numbers. It supports float32 or float64 (or complex32/complex64) buffers with power-of-2 sizes.

```APIDOC
namespace std::frequency:
  Description: Contains DFT implementations for complex and real numbers. The buffers can be either float32 or float64 (or complex32/complex64). Buffer sizes must be a power of 2.

  Functions:
    realOnlyForwardFFT<FloatArray>(inputData: const FloatArray&, outputData: FloatArray) -> void
      Description: Performs a forward DFT. The parameters must be power-of-2 sized arrays of floats. The input parameter takes the real components, and the output array receives the real and imaginary components.

    realOnlyInverseFFT<FloatArray>(inputData: const FloatArray&, outputData: FloatArray) -> void
      Description: Performs an inverse FFT. The parameters must be power-of-2 sized arrays of floats. The input parameter takes the real and imaginary components, and the output array receives the real components.

    complexFFT<ComplexArray>(data: ComplexArray&) -> void
      Description: Performs an in-place forward FFT on complex data.

    complexIFFT<ComplexArray>(data: ComplexArray&) -> void
      Description: Performs an in-place inverse FFT on complex data.
```

--------------------------------

### Cmajor Standard Library: std.voices Module

Source: https://cmajor.dev/docs/Examples/RingMod

Describes the `std.voices` module, which likely contains components for managing polyphonic voices or voice allocation in Cmajor audio applications.

```APIDOC
std.voices:
  voices
```

--------------------------------

### Cmajor Standard Library: std.filters Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.filters module in the Cmajor Standard Library, providing various filter types and processing components.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Declare Cmajor Arrays and Slices

Source: https://cmajor.dev/docs/LanguageReference

This snippet illustrates the basic syntax for declaring fixed-size arrays and dynamic slices in Cmajor. It also demonstrates how slices can be used as parameters in function definitions, highlighting their flexibility compared to fixed-size arrays.

```Cmajor
int[] x;   // a slice
int[3] y;  // an array

// Functions can take slices as parameters
void myFunction (int[] x) { ...
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.oscillators module in the Cmajor Standard Library, containing various oscillator types for sound synthesis.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library: std.frequency Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.frequency module in the Cmajor Standard Library, likely containing components related to frequency analysis or manipulation.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### Cmajor Standard Library: std.filters Module

Source: https://cmajor.dev/docs/Examples/Replicant

Overview of the 'std.filters' module, containing various filter types and processors like TPT, SVF, DC Blocker, Butterworth, Crossover, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        - Processor
        - Mode
      svf:
        - Processor
        - MultimodeProcessor
        - Mode
    dcblocker:
      - Processor
    butterworth:
      - Processor
      - Mode
    crossover:
      - Processor
    simper:
      - Processor
      - Mode
```

--------------------------------

### Cmajor std::mixers::StereoToMono Processor

Source: https://cmajor.dev/docs/StandardLibrary

Simple utility processor that takes a 2-element vector input (stereo) and outputs the sum of its elements (mono). It uses a generic SampleType for flexibility.

```APIDOC
processor std::mixers::StereoToMono (using SampleType)
  Endpoints:
    output stream out (SampleType)
    input stream in (SampleType<2>)
  Functions:
    void main()
```

--------------------------------

### Cmajor std.frequency Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.frequency` module of the Cmajor Standard Library, related to frequency analysis and manipulation.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### Cmajor Patch Manifest Source Property with Multiple Files (JSON)

Source: https://cmajor.dev/docs/PatchFormat

This JSON snippet illustrates how the 'source' property in a `.cmajorpatch` manifest can specify multiple Cmajor source files as an array of strings. This allows for modular code organization, where all listed files are loaded and linked together as a single unit by the host.

```JSON
"source":   [ "src/MainProcessor.cmajor",
                  "src/Utilities.cmajor" ]
```

--------------------------------

### Cmajor Array Element Access and Bounds Checking

Source: https://cmajor.dev/docs/LanguageReference

Shows how to access array elements using the `[]` operator and the `.at()` method. It demonstrates the compiler's behavior with out-of-bounds constant indices, the use of `wrap<N>` types for efficient bounds checking, and how to suppress performance warnings for runtime-checked indices.

```Cmajor
int[8] x;

let sizeOfX = x.size;      // This is 8

let a1 = x[3];             // OK
let a2 = x[-1];            // OK: this returns the last element of the array
let a3 = x[10];            // Error: the compiler sees that this constant integer is out of bounds.

wrap<8> wrappedInt = ...   // 'wrappedInt' is a wrap<8> so has the range 0 to 7
int normalInt = ...        // 'normalInt' is a normal integer so could have any value

let a4 = x[wrappedInt];    // This produces efficient code because the compiler knows that the wrap<8>
                           // value can never exceed the bounds of an array with size 8.
let a5 = x[normalInt];     // This compiles, but will emit a performance warning because the compiler
                           // needs to insert a wrap operation to make sure the integer index is in-range.
let a6 = x.at(normalInt);  // Using .at() instead of [] tells the compiler not to emit a performance warning
let a7 = x[wrap<8> (normalInt)];  // Casting the integer to a wrap<8> also removes the performance warning
```

--------------------------------

### Cmajor Standard Library: std.random Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.random module in the Cmajor Standard Library, providing components for random number generation.

```APIDOC
std.random:
  random
```

--------------------------------

### Cmajor Standard Library: Random Number Generation Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.random` module, which provides functionalities for generating random numbers.

```APIDOC
std.random:
  - random
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module API

Source: https://cmajor.dev/docs/TestFileFormat

API documentation for the `std.oscillators` module, which provides various oscillator types for signal generation, including `Phasor`, `Sine`, and `PolyblepOscillator`.

```APIDOC
oscillators:
  - Phasor
  - Sine
  - PolyblepOscillator
  - LFO
  - waveshape
```

--------------------------------

### Cmajor Endpoint Types Overview

Source: https://cmajor.dev/docs/LanguageReference

Detailed documentation for the three primary Cmajor endpoint types: `stream`, `value`, and `event`. This section covers their fundamental characteristics, typical use cases, performance implications, and specific features like automatic ramping for value endpoints and handler requirements for event endpoints.

```APIDOC
Endpoint Types:
  stream:
    Description: Transmits a continuous sequence of sample-accurate values, providing one value per frame.
    Type Constraint: Must be scalar (float, integer, or vector of floats/ints) for summation.
    Cost: Expensive due to continuous storage and updates.
    Use Case: Ideal for continuously changing signals like audio data.
    Limitation: Bad choice for values that rarely change.
  value:
    Description: Holds any type of data, allows fixed values to be sent or received in a non-sample-accurate way.
    Overhead: Effectively zero when the value is not updated.
    Use Case: Best for values that don’t often change, where timing inaccuracy is acceptable (e.g., master volume level).
    Feature: Automatic ramp application for scalar values via Cmaj API (specifies target and frames for smooth interpolation).
  event:
    Description: Triggers handler functions when an input event is declared.
    Handler Declaration: Special functions prefixed with the `event` keyword; name and type must match the endpoint.
    Multi-type Events: If an event has multiple types, a handler should be declared for each type.
    Void Datatype: Supported for events without data; handler does not take a datatype.
    Graph Event Handlers: More limited than processor event handlers (due to no state), but can filter or scale values.
```

--------------------------------

### Free Voice State (free)

Source: https://cmajor.dev/docs/StandardLibrary

The `free` function releases resources associated with a voice state, marking it as available for reuse.

```APIDOC
free(this: VoiceState&) -> void
  this: Reference to the VoiceState object to be freed.
```

--------------------------------

### Cmajor Standard Library: Oscillators Module

Source: https://cmajor.dev/docs/Tools

Offers various oscillator types for generating audio waveforms, such as Phasor, Sine, Polyblep, and LFO.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Load and Compile Cmajor Patch File

Source: https://cmajor.dev/docs/TestFileFormat

This directive attempts to load and compile a Cmajor patch from the specified filename. Any compilation errors encountered during this process will be registered as a test failure.

```Cmajor
## testPatch ("../../../my_patches/example_patch.cmajor_patch")
```

--------------------------------

### Cmaj Namespace Contents and Qualified Path Referencing

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the various types of declarations permissible within Cmaj namespaces, including nested namespaces, processors, functions, global constants, structs, and `using` type aliases. It also shows how to refer to elements using their full qualified path.

```Cmaj
namespace animals
{
    namespace dogs
    {
        processor Woof
        {
            ...
        }

        string getName()    { return "dog"; }
    }

    namespace cats
    {
        processor Miaow
        {
            ...
        }

        string getName()    { return "cat"; }

        struct Cat
        {
            string name, breed;
            float scratchiness;
        }

        using CatType = Cat;
    }
}

animals::dogs::Woof  // The double-colon separator is used when referring to a namespace path
animals::dogs::getName()  // returns "dog"
animals::cats::getName()  // returns "cat"
```

--------------------------------

### cmaj::PatchManifest Class

Source: https://cmajor.dev/docs/Tools/C++API

Parses and interrogates `.cmajorpatch` JSON files. It also provides functors for finding and reading file content, enabling custom patches to load resources from virtual files.

```APIDOC
cmaj::PatchManifest:
  Description: Class for parsing and interrogating .cmajorpatch JSON files.
  Features:
    - Provides functors for finding and reading file content.
    - Supports custom patches loading resources from virtual files instead of the normal filesystem.
```

--------------------------------

### Cmajor Supported ONNX Operators

Source: https://cmajor.dev/docs/Tools/MachineLearning

This section lists the ONNX operators that are currently supported by Cmajor for model conversion and execution. This subset includes commonly used operations, and the list is expected to expand over time to cover more ONNX functionalities.

```APIDOC
Supported ONNX Operators:
- Tanh
- Reshape
- MatMul
- Gemm
- Add
- Unsqueeze
- Squeeze
- Conv
- GRU
- Pad
- Transpose
- Constant
- LSTM
- Slice
- Gather
- Concat
```

--------------------------------

### Cmajor std.filters Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.filters` module of the Cmajor Standard Library, covering various filter types and their processors.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### std.noise Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.noise` module, providing generators for various types of noise, including White, Brown (Brownian), and Pink noise.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### Cmajor Conditional Connections in Graph Blocks

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to use an `if` statement within a Cmajor graph's connection block to create optionally included connections. This allows for dynamic routing or inclusion of processors based on compile-time constant conditions, typically passed as parameterized values to the graph.

```Cmajor
graph Processor (bool distortionBeforeCompressor)
{
    input stream float in;
    output stream float out;

    node compressor = Compressor;
    node distortion = Distortion;

    connection
    {
        if (distortionBeforeCompressor)
        {
            in -> distortion -> compressor -> out;
        }
        else
        {
            in -> compressor -> distortion -> out;
        }
    }
}
```

--------------------------------

### Cmajor Standard Library - Noise Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.noise` module, providing various types of noise generators, including White, Brown, and Pink noise.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### std.random Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.random` module, providing functionalities for generating random numbers or sequences.

```APIDOC
std.random:
  random
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module

Source: https://cmajor.dev/docs/Examples/RingMod

Documents the `std.intrinsics` module, providing access to fundamental or built-in operations and types within the Cmajor language.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmajor std.noise Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.noise` module of the Cmajor Standard Library, providing different types of noise generators.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### Implement Web Component for Cmajor Patch GUI (JavaScript)

Source: https://cmajor.dev/docs/PatchFormat

This JavaScript code provides a basic structure for a web component to serve as a custom GUI for a Cmajor patch. It defines a `createPatchView` function as the default export, which instantiates and returns an `HTMLElement`, receiving a `PatchConnection` object for runtime communication.

```JavaScript
class MyAmazingPatchView extends HTMLElement
{
    // ...etc..
}

export default function createPatchView (patchConnection)
{
    return new MyAmazingPatchView (patchConnection);
}

```

--------------------------------

### std.filters Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.filters` module, offering a variety of digital filter implementations including state-variable filters (SVF), one-pole filters, DC blockers, Butterworth filters, crossovers, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Cmaj File System Access Class (JavaScript API)

Source: https://cmajor.dev/docs/ScriptFileFormat

A helper class providing access to the file system within Cmaj scripts. It allows creating file objects from paths, checking existence, reading/writing content, and scanning directories.

```APIDOC
class File
{
    constructor (path)          // Creates a file from a path string
    path                        // A property containing the file path as a string

    exists()                    // True if the file exists
    isFolder()                  // True if the file is a folder
    getModificationTime()       // Get the last modification time of the file
    parent()                    // Returns a new File object representing the parent folder
    getChild (relativePath)     // Returns a new File object by appenting this relative path
    getSibling (relativePath)   // Returns a new File object for a sibling file with the given path

    // Reads the content of the file and returns it as a string (if it's valid UTF8) or
    // an array of bytes if not. Returns an error object on failure.
    read()

    // reads an audio file and returns it as an object containing
    // fields for rate, length, and channel data as arrays of floats
    readAudioData (annotations)

    // attempts to overwrite this file with the given string or array of bytes,
    // returning an error on failure
    overwrite (newContent)

    // Scans this folder for children and returns the list as an array of File objects.
    // If shouldFindFolders is true, it only looks for folders, if false, only looks
    // for files. If recursive is true, it's recursive. The wildcard parameter is an
    // optional simple wildcard expression to use.
    findChildren (shouldFindFolders, recursive, wildcard)
}
```

--------------------------------

### Cmajor Standard Library: std.matrix Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.matrix` module in the Cmajor Standard Library, which likely provides matrix manipulation functionalities.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Standard Library Modules and Components

Source: https://cmajor.dev/about-us

This snippet provides a detailed, hierarchical listing of all modules, sub-modules, classes, and specific components available within the Cmajor Standard Library. It serves as a structural API reference, showing the organization of the library's functionalities.

```APIDOC
      * [Convolve](https://cmajor.dev/docs/StandardLibrary#Convolve)
  + [std.envelopes](https://cmajor.dev/docs/StandardLibrary#std_envelopes)
    - [envelopes](https://cmajor.dev/docs/StandardLibrary#envelopes)
      * [FixedASR](https://cmajor.dev/docs/StandardLibrary#FixedASR)
  + [std.filters](https://cmajor.dev/docs/StandardLibrary#std_filters)
    - [filters](https://cmajor.dev/docs/StandardLibrary#filters)
      * [tpt](https://cmajor.dev/docs/StandardLibrary#tpt)
        + [onepole](https://cmajor.dev/docs/StandardLibrary#onepole)
          - [Processor](https://cmajor.dev/docs/StandardLibrary#Processor)
          - [Mode](https://cmajor.dev/docs/StandardLibrary#Mode)
        + [svf](https://cmajor.dev/docs/StandardLibrary#svf)
          - [Processor](https://cmajor.dev/docs/StandardLibrary#Processor2)
          - [MultimodeProcessor](https://cmajor.dev/docs/StandardLibrary#MultimodeProcessor)
          - [Mode](https://cmajor.dev/docs/StandardLibrary#Mode2)
      * [dcblocker](https://cmajor.dev/docs/StandardLibrary#dcblocker)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor3)
      * [butterworth](https://cmajor.dev/docs/StandardLibrary#butterworth)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor4)
        + [Mode](https://cmajor.dev/docs/StandardLibrary#Mode3)
      * [crossover](https://cmajor.dev/docs/StandardLibrary#crossover)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor5)
      * [simper](https://cmajor.dev/docs/StandardLibrary#simper)
        + [Processor](https://cmajor.dev/docs/StandardLibrary#Processor6)
        + [Mode](https://cmajor.dev/docs/StandardLibrary#Mode4)
  + [std.frequency](https://cmajor.dev/docs/StandardLibrary#std_frequency)
    - [frequency](https://cmajor.dev/docs/StandardLibrary#frequency7)
  + [std.intrinsics](https://cmajor.dev/docs/StandardLibrary#std_intrinsics)
    - [intrinsics](https://cmajor.dev/docs/StandardLibrary#intrinsics)
  + [std.levels](https://cmajor.dev/docs/StandardLibrary#std_levels)
    - [smoothing](https://cmajor.dev/docs/StandardLibrary#smoothing)
      * [SmoothedValueStream](https://cmajor.dev/docs/StandardLibrary#SmoothedValueStream)
    - [levels](https://cmajor.dev/docs/StandardLibrary#levels)
      * [ConstantGain](https://cmajor.dev/docs/StandardLibrary#ConstantGain)
      * [DynamicGain](https://cmajor.dev/docs/StandardLibrary#DynamicGain)
      * [SmoothedGain](https://cmajor.dev/docs/StandardLibrary#SmoothedGain)
      * [SmoothedGainParameter](https://cmajor.dev/docs/StandardLibrary#SmoothedGainParameter)
    - [pan_law](https://cmajor.dev/docs/StandardLibrary#pan_law)
  + [std.matrix](https://cmajor.dev/docs/StandardLibrary#std_matrix)
    - [matrix](https://cmajor.dev/docs/StandardLibrary#matrix)
  + [std.midi](https://cmajor.dev/docs/StandardLibrary#std_midi)
    - [midi](https://cmajor.dev/docs/StandardLibrary#midi)
      * [MPEConverter](https://cmajor.dev/docs/StandardLibrary#MPEConverter)
      * [NoteToMIDI](https://cmajor.dev/docs/StandardLibrary#NoteToMIDI)
  + [std.mixers](https://cmajor.dev/docs/StandardLibrary#std_mixers)
    - [mixers](https://cmajor.dev/docs/StandardLibrary#mixers)
      * [StereoToMono](https://cmajor.dev/docs/StandardLibrary#StereoToMono)
      * [MonoToStereo](https://cmajor.dev/docs/StandardLibrary#MonoToStereo)
      * [DynamicSum](https://cmajor.dev/docs/StandardLibrary#DynamicSum)
      * [ConstantSum](https://cmajor.dev/docs/StandardLibrary#ConstantSum)
      * [Interpolator](https://cmajor.dev/docs/StandardLibrary#Interpolator)
  + [std.noise](https://cmajor.dev/docs/StandardLibrary#std_noise)
    - [noise](https://cmajor.dev/docs/StandardLibrary#noise)
      * [White](https://cmajor.dev/docs/StandardLibrary#White)
      * [Brown](https://cmajor.dev/docs/StandardLibrary#Brown)
      * [Pink](https://cmajor.dev/docs/StandardLibrary#Pink)
  + [std.notes](https://cmajor.dev/docs/StandardLibrary#std_notes)
    - [notes](https://cmajor.dev/docs/StandardLibrary#notes)
  + [std.oscillators](https://cmajor.dev/docs/StandardLibrary#std_oscillators)
    - [oscillators](https://cmajor.dev/docs/StandardLibrary#oscillators)
      * [Phasor](https://cmajor.dev/docs/StandardLibrary#Phasor)
      * [Sine](https://cmajor.dev/docs/StandardLibrary#Sine)
      * [PolyblepOscillator](https://cmajor.dev/docs/StandardLibrary#PolyblepOscillator)
      * [LFO](https://cmajor.dev/docs/StandardLibrary#LFO)
      * [waveshape](https://cmajor.dev/docs/StandardLibrary#waveshape)
  + [std.random](https://cmajor.dev/docs/StandardLibrary#std_random)
    - [random](https://cmajor.dev/docs/StandardLibrary#random)
  + [std.timeline](https://cmajor.dev/docs/StandardLibrary#std_timeline)
    - [timeline](https://cmajor.dev/docs/StandardLibrary#timeline)
  + [std.voices](https://cmajor.dev/docs/StandardLibrary#std_voices)
    - [voices](https://cmajor.dev/docs/StandardLibrary#voices)
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.intrinsics` module in the Cmajor Standard Library, which typically provides access to fundamental or built-in operations and types.

```APIDOC
std.intrinsics
  intrinsics
```

--------------------------------

### Cmajor Standard Library: std.audio Module

Source: https://cmajor.dev/docs/Examples/RingMod

Details the components available within the `std.audio` module of the Cmajor Standard Library, primarily focusing on audio processing functions like convolution.

```APIDOC
std.audio:
  Convolve
```

--------------------------------

### cmaj::EndpointDetails and EndpointDetailsList Classes API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

These classes are crucial for enumerating and interacting with a performer's input and output endpoints. `EndpointDetails` provides comprehensive information about an endpoint, including its type, name, and annotations, along with heuristic methods for classification.

```APIDOC
cmaj::EndpointDetails, cmaj::EndpointDetailsList:
  Purpose: Enumerate and communicate with performer's input/output endpoints.
  cmaj::EndpointDetails:
    - Provides name and type information for an endpoint.
    - Includes annotations.
    - Has heuristic methods to determine if it's a parameter, audio, or MIDI input, etc.
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.oscillators` module in the Cmajor Standard Library, offering various oscillator types for signal generation. This includes `Phasor`, `Sine`, `PolyblepOscillator`, `LFO`, and `waveshape` components.

```APIDOC
std.oscillators
  oscillators
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library - Intrinsics Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.intrinsics` module, providing access to fundamental, built-in operations or types.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmajor Standard Library: Frequency Module

Source: https://cmajor.dev/docs/Tools

Provides components related to frequency analysis and manipulation within audio processing.

```APIDOC
std.frequency:
  frequency
```

--------------------------------

### Cmajor Standard Library: std.random Module

Source: https://cmajor.dev/docs/Examples/RingMod

Covers the `std.random` module, which likely provides functionalities for generating random numbers or sequences within the Cmajor Standard Library.

```APIDOC
std.random:
  random
```

--------------------------------

### Cmaj Shorthand for Combined Nested Namespace Declaration

Source: https://cmajor.dev/docs/LanguageReference

Presents a concise syntax in Cmaj for declaring deeply nested namespaces in a single statement, offering an alternative to multiple nested `namespace` blocks.

```Cmaj
namespace A
{
    namespace B
    {
        namespace C
        {
            void myFunction() {}
        }
    }
}

// The above declaration can be written like this:

namespace A::B::C
{
    void myFunction() {}
}
```

--------------------------------

### Cmajor Standard Library: Filter Module

Source: https://cmajor.dev/docs/Examples/ElectricPiano

Documents the `std.filters` module, which contains various digital filter implementations including state-variable filters (SVF), one-pole filters, DC blockers, Butterworth filters, crossovers, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        - Processor
        - Mode
      svf:
        - Processor
        - MultimodeProcessor
        - Mode
    dcblocker:
      - Processor
    butterworth:
      - Processor
      - Mode
    crossover:
      - Processor
    simper:
      - Processor
      - Mode
```

--------------------------------

### Write to Cmajor Graph Output Endpoints

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to write values to different types of output endpoints (event, value, stream) using the left-arrow operator (`<-`) within a `main` loop. It also shows how multiple writes can be chained into a single statement for sequences of events.

```Cmajor
void main()
{
    loop
    {
        if (isTimeToSendEvent())
            myEventOut <- 1.0f <- 2.0f;

        myOutputStream <- 1.0f;
        advance();
    }
}
```

--------------------------------

### Cmajor std.random Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.random` module of the Cmajor Standard Library, related to random number generation.

```APIDOC
std.random:
  random
```

--------------------------------

### Configure Custom GUI View in Cmajor Patch Manifest (JSON)

Source: https://cmajor.dev/docs/PatchFormat

This JSON snippet illustrates how to add a `view` property to a `.cmajorpatch` file to enable a custom GUI. It specifies the `src` (JavaScript module path), `width`, `height`, and `resizable` properties for the patch's user interface.

```JSON
{
    "CmajorVersion":    1,
    "ID":               "dev.cmajor.examples.helloworld",
    "version":          "1.0",
    "name":             "Hello World",
    "source":           "HelloWorld.cmajor",

    "view": {
      "src":       "patch_gui/index.js",
      "width":     800,
      "height":    700,
      "resizable": false
    }
}

```

--------------------------------

### Cmajor Standard Library Module Hierarchy

Source: https://cmajor.dev/docs/Licence

A hierarchical listing of the modules and components available in the Cmajor Standard Library. This structure outlines the organization of audio processing, envelopes, filters, levels, MIDI, mixers, noise, and oscillator functionalities.

```APIDOC
std.audio:
  Convolve
std.envelopes:
  envelopes:
    FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
std.frequency:
  frequency
std.intrinsics:
  intrinsics
std.levels:
  smoothing:
    SmoothedValueStream
  levels:
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix:
  matrix
std.midi:
  midi:
    MPEConverter
    NoteToMIDI
std.mixers:
  mixers:
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise:
  noise:
    White
    Brown
    Pink
std.notes:
  notes
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random:
  random
std.timeline:
  timeline
std.voices:
  voices
```

--------------------------------

### Cmajor Type Metafunctions Reference

Source: https://cmajor.dev/docs/LanguageReference

A comprehensive reference of compile-time type metafunctions available in Cmajor, detailing their purpose and what they return or check. These functions allow for advanced type manipulation and introspection during compilation.

```APIDOC
size: For an array or vector, this returns the number of elements
type: Returns the type of its argument. Can be helpful in metaprogramming situations.
makeConst: Returns a const version of a type
removeConst: Returns a non-const version of a type
makeReference: Returns a reference version of a type
removeReference: Returns a non-reference version of a type
elementType: If the type is an array or vector, this extracts the element type
primitiveType: If the type is a primitive type or a vector, this returns the primitive type
isStruct: Returns true if its argument is a struct
isArray: Returns true if its argument is an array or slice
isSlice: Returns true if its argument is a slice
isFixedSizeArray: Returns true if its argument is a fixed-size (non-slice) array
isVector: Returns true if its argument is a vector
isPrimitive: Returns true if its argument is a primitive type
isFloat: Returns true if its argument is a float32 or float64
isFloat32: Returns true if its argument is a float32
isFloat64: Returns true if its argument is a float64
isInt: Returns true if its argument is an int32 or int64
isInt32: Returns true if its argument is an int32
isInt64: Returns true if its argument is an int64
isScalar: Returns true if its argument is a scalar type: i.e. an int, float, or vector of int or float
isString: Returns true if its argument is a string
isBool: Returns true if its argument is a bool
isComplex: Returns true if its argument is a complex
isReference: Returns true if its argument is a reference
isConst: Returns true if its argument is a const
```

--------------------------------

### Cmajor std.audio Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.audio` module of the Cmajor Standard Library, primarily focusing on audio processing operations like convolution.

```APIDOC
std.audio:
  Convolve
```

--------------------------------

### Cmajor Standard Library - Filters Module

Source: https://cmajor.dev/docs/Tools/C++API

Documentation for the `std.filters` module, offering various filter types and their processors, including TPT, SVF, DC Blocker, Butterworth, Crossover, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Cmajor Standard Library: std.intrinsics Module

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the std.intrinsics module in the Cmajor Standard Library, providing fundamental or built-in operations.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmajor Standard Library: Random Module

Source: https://cmajor.dev/docs/Tools

Provides functionalities for generating random numbers, useful for various audio effects and procedural generation.

```APIDOC
std.random:
  random
```

--------------------------------

### Cmajor Standard Library: std.random Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.random` module in the Cmajor Standard Library, which likely provides functionalities for generating random numbers or sequences.

```APIDOC
std.random
  random
```

--------------------------------

### Cmajor std::oscillators::waveshape API

Source: https://cmajor.dev/docs/StandardLibrary

This API provides functions for generating various audio waveform shapes (sine, square, triangle, sawtooth) and polyblep-based waveforms. Functions are overloaded to allow for amplitude and offset control. The `generate` function allows creating waves based on a specified shape type. `SampleType` is defined as `float32` within this namespace.

```APIDOC
namespace std::oscillators::waveshape (using SampleType = float32)
  Functions:
    SampleType sine<T>(T phase)
    SampleType sine<T>(T phase, SampleType amplitude)
    SampleType sine<T>(T phase, SampleType amplitude, SampleType offset)
    SampleType square<T>(T phase)
    SampleType square<T>(T phase, SampleType amplitude)
    SampleType square<T>(T phase, SampleType amplitude, SampleType offset)
    SampleType triangle<T>(T phase)
    SampleType triangle<T>(T phase, SampleType amplitude)
    SampleType triangle<T>(T phase, SampleType amplitude, SampleType offset)
    SampleType sawtoothUp<T>(T phase)
    SampleType sawtoothUp<T>(T phase, SampleType amplitude)
    SampleType sawtoothUp<T>(T phase, SampleType amplitude, SampleType offset)
    SampleType sawtoothDown<T>(T phase)
    SampleType sawtoothDown<T>(T phase, SampleType amplitude)
    SampleType sawtoothDown<T>(T phase, SampleType amplitude, SampleType offset)
    SampleType polyblep<T>(T phase, T increment)
    SampleType polyblep_square<T>(T phase, T increment)
    SampleType polyblep_sawtooth<T>(T phase, T increment)
    SampleType generate<T>(Shape waveShapeType, T phase)
    SampleType generate<T>(Shape waveShapeType, T phase, SampleType amplitude, SampleType offset)
```

--------------------------------

### Cmajor Limited-range Integer Behavior (wrap and clamp)

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the behavior of Cmajor's `wrap<N>` and `clamp<N>` 32-bit integer types. It demonstrates how `wrap` applies a modulo operation and `clamp` truncates values when they exceed their defined range, ensuring values stay within 0 and N-1.

```Cmajor
wrap<5> w;
clamp<5> c;

loop (7)
{
    ++w;
    ++c;
}

// after being incremented 7 times, w == 2 and c == 4

w = 4 - 5;  // w == 4
c = 4 - 5;  // c == 0
```

--------------------------------

### Cmajor Standard Library API Structure

Source: https://cmajor.dev/docs/CmajorLicenceTerms

This section outlines the complete hierarchical structure of the Cmajor Standard Library, listing top-level modules, sub-modules, and their contained components (e.g., classes, processors, modes). It provides a comprehensive map of the library's available functionalities.

```APIDOC
std.audio:
  - Convolve
std.envelopes:
  envelopes:
    - FixedASR
std.filters:
  filters:
    tpt:
      onepole:
        - Processor
        - Mode
      svf:
        - Processor
        - MultimodeProcessor
        - Mode
    - dcblocker:
      - Processor
    - butterworth:
      - Processor
      - Mode
    - crossover:
      - Processor
    - simper:
      - Processor
      - Mode
std.frequency:
  - frequency
std.intrinsics:
  - intrinsics
std.levels:
  smoothing:
    - SmoothedValueStream
  levels:
    - ConstantGain
    - DynamicGain
    - SmoothedGain
    - SmoothedGainParameter
  - pan_law
std.matrix:
  - matrix
std.midi:
  midi:
    - MPEConverter
    - NoteToMIDI
std.mixers:
  mixers:
    - StereoToMono
    - MonoToStereo
    - DynamicSum
    - ConstantSum
    - Interpolator
std.noise:
  noise:
    - White
    - Brown
    - Pink
std.notes:
  - notes
std.oscillators:
  oscillators:
    - Phasor
    - Sine
    - PolyblepOscillator
    - LFO
    - waveshape
std.random:
  - random
std.timeline:
  - timeline
std.voices:
  - voices
```

--------------------------------

### Cmajor Standard Library: std.matrix Module

Source: https://cmajor.dev/docs/Examples/RingMod

Describes the `std.matrix` module, which likely provides functionalities for matrix operations or data structures within the Cmajor Standard Library.

```APIDOC
std.matrix:
  matrix
```

--------------------------------

### Cmajor Standard Library Module and Component Hierarchy

Source: https://cmajor.dev/docs/PatchFormat

A structured listing of the Cmajor Standard Library's contents, detailing its modules, sub-modules, and individual components such as processors, gain controls, and oscillators. This hierarchy helps in understanding the organization of the library's various functionalities and available classes.

```APIDOC
Convolve
std.envelopes
  envelopes
    FixedASR
std.filters
  filters
    tpt
      onepole
        Processor
        Mode
      svf
        Processor
        MultimodeProcessor
        Mode
    dcblocker
      Processor
    butterworth
      Processor
      Mode
    crossover
      Processor
    simper
      Processor
      Mode
std.frequency
  frequency
std.intrinsics
  intrinsics
std.levels
  smoothing
    SmoothedValueStream
  levels
    ConstantGain
    DynamicGain
    SmoothedGain
    SmoothedGainParameter
  pan_law
std.matrix
  matrix
std.midi
  midi
    MPEConverter
    NoteToMIDI
std.mixers
  mixers
    StereoToMono
    MonoToStereo
    DynamicSum
    ConstantSum
    Interpolator
std.noise
  noise
    White
    Brown
    Pink
std.notes
  notes
std.oscillators
  oscillators
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
std.random
  random
std.timeline
  timeline
std.voices
  voices
```

--------------------------------

### Cmajor Generic Function Definition and Type Deduction

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the syntax for defining generic functions in Cmajor using angle brackets for template parameters. Shows how the compiler deduces types from arguments, leading to specialized function versions, and demonstrates a type mismatch error.

```Cmajor
Type add<Type> (Type a, Type b)   { return a + b; }

let x = add (1, 2); // x has type int32
let y = add (1.0f, 2.0f);  // y has type float
let z = add (1, "nope") // error! can't resolve the 'Type' template!

// You can use the templates within more complex type declarations such as
// arrays, vectors or references, e.g.
void myFunction<T1, T2> (const T1& a, T2[3] b, T1<4> c)   {  ...  }

```

--------------------------------

### Cmajor Standard Library: std.noise Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.noise` module in the Cmajor Standard Library, offering various noise generation types such as `White`, `Brown`, and `Pink` noise.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### PhasorState Utility Functions

Source: https://cmajor.dev/docs/StandardLibrary

Functions associated with the internal `PhasorState` structure, primarily for setting frequency and advancing the oscillator.

```APIDOC
PhasorState:
  setFrequency(this: PhasorState&, outputFrequencyHz: float64, oscillatorFrequencyHz: float64): void
  next(this: PhasorState&): float32
```

--------------------------------

### APIDOC: Cmajor std::smoothing Namespace

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std::smoothing` namespace, providing utilities for calculating and applying smoothing ramps and gain levels. It is parameterized by `FrameType`, defaulting to `float32`, allowing for different precision types and multi-channel support.

```APIDOC
namespace std::smoothing (using FrameType = float32)
  Utilities for calculating and applying smoothing ramps and gain levels.
  FrameType defaults to float32, but can be specified to allow support for different precision types (e.g. float64) as well as smoothed values for multi-channel use (e.g. float32<2>).

  struct SmoothedValue
    Utilities for smoothing non-audio signals, such as control parameters.
    Holds a float value and is given a target to move towards over a given time.
    Call setTarget() to tell the object where to go and how many steps to take to get there, then repeatedly call getNext() to iterate to the target.

    Members:
      FrameType value
      FrameType target
      FrameType increment
      int32 remainingSteps

    Functions:
      void reset (SmoothedValue& this, FrameType newValue)
        Immediately resets the value to the given argument.
      void setTarget (SmoothedValue& this, FrameType targetValue, int32 stepsToReachTarget)
        Gives the object a target value and the number of steps it should take to reach it.
      FrameType getNext (SmoothedValue& this)
        Returns the current value and increments it towards the current target.
      FrameType currentValue (SmoothedValue& this)

  processor std::smoothing::SmoothedValueStream (float32 smoothingTimeSeconds = 0.2f, FrameType initialValue = 0.0f)
    Takes an input that receives floating point events, and produces a continuous output stream of floats which are smoothed by a specified amount.
    This is handy for smoothing plugin parameters.

    Endpoints:
      output stream out (FrameType)
      input event in (FrameType)

    Variables:
      SmoothedValue smoothedValue

    Functions:
      event in (FrameType newTarget)
      void main()
      void init()
```

--------------------------------

### Cmajor Standard Library: Filters Module

Source: https://cmajor.dev/docs/Tools

Offers various filter types and processors for audio signal manipulation, including TPT, SVF, DC blocker, Butterworth, Crossover, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Cmajor Standard Library: std.noise Module

Source: https://cmajor.dev/docs/Examples/RingMod

Documents the `std.noise` module, offering different types of noise generators, including White, Brown, and Pink noise, for audio synthesis and processing.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### Cmajor Standard Library: std.filters Module

Source: https://cmajor.dev/docs/Examples/ZitaReverb

Documentation for the `std.filters` module in the Cmajor Standard Library, providing various filter types and processors. This includes Transposed Parallel Form (TPT) filters like `onepole` and `svf`, as well as `dcblocker`, `butterworth`, `crossover`, and `simper` filters.

```APIDOC
std.filters
  filters
    tpt
      onepole
        Processor
        Mode
      svf
        Processor
        MultimodeProcessor
        Mode
    dcblocker
      Processor
    butterworth
      Processor
      Mode
    crossover
      Processor
    simper
      Processor
      Mode
```

--------------------------------

### Cmajor Intrinsic Arithmetic Functions

Source: https://cmajor.dev/docs/LanguageReference

Lists standard arithmetic functions provided by the Cmajor standard library, such as `abs()`, `sqrt()`, `pow()`, `fmod()`, `log()`, and `exp()`, with brief descriptions of their purpose.

```APIDOC
Arithmetic Functions:
  abs(): Absolute value
  sqrt(): Square root of a value
  pow(): Base value raised by exponent
  fmod(): Floating point remainder of a division
  remainder(): Remainder of numerator/denominator, rounded
  roundToInt(): Rounds a float to the closest integer
  floor(): Rounds a float down to closest integer
  ceil(): Rounds a float up to the closest integer
  rint(): Rounds a float to the closest integer
  log10(): Returns a base 10 logarithm of value
  log(): Returns a natural logarithm of value
  exp(): exponential (e) raised by given value
```

--------------------------------

### Cmajor std::mixers::MonoToStereo Processor

Source: https://cmajor.dev/docs/StandardLibrary

Simple utility processor that takes a scalar input (mono) and outputs a 2-element vector containing two copies of the input value (stereo). It uses a generic SampleType.

```APIDOC
processor std::mixers::MonoToStereo (using SampleType)
  Endpoints:
    output stream out (SampleType<2>)
    input stream in (SampleType)
  Functions:
    void main()
```

--------------------------------

### Cmajor Standard Library: Audio Module

Source: https://cmajor.dev/docs/Tools

Provides components for audio processing, specifically including convolution operations.

```APIDOC
std.audio:
  Convolve
```

--------------------------------

### Cmajor Standard Library: std.filters Module

Source: https://cmajor.dev/docs/Examples/RingMod

Outlines the extensive `std.filters` module, offering various filter types and their processors, including TPT filters (onepole, SVF), DC blockers, Butterworth, crossover, and Simper filters.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Cmaj Annotations: Attaching Metadata to Definitions

Source: https://cmajor.dev/docs/LanguageReference

Explains the syntax for Cmaj annotations, which are enclosed in double-square-brackets `[[ ]]` and contain arbitrary comma-separated key-value pairs. These annotations can be attached to various definitions like processors, endpoints, and variables, allowing runtimes to access additional metadata.

```Cmaj
// A processor annotation is written after its name and before the open-brace:
processor P [[ name: "hello", animal: "cat", size: 123 ]]
{
    // An endpoint or variable annotation goes between its name and the semi-colon:
    input event float in [[ name: "input", min: 10.0, max: 100.0 ]];

    int x [[ desc: "blah", number: 1234 ]];
}

```

--------------------------------

### Cmaj Console Output: Writing Messages

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to use the special `console` event stream within Cmaj processors to output messages. The `console` stream is implicitly available and can accept various data types, which are then handled by the runtime environment.

```Cmaj
processor P
{
    output stream int out;

    void writeSomeLogging()
    {
        console <- "Hello " <- "World\n" <- 123 <- 1.5f <- myObject;
    }
}

```

--------------------------------

### Cmajor Built-in Processor and Global Numerical Constants

Source: https://cmajor.dev/docs/LanguageReference

Documents the special constants available within a Cmajor processor, including frequency, period, ID, and session, along with global numerical constants like NaN, Inf, Pi, and twoPi. Provides type information for each constant.

```APIDOC
Built-in Processor Constants:
  processor.frequency: float64 - The frequency of the processor in frames-per-second
  processor.period: float64 - The length in seconds of one frame for this processor
  processor.id: int32 - A value which is unique for every instance of a particular processor.
  processor.session: int32 - A value which is unique for each run of the program

Global Numerical Constants:
  nan: float32 - NaN (Not A Number)
  inf: float32 - Inf (Infinity)
  pi: float64 - Pi
  twoPi: float64 - Pi * 2
```

--------------------------------

### Cmajor Node Declaration Syntax

Source: https://cmajor.dev/docs/LanguageReference

Defines the general syntax for declaring a node in Cmajor, specifying its name, processor type, and optional attributes like parameters, array size, and over/under-sampling factors.

```Cmajor
node <name> = <processor type> [optional parameters] [optional array size] [optional over/under-sampling factor];
```

--------------------------------

### Array Product: product (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Multiplies all the elements of an array or vector of scalar values. The return type matches the element type of the array.

```APIDOC
ArrayType.elementType product<ArrayType> (const ArrayType array)
```

--------------------------------

### Cmajor Standard Library: std.oscillators Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.oscillators` module in the Cmajor Standard Library, providing various oscillator types including `Phasor`, `Sine`, `PolyblepOscillator`, `LFO`, and `waveshape`.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Standard Library: std.filters Module Components

Source: https://cmajor.dev/docs/Examples/GuitarLSTM

This section outlines the filter components provided by the `std.filters` module in the Cmajor Standard Library. It covers various filter types like one-pole, SVF, DC blocker, Butterworth, crossover, and Simper filters, along with their associated processors and modes.

```APIDOC
std.filters
    -
```

--------------------------------

### Cmajor std.convolution Namespace API

Source: https://cmajor.dev/docs/StandardLibrary

API documentation for the `std.convolution` namespace in Cmajor, which provides parameterized convolution algorithms. It includes definitions for an `ImpulseChannel` struct, a `ZeroLatencyProcessor` graph for time and frequency domain convolutions, and a `BlockProcessor` graph for frequency domain convolution.

```APIDOC
namespace std::convolution (int32 ImpulseChannelCount = 1)
  description: The std::convolution namespace is parameterised, with the ImpulseChannelCount specifying how many channels the impulse contains.

  Structs:
    struct ImpulseChannel
      members:
        - ImpulseType[] data
        - wrap<ImpulseChannelCount> channel

  Functions:
    - float32 get (
      [ImpulseChannel](#ImpulseChannel)& this, int32 index)

  graph std::convolution::ZeroLatencyProcessor (int32 maxImpulseFrames,
   int32 shortBlockSize = 32,
   int32 longBlockSize = 512)
    description: The ZeroLatencyProcessor uses a combination of time domain and frequency domain convolutions, using partitioning to produce a zero latency output. The maxImpulseFrames parameter must be specified, and sets the largest impulse that can be convolved with this instance. The shortBlockSize and longBlockSize specify the frequency domain convolution block sizes.
    Endpoints:
      - output stream out (ImpulseType)
      - input stream in (float32)
      - input event impulseData (ImpulseType[])
    Nodes:
      - convolution1 = TimeDomainProcessor(shortBlockSize / 2)
      - convolutionShort = BlockProcessor(longBlockSize - shortBlockSize, shortBlockSize)
      - convolutionLong = BlockProcessor(maxImpulseFrames, longBlockSize)
    Connections:
      - in -> convolution1.in, convolutionShort.in, convolutionLong.in
      - convolution1.out -> out
      - convolutionShort.out -> out
      - convolutionLong.out -> out
    Functions:
      - event impulseData (ImpulseType[] impulse)

  graph std::convolution::BlockProcessor (int32 maxImpulseFrames,
   int32 blockSize)
    description: This convolution algorithm uses a frequency domain implementation, with the blockSize altering the overall runtime and latency of the algorithm. Latecy is blockSize/2 frames. Larger block sizes will offer lower CPU use.
    Endpoints:
      - output stream out (ImpulseType)
      - input stream in (float32)
      - input event impulseData (ImpulseType[])
    Nodes:
      - fft = FFT(blockSize)
      - conv = Convolve(maxImpulseFrames, blockSize)[ImpulseChannelCount]
      - ifft = iFFT(blockSize)[ImpulseChannelCount]
```

--------------------------------

### Cmaj Program Compilation Class (JavaScript API)

Source: https://cmajor.dev/docs/ScriptFileFormat

Represents a Cmajor program, allowing for parsing source code and generating various representations. Instances of this class are used to prepare Cmajor code for loading into an `Engine`.

```APIDOC
class Program
{
    constructor()
    release()

    parse (sourceCodeString)    // parses some code, returning an error if there is one
    reset()                     // clears the program object for re-use
    getSyntaxTree (moduleName)  // returns a JSON representation of the full syntax tree of the program
    getBinaryModule()           // returns a conpact binary representation of the program which can be
                                // used in place of the source code for faster loading and obfuscation
}
```

--------------------------------

### std.intrinsics Module API

Source: https://cmajor.dev/docs/Tools/MachineLearning

Documents the components available in the `std.intrinsics` module, which may contain fundamental or low-level operations and data types intrinsic to the Cmajor language or its standard library.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmaj Aggregate Literal Initialization

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to initialize aggregate types like arrays and structs in Cmaj using parentheses. This includes initializing an integer array, a custom struct `MyStruct` with mixed types, and a boolean aggregate.

```Cmaj
int[5] x = (2, 3, 4, 5, 6);
MyStruct y = (3, 6.5f, "hello", (3, 4, false));
var z = bool<4> (true, false, false, true);
```

--------------------------------

### Cmajor Declaring Arrays of Processor Nodes

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to declare an array of processor nodes within a Cmajor processor. This allows for instantiating multiple instances of the same DSP processor, optionally with oversampling, which can then be managed individually or collectively within the processor's logic.

```Cmajor
processor Test
{
    input stream float in;
    output stream float out;

    // An array of 10 one pole filters, all 2x oversampled
    node lowPassArray = std::filters::tpt::onepole::Processor (0, 1000)[10] * 2;
}
```

--------------------------------

### Cmajor Patch Parameter Annotation Properties Reference

Source: https://cmajor.dev/docs/PatchFormat

This section provides a detailed reference for the various properties that can be added to endpoint annotations in Cmajor. These properties allow developers to specify parameter names, ranges, units, display hints, automation behavior, and custom text formatting for host applications.

```APIDOC
Annotation Properties for Cmajor Patch Parameters:
  name: string (required) - The name to display to the user.
  min: float - The minimum value for the parameter. If not specified, defaults to 0.0.
  max: float - The maximum value for the parameter. If not specified, defaults to 1.0.
  mid: float - The middle value in the parameter range, used by standard rotary controls for non-linear scaling.
  init: any - If specified, this value will be sent to the parameter when the patch is initialised.
  step: float - The intervals to which the parameter value must “snap” when being changed.
  unit: string - An optional string which the host will display as the units for this value (e.g., “%” or “dB”).
  boolean: boolean - If this flag is set, the parameter may be displayed as a toggle switch.
  hidden: boolean - If this flag is set, the parameter won’t be displayed on user interfaces.
  automatable: boolean - If set to true or false, passed to a host to decide whether to allow automation recording for this parameter.
  rampFrames: int - Indicates how many frames it should take to ramp to a new value.
  group: string - An optional string to hint at a parent group to which this parameter belongs.
  text: string - A formatting string used to print the value in a custom style. Supports printf-like formats (%d, %f, %[digits]f, %0[digits]f, %+d, %+f) or pipe-separated labels (e.g., "low|med|high") for discrete values, mapping to the parameter's value range.
  discrete: boolean - If this flag is set, in addition to the 'step' property, the parameter will behave similarly to the 'text' property for discrete options.
```

--------------------------------

### Cmajor Standard Library: std.random Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.random` module in the Cmajor Standard Library, which provides random number generation functionalities.

```APIDOC
std.random:
  random
```

--------------------------------

### Global C Major Filter Constants

Source: https://cmajor.dev/docs/StandardLibrary

Defines default values for filter parameters such as frequency, Q factor, and gain, used across various filter implementations within the C Major `std::filters` namespace.

```APIDOC
Constants:
  float32 defaultFrequency = 1000.0f
  float32 defaultQ = 0.707107f
  int32 defaultGain = 0
```

--------------------------------

### Cmajor MIDI and MPE Constants

Source: https://cmajor.dev/docs/StandardLibrary

Defines standard constants used in MIDI and MPE processing, such as the semitone bend range for MPE and the MPE slide controller number.

```APIDOC
semitoneBendRange: float32 = 48.0f (standard MPE range of 48 semitones)
slideController: int32 = 74 (MPE slide controller number)
```

--------------------------------

### Cmajor Member Function Invocation

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the two equivalent ways to invoke member functions in Cmajor, regardless of their definition style. Functions can be called using dot notation on the object or as a free function with the object passed as the first argument.

```Cmajor
Thing t;
let biggest1 = t.getBiggest();   // these two calls do
let biggest2 = getBiggest (t);   // exactly the same thing
```

--------------------------------

### Explicitly Connect Child Processor Outputs in Cmajor Graph

Source: https://cmajor.dev/docs/LanguageReference

Shows how to explicitly connect output streams from a child processor (`MyChildProcessor`) to the parent graph's top-level outputs using traditional `connection` statements. This method requires declaring the parent graph's outputs and then mapping child outputs to them.

```Cmajor
graph Parent
{
    output stream int out1, out2;

    node child = MyChildProcessor;

    connection child.out1 -> out1;
    connection child.out2 -> out2;
}
```

--------------------------------

### std::filters::crossover API

Source: https://cmajor.dev/docs/StandardLibrary

API for the 4th Order two-band crossover filter, implemented using StateVariableFilter. It outputs two streams (low and high) that can be summed for a flat response, with a modulatable crossover frequency.

```APIDOC
namespace std::filters::crossover
  Description: 4th Order two band crossover filter
               This filter is implemented using the StateVariableFilter and outputs two streams which can be summed to produce a flat response. The crossover frequency can be modulated.

  Structs:
    struct Implementation
      Members:
        tpt::svf::Implementation[2] filters

  Functions:
    Implementation create (float64 processorFrequency, float64 filterFrequency)
    void setFrequency (Implementation& this, float64 processorFrequency, float64 filterFrequency)
    void reset (Implementation& this)
    FrameType[2] process (Implementation& this, FrameType x)

  Processor: std::filters::crossover::Processor (float32 initialFrequency = defaultFrequency)
    Endpoints:
      output stream lowOut (FrameType)
      output stream highOut (FrameType)
      input stream in (FrameType)
      input event frequency (float32)
    Variables:
      filter
      bool updateFilter = true
      float32 filterFrequency
    Functions:
      event frequency (float32 f)
      void main()
      void reset()
```

--------------------------------

### Cmajor Standard Library: Intrinsics Module

Source: https://cmajor.dev/docs/Tools

Contains fundamental intrinsic functions and types essential for low-level operations within the Cmajor environment.

```APIDOC
std.intrinsics:
  intrinsics
```

--------------------------------

### Cmaj Namespace Aliases: Simplifying Parameterized Namespace Usage

Source: https://cmajor.dev/docs/LanguageReference

Explains how to create local aliases for parameterized namespaces in Cmaj. This technique helps to avoid repetitive, long-winded namespace declarations, significantly improving code readability and conciseness when using parameterized namespaces multiple times.

```Cmaj
namespace ExampleNamespace (using Type, int value)
{
    Type addValue (Type x)   { return x + Type (value); }
}

void f()
{
    // When using a parameterised namespace, it can be quite long-winded...
    let x1 = ExampleNamespace (int, 10)::addValue (100);

    // ...so you can use 'namespace' to declare a local alias:
    namespace N = ExampleNamespace (int, 10);

    let x2 = N::addValue (101);
    let x3 = N::addValue (102);
}

```

--------------------------------

### Vector Selection: select (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Uses a boolean vector to determine which elements from two other vectors should be combined into the result.

```APIDOC
T select<T> (bool<T.size> mask, T trueValues, T falseValues)
```

--------------------------------

### std::filters::simper API

Source: https://cmajor.dev/docs/StandardLibrary

API for the Simper filter, a State Variable filter based on Andy Simper's design, providing various operational modes. This section details its internal implementation structure.

```APIDOC
namespace std::filters::simper
  Description: Simper filter
               This filter is based on the design by Andy Simper, and is an implementation of the State Variable filter providing many different operational modes. It is documented here: https://cytomic.com/files/dsp/SvfLinearTrapOptimised2.pdf

  Structs:
    struct Implementation
      Members:
        FrameType ic1eq
        FrameType ic2eq
        CoefficientType a1
        CoefficientType a2
        CoefficientType a3
        CoefficientType f0
        CoefficientType f1
        CoefficientType f2
        int32 mode
```

--------------------------------

### Cmaj `if`/`else` Conditional Statements

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the straightforward `if`/`else if`/`else` syntax in Cmaj for conditional execution. This structure allows for branching logic based on specified conditions.

```Cmaj
if (x == 1)
    doSomething();
else if (x == 2)
    doSomethingElse();
else if (x == 3)
    doSomethingElseAgain();
```

--------------------------------

### Cmajor Standard Library: std.filters Module API

Source: https://cmajor.dev/docs/LanguageReference

API documentation for the `std.filters` module in the Cmajor Standard Library, providing various filter types such as `tpt` (onepole, svf), `dcblocker`, `butterworth`, `crossover`, and `simper`.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        Processor
        Mode
      svf:
        Processor
        MultimodeProcessor
        Mode
    dcblocker:
      Processor
    butterworth:
      Processor
      Mode
    crossover:
      Processor
    simper:
      Processor
      Mode
```

--------------------------------

### Value Clamping: clamp (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns a value which has been clamped to fit within the given range, inclusive of the top bound. This ensures the value stays within specified minimum and maximum limits.

```APIDOC
T clamp<T> (T value, T minimum, T maximum)
```

--------------------------------

### Linear Interpolation: lerp (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Performs a linear interpolation between a pair of scalar values. The 'proportion' parameter determines the blend between 'value1' and 'value2'.

```APIDOC
T lerp<T, P> (T value1, T value2, P proportion)
```

--------------------------------

### Cmajor std.oscillators Module Components

Source: https://cmajor.dev/docs/Examples/Pro54

Details the components available within the `std.oscillators` module of the Cmajor Standard Library, offering various types of audio oscillators and waveform shapers.

```APIDOC
std.oscillators:
  oscillators:
    Phasor
    Sine
    PolyblepOscillator
    LFO
    waveshape
```

--------------------------------

### Cmajor Struct: Pressure Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a 'Pressure' event in Cmajor, representing key pressure. It includes a channel ID for association and the pressure value, normalized between 0 and 1.

```APIDOC
struct Pressure
  channel: int32 (This channel ID can be used to associate this event with the earlier NoteOn to which it applies.)
  pressure: float32 (Key pressure is in the range 0 to 1)
```

--------------------------------

### Cmajor Array Sub-Region Manipulation (Slicing)

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to assign values to entire arrays or specific sub-regions using slice notation. It also shows various ways to extract copies of sub-regions (slices) from an array and how to copy sub-sections between compatible arrays.

```Cmajor
int[8] x;

x = 7;       // Sets all elements of x to 7
x[:] = 7;    // Sets all elements of x to 7
x[3:5] = 7;  // Sets elements 3 and 4 to 7

let a1 = x[1:5];   // Returns a copy of elements 1 to 4
let a1 = x[3:];    // Returns a copy of elements 3 to 7
let a3 = x[:3];    // Returns a copy of elements 0 to 2
let a4 = x[:-1];   // Returns a copy of all elements apart from the last one
let a5 = x[3:-2];  // Returns a copy of elements 3 to 5

z[3:6] = y[5:8];  // If the sizes and types match, you can copy sub-sections between arrays
```

--------------------------------

### Cmaj Comment Syntax

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the two types of comments supported in Cmaj: multi-line comments using the `/* ... */` syntax and single-line comments using `//`. This comment style is common in C-family languages.

```Cmaj
/* Multi-line comments
    use the slash-star syntax.. */

// Single-line comments use double-slashes
```

--------------------------------

### PolyblepState Waveform Generation Functions

Source: https://cmajor.dev/docs/StandardLibrary

Functions associated with the internal `PolyblepState` structure for generating various polyblep-based waveforms like sine, square, sawtooth, and triangle.

```APIDOC
PolyblepState:
  setFrequency(this: PolyblepState&, outputFrequencyHz: float64, oscillatorFrequencyHz: float64): void
  nextSine(this: PolyblepState&): float32
  nextSquare(this: PolyblepState&): float32
    Returns the sample of a square wave.
  nextSawtooth(this: PolyblepState&): float32
    Returns the sample of a sawtooth wave.
  nextTriangle(this: PolyblepState&): float32
```

--------------------------------

### Cmajor Test Directive: expectError

Source: https://cmajor.dev/docs/TestFileFormat

This directive wraps a code chunk in a dummy namespace, attempts compilation, and passes if the compiler error matches the specified message. It fails if there's no error or a mismatch.

```Cmajor
## expectError ("2:9: error: Cannot find symbol 'XX'")

void f (XX& x) {}
```

--------------------------------

### Cmajor Standard Library: Noise Module

Source: https://cmajor.dev/docs/Tools

Provides generators for different types of noise signals, including White, Brown, and Pink noise.

```APIDOC
std.noise:
  noise:
    White
    Brown
    Pink
```

--------------------------------

### Cmajor Struct: PolyblepState Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the `PolyblepState` struct, part of the `std.oscillators` namespace. It includes a `PhasorState` and an accumulator, likely used in polyblep-based waveform generation for anti-aliasing.

```APIDOC
struct PolyblepState
  phasor: PhasorState
  accumulator: float32
```

--------------------------------

### C Major std::oscillators::LFO Processor

Source: https://cmajor.dev/docs/StandardLibrary

A C Major Low-Frequency Oscillator (LFO) processor with extensive event inputs for controlling its shape, frequency, amplitude, and offset, including synchronization and tempo-based rate control.

```APIDOC
processor std::oscillators::LFO:
  Constructor: (initialShape: Shape = Shape::sine, initialFrequency: float32 = 1.0f, initialAmplitude: float32 = 1.0f, initialOffset: float32 = 0.0f)
  Description: A LFO processor with event inputs to control its parameters.
  Endpoints:
    output: stream out (float32)
    input: event shapeIn (float32)
    input: event rateHzIn (float32)
    input: event rateTempoIn (float32)
    input: event amplitudeIn (float32)
    input: event offsetIn (float32)
    input: event rateModeIn (float32)
    input: event syncIn (float32)
    input: event positionIn (std::timeline::Position)
    input: event transportStateIn (std::timeline::TransportState)
    input: event tempoIn (std::timeline::Tempo)
  Variables:
    currentShape: Shape
    currentAmplitude: std::smoothing::SmoothedValue
    currentOffset: float32
    isUsingTempo: bool = false
    isSyncActive: bool = false
    isPlaying: bool = false
    cyclesPerBeat: float32 = 1
    lastQuarterNotePos: float64
    currentPhase: float32
    currentRandomValue: float32
    phaseIncrementHz: float32 = initialFrequency * float32(processor.period)
    phaseIncrementTempo: float32 = 120.0f * float32(processor.period / 60)
    rng: std::random::RNG
  Functions:
    positionIn(newPos: std::timeline::Position): event
    transportStateIn(newState: std::timeline::TransportState): event
    tempoIn(newTempo: std::timeline::Tempo): event
    rateTempoIn(newNumBeats: float32): event
    amplitudeIn(newAmplitude: float32): event
    offsetIn(newOffset: float32): event
    shapeIn(newShape: float32): event
    rateModeIn(isTempo: float32): event
    syncIn(isSyncing: float32): event
    rateHzIn(newRateHz: float32): event
    isRandomMode(): bool
    init(): void
    main(): void
    getNextSample(): float32
    resetRandomValue(): void
    advancePhase(increment: float32): void
```

--------------------------------

### Cmajor Standard Library: std.filters Module

Source: https://cmajor.dev/docs/Examples/STunedBar6

Documents the components available within the Cmajor Standard Library's filters module, including various filter types such as TPT, SVF, DC blocker, Butterworth, Crossover, and Simper, along with their associated processors and modes.

```APIDOC
std.filters:
  filters:
    tpt:
      onepole:
        - Processor
        - Mode
      svf:
        - Processor
        - MultimodeProcessor
        - Mode
    dcblocker:
      - Processor
    butterworth:
      - Processor
      - Mode
    crossover:
      - Processor
    simper:
      - Processor
      - Mode
```

--------------------------------

### Cmajor Standard Library: Convolve Component

Source: https://cmajor.dev/docs/Examples/PirkleFilters

Documentation for the Convolve component within the Cmajor Standard Library, likely used for signal convolution operations.

```APIDOC
Convolve
```

--------------------------------

### Cmaj Arithmetic, Bitwise, and Logical Operators Reference

Source: https://cmajor.dev/docs/LanguageReference

A comprehensive list of binary and unary operators supported in Cmaj, including arithmetic, bitwise, logical, comparison, and increment/decrement operators. Notes that operators can be applied to both scalars and vectors, yielding vector results for vector inputs.

```APIDOC
Binary Operators:
  +: Add
  -: Subtract
  *: Multiply
  /: Divide
  %: Modulo
  ++: Pre/post increment
  --: Pre/post decrement
  **: Exponentiation
  &: Bitwise AND
  |: Bitwise OR
  ^: Bitwise XOR
  <<: Bitwise left shift
  >>: Bitwise right shift
  >>>: Bitwise unsigned right shift
  &&: Logical AND
  ||: Logical OR
  <: Less than
  <=: Less than or equal
  >: Greater than
  >=: Greater than or equal
  ==: Equal
  !=: Not equal

Unary Operators:
  -: Numeric negation
  !: Logical (boolean) NOT
  ~: Bitwise NOT
```

--------------------------------

### PatchConnection Object API Reference

Source: https://cmajor.dev/docs/PatchFormat

The `PatchConnection` object provides a comprehensive interface for controlling and querying the state of a running Cmajor patch from a web component. It offers methods for handling status updates, sending data to various input endpoints (events, values, MIDI), and managing the patch's stored key-value state.

```APIDOC
PatchConnection:
  description: Object provided by the host for controlling and communicating with the running Cmajor patch from an HTMLElement class.

  Methods:
    // Status-handling methods
    requestStatusUpdate():
      description: Triggers an asynchronous callback to any status listeners with the patch’s current state. Use addStatusListener() to attach a listener.
    addStatusListener(listener: Function):
      description: Attaches a listener function that will be called whenever the patch’s status changes. The function receives an object with properties describing the status (loaded, errors, endpoint descriptions, manifest, etc.).
      parameters:
        listener: Function - The listener function to attach.
    removeStatusListener(listener: Function):
      description: Removes a listener that was previously added with addStatusListener().
      parameters:
        listener: Function - The listener function to remove.
    resetToInitialState():
      description: Causes the patch to be reset to its “just loaded” state.

    // Methods for sending data to input endpoints
    sendEventOrValue(endpointID: string, value: any, rampFrames?: number):
      description: Sends a value to one of the patch’s input endpoints (event or value type). If the endpoint is a ‘value’ type, rampFrames can specify the number of frames for ramping. The value is coerced to the endpoint's expected type.
      parameters:
        endpointID: string - The ID of the input endpoint.
        value: any - The value to send.
        rampFrames: number (optional) - The number of frames over which the current value should ramp to the new target (for 'value' type endpoints).
    sendMIDIInputEvent(endpointID: string, shortMIDICode: number):
      description: Sends a short MIDI message value to a MIDI endpoint. The value must be a number encoded with (byte0 << 16) | (byte1 << 8) | byte2.
      parameters:
        endpointID: string - The ID of the MIDI endpoint.
        shortMIDICode: number - The MIDI message value encoded as (byte0 << 16) | (byte1 << 8) | byte2.
    sendParameterGestureStart(endpointID: string):
      description: Tells the patch that a series of changes that constitute a gesture is about to take place for the given endpoint. Must be followed by sendParameterGestureEnd().
      parameters:
        endpointID: string - The ID of the endpoint for which the gesture is starting.
    sendParameterGestureEnd(endpointID: string):
      description: Tells the patch that a gesture started by sendParameterGestureStart() has finished.
      parameters:
        endpointID: string - The ID of the endpoint for which the gesture has ended.

    // Stored state control methods
    requestStoredStateValue(key: string):
      description: Requests a callback to any stored-state value listeners with the current value of a given key-value pair. To attach a listener, use addStoredStateValueListener().
      parameters:
        key: string - The key of the stored state value to request.
    sendStoredStateValue(key: string, newValue: any):
      description: Modifies a key-value pair in the patch’s stored state.
      parameters:
        key: string - The key of the stored state value to modify.
        newValue: any - The new value for the key.
    addStoredStateValueListener(listener: Function):
      description: Attaches a listener function that will be called when any key-value pair in the stored state is changed. The listener function receives a message parameter with properties 'key' and 'value'.
      parameters:
        listener: Function - The listener function to attach.
    removeStoredStateValueListener(listener: Function):
      description: Removes a listener that was previously added with addStoredStateValueListener().
      parameters:
        listener: Function - The listener function to remove.
    sendFullStoredState(fullState: object):
      description: Applies a complete stored state to the patch. To get the current complete state, use requestFullStoredState().
      parameters:
        fullState: object - The complete stored state object to apply.
    requestFullStoredState(callback: Function):
      description: Asynchronously requests the full stored state of the patch. The supplied listener function will be called asynchronously with the state as its argument.
      parameters:
        callback: Function - The callback function to receive the full state.
```

--------------------------------

### Declare External Native Function in Cmajor

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to declare a placeholder for a native function using the `external` keyword in Cmajor code. This allows Cmajor to call functions implemented in a native application, emphasizing the need for exact type matching and the handling of array slices as raw C pointers.

```Cmajor
external int32 myNativeFunction (float x, double y, float[] z);
```

--------------------------------

### Cmajor Struct: Control Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a generic 'Control' event in Cmajor, suitable for any controller index, typically MIDI controller numbers. It includes a channel ID for association, the control index, and its normalized value (0-1).

```APIDOC
struct Control
  channel: int32 (This channel ID can be used to associate this event with the earlier NoteOn to which it applies.)
  control: int32 (This could be used for any kind of controller index, but is probably best used for MIDI controller numbers.)
  value: float32 (The normalised value of the controller, between 0 and 1)
```

--------------------------------

### Cmaj `break` and `continue` with Target Labels

Source: https://cmajor.dev/docs/LanguageReference

Details the standard `break` and `continue` keywords for exiting or skipping iterations in loops. Cmaj extends this functionality by supporting target labels, allowing `break` or `continue` to jump out of or return to specific named parent blocks.

```Cmaj
my_outer_loop: loop (100) // prefixing a `loop` or `for` block with a label gives it a name
{
    loop (200)
    {
        break; // this would escape the inner loop

        break my_outer_loop; // this will escape from the outer loop

        continue my_outer_loop; // this will jump back to the start of the outer loop
    }
}
```

```Cmaj
my_block:
{
    break my_block; // this will jump forwards to the statement after the block

    // any code here will be skipped
}

// execution resumes here
```

--------------------------------

### JSON Format for Cmajor Input Value Data

Source: https://cmajor.dev/docs/TestFileFormat

Details the JSON structure for input value files, similar to events but including a `value` attribute and a `framesToReachValue` attribute, which specifies the number of frames over which the value is smoothed.

```JSON
[
    {
        "frameOffset": 100,
        "value": 0.4,
        "framesToReachValue": 100
    },
    {
        "frameOffset": 150,
        "value": 1.0,
        "framesToReachValue": 10
    }
]
```

--------------------------------

### Cmaj `loop` Statement for Infinite and Fixed Iterations

Source: https://cmajor.dev/docs/LanguageReference

Introduces the Cmaj `loop` statement, designed for creating infinite loops or loops with a predefined number of iterations. It serves as an alternative to `while (true)` for clarity in infinite loop scenarios.

```Cmaj
loop { advance(); }   // infinite loop

int i = 0;
loop (5)
    console <- ++i; // prints 1, 2, 3, 4, 5
```

--------------------------------

### Define std::audio_data::Mono Struct in Cmajor Standard Library

Source: https://cmajor.dev/docs/PatchFormat

This Cmajor snippet shows the definition of the `Mono` struct from the standard library, designed to hold single-channel audio data. It includes a `frames` array for audio samples and a `sampleRate` field, which the runtime populates when loading audio files.

```Cmajor
    struct Mono
    {
        float[] frames;
        float64 sampleRate;
    }

```

--------------------------------

### Compare Values: min (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Compares two scalar or vector values and returns the minimum. For vector operands, this function returns a vector of results for each element.

```APIDOC
T min<T> (T v1, T v2)
```

--------------------------------

### Cmajor: std::pan_law Functions

Source: https://cmajor.dev/docs/StandardLibrary

Provides functions within the `std::pan_law` namespace for calculating left/right gain pairs based on a pan position (between -1 and 1) using different pan-law algorithms, specifically linear and 3dB-centre.

```APIDOC
namespace std::pan_law

linear
T<2> linear<T> (T panPosition)

centre3dB
T<2> centre3dB<T> (T panPosition)
```

--------------------------------

### Cmajor Function: Convert Frequency to MIDI Note

Source: https://cmajor.dev/docs/StandardLibrary

Provides functions to convert a given frequency in Hz to its equivalent MIDI note number. Overloads allow for standard A=440Hz tuning or custom reference frequencies.

```APIDOC
frequencyToNote (float32 frequency) -> float32 (Returns the MIDI note equivalent for a frequency in Hz. This uses the standard A = 440Hz reference tuning. See: noteToFrequency)
```

```APIDOC
frequencyToNote (float32 frequency, float32 frequencyOfA) -> float32 (Returns the MIDI note equivalent for a frequency in Hz. The frequencyOfA parameter lets you use non-standard tunings if you need to. See: noteToFrequency)
```

--------------------------------

### C Major std::oscillators::PolyblepOscillator Processor

Source: https://cmajor.dev/docs/StandardLibrary

A C Major processor that uses a polyblep algorithm to generate various waveforms, with inputs to control both its shape and frequency.

```APIDOC
processor std::oscillators::PolyblepOscillator:
  Constructor: (using FrameType, initialShape: Shape = Shape::sawtoothUp, initialFrequency: float32 = 440.0f)
  Description: Uses a polyblep algorithm to generate a wave, with inputs to control its shape and frequency.
  Endpoints:
    output: stream out (FrameType)
    input: event frequencyIn (float32)
    input: event shapeIn (float32)
  Variables:
    polyblep: PolyblepState
    currentShape: Shape
  Functions:
    init(): void
    frequencyIn(newFrequency: float32): event
    shapeIn(newShape: float32): event
    main(): void
```

--------------------------------

### Cmaj Processor Declaration Structure and Components

Source: https://cmajor.dev/docs/LanguageReference

Details the structure of a Cmaj `processor` declaration, which serves as an execution unit. It specifies the order of input/output endpoint declarations, followed by functions (including a mandatory `main()`), types, and processor state variables.

```Cmaj
processor MyProcessor
{
    // Input and output endpoints are always declared first in the processor
    output event   int   myOutput;
    input  stream  float myInput1;
    input  value   bool  myInput2;

    // then you can declare types, functions and variables in any order you fancy
    struct MyStruct
    {
        int x, y;
        float[20] buffer;
    }

    MyStruct thing1, thing2;
    int someKindOfCounter;
    let myConstants = int[] (10, 20, 30);

    void function1() { ... }
    bool function2 (int x, int y) { ... }

    // Every processor must declare a main() function - see the section about its format
    void main()  { ... }
}
```

--------------------------------

### Power Function: pow (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Raises a base value to the given power. This function computes 'a' raised to the power of 'b'.

```APIDOC
T pow<T> (T a, T b)
```

--------------------------------

### std::filters::dcblocker API

Source: https://cmajor.dev/docs/StandardLibrary

API for the DC blocker high-pass filter, an implementation of a recursive filter to remove DC offset. It includes the filter's internal state, creation, processing, and processor interface.

```APIDOC
namespace std::filters::dcblocker
  Description: Highpass filter for blocking DC. An implementation of https://ccrma.stanford.edu/~jos/fp/DC_Blocker.html
               The DC blocker is a small recursive filter specified by the difference equation:
               y(n) = x(n) - x(n-1) + Ry(n-1)
               ..where R is a parameter that is typically somewhere between 0.9 and 1

  Structs:
    struct Implementation
      Members:
        FrameType x1
        FrameType y1

  Functions:
    Implementation create()
    void reset (Implementation& this)
    FrameType process (Implementation& this, FrameType x)

  Processor: std::filters::dcblocker::Processor
    Endpoints:
      output stream out (FrameType)
      input stream in (FrameType)
    Variables:
      filter
    Functions:
      void main()
      void reset()
```

--------------------------------

### Declare External Raw Float Array for Audio in Cmajor Processor

Source: https://cmajor.dev/docs/PatchFormat

This Cmajor code declares an `external` raw float array named `audioData` within a `MyProcessor`. This allows direct loading of audio file data into a simple array, though the associated sample rate information will be discarded by the runtime.

```Cmajor
    processor MyProcessor
    {
        external float[] audioData;

```

--------------------------------

### Ceiling Function: ceil (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the smallest integer not less than the argument. This function follows the same rules as the standard C/C++ std::ceil() function, effectively rounding up to the nearest integer.

```APIDOC
T ceil<T> (T n)
```

--------------------------------

### JSON Format for Cmajor Input Event Data

Source: https://cmajor.dev/docs/TestFileFormat

Describes the JSON structure for input event files, where each object contains a `frameOffset` (frame number for the event) and an `event` attribute (the value to be sent). Frame offsets must be monotonically increasing.

```JSON
[
    {
        "frameOffset" : 10,
        "event" : 1.0
    },
    {
        "frameOffset" : 100,
        "event" : 5.0
    }
]
```

--------------------------------

### Cmaj Nested Namespace Declaration and Symbol Access

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates how to declare nested namespaces in Cmaj and access functions or constants defined within them using the double-colon `::` separator for qualified names.

```Cmaj
namespace N1
{
    namespace N2
    {
        int myFunction() { ... }
        let myConstant = 1234;
    }

    namespace N3
    {
        void myOtherFunction()    { let x = N2::myFunction() + N2::myConstant; }
    }
}

void yetAnotherFunction()    { let x = N1::N2::myFunction() + N1::N2::myConstant; }
```

--------------------------------

### Cmaj `while` Loop Syntax

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the fundamental `while` loop structure in Cmaj, which functions similarly to `while` loops in C/C++/Java. It iterates as long as the specified condition remains true, printing numbers from 0 to 4.

```Cmaj
int i = 0;
while (i < 5)
{
    console <- i;   // prints 0, 1, 2, 3, 4
    ++i;
}
```

--------------------------------

### Define Cmajor Event Handlers for Multiple Types

Source: https://cmajor.dev/docs/LanguageReference

Shows how to declare multiple event handler functions for an input event endpoint that accepts different data types (e.g., string, float<2>). Each distinct type within the event's tuple requires its own dedicated handler function to process the incoming data.

```Cmajor
processor P
{
    input event (string, float<2>) myInput;

    event myInput (string e) { ... }
    event myInput (float<2> e) { ... }
}
```

--------------------------------

### Cmaj External Constants Declaration and Access

Source: https://cmajor.dev/docs/LanguageReference

Shows the use of the `external` keyword for variables in Cmaj, indicating their values are provided by the hosting environment at runtime. These variables are implicitly constant and can be referenced globally from any part of the program.

```Cmaj
namespace N
{
    external int[] someData; // The contents of this array will be supplied by whatever runtime is loading the Cmaj program.
}

void myFunction()
{
    let x = N::someData[3];   // externals can be referenced from anywhere in the program as global constants
}
```

--------------------------------

### cmaj::DiagnosticMessageList Class API Documentation

Source: https://cmajor.dev/docs/Tools/C++API

The `DiagnosticMessageList` class is used to collect and manage error, warning, and note messages generated during the parsing, loading, or linking phases of Cmajor code. It provides functionalities for inspecting these messages.

```APIDOC
cmaj::DiagnosticMessageList:
  Purpose: Collects error, warning, and note messages during code parsing, loading, or linking.
  Functionality:
    - Contains errors, warnings, and notes.
    - Provides functions for printing, iterating, and probing messages.
```

--------------------------------

### Cmajor std::random API

Source: https://cmajor.dev/docs/StandardLibrary

This API offers a basic, non-cryptographically secure pseudo-random number generator (`RNG`) suitable for tasks like noise generation. It includes functions to seed the generator and retrieve various types of random numbers (integers, unipolar/bipolar floats, floats up to a maximum value). Guidance is provided on using `processor.id` and `processor.session` for seeding to control randomness across processor instances and program runs.

```APIDOC
namespace std::random
  Description: Not cryptographically secure, for noise generation and non-critical tasks.
  Seed considerations:
    processor.id: Different for each processor instance, same per program run.
    processor.session: Same for all processors, different per program run.

  Structs:
    RNG:
      Description: Default RNG, a basic linear congruential generator. See https://en.wikipedia.org/wiki/Lehmer_random_number_generator
      Members:
        int64 state: The Lehmer algorithm uses a simple 64-bit state which mutates each time a number is generated.

  Functions:
    void seed(RNG& this, int64 newSeed): Resets the generator with a given seed.
    int32 getInt32(RNG& this): Returns a positive int32 between 0 and 0x7fffffff.
    float32 getUnipolar(RNG& this): Returns a value between 0 and 1.
    float32 getBipolar(RNG& this): Returns a value between -1 and 1.
    float32 getFloat(RNG& this, float32 maximumValue): Returns a floating point value between 0 and maximumValue.
```

--------------------------------

### Declare External PianoSample Array in Cmajor

Source: https://cmajor.dev/docs/PatchFormat

This Cmajor code snippet defines a `PianoSample` struct and declares an `external` array of 5 `PianoSample` objects. This array is intended to be populated by the runtime environment, allowing external data to be loaded into the Cmajor patch.

```Cmajor
    namespace piano
    {
        struct PianoSample
        {
            std::audio_data::Mono source;
            int rootNote;
        }

        external PianoSample[5] samples;

```

--------------------------------

### Cmajor Struct Declaration Syntax

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the C-style declaration of a struct in Cmajor, showing how to define members of various types, including vectors, arrays, primitive types, and other embedded structs. Notes the absence of a semicolon after the closing brace.

```cmajor
struct ExampleStruct
{
    int<5>       member1, member2;
    float[]      thisMemberIsASlice;
    float64[4]   thisMemberIsAnArray;
    int64        thisMemberIsABigInteger;
    OtherStruct  anotherEmbeddedStructMember;
}
```

--------------------------------

### Cmajor Standard Hyperbolic Functions

Source: https://cmajor.dev/docs/StandardLibrary

A set of generic hyperbolic functions, including sine, cosine, tangent, and their inverse forms. These functions take a single numeric input and return a value of the same type.

```Cmajor
T sinh<T> (T n)
T cos<T> (T n)
T tanh<T> (T n)
T atanh<T> (T n)
T asinh<T> (T n)
T acosh<T> (T n)
```

--------------------------------

### Cmajor Generic Value Swapping Function

Source: https://cmajor.dev/docs/StandardLibrary

A generic function to swap the contents of two assignable values of any type. It takes two references to values and exchanges their contents.

```Cmajor
void swap<Type> (Type& value1, Type& value2)
```

--------------------------------

### Cmajor: std::matrix Mathematical Functions

Source: https://cmajor.dev/docs/StandardLibrary

Contains various matrix manipulation functions within the `std::matrix` namespace. These functions include operations like matrix multiplication, dot product for both 1D and 2D arrays, matrix inverse using Gaussian elimination, and element-wise addition and subtraction for 2D arrays.

```APIDOC
namespace std::matrix

multiply
ElementType[n, m] multiply<ElementType, n, m, k> (ElementType[n, k] a, ElementType[k, m] b)

dot
ElementType dot<ElementType, n> (ElementType[n] a, ElementType[n] b)

dot
ElementType[n, m] dot<ElementType, n, m, k> (ElementType[n, k] a, ElementType[k, m] b)

inverse
ElementType[n, n] inverse<ElementType, n> (ElementType[n, n] matrix)

add
ElementType[n, m] add<ElementType, n, m> (ElementType[n, m] a, ElementType[n, m] b)

subtract
ElementType[n, m] subtract<ElementType, n, m> (ElementType[n, m] a, ElementType[n, m] b)
```

--------------------------------

### C Major std::oscillators::Sine Processor

Source: https://cmajor.dev/docs/StandardLibrary

A basic C Major processor for sinewave generation, featuring an input to control its frequency. It supports various `FrameType`s like float or float vectors.

```APIDOC
processor std::oscillators::Sine:
  Constructor: (using FrameType, initialFrequency: float32 = 440.0f)
  Description: A basic sinewave generation processor with an input to control its frequency. The FrameType parameter could be a float or a float vector.
  Endpoints:
    output: stream out (FrameType)
    input: event frequencyIn (float32)
  Variables:
    phasor: PhasorState
  Functions:
    init(): void
    frequencyIn(newFrequency: float32): event
    main(): void
```

--------------------------------

### Cmajor std::mixers::Interpolator Processor

Source: https://cmajor.dev/docs/StandardLibrary

Processor that takes two input streams and outputs a dynamic mix of their values, controlled by a third mix stream. The mixRange parameter defines the expected range of the mix control, useful for wet/dry mixing.

```APIDOC
processor std::mixers::Interpolator (using FrameType,
 float32 mixRange)
  Endpoints:
    output stream out (FrameType)
    input stream in1 (FrameType)
    input stream in2 (FrameType)
    input stream mix (float32)
  Functions:
    void main()
```

--------------------------------

### Cmajor Struct: Slide Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a 'Slide' event in Cmajor, representing a Y-axis controller parameter, often MIDI controller 74 in MPE devices. It includes a channel ID for association and the slide position, normalized between 0 and 1.

```APIDOC
struct Slide
  channel: int32 (This channel ID can be used to associate this event with the earlier NoteOn to which it applies.)
  slide: float32 (The slide position ranges from 0 to 1. Exactly what you choose to do with it depends on the instrument.)
```

--------------------------------

### Cmajor Standard Trigonometric Functions

Source: https://cmajor.dev/docs/StandardLibrary

A collection of generic trigonometric functions for calculating sine, cosine, tangent, and their inverse counterparts. These functions operate on a single numeric input or two inputs for `atan2`, returning a value of the same type.

```Cmajor
T sin<T> (T n)
T cos<T> (T n)
T tan<T> (T n)
T atan<T> (T n)
T asin<T> (T n)
T acos<T> (T n)
T atan2<T> (T y, T x)
```

--------------------------------

### Cmaj Global Constants in Namespaces

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to declare compile-time constants within Cmaj namespaces using `let` and `const`. It highlights that namespaces are restricted to containing only constants, preventing the declaration of non-constant variables.

```Cmaj
namespace N
{
    let x = 1234; // ok
    const int[4] y = (1, 2, 3, 4);
    int z;  // error! This would be OK in a processor, but a namespace can only contain constants
}
```

--------------------------------

### Cmajor Function: Convert MIDI Note to Frequency

Source: https://cmajor.dev/docs/StandardLibrary

Provides functions to convert a MIDI note number to its corresponding frequency in Hz. Supports both integer and floating-point MIDI note numbers and allows for standard A=440Hz tuning or custom reference frequencies.

```APIDOC
noteToFrequency<T> (T midiNoteNumber) -> float32 (Returns the frequency in Hz for a MIDI note number. You can provide either an integer or floating point argument - the MIDI note scale is in semitone units from 0 to 127, where middle C = 60. This uses the standard A = 440Hz reference tuning. See: frequencyToNote)
```

```APIDOC
noteToFrequency<T> (T midiNoteNumber, float32 frequencyOfA) -> float32 (Returns the frequency in Hz for a MIDI note number. You can provide either an integer or floating point argument - the MIDI note scale is in semitone units from 0 to 127, where middle C = 60. The frequencyOfA parameter lets you use non-standard tunings if you need to. See: frequencyToNote)
```

--------------------------------

### Cmajor Boolean Array Operations

Source: https://cmajor.dev/docs/StandardLibrary

Functions for checking properties of boolean arrays. `allTrue` verifies if all elements in a boolean array are true. `allEqual` compares two arrays element by element, returning true if all corresponding elements are identical.

```Cmajor
bool allTrue<BoolArray> (BoolArray boolArray)
bool allEqual<Array1, Array2> (const Array1& array1, const Array2& array2)
```

--------------------------------

### JavaScript API for Cmajor Custom Test Functions

Source: https://cmajor.dev/docs/TestFileFormat

This section details the JavaScript API available for developers to write custom test functions within the Cmajor test framework. It includes the `TestSection` class, which provides methods for logging, reporting test outcomes (success, failure, disabled, unsupported), handling compiler errors, managing stream and event data, updating test headers, and resolving file paths. It also lists global utility functions.

```APIDOC
// A TestSection object provides functions that the current test can call. You get
// this object by calling the global function getCurrentTestSection()

class TestSection
{
    // logs a message to the console
    logMessage (message)

    // adds a failure to the test results, with a message
    reportFail (message)
    // adds a success to the test results, with a message
    reportSuccess (message)
    // adds a disabled test to the results, with a message
    reportDisabled (message)
    // notes that a test is unsupported on the current platform
    reportUnsupported (message)
    // logs an internal compiler error
    logCompilerError (error)

    // writes some stream data to a wav file
    writeStreamData (filename, streamData)
    // writes some event data to a JSON file
    writeEventData (filename, eventData)
    // reads some stream data from a wav file
    readStreamData (filename)
    // reads some event data from a JSON file
    readEventData (filename)

    // replaces the text of the current test invocation line with a new string
    updateTestHeader (newHeaderText)

    // converts a relative path from the test file to an absolute system path
    getAbsolutePath (relativePath)
}

function getCurrentTestSection()
function getDefaultEngineOptions()
function getEngineName()
```

--------------------------------

### Adding Delay to Cmajor Graph Connections

Source: https://cmajor.dev/docs/LanguageReference

This snippet demonstrates the syntax for inserting a fixed frame delay between two endpoints in a Cmajor graph connection. Delays can be applied to streams, events, and values.

```Cmajor
connection mySource -> [100] -> myDest; // this adds a 100 frame delay between these two endpoints
```

--------------------------------

### APIDOC: `processor.latency` Property

Source: https://cmajor.dev/docs/LanguageReference

Documentation for the special `processor.latency` property, which allows processors to declare their internal signal delay. This property is crucial for the system's Automatic Delay Compensation (ADC) mechanism, ensuring all audio streams and events remain synchronized across a graph.

```APIDOC
processor.latency: integer
  Description: Represents the fixed, compile-time latency of a processor.
  Type: integer
  Units: frames
  Constraints:
    - Must be a compile-time constant.
    - Cannot change dynamically.
  Usage:
    - Set within a processor definition (e.g., `processor.latency = 1000;`).
    - Can be read as a constant anywhere within the processor's scope.
  System Behavior (Automatic Delay Compensation):
    - The system uses this value to automatically insert delays in other signal chains within a graph to compensate for latency differences, ensuring all events and streams remain in-sync (similar to PDC in DAWs).
```

--------------------------------

### std::filters::butterworth API

Source: https://cmajor.dev/docs/StandardLibrary

API for the Butterworth filter, built from cascaded TPT filters. It supports runtime modulation of type and frequency, and includes internal state, configuration, processing, and processor interface.

```APIDOC
namespace std::filters::butterworth (int32 order = 2)
  Description: Butterworth filter, built from cascaded tpt filters.
               The order is set at compile time, but the type and frequency can be modulated at runtime.

  Structs:
    struct Implementation
      Members:
        tpt::onepole::Implementation onePole
        tpt::svf::Implementation[order / 2] twoPole

  Functions:
    Implementation create (int32 mode, float64 processorFrequency, float64 filterFrequency)
    void setMode (Implementation& this, int32 mode)
    void setFrequency (Implementation& this, float64 processorFrequency, float64 filterFrequency)
    void reset (Implementation& this)
    FrameType process (Implementation& this, FrameType x)

  Processor: std::filters::butterworth::Processor (int32 initialMode = Mode::lowPass, float32 initialFrequency = defaultFrequency)
    Endpoints:
      output stream out (FrameType)
      input stream in (FrameType)
      input event mode (int32)
      input event frequency (float32)
    Variables:
      filter
      bool updateFilter = true
      float32 filterFrequency
      int32 filterMode
    Functions:
      event mode (int32 m)
      event frequency (float32 f)
      void main()
      void reset()
```

--------------------------------

### Value Wrapping: wrap (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Wraps a value to fit within a specified range, using a negative-aware modulo operation. If the size of the range is zero, the function returns zero.

```APIDOC
T wrap<T> (T value, T size)
```

```APIDOC
int32 wrap (int32 value, int32 size)
```

--------------------------------

### Reinterpret Integer to Float: reinterpretIntToFloat (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Reinterprets the bits of an integer as a floating-point value of corresponding bit-width. This is useful for constructing floating-point numbers from their raw bit representations.

```APIDOC
float32 reinterpretIntToFloat (int32 value)
```

```APIDOC
float64 reinterpretIntToFloat (int64 value)
```

--------------------------------

### Cmaj Null/Zero Value Literal Assignment

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the use of empty parentheses `()` in Cmaj to represent null or zero values. This syntax can initialize arrays with zeros, reset struct members to their default zero/null states, clear slices, and set numeric types to zero, which is particularly useful for generic code.

```Cmaj
var x = int[5](); // creates an array of 5 zeros
x = (); // sets all 5 elements of x to 0

var y = MyStruct(1, "hello", 3); // creates an object of type MyStruct.
y = ();   // resets all elements of the object to zero or null values

int[] slice = (1, 2, 3); // creates a slice with 3 elements
slice = ();  // resets the variable to be an empty slice with size 0

float64 i = 123.0;
i = (); // this syntax works for numeric types too, which can be useful in generic code
```

--------------------------------

### Cmajor Intrinsic Trigonometric Functions

Source: https://cmajor.dev/docs/LanguageReference

Details the trigonometric functions available in the Cmajor standard library, including `sin()`, `cos()`, `tan()`, and their hyperbolic and inverse counterparts, along with `atan2()`.

```APIDOC
Trig Functions:
  sin(): Sine of an angle
  sinh(): Hyperbolic sine of an angle
  asin(): Arc sine (inverse sine) of an angle
  asinh(): Arc hyperbolic sine
  cos(): Cosine of an angle
  cosh(): Hyperbolic cosine of an angle
  acos(): Arc cosine (inverse cosine) of an angle
  acosh(): Arc hyperbolic cosine
  tan(): Tangent of an angle
  tanh(): Hyperbolic tangent of an angle
  atan(): Arc tangent (inverse tangent) of x
  atanh(): Arc hyperbolic tangent
  atan2(): Arc tangent of y/x
```

--------------------------------

### Cmaj Static Assertions: Validating Parameterized Types

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the use of `static_assert` within Cmaj parameterized processors. This feature allows for compile-time validation of input types and values, providing helpful error messages if a caller attempts to use unsuitable parameters, ensuring type safety and correct usage.

```Cmaj
processor P (using T, int i)
{
    static_assert (T.isFloat || T.isVector, "T must be a float or vector type!");
    static_assert (i >= 0 && i < 100, "i is out of range!");


```

--------------------------------

### Reinterpret Float to Integer: reinterpretFloatToInt (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Reinterprets the raw bits of a floating-point value as an integer of corresponding bit-width. This allows for low-level manipulation of floating-point representations.

```APIDOC
int32 reinterpretFloatToInt (float32 value)
```

```APIDOC
int64 reinterpretFloatToInt (float64 value)
```

--------------------------------

### Define Cmajor Processor with Output Streams

Source: https://cmajor.dev/docs/LanguageReference

Illustrates the basic definition of a Cmajor processor named `MyChildProcessor` with two output stream endpoints, `out1` and `out2`. This processor serves as a child node within a larger graph structure.

```Cmajor
processor MyChildProcessor
{
    output stream int out1, out2;

    ...etc...
}
```

--------------------------------

### C Major std::oscillators::Phasor Processor

Source: https://cmajor.dev/docs/StandardLibrary

A C Major processor for generating a unipolar ramp, with an input to control its frequency. It supports various `FrameType`s like float or float vectors.

```APIDOC
processor std::oscillators::Phasor:
  Constructor: (using FrameType, initialFrequency: float32 = 1000)
  Description: A processor which generates a unipolar ramp, and has an input to control its frequency. The FrameType parameter could be a float or a float vector.
  Endpoints:
    output: stream out (FrameType)
    input: event frequencyIn (float32)
  Variables:
    phasor: PhasorState
  Functions:
    init(): void
    frequencyIn(newFrequency: float32): event
    main(): void
```

--------------------------------

### Implement Cmajor Graph Event Handler

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to define an event handler within a Cmajor graph. Graph event handlers are more limited than processor handlers due to the restriction that graphs do not contain state. However, they can still perform useful work such as filtering what is forwarded or scaling values before outputting them.

```Cmajor
graph G
{
    input event float paramIn;
    output event float filteredOut;
    output value float scaledOutput;

    event paramIn (float f)
    {
        // Only send some param values through
        if (f > 0.5)
            filteredOut <- f;

        // Scale the normalised parameter to the range 10 .. 100
        scaledOutput <- 10.0f + (90.0f * f);
    }
}
```

--------------------------------

### Natural Logarithm: log (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the natural logarithm (base e) of a scalar floating point argument. This function is the inverse of the exp function.

```APIDOC
T log<T> (T n)
```

--------------------------------

### JavaScript Global Timer Functions

Source: https://cmajor.dev/docs/ScriptFileFormat

These functions are part of the global scope in JavaScript environments (browsers, Node.js) and are used for scheduling the execution of a function after a specified delay or at regular intervals, and for clearing such scheduled tasks.

```JavaScript
function setInterval (callback, milliseconds)
function setTimeout (callback, milliseconds)
function clearInterval (timerID)
```

--------------------------------

### Cmajor Multi-Dimensional Array Declaration (Nested Brackets)

Source: https://cmajor.dev/docs/LanguageReference

Shows an alternative syntax for declaring multi-dimensional arrays in Cmajor using nested square brackets, which is functionally equivalent to the comma-separated syntax. It also illustrates flexible element access using mixed indexing styles.

```Cmajor
int[5][4][3] x;  // same as int[3, 4, 5]

x[1][2][3] = 99;   // same as x[1, 2, 3]
x[1, 2][3] = 99;   // same as x[1, 2, 3]
x[1][2, 3] = 99;   // same as x[1, 2, 3]
```

--------------------------------

### Exponentiation: exp (Complex) (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the exponent of a complex number. This computes e (Euler's number) raised to the power of the complex number 'n'.

```APIDOC
complex32 exp (complex32 n)
```

```APIDOC
complex64 exp (complex64 n)
```

--------------------------------

### std::filters::tpt::svf::Mode Constants

Source: https://cmajor.dev/docs/StandardLibrary

Defines constants for different modes of the tpt::svf filter, such as low-pass, high-pass, and band-pass.

```APIDOC
namespace std::filters::tpt::svf::Mode
  Constants:
    int32 lowPass = 0
    int32 highPass = 1
    int32 bandPass = 2
```

--------------------------------

### Cmajor std::noise::Pink Processor

Source: https://cmajor.dev/docs/StandardLibrary

Pink noise generator that outputs a float32 stream. It utilizes an internal RNG, an array for values, a sample counter, and a last level variable to generate pink noise.

```APIDOC
processor std::noise::Pink
  Endpoints:
    output stream out (float32)
  Variables:
    RNG rng
    float32[12] values
    int32 sampleCount
    float32 lastLevel
  Functions:
    void init()
    void main()
```

--------------------------------

### Exponentiation: exp (Scalar) (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the exponent of a scalar floating-point argument. This computes e (Euler's number) raised to the power of 'n'.

```APIDOC
T exp<T> (T n)
```

--------------------------------

### Cmaj Compile-Time Conditional `if const` Syntax

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the `if const` construct in Cmaj, which enables compile-time conditional parsing of code blocks based on type properties. This is particularly useful within generic functions to handle different types efficiently.

```Cmaj
void genericFunction<Type> (Type x)
{
    if const (x.isArray)
        doSomething (x[1]);  // this code will only parsed if x is an array
    else if const (x.isFloat)
        doSomething (x + 3.5f);   // this code will only be parsed if x is a float
}
```

--------------------------------

### Floating Point Modulo: fmod (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the floating point modulo operation of its arguments. This function follows the same rules as the standard C/C++ std::fmod() function, computing the remainder of x/y with the same sign as x.

```APIDOC
T fmod<T> (T x, T y)
```

--------------------------------

### Modulo Addition: addModulo2Pi (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Adds two floating-point values together, returning the result modulo 2*Pi. This operation is commonly used for tasks such as incrementing the phase of an oscillator, ensuring the result remains within a 0 to 2*Pi range.

```APIDOC
T addModulo2Pi<T> (T startValue, T valueToAdd)
```

--------------------------------

### Cmajor Struct: NoteOff Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a 'NoteOff' event in Cmajor, used to signal the end of a musical note. It includes a channel ID to associate with the corresponding NoteOn, the pitch, and the release velocity (0-1).

```APIDOC
struct NoteOff
  channel: int32 (This channel ID can be used to associate this NoteOff event with the earlier NoteOn to which it applies.)
  pitch: float32 (You may not care exactly what the pitch is when a note is released, but in case it's needed, it's included here.)
  velocity: float32 (Indicates how quickly the key was released: range is 0 to 1.)
```

--------------------------------

### Cmaj Parameterized Graphs: Defining Default Values

Source: https://cmajor.dev/docs/LanguageReference

Shows how to assign default values to trailing parameters in Cmaj graph declarations. This allows for more flexible instantiation, where parameters with defaults can be omitted if the default value is desired.

```Cmaj
graph G (int v = 100, processor P = MyProcessor)
{


```

--------------------------------

### Check for Infinity: isinf (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Checks whether the supplied argument is a floating point positive or negative infinity (INF). This is useful for validating numerical computations.

```APIDOC
bool isinf<FloatType> (FloatType value)
```

--------------------------------

### Cmaj Script Error Handling Functions (JavaScript API)

Source: https://cmajor.dev/docs/ScriptFileFormat

Helper functions provided in the Cmaj JavaScript bindings to identify and describe errors or warnings returned by Cmajor operations. These functions assist in handling complex error objects rather than simple strings.

```APIDOC
function isErrorOrWarning (response)
function isError (response)
function getErrorDescription (error) // converts an error object to a string description
function printError (error)
```

--------------------------------

### Check Any True: anyTrue (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Takes a vector or array of boolean values and returns true if any of its elements are true. This is a convenient way to check for the existence of at least one true value.

```APIDOC
bool anyTrue<BoolArray> (BoolArray boolArray)
```

--------------------------------

### Cmajor std::noise::White Processor

Source: https://cmajor.dev/docs/StandardLibrary

Simple white noise generator that outputs a float32 stream. It includes an internal Random Number Generator (RNG) and standard initialization and main processing functions.

```APIDOC
processor std::noise::White
  Endpoints:
    output stream out (float32)
  Variables:
    RNG rng
  Functions:
    void init()
    void main()
```

--------------------------------

### Find Oldest Voice Index (findOldestIndex)

Source: https://cmajor.dev/docs/StandardLibrary

Locates and returns the index of the oldest active voice, useful for voice stealing or resource management.

```APIDOC
findOldestIndex() -> wrap<numVoices>
  (No parameters)
```

--------------------------------

### Cmajor Member Function Definition Styles

Source: https://cmajor.dev/docs/LanguageReference

Presents two equivalent ways to define member functions for structs in Cmajor. The first method defines the function directly inside the struct, using 'this' to refer to the object. The second defines it as a free function where the struct is its first argument.

```Cmajor
struct Thing
{
    float a, b;

    // You can declare a function inside the struct, and use the
    // special variable 'this' to  refer to  the object.
    // Note that the 'const' keyword optionally can be appended in the
    // same way as C++ to allow the member to be called on a const object.
    float getBiggest() const   { return max (this.a, this.b); }
}
```

```Cmajor
struct Thing
{
    float a, b;
}

// Any function which takes a struct as its first argument is treated as
// a member function.
float getBiggest (const Thing& t)    { return max (t.a, t.b); }
```

--------------------------------

### Declaring and Using Processor Latency in Cmajor

Source: https://cmajor.dev/docs/LanguageReference

This Cmajor code snippet illustrates how to declare a fixed, compile-time latency for a processor using the `processor.latency` property. It also shows that this property can be read as a constant anywhere within the processor's scope, typically for buffer sizing or other internal logic.

```Cmajor
processor P
{
    output stream float<2> output;
    input stream float<2> input;

    // Set a value for processor.latency alongside your other processor state variables.
    // It must be a compile-time constant, and cannot change dynamically.
    // The units are frames.
    processor.latency = 1000;

    void main()
    {
        float[processor.latency + 100] x;  // the property can also be read as
                                           // a constant anywhere in the processor

       // ...etc
    }
}
```

--------------------------------

### Cmajor Struct: PitchBend Event Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the structure for a 'PitchBend' event in Cmajor, used to apply a pitch bend to an active note. It includes a channel ID for association and the bend amount in semitones relative to the original note-on pitch.

```APIDOC
struct PitchBend
  channel: int32 (This channel ID can be used to associate this event with the earlier NoteOn to which it applies.)
  bendSemitones: float32 (The number of semitones to bend up from the original note-on pitch.)
```

--------------------------------

### Cmajor Multi-Dimensional Array Declaration (Comma-separated)

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the primary syntax for declaring multi-dimensional arrays in Cmajor. Sizes for each dimension are specified as a comma-separated list within a single set of square brackets.

```Cmajor
int[3, 4, 5] x;

x[1, 2, 3] = 99;
```

--------------------------------

### Cmajor std::mixers::ConstantSum Processor

Source: https://cmajor.dev/docs/StandardLibrary

Processor that takes two input streams and adds them together after applying optional constant gains. FrameType can be a float or float vector type.

```APIDOC
processor std::mixers::ConstantSum (using FrameType,
 float32 inputGain1 = 1.0f,
 float32 inputGain2 = 1.0f)
  Endpoints:
    output stream out (FrameType)
    input stream in1 (FrameType)
    input stream in2 (FrameType)
  Functions:
    void main()
```

--------------------------------

### Array Element Read: read (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns an element from an array at a specified index. The index can be an integer or a float, with float indices being rounded down. If the index is out of bounds, it will be wrapped to fit within the array's range.

```APIDOC
Array.elementType read<Array, IndexType> (const Array& array, IndexType index)
```

--------------------------------

### Cmaj Ternary Operator with Short-Circuiting

Source: https://cmajor.dev/docs/LanguageReference

Shows the Cmaj ternary operator for concise conditional assignments. It operates with short-circuiting semantics, meaning only the code for the chosen branch (true or false) is executed, optimizing performance.

```Cmaj
let x = b ? getValueIfTrue() : getValueIfFalse();
```

--------------------------------

### Cmajor std::mixers::DynamicSum Processor

Source: https://cmajor.dev/docs/StandardLibrary

Processor that takes two input streams and two gain streams, using the gain streams to attenuate the inputs before summing and emitting the result. FrameType can be a float or float vector type.

```APIDOC
processor std::mixers::DynamicSum (using FrameType)
  Endpoints:
    output stream out (FrameType)
    input stream in1 (FrameType)
    input stream in2 (FrameType)
    input stream gain1 (float32)
    input stream gain2 (float32)
  Functions:
    void main()
```

--------------------------------

### Cmajor Struct: PhasorState Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the `PhasorState` struct, part of the `std.oscillators` namespace, which manages a phase and increment that loops between 0 and 1. This namespace provides utility functions and processors for various oscillator types like sine, square, triangle, and sawtooth.

```APIDOC
struct PhasorState
  phase: float32
  increment: float32
```

--------------------------------

### Hoist Deeply-Nested Child Endpoints in Cmajor Graph

Source: https://cmajor.dev/docs/LanguageReference

Shows how to directly hoist endpoints from deeply-nested child nodes within sub-graphs, bypassing the need to explicitly declare or connect them at intermediate levels. This allows for direct exposure of deeply embedded endpoints.

```Cmajor
graph Parent
{
    input childNode.otherChild.yetAnotherLevel.*;
}
```

--------------------------------

### Round to Integer: roundToInt (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the nearest integer to a floating point value. This function provides overloaded versions for both 32-bit and 64-bit floating point inputs.

```APIDOC
int32 roundToInt (float32 value)
```

```APIDOC
int64 roundToInt (float64 value)
```

--------------------------------

### Array Summation: sum (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Calculates the sum of all elements in a vector or array. The return type matches the element type of the array.

```APIDOC
ArrayType.elementType sum<ArrayType> (const ArrayType array)
```

--------------------------------

### Compare Values: max (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Compares two scalar or vector values and returns the maximum. For vector operands, this function returns a vector of results for each element.

```APIDOC
T max<T> (T v1, T v2)
```

--------------------------------

### Auto-Updated `expectError` Directive with Error Message

Source: https://cmajor.dev/docs/TestFileFormat

This snippet demonstrates the `expectError` directive after the test tool has automatically updated it. The expected error message, including line and column information, is inserted as an argument, reflecting the actual outcome of the test.

```Cmajor
## expectError ("2:9: error: Cannot find symbol 'XX'")

void f (XX& x) {}
```

--------------------------------

### Cmajor Single-Dimensional Array Declaration

Source: https://cmajor.dev/docs/LanguageReference

Demonstrates the basic syntax for declaring single-dimensional arrays in Cmajor. Arrays are declared with a fixed size as part of their type, using square brackets after the element type.

```Cmajor
int[3] x;       // an array of 3 integers
float64[6] y;   // an array of 6 64-bit floats
MyStruct[4] z;  // an array of 4 'MyStruct' objects
```

--------------------------------

### Base-10 Logarithm: log10 (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the base-10 logarithm of a scalar floating point argument. This function is commonly used in decibel calculations and other base-10 logarithmic scales.

```APIDOC
T log10<T> (T n)
```

--------------------------------

### Floor Function: floor (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the largest integer not greater than the argument. This function follows the same rules as the standard C/C++ std::floor() function, effectively rounding down to the nearest integer.

```APIDOC
T floor<T> (T n)
```

--------------------------------

### Cmajor Mutable vs. Constant Slices

Source: https://cmajor.dev/docs/LanguageReference

This snippet differentiates between mutable and constant slices in Cmajor. It shows that mutable slices allow modification of the underlying array's elements and can be reassigned to new ranges, while constant slices prevent both element modification and reference updates. An error case for creating a mutable slice from a constant array is also demonstrated.

```Cmajor
int[4] originalArray = (1, 2, 3, 4);
const int[4] constArray = (1, 2, 3, 4);
int[] slice = originalArray;                // Creates a mutable slice
const int[] constSlice = originalArray;     // Creates a const slice of the array
int[] sliceOfConst = constArray;            // error - cannot create a mutable slice of a constant array

slice[2] = 10;                              // originalArray now contains (1, 2, 10, 4)
slice = originalArray[2:];                  // Update slice to point to new part of originalArray
slice[2] = 20;                              // originalArray now contains (1, 2, 10, 20)
slice[0:3] = 0;                             // originalArray now contains (0, 0, 10, 20)
slice[:] = 1;                               // originalArray now contains (1, 1, 1, 1)

constSlice[2] = 20;                         // error - cannot modify elements of a const slice
constSlice = originalArray[2:];             // error - cannot update the const slice reference
```

--------------------------------

### Floating Point Remainder: remainder (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the floating point remainder of its arguments. This function follows the same rules as the standard C/C++ std::remainder() function, computing the remainder of x/y as specified by IEEE 754.

```APIDOC
T remainder<T> (T x, T y)
```

--------------------------------

### Declaring Oversampled and Undersampled Cmajor Graph Nodes

Source: https://cmajor.dev/docs/LanguageReference

This snippet shows how to declare a node in a Cmajor graph that runs at a higher (oversampled) or lower (undersampled) frequency than its parent graph. Connections to such nodes will have their data automatically resampled.

```Cmajor
// To declare a node that runs at a multiple of the parent frequency, use the multiply/divide operators:
node myOversampledNode = MyProcessor * 4; // 4x oversampling
node myUndersampledNode = MyProcessor / 2; // 2x undersampling
```

--------------------------------

### Cmajor std::noise::Brown Processor

Source: https://cmajor.dev/docs/StandardLibrary

Brown (Brownian) noise generator that outputs a float32 stream. It manages internal state with an RNG, last level, filter, and scale variables to produce the characteristic noise.

```APIDOC
processor std::noise::Brown
  Endpoints:
    output stream out (float32)
  Variables:
    RNG rng
    float32 lastLevel
    float32 filter = 0.998f
    float32 scale = 32.0f
  Functions:
    void init()
    void main()
```

--------------------------------

### Cmajor: std::midi::Message Struct Definition

Source: https://cmajor.dev/docs/StandardLibrary

Defines the `Message` struct within the `std::midi` namespace, designed to hold a short (3-byte) MIDI message. The internal `message` member is an `int32` with packed bytes arranged for natural hexadecimal viewing during debugging.

```APIDOC
namespace std::midi

struct Message
Type | Member | Comment
int32 message | This contains 3 packed bytes, arranged as (byte2 | (byte1 << 8) | (byte0 << 16)). This layout means that when you view the value in hex in your debugger, it reads in the natural order for a MIDI message.
```

--------------------------------

### Define Cmajor Event Handler for Single Type

Source: https://cmajor.dev/docs/LanguageReference

Illustrates how to define an event handler function within a Cmajor processor for a specific input event type. The handler's name and type signature must precisely match those of the declared input event endpoint to ensure proper dispatching of incoming event values.

```Cmajor
processor P
{
    input event float<2> myInput;

    // when declaring an event handler, the name and type must match that of the endpoint.
    event myInput (float<2> e)
    {
        // do something here with the incoming event value e
    }
}
```

--------------------------------

### std::filters::butterworth::Mode Constants

Source: https://cmajor.dev/docs/StandardLibrary

Defines constants for different modes of the Butterworth filter, such as low-pass and high-pass.

```APIDOC
namespace std::filters::butterworth::Mode
  Constants:
    int32 lowPass = 0
    int32 highPass = 1
```

--------------------------------

### Check for Not-a-Number: isnan (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Checks whether the supplied argument is a floating point Not-a-Number (NaN). This is crucial for error handling and validating numerical results.

```APIDOC
bool isnan<FloatType> (FloatType value)
```

--------------------------------

### Check Channel Sustain Status (isSustainActive)

Source: https://cmajor.dev/docs/StandardLibrary

Determines if sustain is currently active for a specified channel. This function assumes channel IDs are less than 64.

```APIDOC
isSustainActive(channel: int32) -> bool
  channel: The channel ID to check for sustain activity.
```

--------------------------------

### Round to Nearest Integer: rint (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Rounds the argument to an integer value. This function follows the same rules as the standard C/C++ std::rint() function, rounding to the nearest integer using current rounding mode.

```APIDOC
T rint<T> (T n)
```

--------------------------------

### Square Root: sqrt (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the square root of its argument. This function is applicable to various numeric types.

```APIDOC
T sqrt<T> (T n)
```

--------------------------------

### Set Channel Sustain Status (setChannelSustain)

Source: https://cmajor.dev/docs/StandardLibrary

Sets the sustain active state for a given channel, enabling or disabling sustain functionality.

```APIDOC
setChannelSustain(channel: int32, active: bool) -> void
  channel: The channel ID for which to set sustain.
  active: A boolean indicating whether sustain should be active (true) or inactive (false).
```

--------------------------------

### Linear Interpolated Array Read: readLinearInterpolated (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Linearly interpolates a value at a floating-point position within an array. The array must contain floating-point or vector float values. The function interpolates between adjacent elements, and if the index is out of bounds, it will be wrapped.

```APIDOC
Array.elementType readLinearInterpolated<Array, IndexType> (const Array& array, IndexType index)
```

--------------------------------

### Absolute Value: abs (Cmajor APIDOC)

Source: https://cmajor.dev/docs/StandardLibrary

Returns the absolute value of a scalar or vector value. For vector types, this operation is applied element-wise.

```APIDOC
T abs<T> (T n)
```

--------------------------------

### Cmajor Multi-Dimensional Array Sub-Array Access

Source: https://cmajor.dev/docs/LanguageReference

Explains how to access inner dimensions of multi-dimensional arrays as sub-arrays by providing fewer indices than the total number of dimensions. This allows for working with slices or views of higher-dimensional arrays, where the resulting sub-array retains its remaining dimensions.

```Cmajor
int[3, 4, 5] x;

let y = x[1];     // the type of y is int[4, 5]
let z = x[1, 2];  // the type of z is int[5];
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.