//
// test_uuid.js
//
const uuidv4 = require('uuid/v4');
var testFn = function() {

    const output = uuidv4()
                    + ', '
                    + uuidv4();
    return output;
};

module.exports = {
    test_name:  'Test UUIDs',
    run_test:   testFn
}