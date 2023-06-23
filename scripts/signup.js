function openForm(event, formName) {
  var i, formSection, tab;

  // Hide all form sections
  formSection = document.getElementsByClassName("form-section");
  for (i = 0; i < formSection.length; i++) {
    formSection[i].style.display = "none";
  }

  // Remove active class from all tabs
  tab = document.getElementsByClassName("tab");
  for (i = 0; i < tab.length; i++) {
    tab[i].className = tab[i].className.replace(" active", "");
  }

  // Show the selected form section and set the tab as active
  document.getElementById(formName).style.display = "block";
  event.currentTarget.className += " active";
}

// Show the default form section (patient registration)
document.getElementById("patientForm").style.display = "block";
document.getElementsByClassName("tab")[0].className += " active";

// fetching from backend (patient)
document.getElementById("patientform").addEventListener("submit", async (e) => {
  e.preventDefault();

  let patientName = document.getElementById("patientName").value;
  let patientEmail = document.getElementById("patientEmail").value;
  let patientPassword = document.getElementById("patientPassword").value;
  let patientGender = document.getElementById("patientGender").value;
  let patientAge = document.getElementById("patientAge").value;

  let patientPayload = {
    name: patientName,
    email: patientEmail,
    password: patientPassword,
    gender: patientGender,
    age: patientAge,
  };

  console.log(patientPayload);

  await fetch("https://medprepbackend-production.up.railway.app/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientPayload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        console.log("Patient Registered Successfully", data);
        alert("Patient Registered Successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// doctor registration
document.getElementById("doctorform").addEventListener("submit", async (e) => {
  e.preventDefault();

  let doctorName = document.getElementById("doctorName").value;
  let doctorEmail = document.getElementById("doctorEmail").value;
  let doctorPassword = document.getElementById("doctorPassword").value;
  let doctorGender = document.getElementById("doctorGender").value;
  let doctorAge = document.getElementById("doctorAge").value;
  let Experience = document.getElementById("doctorExperience").value;
  let Specialized = document.getElementById("doctorSpecialized").value;

  let docPayload = {
    name: doctorName,
    email: doctorEmail,
    password: doctorPassword,
    gender: doctorGender,
    age: doctorAge,
    experience: Experience,
    specialized: Specialized,
  };

  console.log(docPayload);

  await fetch("https://medprepbackend-production.up.railway.app/doctor/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docPayload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        console.log("Doctor Registered Successfully", data);
        alert("Doctor Registered Successfully");
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
