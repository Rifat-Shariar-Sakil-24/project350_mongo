const classNoInput = document.getElementById('classNoInput');
const rollInput = document.getElementById('rollNoInput');
const yearInput = document.getElementById('yearNoInput');
const showbox = document.getElementById('showbox');

classNoInput.addEventListener('input', updateStudentInfo);
rollInput.addEventListener('input', updateStudentInfo);
yearInput.addEventListener('input', updateStudentInfo);

function updateStudentInfo() {
  const classNo = classNoInput.value;
  const roll = rollInput.value;
  const year = yearInput.value;

  // Call the API to fetch student data using the GET method
  fetch(`/getStudentData?classNo=${classNo}&roll=${roll}&year=${year}`)
  .then(response => response.json())
  .then(data => {
    const showbox = document.getElementById('showbox'); // Assuming you have an element with id 'showbox'

    if (data && data.data && data.data.length > 0) {
      // Update the showbox field with fetched data
      const studentData = data.data[0];
      showbox.innerText = "This student already exists!";
      showbox.style.color = 'red';   // Set text color to red
      showbox.style.fontWeight = 'bold';  // Set text to bold
    } else {
      // Clear the showbox field if no data is found
      showbox.innerText = 'No such student found';
      showbox.style.color = 'green';  // Set text color to green
      showbox.style.fontWeight = 'bold';  // Set text to bold
    }
  })
  .catch(error => {
    console.error('Error fetching student data:', error.message);
    // alert('An error occurred while fetching student data.');
  });



}function submitForm(event) {
    event.preventDefault();  // Prevent the default form submission behavior
  
    const form = document.getElementById('contact_form');
    const formData = new FormData(form);
  
    // Convert FormData to JSON object
    const jsonObject = {};
  
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });
  
    // Make a POST request to your server with the JSON data
    fetch('/save-student-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject),
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.message) {
          // Check the server response for different scenarios
          if (data.message === 'Student information saved successfully.') {
            alert('Student info saved successfully');
  
            // Reset the form
            form.reset();
          } else if (data.message === 'Student already exists') {
            alert('Student already exists');
          } else {
            alert('Internal error found');
          }
        } else {
          alert('Server response is undefined or missing message.');
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred while submitting the form.');
      });
  }
  
  // Attach the submitForm function to the form's submit event
  const form = document.getElementById('contact_form');
  form.addEventListener('submit', submitForm);






  // first name error

 

  // ...

// ...
