//
// test_mongoose.js
//
const test_runner = async context => {

    context.currentTest = 'Mongoose';
    context.isStarted = true;
    context.messenger.message('--- Starting Mongoose tests ---');

    const mongoose = require('mongoose');
    const uri = context.config.database_uri;

    //
    // connect tests

    {
    // context.messenger.message('-- Running connect tests... --');
    // mongoose.connect(uri, { useNewUrlParser: true } )
    //     .then(
    //         () => { 
    //             context.messenger.message('Connected to database successfully.');
    //         }
    //         , err => { 
    //             context.messenger.error(`Error connecting to database: ${err.message}`); 
    //         }
    //     )
    //     // .then(
    //     //     () => {
    //     //         mongoose.connection.close();
    //     //         context.messenger.message('Disconnected from database.'); 
    //     //     }
    //     // )
    //     .catch(
    //         ex => {
    //             context.messenger.error(`Error: ${ex.message}`); 
    //         }
    //     );
    }

    context.messenger.message('--{ Running connect tests... }--');
    try {
        await mongoose.connect(uri, { useNewUrlParser: true });
        context.messenger.message('Connected to database successfully.');
    }
    catch (err) {
        context.messenger.error(`Error connecting to database: ${err.message}`); 
    }


    //
    // schema tests
    context.messenger.message('--{ Running schema tests... }--');
    
    context.messenger.message('Creating character object...');
    const Character = require('../characters/character');
    const char = new Character({ names: ['Geneveive', 'Bhilandra']});
    context.messenger.message(`obj id pre:assignNewId(): ${char._id}`);
    char.assignNewId();
    context.messenger.message(`obj id post:assignNewId(): ${char._id}`);
    context.messenger.message(`obj name[0]: ${char.getNames()[0]}`);
    context.messenger.message(`obj name[1]: ${char.getNames()[1]}`);

    context.messenger.message('Creating character schema (1)...');
    const schema = require('../characters/character-mongoose-schema').schema;
    const schema2 = require('../characters/character-mongoose-schema').create();
    
    context.messenger.message('Creating character schema (2)...');
    const schema3 = mongoose.Schema({
        names:          [String],
        notes:          [String],
        created:        Date,
        lastModified:   Date,
        _id:            mongoose.Schema.Types.ObjectId
    });

    // store ref to schema for model
    const characterSchema = schema;

    context.messenger.message('-[ Comparing schemas... ]-');
    
    context.messenger.message(schema);
    context.messenger.message(schema2);
    context.messenger.message(schema3);

    if (schema === schema2) { context.messenger.message('[module].schema === [module].create()'); } 
    else { context.messenger.message('[module].schema !=== [module].create()'); }

    if (schema === schema3) { context.messenger.message('[module].schema === [mongoose].schema()'); } 
    else { context.messenger.message('[module].schema !=== [mongoose].schema()'); }

    if (schema2 === schema3) { context.messenger.message('[module].create() === [mongoose].schema()'); } 
    else { context.messenger.message('[module].create() !=== [mongoose].schema()'); }

    const assert = require('assert');
    try {
        assert.deepStrictEqual(schema, schema2);
        context.messenger.message('Schema comparison A assert passed.');
    }
    catch (err) {
        context.messenger.error(`Schemas are not equal, assert A failed: ${err}`);
    }
    try {
        assert.deepStrictEqual(schema, schema3);
        context.messenger.message('Schema comparison B assert passed.');
    }
    catch (err) {
        context.messenger.error(`Schemas are not equal, assert B failed: ${err}`);
    }
    try {
        assert.deepStrictEqual(schema2, schema3);
        context.messenger.message('Schema comparison C assert passed.');
    }
    catch (err) {
        context.messenger.error(`Schemas are not equal, assert C failed: ${err}`);
    }
    
    { // MONGOOSE SCHEMA
    
        //
        // MONGOOSE SCHEMA
        //
        
        // String
        // Number
        // Date
        // Buffer
        // Boolean
        // Mixed
        // ObjectId (mongoose.Schema.Types.ObjectId)
        // Array


        // var schema = new Schema({
        //     name:    String,
        //     binary:  Buffer,
        //     living:  Boolean,
        //     updated: { type: Date, default: Date.now },
        //     age:     { type: Number, min: 18, max: 65 },
        //     mixed:   Schema.Types.Mixed,
        //     _someId: Schema.Types.ObjectId,
        //     decimal: Schema.Types.Decimal128,
        //     array: [],
        //     ofString: [String],
        //     ofNumber: [Number],
        //     ofDates: [Date],
        //     ofBuffer: [Buffer],
        //     ofBoolean: [Boolean],
        //     ofMixed: [Schema.Types.Mixed],
        //     ofObjectId: [Schema.Types.ObjectId],
        //     ofArrays: [[]],
        //     ofArrayOfNumbers: [[Number]],
        //     nested: {
        //       stuff: { type: String, lowercase: true, trim: true }
        //     },
        //     map: Map,
        //     mapOfString: {
        //       type: Map,
        //       of: String
        //     }
        //   })

        // example use

        // var Thing = mongoose.model('Thing', schema);

        // var m = new Thing;
        // m.name = 'Statue of Liberty';
        // m.age = 125;
        // m.updated = new Date;
        // m.binary = Buffer.alloc(0);
        // m.living = false;
        // m.mixed = { any: { thing: 'i want' } };
        // m.markModified('mixed');
        // m._someId = new mongoose.Types.ObjectId;
        // m.array.push(1);
        // m.ofString.push("strings!");
        // m.ofNumber.unshift(1,2,3,4);
        // m.ofDates.addToSet(new Date);
        // m.ofBuffer.pop();
        // m.ofMixed = [1, [], 'three', { four: 5 }];
        // m.nested.stuff = 'good';
        // m.map = new Map([['key', 'value']]);
        // m.save(callback);
    }

    //
    // model tests
    context.messenger.message("--{ Running model tests... }--");

    const characterModel = mongoose.model('Character', characterSchema);
    context.messenger.message('characterModel:');
    context.messenger.message(characterModel);
    
    context.messenger.message('Creating object from model, ');
    context.messenger.message(' with new ObjectId()...');
    const characterGenevieve = new characterModel({
        names:          char.getNames(),
        notes:          char.getNotes(),
        created:        char.created,
        lastModified:   char.lastModified,
        _id:            new mongoose.Types.ObjectId()
    });

    context.messenger.message('Creating object from model, ');
    context.messenger.message(' with id from object...');
    const charBen = new Character({
        names:  ['Ben', 'Sturley'],
        notes:  ['A note about Benja.'], 
    });
    charBen.assignNewId();
    const characterBen = new characterModel({
        names:          charBen.getNames(),
        notes:          charBen.getNotes(),
        created:        charBen.created,
        lastModified:   charBen.lastModified,
        _id:            charBen._id
    });

    // model save tests

    {
    // context.messenger.message('Saving model 1...');
    // characterGenevieve.save()
    //     .then(
    //         () => {
    //             context.messenger.message(`Model 1 saved.`);
    //         },
    //         err => {
    //             context.messenger.error(`Error saving model 1: ${err}`);
    //         }
    //     );
    }
    
    // context.messenger.message('Saving model 1...');
    try {
        await characterGenevieve.save();
        context.messenger.message('Model 1 saved.');
    }
    catch (err) {
        context.messenger.error(`Error saving model 1: ${err}`);
    }

    // context.messenger.message('Saving model 2...');
    try {
        await characterBen.save();
        context.messenger.message(`Model 2 saved.`);
    }
    catch (err) {
        context.messenger.error(`Model 2 save error: ${err}`);    
    }
    
    // model find tests
    context.messenger.message('Finding all characters...');

    const findModel = characterModel;
    const findQuery = findModel.find();
    findQuery.select("_id names notes created lastModified");
    // findQuery.limit(10);
    findQuery.sort({ 'names.0': 'desc' });
    {// findQuery.exec()
    //     .then(
    //         recs => {
    //             context.messenger.message(`Objects found: ${recs.length}`);
    //         },
    //         err => {
    //             context.messenger.error(`Error executing find: ${err}`);
    //         }
    //     );
    }

    let results;
    try {
        results = await findQuery.exec();
        context.messenger.message(`Objects found: ${results.length}`);
    }
    catch (err) {
        context.messenger.error(`Error executing find: ${err}`);
    }

    const _run_deletions = false;       // true;
    if (_run_deletions && results) {
        const resultsLen = results.length;
        if ( resultsLen > 0 ) {
            context.messenger.message(`Object[0]: ${results[0]}`);
            context.messenger.message(`Object[${resultsLen-1}]: ${results[resultsLen-1]}`);
        }

        // delete excess(ive) records
        const resultsLimit = 12;
        if ( resultsLen > resultsLimit ) {
            context.messenger.message(`Excessive record count: ${resultsLen}; trimming...`);

            // delete tests
            context.messenger.message('--{ Running delete tests... }--');

            // create list of IDs to delete (all but last 10 returned)
            const deletionIds = [];
            for (let i = 0; i < resultsLimit+1; i++) {
                // const objId = results[i]._id;
                // deletionIds.push(objId);

                let deleteCount = (resultsLen-resultsLimit);
                if (deleteCount % 2 != 0) {
                    deleteCount++;
                }
                let objId;
                let objIndex;
                if ( deletionIds.length < (deleteCount/2) ) {
                    objIndex = i;
                }
                else {
                    objIndex = (resultsLen-(i-(deleteCount/2))-1);
                }
                context.messenger.message(`Setting record [${objIndex}] for deletion.`);
                objId = results[objIndex]._id;
                deletionIds.push(objId);
            }
            context.messenger.message(`Deleting ids: ${deletionIds}`);
            context.messenger.message(`(Object count to delete: ${deletionIds.length})`);
            
            const deleteModel = characterModel;
            const deleteQuery = deleteModel.find( { _id: { $in: deletionIds } } );
            try {
                context.messenger.message('Executing delete...');
                //await deleteQuery.remove().exec();   // .remove() is DEPRECATED
                await deleteQuery.deleteMany().exec();
            }
            catch (err) {
                context.messenger.error(`Error deleting objects: ${err}`);
            }
        }
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
    context.messenger.message('--- Mongoose tests completed ---');
    context.isComplete = true;

};

module.exports = {
    test_name:  'Test Mongoose',
    run_test:   test_runner,
    disabled:   false,
    async:      true
}