/**
 * ============================================================================
 *                  HOISTING IN JAVASCRIPT — var & function
 * ============================================================================
 *
 * Theory & diagrams:  Hoisting-var-and-function.md
 *
 * Hoisting is a side effect of the Memory Creation phase: names get memory
 * BEFORE any code runs, so you can reference them "early".
 * Run it with:  node Hoisting-var-and-function.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: var is hoisted as `undefined`
// ---------------------------------------------------------------------------
console.log("DEMO 1 — var hoisted as undefined");

console.log("  before:", x); // undefined (memory exists, value not assigned)
var x = 7;
console.log("  after :", x); // 7
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: function declarations are hoisted whole (callable early)
// ---------------------------------------------------------------------------
console.log("DEMO 2 — function declaration hoisted whole");

greet(); // works even though defined below
function greet() {
  console.log("  Hello from greet()!");
}
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: function EXPRESSION — only the var is hoisted (TypeError if early)
// ---------------------------------------------------------------------------
console.log("DEMO 3 — function expression is NOT callable early");

console.log("  typeof greetExpr before assignment:", typeof greetExpr); // undefined
try {
  greetExpr(); // TypeError: greetExpr is not a function
} catch (err) {
  console.log("  caught:", err.constructor.name + ":", err.message);
}
var greetExpr = function () {
  console.log("  I am an expression");
};
greetExpr(); // now works
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: arrow function behaves like an expression
// ---------------------------------------------------------------------------
console.log("DEMO 4 — arrow function = expression behaviour");

console.log("  typeof add before:", typeof add); // undefined
try {
  add(2, 3); // TypeError
} catch (err) {
  console.log("  caught:", err.constructor.name + ":", err.message);
}
var add = (a, b) => a + b;
console.log("  add(2, 3) after:", add(2, 3)); // 5
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: declaration vs expression side by side
// ---------------------------------------------------------------------------
console.log("DEMO 5 — declaration ✅ vs expression ❌ (called early)");

decl(); // ✅
try {
  expr(); // ❌
} catch (err) {
  console.log("  expr error:", err.message);
}

function decl() { console.log("  decl(): I am hoisted whole"); }
var expr = function () { console.log("  expr(): you won't see me early"); };

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - var               → hoisted as undefined (early access = undefined).
 *  - function decl      → hoisted whole (callable before its line).
 *  - function expr/arrow→ only the var hoists; calling early = TypeError.
 *  - let / const        → hoisted but in the Temporal Dead Zone (ReferenceError).
 * ============================================================================
 */
