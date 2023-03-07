# beamup-logger  

**Badges** 

Optional badges such as npm version, test and build coverage, and so on.

**Summary** 

A simple logger for stremio addons that are hosted on [beamup](https://github.com/Stremio/stremio-beamup)

## Overview

A logger which runs the addon in a subprocess and logs both logs and errors to dedicated rotating files. 
if the subprocess fails,it will restart up to 10 times in an hour.then it will switch to the fall back server, which serves the logs over https on `/logs` and as a zip file on `logs.zip` to be observered locally. 

## Installation

beamup-logger can be downloaded manually from [here](https://github.com/dexter21767/beamup-logger/releases/latest/download/beamup-logger-node16-linux).
to keep the git repo light, this process can be automated to run on deployement:

place this script in a shell script on the `root` directory of the addon

```
#!/usr/bin/env bash

curl --location --output beamup-logger https://github.com/dexter21767/beamup-logger/releases/latest/download/beamup-logger-node16-linux
chmod +x beamup-logger

```

add a `postinstall` command to execute the shell script, to `scripts` in `package.json`

```
	"scripts": {
		"postinstall": "sh ./postinstall.sh",
		"start": "node server.js"
	}
```


## Basic use

### package.json

Beamup-logger can be added directly to `package.json` (not recommended):
```
	"scripts": {
		"postinstall": "sh ./postinstall.sh",
		"start": "beamup-logger node server.js"
	}
```


### Procfile (recommended)

the right way so far to use beamup-logger correctly, is by creating a `Procfile` on the `root` directory (which is just a file named `Procfile`). with the following content:
```
web: ./beamup-logger -p $PORT execute npm start
```

## Options 

  `-m, --maxFiles` - string - Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days. If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format. It won't delete any file not contained in it. It can be a number of files or number of days (default: 1d), set to 0 to disable".

  `-p, --port` - int - local server port for fallback server


## Commands:

  execute <executable <string>> <argument <string>>  usage "cli execute node server.js"
  help [command]                                     display help for command


## Examples

Serving logs from inside the addon 

```
const express = require("express"),
   	path = require('path'),
	   serveIndex = require('serve-index');

const app = express();

//optional middleware to disable caching 
app.use('/logs',(req, res, next) => {
	res.set('Cache-Control', 'no-store');
	next();
})

app.use('/logs', 
   express.static(path.join(__dirname, 'logs'),{etag: false}), 
   serveIndex('logs', {'icons': true,'view':'details '})
)

```


## Tests

What tests are included and how to run them. 

## Contributing

This project welcomes contributions from the community. Contributions are
accepted using GitHub pull requests; for more information, see 
[GitHub documentation - Creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

For a good pull request, we ask you provide the following:

1. Include a clear description of your pull request in the description
   with the basic "what" and "why"s for the request.
2. The tests should pass as best as you can. GitHub will automatically run
   the tests as well, to act as a safety net.
3. The pull request should include tests for the change. A new feature should
   have tests for the new feature and bug fixes should include a test that fails
   without the corresponding code change and passes after they are applied.
   The command `npm run test-cov` will generate a `coverage/` folder that
   contains HTML pages of the code coverage, to better understand if everything
   you're adding is being tested.
4. If the pull request is a new feature, please include appropriate documentation 
   in the `README.md` file as well.
5. To help ensure that your code is similar in style to the existing code,
   run the command `npm run lint` and fix any displayed issues.

## Contributors

Names of module "owners" (lead developers) and other developers who 
have contributed.

## License

Link to the license, with a short description of what it is, 
e.g. "MIT" or whatever.  