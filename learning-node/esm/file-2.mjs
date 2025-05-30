// file-2.mjs
const a = 10;

const add = (param1, param2) => param1 + param2;

const b = 20;

const c = 50;

// module.exports = a;
// module.exports = add;

export { a, b }; // naming export

// export default add; //default export
export default {
  add,
  c,
}; //default export

// console.log(module);
