

const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
        

    document.querySelector('.loading').style.display = 'block';

    
        const formData = new FormData(this);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

      

        
    
        try {
            const res = await fetch(`/login`, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers: { 'Content-Type': 'application/json'}
            });
            
            if (res.status == 201) {
                
               setTimeout(() => {
                 this.reset();
                 document.querySelector('.loading').style.display = 'none';
                  window.location.href = '/menu';
                
               }, 2000);
                 
            } else {
                const errorMessage = await res.text(); 
                setTimeout(() => {
                    document.querySelector('.loading').style.display = 'none';
                    alert(errorMessage);
                }, 2000);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }
   
});













// document.querySelector('form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
    
//     // Show loading sign
//     document.querySelector('.loading').style.display = 'block';
    
//     // Simulate login process (Replace this with your actual login process)
//     setTimeout(function() {
//       // Hide loading sign after a delay (Replace this with your actual login process)
//       document.querySelector('.loading').style.display = 'none';
//       // Redirect or perform other actions upon successful login
//       alert('Logged in successfully!');
//     }, 2000); // Simulating a delay of 2 seconds
//   });
  