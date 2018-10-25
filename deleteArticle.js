const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.deleteArticle = function deleteArticle(req, res, payload, cb) {
	if (payload.id == undefined) cb({ code: 400, message: 'Invalid request'});
	else {
	    let ind = articles.findIndex(i => i.id == payload.id);
	    if (ind != -1) {
	    	log(file, '/api/articles/delete', payload);
	        articles.splice(ind, 1);
	        cb(null, articles);
	    } else cb({ code: 404, message: 'Not found' });
	}
}