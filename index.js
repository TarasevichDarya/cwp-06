const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

const articles = require('./articles.json');
const readAll = require('./readAll.js').readAll;
const read = require('./read.js').read;
const createArticle = require('./createArticle.js').createArticle;
const updateArticle = require('./updateArticle.js').updateArticle;
const deleteArticle = require('./deleteArticle.js').deleteArticle;
const createComment = require('./createComment.js').createComment;
const deleteComment = require('./deleteComment.js').deleteComment;
const logs = require('./logs.js').logs;

const handlers = {
	'/api/articles/readall'	: readAll,
	'/api/articles/read' 	: read,
	'/api/articles/create' 	: createArticle,
	'/api/articles/update' 	: updateArticle,
	'/api/articles/delete' 	: deleteArticle,
	'/api/comments/create' 	: createComment,
	'/api/comments/delete' 	: deleteComment,
	'/api/logs'				: logs
};

const server = http.createServer((req, res) => {
	parseBodyJson(req, (err, payload) => {
		const handler = getHandler(req.url);
		handler(req, res, payload, (err, result) => {
			res.setHeader('Content-Type', 'application/json');
			if (err) {
				res.statusCode = err.code;			
				res.end(JSON.stringify(err));
			} else {
				fs.createWriteStream('articles.json').write(JSON.stringify(articles));
				res.statusCode = 200;
				res.end(JSON.stringify(result));
			}		
		});
	});
});

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));

function getHandler(url) { return handlers[url] || notFound; }

function notFound(req, res, payload, cb) { cb({ code: 404, message: 'Not found'}); }

function parseBodyJson(req, cb) {
	let body = [];
	req.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		let params = JSON.parse(body);
		cb(null, params);
	});
}