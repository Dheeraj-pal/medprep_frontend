const socket = io("https://melted-video-chat-server.onrender.com");
const videoContainer = document.getElementById("videoContainer");
const toggleAudio = document.getElementById("toggleAudio");
const toggleVideo = document.getElementById("toggleVideo");
const myPeer = new Peer();
let localStream;

const video = document.createElement("video");
video.muted = true;

const userConnections = {};

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localStream = stream;
    addStreamToContainer(video, stream);

    myPeer.on("call", (call) => {
      call.answer(stream);

      const remoteVideo = document.createElement("video");

      call.on("stream", (remoteStream) => {
        addStreamToContainer(remoteVideo, remoteStream);
      });
    });

    socket.on("user-join", (userID) => {
      connectNewUser(userID, stream);
    });
  })
  .catch((err) => {
    console.log(err);
  });

toggleVideo.addEventListener("click", () => {
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack.enabled) {
    videoTrack.enabled = false;
    toggleVideo.style.backgroundColor = "black";
  } else {
    videoTrack.enabled = true;
    toggleVideo.style.backgroundColor = "white";
  }
});

toggleAudio.addEventListener("click", () => {
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack.enabled) {
    audioTrack.enabled = false;
    toggleAudio.style.backgroundColor = "black";
  } else {
    audioTrack.enabled = true;
    toggleAudio.style.backgroundColor = "white";
  }
});

socket.on("user-disconnected", (userID) => {
  if (userConnections[userID]) {
    userConnections[userID].close();
  }
});

myPeer.on("open", (id) => {
  const roomID = localStorage.getItem("RoomID");
  socket.emit("join-room", roomID, id);
});

const connectNewUser = (userID, stream) => {
  const call = myPeer.call(userID, stream);
  const remoteVideo = document.createElement("video");

  call.on("stream", (remoteStream) => {
    addStreamToContainer(remoteVideo, remoteStream);
  });

  call.on("close", () => {
    remoteVideo.remove();
  });

  userConnections[userID] = call;
};

const addStreamToContainer = (videoElement, stream) => {
  videoElement.srcObject = stream;
  videoElement.addEventListener("loadedmetadata", () => {
    videoElement.play();
  });

  videoContainer.appendChild(videoElement);
};
