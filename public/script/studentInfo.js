document.addEventListener("DOMContentLoaded", function () {
  // const  number = document.getElementById('classNumberNumerical').value;
  // console.log('ClassNumber:', number);
  // let ClassNumber;

  // document.getElementById('showClassNumeberBangla').textContent = ClassNumber + " শ্রেণি";

  // JavaScript to set values for each span with the class "showClassNumberBangla"
  var spanElements = document.getElementsByClassName("showClassNumberBangla");
  var hiddenInputs = document.getElementsByClassName("classNumberNumerical");

  for (var i = 0; i < spanElements.length; i++) {
    let number = hiddenInputs[i].value;
    let ClassNumber;
    if (number == 1) ClassNumber = "প্রথম";
    else if (number == 2) ClassNumber = "দ্বিতীয়";
    else if (number == 3) ClassNumber = "তৃতীয়";
    else if (number == 4) ClassNumber = "চতুর্থ";
    else ClassNumber = "পঞ্চম";
    ClassNumber += " শ্রেণি";
    spanElements[i].textContent = ClassNumber;
  }
  
});


let classes = document.getElementsByClassName("classBox");
let classesToAdd = ['shadow-lg' ,'relative' ,'ring-2' , 'ring-blue-500', 'focus:outline-none', 'blueBorder'];
classes[0].classList.add(...classesToAdd);
let classSelected = 1;


for(let i=0;i<classes.length;i++){
    classes[i].addEventListener('click',function(){
            
            for(let j=0;j<classes.length;j++){
                classes[j].classList.remove(...classesToAdd);
            }
            classes[i].classList.add(...classesToAdd);
            classSelected = i+1;

            showStudentInfo();

           //console.log(i);
    })
}









const yearInput = document.getElementById('yearNoInput');



yearInput.addEventListener('input', showStudentInfo);

let validForm = 1;
async function showStudentInfo() {
    

    const yearNumber = yearNoInput.value;
    

    if(yearNumber!=null){
       
      
  try{
     const classNumber = classSelected; 
     console.log(classSelected);
     const res  = await fetch(`/getAllStudentData?classNumber=${classNumber}&yearNumber=${yearNumber}`);

     const status =  res.status;
   
     if(status===201){
         const data = await res.json();
         const tableBody = document.getElementById('studentTableBody');
         tableBody.innerHTML = '';

         data.forEach(student => {
            const row = document.createElement('tr');
            console.log(student.firstName);
            row.innerHTML = `
            
    <td>${student.firstName} ${student.secondName}</td>
    <td>${student.fatherName}</td>
    <td>${student.motherName}</td>
    <td>${student.yearNumber}</td>
    <td>${student.classNumer}</td>
    <td>${student.rollNumber}</td>
    <td>${student.phoneNumber}</td>
    <td>${student.address}</td>
    `
       tableBody.appendChild(row);
         })
         
        
         
     }
    //  else{
    //    validForm = 1;
    //   showbox.innerText = 'No such student found';
    //   showbox.style.color = 'green';  
    //   showbox.style.fontWeight = 'bold';  
    //  }
  }
  catch(error){

  }  
    }




}
