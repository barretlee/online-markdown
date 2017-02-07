var showdown = require('../showdown');

showdown.extension('tasklist', function () {
  return [{
    type:   'output',
    filter: function (source) {
      source = source.replace(/<li>\[ \] (.*)<\/li>/gi, function (match, pre) {
        if(pre){
          return '<p class="task-list-list uncheck" style="list-style-type: none;"><i class="icon_uncheck"></i><span>' + pre + '</span></p>'  ;
        }
      });

      source = source.replace(/<li>\[x] (.*)<\/li>/gi, function (match, pre) {
        if(pre){
          return '<p class="task-list-list checked" style="list-style-type: none;"><i class="icon_check"></i>' + pre + '</p>'  ;
        }
      });

      return source;
    }
  }];
});
