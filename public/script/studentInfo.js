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
console.log(classes.length);
for(let i=0;i<classes.length;i++){
    classes[i].addEventListener('click',function(){
            let classesToAdd = ['shadow-lg' ,'relative' ,'ring-2' , 'ring-blue-500', 'focus:outline-none', 'blueBorder'];
            for(let j=0;j<classes.length;j++){
                classes[j].classList.remove(...classesToAdd);
            }
            classes[i].classList.add(...classesToAdd);

           //console.log(i);
    })
}