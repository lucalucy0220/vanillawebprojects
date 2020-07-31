const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data_item = await res.json();

  const user = {
    name: `${data_item.results[0].name.first} + ${data_item.results[0].name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  data.push(user);
  updateDOM();
}
function doubldMoney() {
  // data.forEach((item) => {
  //   item.money = item.money * 2;
  //   return item;
  // });
  data.map((item) => {
    item.money = item.money * 2;
    return item;
  });
  updateDOM();
}
function showMillionarie() {
  data = data.filter((item) => {
    return item.money > 1000000;
  });
  updateDOM();
}
function sortRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
  });
  updateDOM();
}
function calculateWealth() {
  const total = data.reduce((acc, item) => (acc += item.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

function updateDOM(prescribedList = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  data.forEach((item) => {
    const personEl = document.createElement("div");
    personEl.classList.add("person");
    personEl.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(personEl);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubldMoney);
sortBtn.addEventListener("click", sortRichest);
showMillionairesBtn.addEventListener("click", showMillionarie);
calculateWealthBtn.addEventListener("click", calculateWealth);
