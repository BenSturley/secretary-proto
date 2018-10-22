//
// test_crud_simple.js
//
const test_runner = async function(context) {

    context.currentTest = 'CRUD Tests - Simple';
    context.isStarted = true;
    context.messenger.message('--- Starting Mongoose Simple CRUD tests ---');

    const mongoose = require('mongoose');
    const uri = context.config.database_uri;
    
    //
    // connect
    context.messenger.message('-- Running connect tests... --');
    try {
        context.messenger.message('Connecting...');
        await mongoose.connect(uri, { useNewUrlParser: true });
        context.messenger.message('Connected to database successfully.');
    }
    catch (err) {
        context.messenger.error(`Error connecting to database: ${err.message}`); 
    }
    

    // disconnect 
    //  (must do this or the program doesn't terminate, for some reason)
    //
    //  todo: move this out to common data access framework
    //
    try {
        mongoose.connection.close();
        context.messenger.message('Disconnected from database.'); 
    }
    catch (err) {
        context.messenger.error(`Error disconnecting: ${err}`);
    }


    //
    // all done
    context.messenger.message('--- Mongoose Simple CRUD tests completed ---');
    context.isComplete = true;

};

module.exports = {
    run_test:   test_runner,
    test_name:  'Mongoose CRUD Tests - Simple',
    disabled:   false,
    async:      true
};
