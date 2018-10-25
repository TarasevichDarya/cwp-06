const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.createArticle = function createArticle(req, res, payload, cb) {
	log(file, '/api/articles/create', payload);
    payload.id = Date.now();
    articles.push(payload);
    cb(null, payload);
}