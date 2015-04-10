var _ = require("underscore");

function existy(x) { return x != null; }

function cat() {
  var head = _.first(arguments);
  
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

function partial(fun) {
  var pargs = _.rest(arguments);

  return function() {
    var args = cat(pargs, _.toArray(arguments));
    return fun.apply(fun, args);
  };
}

var tools = {
  existy: existy,
  cat: cat,
  construct: construct,
  partial: partial
};

module.exports = tools;
