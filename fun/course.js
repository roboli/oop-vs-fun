var _ = require("underscore");
var tools = require("./fun_tools");
var construct = tools.construct;

//////////////////////////////
// Printer Utility Function //
//////////////////////////////
function printGrades(grades) {
  return _.reduce(grades, function(a, b) {
    return a + _.values(b[0]).join(" ") + ": " + b[1] + "\n";
  }, "");
}

//
// Data
//
var student = [{name: "Miguel", last: "Orozco"}, 10];

var grades = [[{name: "Jose", last: "Lopez"}, 30],
	      [{name: "Carlos", last: "Paiz"}, 49],
	      [{name: "Luis", last: "Rodriguez"}, 88]];

//
// Augment data (beware of mutation!)
//
grades = construct(student, grades);
grades = construct([{name: "Karla", last: "Castillo"}, 68], grades);
grades = construct([{name: "Mario", last: "Zoto"}, 90], grades);

//
// Print
//
console.log(printGrades(grades));

//
// Sort
//
console.log(
    _.sortBy(grades, function(v){ return v[1]; })
);

//
// Filter
//
console.log(
    _.filter(grades, function(v) { return v[1] > 50;})
);

//
// Reject "Miguel Orozco"
//
console.log(
    _.reject(grades, function(v) { return v === student; })
);

//
// Add 10 points to all
//
console.log(
    _.map(grades, function(v) { return [v[0], v[1] + 10]; })
);

//////////////////////////////
// Create Partial Functions //
//////////////////////////////
var partial = tools.partial;

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

//
// Add 10 points to 1 student
//
console.log(plusTenGrade(student));

//
// Add 10 points to all
//
console.log(plusTenAll(grades));

function always(n) {
  return function() {
    return n;
  };
}

var resetAll = partial(alterAll(alterGrade(always(0))));

//
// Reset all grades
//
console.log(resetAll(grades));
