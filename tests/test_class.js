//
// test_class.js
//
var testFn = function() {

    class PersonClass {
        constructor(fname, lname) {
            this.id = 'A1';
            this.fname = fname; //'ben';
            this.lname = lname; //'sturley';
        }
     
        getName() {
            const nm = `${this.fname} ${this.lname}`;
            return nm;
        }
    
        getId() {
            return this.id;
        }
    }
    
    const ben = new PersonClass('Ben', 'Sturley');
    const output = `[PersonClass].getName() == '${ben.getName()}'`;
    return output;
}

module.exports = {
    test_name:  'Test ES6 classes',
    run_test:   testFn
}