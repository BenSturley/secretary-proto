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
    // read names file
    const fs = require('fs');
    //   note: fs module directory is the directory where
    //   the node interpreter was started from (aka the 
    //   current working directory), not the directory of
    //   script's folder location
    const buffer = fs.readFileSync(
        './src/tests/assets/names.txt',     // ridiculous!
        { encoding: 'utf-8', flag: 'r' } 
        );
    const bufferRows = buffer.split('\n');
    
    //
    // take out blank rows
    const nameRows = [];
    bufferRows.forEach(
        row => {
            const rowTrimmed = row.trim();
            if ( rowTrimmed.length > 0 ) {
                nameRows.push(rowTrimmed);
            }
        });

    //
    // check we have enough rows
    if ( num_names > nameRows.length ) {
        throw new Error(
            `Not enough names available. Requested: ${num_names}, available: ${nameRows.length}`
            );
        }

    //
    // shuffle array (so we don't get the same names for same requests)
    const shuffle = require('shuffle-array');
    shuffle(nameRows);

    // 
    // build names array
    const names = [];
    for ( let i = 0; i < num_names; i++ ) {
        const row = nameRows[i];
            if ( row.length > 0 ) {
                // split name into parts (ie [ firstname, lastname ] )
                const nameParts = row.split(' ');
                if ( nameParts.length == 2 ) {
                    names.push(nameParts);
                }
            }
        }
    
    // 
    // output array of names
    return names;
};

module.exports = {
    get_names:  generator
};
