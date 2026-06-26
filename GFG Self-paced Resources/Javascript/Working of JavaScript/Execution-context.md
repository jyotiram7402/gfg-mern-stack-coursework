# JavaScript Execution Context — Complete Guide

> **Tip:** Open VS Code's Markdown preview with `Ctrl+Shift+V` to see the Mermaid diagrams rendered as real visuals. They also render automatically on GitHub.

Everything in JavaScript happens inside an **Execution Context (EC)** — a sealed environment in which a piece of JS code is evaluated and executed. It holds the variables, functions, the value of `this`, and a reference to the outer (lexical) environment.

---

## 1. The Two Components of an Execution Context

```mermaid
flowchart TB
    subgraph EC["EXECUTION CONTEXT"]
        direction LR
        MEM["🧠 Memory Component<br/>(Variable Environment)<br/><br/>• stores variables &amp; functions<br/>as key : value pairs<br/>• where HOISTING happens"]
        CODE["⚙️ Code Component<br/>(Thread of Execution)<br/><br/>• runs code ONE line<br/>at a time, in order"]
    end
```

JavaScript is **single-threaded** (one command at a time) and **synchronous** (in order, finishing each line before the next).

---

## 2. The Two Phases of Execution

When **any** execution context is created, it runs in two phases:

```mermaid
flowchart LR
    A["Context Created"] --> B["Phase 1:<br/>CREATION / MEMORY<br/>(hoisting)"]
    B --> C["Phase 2:<br/>EXECUTION / CODE<br/>(line by line)"]

    B -.-> B1["var → undefined"]
    B -.-> B2["let / const → uninitialised<br/>(Temporal Dead Zone)"]
    B -.-> B3["function decl → whole function stored"]
```

| Phase | What happens |
|-------|-------------|
| **1. Creation / Memory** | Memory is allocated. `var` → `undefined`, `let`/`const` → uninitialised (TDZ), function declarations → entire function stored. |
| **2. Execution / Code** | Code runs line by line; values are assigned and functions are invoked. Each invocation creates a brand-new context. |

---

## 3. Types of Execution Context

```mermaid
flowchart TD
    ROOT["Execution Context"] --> GEC["🌍 Global EC (GEC)<br/>• created once when script runs<br/>• creates global object + this"]
    ROOT --> FEC["🔧 Function EC (FEC)<br/>• created on EVERY function call<br/>• own memory, this, arguments"]
    ROOT --> EVAL["⚠️ Eval EC<br/>• inside eval() — avoid"]
```

- **Global (GEC):** only one per program. Creates the global object (`window` in browsers, `globalThis` in Node) and points `this` to it.
- **Function (FEC):** created each time a function is invoked.
- **Eval:** created inside `eval()`; rarely used.

---

## 4. The Call Stack (Execution Context Stack)

The **Call Stack** manages the order of execution contexts using **LIFO** (Last In, First Out): the GEC is pushed first, each function call pushes a new FEC on top, and each return pops it off.

```mermaid
flowchart LR
    subgraph S1["1️⃣ Script start"]
        direction TB
        G1["GEC"]
    end
    subgraph S2["2️⃣ square() called"]
        direction TB
        F2["square() FEC"] --> G2["GEC"]
    end
    subgraph S3["3️⃣ square() returns"]
        direction TB
        G3["GEC"]
    end
    subgraph S4["4️⃣ Script ends"]
        direction TB
        E4["(empty)"]
    end
    S1 --> S2 --> S3 --> S4
```

> Also known as: Program Stack, Control Stack, Runtime Stack, Machine Stack.

---

## 5. Putting It Together — Sequence of a Function Call

```mermaid
sequenceDiagram
    participant Stack as Call Stack
    participant GEC as Global EC
    participant FEC as square() EC

    Note over GEC: Script runs → GEC pushed
    GEC->>FEC: call square(5)
    Note over Stack: square() EC pushed (on top)
    Note over FEC: num=5, ans=25
    FEC-->>GEC: return 25
    Note over Stack: square() EC popped
    Note over GEC: script ends → GEC popped (stack empty)
```

---

## 6. Code Examples

### Hoisting (proving the two phases)
```js
console.log(x);   // undefined  → var hoisted, not yet assigned
getName();        // "Hello"    → function fully hoisted

var x = 7;
function getName() { console.log("Hello"); }

console.log(x);   // 7  → assigned during execution phase
```

### Temporal Dead Zone (let / const)
```js
console.log(y);   // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

### Function Execution Contexts
```js
var n = 5;
function square(num) {
  var ans = num * num;   // new EC: num & ans live here
  return ans;
}
var square2 = square(n);  // FEC pushed, runs, popped
var square4 = square(4);  // another FEC
```

---

## Quick Summary

- **Execution Context** = environment where JS runs (Memory + Code components).
- **GEC** created once; **FEC** created on every function call.
- Each EC runs in **two phases**: Creation (hoisting) → Execution.
- The **Call Stack** tracks the currently running context (LIFO).
- `var` hoists as `undefined`; `let`/`const` sit in the **Temporal Dead Zone**.
- JS engine is **single-threaded & synchronous**; async work is handled by the runtime via the event loop, callback & microtask queues.

---

> 📄 See [`Execution-context.js`](./Execution-context.js) for the runnable code demonstrations.
