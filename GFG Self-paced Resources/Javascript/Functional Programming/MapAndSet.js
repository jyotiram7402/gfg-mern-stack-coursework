// ===================================================================
// SET  —  a collection of UNIQUE values (no duplicates)
// ===================================================================

// Create a Set
const s = new Set();
s.add(10);
s.add(20);
s.add(10);          // duplicate -> ignored
console.log(s);     // Set(2) { 10, 20 }

// Common Set operations
console.log(s.has(10));   // true  (fast lookup, O(1))
console.log(s.size);      // 2     (NOT .length)
s.delete(20);             // remove a value
// s.clear();             // remove everything

// Iterate a Set
for (const value of s) {
  console.log("set value:", value);
}


// ===================================================================
// MAP  —  a collection of KEY -> VALUE pairs (keys can be ANY type)
// ===================================================================

const m = new Map();
m.set("name", "Jay");
m.set(1, "number key");
m.set(true, "boolean key");

console.log(m.get("name"));  // "Jay"
console.log(m.has(1));       // true
console.log(m.size);         // 3
m.delete(true);              // remove a key
// m.clear();                // remove everything

// Iterate a Map
for (const [key, value] of m) {
  console.log(key, "=>", value);
}


// ===================================================================
// HOW THEY DIFFER FROM AN ARRAY
// ===================================================================
// Array : ordered, allows duplicates, accessed by index (arr[0])
// Set   : unique values only, no index, fast .has() lookup
// Map   : key->value pairs, any key type, keeps insertion order


// ===================================================================
// CONVERSIONS
// ===================================================================

// ---- Array  ->  Set  (removes duplicates) ----
const arr = [1, 2, 2, 3, 3, 3];
const setFromArr = new Set(arr);
console.log(setFromArr);          // Set(3) { 1, 2, 3 }

// ---- Set  ->  Array ----
const arrFromSet = [...setFromArr];          // spread
// const arrFromSet = Array.from(setFromArr); // same result
console.log(arrFromSet);          // [ 1, 2, 3 ]

// Handy one-liner: remove duplicates from an array
const unique = [...new Set([5, 5, 6, 7, 7])];
console.log(unique);              // [ 5, 6, 7 ]


// ---- Array  ->  Map ----
// Array must be a list of [key, value] pairs
const pairs = [
  ["a", 1],
  ["b", 2],
];
const mapFromArr = new Map(pairs);
console.log(mapFromArr.get("a")); // 1

// ---- Map  ->  Array ----
const arrFromMap = [...mapFromArr];          // [ ['a',1], ['b',2] ]
console.log(arrFromMap);

const keysArr = [...mapFromArr.keys()];      // [ 'a', 'b' ]
const valsArr = [...mapFromArr.values()];    // [ 1, 2 ]
console.log(keysArr, valsArr);


// ---- Object  <->  Map ----
const obj = { x: 1, y: 2 };
const mapFromObj = new Map(Object.entries(obj)); // Object -> Map
const objFromMap = Object.fromEntries(mapFromObj); // Map -> Object
console.log(mapFromObj, objFromMap);
