//
// all_tests.js
//
const tests_runner = async () => {

    //
    // scan directory and build array of relative
    // test file name paths for require()-ing
    const fs = require('fs');
    const filePaths = fs.readdirSync(__dirname);
    const testFilePaths = [];
    filePaths.forEach(fp => {
        // check file is a .js, doesn't begin with '_', and isn't _this_ file
        const fpl = fp.toLowerCase();
        if (
            fpl.endsWith('.js')
            && !(__filename.toLowerCase().endsWith(fpl))
            && !(fpl.startsWith('_')) ) {
                testFilePaths.push(`./${fp}`);
            }
    });

    //
    // create context object to be passed to each test
    const framework = require('./framework');
    const context = new framework.TestContext();
    const messenger = context.messenger;
    const emitter =  messenger.getEmitter();
    emitter.on('message', data => {
        console.log(data);
        }); // emitter.on('message', data => {
    emitter.on('error', err => {
            console.error(err);
        }); // emitter.on('error', err => {

    //
    // start tests
    console.log('-- Starting tests --');
    
    // iterate our test file paths, grab a reference using require(), and
    // execute each one
    // assumes each test implements the run_test() method
    for (let i = 0; i < testFilePaths.length; i++) {
        const path = testFilePaths[i];
        //console.log(path);
        if (path.toLowerCase().indexOf('mongoose') > -1 
         || path.toLowerCase().indexOf('crud') > -1 
            ) {
            const test = require(path);
            context.reset();
            if (test.async) {
                //(async () => {
                    console.log(' * running async test * ');
                    await test.run_test(context);
                    console.log(' * finished async test * ');
                //})();
            }
            else {
                test.run_test(context);
            }
        }
    } // for (let i = 0; i < testFilePaths.length; i++) {
    console.log('-- Tests completed --');

    //
    // return the context object....?
    return 'context: ' + context;
}

module.exports = {
    run_tests:  tests_runner
}