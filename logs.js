module.exports.logs = function logs(req, res, payload, cb) {
    cb(null, require('./logfile.json'));
}