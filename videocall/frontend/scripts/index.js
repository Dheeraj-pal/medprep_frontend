const roomIDInput = document.getElementById("roomIDInput");
const joinRoomBtn = document.getElementById("joinRoomBtn");

joinRoomBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const roomID = roomIDInput.value;

  localStorage.setItem("RoomID", roomID);

  window.location.href = "./videocall.html";
});
