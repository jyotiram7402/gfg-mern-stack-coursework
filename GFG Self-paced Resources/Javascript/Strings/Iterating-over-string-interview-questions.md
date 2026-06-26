# Interview Questions — Iterating Over a String

> Companion to [`Iterating-over-string.md`](./Iterating-over-string.md) and [`Iterating-over-string.js`](./Iterating-over-string.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What are the main ways to iterate over a string in JS?
**Answer:** Classic `for` loop with index (`str[i]`/`charAt`), **`for...of`**, spread `[...str]`, `Array.from(str)`, array methods after spreading/splitting (`forEach`/`map`/…), and `for...in` (**not recommended**). Strings are both **array-like** and **iterable**, which is why all of these work.

### Q2. Which method is the modern, recommended way and why?
**Answer:** **`for...of`**. It uses the string's iterator, so it yields whole **Unicode code points** (emojis/surrogate pairs stay intact), and it has the cleanest syntax when you only need the characters.

### Q3. Why is `for...in` discouraged for strings?
**Answer:** `for...in` iterates **enumerable keys** — for a string those are the **indices as strings** (`"0"`, `"1"`, …), not the characters. It can also pick up inherited/added enumerable properties on `String.prototype`, and iteration order isn't guaranteed by spec. It's designed for object properties.

### Q4. What's the difference between a UTF‑16 code unit and a Unicode code point here?
**Answer:** JS strings are sequences of **UTF‑16 code units** (16-bit). Characters outside the Basic Multilingual Plane (e.g. `😀`, U+1F600) are stored as **two** code units (a *surrogate pair*). A **code point** is the full character. Index-based access (`str[i]`, `split("")`) walks **code units** (breaks the pair); `for...of`/spread/`Array.from` walk **code points** (keep it whole).

### Q5. What does `"😀".length` return, and why?
**Answer:** `2` — because `length` counts **UTF‑16 code units**, and `😀` is a surrogate pair. For the true character count use `[..."😀"].length` → `1`.

### Q6. Difference between `str[i]` and `str.charAt(i)`?
**Answer:** Both return the 1-char string at index `i`. The difference is **out of range**: `str[i]` returns `undefined`, while `str.charAt(i)` returns an empty string `""`.

### Q7. `charCodeAt` vs `codePointAt`?
**Answer:** `charCodeAt(i)` returns the **UTF‑16 code unit** (0–65535) at `i` — for an emoji you'd only get one half. `codePointAt(i)` returns the **full Unicode code point** (correctly combining a surrogate pair). Use `codePointAt` when dealing with non-BMP characters.

### Q8. Can you mutate a string while iterating?
**Answer:** No — strings are **immutable**. `str[0] = "x"` silently fails (throws in strict mode). Any "modification" produces a **new** string.

### Q9. How do `[...str]` and `Array.from(str)` differ?
**Answer:** Both produce an array of **code points** (Unicode-safe). `Array.from` additionally accepts a **map function** as a second argument — e.g. `Array.from("abc", c => c.toUpperCase())` — and can convert any array-like/iterable, not just spreadable ones.

### Q10. You need both the character and its index, Unicode-safely. How?
**Answer:** Spread first, then use `.entries()` or `forEach`: `for (const [i, ch] of [...str].entries())` or `[...str].forEach((ch, i) => …)`. A plain `for...of` gives no index; a classic `for` gives an index but isn't Unicode-safe.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
for (const ch of "ab😀") console.log(ch);
```
<details><summary>Answer</summary>

```
a
b
😀
```
`for...of` iterates **code points**, so the emoji is a single iteration.
</details>

### Q2. Predict the output
```js
for (const i in "ab") console.log(i, typeof i);
```
<details><summary>Answer</summary>

```
0 string
1 string
```
`for...in` yields the **index keys as strings**, not the characters.
</details>

### Q3. Predict the output
```js
console.log("😀".length);
console.log([..."😀"].length);
console.log("😀".split("").length);
```
<details><summary>Answer</summary>

```
2
1
2
```
`.length` and `split("")` count **code units** (the surrogate pair = 2); spread counts **code points** (1).
</details>

### Q4. Predict the output
```js
console.log("abc"[5]);
console.log("abc".charAt(5));
```
<details><summary>Answer</summary>

```
undefined
''
```
Out-of-range: bracket access → `undefined`, `charAt` → empty string.
</details>

### Q5. Why does this reverse corrupt the emoji, and how do you fix it?
```js
const reverse = s => s.split("").reverse().join("");
console.log(reverse("ab😀"));   // ?
```
<details><summary>Answer</summary>

`split("")` splits the emoji into its two surrogate halves; reversing then separates them and produces a corrupted (mojibake) character. Fix by iterating **code points**:
```js
const reverse = s => [...s].reverse().join("");
console.log(reverse("ab😀"));   // "😀ba"
```
</details>

### Q6. Coding task — count vowels in a string
```js
// Return how many vowels (a,e,i,o,u, case-insensitive) are in the string.
function countVowels(str) {
  // your code
}
```
<details><summary>Answer</summary>

```js
function countVowels(str) {
  let count = 0;
  for (const ch of str.toLowerCase()) {
    if ("aeiou".includes(ch)) count++;
  }
  return count;
}
// or, functional style:
const countVowels2 = str =>
  [...str.toLowerCase()].filter(c => "aeiou".includes(c)).length;
```
`for...of` keeps it readable; spreading enables the `filter` one-liner.
</details>

### Q7. Coding task — character frequency map
```js
// Return an object mapping each character to how many times it appears.
// charFrequency("aba") -> { a: 2, b: 1 }
```
<details><summary>Answer</summary>

```js
function charFrequency(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}
// functional alternative:
const charFreq2 = str =>
  [...str].reduce((acc, ch) => ((acc[ch] = (acc[ch] || 0) + 1), acc), {});
```
</details>

### Q8. Predict the output
```js
const out = [];
for (const [i, ch] of [..."hi"].entries()) out.push(`${i}:${ch}`);
console.log(out.join(" "));
```
<details><summary>Answer</summary>

```
0:h 1:i
```
Spreading to an array then `.entries()` gives `[index, char]` pairs — the standard Unicode-safe way to get the index with `for...of`.
</details>

### Q9. Coding task — check palindrome
```js
// Return true if the string reads the same forwards and backwards.
```
<details><summary>Answer</summary>

```js
const isPalindrome = str => {
  const clean = [...str.toLowerCase()];     // code-point safe
  return clean.join("") === clean.reverse().join("");
};
// classic two-pointer (ASCII, no extra array):
function isPalindrome2(s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
}
```
The two-pointer version shows the classic `for` loop's strength: index control without allocating an array.
</details>

### Q10. When would you deliberately choose the classic `for` loop over `for...of`?
<details><summary>Answer</summary>

When you need the **index**, need to **step/skip** (e.g. every 2nd char), **iterate backwards**, two-pointer algorithms, or you're working with guaranteed-ASCII data and want to avoid the iterator/array overhead. For plain character reading on possibly-Unicode text, prefer `for...of`.
</details>

---

## One-Line Cheat Sheet
- `for...of` → **code points**, Unicode-safe → default for reading characters.
- Classic `for` → **code units** + index → control, stepping, reverse, two-pointer.
- `[...str]` / `Array.from(str)` → array of code points → `map`/`filter`/`reduce`; `Array.from` takes a map fn.
- `split("")` & `str[i]` → **code units** → break emojis/surrogate pairs.
- **Avoid `for...in`** for strings (index **strings** + possible extra props).
- `"😀".length === 2`; true count = `[...str].length`. Strings are **immutable**.
