require('../css/index.less');

var $ = require("./jquery-3.1.1.js");
var showdown = require("./showdown.js");
var Clipboard = require("./clipboard.min.js");

require("./showdown-plugins/showdown-prettify-for-wechat.js");
require("./showdown-plugins/showdown-github-task-list.js");
require("./showdown-plugins/showdown-footnote.js");

require("./google-code-prettify/run_prettify.js");

var input, output;
var converter = new showdown.Converter({extensions: ['prettify', 'tasklist', 'footnote'], tables: true});

function updateOutput() {
  output.innerHTML = converter.makeHtml(input.value);
  PR.prettyPrint();
}

document.addEventListener("DOMContentLoaded", function (event) {
  input = document.getElementById('input');
  output = document.getElementById('output');

  input.addEventListener('input', updateOutput, false);
  input.addEventListener('keydown', updateOutput, false);

  updateOutput();
});


$('document').ready(function () {
  new Clipboard('.btn');
});
