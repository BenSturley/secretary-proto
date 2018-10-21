//
// index.js - tests/async_tests
//
const testFn = async function() {

    const pausingFn = async () => {
        
        let promise = new Promise(
            (resolve, reject) => {
                try {
                    setTimeout(() => resolve('-- Resolved (1) --'), 5000);
                }
                catch (e) {
                    reject(e);
                    console.log(e);
                }
            });
        
        let result = await promise;

        console.log(result);
    };

    console.log('-- launching PausingFn() --');
    await pausingFn();
    console.log('-- launch PausingFn() DONE --');

};

module.exports = {
    run_test:   testFn
}