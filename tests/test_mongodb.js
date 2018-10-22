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

const testFn2 = async function() {

    const mongo = require('mongodb');
    const MongoClient = mongo.MongoClient;
    const url = 'mongodb://localhost:27017/';
    const dbName = 'testdb';
    const collName = 'characters';
    const character = require('../characters/character');
    const obj = new character({names: ['Ben', 'Sturley']});

    let output = '';

    console.log('(Test running...)');
    await (async () => {
        try {
            
            let op = 'Connecting...';
            output += op + '\n';
            let db = await MongoClient.connect(url);
            const dbo = db.db(dbName);

            await dbo.createCollection(collName);
            op = `Collection "${collName}" created, apparently.`;
            output += op + '\n';
            console.log(op);
            
            obj.assignNewId();
            await dbo.collection(collName).insertOne(obj);
            op = 'Record inserted.';
            output += op + '\n';
            console.log(op);
                                    
            op = 'Finding...';
            console.log(op);
            output += op + '\n';
            let items = await dbo.collection(collName).find({}).toArray();
            
            op = `${items.length} items found.`;
            console.log(op);
            for (var i = 0; i < items.length; i++) {
                let opi = ` ${items[i]._id}: ${items[i].names.join(' ')}`;
                op += '\n' + opi;
                console.log(opi);
            }
            output += op + '\n';
            let col = await dbo.collection(collName);
            
            op = 'Dropping collection...';
            console.log(op);
            output += op + '\n';
            await col.drop();
            
            op = 'Closing database...';
            console.log(op);
            output += op + '\n';
            await db.close();
            
            op = 'All done.';
            console.log(op);
            output += op + '\n';

        }
        catch (ex) {
            let op = `Error: ${ex.message}`;
            console.log(op);
            output += op + '\n';
        }
    })();
    console.log('(Test completed.)');

    // return '(Test running async...)';
    return output;
};
    

module.exports = {
    test_name:  'Test MongoDB',
    run_test:   testFn2,
    disabled:   false, 
    async:      true
}