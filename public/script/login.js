

const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
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
                this.reset();
              
               window.location.href = '/menu';
                 
            } else {
                const errorMessage = await res.text(); 
                alert(errorMessage);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }
   
});