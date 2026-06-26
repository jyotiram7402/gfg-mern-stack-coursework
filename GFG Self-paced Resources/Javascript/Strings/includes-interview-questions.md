# Interview Questions — `includes()`

> Companion to [`includes.md`](./includes.md) and [`includes.js`](./includes.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What does `String.prototype.includes` return?
**Answer:** A **boolean** — `true` if the search string occurs anywhere in the string, otherwise `false`. It tells you **IF**, not **WHERE**.

### Q2. How is `includes` different from `indexOf`?
**Answer:** `includes` returns a **boolean**; `indexOf` returns the **index** (or `-1`). Use `includes` for a yes/no existence check (no falsy-`0` trap), and `indexOf` when you need the **position**. Also, `includes` **throws** on a regex argument while `indexOf` coerces it to a string.

### Q3. Is `includes` case-sensitive?
**Answer:** **Yes.** `"Hello".includes("hello")` is `false`. For case-insensitive checks, normalize first: `str.toLowerCase().includes(sub.toLowerCase())`.

### Q4. Why is `includes` preferred over `indexOf(x) !== -1`?
**Answer:** It's clearer and avoids the classic bug where `if (str.indexOf(x))` is wrong because a match at index `0` is **falsy** and `-1` (not found) is **truthy**. `includes` returns an unambiguous boolean.

### Q5. What is the second argument?
**Answer:** `position` — the index to start searching from (default `0`). A **negative** value is treated as `0`; a value **greater than the length** yields `false` (unless the search string is empty).

### Q6. What happens if you pass a regular expression to `includes`?
**Answer:** It throws a **`TypeError`** ("First argument ... must not be a regular expression"). This restriction is shared by `startsWith`/`endsWith`. For patterns use `regex.test(str)` or `str.search(regex)`.

### Q7. What does `"abc".includes("")` return?
**Answer:** `true` — the empty string is considered to be contained in every string.

### Q8. What happens with a non-string, non-regex argument like a number?
**Answer:** It's **coerced to a string**. `"12345".includes(23)` → `true` because `23` becomes `"23"`, which is present.

### Q9. What are `includes`'s sibling methods, and what do they check?
**Answer:** **`startsWith(x)`** (does it begin with `x`?) and **`endsWith(x)`** (does it end with `x`?). Both return booleans, are case-sensitive, and also reject regex arguments. `includes` checks **anywhere**.

### Q10. How does `String.includes` differ from `Array.includes`?
**Answer:** `String.includes` checks for a **substring** and coerces its argument to a string. `Array.includes` checks for a **whole element** using *SameValueZero*, so it can even find `NaN` (`[NaN].includes(NaN)` → `true`).

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log("JavaScript".includes("Script"));
console.log("JavaScript".includes("script"));
```
<details><summary>Answer</summary>

```
true
false
```
Case-sensitive: `"Script"` matches, `"script"` does not.
</details>

### Q2. Predict the output
```js
console.log("hello world".includes("world", 6));
console.log("hello world".includes("hello", 6));
```
<details><summary>Answer</summary>

```
true
false
```
`"world"` starts at index 6; `"hello"` is before index 6, so it isn't seen when starting there.
</details>

### Q3. Predict the output
```js
console.log("abc".includes(""));
console.log("12345".includes(34));
```
<details><summary>Answer</summary>

```
true
true
```
The empty string is always included; `34` coerces to `"34"`, which is present.
</details>

### Q4. Predict the output
```js
try {
  console.log("hello".includes(/l/));
} catch (e) {
  console.log(e.name);
}
```
<details><summary>Answer</summary>

```
TypeError
```
`includes` rejects a regex argument and throws a `TypeError`.
</details>

### Q5. Predict the output
```js
console.log("team".includes("i"));
console.log([NaN].includes(NaN));
```
<details><summary>Answer</summary>

```
false
true
```
There's no `"i"` in `"team"`. The second line is `Array.includes`, which finds `NaN` via SameValueZero.
</details>

### Q6. Coding task — case-insensitive contains
```js
// containsCI("Hello World", "WORLD") -> true
```
<details><summary>Answer</summary>

```js
const containsCI = (str, sub) =>
  str.toLowerCase().includes(sub.toLowerCase());
```
</details>

### Q7. Coding task — does the string contain any word from a list?
```js
// hasAny("the quick brown fox", ["cat", "fox"]) -> true
```
<details><summary>Answer</summary>

```js
const hasAny = (str, words) => words.some(w => str.includes(w));
// contains ALL of them?  words.every(w => str.includes(w))
```
`some` short-circuits on the first match; `every` checks them all.
</details>

### Q8. Spot the difference — which of these is the safe existence check?
```js
const s = "abc";
if (s.indexOf("a")) { /* A */ }
if (s.includes("a")) { /* B */ }
```
<details><summary>Answer</summary>

**B** is correct. **A** is buggy: `"abc".indexOf("a")` is `0` (falsy), so block A is skipped even though `"a"` is present. `includes` returns `true` and runs block B.
</details>

### Q9. Coding task — simple file-type filter
```js
// Keep only image files from a list of filenames.
const files = ["a.png", "b.txt", "c.JPG", "d.gif"];
```
<details><summary>Answer</summary>

```js
const isImage = name => {
  const lower = name.toLowerCase();
  return [".png", ".jpg", ".jpeg", ".gif"].some(ext => lower.endsWith(ext));
};
const images = files.filter(isImage); // ["a.png", "c.JPG", "d.gif"]
```
`endsWith` is the right edge-check here; lowercasing makes it case-insensitive.
</details>

### Q10. Predict the output
```js
const url = "https://example.com/path?q=1";
console.log(url.startsWith("https://"));
console.log(url.includes("?"));
console.log(url.endsWith(".com"));
```
<details><summary>Answer</summary>

```
true
true
false
```
It starts with `https://` and contains `?`, but it does **not** end with `.com` (there's a path after it).
</details>

---

## One-Line Cheat Sheet
- `includes(x[, pos])` → **`true` / `false`**: substring present? (IF, not WHERE).
- Clean ES6 replacement for `indexOf(x) !== -1` — no falsy-`0` trap.
- **Case-sensitive**; `pos` sets the start (negative → `0`).
- Empty string always included; non-string args **coerced to strings**.
- A **regex** argument **throws `TypeError`** — use `test`/`search` for patterns.
- Siblings `startsWith` / `endsWith` check the edges; use `indexOf` for the **position**.
