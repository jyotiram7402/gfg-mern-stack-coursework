// ============================================
// ANONYMOUS FUNCTION & FUNCTION EXPRESSION
// ============================================

// 1. ANONYMOUS FUNCTION
// A function WITHOUT a name. It cannot stand on its own — it must be
// used as a value: assigned to a variable, passed as an argument, etc.
//
//   function () { ... }   <-- no name after the 'function' keyword


// 2. FUNCTION EXPRESSION
// When a function (named or anonymous) is assigned to a variable,
// that whole thing is a FUNCTION EXPRESSION.
const greet = function () {
  return "Hello!";
};
console.log(greet()); // Hello!
// Here the anonymous function is the VALUE; 'greet' is the variable.


// 3. NOT HOISTED (key difference from a declaration)
// Only the variable 'sayHi' is hoisted (as undefined), NOT the function.
// Calling it before the line below throws an error.
// sayHi(); // ❌ TypeError: sayHi is not a function
const sayHi = function () {
  console.log("Hi there!");
};
sayHi(); // ✅ Works only AFTER the assignment runs


// 4. ANONYMOUS FUNCTION AS AN ARGUMENT (callback)
// This is the most common real-world use of anonymous functions.
setTimeout(function () {
  console.log("Runs after 1 second");
}, 1000);

[1, 2, 3].forEach(function (num) {
  console.log("Number:", num);
});


// 5. NAMED FUNCTION EXPRESSION
// You CAN give the expression's function a name. That name is only
// visible INSIDE the function (useful for recursion / clearer stack traces).
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1); // 'fact' usable here
};
console.log(factorial(5)); // 120
// console.log(fact(5));    // ❌ ReferenceError: fact is not defined outside


// 6. IIFE — Immediately Invoked Function Expression
// An anonymous function that runs the moment it is defined.
// Wrap it in ( ) and call it with another ( ) right after.
(function () {
  console.log("I run immediately!");
})();

// IIFE with parameters and a returned value
const result = (function (a, b) {
  return a + b;
})(4, 6);
console.log(result); // 10


// ============================================
// QUICK COMPARISON
// ============================================
// Declaration -> has a name, hoisted (call before definition)
//   function foo() {}
//
// Expression  -> assigned to a variable, NOT hoisted
//   const foo = function () {};
//
// Anonymous   -> no name; used as a value/callback
//   const foo = function () {};   |   arr.map(function (x) { ... })
