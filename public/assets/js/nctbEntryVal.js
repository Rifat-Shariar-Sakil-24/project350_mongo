// Add an event listener to the date input field
const dateInput = document.querySelector('input[name="date"]');
dateInput.addEventListener('input', validateDate);

// Function to validate the date
function validateDate() {
  const selectedDate = dateInput.value;
  const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'yyyy-mm-dd' format

  // Check if the input is empty
  if (selectedDate === '') {
    // Clear the error message if the input is empty
    document.getElementById('dateError').innerText = '';
    dateInput.setCustomValidity('');
    return;
  }

  // Check if the selected date is within the specified range
  if (selectedDate < '2001-01-01' || selectedDate > currentDate) {
    // If the input is outside the range, display an error message
    document.getElementById('dateError').innerText = 'অমান্য তারিখ';
    dateInput.setCustomValidity('Invalid date');
  } else {
    // Clear the error message if the input is valid
    document.getElementById('dateError').innerText = '';
    dateInput.setCustomValidity('');
  }
}


const yearNoInput = document.querySelector('input[name="studyyear"]');
        yearNoInput.addEventListener('input', validateStudyYear);

        // Function to validate the year
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
                studyYear < 2001 ||
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



        
        // Add an event listener to the book number input field
        const bookNumberInput = document.querySelector('input[name="booknumber"]');
        bookNumberInput.addEventListener('input', validateBookNumber);

        // Function to validate the book number
        function validateBookNumber() {
            const bookNumber = bookNumberInput.value;

            // Check if the input is empty
            if (bookNumber === '') {
                // Clear the error message if the input is empty
                document.getElementById('bookNumberError').innerText = '';
                bookNumberInput.setCustomValidity('');
                return;
            }

            // Check if the book number is a negative number
            if (bookNumber <= 0) {
                // If the input is negative, display an error message
                document.getElementById('bookNumberError').innerText = 'বৈধ নয়';
                bookNumberInput.setCustomValidity('Invalid book number');
            } else {
                // Clear the error message if the input is valid
                document.getElementById('bookNumberError').innerText = '';
                bookNumberInput.setCustomValidity('');
            }
        }