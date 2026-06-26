# Interview Questions — `indexOf()`

> Companion to [`indexOf.md`](./indexOf.md) and [`indexOf.js`](./indexOf.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What does `indexOf` return?
**Answer:** The **index of the first occurrence** of the search value (the index of its first character for multi-char searches), or **`-1`** if it isn't found.

### Q2. Is `indexOf` case-sensitive?
**Answer:** **Yes.** `"Hello".indexOf("h")` is `-1`; only `"H"` matches at index `0`. For case-insensitive search, normalize first (e.g. `str.toLowerCase().indexOf(sub.toLowerCase())`).

### Q3. What is the second argument and how does it behave at the extremes?
**Answer:** `fromIndex` — the index to start searching from (default `0`), still scanning left-to-right. If it's **negative** it's treated as `0`; if it's **≥ `str.length`** the result is `-1` (except an empty search value, which returns `length`).

### Q4. Why is `if (str.indexOf(x))` a bug?
**Answer:** Because a match at the **start** returns `0`, which is **falsy**, while **not found** returns `-1`, which is **truthy**. So the condition is effectively inverted. Compare explicitly: `str.indexOf(x) !== -1`, or use `includes()`.

### Q5. `indexOf` vs `includes` — when to use which?
**Answer:** Use **`includes`** when you only need a **boolean** "does it contain X?" — it's clearer and avoids the `-1` trap. Use **`indexOf`** when you need the **position** of the match (or must support very old environments without `includes`).

### Q6. `indexOf` vs `lastIndexOf`?
**Answer:** `indexOf` finds the **first** occurrence scanning **forward** (default start `0`). `lastIndexOf` finds the **last** occurrence scanning **backward** (default start = end). Both return `-1` when not found.

### Q7. What does `"abc".indexOf("")` return, and why?
**Answer:** `0`. The empty string is considered to match at every position; with a `fromIndex` it returns that index **clamped to `str.length`** (e.g. `"abc".indexOf("", 99)` → `3`).

### Q8. What happens if you pass a non-string to `indexOf`?
**Answer:** The argument is **coerced to a string**. `"12345".indexOf(3)` → `2` (because `3` becomes `"3"`). There's no type error.

### Q9. How do you find **all** occurrences of a substring?
**Answer:** Loop, advancing `fromIndex` past each hit:
```js
let i = str.indexOf(sub);
while (i !== -1) { /* record i */ i = str.indexOf(sub, i + 1); }
```
Always advance `fromIndex`, or you get an infinite loop.

### Q10. Does `indexOf` mutate the string?
**Answer:** No — strings are **immutable**; it only returns a number.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log("banana".indexOf("a"));
console.log("banana".indexOf("a", 2));
console.log("banana".indexOf("x"));
```
<details><summary>Answer</summary>

```
1
3
-1
```
First `'a'` at 1; starting from index 2 the next `'a'` is at 3; `'x'` absent → `-1`.
</details>

### Q2. Predict the output
```js
const s = "hi";
console.log(Boolean(s.indexOf("h")));
console.log(Boolean(s.indexOf("z")));
```
<details><summary>Answer</summary>

```
false
true
```
`'h'` is at index `0` (falsy); `'z'` gives `-1` (truthy). This is exactly why a bare `if (indexOf(...))` is buggy.
</details>

### Q3. Predict the output
```js
console.log("abc".indexOf(""));
console.log("abc".indexOf("", 10));
```
<details><summary>Answer</summary>

```
0
3
```
Empty string matches at position `0`; with a large `fromIndex` it clamps to `str.length` (`3`).
</details>

### Q4. Predict the output
```js
console.log("12345".indexOf(34));
```
<details><summary>Answer</summary>

```
2
```
`34` is coerced to `"34"`, which appears starting at index `2`.
</details>

### Q5. Predict the output
```js
const s = "abcabc";
console.log(s.indexOf("c"), s.lastIndexOf("c"), s.lastIndexOf("c", 3));
```
<details><summary>Answer</summary>

```
2 5 2
```
First `'c'` at 2; last `'c'` at 5; last `'c'` at/before index 3 is at 2.
</details>

### Q6. Coding task — case-insensitive "contains"
```js
// containsCI("Hello World", "WORLD") -> true
```
<details><summary>Answer</summary>

```js
const containsCI = (str, sub) =>
  str.toLowerCase().indexOf(sub.toLowerCase()) !== -1;
// or: str.toLowerCase().includes(sub.toLowerCase());
```
</details>

### Q7. Coding task — count occurrences of a substring
```js
// countOccurrences("abcabcabc", "bc") -> 3
```
<details><summary>Answer</summary>

```js
function countOccurrences(str, sub) {
  if (sub === "") return 0;            // guard against infinite loop
  let count = 0, i = str.indexOf(sub);
  while (i !== -1) {
    count++;
    i = str.indexOf(sub, i + sub.length); // non-overlapping
  }
  return count;
}
```
Advance by `sub.length` for non-overlapping counts (use `i + 1` to allow overlaps).
</details>

### Q8. Spot the bug
```js
// Goal: log positions of every 'a'. This hangs forever.
let i = "aaa".indexOf("a");
while (i !== -1) {
  console.log(i);
  i = "aaa".indexOf("a");   // bug
}
```
<details><summary>Answer</summary>

The re-search always starts at `0`, so `i` is forever `0` → infinite loop. Pass an advancing `fromIndex`:
```js
i = "aaa".indexOf("a", i + 1);
```
</details>

### Q9. Coding task — return the file extension
```js
// extension("photo.final.png") -> "png" ;  extension("README") -> ""
```
<details><summary>Answer</summary>

```js
function extension(name) {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1);
}
```
`lastIndexOf(".")` correctly handles multiple dots; `-1` means no extension.
</details>

### Q10. Predict the output
```js
console.log("Mississippi".indexOf("ss"));
console.log("Mississippi".indexOf("ss", 3));
```
<details><summary>Answer</summary>

```
2
5
```
First `"ss"` starts at index 2; resuming from index 3, the next `"ss"` starts at 5.
</details>

---

## One-Line Cheat Sheet
- `indexOf(value[, from])` → **first** index, else **`-1`**; multi-char → index of first char.
- `fromIndex`: negative → `0`; `≥ length` → `-1`; default `0`.
- **Case-sensitive**; argument **coerced to string**; `""` matches (clamped to `length`).
- Existence: compare to `-1` (index `0` is falsy!) — or use **`includes()`**.
- `lastIndexOf` → last match (backward); `includes` → boolean.
- All matches → loop with an **advancing** `fromIndex` (else infinite loop).
