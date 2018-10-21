//
// test_mixins.js
//
const testFn = function() {

    const mixin_func = function(superclass) {
        return class ExtendedTypeA extends superclass {
            constructor({id}) {
                super({id});
            }
            mixedInMethod() {
                return ' -- ExtendedTypeA: mixedInMethod() --';
            }
        };
    };

    const Character = require('../characters/character');

    class TestClass extends mixin_func(Character) {
        constructor({id} = {}) {
            super({id});
        }
        subMethod() {
            return ' -- TestClass: subMethod() --';
        }
    }
    
    const tester = new TestClass();
    let output  = tester.mixedInMethod()    + '\n'
                + tester.subMethod()        + '\n'
                + `Tester.id: ${tester._id}`;
    return output;
};


module.exports = {
    run_test:   testFn,
    test_name:  'Test Class Mixins'
}