//
// character.js
//
const persistentObject = require('../persistentObject');

class Character extends persistentObject {
    constructor({id, names, notes} = {}) {
        super({id, notes});

        if (names === undefined) {
            this.names = [];
        }
        else {
            this.names = names;
        }

        this.relationships = [];
    }

    //
    // name
    get name() {
        return this.names.join(' ');
    }
    set name(value) {
        this.names = value.split(' ');
    }

    getNames() {
        return this.names;
    }

    //
    // load
    static loadCharacter(id) {
        const loaded = new character(id);
        return loaded;
    }

    static getMongooseModel() {
        const schema = require('./character-mongoose-schema').schema;
        const mongoose = require('mongoose');
        




0    }
}

module.exports = Character;