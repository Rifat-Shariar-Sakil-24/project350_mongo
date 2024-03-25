// Add an event listener to the roll number input field
const rollNoInput = document.getElementById('roll');
rollNoInput.addEventListener('input', validateRollNumber);

// Function to validate the roll number
// Function to validate the roll number
function validateRollNumber() {
    const rollNumber = rollNoInput.value;
  
    // Log the whole number as a string
    console.log(rollNumber);
  
    // Check if the input is empty
    if (rollNumber === '') {
      // Clear the error message if the input is empty
      document.getElementById('rollNumberError').innerText = '';
      rollNoInput.setCustomValidity('');
      return;
    }
  
    // Check if the input contains a negative sign or is not a positive integer
    if (!/^\d+$/.test(rollNumber) || rollNumber.charAt(0) === '-') {
      // If the input is not a positive integer, display an error message
      document.getElementById('rollNumberError').innerText = 'অমান্য মান';
      rollNoInput.setCustomValidity('Invalid roll number');
    } else {
      // Clear the error message if the input is valid
      document.getElementById('rollNumberError').innerText = '';
      rollNoInput.setCustomValidity('');
    }
  }
  

  
// Add an event listener to the study year input field
const yearNoInput = document.getElementById('year');
yearNoInput.addEventListener('input', validateStudyYear);

// Function to validate the study year
function validateStudyYear() {
  const studyYear = yearNoInput.value;
  const currentYear = new Date().getFullYear();

  // Check if the input is empty
  if (studyYear === '') {
    // Clear the error message if the input is empty
    document.getElementById('studyYearError').innerText = '';
    yearNoInput.setCustomValidity('');
    return;
  }

  // Check if the study year is a 4-digit number within the specified range
  if (
    studyYear < 2000 ||
    studyYear > currentYear ||
    !Number.isInteger(Number(studyYear)) ||
    studyYear.length !== 4
  ) {
    // If the input is invalid, display an error message
    document.getElementById('studyYearError').innerText = 'অমান্য মান';
    yearNoInput.setCustomValidity('Invalid study year');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('studyYearError').innerText = '';
    yearNoInput.setCustomValidity('');
  }
}
