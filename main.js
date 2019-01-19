document.querySelector('#addGrade').addEventListener('click', () => {

  let temp = document.querySelector('#tempGradeInput');
  let clon = temp.content.cloneNode(true);

  document.querySelector('#grades').appendChild(clon);

});

document.querySelector('#calculate').addEventListener('click', () => {

  let desiredGrade = parseInt(document.querySelector('#desiredGrade').value) / 100;
  let grades = getGrades();
  let currentWeight = getCurrentWeight(grades);
  let currentGrade = getCurrentGrade(grades, currentWeight);
  let gradeNeeded = getGradeNeeded(desiredGrade, currentGrade, currentWeight);

  document.querySelector('#currentGrade')
    .innerText = currentGrade * 100 + '%';

  document.querySelector('#currentWeight')
    .innerText = currentWeight * 100 + '%';

  document.querySelector('#gradeNeeded')
    .innerText = gradeNeeded * 100 + '%';

});

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

function getGrades() {

  let grades = [];

  document.querySelectorAll('#grades > .gradeWeightPair').forEach((elem, i) => {

    let grade = parseInt(elem.querySelector('.grade').value);
    let weight = parseInt(elem.querySelector('.weight').value);

    if(!isNaN(grade) && !isNaN(weight)){

      grades[i] = [grade, weight]; 

    }    

  });

  return grades;

}

function getCurrentGrade(grades, currentWeight) {

  return (grades.reduce((accumGrade, grade) => {
    return accumGrade += grade[0] * grade[1] / 100;
  }, 0) / currentWeight) / 100;

}

function getCurrentWeight(grades) {

  return grades.reduce((currentWeight, grade) => {
    return currentWeight + grade[1] / 100;
  }, 0);
  
}

function getGradeNeeded(desiredGrade, currentGrade, currentWeight) {
  console.log(desiredGrade)
  console.log(currentGrade)
  console.log(currentWeight)

  return ((desiredGrade - currentGrade  * currentWeight) / currentWeight);

}

