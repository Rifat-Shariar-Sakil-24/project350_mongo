// Add an event listener to the first name input field
const firstNameInput = document.getElementById('first_name');
firstNameInput.addEventListener('input', validateFirstName);

// Function to validate the first name
function validateFirstName() {
  const firstName = firstNameInput.value;

  // Check if the input is empty
  if (firstName === '') {
    // Clear the error message if the input is empty
    document.getElementById('firstNameError').innerText = '';
    firstNameInput.setCustomValidity('');
    return;
  }

  // Define a regular expression pattern for valid characters
  const pattern = /^[a-zA-Z. ]+$/;

  if (!pattern.test(firstName)) {
    // If the input doesn't match the pattern, display an error message
    document.getElementById('firstNameError').innerText = 'Invalid Syntax';
    firstNameInput.setCustomValidity('Invalid characters');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('firstNameError').innerText = '';
    firstNameInput.setCustomValidity('');
  }
}



// Add an event listener to the last name input field
const lastNameInput = document.getElementsByName('last_name')[0]; // Assuming there's only one element with the name 'last_name'
lastNameInput.addEventListener('input', validateLastName);

// Function to validate the last name
function validateLastName() {
  const lastName = lastNameInput.value;

  // Check if the input is empty
  if (lastName === '') {
    // Clear the error message if the input is empty
    document.getElementById('lastNameError').innerText = '';
    lastNameInput.setCustomValidity('');
    return;
  }

  // Define a regular expression pattern for valid characters
  const pattern = /^[a-zA-Z. ]+$/;

  if (!pattern.test(lastName)) {
    // If the input doesn't match the pattern, display an error message
    document.getElementById('lastNameError').innerText = 'Invalid Syntax';
    lastNameInput.setCustomValidity('Invalid characters');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('lastNameError').innerText = '';
    lastNameInput.setCustomValidity('');
  }
}

// Add an event listener to the roll number input field
const rollNoInput = document.getElementById('rollNoInput');
rollNoInput.addEventListener('input', validateRollNumber);

// Function to validate the roll number
function validateRollNumber() {
  const rollNumber = rollNoInput.value;

  // Check if the input is empty
  if (rollNumber === '') {
    // Clear the error message if the input is empty
    document.getElementById('rollNumberError').innerText = '';
    rollNoInput.setCustomValidity('');
    return;
  }
  console.log(rollNumber);
  if (rollNumber === '-') {
    // Clear the error message if the input is empty
    document.getElementById('rollNumberError').innerText = 'অমান্য মান';
    rollNoInput.setCustomValidity('Invalid roll number');
  }
  
  // Check if the roll number is a positive integer
  if (!/^\d+$/.test(rollNumber) || rollNumber <= 0) {
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
const yearNoInput = document.getElementById('yearNoInput');
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





// Add an event listener to the father's name input field
const fatherNameInput = document.getElementsByName('father_name')[0]; // Assuming there's only one element with the name 'father_name'
fatherNameInput.addEventListener('input', validateFatherName);

// Function to validate the father's name
function validateFatherName() {
  const fatherName = fatherNameInput.value;

  // Check if the input is empty
  if (fatherName === '') {
    // Clear the error message if the input is empty
    document.getElementById('fatherNameError').innerText = '';
    fatherNameInput.setCustomValidity('');
    return;
  }

  // Define a regular expression pattern for valid characters
  const pattern = /^[a-zA-Z. ]+$/;

  if (!pattern.test(fatherName)) {
    // If the input doesn't match the pattern, display an error message
    document.getElementById('fatherNameError').innerText = 'Invalid Syntax';
    fatherNameInput.setCustomValidity('Invalid characters');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('fatherNameError').innerText = '';
    fatherNameInput.setCustomValidity('');
  }
}





// Add an event listener to the mother's name input field
const motherNameInput = document.getElementsByName('mother_name')[0]; // Assuming there's only one element with the name 'mother_name'
motherNameInput.addEventListener('input', validateMotherName);

// Function to validate the mother's name
function validateMotherName() {
  const motherName = motherNameInput.value;

  // Check if the input is empty
  if (motherName === '') {
    // Clear the error message if the input is empty
    document.getElementById('motherNameError').innerText = '';
    motherNameInput.setCustomValidity('');
    return;
  }

  // Define a regular expression pattern for valid characters
  const pattern = /^[a-zA-Z. ]+$/;

  if (!pattern.test(motherName)) {
    // If the input doesn't match the pattern, display an error message
    document.getElementById('motherNameError').innerText = 'Invalid Syntax';
    motherNameInput.setCustomValidity('Invalid characters');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('motherNameError').innerText = '';
    motherNameInput.setCustomValidity('');
  }
}





// Add an event listener to the phone number input field
const phoneInput = document.getElementsByName('phone')[0]; // Assuming there's only one element with the name 'phone'
phoneInput.addEventListener('input', validatePhoneNumber);

// Function to validate the phone number
function validatePhoneNumber() {
  const phoneNumber = phoneInput.value;

  // Check if the input is empty
  if (phoneNumber === '') {
    // Clear the error message if the input is empty
    document.getElementById('phoneError').innerText = '';
    phoneInput.setCustomValidity('');
    return;
  }

  // Define a regular expression pattern for valid digits and 11-digit length
  const pattern = /^\d{11}$/;

  if (!pattern.test(phoneNumber)) {
    // If the input doesn't match the pattern, display an error message
    document.getElementById('phoneError').innerText = 'সঠিক ফোন নম্বর এন্ট্রি করুন';
    phoneInput.setCustomValidity('Invalid phone number');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('phoneError').innerText = '';
    phoneInput.setCustomValidity('');
  }
}
