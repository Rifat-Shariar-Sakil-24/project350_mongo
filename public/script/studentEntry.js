
const classNoInput = document.getElementById('classNoInput');
const rollInput = document.getElementById('rollNoInput');
const yearInput = document.getElementById('yearNoInput');
const showbox = document.getElementById('showbox');

classNoInput.addEventListener('input', updateStudentInfo);
rollInput.addEventListener('input', updateStudentInfo);
yearInput.addEventListener('input', updateStudentInfo);

let validForm = 1;
async function updateStudentInfo() {
  const classNo = classNoInput.value;
  const roll = rollInput.value;
  const year = yearInput.value;

  try{
     const res  = await fetch(`/getStudentData?classNo=${classNo}&roll=${roll}&year=${year}`);
     const message = await res.text();
     const status =  res.status;
     console.log(status);
     if(status===201){
                validForm = 0;
               showbox.innerText = "This student already exists!";
      showbox.style.color = 'red';   
      showbox.style.fontWeight = 'bold'; 
     }
     else{
       validForm = 1;
      showbox.innerText = 'No such student found';
      showbox.style.color = 'green';  
      showbox.style.fontWeight = 'bold';  
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
    
        const classNo = formDataObject['classNo']; 
    
        try {
            const res = await fetch(`/student-entry/class/${classNo}`, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers: { 'Content-Type': 'application/json'}
            });
            
            if (res.status == 201) {
                console.log('Student added successfully');
                this.reset(); 
            } else {
                const errorMessage = await res.text(); 
                alert(errorMessage);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }
    } else {
        alert('Form submission cancelled because student already exists.');
    }
});

// Function to submit the form programmatically
function submitForm() {
    const form = document.querySelector('form');
    const event = new Event('submit');
    form.dispatchEvent(event);
}
