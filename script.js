// user input and label
const dayInput = document.getElementById("day-input");
const dayLabel = document.getElementById("day-label");
const monthInput = document.getElementById("month-input");
const monthLabel = document.getElementById("month-label");
const yearInput = document.getElementById("year-input");
const yearLabel = document.getElementById("year-label");

//date object
const submitButton = document.getElementById("submit-button");
const showYears = document.getElementById("years");
const showMonths = document.getElementById("months");
const showDays = document.getElementById("days");
const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

//to prevent defualt
const form = document.querySelector("form");

//check if the day is valid (1-31)
function isDayValid(userDay) {
  if (isNaN(userDay) || userDay < 1 || userDay > 31) {
    dayError.removeAttribute("hidden");
    dayError.textContent = "must be a valid day";
    dayInput.value = "";

    dayInput.classList.add("error");
    dayLabel.classList.add("error");
    return;
  } else {
    dayError.setAttribute("hidden", "");
    dayError.textContent = "";
    dayInput.classList.remove("error");
    dayLabel.classList.remove("error");
  }
}

//check if the month is valid (1-12)
function isMonthValid(userMonth) {
  if (isNaN(userMonth) || userMonth < 1 || userMonth > 12) {
    monthError.removeAttribute("hidden");
    monthError.textContent = "must be a valid month";
    monthInput.value = "";

    monthInput.classList.add("error");
    monthLabel.classList.add("error");
    return;
  } else {
    monthError.setAttribute("hidden", "");
    monthError.textContent = "";
    monthInput.classList.remove("error");
    monthLabel.classList.remove("error");
  }
}

//check if the year is valid (not in the future) & (not in the past)
function isYearValid(userYear) {
  if (isNaN(userYear) || userYear < 1900) {
    yearError.removeAttribute("hidden");
    yearError.textContent = "must be a valid year";
    yearInput.value = "";

    yearInput.classList.add("error");
    yearLabel.classList.add("error");
    return;
  } else if (isNaN(userYear) || userYear > new Date().getFullYear()) {
    yearError.removeAttribute("hidden");
    yearError.textContent = "must be in the past";
    yearInput.value = "";
    return;
  } else {
    yearError.setAttribute("hidden", "");
    yearError.textContent = "";
    yearInput.classList.remove("error");
    yearLabel.classList.remove("error");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let userYear = yearInput.value;
  let userMonth = monthInput.value;
  let userDay = dayInput.value;

  //check if the user input is valid
  isDayValid(userDay);
  isMonthValid(userMonth);
  isYearValid(userYear);

  // User-provided date
  const userDate = new Date(`${userYear}-${userMonth}-${userDay}`);

  // Current date
  const currentDate = new Date();

  // Difference in milliseconds
  const diffMs = currentDate - userDate;

  // Convert milliseconds to years, months, and days
  const diffYears = Math.floor(diffMs / 31536000000); // 1 year = 31536000000 milliseconds
  const diffMonths = Math.floor((diffMs % 31536000000) / 2592000000); // 1 month = 2592000000 milliseconds
  const diffDays = Math.floor(((diffMs % 31536000000) % 2592000000) / 86400000); // 1 day = 86400000 milliseconds

  //animate the days number
  function countToDayInput(userDayInput) {
    let count = 0;
    const increment = Math.ceil(userDayInput / 100); // divide the user input by 100 to increment by 1% of the value each time
    const interval = setInterval(() => {
      count += increment;
      if (count >= userDayInput) {
        // check if the count has reached the user input value
        clearInterval(interval);
        count = userDayInput;
      }
      showDays.textContent = `${count} days`;
    }, 10); // update the display every 10 milliseconds
  }

  //animate the days number
  function countToMonthInput(userMonthInput) {
    let count = 0;
    const increment = Math.ceil(userMonthInput / 100); // divide the user input by 100 to increment by 1% of the value each time
    const interval = setInterval(() => {
      count += increment;
      if (count >= userMonthInput) {
        // check if the count has reached the user input value
        clearInterval(interval);
        count = userMonthInput;
      }
      showMonths.textContent = `${count} months`;
    }, 10); // update the display every 10 milliseconds
  }

  //animate the days number
  function countToYearInput(userYearInput) {
    let count = 0;
    const increment = Math.ceil(userYearInput / 100); // divide the user input by 100 to increment by 1% of the value each time
    const interval = setInterval(() => {
      count += increment;
      if (count >= userYearInput) {
        // check if the count has reached the user input value
        clearInterval(interval);
        count = userYearInput;
      }
      showYears.textContent = `${count} years`;
    }, 10); // update the display every 10 milliseconds
  }

  countToDayInput(diffDays);
  countToMonthInput(diffMonths);
  countToYearInput(diffYears);
});
