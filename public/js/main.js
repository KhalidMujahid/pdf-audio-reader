const text = document.querySelector("#text");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");

const utl = new SpeechSynthesisUtterance(text.innerText);
const instance = new Mark(text);

play?.addEventListener("click", (e) => {
  e.preventDefault();
  instance.mark(utl.text);
  speechSynthesis.speak(utl);
});

pause?.addEventListener("click", (e) => {
  e.preventDefault();
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
});
