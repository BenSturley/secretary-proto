// 
// name-generator.js
// 
const generator = num_names => {
    
    // 
    // if num_names param not supplied, generate 1 name only
    if ( num_names === undefined || global.isNaN(num_names) ) {
        num_names = 1;
    }

    //
    //const fs = require('fs');
    //fs.readFileSync('../assets/names.txt');

    // 
    // build names array
    const names = [];
    for (let i = 0; i < num_names; i++) {
        const name = ['Bob', `Geldof_${i}`];
        names.push(name);
    }
    
    // 
    // output array of names
    return names;
};

module.exports = {
    get_names:  generator
};
