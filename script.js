
// API fetching
const HOST = "http://localhost:3000"

async function fetchData() {
  const response = await fetch(`${HOST}/employees`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  const tableData = document.getElementById("tableData");
  let temp = "";
  const employee_number = document.getElementById('employeeNumber');
  employee_number.addEventListener("click", fetchData);
  const TotalCountOnPage = employee_number.value;
  // pageination
  const employeeTotal = document.getElementById("employeeTotal");
  employeeTotal.innerHTML = `of ${data.length}`;
  const totalPages = Math.ceil(data.length / TotalCountOnPage);
  pagination(totalPages);
  const start = TotalCountOnPage * (CurrentPage - 1);
  const end = Math.min(TotalCountOnPage * CurrentPage, data.length);

  for (i = start; i < end; i++) {
    employee = data[i];
    console.log(employee)
    temp += `<tr>
            <td>#0${i + 1}</td>
            <td class="userDetailsBoxImg">
                <div class="userBoxImg"><img src="${HOST}/employees/${employee.id}/avatar"></div>
                ${employee.salutation + ". " + employee.firstName + " " + employee.lastName}
            </td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.gender}</td>
            <td>${employee.dob}</td>
            <td>${employee.country}</td>
            <td><button type="button" class="optionsButton"onclick="dropDownTOggle('${employee.id}')">...</button></td>
            </tr>`


  }
  tableData.innerHTML = temp;
}
fetchData();


// add employee form popup

function addEmployeeToggle() {
  let addemploye = document.getElementById("addEmployeeForm");
  let overlay = document.getElementById("overlay");

  addemploye.style.display = "block";
  overlay.style.display = "block";
  setTimeout(() => {
    addemploye.style.opacity = '1';
  }, 50);

}
// employee Added succesfully popup

function employeeAddedSuccesfull() {
  let employeeAdded = document.getElementById("employeeAddedPopup");
  employeeAdded.style.display = "block";
  // setTimeout(() => {
  //   employeeAdded.style.display = "none";
  // }, 700);

}
// employee Added succesfully popup hide
function employeeAddedSuccesfullHide() {
  let employeeAdded = document.getElementById("employeeAddedPopup");
  employeeAdded.style.display = "none";
}


// employee Deleted succesfully popup

function employeeDeletedSuccesfull() {
  let employeeAdded = document.getElementById("employeeDeletedPopup");
  employeeAdded.style.display = "block";
  // setTimeout(() => {
  //   employeeAdded.style.display = "none";
  // }, 700);


}
// employee Deleted succesfully popup hide
function deletePopupHide () {
  let employeeAdded = document.getElementById("employeeDeletedPopup");
employeeAdded.style.display = "none";

}
// employee edited succesfully
// const employeeEditedSuccess = () => {
//   let employeeEdited = document.getElementById("employeeEditedSuccess");
//   employeeEdited.style.display = "block";
//   setTimeout(() => {
//     employeeEdited.style.display = "none";
//     overlay.style.display = "none";
//   }, 700);
// }


// hide dropdown when edit employee is displayed
 
function dropdownHideInEdit () {
  let editEmployee = document.getElementById ("editEmployee");
  let dropDown = document.getElementById("buttonDropDown");

 if (editEmployee.style.display == "block"){
  dropDown.style.display = "none";
 }
}

// hide dropdown when delete employee is displayed
 
function dropdownHideInDelete () {
  let deleteEmployee = document.getElementById ("deleteEmployePopup");
  let dropDown = document.getElementById("buttonDropDown");

 if (deleteEmployee.style.display == "block"){
  dropDown.style.display = "none";
 }
}


// close icon display none 

function closebutton() {
  let addemploye = document.getElementById("addEmployeeForm");
  let editEmployee = document.getElementById("editEmployee");
  let deleteEmployee = document.getElementById("deleteEmployePopup");
  let overlay = document.getElementById("overlay");

  addemploye.style.display = "none";
  editEmployee.style.display = "none";
  deleteEmployee.style.display = "none";
  overlay.style.display = "none";
}
// dropdown modal Edit, Delete, view details
function dropDownTOggle(id) {
  console.log(id);
  let optionsButton = document.getElementById("buttonDropDown");
  // optionsButton.style.display = "block";
  if (optionsButton.style.display === "none") {
    optionsButton.style.display = "block";
    // setTimeout(function () {
    //     optionsButton.style.display = "none";
    // }, 5000);
  } else {
    optionsButton.style.display = "none";
  }

  const deleteEmployeeBtn = document.getElementById("deleteEmployeeBtn");
  deleteEmployeeBtn.addEventListener("click", () => {
    dropdownHideInDelete ();
    deleteEmployeePopUp(id);
    fetchData();

  });
  const editButton = document.getElementById("editButton");
  editButton.addEventListener("click", async () => {
    dropdownHideInEdit();
    editEmployee(id);
    fetchData();
  });
  const viewButton = document.getElementById("viewButton");
  viewButton.addEventListener("click", async () => {
    window.location.href = `sample.html?id=${id}`
  });
  // Add event listener to hide the dropdown when clicking anywhere outside of it
  document.body.addEventListener("mousedown", (event) => {
    if (!optionsButton.contains(event.target)) {
      // Clicked outside the dropdown, hide it
      optionsButton.style.display = "none";

    }
  });
  
}

// edit employee form popup

function editEmployee(id) {
  let editEmployee = document.getElementById("editEmployee");
  let overlay = document.getElementById("overlay");
  editEmployee.style.display = "block";
  overlay.style.display = "block";
  console.log(id);

  fetch(`http://localhost:3000/employees/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("editEmployeeChangeImage").src = `http://localhost:3000/employees/${id}/avatar`;
      document.getElementById("editSalutation").value = data.salutation;
      document.getElementById("editFirstName").value = data.firstName;
      document.getElementById("editLastName").value = data.lastName;
      document.getElementById("editEmail").value = data.email;
      document.getElementById("editMobileNumber").value = data.phone;
      const dobValue = data.dob;
      const [day, month, year] = dobValue.split("-");
      const formattedDob = `${year}-${month}-${day}`;
      document.getElementById("editDateOfBirth").value = formattedDob;
      document.querySelector(
        `input[name = "genderEdit"][value = "${data.gender}"]`
      ).checked = true;
      document.getElementById("editQualification").value = data.qualifications;
      document.getElementById("editAddress").value = data.address;
      document.getElementById("editCountry").value = data.country;
      document.getElementById("editState").value = data.state;
      document.getElementById("editCity").value = data.city;
      document.getElementById("editPin").value = data.pincode;
    });
  // const saveEditEmployee = document.getElementById('saveEditEmployee');
  // saveEditEmployee.addEventListener("click", () => {
  //   editEmployeeForm(id);
  //   fetchData();
  //   closebutton();


  // });

}

// add employee form user picture upload

let profilePic = document.getElementById("employeeProfilePic");
let inputFile = document.getElementById("inputimage");
inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
  console.log("file path:", inputFile.files[0]);
}
// delete employee popup

function deleteEmployeePopUp(id) {
  let deleteEmployee = document.getElementById("deleteEmployePopup");
  let overlay = document.getElementById("overlay");
  deleteEmployee.style.display = "block";
  overlay.style.display = "block";
  const deleteEmployeeId = document.getElementById("deleteEmployeeId");
  deleteEmployeeId.addEventListener("click", (e) => {
    e.preventDefault();
    deleteEmp(id);

  })

}

// ADD EMPLOYEE
function addEmployeeForm() {
  const salutation = document.getElementById("salutation").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const dateOfBirth = document.getElementById("dateOfBirth").value;
  const gender = document.querySelector('input[name = "Gender"]:checked').value;
  const qualification = document.getElementById("qualification").value;
  const address = document.getElementById("address").value;
  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;
  const city = document.getElementById("city").value;
  const pin = document.getElementById("pin").value;

  const dob = dateOfBirth;
  const [year, month, day] = dob.split("-");
  const formattedDate = `${day}-${month}-${year}`

  const employeeDetails = {

    salutation: salutation,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: mobileNumber,
    dob: formattedDate,
    gender: gender,
    qualifications: qualification,
    address: address,
    city: city,
    state: state,
    country: country,
    username: firstName,
    password: mobileNumber,
    pincode: pin,
  };
  fetch("http://localhost:3000/employees", {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(employeeDetails),
  })
    .then((response) =>
      response.json()
    )
    .then(data => {
      console.log('success:', data);

      // imageupload
      console.log('API Response:', data);
      const uploadImage = document.getElementById("inputimage");
      // fetchData();
      const formData = new FormData();
      formData.append("avatar", uploadImage.files[0]);
      console.log("data id:", data.id);
      console.log("length id:", uploadImage.files.length);
      fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
        method: "POST",
        body: formData
      })
        .then((res) => {
          console.log("Image uploading success:", res);
        })
        .catch((err) => {
          console.log("Error Uploading Image", err);
        })
    })
    .catch(error => {
      console.error('Error:', error);
    });
  addEmployeeToggle()
  employeeAddedSuccesfull();
  fetchData();
  // setTimeout(() => {
  //     location.reload();
  // }, 700);  
    l


}

// DELETE EMPLOYEE
function deleteEmp(id) {
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  })
    .then(response => {
      // Check if the request was successful (status code 200-299)
      if (response.ok) {
        closebutton();
        fetchData();
        dropDownTOggleClose();
        employeeDeletedSuccesfull();
      } else {
        // Handle the error
        console.error('Failed to delete employee');
      }
    })
    .catch(error => {
      // Handle network errors
      console.error('Network error:', error);
    });
  fetchData();
  employeeDeletedSuccesfull();
}


// function deleteEmp(id) {
//     fetch(`http://localhost:3000/employees/${id}`, {
//         method: "DELETE",
//     }

//     )
//     closebutton();
//     fetchData();
//     dropDownTOggleClose();
//     employeeDeletedSuccesfull();
//     // setTimeout(() => {
//     //     location.reload();
//     // }, 700);


// }

//edit employee

function editEmployeeForm(id) {

  const editSalutation = document.getElementById("editSalutation").value;
  const editFirstName = document.getElementById("editFirstName").value;
  const editLastName = document.getElementById("editLastName").value;
  const editEmail = document.getElementById("editEmail").value;
  const editMobileNumber = document.getElementById("editMobileNumber").value;
  const editDateOfBirth = document.getElementById("editDateOfBirth").value;
  const editGender = document.querySelector('input[name = "genderEdit"]:checked').value;
  const editQualification = document.getElementById("editQualification").value;
  const editAddress = document.getElementById("editAddress").value;
  const editCountry = document.getElementById("editCountry").value;
  const editState = document.getElementById("editState").value;
  const editCity = document.getElementById("editCity").value;
  const editPin = document.getElementById("editPin").value;

  const editDob = editDateOfBirth;
  const [year, month, day] = editDob.split("-");
  const editFormattedDate = `${day}-${month}-${year}`

  const editEmployeeDetails = {
    salutation: editSalutation,
    firstName: editFirstName,
    lastName: editLastName,
    email: editEmail,
    phone: editMobileNumber,
    dob: editFormattedDate,
    gender: editGender,
    qualifications: editQualification,
    address: editAddress,
    city: editCity,
    state: editState,
    country: editCountry,
    username: editFirstName,
    password: mobileNumber,
    pincode: editPin,
  };
  fetch(`http://localhost:3000/employees/${id}`, {
    method: "PUT",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(editEmployeeDetails),
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    // edit pic upload
 const editImageUpload = document.getElementById("editImageInput");
 if (editImageUpload.files.length >0) {
   const formData = new FormData();
   formData.append("avatar", editImageUpload.files[0]);

     // upload
     fetch(`http://localhost:3000/employees/${id}/avatar`, {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


}
// edit employee form user picture upload

let editProfilePicture = document.getElementById("editEmployeeChangeImage");
let editInputFile = document.getElementById("editImageInput");
editInputFile.onchange = function () {
  editProfilePicture.src = URL.createObjectURL(inputFile.files[0]);
  console.log("file path:", inputFile.files[0]);
}
// search employeee

function searchInput() {
  let searchValue = document.getElementById("searchInput").value;
  searchValue = searchValue.toLowerCase();
  let rows = document.getElementsByTagName("tr");
  let employeeNotFound = document.getElementById("employeeNotFound");
  let found = false;

  for (let i = 1; i < rows.length; i++) {
    if (!rows[i].innerHTML.toLowerCase().includes(searchValue)) {
      rows[i].style.display = "none";
    } else {
      rows[i].style.display = "";
      found = true;
    }
  }

  if (found) {
    employeeNotFound.style.display = "none";

  } else {
    employeeNotFound.style.display = "block";
  }
}
// clearform
function clearForm() {
  var form = document.getElementById("addEmployeeForm");
  form.reset();

}
// add employee validation

function formValidation() {
  const salutation = document.getElementById("salutation").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("mobileNumber").value.trim();
  const qualifications = document.getElementById("qualification").value.trim();
  const address = document.getElementById("address").value.trim();
  const country = document.getElementById("country").value.trim();
  const state = document.getElementById("state").value.trim();
  const city = document.getElementById("city").value.trim();
  const pin = document.getElementById("pin").value.trim();
  //dob
  const dob = document.getElementById("dateOfBirth");
  const nullDob = document.getElementById("dateOfBirthNull");
  const dobValue = dob.value.trim();
  //gender
  const gender = document.querySelector('input[name="Gender"]:checked');
  const nullGender = document.getElementById("nullGender");
  // regex validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z]+$/;
  let isValid = true;
  // image_validation-----------------
  const uploadImage = document.getElementById("inputimage");
  const nullImage = document.getElementById("inputimageNull");
  // image validation condition
  if (uploadImage.files.length === 0) {
    nullImage.textContent = "* Please select an image.";
    isValid = false;
  } else {
    nullImage.textContent = "";
  }
  //conditions
  if (salutation === "select") {
    document.getElementById("salutationNull").textContent = "* Invalid select";
    isValid = false;
  }
  if (!namePattern.test(firstName)) {
    document.getElementById("firstNameNull").textContent = "* First Name is required";
    isValid = false;
  }
  if (!namePattern.test(lastName)) {
    document.getElementById("lastNameNull").textContent = "* Last Name is required";
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById("emailNull").textContent = "* Invalid Email";
    isValid = false;
  }
  if (!phonePattern.test(phone)) {
    document.getElementById("mobileNumberNull").textContent = "* Invalid Phone Number";
    isValid = false;
  }
  if (dobValue === "") {
    nullDob.textContent = "* Date of Birth is required";
    isValid = false;
  }
  if (gender) {
    nullGender.textContent = "";
  } else {
    nullGender.textContent = "* Please select a gender";
    isValid = false;
  }
  if (qualifications === "") {
    document.getElementById("qualificationNull").textContent =
      "* Qualifications is required";
    isValid = false;
  }
  if (address === "") {
    document.getElementById("addressNull").textContent = "* Address is required";
    isValid = false;
  }
  if (country === "select country") {
    document.getElementById("countryNull").textContent = "* country is required";
    isValid = false;
  }
  if (state === "select state") {
    document.getElementById("stateNull").textContent = "* state is required";
    isValid = false;
  }
  if (city === "") {
    document.getElementById("cityNull").textContent = "* city is required";
    isValid = false;
  }
  if (pin === "") {
    document.getElementById("pinNull").textContent = "* pin is required";
    isValid = false;
  }
  // validation false text
  document.getElementById("addEmployeeForm").addEventListener("input", (event) => {
    DataName = event.target.id;
    const errorId = `${DataName}Null`;
    console.log(errorId);
    document.getElementById(errorId).textContent = "";
  });
  return isValid;
}
// gender validation
const maleRadioButton = document.getElementById("addMale");
const femaleRadioButton = document.getElementById("addFemale");
const nullGender = document.getElementById("nullGender");
maleRadioButton.addEventListener("click", () => {
  nullGender.textContent = "";
});
femaleRadioButton.addEventListener("click", () => {
  nullGender.textContent = "";
});

// add employee validation

const addButton = document.getElementById("addEmployeeSubmitBtn");
addButton.addEventListener("click", (e) => {
  e.preventDefault();
  const isValid = formValidation();
  if (!isValid) {
    return;
  }
  addEmployeeForm();
  closebutton();
  clearForm();
});

// pagination
var CurrentPage = 1;
function pagination(totalPages) {
  var pgnum = document.getElementById("Page_Num_Btns");
  let temp = '';
  for (let i = 1; i <= totalPages; i++) {
    temp += `<button id="page${i}">${i}</button>`;
  }
  pgnum.innerHTML = temp;
  pgnum.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      const pageNumber = parseInt(e.target.textContent);
      if (!isNaN(pageNumber)) {
        CurrentPage = pageNumber;
        fetchData();
      }
    }
  });
  var pageLeftButton = document.getElementById("pageleft");
  var pageRightButton = document.getElementById("pageright");
  if (CurrentPage === 1) {
    pageLeftButton.classList.add('hidden');
  } else {
    pageLeftButton.classList.remove('hidden');
  }
  if (CurrentPage === totalPages) {
    pageRightButton.classList.add('hidden');
  } else {
    pageRightButton.classList.remove('hidden');
  }
  pageLeftButton.addEventListener("click", function () {
    if (CurrentPage > 1) {
      CurrentPage--;
      fetchData();
    }
  });
  pageRightButton.addEventListener("click", function () {
    if (CurrentPage < totalPages) {
      CurrentPage++;
      fetchData();
    }
  });
  const actionButton = document.getElementById(`page${CurrentPage}`);
  actionButton.classList.add('active');
}


// Edit employee validation 
function EditFormValidation() {
  const salutation = document.getElementById("editSalutation").value.trim();
  const firstName = document.getElementById("editFirstName").value.trim();
  const lastName = document.getElementById("editLastName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const phone = document.getElementById("editMobileNumber").value.trim();
  const qualifications = document.getElementById("editQualification").value.trim();
  const address = document.getElementById("editAddress").value.trim();
  const country = document.getElementById("editCountry").value.trim();
  const state = document.getElementById("editState").value.trim();
  const city = document.getElementById("editCity").value.trim();
  const pin = document.getElementById("editPin").value.trim();
  //dob
  const dob = document.getElementById("editDateOfBirth");
  const nullDob = document.getElementById("editDateOfBirthNull");
  const dobValue = dob.value.trim();
  //gender
  const gender = document.querySelector('input[name="genderEdit"]:checked');
  const nullGender = document.getElementById("editGenderNull");
  // regex validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z]+$/;
  let isValid = true;
  // image_validation-----------------
  // const uploadImage = document.getElementById("inputimage");
  // const nullImage = document.getElementById("inputimageNull");
  // image validation condition
  // if (uploadImage.files.length === 0) {
  //   nullImage.textContent = "* Please select an image.";
  //   isValid = false;
  // } else {
  //   nullImage.textContent = "";
  // }
  //conditions
  if (salutation === "select") {
    document.getElementById("editSalutationNull").textContent = "* Invalid select";
    isValid = false;
  }
  if (!namePattern.test(firstName)) {
    document.getElementById("editFirstNameNull").textContent = "* First Name is required";
    isValid = false;
  }
  if (!namePattern.test(lastName)) {
    document.getElementById("editLastNameNull").textContent = "* Last Name is required";
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    document.getElementById("editEmailNull").textContent = "* Invalid Email";
    isValid = false;
  }
  if (!phonePattern.test(phone)) {
    document.getElementById("editMobileNumberNull").textContent = "* Invalid Phone Number";
    isValid = false;
  }
  if (dobValue === "") {
    nullDob.textContent = "* Date of Birth is required";
    isValid = false;
  }
  if (gender) {
    nullGender.textContent = "";

  } else {
    nullGender.textContent = "* Please select a gender";
    console.log("gender is :", gender);
    isValid = false;
  }
  if (qualifications === "") {
    document.getElementById("editQualificationNull").textContent =
      "* Qualifications is required";
    isValid = false;
  }
  if (address === "") {
    document.getElementById("editAddressNull").textContent = "* Address is required";
    isValid = false;
  }
  if (country === "select country") {
    document.getElementById("editCountryNull").textContent = "* country is required";
    isValid = false;
  }
  if (state === "select state") {
    document.getElementById("editStateNull").textContent = "* state is required";
    isValid = false;
  }
  if (city === "") {
    document.getElementById("editCityNull").textContent = "* city is required";
    isValid = false;
  }
  if (pin === "") {
    document.getElementById("editPinNull").textContent = "* pin is required";
    isValid = false;
  }
  // validation false text
  document.getElementById("editEmployee").addEventListener("input", (event) => {
    DataName = event.target.id;
    const errorId = `${DataName}Null`;
    console.log(errorId);
    document.getElementById(errorId).textContent = "";
  });
  return isValid;
}
// gender validation
  // const maleRadioButton = document.getElementById("addMale");
  // const femaleRadioButton = document.getElementById("addFemale");
  // const nullGender = document.getElementById("nullGender");
  // maleRadioButton.addEventListener("click", () => {
  //   nullGender.textContent = "";
  // });
  // femaleRadioButton.addEventListener("click", () => {
  //   nullGender.textContent = "";
  // });

// edit employee validation

const editAddButton = document.getElementById("saveEditEmployee");
addButton.addEventListener("click", (e) =>{
  e.preventDefault();
  const isValid = EditFormValidation();
  if(!isValid) {
    return;
  }
  editEmployeeForm(id);
  // addEmployeeForm();
  closebutton();
  clearForm();
});
