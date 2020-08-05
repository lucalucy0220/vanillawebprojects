const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const resultHeading = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");
const single_mealEl = document.getElementById("single-meal");

// search for a meal
function searchMeal(e) {
  e.preventDefault();

  const term = search.value;

  if (term.trim()) {
    // check if the input is empty

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for ${term}</h2>`;
        if (data.meals == null) {
          // no search results for thie input term
          resultHeading.innerHTML = `<h2>There is no results for ${term}`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join("");
        }
      });
    search.value = ""; // clear search value
  } else {
    alert("please enter");
  }
}

// get a meal by for ID
function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// get a meal by random
function getRandomMeal() {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      console.log(meal);
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

random.addEventListener("submit", getRandomMeal);
submit.addEventListener("click", searchMeal);

mealsEl.addEventListener("click", (e) => {
  console.log(e.path);
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info"); // return the div
    } else {
      return false;
    }
  });

  if (mealInfo) {
    console.log(mealInfo);
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
