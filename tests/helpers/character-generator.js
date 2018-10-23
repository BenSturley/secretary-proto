// 
// character-generator.js
// 
const generator = num_characters => {

    const name_generator = require('./name-generator');
    const names = name_generator.get_names(num_characters);
    
    const Character = require('../../characters/character');
    const characters = [];
    for (let i = 0; i < num_characters; i++) {
        const name = names[i];
        const chr = new Character( 
                { 
                    names: name, 
                    notes: [ 'Auto-generated name' ]
                } 
            );
        characters.push(chr);
    }

    return characters;
};

module.exports = {
    get_characters: generator
};