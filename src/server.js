const express = require("express"),
	  cors = require('cors'),
	  path = require('path'),
	  serveIndex = require('serve-index');

const dir = path.join(process.cwd(), '/logs');

function LogsServer(port) {
	const app = express();

	app.use((req, res, next) => {
		res.set('Cache-Control', 'no-store');
		next();
	})

	app.use('/logs',
		express.static(dir, { etag: false }),
		serveIndex(dir, { 'icons': true, 'view': 'details' })
	)

	app.use(cors())

	app.use('/logs.zip', LogZip);


	require('dotenv').config();
	port = port || process.env.PORT;

	app.listen((port), function () {
		console.log("fallback server started");
		console.log(port);
	});
}

const zip = require('express-zip'),
	  fs = require('fs');

function LogZip(req, res) {
	try {
		const files = fs.readdirSync(dir) || [];
		const logFiles = [];

		files.forEach(file => {
			if (file.endsWith(".log")) logFiles.push({ path: path.join(dir,file), name: file })
		})

		res.zip(logFiles, 'logs.zip');

	} catch (e) {
		console.error(e);
	}
}


module.exports = LogsServer