// Code from book Functional JavaScript (O'Reilly)
// Copyright © 2013 Michael Fogus
// ISBN:978-1-4493-6072-6

var _ = require("underscore");

function existy(x) { return x != null; }

//
// cat([1, 2, 3], [4, 5, 6]) => [1, 2, 3, 4, 5, 6]
//
function cat() {
  var head = _.first(arguments);
  
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

//
// construct(1, [2, 3]) => [1, 2, 3]
//
function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

var tools = {
    existy: existy,
    cat: cat,
    construct: construct
};

module.exports = tools;
