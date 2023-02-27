function fallback() {
	const express = require("express"),
		app = express(),
		cors = require('cors'),
		path = require('path'),
		serveIndex = require('serve-index');

	app.set('trust proxy', true)
	app.use('/logs', express.static(path.join(__dirname, 'logs'), { etag: false }), serveIndex('logs', { 'icons': true, 'view': 'details ' }))
	app.use(cors())

	app.use('/logs.zip', LogZip);


	require('dotenv').config();
	app.listen((process.env.PORT), function () {
		console.log("fallback server started");
		console.log(process.env.PORT);
	});
}

const zip = require('express-zip');
const fs = require('fs');

function LogZip (req, res) {
	try{
	const dir = __dirname + "/logs";
	const fsDir = fs.readdirSync(dir);
	const files = [];
	for (var i = 0; i < fsDir.length; i++) {
		if (fsDir[i].endsWith(".log")) files.push({ path: dir + '/' + fsDir[i], name: fsDir[i] })
	}
	res.zip(files, 'logs.zip');
	}catch(e){
		console.error(e);
	}
}

//fallback();

module.exports = fallback