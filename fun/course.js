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
var student = {name: "Miguel", last: "Orozco"};

var grade = [student, 10];

var grades = [[{name: "Jose", last: "Lopez"}, 30],
	      [{name: "Carlos", last: "Paiz"}, 49],
	      [{name: "Luis", last: "Rodriguez"}, 88]];

//
// Augment data (using mutation)
//
grades = construct(grade, grades);
grades = construct([{name: "Karla", last: "Castillo"}, 68], grades);
grades = construct([{name: "Mario", last: "Zoto"}, 90], grades);

//
// Print
//
console.log("Using printGrades:");
console.log(
    printGrades(grades)
);

//
// Sort Asc (Positive v[n])
//
console.log("Ascending Order:");
console.log(
    _.sortBy(grades, function(v){ return v[1]; })
);

//
// Filter grades over 50 points
//
console.log("\nFilter over 50:");
console.log(
    _.filter(grades, function(v) { return v[1] > 50;})
);

//
// Reject student "Miguel Orozco"
//
console.log("\nReject Miguel Orozco:");
console.log(
    _.reject(grades, function(v) { return v[0] === student; })
);

//
// Add 10 points to all
//
console.log("\nAdd 10 points to all:");
console.log(
    _.map(grades, function(v) { return [v[0], v[1] + 10]; })
);


///////////////////////////
// Functions Composition //
///////////////////////////

function plusTen(n) { return n + 10; };

function alterGrade(fun) {
  return function(ary) {
    return [ary[0], fun(ary[1])];
  };
}

var plusTenGrade = alterGrade(plusTen);

//
// Add 10 points to 1 grade
//
console.log("\nplusTen grade:");
console.log(plusTenGrade(grade));

function alterAll(fun) {
  return function(ary) {
    return _.map(ary, fun);
  };
}

var plusTenAll = alterAll(plusTenGrade);

//
// Add 10 points to all
//
console.log("\nplusTenAll grades:");
console.log(plusTenAll(grades));

function always(n) {
  return function() {
    return n;
  };
}

var resetAll = alterAll(alterGrade(always(0)));

//
// Reset all grades
//
console.log("\nresetAll grades:");
console.log(resetAll(grades));
