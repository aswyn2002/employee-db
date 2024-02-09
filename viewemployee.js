// VIEW EMPLOYEE

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("id is:", id);
viewEmployee(id);
async function viewEmployee(id) {
  const response = await fetch(`http://localhost:3000/employees/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log(data);
  const fullName = data.salutation + ". " + data.firstName + data.lastName
  document.getElementById("employeeName").innerHTML = fullName;
  document.getElementById("email").innerHTML = data.email;
  document.getElementById("gender").innerHTML = data.gender;
  const [year, month, day] = data.dob.split("-");
  const formattedDate = `${day}-${month}-${year}`
  const age = calculateAge(formattedDate);
  document.getElementById("age").innerHTML = age;
  document.getElementById("dateOfBirth").innerHTML = data.dob;
  document.getElementById("mobileNumber").innerHTML = data.phone;
  document.getElementById("qualification").innerHTML = data.qualifications;
  document.getElementById("address").innerHTML = data.address;
  document.getElementById("userName").innerHTML = data.username;
  document.getElementById("userProfilePicture").innerHTML = `<img src="http://localhost:3000/employees/${id}/avatar" alt="">`

  function calculateAge(formattedDate) {
    let date = new Date(formattedDate);
    let currentDate = new Date();
    console.log("date:", date);
    const timeDiff = currentDate - date;
    const age = Math.floor(timeDiff / (365.24 * 24 * 60 * 60 * 1000));
    return age;
  }
}


// delete employee popup

function deleteEmployeePopUp() {
  let deleteEmployee = document.getElementById("deleteEmployePopup");
  let overlay = document.getElementById("overlay");
  deleteEmployee.style.display = "block";
  overlay.style.display = "block";
  
}
// delete employee in view details


const popupDeletebuttonEd = document.getElementById("deleteEmployeeId");
popupDeletebuttonEd.addEventListener('click', () => {
  deleteEmployee(id);
})

function deleteEmployee(id) {
   fetch( `http://localhost:3000/employees/${id}`, {
       method: 'DELETE',
   }
   ).then(response => response.json())
       .then(data => {
         console.log('API Response:', data);
         window.location.href="index.html";
        //  employeeDeletedPopup();
           
          })
          .catch(error => {
            console.error('Error:', error);
          });
          
          fetchData();
        }
// close button


function closebutton() {
  
  let editEmployee = document.getElementById("editEmployee");
  let deleteEmployee = document.getElementById("deleteEmployePopup");
  let overlay = document.getElementById("overlay");

  editEmployee.style.display = "none";
  deleteEmployee.style.display = "none";
  overlay.style.display = "none";
}
//  edit empployee in view details

function editEmployeeViewDetails() {
  let editEmployee = document.getElementById("editEmployee");
  let overlay = document.getElementById("overlay");

  editEmployee.style.display = "block";
  overlay.style.display = "block";
  editData(id);
}

//edit view

async function editData(id) {
  await fetch(`http://localhost:3000/employees/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
     
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

      const editImageShow = document.getElementById("editEmployeeChangeImage");
      editImageShow.src = `http://localhost:3000/employees/${id}/avatar`;

    })
    .catch((err) => {
      console.log(err);
    });

  const editSubmissionBtn = document.getElementById("saveEditEmployee");
  editSubmissionBtn.addEventListener("click", () => {
    updateeData(id);
    window.location.reload(); 
   

  });
  
}
// edit submisssion

async function updateeData(id) {
  const salutation = document.getElementById("editSalutation").value;
  const firstName = document.getElementById("editFirstName").value;
  const lastName = document.getElementById("editLastName").value;
  const email = document.getElementById("editEmail").value;
  const addNumber = document.getElementById("editMobileNumber").value;
  const Dateofbirth = document.getElementById("editDateOfBirth").value;
  const gender = document.querySelector('input[name="genderEdit"]:checked').value;
  const Qualification = document.getElementById("editQualification").value;
  const addAddress = document.getElementById("editAddress").value;
  const country = document.getElementById("editCountry").value;
  const state = document.getElementById("editState").value;
  const city = document.getElementById("editCity").value;
  const pincode = document.getElementById("editPin").value;
  const dob = Dateofbirth;
  const [year, month, day] = dob.split("-");
  const formattedDate = `${day}-${month}-${year}`;



const updatedData = {
  salutation: salutation,
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: addNumber,
  dob: formattedDate,
  gender: gender,
  qualifications: Qualification,
  address: addAddress,
  country: country,
  state: state,
  city: city,
  pin: pincode,
  username: firstName,
  password: addNumber,
};
// put
fetch(`http://localhost:3000/employees/${id}`, {
 method: "PUT",
 headers: {
   "Content-Type": "application/json",
 },
 body: JSON.stringify(updatedData),
})
 .then((response) => response.json())
 .then((data) => {
   console.log("Success:", data);
 })
 .catch((error) => {
   console.error("Error:", error);
 });

 // edit pic upload
 const editImageUpload = document.getElementById("viewInputimage");
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

// edit upload image
let profilePic = document.getElementById("editEmployeeChangeImage");
let inputFile = document.getElementById("viewInputimage");
inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
  console.log("file path:", inputFile.files[0]);
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
