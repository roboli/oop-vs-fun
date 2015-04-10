//////////////////
// Person Class //
//////////////////
var person = function(name, lastName) {
  var _name = name;
  var _lastName = lastName;

  return {
    getName: function() {
      return _name;
    },
    setName: function(name) {
      _name = name;
    },
    getLastName: function() {
      return _lastName;
    },
    setLastName: function(lastName) {
      _lastName = lastName;
    },
    toString: function() {
      return _name + " " + _lastName;
    }
  };
};

///////////////////
// Student Class //
///////////////////
var student = function(name, lastName) {
  var obj = person(name, lastName);
  return obj;
};

///////////////////
// Teacher Class //
///////////////////
var teacher = function(title, name, lastName) {
  var obj = person(name, lastName);
  var _title = title;

  obj.getTitle = function() {
    return _title;
  };

  return obj;
};

/////////////////
// Grade Class //
/////////////////
var grade = function(student, points) {
  var _student = student;
  var _points = points;

  return {
    getPoints: function() {
      return _points;
    },
    toString: function() {
      return _student + ": " + _points;
    }
  };
};

//////////////////
// Course Class //
//////////////////
var course = function() {
  var _grades = [];

  return {
    addGrade: function(grade) {
      _grades.push(grade);
    },
    removeGrade: function(grade) {
      var index = this._grades.indexOf(grade);

      if (index > -1) {
	this._grades.splice(index, 1);
      }
    },
    getGrades: function() {
      return _grades.slice();
    },
    getGradesSort: function(desc) {
      var grades = _grades.slice();
      
      return grades.sort(function(a, b){
	if (desc) {
	  return b.getPoints() - a.getPoints();
	} else {
	  return a.getPoints() - b.getPoints();
	}
      });
    }
  };
};

//////////////////////////////
// Printer Utility Function //
//////////////////////////////
function gradesPrinter(grades) {
  var s = "";
  
  grades.forEach(function(v) {
    s += v + "\n";
  });

  return s;
}


//////////
// Main //
//////////

//
// Create students
//
var s1 = student("Juan", "Perez");
var s2 = student("Carlos", "Gonzalez");
var s3 = student("Ana", "Ramirez");
var s4 = student("Karla", "Lopez");
var s5 = student("Miguel", "Flores");

//
// Create course and add grades
//
var c = course();

c.addGrade(grade(s1, 59));
c.addGrade(grade(s2, 88));
c.addGrade(grade(s3, 100));
c.addGrade(grade(s4, 45));
c.addGrade(grade(s5, 77));

//
// Print grades
//
console.log(gradesPrinter(c.getGrades()));

//
// Print sorted grades
//
console.log(gradesPrinter(c.getGradesSort(true)));
