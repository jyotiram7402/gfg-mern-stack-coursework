/**
 * ============================================================================
 *                    ITERATING OVER A STRING IN JAVASCRIPT
 * ============================================================================
 *
 * Theory & diagrams:  Iterating-over-string.md
 *
 * A string is array-like (str.length, str[i]) AND iterable ([Symbol.iterator]).
 * The big divide: UTF-16 code UNITS (for / split) vs Unicode code POINTS
 * (for...of / spread / Array.from). The latter keeps emojis intact.
 *
 * Run it with:  node Iterating-over-string.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: classic for loop (index based) — UTF-16 code units
// ---------------------------------------------------------------------------
console.log("DEMO 1 — classic for loop (index based)");

const str = "code";
for (let i = 0; i < str.length; i++) {
  // str[i] and str.charAt(i) are equivalent here
  console.log("  ", i, str[i]);
}
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: for...of — modern, Unicode-safe (code points)
// ---------------------------------------------------------------------------
console.log("DEMO 2 — for...of yields code points (emoji stays whole)");

let chars = [];
for (const ch of "ab\u{1F600}") {
  // \u{1F600} is 😀
  chars.push(ch);
}
console.log("  chars:", chars); // ['a', 'b', '😀']  → emoji is ONE item

// for...of WITH index via spread + .entries()
for (const [i, ch] of [..."ab\u{1F600}"].entries()) {
  console.log("  ", i, ch);
}
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: spread [...str] and Array.from(str) — array of code points
// ---------------------------------------------------------------------------
console.log("DEMO 3 — spread / Array.from → array, then array methods");

console.log("  spread     :", [..."hi\u{1F600}"]);       // ['h','i','😀']
console.log("  Array.from :", Array.from("hi\u{1F600}")); // ['h','i','😀']

// Array.from with a map function
console.log("  upper map  :", Array.from("abc", c => c.toUpperCase())); // ['A','B','C']

// forEach with index
[..."abc"].forEach((ch, i) => console.log("  forEach", i, ch));
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: for...in — AVOID for strings (keys are index STRINGS)
// ---------------------------------------------------------------------------
console.log("DEMO 4 — for...in gives index STRINGS, not characters");

for (const i in "abc") {
  console.log("  key:", JSON.stringify(i), "typeof:", typeof i, "char:", "abc"[i]);
}
// "0" string a  /  "1" string b  /  "2" string c
console.log("  trap: '1' + 1 =", "1" + 1); // "11" (string concat, not 2)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: the Unicode gotcha — code units vs code points
// ---------------------------------------------------------------------------
console.log("DEMO 5 — emoji = 2 UTF-16 code units (surrogate pair)");

const s = "\u{1F600}"; // 😀
console.log("  s.length        :", s.length);          // 2  (code UNITS!)
console.log("  [...s].length   :", [...s].length);     // 1  (code POINTS)
console.log("  s.split('')     :", s.split(""));        // ['\uD83D','\uDE00'] ❌ broken
console.log("  [...s]          :", [...s]);             // ['😀']               ✅ intact
console.log("  true char count :", [..."a\u{1F600}b"].length, "vs .length", "a\u{1F600}b".length);
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: a tiny practical task — reverse a string the SAFE way
// ---------------------------------------------------------------------------
console.log("DEMO 6 — reversing: split('') breaks emojis, [...str] does not");

const reverseUnsafe = x => x.split("").reverse().join("");
const reverseSafe   = x => [...x].reverse().join("");

console.log("  unsafe('ab😀'):", reverseUnsafe("ab\u{1F600}")); // emoji corrupted
console.log("  safe  ('ab😀'):", reverseSafe("ab\u{1F600}"));   // '😀ba' intact

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - Strings are array-like AND iterable, and are IMMUTABLE (read-only iterate).
 *  - for...of  → code points, Unicode-safe → default for reading characters.
 *  - classic for → code units, gives you the index → control / ASCII speed.
 *  - [...str] / Array.from(str) → array of code points → use map/filter/reduce.
 *  - split("") & str[i] work on UTF-16 code units → they BREAK emojis.
 *  - Avoid for...in for strings (index STRINGS + possible extra props).
 *  - True character count = [...str].length, not str.length.
 * ============================================================================
 */
