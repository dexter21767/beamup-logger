const express = require("express"),
cors = require('cors'),
path = require('path'),
serveIndex = require('serve-index');
const dir = path.join(process.cwd(),'/logs');

function fallback(port) {
	const app = express();
	
	app.set('trust proxy', true)
	app.use('/logs', express.static(dir, { etag: false }), serveIndex(dir, { 'icons': true, 'view': 'details ' }))
	app.use(cors())

	app.use('/logs.zip', LogZip);


	require('dotenv').config();
	port = port ? port : process.env.PORT;

	app.listen((port), function () {
		console.log("fallback server started");
		console.log(port);
	});
}

const zip = require('express-zip');
const fs = require('fs');

function LogZip (req, res) {
	try{
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