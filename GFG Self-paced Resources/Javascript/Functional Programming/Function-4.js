// ============================================
//  Function-4: Arrow Functions ( => )
// ============================================

// ---------------------------------------------------------------
// 1. What is an arrow function?
// ---------------------------------------------------------------
// - A shorter way to write functions, introduced in ES6 (2015).
// - The `=>` symbol is called the "fat arrow".
// - Great for small, quick functions.

// Normal (regular) function:
function addNormal(a, b) {
  return a + b;
}

// Same thing as an arrow function:
const addArrow = (a, b) => {
  return a + b;
};

console.log(addNormal(2, 3)); // 5
console.log(addArrow(2, 3));  // 5


// ---------------------------------------------------------------
// 2. Shorter forms (syntax shortcuts)
// ---------------------------------------------------------------

// (a) If the body is ONE line that returns a value,
//     you can drop the { } and the `return`. This is "implicit return".
const square = (n) => n * n;
console.log(square(5)); // 25

// (b) If there is exactly ONE parameter, the ( ) are optional.
const greet = name => "Hello " + name;
console.log(greet("Jay")); // Hello Jay

// (c) If there are NO parameters, you MUST keep empty ( ).
const sayHi = () => "Hi!";
console.log(sayHi()); // Hi!

// (d) Two or more parameters ALWAYS need ( ).
const multiply = (a, b) => a * b;
console.log(multiply(4, 3)); // 12


// ---------------------------------------------------------------
// 3. Returning an OBJECT { } → wrap it in ( )
// ---------------------------------------------------------------
// JavaScript thinks { } is the function body, not an object.
// So wrap the object in round brackets to return it directly.

const makeUserWrong = (name) => { name: name };   // returns undefined!
const makeUser      = (name) => ({ name: name }); // correct

console.log(makeUserWrong("Jay")); // undefined
console.log(makeUser("Jay"));      // { name: 'Jay' }


// ---------------------------------------------------------------
// 4. Where arrow functions shine: array methods
// ---------------------------------------------------------------
// They keep callbacks short and readable.

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]


// ---------------------------------------------------------------
// 5. The BIG difference: `this`
// ---------------------------------------------------------------
// - Regular functions create their OWN `this`.
// - Arrow functions do NOT. They use the `this` from the
//   surrounding (outer) code. This is called "lexical this".
//
// This is the main reason arrow functions behave differently,
// not just a shorter style.

const person = {
  name: "Jay",
  hobbies: ["coding", "music"],

  // Arrow function uses `this` from outside the object,
  // so `this.name` here is NOT "Jay" (often undefined).
  showWrong: function () {
    this.hobbies.forEach(function (hobby) {
      // here `this` is NOT the person object
      // console.log(this.name + " likes " + hobby); // would break
      console.log("(regular cb) likes " + hobby);
    });
  },

  // Arrow callback keeps `this` = person, so this.name works.
  showRight: function () {
    this.hobbies.forEach((hobby) => {
      console.log(this.name + " likes " + hobby);
    });
  },
};

person.showRight();
// Jay likes coding
// Jay likes music


// ---------------------------------------------------------------
// 6. When NOT to use arrow functions
// ---------------------------------------------------------------
// - As object methods that need their own `this`.
// - As constructors (you cannot use `new` with an arrow function).
// - They also do NOT have their own `arguments` object.

// const Car = () => {};
// const c = new Car(); // TypeError: Car is not a constructor


// ---------------------------------------------------------------
// 7. Quick summary
// ---------------------------------------------------------------
// - (a, b) => { return a + b; }  -> full arrow function
// - n => n * n                   -> 1 param, implicit return
// - () => "Hi"                   -> no params need ( )
// - x => ({ key: x })            -> wrap objects in ( )
// - Arrow functions take `this` from the outer scope (lexical this)
// - Avoid them for object methods, constructors, and `arguments`
