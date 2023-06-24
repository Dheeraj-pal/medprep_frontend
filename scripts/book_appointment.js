const selectSpecialization = document.getElementById("Specialization");
const selectDoctor = document.getElementById("doctor");
let patient = JSON.parse(localStorage.getItem("user-detail")) || null;

// Fetch all doctors from the server
fetch("https://medprepbackend-production.up.railway.app/doctor")
  .then((res) => res.json())
  .then((data) => {
    populateDoctorOptions(data);

    // Event listener for specialization selection
    selectSpecialization.addEventListener("change", () => {
      const selectedSpecialization = selectSpecialization.value;
      filterDoctorsBySpecialization(data, selectedSpecialization);
    });
  });

function populateDoctorOptions(doctors) {
  selectDoctor.innerHTML = ""; // Clear existing options

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select doctor";
  selectDoctor.appendChild(defaultOption);

  doctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    option.textContent = `Dr. ${doctor.name}`;
    selectDoctor.appendChild(option);
  });
}

function filterDoctorsBySpecialization(doctors, specialization) {
  selectDoctor.innerHTML = ""; // Clear existing options

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialized === specialization
  );

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select doctor";
  selectDoctor.appendChild(defaultOption);

  filteredDoctors.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.name;
    option.textContent = `Dr. ${doctor.name}`;
    selectDoctor.appendChild(option);
  });
}
let docId;
function getDocId(name) {
  fetch("https://medprepbackend-production.up.railway.app/doctor/getDoctorID", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      name: name,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        alert("No Doctor Found");
      } else {
        docId = data;
      }
    });
}

selectDoctor.addEventListener("change", (e) => {
  let doc = document.getElementById("doctor").value;
  getDocId(doc);
});

document.getElementById("form").addEventListener("click", (e) => {
  e.preventDefault();

  if (!patient.message == "Login Successful") {
    alert("Please Login First");
  } else {
    let token = patient.token;
    let patientName = document.getElementById("name").value;
    let patientEmail = document.getElementById("email").value;
    let contact = document.getElementById("phone").value;
    let specialization = document.getElementById("Specialization").value;
    let doctorName = document.getElementById("doctor").value;
    let dateAndTime = document.getElementById("date").value;
    let symptoms = document.getElementById("symptoms").value;
    let patientId = patient.user._id;
    if (
      !token ||
      !patientName ||
      !patientEmail ||
      !contact ||
      !specialization ||
      !doctorName ||
      !dateAndTime ||
      !symptoms ||
      !patientId
    ) {
      alert("Please fill all the details");
    } else {
      const roomId = generateRandomId();
      console.log(roomId);

      let payload = {
        patientName,
        doctorName,
        patientId,
        doctorId: docId.ID,
        patientEmail,
        dateAndTime,
        contact,
        specialization,
        symptoms,
        roomId,
      };

      console.log(JSON.stringify(payload));

      fetch(
        "https://medprepbackend-production.up.railway.app/meeting/schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            alert("Appointment Booked Successfully");
          }
        })
        .catch((err) => alert(err));
    }
  }
});

function generateRandomId() {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 5);
  const roomId = timestamp + randomString;
  return roomId;
}
