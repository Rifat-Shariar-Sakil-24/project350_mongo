
const classNoInput = document.getElementById('classNo');
const rollInput = document.getElementById('roll');
const yearInput = document.getElementById('year');
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
    if (data && data.data && data.data.length > 0) {
      // Update the showbox field with fetched data
      const studentData = data.data[0];
      showbox.innerText = `${studentData.first_name} ${studentData.last_name}`;
      
      // Style for found student
      showbox.style.color = 'green';
      showbox.style.fontWeight = 'bold';
    } else {
      // Clear the showbox field if no data is found
      showbox.innerText = 'No such student found';
      
      // Style for not found student
      showbox.style.color = 'red';
      showbox.style.fontWeight = 'bold';
    }
  })
  .catch(error => {
    console.error('Error fetching student data:', error.message);
    // alert('An error occurred while fetching student data.');
  });

}
function submitForm(event) {
    event.preventDefault(); 
const form = document.getElementById('contact_form');
const formData = new FormData(form);

// Convert FormData to JSON object
const jsonObject = {};

if(classNoInput.value==1 || classNoInput.value==2) jsonObject['subjects'] = [false, false, false];
else jsonObject['subjects'] = [false, false, false, false, false, false];
 // Initialize with boolean values

formData.forEach((value, key) => {
if (key !== 'subjects') {
jsonObject[key] = value;
}
});

// Update the subjects array based on checkbox states
jsonObject['subjects'][0] = document.getElementById('bangla').checked;
jsonObject['subjects'][1] = document.getElementById('english').checked;
jsonObject['subjects'][2] = document.getElementById('math').checked;
console.log(classNoInput.value);

if(classNoInput.value>2) {
  console.log("3");
jsonObject['subjects'][3] = document.getElementById('science').checked;
jsonObject['subjects'][4] = document.getElementById('socialscience').checked;
jsonObject['subjects'][5] = document.getElementById('religion').checked;
}
// Make a POST request to your server with the JSON data
fetch('/save-distributed-book-info-class1&2', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(jsonObject),
})
.then(response => response.json())
.then(data => {
if (data && data.message) {
  alert(data.message);form.reset();
  showbox.innerText = `No such student found`;
      
  // Style for found student
  showbox.style.color = 'green';
  showbox.style.fontWeight = 'bold';
  

  // You can perform additional actions based on the server response
} else if (data && data.error) {
  if (data.error === 'Already books are distributed.') {
    alert('Already books are distributed.');
  } else if (data.error === 'No such student exists.') {
    alert('No such student exists.');
  } else {
    alert('An error occurred while submitting the form.');
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



const form = document.getElementById('contact_form');
form.addEventListener('submit', submitForm);
