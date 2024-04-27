const classNumberId = document.getElementById('classNumber');
const rollNumberId = document.getElementById('rollNumber');
const yearNumberId = document.getElementById('yearNumber');
const showboxId = document.getElementById('showbox');

classNumberId.addEventListener('input', checkStudentExists);
rollNumberId.addEventListener('input', checkStudentExists);
yearNumberId.addEventListener('input', checkStudentExists);

let validForm = 0;
async function checkStudentExists(){
  const classNumber = classNumberId.value;
  const rollNumber = rollNumberId.value;
  const yearNumber = yearNumberId.value;
  


  try{
     console.log(classNumber,rollNumber,yearNumber);
     const res  = await fetch(`/getStudentData?classNo=${classNumber}&roll=${rollNumber}&year=${yearNumber}`);
     const status =  res.status;
     console.log(status);
     if (status === 201) { // student exist, book distribution form submission valid
       validForm = 1;
       showbox.innerText = "Student Found";
       showbox.style.color = "green";
       showbox.style.fontWeight = "bold";
     } else { // student doesn't exist, can't proceed
       validForm = 0;
       showbox.innerText = "Student not found";
       showbox.style.color = "red";
       showbox.style.fontWeight = "bold";
     }
  }
  catch(error){

  }
}




const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (validForm === 1) { 
        const formData = new FormData(this);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        // Get the status of checkboxes by name
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            formDataObject[checkbox.name] = checkbox.checked;
        });
        
        console.log('Form Data with Checkbox Status:', formDataObject);
        const classNumber = formDataObject['classNumber']; 

        
    
        try {
            const res = await fetch(`/book-distribution-entry/class/${classNumber}`, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers: { 'Content-Type': 'application/json'}
            });
            
            if (res.status == 201) {
                this.reset();
                alert('Book distribution Information added successfully');
                 
            } else {
                const errorMessage = await res.text(); 
                alert(errorMessage);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }
    } else {
        alert('Form submission cancelled because student does not exist');
    }
});

// // Function to submit the form programmatically
// function submitForm() {
//     const form = document.querySelector('form');
//     const event = new Event('submit');
//     form.dispatchEvent(event);
// }
