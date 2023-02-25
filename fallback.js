module.exports = ()=> { 
	const express = require("express"),
	app = express(),
	cors = require('cors'),
	path = require('path'),
	serveIndex = require('serve-index');

app.set('trust proxy', true)
app.use('/logs', express.static(path.join(__dirname, 'logs'), { etag: false }), serveIndex('logs', { 'icons': true, 'view': 'details ' }))
app.use(cors())


app.listen((process.env.PORT), function () {
	console.log("fallback server started");
});
}