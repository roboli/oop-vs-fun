var _ = require("underscore");
var tools = require("./fun_tools");

var construct = tools.construct;
var partial = tools.partial;

function printGrades(grades) {
  return _.reduce(grades, function(a, b) {
    return a + _.values(b[0]).join(" ") + ": " + b[1] + "\n";
  }, "");
}

var student = [{name: "Miguel", last: "Orozco"}, 10];

var grades = [[{name: "Jose", last: "Lopez"}, 30],
	      [{name: "Carlos", last: "Paiz"}, 49],
	      [{name: "Luis", last: "Rodriguez"}, 88]];

grades = construct(student, grades);
grades = construct([{name: "Karla", last: "Castillo"}, 68], grades);
grades = construct([{name: "Mario", last: "Zoto"}, 90], grades);

_.sortBy(grades, function(v){ return v[1]; });

printGrades(grades);

_.filter(grades, function(v) { return v[1] > 50;});

grades = _.reject(grades, function(v) { return v === student; });

console.log(grades);

console.log(_.map(grades, function(v) { return [v[0], v[1] + 10]; }));

function plusTen(n) { return n + 10; };

function alterGrade(fun) {
  return function(ary) {
    return [ary[0], fun(ary[1])];
  };
}

function alterAll(fun) {
  return function(ary) {
    return _.map(ary, fun);
  };
}

var plusTenGrade = partial(alterGrade(plusTen));

var plusTenAll = partial(alterAll(plusTenGrade));

console.log(plusTenGrade(student));

console.log(plusTenAll(grades));

function always(n) {
  return function() {
    return n;
  };
}

var resetAll = partial(alterAll(alterGrade(always(0))));

console.log(resetAll(grades));

resetAll(grades);
