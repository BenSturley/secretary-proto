//
// test_crud_simple.js
//
const test_runner = async function(context) {

    //
    // init contextual info
    context.currentTest = 'CRUD Tests - Simple';
    context.isStarted = true;
    context.messenger.message('--- Starting Mongoose Simple CRUD tests ---');
    

    //
    // begin the CRUD!!
    //
    // operations: 
    //  - create a schema, model and object
    //  - save it
    //  - find that object and read it into JS object
    //  - update JS object and update database
    //  - find the object again and delete it
    //  


    //
    // open connection
    const mongoose = require('mongoose');
    const uri = context.config.database_uri;
    context.messenger.message('--{ CONNECTING TO MONGOOSE }--');
    try {
        context.messenger.message('Connecting...');
        await mongoose.connect(uri, { useNewUrlParser: true });
        context.messenger.message('Connected to database successfully.');
    }
    catch (err) {
        context.messenger.error(`Error connecting to database: ${err.message}`); 
    }



    //
    // create schema and model
    // const characterSchema = require('../characters/character-mongoose-schema').schema;
    // const characterModel = mongoose.model("Character", characterSchema);
    


    // 
    // create object from model and save it
    

    //
    // close everything
    try {
        context.messenger.message('Disconnecting...');
        mongoose.connection.close();
        context.messenger.message('Disconnected.');
    }
    catch (err) {
        context.messenger.error(`Error disconnecting: ${err}`);
    }


    //
    // CRUD hereby ends
    //
    

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
