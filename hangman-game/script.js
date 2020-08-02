const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part"); // an array (head,leg,arm,body)

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)]; // random select word from words

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// display the word/ letter
function displayWord() {
  // show correct letter
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
    <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
    </span>
        `
    )
    .join("")}`;

  const innerWord = wordEl.innerText.replace(/[\n]/g, ""); // get the current inner word
  // check if the current words === selected words -> meaning all complete
  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congradulations! You Won!😃`;
    popup.style.display = "flex";

    playable = false;
  }
}
// display the wrong letters
function updateWrongLettersEl() {
  // display the wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p> Wrong <p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  // display the figure parts (head,body,arm,leg)
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //check if losts
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost  😕";
    finalMessageRevealWord.innerText = `... the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// event listener when press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      // key code 沒分大小寫 a=A=65
      const letter = e.key.toLowerCase(); // key 顯示 a A (字母)
      if (selectedWord.includes(letter)) {
        // 如果是正確的letter
        if (!correctLetters.includes(letter)) {
          // 如果還沒有選過
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        // 如果不是正確的letter
        if (!wrongLetters.includes(letter)) {
          //如果還沒有選過
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  playable = true;

  //empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});
displayWord();
