require('../css/index.less');

var $ = require("./jquery-3.1.1.js");
var showdown = require("./showdown.js");
var Clipboard = require("./clipboard.min.js");
var CodeTheme = require("./theme/code-theme");
var PageTheme = require("./theme/page-theme");

require("./showdown-plugins/showdown-prettify-for-wechat.js");
require("./showdown-plugins/showdown-github-task-list.js");
require("./showdown-plugins/showdown-footnote.js");

require("./google-code-prettify/run_prettify.js");


var kv = location.href.split('?')[1];
kv = kv && kv.split('&') || [];
var params = {};
$.each(kv, function(index, item) {
  var m = (item || '').split('=');
  if (m && m[0] && m[1]) {
    params[m[0]]= m[1];
  }
});

// 方便跨域加载资源
if (/\.barretlee\.com$/.test(location.hostname)) {
  document.domain = 'barretlee.com';
}


var converter =  new showdown.Converter({
  extensions: ['prettify', 'tasklist', 'footnote'],
  tables: true
});
/**
 * [OnlineMarkdown description]
 * @type {Object}
 */
var OnlineMarkdown = {
  currentState: 'edit',
  init: function() {
    var self = this;
    self.load().then(function() {
      self.start()
    }).fail(function(){
      self.start();
    });
  },
  start: function() {
    this.bindEvt();
    this.updateOutput();
    new CodeTheme();
    new PageTheme();
    new Clipboard('.btn');
  },
  load: function() {
    return $.ajax({
      type: 'GET',
      url: params.path || './demo.md',
      dateType: 'text',
      data: {
        _t: new Date() * 1
      },
      timeout: 2000
    }).then(function(data) {
      $('#input').val(data);
    });
  },
  bindEvt: function() {
    var self = this;
    $('#input').on('input keydown paste', self.updateOutput);
    var $copy = $('.copy-button');
    var $convert = $('.convert-button');
    $convert.on('click', function() {
      var $this = $(this);
      if (self.currentState === 'preview') {
        self.currentState = 'edit';
        $this.text('预览');
        $copy.hide();
        $('#input').fadeIn();
        $('#output').hide();
      } else {
        self.currentState = 'preview';
        $this.text('编辑');
        $copy.show();
        $('#input').fadeOut();
        $('#output').show();
      }
    });
    if (params.preview) {
      $convert.trigger('click');
    }
  },

  updateOutput: function () {
    var val = converter.makeHtml($('#input').val());
    $('#output .wrapper').html(val);
    PR.prettyPrint();
    $('#outputCtt li').each(function() {
      $(this).html('<span><span>' + $(this).html() + '</span></span>');
    });
  }
};

OnlineMarkdown.init();
