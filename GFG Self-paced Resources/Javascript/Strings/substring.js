/**
 * ============================================================================
 *                      STRING METHOD — substring()
 * ============================================================================
 *
 * Theory & diagrams:  substring.md
 *
 *   str.substring(indexStart, indexEnd?)
 *     → characters from indexStart (inclusive) to indexEnd (exclusive)
 *     → returns a NEW string (strings are immutable)
 *
 * Run it with:  node substring.js
 * ============================================================================
 *
 *    J  a  v  a  S  c  r  i  p  t
 *    0  1  2  3  4  5  6  7  8  9
 */

// ---------------------------------------------------------------------------
// DEMO 1: the basics
// ---------------------------------------------------------------------------
console.log("DEMO 1 — basics: [start, end)");

const s = "JavaScript";
console.log("  substring(0, 4):", s.substring(0, 4)); // "Java"
console.log("  substring(4)   :", s.substring(4));    // "Script" (to the end)
console.log("  substring(4, 6):", s.substring(4, 6)); // "Sc"
console.log("  substring(2, 2):", JSON.stringify(s.substring(2, 2))); // "" (start===end)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: quirk #1 — arguments are SWAPPED if start > end
// ---------------------------------------------------------------------------
console.log("DEMO 2 — start > end ⇒ arguments swapped");

console.log("  substring(1, 4):", "hello".substring(1, 4)); // "ell"
console.log("  substring(4, 1):", "hello".substring(4, 1)); // "ell" (swapped!)
console.log("  slice(4, 1)    :", JSON.stringify("hello".slice(4, 1))); // "" (slice does NOT swap)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: quirk #2 — negative / NaN → 0, and clamping
// ---------------------------------------------------------------------------
console.log("DEMO 3 — negative/NaN → 0, out-of-range clamped");

console.log("  substring(-3)    :", "hello".substring(-3));     // "hello" (-3→0)
console.log("  substring(-3, 2) :", "hello".substring(-3, 2));  // "he"
console.log("  substring(NaN, 3):", "hello".substring(NaN, 3)); // "hel" (NaN→0)
console.log("  substring(2, 100):", "hello".substring(2, 100)); // "llo" (clamped)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: substring vs slice on negatives
// ---------------------------------------------------------------------------
console.log("DEMO 4 — substring vs slice (negative handling)");

console.log("  'hello'.substring(-3):", "hello".substring(-3)); // "hello" (→0)
console.log("  'hello'.slice(-3)    :", "hello".slice(-3));     // "llo" (last 3)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: common patterns
// ---------------------------------------------------------------------------
console.log("DEMO 5 — common extraction patterns");

console.log("  first 5 chars :", "Hello World".substring(0, 5)); // "Hello"

const word = "javaScript";
console.log("  capitalize    :", word.charAt(0).toUpperCase() + word.substring(1)); // "JavaScript"

const email = "user@example.com";
console.log("  email domain  :", email.substring(email.indexOf("@") + 1)); // "example.com"

const full = "Ada Lovelace";
console.log("  first name    :", full.substring(0, full.indexOf(" "))); // "Ada"

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - substring(start, end) → [start inclusive, end exclusive), NEW string.
 *  - Omit end → to the end of the string; start===end → "".
 *  - QUIRK 1: start > end ⇒ arguments are SWAPPED.
 *  - QUIRK 2: negative / NaN → 0 (no negative indexing); ≥ length → clamped.
 *  - slice supports negative-from-the-end indices and does NOT swap.
 *  - substr(start, length) is legacy — prefer substring/slice.
 *  - Pairs well with indexOf + toUpperCase for extract/format.
 * ============================================================================
 */
