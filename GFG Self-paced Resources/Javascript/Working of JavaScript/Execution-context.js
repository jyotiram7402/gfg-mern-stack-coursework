/**
 * ============================================================================
 *                  JAVASCRIPT EXECUTION CONTEXT — COMPLETE GUIDE
 * ============================================================================
 *
 * Everything in JavaScript happens inside an "Execution Context" (EC).
 * Think of it as a sealed box / environment in which a piece of JS code is
 * evaluated and executed. It holds the variables, functions, the value of
 * `this`, and references to the outer (lexical) environment.
 *
 * ----------------------------------------------------------------------------
 * 1. THE TWO COMPONENTS OF AN EXECUTION CONTEXT
 * ----------------------------------------------------------------------------
 *
 *   +-------------------------------------------------------------+
 *   |                    EXECUTION CONTEXT                        |
 *   |                                                             |
 *   |   +-----------------------------+   +-------------------+   |
 *   |   |   MEMORY COMPONENT          |   |   CODE COMPONENT  |   |
 *   |   |  (Variable Environment)     |   | (Thread of        |   |
 *   |   |                             |   |  Execution)       |   |
 *   |   |  - stores variables &       |   |                   |   |
 *   |   |    function declarations    |   | - executes code   |   |
 *   |   |    as key : value pairs     |   |   ONE line at a   |   |
 *   |   |  - this is where HOISTING   |   |   time, in order  |   |
 *   |   |    happens                  |   |                   |   |
 *   |   +-----------------------------+   +-------------------+   |
 *   +-------------------------------------------------------------+
 *
 *   JavaScript is SYNCHRONOUS and SINGLE-THREADED:
 *     - Single-threaded : one command at a time.
 *     - Synchronous      : in a specific order, only moving to the next line
 *                          once the current one finishes.
 *
 * ----------------------------------------------------------------------------
 * 2. THE TWO PHASES OF EXECUTION
 * ----------------------------------------------------------------------------
 *
 *   When any execution context is created, it runs in TWO phases:
 *
 *   PHASE 1 — CREATION / MEMORY PHASE ("hoisting")
 *     - JS scans the code and allocates memory to all variables & functions.
 *     - Variables declared with `var`     -> initialised to `undefined`.
 *     - Variables declared with `let/const` -> allocated but UNINITIALISED
 *                                              (Temporal Dead Zone).
 *     - Function declarations             -> the WHOLE function is stored.
 *
 *   PHASE 2 — EXECUTION / CODE PHASE
 *     - Code runs line by line.
 *     - Values are assigned to variables, functions are invoked, etc.
 *     - Each function invocation creates a BRAND NEW execution context.
 *
 * ----------------------------------------------------------------------------
 * 3. TYPES OF EXECUTION CONTEXT
 * ----------------------------------------------------------------------------
 *
 *   a) GLOBAL EXECUTION CONTEXT (GEC)
 *      - Created by default when the script first runs.
 *      - There is only ONE per program.
 *      - Creates the global object (`window` in browsers, `global`/`globalThis`
 *        in Node) and sets `this` to point to it.
 *
 *   b) FUNCTION EXECUTION CONTEXT (FEC)
 *      - Created EVERY time a function is invoked.
 *      - Has its own memory, code component, `this`, and `arguments` object.
 *
 *   c) EVAL EXECUTION CONTEXT
 *      - Created inside an eval() call. Rarely used; avoid eval().
 *
 * ----------------------------------------------------------------------------
 * 4. THE CALL STACK (Execution Context Stack)
 * ----------------------------------------------------------------------------
 *
 *   The Call Stack manages the order of execution contexts. It is a LIFO
 *   (Last In, First Out) structure.
 *
 *     - When the script starts  -> GEC is pushed onto the stack.
 *     - When a function is called -> its FEC is pushed on TOP.
 *     - When a function returns   -> its FEC is POPPED off.
 *     - When the script ends      -> GEC is popped, stack is empty.
 *
 *   Also known as: Program Stack, Control Stack, Runtime Stack, Machine Stack.
 *
 *   Example trace for the code at the bottom of this file:
 *
 *      step 1            step 2              step 3            step 4
 *   +----------+      +----------+        +----------+      +----------+
 *   |          |      | square() |        | square() |      |          |
 *   |          |      |          |  --->  |  (pop)   | ---> |          |
 *   |   GEC    |      |   GEC    |        |   GEC    |      |   GEC    |
 *   +----------+      +----------+        +----------+      +----------+
 *   script start     square() called     square returns    next line
 *
 * ============================================================================
 *                          RUNNABLE DEMONSTRATIONS
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: Hoisting — proving the two phases exist
// ---------------------------------------------------------------------------
// During the CREATION phase, `x` is set to undefined and the whole function
// `getName` is stored. So we can use them "before" their line in the code.

console.log("DEMO 1 — Hoisting");
console.log(x);        // undefined  (var hoisted, not yet assigned)
getName();             // "Hello from getName"  (function fully hoisted)

var x = 7;

function getName() {
  console.log("Hello from getName");
}

console.log(x);        // 7  (now assigned during execution phase)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: let / const and the Temporal Dead Zone (TDZ)
// ---------------------------------------------------------------------------
// `y` is hoisted but NOT initialised. Accessing it before its declaration
// throws a ReferenceError. The "gap" between hoisting and declaration is the
// Temporal Dead Zone.

console.log("DEMO 2 — Temporal Dead Zone");
try {
  console.log(y);      // ReferenceError: Cannot access 'y' before initialization
} catch (err) {
  console.log("TDZ error:", err.message);
}
let y = 10;
console.log("y is now:", y);
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: Function Execution Contexts + the Call Stack in action
// ---------------------------------------------------------------------------
// Each call to square() creates a new Function Execution Context that is
// pushed onto the call stack, then popped when it returns its value.

console.log("DEMO 3 — Function Execution Contexts");

var n = 5;

function square(num) {
  // A NEW execution context is created here.
  // Memory phase:  num = undefined, ans = undefined
  // Execution:     num = passed value, ans = num * num
  var ans = num * num;
  return ans;
}

var square2 = square(n);   // FEC #1 pushed, runs, popped
var square4 = square(4);   // FEC #2 pushed, runs, popped

console.log("square of n(5):", square2);  // 25
console.log("square of 4   :", square4);  // 16
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: `this` and the global object
// ---------------------------------------------------------------------------
// In the Global Execution Context, `this` refers to the global object.
//   - Browser : window
//   - Node.js : globalThis (module scope `this` is module.exports, but
//               globalThis is always the true global object)

console.log("DEMO 4 — `this` in the Global Execution Context");
console.log("typeof globalThis:", typeof globalThis);
console.log("------------------------------------------");

/**
 * ============================================================================
 *                            QUICK SUMMARY
 * ============================================================================
 *  - Execution Context = environment where JS code runs (Memory + Code parts).
 *  - GEC is created once; FEC is created on every function call.
 *  - Each EC runs in 2 phases: Creation (hoisting) then Execution.
 *  - The Call Stack tracks which context is currently running (LIFO).
 *  - `var` hoists as undefined; `let`/`const` sit in the Temporal Dead Zone.
 *  - JS is single-threaded & synchronous (the engine itself; async work is
 *    handled by the runtime via the event loop, callback & microtask queues).
 * ============================================================================
 */
