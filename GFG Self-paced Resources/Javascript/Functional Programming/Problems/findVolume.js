// Volume of a cube: side * side * side
function volumeCube(s) {
  return s * s * s;
}

// Volume of a rectangular box: length * width * height
function volumeBox(l, w, h) {
  return l * w * h;
}

// Examples
console.log(volumeCube(2));      // 8
console.log(volumeBox(1, 2, 3)); // 6
