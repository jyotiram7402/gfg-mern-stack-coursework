# Interview Questions — `trim()`

> Companion to [`trim.md`](./trim.md) and [`trim.js`](./trim.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What does `trim()` do?
**Answer:** It returns a **new string** with whitespace removed from **both ends**. Whitespace **inside** the string is left untouched, and the original is unchanged (strings are immutable).

### Q2. Does `trim()` modify the original string?
**Answer:** **No.** Strings are immutable — you must capture the return value (`s = s.trim()`).

### Q3. Does `trim()` remove whitespace in the middle of a string?
**Answer:** **No** — only leading and trailing. To collapse inner runs of spaces, use a regex: `str.replace(/\s+/g, " ").trim()`.

### Q4. How do you trim only one side?
**Answer:** **`trimStart()`** removes leading whitespace; **`trimEnd()`** removes trailing whitespace. (Older aliases: `trimLeft` / `trimRight`.)

### Q5. What characters count as "whitespace" for `trim`?
**Answer:** ECMAScript whitespace and line terminators: space, tab `\t`, newline `\n`, carriage return `\r`, vertical tab `\v`, form feed `\f`, **no-break space** (` `), BOM (`﻿`), and Unicode separators (e.g. ` `, ` `, ideographic space `　`).

### Q6. Is the zero-width space (`​`) removed by `trim()`?
**Answer:** **No.** The zero-width space is **not** classified as whitespace, so `trim` leaves it in place. A string can *look* trimmed but still contain it — remove it explicitly with a regex.

### Q7. What's the correct way to check if a string is "blank" (empty or only spaces)?
**Answer:** `str.trim().length === 0` (or `!str.trim()`). A bare `if (str)` is wrong because `"   "` is **truthy**.

### Q8. What does `"   ".trim()` return?
**Answer:** An **empty string** `""` — an all-whitespace string trims down to nothing.

### Q9. When in a real app should you call `trim`?
**Answer:** On **user input** — before storing, comparing, validating, or sending it (form fields, search boxes, login). Users frequently leave stray leading/trailing spaces.

### Q10. Does `trim` remove punctuation or quotes around a string?
**Answer:** No — `trim` only removes **whitespace**. To strip other characters you'd use `replace`/`slice` or a regex.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log("|" + "  hi  ".trim() + "|");
console.log("|" + "  a b  ".trim() + "|");
```
<details><summary>Answer</summary>

```
|hi|
|a b|
```
Both ends are trimmed; the inner space in `"a b"` is preserved.
</details>

### Q2. Predict the output
```js
let s = "  data  ";
s.trim();
console.log("|" + s + "|");
```
<details><summary>Answer</summary>

```
|  data  |
```
The result was ignored; strings are immutable, so `s` is unchanged.
</details>

### Q3. Predict the output
```js
const p = "  hello  ";
console.log("|" + p.trimStart() + "|");
console.log("|" + p.trimEnd() + "|");
```
<details><summary>Answer</summary>

```
|hello  |
|  hello|
```
`trimStart` removes the left padding; `trimEnd` removes the right.
</details>

### Q4. Predict the output
```js
console.log("   ".trim().length);
console.log(Boolean("   "));
```
<details><summary>Answer</summary>

```
0
true
```
`"   "` trims to `""` (length 0), but the *untrimmed* `"   "` is truthy — which is exactly why you trim before an empty check.
</details>

### Q5. Predict the output
```js
const z = "​hi​";  // zero-width spaces around hi
console.log(z.trim().length);
```
<details><summary>Answer</summary>

```
4
```
Zero-width spaces aren't whitespace, so `trim` removes nothing — length stays 4 (2 ZWSP + "hi").
</details>

### Q6. Coding task — blank check
```js
// isBlank("  \n ") -> true ;  isBlank(" x ") -> false
```
<details><summary>Answer</summary>

```js
const isBlank = str => str.trim().length === 0;
// or:  const isBlank = str => !str.trim();
```
</details>

### Q7. Coding task — normalize whitespace
```js
// normalize("  the   quick  brown ") -> "the quick brown"
```
<details><summary>Answer</summary>

```js
const normalize = str => str.replace(/\s+/g, " ").trim();
```
`replace(/\s+/g, " ")` collapses inner runs to a single space; `trim` removes the ends.
</details>

### Q8. Spot the bug
```js
function saveUsername(name) {
  if (!name) throw new Error("required");
  return name.trim();
}
saveUsername("   ");   // expected: throws. Actual?
```
<details><summary>Answer</summary>

`"   "` is **truthy**, so the guard passes and it returns `""` instead of throwing. Trim **before** the check:
```js
function saveUsername(name) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("required");
  return trimmed;
}
```
</details>

### Q9. Coding task — case-insensitive, whitespace-insensitive compare
```js
// sameValue("  Hello ", "hello") -> true
```
<details><summary>Answer</summary>

```js
const sameValue = (a, b) =>
  a.trim().toLowerCase() === b.trim().toLowerCase();
```
Combines `trim` with `toLowerCase` to normalize both inputs before comparing.
</details>

### Q10. Predict the output
```js
console.log("\t\n  spaced  \r\n".trim());
```
<details><summary>Answer</summary>

```
spaced
```
Tabs, newlines, and carriage returns are all whitespace, so every leading/trailing one is removed.
</details>

---

## One-Line Cheat Sheet
- `trim()` → **new string**, whitespace stripped from **both ends**; inner kept; original unchanged.
- `trimStart()` / `trimEnd()` trim one side (aliases `trimLeft` / `trimRight`).
- Blank check: `str.trim().length === 0` — a bare `if (str)` fails for `"   "`.
- Whitespace = space, `\t \n \r \v \f`, **NBSP**, BOM, Unicode separators.
- **Gotcha:** zero-width space (`​`) is **not** whitespace → strip with a regex.
- Collapse **inner** spaces with `replace(/\s+/g, " ")`, not `trim`.
