const arrayOfSongs = [
  {
    name: "Ishq Hai",
    singer: "Anurag Saikia",
    image: "/images/Mismatched.jpg",
    duration: "5:12",
    audio: "/audio/Ishq Hai - (Raag.Fm).mp3",
  },
  {
    name: "Tu Hain to main Hoon",
    singer: "Arijit Singh",
    image: "/images/TuHainTo.webp",
    duration: "4:07",
    audio: "/audio/Tu Hain Toh Main Hoon - (Raag.Fm).mp3",
  },
  {
    name: "O Rangrez",
    singer: "Sherya Ghosal",
    image: "/images/O-Rangrez.jpg",
    duration: "6:25",
    audio: "/audio/O Rangrez (Bhaag Milkha Bhaag) - (Raag.Fm).mp3",
  },
  {
    name: "Dekha Tenu",
    singer: "Mohammad Faiz",
    image: "/images/DekhaTenu.jpg",
    duration: "4:41",
    audio: "/audio/Dekhha Tenu - Mr. And Mrs. Mahi 320 Kbps.mp3",
  },
  {
    name: "Bulleya",
    singer: "Papon",
    image: "/images/Bulleya.jpg",
    duration: "5:57",
    audio: "/audio/Bulleya - (Raag.Fm).mp3",
  },
  {
    name: "Haan Ke Haan",
    singer: "Monali Thakur",
    image: "/images/Maharaj-Hindi.jpg",
    duration: "3:24",
    audio: "/audio/Haan Ke Haan Maharaj 320 Kbps.mp3",
  },
];

// document.addEventListener("DOMContentLoaded", function () {
//     const songListContainer = document.querySelector(".song-list");

//     arrayOfSongs.forEach((song) => {
//       // Create the song container div
//       const songDiv = document.createElement("div");
//       songDiv.classList.add("song");

//       // Create the image element
//       const img = document.createElement("img");
//       img.src = song.image;
//       img.width = 45;
//       img.alt = song.name;
//       songDiv.appendChild(img);

//       // Create the song details div
//       const songDetails = document.createElement("div");
//       songDetails.classList.add("song-details");

//       // Create the song name span
//       const songName = document.createElement("span");
//       songName.textContent = song.name;
//       songDetails.appendChild(songName);

//       // Create the singer span
//       const singer = document.createElement("span");
//       singer.textContent = song.singer;
//       songDetails.appendChild(singer);

//       // Append the song details to the song container
//       songDiv.appendChild(songDetails);

//       // Create the duration paragraph
//       const duration = document.createElement("p");
//       duration.textContent = song.duration;
//       songDiv.appendChild(duration);

//       // Create the play button
//       const playButton = document.createElement("button");
//       const playIcon = document.createElement("i");
//       playIcon.classList.add("fa-solid", "fa-play");
//       playButton.appendChild(playIcon);
//       songDiv.appendChild(playButton);

//       // Append the song container to the song list
//       songListContainer.appendChild(songDiv);
//     });
//   });

document.addEventListener("DOMContentLoaded", function () {
  const songListContainer = document.querySelector(".song-list");
  const card = document.querySelector(".music-app-container");
  const header = document.querySelector(".header");

  arrayOfSongs.forEach((song, index) => {
    const songHTML = `
          <div class="song">
            <img src="${song.image}" width="45" alt="${song.name}" />
            <div class="song-details">
              <span>${song.name}</span>
              <span>${song.singer}</span>
            </div>
            <p>${song.duration}</p>
            <button class="play-button" data-index="${index}">
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
        `;

    songListContainer.innerHTML += songHTML;
  });

  // Add event listeners after the songs are added to the DOM
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const index = btn.getAttribute("data-index");
      const song = arrayOfSongs[index];
      card.innerHTML = ""; // Clear the main container

      const fullSongHtml = `
          <div class="full-song">
              <div class="full-song-header">
                  <i class="fa-solid fa-arrow-left back-button"></i>
                  <div class="logo">
                      <img src="/images/musicApp.png" width="45" alt="Music App" />
                      <span> Music App </span>
                  </div>
              </div>
              <img class="song-image" src="${song.image}" alt="${song.name}" style="width: 80%;" />
                <h2>${song.name}</h2>
                <h4>${song.singer}</h4>
                <p>${song.duration}</p>
      
              <!-- Audio Player -->
                    <audio id="audioPlayer" src="${song.audio}"></audio>

                    <!-- Player Controls -->
                    <div class="player-controls">
                        <button class="control-button backward-button">
                            <i class="fa-solid fa-backward"></i>
                        </button>

                        <!-- Progress Bar -->
                        <div class="progress-container">
                            <input type="range" id="progressBar" value="0" max="100">
                        </div>

                        <button class="control-button forward-button">
                            <i class="fa-solid fa-forward"></i>
                        </button>
                    </div>

                    <button class="playPauseButton">
                        <i class="fa-solid fa-play"></i>
                    </button>
          </div>`;
      card.innerHTML = fullSongHtml;
      // Play song when play button is clicked
      const playPauseButton = document.querySelector(".playPauseButton");
      playPauseButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
          audioPlayer.play();
          playPauseButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        } else {
          audioPlayer.pause();
          playPauseButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
        }
      });

      // Update progress bar as the song plays
      audioPlayer.addEventListener("timeupdate", function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
      });

      // Seek song when progress bar is changed
      progressBar.addEventListener("input", function () {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
      });

      // Handle Back Button Click
      const backBtn = document.querySelector(".back-button");
      backBtn.addEventListener("click", function () {
        card.innerHTML = "";
        card.appendChild(header);
        card.appendChild(songListContainer);
      });
    });
  });
});
