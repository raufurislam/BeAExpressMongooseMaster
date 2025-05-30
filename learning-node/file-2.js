// file-2.js

const a = 10;

const add = (param1, param2) => param1 + param2;

const b = 20;

// module.exports = a;
// module.exports = add;

module.exports = {
  a,
  add,
  b,
};

// console.log(module);
