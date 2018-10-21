//
// all_tests.js
//
const tests_runner = () => {

    // scan directory
    const fs = require('fs');
    const filePaths = fs.readdirSync(__dirname);
    const testFilePaths = [];
    filePaths.forEach(fp => {
        const fpl = fp.toLowerCase();
        if (
            fpl.endsWith('.js')
            && !(__filename.toLowerCase().endsWith(fpl))
            && !(fpl.startsWith('_')) ) {
                testFilePaths.push(`./${fp}`);
            }

    });

    // create context
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

    // start tests
    console.log('-- Starting tests --');
    
    for (let i = 0; i < testFilePaths.length; i++) {
        const path = testFilePaths[i];
        //console.log(path);
        if (path.toLowerCase().indexOf('mongoose') > -1 
         || path.toLowerCase().indexOf('character') > -1 
            ) {
            const test = require(path);
            context.reset();
            test.run_test(context);
        }
    } // for (let i = 0; i < testFilePaths.length; i++) {
    console.log('-- Tests completed --');

    return 'context: ' + context;
}

module.exports = {
    run_tests:  tests_runner
}