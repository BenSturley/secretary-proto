// 
// test_sandbox.js
// 
const test_runner = context => {

    const RUN_name_generator        = true;
    const RUN_character_generator   = false;


    //
    // init contextual info
    context.currentTest = 'CRUD Tests - Simple';
    context.isStarted = true;
    context.messenger.message('--- Starting Tests Sandbox ---');

    //
    // name generator
    if ( RUN_name_generator ) {
        context.messenger.message('--{ NAME GENERATOR }--');

        const name_generator = require('./helpers/name-generator');
        const names = name_generator.get_names(10);

        context.messenger.message(' * generated names: * ');
        names.forEach(
                name => {
                    context.messenger.message(name);
                }
            );
    }

    //
    // character generator
    if ( RUN_character_generator ) {
        context.messenger.message('--{ CHARACTER GENERATOR }--');

        const chr_generator = require('./helpers/character-generator');
        const characters = chr_generator.get_characters();
        
        context.messenger.message(' * generated characters: * ');
        characters.forEach(
                chr => {
                    context.messenger.message(chr);
                }
            );
    }
    
    //
    // all done
    context.messenger.message('--- Tests Sandbox Completed ---');
    context.isComplete = true;
    
};

module.exports = {
    test_name:  'Sandbox for Tests', 
    run_test:   test_runner, 
    async:      false, 
    disabled:   false, 
}