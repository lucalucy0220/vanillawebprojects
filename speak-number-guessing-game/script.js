const msgElement = document.getElementById("msg")
const random = Math.floor(Math.random() * 100) + 1;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}


function writeMessage(msg) {
    msgElement.innerHTML = `
    <div>You said:</div>
    <span>${msg}</span>
    `
}


function checkNumber(num) {
    if (Number.isNaN(num)) {
        msgElement.innerHTML += `<div>This is not a valid number</div>`
        return;
    }
    if (num < random) {
        msgElement.innerHTML += `<div>Go higher</div>`
    }
    if (num > random) {
        msgElement.innerHTML += `<div>Go lower</div>`
    } else {
        document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>`
    }
}


recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});