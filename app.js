//
// app.js
//
var nodeTest = function() {
  console.log('Node (js): \n Seems to be working.\n');
}
nodeTest();

//(async () => {
const tests_runner  = require('./tests/all_tests');
const tests_output  = tests_runner.run_tests();
console.log(tests_output);
//})();
