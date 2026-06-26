/**
 * ============================================================================
 *                       HOW JAVASCRIPT EXECUTES CODE
 * ============================================================================
 *
 * Theory & diagrams:  How-JS-executes-code.md
 *
 * This file traces, with live output, what the engine does step by step:
 *   1. Creates the Global Execution Context (GEC).
 *   2. Phase 1 — Memory Creation (hoisting).
 *   3. Phase 2 — Code Execution (line by line, function calls push/pop the
 *      Call Stack).
 * Run it with:  node How-JS-executes-code.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: The classic two-phase walkthrough (square example)
// ---------------------------------------------------------------------------
// PHASE 1 (memory): n=undefined, square=<function>, square2=undefined,
//                   square4=undefined
// PHASE 2 (execution): values filled in, square() invoked twice.

console.log("DEMO 1 — Two-phase execution");

var n = 2;

function square(num) {
  // Each call creates a NEW Function Execution Context:
  //   Phase 1 inside: num=undefined, ans=undefined
  //   Phase 2 inside: num=<arg>, ans=num*num
  var ans = num * num;
  return ans; // returning here POPS this context off the call stack
}

var square2 = square(n); // push square EC, run, pop
var square4 = square(4); // push square EC again, run, pop

console.log("square2 =", square2); // 4
console.log("square4 =", square4); // 16
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: Visualising the Call Stack with console.trace + nested calls
// ---------------------------------------------------------------------------
// Each function pushes a frame onto the call stack. console.trace prints the
// current stack, so you can SEE the LIFO ordering: third -> second -> first.

console.log("DEMO 2 — Watch the Call Stack grow (nested calls)");

function first() {
  console.log("  enter first()");
  second();
  console.log("  exit  first()");
}
function second() {
  console.log("  enter second()");
  third();
  console.log("  exit  second()");
}
function third() {
  console.log("  enter third()  → current call stack:");
  console.trace("  STACK"); // prints third → second → first → (module)
}

first();
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: Synchronous & single-threaded — code BLOCKS the stack
// ---------------------------------------------------------------------------
// A long loop holds the single call stack; nothing else runs until it ends.
// This proves execution is one-line-at-a-time and in order.

console.log("DEMO 3 — Single-threaded / synchronous (blocking)");

console.log("  start blocking work...");
let total = 0;
for (let i = 0; i < 1e7; i++) {
  total += i;
}
console.log("  finished blocking work. total =", total);
console.log("  this line only runs AFTER the loop above completes");
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: Order proof — sync runs before any async callback
// ---------------------------------------------------------------------------
// setTimeout(...0) does NOT run immediately. The synchronous code finishes
// (GEC stack empties) before the runtime hands the callback back to the stack.

console.log("DEMO 4 — Sync first, async later");

console.log("  (1) synchronous line A");
setTimeout(() => console.log("  (3) async callback — runs LAST"), 0);
console.log("  (2) synchronous line B");
// Expected order: (1), (2), then (3) — even with a 0ms timer.

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - Program run → Global EC pushed to the Call Stack.
 *  - Two phases per context: Memory Creation (hoisting) → Code Execution.
 *  - Each function call → new Function EC pushed; `return` pops it.
 *  - Call Stack is LIFO and there is only ONE (single-threaded).
 *  - Synchronous code blocks; async callbacks run only after the stack clears.
 * ============================================================================
 */
