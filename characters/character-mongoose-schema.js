//
// character-mongoose-schema.js
//
const  mongoose = require('mongoose');

const createSchema = function() {
    return mongoose.Schema({
        names:          [String],
        notes:          [String],
        created:        Date,
        lastModified:   Date,
        // _id:            mongoose.Schema.Types.ObjectId
        _id:            String
    });
};

const schema = createSchema();

module.exports = {
    schema:     schema, 
    create:     createSchema
}