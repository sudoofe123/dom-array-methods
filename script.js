const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

//fetch random user and add money

async function getRandomUser() {
  const response = await fetch("https://randomuser.me/api");

  const data = await response.json();
  console.log(data);

  const user = data.results[0];
  console.log(user);

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    age: Math.floor(Math.random() * (70 - 20) + 20),
  };
  console.log(newUser);
  addData(newUser);
}

getRandomUser();
getRandomUser();
getRandomUser();

// getdoublemoney
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

//add data object  to data array

function addData(obj) {
  data.push(obj);

  updateDom();
  // if nothing is gonna passed in we are going to use the data as argument
}

//update dom

function updateDom(providedData = data) {
  //clear main div
  main.innerHTML = "  <h2><strong>Person</strong>wealth &nbsp; Age</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");

    element.classList.add("person");
    element.innerHTML = `<strong> ${item.name}</strong> ${formatMoney(
      item.money
    )}   &nbsp; &nbsp;  &nbsp; ${item.age}`;

    main.appendChild(element);
  });
}

//format number as money

function formatMoney(number) {
  return (
    "$ " +
    number.toLocaleString().split(".")[0] +
    "." +
    number.toFixed(2).split(".")[1]
  );
}

//event listeners

addUserBtn.addEventListener("click", getRandomUser);

////////////////////////////////////////////////////////////////
// const array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map((item) => item * 2);

// console.log(map1);
// // expected output: Array [2, 8, 18, 32]

///////////////////////////////////////////////////////////////////

doubleBtn.addEventListener("click", doubleMoney);

////////////////////array sorting/////////////////////////////////////////////

// const arr = [4, 5, 3, 22, 56, 6];

// const sortedArray = arr.sort(function (a, b) {
//   return b - a;
// });
// console.log(sortedArray);//56,22,6,5,4,3

sortBtn.addEventListener("click", sortByRichest);

//sort user by richest

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

/////////////filter methods/////////////

// const arr = [2, 345, 655, 432, 2, 46, 55];
// const filter = arr.filter((items) => items > 100);

// console.log(filter);

showMillionairesBtn.addEventListener("click", showMillionaires);

//filter only millionaires

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

//////////////////////////////reduce methods

const arr = [1, 2, 3, 4, 6];

const total = arr.reduce((acc, num) => acc + num, 0); //16

// const total = arr.reduce((acc, num) => acc + num, 10);//26

console.log(total); //16

calculateWealthBtn.addEventListener("click", calculateWealth);

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3> `;
  main.appendChild(wealthElement);
}
