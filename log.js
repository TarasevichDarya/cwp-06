const logF = require('./logfile.json');

module.exports.log = function log(file, url, data) {
    const current = new Date();
    let info = {
        date: `${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`,
        url: url,
        data: data
    };
    logF.push(info);
    require('fs').createWriteStream('logfile.json').write(JSON.stringify(logF));
}