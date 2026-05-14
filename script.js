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

var audio = new Audio("https://boxradio-edge-00.streamafrica.net/jpopchill");
audio.volume = 0;

const socket = new WebSocket('ws://localhost:8000/ws');

var views = 0;

function ping() {
  socket.send("increment");
  socket.send("ping");
}

if (socket.readyState === WebSocket.OPEN) {
  console.log("hello");
  ping()
}

socket.onmessage = (event) => {
  views = event.data;
  views_counter.textContent = views;
};

play_button.addEventListener("click", () => {
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
