let selectedClass = 1;
async function  renderSubjects() {
    const head = document.getElementById("studentTableHead");
    head.innerHTML = "";
  
    let headingrow = document.createElement("tr");
    headingrow.innerHTML = `
      <th scope="col">নাম</th>
      <th scope="col">শিক্ষাবর্ষ</th>
      <th scope="col">শ্রেণি</th>
      <th scope="col">রোল</th>
      <th scope="col">আমার বাংলা বই</th>
      <th scope="col">English for Today</th>
      <th scope="col">প্রাথমিক গণিত</th>
    `;
    
    if (selectedClass > 3) {
      headingrow.innerHTML += `
        <th scope="col">Science</th>
        <th scope="col">SocialScience</th>
        <th scope="col">Religion</th>
      `;
    }
  
    headingrow.innerHTML += `<th scope="col">অ্যাকশন</th>`;
    head.appendChild(headingrow);
  }
  
 renderSubjects();
  




document.addEventListener("DOMContentLoaded", function () {
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

// changing selected classes color by adding classes dynamically
let classes = document.getElementsByClassName("classBox");
let classesToAdd = [
  "shadow-lg",
  "relative",
  "ring-2",
  "ring-blue-500",
  "focus:outline-none",
  "blueBorder",
];
classes[0].classList.add(...classesToAdd);
let classSelected = 1;

for (let i = 0; i < classes.length; i++) {
  classes[i].addEventListener("click", async function () {
    for (let j = 0; j < classes.length; j++) {
      classes[j].classList.remove(...classesToAdd);
    }
    selectedClass = i+1;
    classes[i].classList.add(...classesToAdd);
    classSelected = i + 1;
    await renderSubjects();
    await showDistributionInfo();
  });
}

// showing student information for corresponding class and year
let BookDistributions = [];
const yearInput = document.getElementById("yearNoInput");
yearInput.addEventListener("input", showDistributionInfo);

let validForm = 1;
let studentObject;
let editStudentObjects = [];
async function showDistributionInfo() {
  const yearNumber = yearInput.value;

  if (yearNumber != null) {
    try {
      const classNumber = classSelected;
      editStudentObjects = [];
      const res = await fetch(
        `/getAllDistributionData?classNumber=${classNumber}&yearNumber=${yearNumber}`
      );

      const status = res.status;

      if (status === 201) {
        
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = "";

        const data = await res.json();
        BookDistributions = data;
 

        data.forEach((student) => {
          editStudentObjects.push(student);
          let row = document.createElement("tr");
          console.log(student.subjects.bangla);
          row.innerHTML = `
              
      <td>${student.fullName} </td>
      <td>${student.yearNumber}</td>
      <td>${student.classNumber}</td>
      <td>${student.rollNumber}</td>
      <td>${student.subjects.bangla}</td>
      <td>${student.subjects.english}</td>
      <td>${student.subjects.math}</td>
      `
      if(selectedClass>3){
        row.innerHTML += `
        <td>${student.subjects.science}</td>
        <td>${student.subjects.socialscience}</td>
        <td>${student.subjects.religion}</td>
        `
      }
      row.innerHTML +=
      `<td><button value ="${student._id}" onclick="showEditBox(this.value)">Edit</button> 
      <button  onclick="showDeleteBox(${student.yearNumber}, ${student.classNumber}, ${student.rollNumber})">Delete</button> </td>
  
      `;
          tableBody.appendChild(row);
        });
      } else {
        alert("error occured");
      }
    } catch (error) {}
  }
}
async function showEditBox(BookDistributionID){
    console.log(BookDistributionID);
      const EditBookDistribution =  BookDistributions.find(obj => obj._id === BookDistributionID); 
      console.log(EditBookDistribution);
   
}
// // editbox show.
// async function showEditBox(objectId) {
//   /*catch student that should be edited*/
//   console.log(objectId);
//   const editStudentObject = editStudentObjects.filter(function (item) {
//     return item._id === objectId;
//   });
//   console.log(editStudentObject);

//   document.querySelector('[name="classNumber"]').value =
//     editStudentObject[0].classNumber;
//   document.querySelector('[name="firstName"]').value =
//     editStudentObject[0].firstName;
//   document.querySelector('[name="secondName"]').value =
//     editStudentObject[0].secondName;
//   document.querySelector('[name="rollNumber"]').value =
//     editStudentObject[0].rollNumber;
//   document.querySelector('[name="yearNumber"]').value =
//     editStudentObject[0].yearNumber;
//   document.querySelector('[name="fatherName"]').value =
//     editStudentObject[0].fatherName;
//   document.querySelector('[name="motherName"]').value =
//     editStudentObject[0].motherName;
//   document.querySelector('[name="phoneNumber"]').value =
//     editStudentObject[0].phoneNumber;
//   document.querySelector('[name="address"]').value =
//     editStudentObject[0].address;
//   document.querySelector('[name="description"]').value =
//     editStudentObject[0].description;

//   var modal = document.getElementById("editStudentModal");
//   modal.style.display = "block";
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
//   };

//   console.log("edit box is clicked");
// }

//edit form submission
const form = document.querySelector("form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  //  console.log(formDataObject);
  const classNo = formDataObject["classNo"];

  try {
    const res = await fetch(`/student-entry/class/${classNo}`, {
      method: "PUT",
      body: JSON.stringify(formDataObject),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 201) {
      alert(await res.text());
      var modal = document.getElementById("editStudentModal");
      modal.style.display = "none";
      await showStudentInfo();
    } else {
      const errorMessage = await res.text();
      alert(errorMessage);
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }

  //console.log('edit cliekd');
});

// Function to submit the form programmatically
function submitForm() {
  const form = document.querySelector("form");
  const event = new Event("submit");
  form.dispatchEvent(event);
}

// show deletebox
function showDeleteBox(yearNumber, classNumber, rollNumber) {
  const studentDetails = {
    yearNumber: yearNumber,
    classNumber: classNumber,
    rollNumber: rollNumber,
  };

  const modal = document.getElementById("confirmationModalDelete");
  modal.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  confirmDeleteButton.onclick = async function () {
    try {
      const res = await fetch(`/student-entry/class/${classNumber}`, {
        method: "DELETE",
        body: JSON.stringify(studentDetails),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status == 201) {
        alert(await res.text());
        modal.style.display = "none";
        showDistributionInfo();
      } else {
        const errorMessage = await res.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const cancelDeleteButton = document.getElementById("cancelDeleteButton");
  cancelDeleteButton.onclick = function () {
    modal.style.display = "none";
  };
}
