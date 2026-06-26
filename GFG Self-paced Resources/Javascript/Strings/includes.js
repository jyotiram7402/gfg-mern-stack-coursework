/**
 * ============================================================================
 *                      STRING METHOD — includes()
 * ============================================================================
 *
 * Theory & diagrams:  includes.md
 *
 *   str.includes(searchString, position?)
 *     → true if searchString is found, else false (case-sensitive)
 *     → the clean ES6 replacement for  indexOf(x) !== -1
 *
 * Read-only (strings are immutable). Run it with:  node includes.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: the basics — returns a boolean
// ---------------------------------------------------------------------------
console.log("DEMO 1 — basics: true / false");

const s = "hello world";
console.log("  includes('world'):", s.includes("world")); // true
console.log("  includes('o')    :", s.includes("o"));     // true
console.log("  includes('xyz')  :", s.includes("xyz"));   // false
console.log("  includes('World'):", s.includes("World")); // false (case-sensitive)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: includes vs indexOf (no falsy-0 trap)
// ---------------------------------------------------------------------------
console.log("DEMO 2 — includes avoids the indexOf falsy-0 trap");

const word = "hi";
// indexOf('h') === 0 → falsy → a bare if() wrongly skips it
if (word.indexOf("h")) console.log("  indexOf: ran");
else console.log("  indexOf: WRONGLY skipped (0 is falsy)");
// includes is unambiguous
console.log("  includes('h')    :", word.includes("h")); // true
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: the position argument
// ---------------------------------------------------------------------------
console.log("DEMO 3 — position: where to start searching");

console.log("  includes('world', 6) :", s.includes("world", 6));  // true
console.log("  includes('hello', 6) :", s.includes("hello", 6));  // false
console.log("  includes('world', -5):", s.includes("world", -5)); // true (neg → 0)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: quirks — empty string & coercion
// ---------------------------------------------------------------------------
console.log("DEMO 4 — quirks: empty string + coercion");

console.log("  'abc'.includes('')      :", "abc".includes(""));       // true
console.log("  '12345'.includes(23)    :", "12345".includes(23));     // true (23 → '23')
console.log("  'a,true,b'.includes(true):", "a,true,b".includes(true)); // true
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: a regex argument THROWS (unique to includes/startsWith/endsWith)
// ---------------------------------------------------------------------------
console.log("DEMO 5 — passing a regex throws a TypeError");

try {
  "abc".includes(/a/);
} catch (err) {
  console.log("  includes(/a/):", err.constructor.name + ":", err.message);
}
console.log("  indexOf(/a/) instead:", "abc".indexOf(/a/)); // -1 (coerces to '/a/')
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: the family — startsWith & endsWith
// ---------------------------------------------------------------------------
console.log("DEMO 6 — startsWith / includes / endsWith");

const f = "report.final.pdf";
console.log("  startsWith('report'):", f.startsWith("report")); // true
console.log("  includes('final')   :", f.includes("final"));    // true
console.log("  endsWith('.pdf')    :", f.endsWith(".pdf"));      // true
console.log("  startsWith('llo',2) :", "hello".startsWith("llo", 2)); // true
console.log("  endsWith('hell',4)  :", "hello".endsWith("hell", 4));  // true

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - includes(x) → true / false: is x a substring? (IF, not WHERE).
 *  - Clean ES6 replacement for indexOf(x) !== -1 (no falsy-0 trap).
 *  - Case-sensitive; optional position (negative → 0).
 *  - Empty string always included; non-string args coerced to strings.
 *  - A REGEX argument throws TypeError (unlike indexOf) — use search/test.
 *  - Siblings startsWith / endsWith check the edges (also boolean).
 *  - Use indexOf when you need the POSITION.
 * ============================================================================
 */
