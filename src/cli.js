
const { program } = require('commander');

function ParseInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

program
  .name('beamup-logger')
  .description('A beamup subprocess to enable logs')
  .version('0.1.0')
  .option('-p, --port <int>', 'local server port for fallback server', ParseInt);

program.command('execute')
  .description('usage "cli execute node server.js"')
  .argument('executable <string>', 'executable for launching the server')
  .argument('argument <string>', 'argument for launching the server')

program.parse();
const options = program.opts();
let args = program.args;
args.shift();
const command = args.shift();

module.exports = {port:options.port ,commands:{command,args}}
