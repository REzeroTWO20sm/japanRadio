let elementsList = [];

const play_button = document.createElement("button");
play_button.id = "play_button";
elementsList.push(play_button);


const stop_button = document.createElement("button");
stop_button.id = "stop_button";
elementsList.push(stop_button);

const volume_slider = document.createElement("input");
volume_slider.id = "volume_slider";
volume_slider.type = "range";
volume_slider.value = 0;
volume_slider.max = 100;
elementsList.push(volume_slider);

const views_counter = document.createElement("div");
views_counter.id = "views_counter";
views_counter.textContent = 0;
elementsList.push(views_counter);

var audio = new Audio();
audio.preload = "none";
audio.volume = 0;

const wsUrl = 'wss://' + window.location.host + '/japan-radio/ws';
const socket = new WebSocket(wsUrl);

var views = 0;

function ping() {
  socket.send("ping");
}

socket.addEventListener('open', function(){
  ping();
});

socket.onmessage = (event) => {
  views = event.data;
  views_counter.textContent = views + "👁️";
};

play_button.addEventListener("click", () => {
  if (!audio.src){
    audio.src = "https://boxradio-edge-00.streamafrica.net/jpopchill";
    audio.load();
  }
  audio.play();
});

stop_button.addEventListener("click", () => {
  audio.pause();
});

volume_slider.addEventListener("input", (event) => {
  console.log(volume_slider.value / 100);
  audio.volume = volume_slider.value / 100;
});

for (let i = 0; i < elementsList.length; i++) {
  document.querySelector("#background").append(elementsList[i]);
}

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

if (isMobile){
  volume_slider.style.display = "none";
}
