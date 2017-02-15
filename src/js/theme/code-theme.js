var $ = require("../jquery-3.1.1.js");

var themes = [
  'atelier-cave-dark',
  'atelier-cave-light',
  'atelier-dune-dark',
  'atelier-dune-light',
  'atelier-estuary-dark',
  'atelier-estuary-light',
  'atelier-forest-dark',
  'atelier-forest-light',
  'atelier-heath-dark',
  'atelier-heath-light',
  'atelier-lakeside-dark',
  'atelier-lakeside-light',
  'atelier-plateau-dark',
  'atelier-plateau-light',
  'atelier-savanna-dark',
  'atelier-savanna-light',
  'atelier-seaside-dark',
  'atelier-seaside-light',
  'atelier-sulphurpool-dark',
  'atelier-sulphurpool-light',
  'github-light',
  'github-v2',
  'github',
  'hemisu-dark',
  'hemisu-light',
  'tomorrow-night-blue',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'tomorrow-night',
  'tomorrow',
  'tranquil-heart',
  'vibrant-ink'
];
var currentTheme = 'atelier-forest-light';

let CodeTheme = function () {
  this.init();
};

CodeTheme.prototype.init = function() {
  this.bindEvt();
};

CodeTheme.prototype.bindEvt = function() {
  var $options = $.map(themes, function(item) {
    var selected = currentTheme === item ? ' selected' : '';
    return '<option value="' + item + '"' + selected + '>' + item +'</option>';
  });
  $('.code-theme').html($options);
  $('.code-theme').on('change', function() {
    var val = $(this).val();
    $("#codeThemeId").attr('href', './themes/' + val + '.css');
  }).trigger('change');
};


module.exports = CodeTheme;
