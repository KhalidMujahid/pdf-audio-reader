const text = document.querySelector("#text");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");

const utl = new SpeechSynthesisUtterance(text.innerText);

play?.addEventListener("click", (e) => {
  e.preventDefault();
  speechSynthesis.speak(utl);
});

pause?.addEventListener("click", (e) => {
  e.preventDefault();
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
});
