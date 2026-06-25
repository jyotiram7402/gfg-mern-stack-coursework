// ============================================
//  Function-3: return & undefined
// ============================================

// ---------------------------------------------------------------
// 1. What `return` does
// ---------------------------------------------------------------
// - `return` sends a value back to wherever the function was called.
// - It also STOPS the function immediately. Any code after `return`
//   inside that function will not run.

function add(a, b) {
  return a + b;        // value goes back to the caller
  console.log("hi");   // <- dead code, never runs
}

const sum = add(2, 3);
console.log(sum); // 5


// ---------------------------------------------------------------
// 2. A function with NO return → gives `undefined`
// ---------------------------------------------------------------
// If a function does not have a `return` statement, JavaScript
// automatically returns `undefined`.

function greet(name) {
  console.log("Hello " + name);
  // no return here
}

const result = greet("Jay");
console.log(result); // undefined  (greet printed text but returned nothing)


// ---------------------------------------------------------------
// 3. `return;` with nothing after it → also `undefined`
// ---------------------------------------------------------------
function checkAge(age) {
  if (age < 18) {
    return; // exits early, returns undefined
  }
  return "Allowed";
}

console.log(checkAge(15)); // undefined
console.log(checkAge(20)); // "Allowed"


// ---------------------------------------------------------------
// 4. Common mistake: return value on a NEW line
// ---------------------------------------------------------------
// JavaScript adds a semicolon automatically after `return` (ASI).
// So the value below is ignored → returns undefined.

function broken() {
  return
    5;   // unreachable; function already returned undefined
}
console.log(broken()); // undefined

// Correct way: keep the value on the same line as return
function fixed() {
  return 5;
}
console.log(fixed()); // 5


// ---------------------------------------------------------------
// 5. Quick summary
// ---------------------------------------------------------------
// - return <value>  -> sends value back AND stops the function
// - no return       -> function returns undefined
// - return;         -> returns undefined (often used to exit early)
// - undefined       -> the default "no value" in JavaScript
