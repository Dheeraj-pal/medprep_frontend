function changeTab(tab) {
  var patientForm = document.getElementById("patient-form");
  var doctorForm = document.getElementById("doctor-form");
  var patientTab = document.getElementById("patient-tab");
  var doctorTab = document.getElementById("doctor-tab");

  if (tab === "patient") {
    patientForm.classList.add("active");
    doctorForm.classList.remove("active");
    patientTab.classList.add("active");
    doctorTab.classList.remove("active");
  } else if (tab === "doctor") {
    patientForm.classList.remove("active");
    doctorForm.classList.add("active");
    patientTab.classList.remove("active");
    doctorTab.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  changeTab("patient");
});

//patient Login
document.getElementById("patient-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("patientEmail").value;
  let password = document.getElementById("patientPassword").value;

  let payload = {
    email,
    password,
  };

  fetch("https://medprepbackend-production.up.railway.app/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("user-detail", JSON.stringify(data));
        if (data.message == "Login Successful") {
          alert("Login Successful")
          localStorage.removeItem("doc-detail");
          window.location.href = "./index.html";
        } else if (data.Error == "Wrong Credentials") {
          return alert("wrong credentials");
        }
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
});

//Doctor Login
document.getElementById("doctor-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("docEmail").value;
  let password = document.getElementById("docPassword").value;

  let payload = {
    email,
    password,
  };

  fetch("https://medprepbackend-production.up.railway.app/doctor/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        localStorage.setItem("doc-detail", JSON.stringify(data));
        if (data.message == "Login Successful") {
          alert("Login Successful")
          localStorage.removeItem("user-detail");
          window.location.href = "./index.html";
        } else if (data.message == "Doctor not found") {
          return alert("wrong credentials");
        }
      }
    })
    .catch((err) => {
      console.log(err);
      alert("wrong credentials");
    });
});
