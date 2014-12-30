var ChernoffDemo = require('./client/chernoff_demo.js'),
  domready = require('domready');

domready(function() {
  ChernoffDemo.start();
});
