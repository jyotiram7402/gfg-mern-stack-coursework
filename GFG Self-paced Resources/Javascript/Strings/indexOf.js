/**
 * ============================================================================
 *                      STRING METHOD — indexOf()
 * ============================================================================
 *
 * Theory & diagrams:  indexOf.md
 *
 *   str.indexOf(searchValue, fromIndex?)
 *     → index of the FIRST occurrence (case-sensitive, left-to-right)
 *     → -1 if not found
 *
 * Read-only (strings are immutable). Run it with:  node indexOf.js
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// DEMO 1: the basics
// ---------------------------------------------------------------------------
console.log("DEMO 1 — basics: first index, or -1");

const s = "hello world";
console.log("  indexOf('o')    :", s.indexOf("o"));     // 4
console.log("  indexOf('world'):", s.indexOf("world")); // 6
console.log("  indexOf('z')    :", s.indexOf("z"));     // -1
console.log("  indexOf('O')    :", s.indexOf("O"));     // -1 (case-sensitive)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 2: the fromIndex argument
// ---------------------------------------------------------------------------
console.log("DEMO 2 — fromIndex: where to start searching");

const t = "abcabc";
console.log("  indexOf('a')    :", t.indexOf("a"));     // 0
console.log("  indexOf('a', 1) :", t.indexOf("a", 1));  // 3
console.log("  indexOf('b', -5):", t.indexOf("b", -5)); // 1 (neg → 0)
console.log("  indexOf('a', 4) :", t.indexOf("a", 4));  // -1 (no 'a' at/after 4)
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 3: quirks — empty string & argument coercion
// ---------------------------------------------------------------------------
console.log("DEMO 3 — quirks: empty string + coercion");

console.log("  'abc'.indexOf('')    :", "abc".indexOf(""));    // 0
console.log("  'abc'.indexOf('', 99):", "abc".indexOf("", 99)); // 3 (clamped to length)
console.log("  '12345'.indexOf(3)   :", "12345".indexOf(3));    // 2 (number → '3')
console.log("  'a,b'.indexOf(true)  :", "a,b".indexOf(true));   // -1
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 4: the existence-check trap (0 is falsy, -1 is truthy)
// ---------------------------------------------------------------------------
console.log("DEMO 4 — why a bare if(indexOf) is BUGGY");

const word = "hi";
// WRONG: 'h' is at index 0 → falsy → block skipped even though found
if (word.indexOf("h")) console.log("  WRONG branch ran");
else console.log("  WRONG: skipped 'h' because index 0 is falsy");

// RIGHT: compare to -1, or use includes()
console.log("  indexOf('h') !== -1 :", word.indexOf("h") !== -1); // true
console.log("  includes('h')       :", word.includes("h"));       // true
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 5: lastIndexOf — last occurrence, searching backward
// ---------------------------------------------------------------------------
console.log("DEMO 5 — indexOf vs lastIndexOf");

const u = "abcabc";
console.log("  indexOf('b')        :", u.indexOf("b"));        // 1
console.log("  lastIndexOf('b')    :", u.lastIndexOf("b"));    // 4
console.log("  lastIndexOf('b', 2) :", u.lastIndexOf("b", 2)); // 1
console.log("------------------------------------------");

// ---------------------------------------------------------------------------
// DEMO 6: find & count ALL occurrences (advancing fromIndex)
// ---------------------------------------------------------------------------
console.log("DEMO 6 — find / count all matches");

function indexesOf(str, sub) {
  const positions = [];
  let i = str.indexOf(sub);
  while (i !== -1) {
    positions.push(i);
    i = str.indexOf(sub, i + 1); // resume just past this match
  }
  return positions;
}

const hay = "abcabcabc";
console.log("  indexesOf('abcabcabc','bc'):", indexesOf(hay, "bc")); // [1,4,7]
console.log("  count of 'a'               :", indexesOf(hay, "a").length); // 3

/**
 * ============================================================================
 *                              QUICK RECAP
 * ============================================================================
 *  - indexOf(value) → index of FIRST occurrence, else -1.
 *  - Multi-char match → index of its FIRST character.
 *  - fromIndex: where to start (neg → 0 ; ≥ length → -1).
 *  - Case-sensitive; coerces the argument to a string; '' matches (≤ length).
 *  - Existence: compare to -1 (index 0 is falsy!) — or use includes().
 *  - lastIndexOf → last match (backward); includes → boolean.
 *  - All matches: loop with an advancing fromIndex (always advance it!).
 * ============================================================================
 */
