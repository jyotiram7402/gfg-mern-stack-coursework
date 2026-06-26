# Interview Questions — `toUpperCase()` & `toLowerCase()`

> Companion to [`toUpperCase-and-toLowerCase.md`](./toUpperCase-and-toLowerCase.md) and [`toUpperCase-and-toLowerCase.js`](./toUpperCase-and-toLowerCase.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. Do `toUpperCase` / `toLowerCase` change the original string?
**Answer:** **No.** Strings are **immutable**. These methods return a **new string**; the original is unchanged. You must capture the return value (`str = str.toUpperCase()`).

### Q2. Do they take any arguments?
**Answer:** No — the plain versions take **no arguments**. Their **locale** variants (`toLocaleUpperCase`/`toLocaleLowerCase`) optionally take a locale (BCP 47 language tag).

### Q3. What happens to non-letter characters (digits, spaces, symbols)?
**Answer:** They **pass through unchanged**. Only alphabetic characters are converted (including accented ones, e.g. `é` → `É`).

### Q4. What's the most common real-world use?
**Answer:** **Case-insensitive comparison / search** — normalize both sides to the same case: `a.toLowerCase() === b.toLowerCase()`, or `str.toLowerCase().includes(sub.toLowerCase())`.

### Q5. When do you need `toLocaleUpperCase`/`toLocaleLowerCase`?
**Answer:** When converting **display text in a language with special casing rules**. The classic example is **Turkish**: `"i".toLocaleUpperCase("tr")` → `"İ"` and `"I".toLocaleLowerCase("tr")` → `"ı"`, which differ from the language-neutral `"I"`/`"i"`.

### Q6. Can case conversion change a string's length? Give an example.
**Answer:** **Yes.** German sharp-s `"ß".toUpperCase()` → `"SS"` (1 char → 2). So `s.length` is **not** guaranteed to equal `s.toUpperCase().length`.

### Q7. Can you call `toUpperCase` on a number?
**Answer:** No — it's a **String** method. `(255).toUpperCase()` throws `TypeError`. Convert first: `String(255).toUpperCase()` or `(255).toString(16).toUpperCase()`.

### Q8. Which methods do these pair with for case-insensitive search?
**Answer:** `includes`, `indexOf`, `startsWith`, `endsWith`, and `===` — lower/upper-case both operands first.

### Q9. Why use the plain methods rather than the locale ones for things like URLs or keys?
**Answer:** Machine-facing text (identifiers, protocols, lookup keys) should convert **consistently regardless of the user's locale**. The plain methods use **language-neutral** rules, avoiding surprises like the Turkish `i`.

### Q10. How would you capitalize just the first letter of a word?
**Answer:** Combine `toUpperCase` on the first character with the rest:
```js
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
```

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
let s = "hello";
s.toUpperCase();
console.log(s);
```
<details><summary>Answer</summary>

```
hello
```
The return value was ignored; strings are immutable, so `s` is unchanged. You'd need `s = s.toUpperCase()`.
</details>

### Q2. Predict the output
```js
console.log("aBc123".toUpperCase());
console.log("aBc123".toLowerCase());
```
<details><summary>Answer</summary>

```
ABC123
abc123
```
Digits are untouched; only letters change case.
</details>

### Q3. Predict the output
```js
console.log("ß".toUpperCase());
console.log("ß".toUpperCase().length);
```
<details><summary>Answer</summary>

```
SS
2
```
Upper-casing the German sharp-s produces two characters, so the length grows.
</details>

### Q4. Predict the output
```js
console.log("I".toLowerCase());
console.log("I".toLocaleLowerCase("tr"));
```
<details><summary>Answer</summary>

```
i
ı
```
Default rules give a dotted `i`; Turkish locale gives the **dotless** `ı`.
</details>

### Q5. Predict the output
```js
const a = "Node.JS", b = "node.js";
console.log(a === b);
console.log(a.toLowerCase() === b.toLowerCase());
```
<details><summary>Answer</summary>

```
false
true
```
Direct comparison is case-sensitive; lower-casing both makes them equal.
</details>

### Q6. Coding task — case-insensitive equality
```js
// equalsIgnoreCase("Hello", "HELLO") -> true
```
<details><summary>Answer</summary>

```js
const equalsIgnoreCase = (a, b) => a.toLowerCase() === b.toLowerCase();
```
</details>

### Q7. Coding task — title case a sentence
```js
// titleCase("the quick brown fox") -> "The Quick Brown Fox"
```
<details><summary>Answer</summary>

```js
const titleCase = str =>
  str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
```
Lowercase everything first so already-uppercase input is normalized, then capitalize each word's first letter.
</details>

### Q8. Spot the bug
```js
function normalize(email) {
  email.toLowerCase();
  return email;
}
console.log(normalize("USER@Site.com"));
```
<details><summary>Answer</summary>

Prints `USER@Site.com` unchanged — the result of `toLowerCase()` is discarded. Fix:
```js
function normalize(email) {
  return email.toLowerCase();
}
```
</details>

### Q9. Coding task — count uppercase letters
```js
// countUpper("HeLLo World") -> 4  (H, L, L, W)
```
<details><summary>Answer</summary>

```js
const countUpper = str =>
  [...str].filter(ch => ch !== ch.toLowerCase() && ch === ch.toUpperCase()).length;
```
A letter is uppercase if it equals its upper form but not its lower form (the second check excludes non-letters like digits/spaces, where both forms are equal).
</details>

### Q10. Predict the output
```js
console.log((3735928559).toString(16).toUpperCase());
```
<details><summary>Answer</summary>

```
DEADBEEF
```
`toString(16)` gives the hex string `"deadbeef"`, and `toUpperCase` makes it uppercase — `toUpperCase` works fine on the resulting string.
</details>

---

## One-Line Cheat Sheet
- Return a **NEW string**; original **never mutated** — always capture the result.
- **No arguments**; non-letters pass through; accents converted.
- #1 use: **case-insensitive** compare/search (pair with `includes`/`indexOf`/`===`).
- Locale rules (Turkish `i`/`İ`/`ı`) → `toLocaleUpperCase`/`toLocaleLowerCase(locale)`.
- Length can **change** (`ß` → `SS`) — don't assume it's preserved.
- **Strings only** — `String(x).toUpperCase()` for numbers/booleans.
