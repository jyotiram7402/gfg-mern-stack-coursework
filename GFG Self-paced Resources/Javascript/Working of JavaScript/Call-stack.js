/**
 * ============================================================================
 *                        THE CALL STACK IN JAVASCRIPT
 * ============================================================================
 *
 * Theory & diagrams:  Call-stack.md
 *
 * The Call Stack is a LIFO structure the engine uses to track which execution
 * context is running. Push on every call, pop on every return.
 * Run it with:  node Call-stack.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: Push / pop order with nested calls
// ---------------------------------------------------------------------------
// Watch the "enter" logs go down (pushing) and "exit" logs come back up
// (popping) — proof of LIFO: b is pushed last and popped first.

console.log("DEMO 1 — Push / pop (LIFO) order");

function a() {
  console.log("  enter a()   → stack: [a, GEC]");
  b();
  console.log("  exit  a()");
}
function b() {
  console.log("  enter b()   → stack: [b, a, GEC]");
  console.log("  exit  b()   → b popped");
}

a();
console.log("  done (back in GEC)");
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: console.trace prints the actual live Call Stack
// ---------------------------------------------------------------------------
// The trace lists frames top → bottom: third, second, first, then module.

console.log("DEMO 2 — See the real stack with console.trace");

function first()  { second(); }
function second() { third(); }
function third()  { console.trace("  STACK (top → bottom)"); }

first();
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: Recursion that pops correctly (has a base case)
// ---------------------------------------------------------------------------
// Each call pushes a frame; hitting the base case lets them return & pop.

console.log("DEMO 3 — Healthy recursion (base case lets frames pop)");

function factorial(n) {
  if (n <= 1) return 1;       // base case → starts popping the stack
  return n * factorial(n - 1); // each call pushes a new frame
}
console.log("  factorial(5) =", factorial(5)); // 120
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: Stack Overflow — no base case
// ---------------------------------------------------------------------------
// Frames keep getting pushed and never pop until the stack is full.

console.log("DEMO 4 — Stack overflow (caught)");

function recurse() {
  return recurse(); // never returns → stack keeps growing
}
try {
  recurse();
} catch (err) {
  console.log("  caught:", err.constructor.name + ":", err.message);
}
console.log("------------------------------------------");

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - Call Stack is LIFO: push on call, pop on return.
 *  - The engine always runs the TOP frame; GEC sits at the bottom.
 *  - One stack only → single-threaded.
 *  - Too-deep recursion → RangeError: Maximum call stack size exceeded.
 * ============================================================================
 */
