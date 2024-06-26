


let selectedClass = 1;
const modalEdit = document.getElementById("editStudentModal");
const modalDelete  = document.getElementById("confirmationModalDelete");
const modalShowStudentInfo = document.getElementById("showStudentModal");
async function  renderSubjects() {
    const head = document.getElementById("studentTableHead");
    head.classList.add("gg");

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

        // Sort data based on rollNumber
        data.sort((a, b) => a.rollNumber - b.rollNumber);

        data.forEach((student) => {
          editStudentObjects.push(student);
          let row = document.createElement("tr");

          // Create checkboxes for subjects
          const subjects = student.subjects;
          let checkboxesHTML = "";
          let created = 0;
          Object.keys(subjects).forEach(subject => {
            created++;
            if (selectedClass > 3 || (selectedClass <= 3 && created < 4)) {
              checkboxesHTML += `
              <td>
                <input type="checkbox" id="${subject}-${student._id}" value="${subject}" ${subjects[subject] ? 'checked' : ''}  disabled class="checkbox">
              </td>`;
            }
          });

          // Append checkboxes to the row
          row.innerHTML = `
            <td><button onclick ="showStudentInfoBox(${student.yearNumber}, ${student.classNumber}, ${student.rollNumber})">${student.fullName}</button></td>
            <td>${student.yearNumber}</td>
            <td>${student.classNumber}</td>
            <td>${student.rollNumber}</td>
            ${checkboxesHTML}
            <td>
              <button value="${student._id}" onclick="showEditBox(this.value)" class = "btn btn-secondary">Edit</button> 
              <button onclick="showDeleteBox(${student.yearNumber}, ${student.classNumber}, ${student.rollNumber})" class = "btn btn-danger">Delete</button>
            </td>`;

          tableBody.appendChild(row);
        });
      } else {
        alert("Error occurred");
      }
    } catch (error) {
      console.error(error);
    }
  }
}




async function showEditBox(BookDistributionID){
    //console.log(BookDistributionID);
      const EditBookDistribution =  BookDistributions.find(obj => obj._id === BookDistributionID); 
      // console.log(EditBookDistribution);


  modalEdit.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modalEdit) {
      modalEdit.style.display = "none";
    }
  };
   

  
  document.querySelector('[name="classNumber"]').value =
    EditBookDistribution.classNumber;
    document.querySelector('[name="rollNumber"]').value =
    EditBookDistribution.rollNumber;
    document.querySelector('[name="yearNumber"]').value =
    EditBookDistribution.yearNumber;
    document.querySelector('[name="yearNumber"]').value =
    EditBookDistribution.yearNumber;
    document.querySelector('[id="showbox"]').innerHTML =
    EditBookDistribution.fullName;



    document.querySelector('[id="bangla"]').checked =
    EditBookDistribution.subjects.bangla;
  
    
    document.querySelector('[id="english"]').checked =
    EditBookDistribution.subjects.english;

    
    document.querySelector('[id="math"]').checked =
    EditBookDistribution.subjects.math;
    
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
 // console.log("edit box is clicked");


  
   
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

  // Explicitly include checkboxes with a value of false if they are not checked
  this.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    formDataObject[checkbox.name] = checkbox.checked;
  });

  // Convert checkbox values from "on" to true/false
  for (const [key, value] of formData.entries()) {
    if (value === "on") {
      formDataObject[key] = true;
    } else {
      formDataObject[key] = value;
    }
  }

  //console.log(formDataObject);
  //console.log(JSON.stringify(formDataObject));
  const classNumber = formDataObject["classNumber"];

  try {
    const res = await fetch(`/book-distribution-entry/class/${classNumber}`, {
      method: "PUT",
      body: JSON.stringify(formDataObject),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 201) {
      modalEdit.style.display = 'none';

      setTimeout(async () => {
        await showDistributionInfo();
      }, 500);
      
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

  
  modalDelete.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modalDelete) {
      modalDelete.style.display = "none";
    }
  };

  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  confirmDeleteButton.onclick = async function () {
    try {
      const res = await fetch(`/book-distribution-entry/class/${classNumber}`, {
        method: "DELETE",
        body: JSON.stringify(studentDetails),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status == 201) {
        alert(await res.text());
        modalDelete.style.display = "none";
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
    modalDelete.style.display = "none";
  };
}

async function showStudentInfoBox(yearNumber, classNumber, rollNumber){
  const studentDetails = {
    yearNumber: yearNumber,
    classNumber: classNumber,
    rollNumber: rollNumber,
  };

  console.log('gg');
  modalShowStudentInfo.style.display = "block";

  window.onclick = function (event) {
    if (event.target == modalShowStudentInfo) {
      modalShowStudentInfo.style.display = "none";
    }
  };

  

    try {
      const res = await fetch(`/getStudentData?classNo=${classNumber}&roll=${rollNumber}&year=${yearNumber}`);
      //console.log(res);
      const data = await res.json();
      console.log(data);

      
  document.querySelector('[name="classNumberShow"]').value =
  data.classNumber;
document.querySelector('[name="firstNameShow"]').value =
  data.firstName;
document.querySelector('[name="secondNameShow"]').value =
  data.secondName;
document.querySelector('[name="rollNumberShow"]').value =
  data.rollNumber;
document.querySelector('[name="yearNumberShow"]').value =
  data.yearNumber;
document.querySelector('[name="fatherNameShow"]').value =
  data.fatherName;
document.querySelector('[name="motherNameShow"]').value =
  data.motherName;
document.querySelector('[name="phoneNumberShow"]').value =
  data.phoneNumber;
document.querySelector('[name="addressShow"]').value =
  data.address;
document.querySelector('[name="descriptionShow"]').value =
 data.description;
    } catch (error) {
      console.log("Error occurred:", error);
    }
  

  // const cancelDeleteButton = document.getElementById("cancelDeleteButton");
  // cancelDeleteButton.onclick = function () {
  //   modalDelete.style.display = "none";
  // };
}
