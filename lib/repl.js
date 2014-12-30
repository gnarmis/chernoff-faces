require('../config/boot.js');

var repl = require('repl');

var replServer = repl.start({
  prompt: 'tic> '
});
