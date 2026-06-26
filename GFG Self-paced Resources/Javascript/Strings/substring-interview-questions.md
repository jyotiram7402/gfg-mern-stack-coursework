# Interview Questions — `substring()`

> Companion to [`substring.md`](./substring.md) and [`substring.js`](./substring.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What does `substring(start, end)` return?
**Answer:** A **new string** containing the characters from index `start` (**inclusive**) up to `end` (**exclusive**). The original string is unchanged (immutable).

### Q2. What happens if you omit the second argument?
**Answer:** It extracts from `start` **to the end** of the string. `"JavaScript".substring(4)` → `"Script"`.

### Q3. What does `substring` do if `start > end`?
**Answer:** It **swaps** the two arguments. `"hello".substring(4, 1)` behaves like `substring(1, 4)` → `"ell"`. This auto-swap is unique to `substring`.

### Q4. How does `substring` treat negative arguments?
**Answer:** It treats any negative number (and `NaN`) as **`0`** — there is **no negative indexing**. `"hello".substring(-3)` → `"hello"`.

### Q5. What's the difference between `substring` and `slice`?
**Answer:** Two differences: (1) `slice` supports **negative indices** (count from the end) while `substring` clamps them to `0`; (2) when `start > end`, `substring` **swaps** the arguments but `slice` returns `""`. Both are end-exclusive and return new strings.

### Q6. What's the difference between `substring` and `substr`?
**Answer:** `substr(start, length)`'s second argument is a **length**, not an end index, and `substr` is **deprecated** (legacy). `substring(start, end)`'s second argument is an end index. Prefer `substring` or `slice`.

### Q7. What does `substring` return when `start === end`?
**Answer:** An **empty string** `""` (the range has zero length).

### Q8. What happens if an index is larger than the string length?
**Answer:** It's **clamped to the length**. `"hello".substring(2, 100)` → `"llo"`.

### Q9. How long is the returned string?
**Answer:** `end − start` characters (after negatives→0, clamping, and any swap are applied).

### Q10. Which method would you use to get the **last 3 characters**, and why not `substring`?
**Answer:** **`slice(-3)`** — because `substring` turns the negative index into `0` and would return the whole string. `"hello".slice(-3)` → `"llo"`.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log("programming".substring(0, 7));
console.log("programming".substring(7));
```
<details><summary>Answer</summary>

```
program
ming
```
`[0,7)` → `"program"`; from index 7 to the end → `"ming"`.
</details>

### Q2. Predict the output
```js
console.log("hello".substring(3, 1));
```
<details><summary>Answer</summary>

```
el
```
`start > end`, so it swaps to `substring(1, 3)` → `"el"`.
</details>

### Q3. Predict the output
```js
console.log("hello".substring(-2));
console.log("hello".slice(-2));
```
<details><summary>Answer</summary>

```
hello
lo
```
`substring` turns `-2` into `0` (whole string); `slice` counts 2 from the end.
</details>

### Q4. Predict the output
```js
console.log("abcdef".substring(2, 100));
console.log("abcdef".substring(2, 2));
```
<details><summary>Answer</summary>

```
cdef
            (empty string)
```
End is clamped to the length; `start === end` gives `""`.
</details>

### Q5. Predict the output
```js
const s = "hello";
s.substring(0, 3);
console.log(s);
```
<details><summary>Answer</summary>

```
hello
```
Strings are immutable; the returned slice was ignored, so `s` is unchanged.
</details>

### Q6. Coding task — get the file name without its extension
```js
// stripExt("report.final.pdf") -> "report.final"
```
<details><summary>Answer</summary>

```js
const stripExt = name => {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? name : name.substring(0, dot);
};
```
`lastIndexOf(".")` finds the final dot; `substring(0, dot)` keeps everything before it.
</details>

### Q7. Coding task — extract the text between two markers
```js
// between("[hello]", "[", "]") -> "hello"
```
<details><summary>Answer</summary>

```js
function between(str, open, close) {
  const openAt = str.indexOf(open);
  if (openAt === -1) return "";
  const start = openAt + open.length;          // first char after the opener
  const end = str.indexOf(close, start);       // search for closer AFTER start
  return end === -1 ? "" : str.substring(start, end);
}
between("name=[hello]", "[", "]"); // "hello"
```
`indexOf` locates each marker (the closer is searched *after* the opener), and `substring` pulls out what's between them.
</details>

### Q8. Spot the bug
```js
// Goal: return the last 4 chars of a string.
const last4 = s => s.substring(s.length - 4);
console.log(last4("hi"));   // expected ""? got "hi"
```
<details><summary>Answer</summary>

For `"hi"`, `s.length - 4` is `-2`, which `substring` turns into `0`, returning the whole `"hi"`. If you truly want the last 4 (and ≤ all of a short string), `slice(-4)` is cleaner and behaves predictably: `"hi".slice(-4)` → `"hi"`. The point: `substring` won't accept negatives, so the intent ("from the end") should use `slice`.
</details>

### Q9. Coding task — capitalize the first letter only
```js
// capitalize("hELLO") -> "Hello"
```
<details><summary>Answer</summary>

```js
const capitalize = s =>
  s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
```
First char upper, the rest (`substring(1)`) lower.
</details>

### Q10. Predict the output
```js
console.log("hello".substring(1, 4) === "hello".substring(4, 1));
```
<details><summary>Answer</summary>

```
true
```
Both produce `"ell"` — the second call swaps `4, 1` into `1, 4`.
</details>

---

## One-Line Cheat Sheet
- `substring(start, end)` → `[start, end)` (end **exclusive**), **new string**.
- Omit `end` → to the end; `start === end` → `""`.
- **Quirk:** `start > end` ⇒ arguments are **swapped**.
- Negative / `NaN` → **`0`** (no negative indexing); out-of-range → clamped to length.
- **`slice`** = negative-from-the-end indices, **no** swap (returns `""` if `start > end`).
- `substr(start, length)` is **legacy** — prefer `substring` / `slice`.
