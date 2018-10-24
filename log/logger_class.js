//
// logger_class.js
//
class Logger {
    constructor(output) {
        if (output) {
            //
        }
    }

    error(err) {
        console.log(`## LOGGER: error: ${err}`);
    }

    warning(msg) {
        console.log(`## LOGGER: warning: ${msg}`);
    }

    info(msg) {
        console.log(`## LOGGER: info: ${msg}`);
    }
}

module.exports = Logger;
