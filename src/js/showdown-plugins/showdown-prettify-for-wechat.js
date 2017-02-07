var showdown = require('../showdown');

showdown.extension('prettify', function () {
  return [{
    type:   'output',
    filter: function (source) {
      return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
        if (pre) {
          return '<pre class="prettyprint linenums" style="font-size: 10px;line-height: 12px"><code' + codeClass + ' style="font-size: 10px;line-height: 12px">';
        } else {
          return ' <code class="prettyprint code-in-text"  style="font-size: 16px;line-height: 18px">';
        }
      });
    }
  }];
});
