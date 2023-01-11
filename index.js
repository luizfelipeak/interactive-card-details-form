const form = document.getElementById("form-info");
const thanks = document.getElementById("thanks");

const nameholder = document.getElementById("name");
const nameEmpty = document.getElementById("name-blank");
const nameLetter = document.getElementById("name-letter");

const card = document.getElementById("card");
const cardEmpty = document.getElementById("card-blank");
const cardNumber = document.getElementById("card-number");

const expMonth = document.getElementById("exp-month");
const expYear = document.getElementById("exp-year");
const dateEmpty = document.getElementById("date-blank");
const dateIncorrect = document.getElementById("date-incorrect");
const dateNumber = document.getElementById("date-number");

const cvc = document.getElementById("cvc");
const cvcEmpty = document.getElementById("cvc-blank");
const cvcNumber = document.getElementById("cvc-number");

const submit = document.getElementById("submit-btn");
const thanksBtn = document.getElementById("thanks-btn");

const cardholderName = document.getElementById("cardholder-name");
const cardFrontNumber = document.getElementById("card-front-number");
const expMonthCardFront = document.getElementById("exp-month-card-front");
const expYearCardFront = document.getElementById("exp-year-card-front");
const cardBackCVC = document.getElementById("card-back-cvc");

let valid = [];
const delay = 350;

// Key event for credit card input
// ----- Nameholder -----
nameholder.addEventListener("keyup", () => {
  cardholderName.innerHTML = form["name"].value;
});

// ----- Card number -----
card.addEventListener("keyup", (key) => {
  maskCardNumber(key, form["card"].value);

  cardFrontNumber.innerHTML = form["card"].value;
});

card.addEventListener("keydown", (key) => {
  maskCardNumber(key, form["card"].value);
});

// ----- Exp. month -----
expMonth.addEventListener("keyup", () => {
  expMonthCardFront.innerHTML = form["exp-month"].value;
});

// ----- Exp. year -----
expYear.addEventListener("keyup", () => {
  expYearCardFront.innerHTML = form["exp-year"].value;
});

// ----- CVC -----
cvc.addEventListener("keyup", () => {
  cardBackCVC.innerHTML = form["cvc"].value;
});

// ----- Form submit -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  valid = [];
  const data = Object.fromEntries(new FormData(form));

  // Name validation
  nameholder.classList.remove("error");
  nameEmpty.style.display = "none";
  nameLetter.style.display = "none";

  if(data.name.length === 0) {
    nameholder.classList.add("error");
    nameEmpty.style.display = "initial";
    valid.push("false");
  }
  else if(validateLetter(data.name) === false) {
    nameholder.classList.add("error");
    nameLetter.style.display = "initial";
    valid.push("false");
  }

  // card number validation
  card.classList.remove("error");
  cardEmpty.style.display = "none";
  cardNumber.style.display = "none";

  if(data["card-number"].length === 0) {
    card.classList.add("error");
    cardEmpty.style.display = "initial";
    valid.push("false");
  }
  else if(data["card-number"].replaceAll(" ", "").length < 16) {
    card.classList.add("error");
    cardEmpty.style.display = "initial";
    valid.push("false");
  }
  else if(validateCardNumber(data["card-number"].replaceAll(" ", "")) === false) {
    card.classList.add("error");
    cardNumber.style.display = "initial";
    valid.push("false");
  }

  // exp month and year validation
  expMonth.classList.remove("error");
  expYear.classList.remove("error");
  dateEmpty.style.display = "none";
  dateIncorrect.style.display = "none";
  dateNumber.style.display = "none";

  if(data["exp-date-month"].length === 0) {
    expMonth.classList.add("error");
    dateEmpty.style.display = "initial";

    if(data["exp-date-year"].length === 0 || data["exp-date-year"] < 23 || validateNumber(data["exp-date-year"]) === false)
      expYear.classList.add("error");

    valid.push("false");
  }
  else if(data["exp-date-month"].length < 2) {
    expMonth.classList.add("error");
    dateEmpty.style.display = "initial";

    if(data["exp-date-year"].length === 0 || data["exp-date-year"] < 23 || validateNumber(data["exp-date-year"]) === false)
      expYear.classList.add("error");

    valid.push("false");
  }
  else if(data["exp-date-month"] > 12) {
    expMonth.classList.add("error");
    dateIncorrect.style.display = "initial";

    if(data["exp-date-year"].length === 0 || data["exp-date-year"] < 23 || validateNumber(data["exp-date-year"]) === false)
      expYear.classList.add("error");

    valid.push("false");
  }
  else if(validateNumber(data["exp-date-month"]) === false) {
    expMonth.classList.add("error");
    dateNumber.style.display = "initial";

    if(data["exp-date-year"].length === 0 || data["exp-date-year"] < 23 || validateNumber(data["exp-date-year"]) === false)
      expYear.classList.add("error");

    valid.push("false");
  }
  else {
    if(data["exp-date-year"].length === 0) {
      expYear.classList.add("error");
      dateEmpty.style.display = "initial";
      valid.push("false");
    }
    else if(data["exp-date-year"].length < 2) {
      expYear.classList.add("error");
      dateEmpty.style.display = "initial";
      valid.push("false");
    }
    else if(data["exp-date-year"] < 23) {
      expYear.classList.add("error");
      dateIncorrect.style.display = "initial";
      valid.push("false");
    }
    else if(validateNumber(data["exp-date-year"]) === false) {
      expYear.classList.add("error");
      dateNumber.style.display = "initial";
      valid.push("false");
    }
  }

  // cvc validation
  cvc.classList.remove("error");
  cvcEmpty.style.display = "none";
  cvcNumber.style.display = "none";

  if(data.cvc.length === 0) {
    cvc.classList.add("error");
    cvcEmpty.style.display = "initial";
    valid.push("false");
  }
  else if(data.cvc.length < 3) {
    cvc.classList.add("error");
    cvcEmpty.style.display = "initial";
    valid.push("false");
  }
  else if(validateNumber(data.cvc) === false) {
    cvc.classList.add("error");
    cvcNumber.style.display = "initial";
    valid.push("false");
  }

  if(valid.find(validateForm) === undefined) {
    form.classList.remove("showing");
    form.classList.add("hiding");

    setTimeout(() => {
      form.classList.remove("hiding");
      form.classList.add("hide");

      thanks.classList.remove("hide");
      thanks.classList.add("showing");

      setTimeout(() => {
        thanks.classList.remove("showing");
      }, delay);
    }, delay);
  }
});

thanksBtn.addEventListener("click", () => {
  thanks.classList.remove("showing");
  thanks.classList.add("hiding");

  setTimeout(() => {
    thanks.classList.remove("hiding");
    thanks.classList.add("hide");

    form.classList.remove("hide");
    form.classList.add("showing");
    
    setTimeout(() => {
      form.classList.remove("showing");
    }, delay);
  }, delay);
});

function maskCardNumber(key, number) {
  if(key.code != "Backspace") {
    if(number.length === 4 || number.length === 9 || number.length === 14) {
      form["card"].value = number.concat("", " ");
    }
  }
}

function validateCardNumber(data) {
  return /^[0-9]+$/.test(data);
}

function validateNumber(data) {
  return /^[0-9]+$/.test(data);
}

function validateLetter(data) {
  return /^[A-Za-z ]+$/.test(data);
}

function validateForm(item) {
  return item === "false";
}