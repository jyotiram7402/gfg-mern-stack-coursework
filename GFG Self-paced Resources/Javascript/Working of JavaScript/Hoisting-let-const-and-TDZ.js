/**
 * ============================================================================
 *            HOISTING — let, const & the TEMPORAL DEAD ZONE (TDZ)
 * ============================================================================
 *
 * Theory & diagrams:  Hoisting-let-const-and-TDZ.md
 *
 * let/const ARE hoisted, but stay uninitialised in the TDZ until their
 * declaration line. Accessing them early throws ReferenceError.
 * Run it with:  node Hoisting-let-const-and-TDZ.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: var (undefined) vs let (TDZ ReferenceError)
// ---------------------------------------------------------------------------
console.log("DEMO 1 — var returns undefined, let throws (TDZ)");

console.log("  var v before:", v); // undefined
var v = 1;

try {
  console.log(l); // ReferenceError — l is in the TDZ
} catch (err) {
  console.log("  let l before:", err.constructor.name + ":", err.message);
}
let l = 2;
console.log("  let l after :", l); // 2
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: typeof in the TDZ also throws (unlike undeclared vars)
// ---------------------------------------------------------------------------
console.log("DEMO 2 — typeof inside the TDZ throws");

console.log("  typeof undeclaredVar:", typeof undeclaredVar); // "undefined" (safe)
try {
  console.log(typeof tdzVar); // ReferenceError — still in TDZ
} catch (err) {
  console.log("  typeof tdzVar:", err.constructor.name + ":", err.message);
}
let tdzVar = 5;
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: const must be initialised & cannot be re-assigned
// ---------------------------------------------------------------------------
console.log("DEMO 3 — const re-assignment is a TypeError");

const PI = 3.14;
try {
  // PI = 3.15; would throw at runtime; use eval to demonstrate without
  // breaking the whole file's parsing.
  eval("PI = 3.15;");
} catch (err) {
  console.log("  re-assign const:", err.constructor.name + ":", err.message);
}
console.log("  PI stays:", PI); // 3.14
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: const binding is constant, but object contents are mutable
// ---------------------------------------------------------------------------
console.log("DEMO 4 — const object: mutate contents ✅, re-bind ❌");

const arr = [1, 2];
arr.push(3); // ✅ allowed — mutating contents
console.log("  after push:", arr); // [1, 2, 3]
try {
  eval("arr = [9];"); // ❌ re-binding throws
} catch (err) {
  console.log("  re-bind arr:", err.constructor.name + ":", err.message);
}
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: block scope creates a fresh TDZ (shadowing)
// ---------------------------------------------------------------------------
console.log("DEMO 5 — block scope + TDZ (shadowing)");

let x = "outer";
{
  try {
    console.log(x); // ReferenceError — inner x shadows outer & is in TDZ
  } catch (err) {
    console.log("  inner read:", err.constructor.name + ":", err.message);
  }
  let x = "inner";
  console.log("  inner x:", x); // "inner"
}
console.log("  outer x:", x); // "outer"

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - let/const ARE hoisted but uninitialised → in the TDZ.
 *  - Access in the TDZ (even typeof) → ReferenceError.
 *  - var returns undefined early; let/const throw — by design.
 *  - const must be initialised; re-assigning the binding → TypeError.
 *  - const objects/arrays can still be mutated (binding ≠ value).
 *  - let/const are block-scoped; each block has its own TDZ.
 * ============================================================================
 */
