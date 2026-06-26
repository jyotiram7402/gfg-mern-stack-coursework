# Hoisting in JavaScript — `var` & `function`

> **Tip:** Open VS Code's Markdown preview with `Ctrl+Shift+V` to see the Mermaid diagrams. They also render on GitHub. See [`Hoisting-var-and-function.js`](./Hoisting-var-and-function.js) for runnable demos and [`Hoisting-var-and-function-interview-questions.md`](./Hoisting-var-and-function-interview-questions.md) for interview prep.

Builds on [Execution Context](./Execution-context.md) and [How JS Executes Code](./How-JS-executes-code.md). Hoisting is a **direct consequence of the Memory Creation phase** of the execution context.

---

## 1. What Is Hoisting?

**Hoisting** is JavaScript's behaviour of letting you access variables and functions **before** the line where they are written — because memory for them is allocated during **Phase 1 (Memory Creation)**, *before* any code runs.

> Nothing is physically "moved to the top." The engine simply **allocates memory first**, so the names already exist when execution begins.

```mermaid
flowchart LR
    A["Phase 1: Memory Creation"] --> B["var → undefined<br/>function → whole function stored"]
    B --> C["Phase 2: Code Execution"]
    C --> D["names already exist,<br/>so 'early' access works"]
```

---

## 2. How `var` Is Hoisted

A `var` declaration is hoisted and **initialised to `undefined`**. So using it before its line gives `undefined` (not an error, and not its later value).

```js
console.log(x); // undefined  ← hoisted, value not assigned yet
var x = 7;
console.log(x); // 7          ← assigned during execution phase
```

```mermaid
flowchart TB
    subgraph P1["Phase 1 — Memory"]
        M["x : undefined"]
    end
    subgraph P2["Phase 2 — Execution"]
        E1["log(x) → undefined"]
        E2["x = 7"]
        E3["log(x) → 7"]
    end
    P1 --> P2
```

---

## 3. How `function` Is Hoisted

A **function declaration** is hoisted with its **entire body**. So you can call it before it appears in the code.

```js
greet();                       // "Hello!"  ← works, whole function hoisted
function greet() {
  console.log("Hello!");
}
```

```mermaid
flowchart TB
    subgraph MEM["Phase 1 — Memory"]
        G["greet : { console.log('Hello!') }"]
    end
    MEM --> CALL["Phase 2: greet() runs fine"]
```

---

## 4. The Big Gotcha — Function **Expressions** & Arrow Functions

When a function is assigned to a `var`, only the **variable** is hoisted (as `undefined`) — **not** the function body. Calling it early throws `TypeError: ... is not a function`.

```js
greetDecl();   // ✅ "I am a declaration"
greetExpr();   // ❌ TypeError: greetExpr is not a function

function greetDecl() { console.log("I am a declaration"); }
var greetExpr = function () { console.log("I am an expression"); };
```

```mermaid
flowchart TB
    subgraph MEM["Phase 1 — Memory"]
        D["greetDecl : { whole function }  ✅ callable early"]
        X["greetExpr : undefined  ❌ not a function yet"]
    end
```

> The same applies to **arrow functions** assigned to `var`/`let`/`const` — they behave like expressions, not declarations.

---

## 5. `var` vs `function` Hoisting at a Glance

| Thing | Hoisted? | Initial value in memory | Use before declaration? |
|-------|----------|-------------------------|-------------------------|
| `var x` | ✅ Yes | `undefined` | Returns `undefined` |
| `function f(){}` (declaration) | ✅ Yes | **entire function** | ✅ Works |
| `var f = function(){}` (expression) | ✅ variable only | `undefined` | ❌ `TypeError` |
| `var f = () => {}` (arrow) | ✅ variable only | `undefined` | ❌ `TypeError` |

> `let` / `const` are also hoisted but stay **uninitialised** in the **Temporal Dead Zone** → accessing early throws `ReferenceError`. (Covered in [Execution Context](./Execution-context.md); a dedicated topic can follow.)

---

## 6. Decision Flow

```mermaid
flowchart TD
    Start(["Access a name before its line?"]) --> Q1{"What kind?"}
    Q1 -- "var" --> A["value is undefined"]
    Q1 -- "function declaration" --> B["fully usable — calls work"]
    Q1 -- "function expression / arrow (var)" --> C["TypeError:<br/>not a function"]
    Q1 -- "let / const" --> D["ReferenceError (TDZ)"]
```

---

## Quick Summary

- **Hoisting** = names exist before execution because memory is allocated in **Phase 1**.
- `var` → hoisted as **`undefined`** (early access returns `undefined`, no error).
- **Function declarations** → hoisted **whole** → callable before their line.
- **Function expressions / arrow functions** assigned to `var` → only the variable hoists as `undefined` → calling early throws **`TypeError`**.
- `let` / `const` → hoisted but in the **Temporal Dead Zone** → early access throws **`ReferenceError`**.
- Nothing is physically moved; the engine just reserves memory first.
