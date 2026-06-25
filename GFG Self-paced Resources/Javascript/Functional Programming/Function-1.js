// ============================================
// FUNCTION DECLARATION in JavaScript
// ============================================

// 1. BASIC SYNTAX
// keyword 'function' + name + (parameters) + { body }
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Jayesh")); // Hello, Jayesh


// 2. HOISTING (the defining feature)
// Declarations are moved to the top of their scope before code runs,
// so you can CALL them before they are defined in the file.
sayHi(); // ✅ Works even though defined below
function sayHi() {
  console.log("Hi there!");
}


// 3. PARAMETERS vs ARGUMENTS
// parameters = placeholders in definition (a, b)
// arguments  = real values passed when calling (5, 3)
function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // 8


// 4. DEFAULT PARAMETERS
function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5));    // 5  (b defaults to 1)
console.log(multiply(5, 2)); // 10


// 5. RETURN
// No 'return' (or empty return) => function gives back 'undefined'
function noReturn() {
  let x = 10;
}
console.log(noReturn()); // undefined


// ============================================
// DECLARATION vs EXPRESSION vs ARROW
// ============================================

// Declaration  -> hoisted (callable before definition), must have a name
function declared() { return "declaration"; }

// Expression   -> NOT hoisted, assigned to a variable
const expressed = function () { return "expression"; };

// Arrow        -> NOT hoisted, shorter syntax, no own 'this'
const arrow = () => "arrow";

console.log(declared(), expressed(), arrow());
