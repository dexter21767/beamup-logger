
const { program } = require('commander');

function ParseInt(value) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

function ParseMax(value) {
  if(value.match(/^\d+d?$/)){
    return value;
  }
  else if (value.match(/^\d+$/)) {
    return parseInt(value, 10);
  }
  throw new program.InvalidArgumentError('Invalid maxFiles');  
}

program
  .name('beamup-logger')
  .description('A beamup subprocess to enable logs')
  .version('0.1.0')
  .option('-p, --port <int>', 'local server port for fallback server', ParseInt)
  .option('-m, --maxFiles <string>', "Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days. If using days, add 'd' as the suffix. It uses auditFile to keep track of the log files in a json format. It won't delete any file not contained in it. It can be a number of files or number of days (default: 1d), set to 0 to disable",ParseMax);
  
program.command('execute')
  .description('usage "cli execute node server.js"')
  .argument('executable <string>', 'executable for launching the server')
  .argument('argument <string>', 'argument for launching the server')

program.parse();
const options = program.opts();
let args = program.args;
args.shift();
const command = args.shift();

module.exports = {port:options.port,maxFiles:options.maxFiles ,commands:{command,args}}
