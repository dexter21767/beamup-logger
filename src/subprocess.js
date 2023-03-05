const {port,commands} = require('./cli.js');

const log = require('./logger.js');
const fallback = require('./fallback.js');


const nodeVersion = process.versions.node.split('.')[0] 

const { spawn } = nodeVersion>=16 ? require('node:child_process') : require('child_process');
let count = 0;
let time = Date.now(); 

const respawn = spawned => {
  spawned.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    log.error(`child process exited with code ${code} , time: ${((Date.now() - time)/(1000*60))} mins , count: ${count}`);
    
    if(((Date.now() - time)/(1000*60)) >= 60 ){
      count = 0;
      time = Date.now();
    }
    
    if(((Date.now() - time)/(1000*60)) < 60 && count<10) {
      respawn(spawn(commands.command, commands.args))
      count++;
    }else {
      log.info('spawning fallback server')
      fallback(port)
  }
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
