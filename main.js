// Adds a new input section for entering grades
document.querySelector('#addGrade').addEventListener('click', () => {

  let temp = document.querySelector('#tempGradeInput');
  let clon = temp.content.cloneNode(true);

  document.querySelector('#grades').appendChild(clon);

});

// Delegates the actions for the grade calculations
document.querySelector('#calculate').addEventListener('click', () => {

  let desiredGrade = parseInt(document.querySelector('#desiredGrade').value) / 100;
  let grades = getGrades();
  let currentWeight = calcCurrentWeight(grades);
  let currentGrade = calcCurrentGrade(grades, currentWeight);
  let gradeNeeded = calcGradeNeeded(desiredGrade, currentGrade, currentWeight);

  document.querySelector('#currentGrade')
    .innerText = currentGrade * 100 + '%';

  document.querySelector('#currentWeight')
    .innerText = currentWeight * 100 + '%';

  document.querySelector('#gradeNeeded')
    .innerText = gradeNeeded * 100 + '%';

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
    console.log(`grade: ${grade}`)
    console.log(`grade: ${accumGrade}`)

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

