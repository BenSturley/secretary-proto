// 
// name-generator.js
// 
const generator = num_names => {
    
    const names = [];
    for (let i = 0; i < num_names; i++) {
        const name = ['Bob', `Geldof_${i}`];
        names.push(name);
    }
    
    return names;
};

module.exports = {
    get_names:  generator
};
