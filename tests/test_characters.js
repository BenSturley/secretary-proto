// 
// test_characters.js
//
var testFn = function(context) {

    context.currentTest = 'Mongoose';
    context.isStarted = true;
    context.messenger.message('Starting Character tests');

    const Character = require('../characters/character');
    
    const myChar = new Character({names: ['Ben', 'Jamelia', 'Sturley'], notes: ['Note 1', 'Note 2']});
    myChar.assignNewId();

    const output    = `Character names: ${myChar.getNames()} \n`
                    + `Character id: ${myChar._id} \n`
                    + `Character notes: ${myChar.getNotes()}`;
    
    context.messenger.message(output);
    context.messenger.message('Character tests completed');
    context.isComplete = true;

    return output;
};

module.exports = {
    test_name:  'Test Characters',
    run_test:   testFn
}
