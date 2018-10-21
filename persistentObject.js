// 
// persistentObject.js
//
const config = require('./config');

class persistentObject {
    constructor({id, notes} = {}) {
        
        // id
        // if (!arguments.length || id == null || id === undefined) {
        if (id === undefined) {
            this._id = config.DATAOBJECT_DEFAULT_ID;
        }
        else {
            this._id = id;
        }

        // notes
        if (notes === undefined) {
            this.notes = [];
        }
        else {
            if (Array.isArray(notes)) {
                this.notes = notes;
            }
            else {
                this.notes = [];
                this.notes.push(notes);
            }
        }

        this._created = new Date();
        this._lastModified = new Date();
    }

    // notes
    getNotes() {
        return this.notes.join('; ');
    }

    // assign new id
    assignNewId() {
        this._id = require('uuid/v4')();
    }

    // created/modified
    get created() {
        return this._created;
    }
    get lastModified() {
        return this._lastModified;
    }

    // save
    save() {
        
        // check id
        if (this._id == config.DATAOBJECT_DEFAULT_ID) {
            this.assignNewId();
        }

        // update last modified
        this._lastModified = new Date();

        // do save
        return true;
    }
}

module.exports = persistentObject;