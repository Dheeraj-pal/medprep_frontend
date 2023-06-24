// Get user details from localStorage
patient = JSON.parse(localStorage.getItem("user-detail")) || null;
doctor = JSON.parse(localStorage.getItem("doc-detail")) || null;

// Function to generate the HTML for each appointment row
function generateAppointmentRow(appointment) {
  const date = appointment.dateAndTime.slice(0, 10);
  const time = appointment.dateAndTime.slice(11, 16);

  return `
    <tr>
      <td>Dr. ${appointment.doctorName}</td>
      <td>${appointment.patientName}</td>
      <td id="dAT">${date}</td>
      <td>${time}</td>
      <td>${appointment.roomId}</td>
      <td>
        <div class="button-container">
          <button class="cancel-button" onClick="cancelMeet('${appointment._id}')">Cancel</button>
          <button class="reschedule-button" onClick="reschedule('${appointment._id}')">Reschedule</button>
          <button class="join-button" id="Room" onClick="handleClick()">Join</button>
        </div>
      </td>
    </tr>
  `;
}

// Function to fetch appointments and populate the table
async function fetchAppointments() {
  if (patient || doctor) {
    const token = patient.token || doctor.token;
    const idParam = patient.user?._id || doctor.doctor?._id;

    try {
      const response = await fetch(
        `https://medprepbackend-production.up.railway.app/meeting/${idParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const datas = await response.json();

      if (datas.length <= 0) {
        alert("No Appointment Found");
      }
      const appointmentsBody = document.getElementById("appointments-body");

      datas.forEach((appointment) => {
        const rowHTML = generateAppointmentRow(appointment);
        appointmentsBody.innerHTML += rowHTML;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch appointments");
    }
  } else {
    alert("Please Login First");
  }
}

// Function to handle canceling a meeting
async function cancelMeet(id) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel the meeting?"
  );

  if (confirmed) {
    const token = patient.token || doctor.token;

    try {
      const response = await fetch(
        `https://medprepbackend-production.up.railway.app/meeting/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel the meeting");
      }

      const data = await response.json();

      if (data.message === "Meeting canceled successfully") {
        alert(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to cancel the meeting");
    }
  }
}

// Function to handle rescheduling a meeting
async function reschedule(id) {
  const myDiv = document.getElementById("tempDandT");
  const save = document.getElementById("save");
  const close = document.getElementById("close");

  if (myDiv.style.display === "none" || myDiv.style.display === "") {
    myDiv.style.display = "block";
  } else {
    myDiv.style.display = "none";
  }

  close.addEventListener("click", (e) => {
    e.stopPropagation();
    myDiv.style.display = "none";
  });

  save.addEventListener("click", async (e) => {
    e.stopPropagation();
    const updatedDate = document.getElementById("updatedDate").value;

    if (updatedDate) {
      const token = patient.token || doctor.token;

      try {
        const response = await fetch(
          `https://medprepbackend-production.up.railway.app/meeting/reschedule/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${token}`,
            },
            body: JSON.stringify({ dateAndTime: updatedDate }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to reschedule the meeting");
        }

        const data = await response.json();

        if (data.message === "Meeting rescheduled successfully") {
          alert(data.message);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
        alert("Failed to reschedule the meeting");
      }
    } else {
      alert("Choose Date and Time First");
    }
  });
}

// Function to handle the join button click
function handleClick() {
  window.location.href = "./videocall/frontend/index.html";
}

// Fetch appointments and populate the table
fetchAppointments();
