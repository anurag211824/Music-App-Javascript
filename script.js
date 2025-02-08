const arrayOfSongs = [
  {
    name: "Admiring You",
    singer: "Karan Aujla",
    image: "images/admiringYou.jpg",
    duration: "3:34",
    audio: "audio/Admiring-You(PagalNew.Com.Se).mp3",
  },
  {
    name: "Ishq Hai",
    singer: "Anurag Saikia",
    image: "images/Mismatched.jpg",
    duration: "5:12",
    audio: "audio/Ishq Hai - (Raag.Fm).mp3",
  },
  {
    name: "Tu Hain to main Hoon",
    singer: "Arijit Singh",
    image: "images/TuHainTo.webp",
    duration: "4:07",
    audio: "audio/Tu Hain Toh Main Hoon - (Raag.Fm).mp3",
  },
  {
    name: "O Rangrez",
    singer: "Sherya Ghosal",
    image: "images/O-Rangrez.jpg",
    duration: "6:25",
    audio: "audio/O Rangrez (Bhaag Milkha Bhaag) - (Raag.Fm).mp3",
  },
  {
    name: "Dekha Tenu",
    singer: "Mohammad Faiz",
    image: "images/DekhaTenu.jpg",
    duration: "4:41",
    audio: "audio/Dekhha Tenu - Mr. And Mrs. Mahi 320 Kbps.mp3",
  },
  {
    name: "Bulleya",
    singer: "Papon",
    image: "images/Bulleya.jpg",
    duration: "5:57",
    audio: "audio/Bulleya - (Raag.Fm).mp3",
  },
  {
    name: "Haan Ke Haan",
    singer: "Monali Thakur",
    image: "images/Maharaj-Hindi.jpg",
    duration: "3:24",
    audio: "audio/Haan Ke Haan Maharaj 320 Kbps.mp3",
  },
  {
    name: "Aaj ki raat",
    singer: "	Madhubanti Bagchi",
    image: "images/aajKiraat.jpg",
    duration: "3:48",
    audio: "audio/Aaj-Ki-Raat-(Stree-2)(PagalNew.Com.Se).mp3",
  },
  {
    name:"Softly",
    singer:"Karan Aujla",
    image:"images/Softly.jpg",
    duration:"2:35",
    audio:"audio/Softly Making Memories 320 Kbps.mp3",
  },
];
const saveToLocalStorage = (arrayOfSongs) => {
  localStorage.setItem("songs", JSON.stringify(arrayOfSongs));
};

document.addEventListener("DOMContentLoaded", function () {
  saveToLocalStorage(arrayOfSongs);
  // Check if the songs are already saved in local storage
  const savedSongs = JSON.parse(localStorage.getItem("songs")) || arrayOfSongs;
  const songListContainer = document.querySelector(".song-list");
  const card = document.querySelector(".music-app-container");
  const header = document.querySelector(".header");

  savedSongs.forEach((song, index) => {
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
                      <img src="images/musicApp.png" width="45" alt="Music App" />
                      <span> Music App </span>
                  </div>
              </div>
              <img class="song-image" src="${song.image}" alt="${song.name}" style="width: 80%;" />
                <h2>${song.name}</h2>
                <h4>${song.singer}</h4>
               <div>
                <span class="timer">0:00</span> 
                <span>/</span>
                <span>${song.duration}</span>
      
               </div>
              <!-- Audio Player -->
                    <audio id="audioPlayer" src="${song.audio}"></audio>

                  
                        <!-- Progress Bar -->
                        <div class="progress-container">
                         
                            <input type="range" id="progressBar" value="0" max="100">
                           
                             <button class="playPauseButton">
                             <i class="fa-solid fa-play"></i>
                              </button>
                        </div>
                  

                   
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
      const progressBar = document.getElementById("progressBar");
      audioPlayer.addEventListener("timeupdate", function () {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
      });

      // Seek song when progress bar is changed
      progressBar.addEventListener("input", function () {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
      });
      const timer = document.querySelector(".timer");
      audioPlayer.addEventListener("timeupdate", function () {
        const currentTime = audioPlayer.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        if (seconds < 10) {
          timer.textContent = `${minutes}:0${seconds}`;
        } else {
          timer.textContent = `${minutes}:${seconds}`;
        }
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
