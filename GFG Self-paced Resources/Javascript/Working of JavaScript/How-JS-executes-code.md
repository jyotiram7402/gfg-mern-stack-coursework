# How JavaScript Executes Code

> **Tip:** Open VS Code's Markdown preview with `Ctrl+Shift+V` to see the Mermaid diagrams. They also render on GitHub. See [`How-JS-executes-code.js`](./How-JS-executes-code.js) for runnable demos.

This builds directly on the [Execution Context](./Execution-context.md) topic. Here we trace **exactly what the JS engine does, step by step**, when it runs a program.

---

## 1. The Big Picture

When you run a JS program, an **Execution Context** is created and pushed onto the **Call Stack**. The engine then processes the code in **two phases**.

```mermaid
flowchart LR
    A["Run program"] --> B["Global Execution Context<br/>created &amp; pushed to Call Stack"]
    B --> C["Phase 1<br/>Memory Creation"]
    C --> D["Phase 2<br/>Code Execution"]
    D --> E["GEC popped<br/>when done"]
```

---

## 2. Phase 1 — Memory Creation (Hoisting)

The engine scans the **whole** code first, line by line, and allocates memory **before running anything**.

- `var` variables → reserved with the placeholder value **`undefined`**.
- Function declarations → the **entire function code** is copied into memory.
- `let` / `const` → memory reserved but left **uninitialised** (Temporal Dead Zone).

```mermaid
flowchart TB
    subgraph MEM["MEMORY after Phase 1 (for the sample below)"]
        n["n : undefined"]
        square["square : { whole function }"]
        square2["square2 : undefined"]
        square4["square4 : undefined"]
    end
```

**Sample program used throughout this topic:**
```js
var n = 2;
function square(num) {
  var ans = num * num;
  return ans;
}
var square2 = square(n);
var square4 = square(4);
```

---

## 3. Phase 2 — Code Execution

Now the engine runs the code line by line, filling in real values and **invoking functions**.

1. `n = 2` → placeholder `undefined` is replaced by `2`.
2. `function square` → nothing to do (already in memory).
3. `square2 = square(n)` → **a new Function Execution Context is created** and pushed onto the stack.

### What happens on each function invocation

```mermaid
flowchart LR
    A["square(2) called"] --> B["NEW Function EC created"]
    B --> C["Phase 1 inside it:<br/>num = undefined<br/>ans = undefined"]
    C --> D["Phase 2 inside it:<br/>num = 2, ans = 4"]
    D --> E["return 4"]
    E --> F["Function EC deleted<br/>(popped off stack)"]
```

When the function hits `return`, its value is handed back to where it was called, and that **whole function context is destroyed** — it is popped off the Call Stack.

---

## 4. The Call Stack Through the Whole Program

The Call Stack (LIFO) is what the engine uses to keep track of *where it is*.

```mermaid
sequenceDiagram
    participant CS as Call Stack
    Note over CS: 1. Program starts → push GEC
    Note over CS: 2. square(n) called → push E1(square)
    Note over CS: 3. square returns 4 → pop E1
    Note over CS: 4. square(4) called → push E2(square)
    Note over CS: 5. square returns 16 → pop E2
    Note over CS: 6. Program ends → pop GEC (stack empty)
```

| Step | Action | Stack (top → bottom) |
|------|--------|----------------------|
| 1 | Program starts | `GEC` |
| 2 | `square(n)` called | `E1(square)`, `GEC` |
| 3 | `square` returns 4 | `GEC` |
| 4 | `square(4)` called | `E2(square)`, `GEC` |
| 5 | `square` returns 16 | `GEC` |
| 6 | Program ends | *(empty)* |

---

## 5. Why "Single-Threaded & Synchronous"?

```mermaid
flowchart LR
    L1["Line 1"] --> L2["Line 2"] --> L3["Line 3"] --> L4["..."]
```

- **Single-threaded:** the engine has **one** Call Stack, so it does **one thing at a time**.
- **Synchronous:** it executes in order — it will not move to the next line until the current one finishes.
- Long-running code therefore **blocks** the stack. (Async behaviour — timers, fetch, promises — is provided by the *runtime* around the engine via the event loop, not by the engine itself.)

---

## 6. Step-by-Step Recap

```mermaid
flowchart TD
    Start(["Program runs"]) --> A["GEC pushed to Call Stack"]
    A --> B["Phase 1: memory allocated<br/>(var=undefined, functions stored)"]
    B --> C["Phase 2: execute line by line"]
    C --> D{"Function called?"}
    D -- "Yes" --> E["Create new Function EC<br/>(repeat both phases inside)"]
    E --> F["return → pop the Function EC"]
    F --> C
    D -- "No" --> G["Continue next line"]
    G --> H{"More code?"}
    H -- "Yes" --> C
    H -- "No" --> I["Pop GEC → stack empty"]
    I --> End(["Program ends"])
```

---

## Quick Summary

- A program run creates the **Global Execution Context**, pushed onto the **Call Stack**.
- Every EC runs in **two phases**: Memory Creation (hoisting) → Code Execution.
- Each **function call** creates a new Function EC that repeats both phases, then is **popped** on `return`.
- The **Call Stack** (LIFO) tracks the currently executing context.
- The JS engine is **single-threaded & synchronous** — one Call Stack, one task at a time.
