/**
 * ============================================================================
 *                        STRING METHOD — trim()
 * ============================================================================
 *
 * Theory & diagrams:  trim.md
 *
 *   str.trim()       → NEW string with whitespace removed from BOTH ends
 *   str.trimStart()  → leading whitespace removed  (alias trimLeft)
 *   str.trimEnd()    → trailing whitespace removed (alias trimRight)
 *
 * Inner whitespace is preserved; the original is never mutated.
 * Run it with:  node trim.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: the basics
// ---------------------------------------------------------------------------
console.log("DEMO 1 — basics (| marks the string edges)");

console.log("  '  hello  '   →", "|" + "  hello  ".trim() + "|");      // |hello|
console.log("  '\\t\\n hi \\n'  →", "|" + "\t\n  hi  \n".trim() + "|"); // |hi|
console.log("  '  a b c  '   →", "|" + "  a b c  ".trim() + "|");       // |a b c| (inner kept)
console.log("  '      '      →", "|" + "      ".trim() + "|");          // || (all ws → "")
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: the family — trimStart / trimEnd
// ---------------------------------------------------------------------------
console.log("DEMO 2 — trimStart / trimEnd / trim");

const padded = "  hello  ";
console.log("  trimStart():", "|" + padded.trimStart() + "|"); // |hello  |
console.log("  trimEnd()  :", "|" + padded.trimEnd() + "|");   // |  hello|
console.log("  trim()     :", "|" + padded.trim() + "|");      // |hello|
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: immutability — original is unchanged
// ---------------------------------------------------------------------------
console.log("DEMO 3 — immutability");

let s = "  spaced  ";
s.trim();                                   // result ignored
console.log("  after ignoring :", "|" + s + "|");        // |  spaced  |
s = s.trim();                               // capture it
console.log("  after assigning:", "|" + s + "|");        // |spaced|
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: the #1 use — blank-input validation
// ---------------------------------------------------------------------------
console.log("DEMO 4 — validating 'blank' input");

const isBlank = str => str.trim().length === 0; // or: !str.trim()
console.log("  isBlank('   ') :", isBlank("   ")); // true
console.log("  isBlank(' x ') :", isBlank(" x ")); // false
console.log("  bare if('   ') is truthy?:", Boolean("   ")); // true (why trim matters)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: what counts as whitespace (NBSP yes, zero-width NO)
// ---------------------------------------------------------------------------
console.log("DEMO 5 — NBSP is trimmed; zero-width space is NOT");

const nbsp = " hi ";   // no-break spaces around 'hi'
console.log("  NBSP trimmed   :", "|" + nbsp.trim() + "|", "len", nbsp.trim().length); // |hi| 2

const zwsp = "​hi​";   // zero-width spaces around 'hi'
console.log("  ZWSP 'trimmed' :", "|" + zwsp.trim() + "|", "len", zwsp.trim().length); // len 4!
console.log("  ZWSP via regex :", "|" + zwsp.replace(/​/g, "") + "|"); // |hi|
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: trim only touches the ends — collapse inner runs with regex
// ---------------------------------------------------------------------------
console.log("DEMO 6 — collapsing INNER whitespace needs a regex");

const messy = "  multiple   inner   spaces  ";
console.log("  trim only   :", "|" + messy.trim() + "|");
console.log("  collapsed   :", "|" + messy.replace(/\s+/g, " ").trim() + "|");

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - trim() → NEW string, whitespace removed from BOTH ends; inner kept.
 *  - trimStart / trimEnd trim one side (aliases trimLeft / trimRight).
 *  - Always capture the result (strings are immutable).
 *  - Blank check: str.trim().length === 0 (a bare if(str) won't do it).
 *  - Whitespace incl. space, \t \n \r \v \f, NBSP, BOM, Unicode separators.
 *  - GOTCHA: zero-width space (U+200B) is NOT whitespace → use a regex.
 *  - Collapse INNER spaces with replace(/\s+/g, " "), not trim.
 * ============================================================================
 */
