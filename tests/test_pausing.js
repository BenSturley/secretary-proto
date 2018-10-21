//
// test_pausing.js
//
const testFn = async function() {

    let output = 'Pausing...';
    console.log(output);

    let promise = new Promise(
        (resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        resolve('-- timer hit --');
                    }, 500
                    );
            }
            catch (e) {
                console.error(e);
                reject(e);
            }
        }
    );

    let result = await promise;
    
    output += '\nFinished: ' + result;
    console.log(output);

    return output;
};


module.exports = {
    test_name:  'Test Pausing Tests!',
    run_test:   testFn,
    disabled:   false, 
    async:      true
}