// Get the video element
const videoElem = document.getElementById("video");

// Get the start and stop buttons
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Add event listeners to the buttons
startElem.addEventListener("click", startScreenSharing);
stopElem.addEventListener("click", stopScreenSharing);

// Function to start screen sharing
function startScreenSharing() {
  // Get the screen sharing stream
  navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      // Set the video source to the screen sharing stream
      videoElem.srcObject = stream;
      videoElem.play();
    })
    .catch((error) => {
      console.error("Error starting screen sharing:", error);
    });
}

// Function to stop screen sharing
function stopScreenSharing() {
  // Stop the video
  videoElem.srcObject = null;
  videoElem.pause();
}

// Add play and pause functionality
const videoContainer = document.querySelector(".video-container");
const playPauseBtn = document.querySelector(".playPauseBtn");

function togglePlay() {
  if (videoContainer.paused || videoContainer.ended) {
    videoContainer.play();
  } else {
    videoContainer.pause();
  }
}

function updatePlayBtn() {
  playPauseBtn.innerHTML = videoContainer.paused ? "►" : "❚❚";
}

playPauseBtn.addEventListener("click", togglePlay);
videoContainer.addEventListener("click", togglePlay);

// Add progress bar functionality
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

function handleProgress() {
  const progressPercentage =
    (videoContainer.currentTime / videoContainer.duration) * 100;
  progressBar.style.flexBasis = `${progressPercentage}%`;
}

function jump(e) {
  const position = (e.offsetX / progress.offsetWidth) * videoContainer.duration;
  videoContainer.currentTime = position;
}

videoContainer.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", jump);
let mousedown = false;
progress.addEventListener("mousedown", () => {
  mousedown = true;
});
progress.addEventListener("mouseup", () => {
  mousedown = false;
});
progress.addEventListener("mousemove", (e) => {
  if (mousedown) {
    jump(e);
  }
});
