
//
// test_mongodb.js
//
const testFn1 = function() {

    const mongo = require('mongodb');
    const MongoClient = mongo.MongoClient;
    const url = 'mongodb://localhost:27017/testdb';

    MongoClient.connect(url, (err, db) => {
        if (err) {
            throw err;
        }
        console.log('Database created, apparently.');
        db.close();
    });

};

const testFn2 = function() {

    const mongo = require('mongodb');
    const MongoClient = mongo.MongoClient;
    const url = 'mongodb://localhost:27017/';
    const dbName = 'testdb';
    const collName = 'characters';
    const character = require('../characters/character');
    const obj = new character({names: ['Ben', 'Sturley']});

    let output = '';

    MongoClient.connect(url)
        .then(db => {
            const dbo = db.db(dbName);
            dbo.createCollection(collName)
                .then(res => {
                    const op = `Collection "${collName}" created, apparently.`
                            + '\n'
                            + `CreateCollection result: ${res}`;
                    output += op + '\n';
                    console.log(op);
                    return res;
                })
                .then(res => {
                    dbo.collection(collName).insertOne(obj);
                    const op = 'Record inserted.';
                    output += op + '\n';
                    console.log(op);
                })
                .then(() => {
                    const op = 'Finding...';
                    console.log(op);
                    output += op + '\n';
                    return dbo.collection(collName).find({}).toArray();
                })
                .then(items => {
                    let op = `${items.length} items found.`;
                    console.log(op);
                    for (var i = 0; i < items.length; i++) {
                        let opi = ` ${items[i]._id}: ${items[i].names.join(' ')}`;
                        op += '\n' + opi;
                        console.log(opi);
                    }
                    output += op + '\n';
                    return dbo.collection(collName);
                })
                .then(col => {
                    let op = 'Dropping collection...';
                    console.log(op);
                    output += op + '\n';
                    return col.drop();
                })
                .then(b => {
                    let op = 'Closing database...';
                    console.log(op);
                    output += op + '\n';
                    db.close();
                })
                .then(() => {
                    let op = 'All done.';
                    console.log(op);
                    output += op + '\n';
                })
                .catch(err => {
                    let op = `Error (inner): ${err.message}`;
                    console.log(op);
                    output += op + '\n';
                });
        })
        .catch(err => {
            //throw err;
            let op = `Error at MongoClient.connect: ${err.message}`;
            console.log(op);
            output += op + '\n';
        });

    // return '(Test running async...)';
    return output;
        
};
    

module.exports = {
    test_name:  'Test MongoDB <deprecated>',
    run_test:   testFn2,
    disabled:   true
}