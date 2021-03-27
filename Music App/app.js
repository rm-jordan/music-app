// need to stop, start music and select songs also randomize

let fillbar = document.querySelector('.fill');
let audios = ['bensound-energy.mp3', 'bensound-epic.mp3','bensound-slowmotion.mp3'];
let covers = ['energy.jpg', 'epic.jpg', 'slowmotion.jpg']

let currentTime = document.querySelector('.time');


//audio object

let audio = new Audio();
let currentSong = 0;

// autoplay

window.onload = playSong;

//function

function playSong() {
  audio.src = audios[currentSong];
  audio.play();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    let playBtn = document.querySelector('.play-pause');
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";
  } else {
    audio.pause();
    playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    playBtn.style.paddingLeft = "33px";
  }
}

//bar

audio.addEventListener("timeupdate", function() {
  let position = audio.currentTime / audio.duration;
  fillbar.style.width = position * 100 + "%";


  //timeline duration
  convertTime(Math.round(audio.currentTime))

  //on to the next track upon track completion
  if(audio.ended){
    nextAudio();
  } 
});


function convertTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;


  totalTime(Math.round(audio.duration));
}

//for total time similar to above
function totalTime(seconds){
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;

  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += ' & ' + min + ':' + sec;
}

// Skip songs or go back


function nextAudio(){
  currentSong ++;
  if(currentSong > 2){
    currentSong = 0;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft = "30px";

    //covers match song

    $('.img img').attr('src', covers[currentSong]);
}

//going back is a similar function

function prevAudio(){
  currentSong --;
  if(currentSong < 0){
    currentSong = 2;
  }
  playSong();
  playBtn = document.querySelector(".play-pause");
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
    playBtn.style.paddingLeft = "30px";

    //covers match song

    $('.img img').attr('src', covers[currentSong]);
}

//turn it up or down if you wanna be like that

function decreaseVolume() {
  audio.volume -= 0.25;
}

function increaseVolume() {
  audio.volume += 0.25;
}

let volumeUp = document.querySelector(".volume-up");
volumeUp.addEventListener("click", function() {
  if (audio.volume === 1) {
    audio.volume = 0;
    document.querySelector(".volume-up i").className = "fa fa-volume-mute";
  } else {
    audio.volume = 1;
    document.querySelector(".volume-up i").className = "fa fa-volume-up";
  }
});
