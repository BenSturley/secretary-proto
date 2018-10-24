// 
// character-generator.js
// 
const generator = num_characters => {

    // 
    // if num_characters param not supplied, generate 1 object only
    if ( num_characters === undefined || global.isNaN(num_characters) ) {
        num_characters = 1;
    }

    //
    // generate names
    const name_generator = require('./name-generator');
    const names = name_generator.get_names(num_characters);
    
    // 
    // build character objects array
    const Character = require('../../characters/character');
    const characters = [];
    for ( let i = 0; i < num_characters; i++ ) {
        const name = names[i];
        const chr = new Character( 
                { 
                    names: name, 
                    notes: [ 'Auto-generated name' ]
                } 
            );
        characters.push(chr);
    }

    // 
    // output array of character objects
    return characters;
};

module.exports = {
    get_characters: generator
};