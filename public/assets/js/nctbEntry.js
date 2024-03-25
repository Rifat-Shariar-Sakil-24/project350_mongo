

console.log("ggg");
//const form = document.getElementById('contact_form');
//form.addEventListener('submit', submitForm);

function submitForm() {
   // Prevent the form from submitting normally
  
   const form = document.getElementById('contact_form');
   const formData = new FormData(form);
   const jsonObject = {};
  
   formData.forEach((value, key) => {
     jsonObject[key] = value;
   });
   console.log(jsonObject);
  
    fetch('/save-bookfrom-ntcb-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonObject),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            alert('Data saved successfully');
          console.log('Data saved successfully:', data.message);
          // Optionally, display a success message to the user
        } else {
          console.error('Error saving data:', data.message);
          // Optionally, display an error message to the user
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle network or other errors
      });
  }
  