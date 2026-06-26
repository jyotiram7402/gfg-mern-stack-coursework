# Interview Questions — `charAt()` & `charCodeAt()`

> Companion to [`charAt-and-charCodeAt.md`](./charAt-and-charCodeAt.md) and [`charAt-and-charCodeAt.js`](./charAt-and-charCodeAt.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What's the difference between `charAt` and `charCodeAt`?
**Answer:** `charAt(i)` returns the **character** at index `i` as a one-character **string**. `charCodeAt(i)` returns the **number** — the UTF‑16 code unit (0–65535) at that index.

### Q2. What does `charAt` return for an out-of-range index? And `charCodeAt`?
**Answer:** `charAt` returns an **empty string `""`**; `charCodeAt` returns **`NaN`**.

### Q3. What happens if you call them with no argument?
**Answer:** Both default the index to **`0`** — `str.charAt()` ≡ `str.charAt(0)` and `str.charCodeAt()` ≡ `str.charCodeAt(0)`.

### Q4. How is `charAt(i)` different from bracket access `str[i]`?
**Answer:** For an out-of-range index, `charAt` returns `""` while `str[i]` returns `undefined`. `charAt` also coerces a non-numeric/missing index to `0`, whereas `str["x"]` is `undefined`. Otherwise both return the same character for valid indices.

### Q5. What's the inverse of `charCodeAt`?
**Answer:** **`String.fromCharCode(code)`** — a **static** method on `String` that builds a string from one or more UTF‑16 code units. `"A".charCodeAt(0)` → `65`, and `String.fromCharCode(65)` → `"A"`.

### Q6. Do these methods change the original string?
**Answer:** No. Strings are **immutable**; both methods only *read* a position and return a new value.

### Q7. What do they return for an emoji like `😀`, and why?
**Answer:** `😀` (U+1F600) is stored as a **surrogate pair** (two UTF‑16 code units). `charAt(0)`/`charCodeAt(0)` see only the **first half** — `charCodeAt(0)` returns `55357`, not `128512`. For the full code point use **`codePointAt(0)`** (→ `128512`) and **`String.fromCodePoint`** to reverse it.

### Q8. What are the ASCII codes for `'0'`, `'A'`, and `'a'`?
**Answer:** `'0'` = 48, `'A'` = 65, `'a'` = 97. The gap between a lowercase and its uppercase letter is **32** (`'a' - 'A'`).

### Q9. When would you reach for `charCodeAt` over comparing characters directly?
**Answer:** When you need **numeric reasoning** about characters — range checks (`isUpper`/`isDigit`), Caesar/ROT ciphers, alphabet positions, sorting/hashing — because letters and digits are **contiguous** in ASCII, so arithmetic on codes is cleaner and faster than long equality chains.

### Q10. Why is `"😀".length` equal to 2?
**Answer:** Because `length` (like `charAt`/`charCodeAt`) counts **UTF‑16 code units**, and the emoji is a 2-unit surrogate pair. The true character count is `[..."😀"].length` → `1`.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log("hello".charAt(1));
console.log("hello".charCodeAt(1));
```
<details><summary>Answer</summary>

```
e
101
```
`charAt` → the character `'e'`; `charCodeAt` → its code `101`.
</details>

### Q2. Predict the output
```js
console.log("abc".charAt(10));
console.log("abc".charCodeAt(10));
console.log("abc"[10]);
```
<details><summary>Answer</summary>

```
            (empty string)
NaN
undefined
```
Out of range: `charAt` → `""`, `charCodeAt` → `NaN`, bracket access → `undefined`.
</details>

### Q3. Predict the output
```js
console.log("hi".charAt());
console.log("hi".charCodeAt());
```
<details><summary>Answer</summary>

```
h
104
```
No argument → index defaults to `0` → `'h'` / `104`.
</details>

### Q4. Predict the output
```js
console.log(String.fromCharCode("Z".charCodeAt(0) + 1));
```
<details><summary>Answer</summary>

```
[
```
`'Z'` is 90; `+1` → 91, and `String.fromCharCode(91)` is `'['` (the char right after `Z` in ASCII).
</details>

### Q5. Predict the output
```js
const e = "😀";
console.log(e.length);
console.log(e.charCodeAt(0));
console.log(e.codePointAt(0));
```
<details><summary>Answer</summary>

```
2
55357
128512
```
The emoji is a surrogate pair: `length` counts 2 units, `charCodeAt(0)` returns the first half's code, `codePointAt(0)` returns the full code point.
</details>

### Q6. Coding task — check if a single character is an uppercase letter
```js
function isUpperCaseLetter(ch) {
  // your code
}
```
<details><summary>Answer</summary>

```js
function isUpperCaseLetter(ch) {
  const c = ch.charCodeAt(0);
  return c >= 65 && c <= 90;   // 'A'..'Z'
}
```
</details>

### Q7. Coding task — convert a lowercase letter to uppercase **without** `toUpperCase()`
```js
// 'a' -> 'A'  (assume a single lowercase letter)
```
<details><summary>Answer</summary>

```js
const toUpper = ch => String.fromCharCode(ch.charCodeAt(0) - 32);
toUpper("g"); // 'G'
```
Uppercase letters are 32 below their lowercase counterparts in ASCII.
</details>

### Q8. Coding task — Caesar cipher (shift lowercase letters by `n`, wrapping)
```js
// encrypt("abc", 1) -> "bcd" ;  encrypt("xyz", 1) -> "yza"
```
<details><summary>Answer</summary>

```js
function encrypt(str, n) {
  let out = "";
  for (let i = 0; i < str.length; i++) {
    const shifted = (str.charCodeAt(i) - 97 + n) % 26 + 97;
    out += String.fromCharCode(shifted);
  }
  return out;
}
```
Map to 0–25 (`- 97`), shift and wrap (`% 26`), map back (`+ 97`).
</details>

### Q9. Coding task — sum of character codes (a simple hash)
```js
// codeSum("AB") -> 65 + 66 -> 131
```
<details><summary>Answer</summary>

```js
const codeSum = str => {
  let total = 0;
  for (let i = 0; i < str.length; i++) total += str.charCodeAt(i);
  return total;
};
// functional: [...str].reduce((s, ch) => s + ch.charCodeAt(0), 0)
```
</details>

### Q10. Spot the bug
```js
// Goal: get the last character of any string.
function lastChar(str) {
  return str.charAt(str.length);
}
```
<details><summary>Answer</summary>

Off-by-one — `str.length` is **one past** the last valid index, so this always returns `""`. Use `str.length - 1`:
```js
const lastChar = str => str.charAt(str.length - 1);
```
</details>

---

## One-Line Cheat Sheet
- `charAt(i)` → **character** (string); out of range → `""`.
- `charCodeAt(i)` → **number** (UTF‑16 code unit 0–65535); out of range → `NaN`.
- Both default to index `0`; both **read-only** (immutable strings).
- `charAt` out-of-range = `""`; `str[i]` out-of-range = `undefined`.
- `String.fromCharCode(code)` ↔ inverse of `charCodeAt`.
- Code **units** → break emojis; use `codePointAt` / `String.fromCodePoint`.
- ASCII: `'0'`=48, `'A'`=65, `'a'`=97; lower − upper = 32.
