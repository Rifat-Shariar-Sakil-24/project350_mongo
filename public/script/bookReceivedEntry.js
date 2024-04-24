

const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
      const formData = new FormData(this);
        const formDataObject = {};
        
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        console.log(formDataObject);


            
    
        try {
            const res = await fetch(`/book-received-entry/class/${classNumber}`, {
                method: 'POST',
                body: JSON.stringify(formDataObject),
                headers: { 'Content-Type': 'application/json'}
            });
            
            if (res.status == 201) {
                this.reset();
                alert('Book received Information added successfully');
                 
            } else {
                const errorMessage = await res.text(); 
                alert(errorMessage);
            }
        } catch(error) {
            console.log("Error occurred:", error);
        }

 
});
