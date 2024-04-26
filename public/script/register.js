

const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
        const formData = new FormData(this);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

      

        
    
        try {
            const res = await fetch(`/register`, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers: { 'Content-Type': 'application/json'}
            });
            
            if (res.status == 201) {
                this.reset();
                alert('school added');
                window.location.href = '/menu';
                
                 
            } else {
                console.log('dd');
                const errorMessage = await res.text(); 
                alert(errorMessage);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }
   
});