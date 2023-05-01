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

function isDayValid(userDay) {
  //check if the day is valid (1-31)
  if (isNaN(userDay) || userDay < 1 || userDay > 31) {
    dayError.removeAttribute("hidden");
    dayError.textContent = "must be a valid day";
    dayInput.value = "";
    //add error class to the day input and label
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

function isMonthValid(userMonth) {
  //check if the month is valid (1-12)
  if (isNaN(userMonth) || userMonth < 1 || userMonth > 12) {
    monthError.removeAttribute("hidden");
    monthError.textContent = "must be a valid month";
    monthInput.value = "";
    //add error class to the month input and label
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

function isYearValid(userYear) {
  //check if the year is valid (not in the future) & (not in the past)
  if (isNaN(userYear) || userYear < 1900) {
    yearError.removeAttribute("hidden");
    yearError.textContent = "must be a valid year";
    yearInput.value = "";
    //add error class to the year input and label
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

  showYears.textContent = `${diffYears} years`;
  showMonths.textContent = `${diffMonths} months`;
  showDays.textContent = `${diffDays} days`;
});
