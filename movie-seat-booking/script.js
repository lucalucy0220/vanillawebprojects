const container = document.querySelector("container"); // seats container
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); // seats that are not occupied
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
let ticketPrice = +movieSelect.vlaue;

// put movie's index and its price in localstorage
function setmovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// store in localstorage -> update the count of selected seats
function updateSelectedCount() {
  const selectSeats = document.querySelectorAll(".row .seat.selected"); // selected seats
  const seatIndex = [...selectSeats].map((seat) => [...seats].indexOf(seat)); // selected seats' index (according to seats)
  localStorage.setItem("selectedSeatIndex", JSON.stringify(seatIndex)); // put selectedseatIndex to local storage

  const seatLength = seatIndex.length;

  count.innerText = seatLength;
  total.innerText = seatLength * ticketPrice;
}

// extract from localstorage -> populate to UI
function populateUI() {
  const selectSeats = JSON.parse(localStorage.getItem("selectedSeatIndex")); // extract the list of index
  // update sear UI
  if (selectSeats != null && selectSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectSeats.indexOf(index) > -1) {
        seat.classList.add("selected"); // add selected class
      }
    });
  }
  // update movie selection UI
  const selectMovieIndex = localStorage.getItem("selectMovieIndex");
  if (selectMovieIndex != null) {
    movieSelect.selectedIndex = selectMovieIndex;
  }
}

// movie selection change event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value; // update ticket's price when change selection
  setmovieData(e.target.selectedIndex, ticketPrice); // set data to localstorage
  updateSelectedCount(); // select movie -> updated selected count
});

// seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    // if click on a seat and not occupied yet
    e.target.classList.toggle("selected"); // toggle to select or NOT select
  }
  updateSelectedCount(); // after select seat -> update count
});

updateSelectedCount(); // initial update select
