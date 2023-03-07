const { port, maxFiles, commands } = require('./cli.js');

const logs = require('./logger.js');

const log = new logs(maxFiles)

const fallbackLogsServer = require('./server.js');


const nodeVersion = process.versions.node.split('.')[0]

const { spawn } = nodeVersion >= 16 ? require('node:child_process') : require('child_process');
let count = 0;
let time = Date.now();

const respawn = spawned => {
  spawned.on('close', (code) => {
    spawned.removeListener("refresh-" + boardname, refreshHandler);
    console.log(`child process exited with code ${code}`);
    log.error(`child process exited with code ${code} , time: ${((Date.now() - time) / (1000 * 60))} mins , count: ${count}`);

    const hour1 = 60 * 60 * 1000

    if (Date.now() - time >= hour1) {

      count = 0;
      time = Date.now();
    }

    if (Date.now() - time < hour1 && count < 10) {
      respawn(spawn(commands.command, commands.args))
      count++;
    } else {
      log.info('spawning fallback server')
      fallbackLogsServer(port)
    }
  })

  spawned.on('error', (error) => {
    console.log(`child process errored with ${error}`);
    log.error(`child process errored with ${error}`);
  })

  spawned.stdout.on('data', (data) => {
    console.log(`${data}`);
    log.info(`${data}`);
  });

  spawned.stderr.on('data', (data) => {
    console.error(`${data}`);
    log.error(`${data}`);
  });
}
console.log(commands.command, commands.args)
respawn(spawn(commands.command, commands.args))
