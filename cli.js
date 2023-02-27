
const { program } = require('commander');

program
  .name('beamup-logger')
  .description('A beamup subprocess to enable logs')
  .version('0.1.0')

program.command('execute')
  .description('usage "cli execute node server.js"')
  .argument('executable <string>', 'executable for launching the server')
  .argument('argument <string>', 'argument for launching the server')

program.parse();

module.exports = [program.args[1],program.args[2]]
