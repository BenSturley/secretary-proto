//
// relationship.js
//
const persistentObject = require('../persistentObject');
const character = require('./character');

class relationship extends persistentObject {
    constructor(id, source, target) {
        super(id);

        if (!(source instanceof character) || !(target instanceof character)) {
            throw new TypeError('Argument error: source and target must be instances of character.');
        }
        
        this.source = source;
        this.target = target;
    }

    createReverse() {
        const reverse = new relationship(null, this.target, this.source);
        return reverse;
    }
}

module.exports = relationship;