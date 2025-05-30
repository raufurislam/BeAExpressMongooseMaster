// iife.js

((require, module, __dirname, __filename) => {
  let a = 10;
  ((name) => {
    console.log(`Learning ${name}`);
  })("Node");

  console.log(a);
  console.log(module);
  console.log(__dirname);
})(require, module, "./utils.js/add.js");
