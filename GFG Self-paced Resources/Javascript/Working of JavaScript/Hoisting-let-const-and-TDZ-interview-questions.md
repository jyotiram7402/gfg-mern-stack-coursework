# Interview Questions — Hoisting: `let`, `const` & TDZ

> Companion to [`Hoisting-let-const-and-TDZ.md`](./Hoisting-let-const-and-TDZ.md) and [`Hoisting-let-const-and-TDZ.js`](./Hoisting-let-const-and-TDZ.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. Are `let` and `const` hoisted?
**Answer:** **Yes.** They are hoisted, but unlike `var` they are **not initialised** to `undefined`. They remain uninitialised in the **Temporal Dead Zone** until execution reaches their declaration line. The myth that they "aren't hoisted" comes from the fact that you can't access them early.

### Q2. What is the Temporal Dead Zone (TDZ)?
**Answer:** The TDZ is the region from the **start of the scope** up to the line where a `let`/`const` variable is declared & initialised. Accessing the variable anywhere in the TDZ throws `ReferenceError: Cannot access 'x' before initialization`.

### Q3. Difference between `var` and `let` when accessed before declaration?
**Answer:** `var` returns `undefined` (it was initialised to `undefined` during hoisting). `let` (and `const`) throw a `ReferenceError` because they are still uninitialised in the TDZ.

### Q4. Why was the TDZ introduced?
**Answer:** To catch bugs early by enforcing **declare-before-use**, to make `const` meaningful (no window where it's `undefined` before assignment), and to make code more predictable than `var`'s silent `undefined`.

### Q5. Does `typeof` work safely inside the TDZ?
**Answer:** **No.** Normally `typeof undeclaredVar` returns `"undefined"` without error, but `typeof` on a `let`/`const` still in its TDZ throws `ReferenceError`.

### Q6. Is `const` immutable?
**Answer:** Only the **binding** is constant — you cannot re-assign the variable. The **value** can still be mutated if it's an object or array (e.g. `arr.push(3)` is fine, `arr = []` throws `TypeError`).

### Q7. Scope difference between `var` and `let`/`const`?
**Answer:** `var` is **function-scoped** (ignores blocks). `let`/`const` are **block-scoped** — confined to the nearest `{ }`.

### Q8. Do `let`/`const` attach to the global object?
**Answer:** No. A top-level `var x` becomes a property of the global object (`window.x` / `globalThis.x`). `let`/`const` at the top level do **not** — they live in a separate "script" scope.

### Q9. What two errors are unique to `const`?
**Answer:**
- Missing initializer → `SyntaxError: Missing initializer in const declaration` (must assign at declaration).
- Re-assignment → `TypeError: Assignment to constant variable`.

### Q10. Can you re-declare a `let` in the same scope?
**Answer:** No — `SyntaxError: Identifier 'x' has already been declared`. `var` allows re-declaration; `let`/`const` do not.

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log(a);
let a = 3;
```
<details><summary>Answer</summary>

```
ReferenceError: Cannot access 'a' before initialization
```
`a` is in the TDZ until its declaration line.
</details>

### Q2. Predict the output
```js
console.log(typeof x);
let x = 1;
```
<details><summary>Answer</summary>

```
ReferenceError: Cannot access 'x' before initialization
```
`typeof` does **not** save you inside the TDZ.
</details>

### Q3. Predict the output
```js
const obj = { n: 1 };
obj.n = 2;
console.log(obj.n);
obj = { n: 3 };
```
<details><summary>Answer</summary>

```
2
TypeError: Assignment to constant variable.
```
Mutating a property is allowed; re-assigning the binding is not.
</details>

### Q4. Classic loop trap — predict the output of both
```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log("var", i));
for (let j = 0; j < 3; j++) setTimeout(() => console.log("let", j));
```
<details><summary>Answer</summary>

```
var 3
var 3
var 3
let 0
let 1
let 2
```
`var i` is one function-scoped variable shared by all callbacks (final value 3). `let j` is **block-scoped per iteration**, so each callback captures its own `j`.
</details>

### Q5. Predict the output
```js
let x = "outer";
{
  console.log(x);
  let x = "inner";
}
```
<details><summary>Answer</summary>

```
ReferenceError: Cannot access 'x' before initialization
```
The inner `let x` creates a new block-scoped binding that **shadows** the outer one and is in the TDZ at the `console.log` line — so the outer `x` is not used.
</details>

### Q6. Predict the output
```js
function test() {
  console.log(a);   // (1)
  console.log(b);   // (2)
  var a = 1;
  let b = 2;
}
test();
```
<details><summary>Answer</summary>

```
undefined                                        // (1)
ReferenceError: Cannot access 'b' before initialization   // (2)
```
`var a` hoists as `undefined`; `let b` is in the TDZ.
</details>

### Q7. Will this run? Why / why not?
```js
const x;
x = 10;
console.log(x);
```
<details><summary>Answer</summary>

It throws at parse time:
```
SyntaxError: Missing initializer in const declaration
```
`const` **must** be initialised on the same line as its declaration. (The whole script fails to run — it's a syntax error, not a runtime one.)
</details>

### Q8. Coding task — fix the bug
```js
// Goal: print 0,1,2 one second apart. It prints 3,3,3. Fix it.
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
```
<details><summary>Answer</summary>

Change `var` to `let` so each iteration gets its own block-scoped `i`:
```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), i * 1000);
}
// prints 0, 1, 2
```
(Pre-ES6 alternative: wrap in an IIFE that captures `i` per iteration.)
</details>

---

## One-Line Cheat Sheet
- `let`/`const` **are hoisted**, but uninitialised → **TDZ**.
- TDZ access (even `typeof`) → **`ReferenceError`**.
- `var` → `undefined` early; function-scoped; attaches to global object.
- `let`/`const` → block-scoped; no global-object property; no re-declaration.
- `const` → must initialise; no re-assign (but contents are mutable).
- Loop closures: `let` captures per-iteration; `var` shares one binding.
