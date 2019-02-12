// Adds a new input section for entering grades
document.querySelector('#addGrade').addEventListener('click', () => {

  const temp = document.querySelector('#tempGradeInput');
  const clon = temp.content.cloneNode(true);

  document.querySelector('#grades').appendChild(clon);

});

// Delegates the actions for the grade calculations
document.querySelector('#calculate').addEventListener('click', () => {

  let desiredGrade = parseInt(document.querySelector('#desiredGrade').value) / 100;
  let grades = getGrades();
  let currentWeight = calcCurrentWeight(grades);
  let currentGrade = calcCurrentGrade(grades, currentWeight);
  let gradeNeeded = calcGradeNeeded(desiredGrade, currentGrade, currentWeight);

  displayGrades(currentGrade, currentWeight, gradeNeeded);

});

// Resets the form for a clean start of calculations
document.querySelector('#reset').addEventListener('click', () => {

  let grades = document.querySelector('#grades');

  while (grades.childElementCount > 1) {
    grades.removeChild(grades.lastChild);
  }

  grades.querySelectorAll('input').forEach((elem) => elem.value = '');

  document.querySelector('#currentGrade').innerText = '';
  document.querySelector('#currentWeight').innerText = '';
  document.querySelector('#gradeNeeded').innerText = '';

});

function displayGrades(currentGrade, currentWeight, gradeNeeded) {

  const elGradeNeeded = document.querySelector('#gradeNeeded');
  const elCurrentGrade = document.querySelector('#currentGrade');
  const elCurrentWeight = document.querySelector('#currentWeight');

  if(!isNaN(currentGrade)) {
    elCurrentGrade.innerText = currentGrade * 100 + '%';
  } else {
    elCurrentGrade.innerText = 'N/A';
  }

  if(!isNaN(currentWeight) && currentWeight != 0) {
    elCurrentWeight.innerText = currentWeight * 100 + '%';
  } else {
    elCurrentWeight.innerText = 'N/A';
  }

  if(!isNaN(gradeNeeded)) {
    elGradeNeeded.innerText = gradeNeeded * 100 + '%';
  } else {
    elGradeNeeded.innerText = 'N/A';
  }

}

// Gets the grades from the form and returns the grades
function getGrades() {

  let grades = [];

  document.querySelectorAll('#grades > .gradeWeightPair').forEach((elem, i) => {

    let grade = parseFloat(elem.querySelector('.grade').value);
    let weight = parseFloat(elem.querySelector('.weight').value);

    if(!isNaN(grade) && !isNaN(weight)){

      grades[i] = [grade, weight]; 

    }    

  });

  return grades;

}

// Calculates the current grade based on the input values
function calcCurrentGrade(grades, currentWeight) {

  return (grades.reduce((accumGrade, grade) => {
    return accumGrade + grade[0] * grade[1] / 100;
  }, 0) / currentWeight) / 100;

}


function calcCurrentWeight(grades) {

  return grades.reduce((currentWeight, grade) => {
    return currentWeight + grade[1] / 100;
  }, 0);
  
}

function calcGradeNeeded(desiredGrade, currentGrade, currentWeight) {

  return ((desiredGrade) - (currentGrade)  * currentWeight) / (1 - currentWeight);
  
}
