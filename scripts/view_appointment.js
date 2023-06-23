let patient = JSON.parse(localStorage.getItem("user-detail")) || [];
let token = patient.token;

// Function to generate the HTML for each appointment row
function generateAppointmentRow(appointment) {
  let date = appointment.dateAndTime.slice(0, 10);
  let time = appointment.dateAndTime.slice(11, 16);
  return `
    <tr>
      <td>Dr. ${appointment.doctorName}</td>
      <td>${date}</td>
      <td>${time}</td>
      <td>${appointment.roomId}</td>
      <td>
        <div class="button-container">
          <button class="cancel-button">Cancel</button>
          <button class="reschedule-button">Reschedule</button>
          <button class="join-button" id="Room" onClick="handleClick()">Join</button>
        </div>
      </td>
    </tr>
  `;
}

fetch("https://medprepbackend-production.up.railway.app/meeting", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((datas) => {
    console.log(datas);

    const appointmentsBody = document.getElementById("appointments-body");

    datas.forEach((appointment) => {
      const rowHTML = generateAppointmentRow(appointment);
      appointmentsBody.innerHTML += rowHTML;
    });
  })
  .catch((err) => alert(err));

function handleClick() {
  window.location.href = "./videocall/frontend/index.html";
}

