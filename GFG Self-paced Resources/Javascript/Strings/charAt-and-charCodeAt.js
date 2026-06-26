/**
 * ============================================================================
 *                STRING METHODS — charAt() & charCodeAt()
 * ============================================================================
 *
 * Theory & diagrams:  charAt-and-charCodeAt.md
 *
 *   charAt(i)     → the CHARACTER at index i (a 1-char string)
 *   charCodeAt(i) → the NUMBER  (UTF-16 code unit, 0–65535) at index i
 *
 * Both read UTF-16 code units and never mutate the string (strings are
 * immutable). Run it with:  node charAt-and-charCodeAt.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: charAt — returns the character (a string)
// ---------------------------------------------------------------------------
console.log("DEMO 1 — charAt returns a 1-char string");

const s = "JAVA";
console.log("  charAt(0):", s.charAt(0)); // 'J'
console.log("  charAt(2):", s.charAt(2)); // 'V'
console.log("  charAt() :", JSON.stringify(s.charAt())); // 'J' (defaults to 0)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: charAt edge cases vs bracket access str[i]
// ---------------------------------------------------------------------------
console.log("DEMO 2 — charAt edge cases vs str[i]");

console.log("  'abc'.charAt(5) :", JSON.stringify("abc".charAt(5)));  // ''  out of range
console.log("  'abc'[5]        :", "abc"[5]);                          // undefined
console.log("  'abc'.charAt(-1):", JSON.stringify("abc".charAt(-1))); // ''
console.log("  'abc'.charAt(1.9):", "abc".charAt(1.9));               // 'b' (truncated)
console.log("  'abc'.charAt('x'):", "abc".charAt("x"));               // 'a' (NaN→0)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: charCodeAt — returns the numeric UTF-16 code unit
// ---------------------------------------------------------------------------
console.log("DEMO 3 — charCodeAt returns a number");

console.log("  'A' :", "A".charCodeAt(0)); // 65
console.log("  'a' :", "a".charCodeAt(0)); // 97
console.log("  '0' :", "0".charCodeAt(0)); // 48
console.log("  ' ' :", " ".charCodeAt(0)); // 32
console.log("  out of range:", "abc".charCodeAt(9)); // NaN
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: the inverse — String.fromCharCode (static method)
// ---------------------------------------------------------------------------
console.log("DEMO 4 — String.fromCharCode is the inverse of charCodeAt");

console.log("  fromCharCode(65)      :", String.fromCharCode(65));      // 'A'
console.log("  fromCharCode(72,73)   :", String.fromCharCode(72, 73));  // 'HI'
const code = "Z".charCodeAt(0);
console.log("  round-trip 'Z' ->", code, "->", String.fromCharCode(code)); // 'Z'
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: the Unicode caveat — code units, not code points
// ---------------------------------------------------------------------------
console.log("DEMO 5 — emoji is a surrogate pair (2 code units)");

const e = "\u{1F600}"; // 😀  U+1F600
console.log("  length          :", e.length);            // 2
console.log("  charAt(0)       :", JSON.stringify(e.charAt(0))); // '\uD83D' (half)
console.log("  charCodeAt(0)   :", e.charCodeAt(0));      // 55357 (just the half)
console.log("  codePointAt(0)  :", e.codePointAt(0));     // 128512 (full point) ✅
console.log("  fromCodePoint   :", String.fromCodePoint(128512)); // '😀'
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: practical uses of charCodeAt
// ---------------------------------------------------------------------------
console.log("DEMO 6 — practical patterns with charCodeAt");

const isUpper = ch => { const c = ch.charCodeAt(0); return c >= 65 && c <= 90; };
const isDigit = ch => { const c = ch.charCodeAt(0); return c >= 48 && c <= 57; };
const shift   = (ch, n) => String.fromCharCode((ch.charCodeAt(0) - 97 + n) % 26 + 97);

console.log("  isUpper('G'):", isUpper("G")); // true
console.log("  isUpper('g'):", isUpper("g")); // false
console.log("  isDigit('7'):", isDigit("7")); // true
console.log("  Caesar shift 'a' by 3:", shift("a", 3)); // 'd'
console.log("  letter position of 'c':", "c".charCodeAt(0) - 96); // 3

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - charAt(i)     → CHARACTER (1-char string); out of range → '' .
 *  - charCodeAt(i) → NUMBER (UTF-16 code unit 0–65535); out of range → NaN.
 *  - Both default to index 0; both are read-only (strings are immutable).
 *  - charAt out-of-range → '' ; str[i] out-of-range → undefined.
 *  - String.fromCharCode(code) is the inverse of charCodeAt.
 *  - Both see code UNITS → break emojis; use codePointAt / fromCodePoint.
 *  - ASCII anchors: '0'=48, 'A'=65, 'a'=97; lower − upper = 32.
 * ============================================================================
 */
