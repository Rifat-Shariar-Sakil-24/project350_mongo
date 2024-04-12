
document.addEventListener('DOMContentLoaded', function() {
    
    const  number = document.getElementById('classNumberNumerical').value;
    if(number>3){
        document.getElementById('socialscience').style.display = "block";
        document.getElementById('science').style.display = "block";
        document.getElementById('religion').style.display = "block";
    }
    else{
        document.getElementById('socialscience').style.display = "none";
        document.getElementById('science').style.display = "none";
        document.getElementById('religion').style.display = "none";
    }  

});
