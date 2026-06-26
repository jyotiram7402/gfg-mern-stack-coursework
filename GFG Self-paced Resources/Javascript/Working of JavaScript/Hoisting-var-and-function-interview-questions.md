# Interview Questions — Hoisting (`var` & `function`)

> Companion to [`Hoisting-var-and-function.md`](./Hoisting-var-and-function.md) and [`Hoisting-var-and-function.js`](./Hoisting-var-and-function.js).
> Try to answer each before expanding the explanation.

---

## Part A — Theory Questions

### Q1. What is hoisting?
**Answer:** Hoisting is JavaScript's behaviour of making variable and function declarations available before the line they are written, because memory for them is allocated during the **Memory Creation phase** of the execution context (before any code executes). Nothing is physically moved to the top — the engine simply reserves memory first.

### Q2. What value does a `var` have if accessed before its declaration?
**Answer:** `undefined`. The variable is hoisted and initialised to `undefined`; the actual value is assigned only when execution reaches that line. (No error is thrown.)

### Q3. Difference between hoisting of a function declaration and a function expression?
**Answer:**
- **Function declaration** (`function f(){}`) → the **entire function** is hoisted, so it can be called before its line.
- **Function expression** (`var f = function(){}`) → only the **variable** `f` is hoisted (as `undefined`); the function body is assigned at runtime. Calling it early throws **`TypeError: f is not a function`**.

### Q4. Are `let` and `const` hoisted?
**Answer:** Yes — they are hoisted but **not initialised**. They live in the **Temporal Dead Zone (TDZ)** from the start of the scope until their declaration line. Accessing them in the TDZ throws **`ReferenceError: Cannot access 'x' before initialization`**.

### Q5. Why does hoisting happen at all? (root cause)
**Answer:** It is a direct consequence of the **two-phase execution context**. In Phase 1 (Memory Creation) the engine scans the code and allocates memory for every declaration before Phase 2 (Code Execution) runs anything.

### Q6. Does hoisting move code to the top of the file?
**Answer:** No. This is a common misconception. The code stays where it is; only **memory allocation** happens first. The "moved to top" phrasing is just a mental model.

### Q7. What happens with `typeof` on a hoisted-but-unassigned `var` vs a TDZ `let`?
**Answer:** `typeof varName` → `"undefined"` (safe). `typeof letName` **before** its declaration → throws `ReferenceError` (TDZ applies even to `typeof`).

### Q8. Are arrow functions hoisted like function declarations?
**Answer:** No. An arrow function is always assigned to a variable, so it behaves like a **function expression** — only the variable is hoisted. Calling it before assignment throws `TypeError` (for `var`) or `ReferenceError` (for `let`/`const` due to TDZ).

---

## Part B — Coding / Output-Prediction Questions

### Q1. Predict the output
```js
console.log(a);
var a = 10;
console.log(a);
```
<details><summary>Answer</summary>

```
undefined
10
```
`a` is hoisted as `undefined`, then assigned `10` during execution.
</details>

### Q2. Predict the output
```js
foo();
function foo() { console.log("foo called"); }

bar();
var bar = function () { console.log("bar called"); };
```
<details><summary>Answer</summary>

```
foo called
TypeError: bar is not a function
```
`foo` is a declaration (hoisted whole). `bar` is an expression — only the variable hoists as `undefined`, so calling it throws `TypeError`.
</details>

### Q3. Predict the output
```js
console.log(x);
let x = 5;
```
<details><summary>Answer</summary>

```
ReferenceError: Cannot access 'x' before initialization
```
`let` is in the Temporal Dead Zone until its declaration line.
</details>

### Q4. What does this log, and why?
```js
var x = 1;
function test() {
  console.log(x);
  var x = 2;
}
test();
```
<details><summary>Answer</summary>

```
undefined
```
Inside `test`, the local `var x` is hoisted (as `undefined`) and **shadows** the outer `x`. So `console.log(x)` sees the local `undefined`, not the outer `1`.
</details>

### Q5. Predict the output
```js
function test() {
  console.log(typeof a);
  console.log(typeof b);
  var a = 1;
}
test();
```
<details><summary>Answer</summary>

```
undefined
undefined
```
`a` is hoisted as `undefined` → `typeof a` is `"undefined"`. `b` was never declared → `typeof` on an undeclared variable also safely returns `"undefined"` (no error).
</details>

### Q6. Function declaration vs expression with the same name
```js
console.log(fn);
function fn() {}
var fn = 5;
console.log(fn);
```
<details><summary>Answer</summary>

```
[Function: fn]
5
```
During memory creation the function declaration wins (whole function stored). The `var fn` declaration is ignored (already declared), but its **assignment** `= 5` runs in the execution phase, so the second log is `5`.
</details>

### Q7. Coding task — explain & fix
```js
// This throws. Why? How would you fix it without reordering the call?
greet();
var greet = () => console.log("hi");
```
<details><summary>Answer</summary>

It throws `TypeError: greet is not a function` because the arrow function is a **function expression** — only `var greet` hoists (as `undefined`).
**Fix:** convert it to a **function declaration**, which is hoisted whole:
```js
greet();
function greet() { console.log("hi"); }
```
</details>

---

## One-Line Cheat Sheet
- `var` → hoisted as `undefined`.
- `function` declaration → hoisted whole (callable early).
- function **expression** / arrow → only the variable hoists → `TypeError` if called early.
- `let` / `const` → hoisted but in **TDZ** → `ReferenceError` if accessed early.
- Hoisting = memory allocated in Phase 1; code is **not** physically moved.
