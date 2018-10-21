//
// all_tests.js
//
let tests_output = '';
const testsFn = function() {

    const fs = require('fs');
    const testfiles = fs.readdirSync(__dirname);
    let testPaths = [];
    
    testfiles.forEach(file => {
    
        // ensure is a ".js", does not start with "_", and is not _this_ file
        if (file.toLowerCase().endsWith('.js') 
            && !__filename.toLowerCase().endsWith(file.toLowerCase())
            && !file.endsWith('_')
            ) {
            testPaths.push(`./${file}`);
        }
    });
    
    let output = `[Tests: \n ${testPaths.join(';\n ')}]\n\n`;
    console.log(output);
    
    (async () => {
            
        // testPaths.forEach(s => {
        for (let index = 0; index < testPaths.length; index++) {
            
            console.log(`*** index: ${index} / ${testPaths.length -1} ***`)

            const s = testPaths[index];

            const test_path     = s;
            const test_module   = require(test_path);
            const test_name     = test_module.test_name;
            const test_async    = test_module.async;
        
            const title = test_name + '\n' + ('~').repeat(test_name.length);
            output += title + '\n';
            
            if (test_module.disabled) {
                output += '[test disabled]';
            } // if (test_module.disabled) {
            else {
                if (test_async) {
                    
                    try {
                        output += await test_module.run_test();
                    }
                    catch (e) {
                        console.log(`** ERROR: ${e.message} **`);
                    }
                }
                else {
                    let this_test_output = test_module.run_test();
                    output += this_test_output;
                    console.log(this_test_output);
                }
                // output += test_module.run_test();
            } // else: if (test_module.disabled) {
        
            output += '\n\n';
        } // for (let index = 0; index < testPaths.length; index++) {
        // }); // testPaths.forEach(s => {
        
    })();   // (async () => {

    tests_output = output;
    console.log(output);
    return output;
    
}; // const testsFn = function() {

module.exports = {
    run_tests:  testsFn,
    output:     tests_output
}