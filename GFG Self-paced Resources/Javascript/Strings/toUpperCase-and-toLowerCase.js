/**
 * ============================================================================
 *            STRING METHODS — toUpperCase() & toLowerCase()
 * ============================================================================
 *
 * Theory & diagrams:  toUpperCase-and-toLowerCase.md
 *
 *   str.toUpperCase()  → NEW string, all letters upper-cased
 *   str.toLowerCase()  → NEW string, all letters lower-cased
 *
 * No arguments. The original is NEVER mutated (strings are immutable).
 * Run it with:  node toUpperCase-and-toLowerCase.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: the basics
// ---------------------------------------------------------------------------
console.log("DEMO 1 — basics");

console.log("  upper:", "Hello World".toUpperCase()); // "HELLO WORLD"
console.log("  lower:", "Hello World".toLowerCase()); // "hello world"
console.log("  mixed:", "abc123!@#".toUpperCase());   // "ABC123!@#" (non-letters unchanged)
console.log("  accent:", "café".toUpperCase());        // "CAFÉ"
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: immutability — must capture the return value
// ---------------------------------------------------------------------------
console.log("DEMO 2 — immutability: the original never changes");

let name = "alice";
name.toUpperCase();               // result IGNORED
console.log("  after ignoring :", name); // "alice" (unchanged!)
name = name.toUpperCase();        // capture it
console.log("  after assigning:", name); // "ALICE"
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: case-insensitive comparison (the #1 use)
// ---------------------------------------------------------------------------
console.log("DEMO 3 — case-insensitive compare & contains");

const equalsIgnoreCase = (a, b) => a.toLowerCase() === b.toLowerCase();
console.log("  'Hello' == 'HELLO' (CI):", equalsIgnoreCase("Hello", "HELLO")); // true
console.log("  contains 'WORLD' (CI)  :",
  "Hello World".toLowerCase().includes("world".toLowerCase())); // true
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: locale matters — Turkish dotted/dotless i
// ---------------------------------------------------------------------------
console.log("DEMO 4 — toLocaleUpperCase/LowerCase (Turkish i)");

console.log("  'i'.toUpperCase()          :", "i".toUpperCase());            // "I"
console.log("  'i'.toLocaleUpperCase('tr'):", "i".toLocaleUpperCase("tr"));  // "İ"
console.log("  'I'.toLowerCase()          :", "I".toLowerCase());            // "i"
console.log("  'I'.toLocaleLowerCase('tr'):", "I".toLocaleLowerCase("tr"));  // "ı"
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: length can CHANGE — German ß → SS
// ---------------------------------------------------------------------------
console.log("DEMO 5 — case conversion can change length (ß → SS)");

console.log("  'ß'.toUpperCase()      :", "ß".toUpperCase());      // "SS"
console.log("  'Straße'.toUpperCase() :", "Straße".toUpperCase()); // "STRASSE"
console.log("  length 6 →",  "Straße".toUpperCase().length);        // 7
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: strings only + capitalize-first-letter idiom
// ---------------------------------------------------------------------------
console.log("DEMO 6 — strings only + capitalize idiom");

console.log("  (255).toString(16).toUpperCase():", (255).toString(16).toUpperCase()); // "FF"
console.log("  String(true).toUpperCase()      :", String(true).toUpperCase());        // "TRUE"

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
console.log("  capitalize('jAVASCRIPT')        :", capitalize("jAVASCRIPT")); // "Javascript"

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - toUpperCase / toLowerCase → NEW string; original NEVER mutated.
 *  - No arguments; non-letters pass through; accents converted.
 *  - Capture the result! (str = str.toUpperCase()).
 *  - Pair with includes/indexOf for case-insensitive search/compare.
 *  - Locale rules (Turkish i/İ/ı) → toLocaleUpperCase/LowerCase(locale).
 *  - Length can change (ß → SS) — don't assume it's preserved.
 *  - Strings only — convert numbers/booleans first: String(x).toUpperCase().
 * ============================================================================
 */
