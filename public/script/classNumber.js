
document.addEventListener('DOMContentLoaded', function() {
    
    const  number = document.getElementById('classNumberNumerical').value;
    console.log('ClassNumber:', number);
    let ClassNumber;

       if(number==1) ClassNumber = "প্রথম";
    else if(number==2) ClassNumber="দ্বিতীয়";
    else if(number==3) ClassNumber = "তৃতীয়";
    else if (number==4) ClassNumber = "চতুর্থ";
    else ClassNumber = "পঞ্চম";
    console.log(ClassNumber);
    document.getElementById('classNumberBangla').innerHTML = "আপনি " + ClassNumber +  " শ্রেণির স্টুডেন্টের তথ্য এন্ট্রি করছেন";
    document.getElementById('showClassNumber').innerHTML = ClassNumber + " শ্রেণি";
    //document.getElementById('showClassNumeberBangla').textContent = ClassNumber + " শ্রেণি";

    

});
