//
// test_mongoose.js
//
const test_runner = context => {

    context.currentTest = 'Mongoose';
    context.isStarted = true;
    context.messenger.message('--- Starting Mongoose tests ---');

    const mongoose = require('mongoose');
    const uri = 'mongodb://localhost:27017/testdb';

    //
    // connect tests
    context.messenger.message('-- Running connect tests... --');
    mongoose.connect(uri, { useNewUrlParser: true } ).then(
        () => { 
            context.messenger.message('Connected to database successfully.');
        }
        , err => { 
            context.messenger.error(`Error connecting to database: ${err.message}`); 
        }
    ).then(
        () => {
            mongoose.connection.close();
            context.messenger.message('Disconnected from database.'); 
        }
    ).catch(
        ex => {
            context.messenger.error(`Error: ${ex.message}`); 
        }
    );

    //
    // schema tests
    context.messenger.message('-- Running schema tests... --');
    
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

    context.messenger.message('- Comparing schemas... -');
    
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

    context.messenger.message('--- Mongoose tests completed ---');
    context.isComplete = true;
};

module.exports = {
    test_name:  'Test Mongoose',
    run_test:   test_runner
}