const log = require('./log').log;
const file = require('fs').createWriteStream('log.txt');
let articles = require('./articles.json');

module.exports.deleteComment = function deleteComment(req, res, payload, cb) {
	if ((payload.articleId == undefined) || (payload.id == undefined)) cb({ code: 400, message: 'Invalid request'});
	else {
	    let index = articles.findIndex(i => i.id == payload.articleId);
	    let indexOfComment = articles[index].comments.findIndex(i => i.id == payload.id);
	    if ((index != -1) && (indexOfComment != -1)) {
	    	log(file, '/api/comments/delete', payload);
	        articles[index].comments.splice(indexOfComment, 1);
	        cb(null, articles);
	    } else cb({ code: 404, message: 'Not found' });
	}
}