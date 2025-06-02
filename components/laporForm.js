const laporForm = document.querySelector(".lapor-form");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const ageInput = document.getElementById("age-input");
const interestsInput = document.querySelectorAll("#interests-input");
const termsInput = document.getElementById("terms-input");
const privacyInput = document.getElementById("privacy-input");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const ageError = document.getElementById("age-error");
const interestsError = document.getElementById("interests-error");
const termsError = document.getElementById("terms-error");
const privacyError = document.getElementById("privacy-error");

laporForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  resetAllErrorMsg();

  if (!nameInput.value.trim()) {
    displayErrorMsg(nameError, "Please enter your name!");
    valid = false;
  }

  if (!emailInput.value.trim()) {
    displayErrorMsg(emailError, "Please enter your email!");
    valid = false;
  } else valid = validEmail(emailInput.value.trim());

  if (!passwordInput.value.trim()) {
    displayErrorMsg(passwordError, "Please enter your password!");
    valid = false;
  } else valid = validPassword(passwordInput.value.trim());

  let interestChecked = false;

  interestsInput.forEach((checkbox) => {
    if (checkbox.checked) interestChecked = true;
  });

  if (!interestChecked) {
    displayErrorMsg(interestsError, "Please select at least one interest");
    valid = false;
  }

  if (valid) {
    resetAllErrorMsg();
    alert("Form Successfuly Submitted!");
  }
});

const validEmail = (emailInput) => {
  const atIndex = emailInput.indexOf("@");
  if (atIndex <= 0) return false;

  const afterAt = emailInput.substring(atIndex + 1);
  const dotIndex = afterAt.indexOf(".");

  if (!(dotIndex > 0 && dotIndex < afterAt.length - 1)) {
    displayErrorMsg(emailError, "Invalid domain name");
    return false;
  }

  return true;
};

const hasUppercase = (passwordInput) => {
  return [...passwordInput].some((char) => char >= "A" && char <= "Z");
};

const hasNumber = (passwordInput) => {
  return [...passwordInput].some((char) => char >= "0" && char <= "9");
};

const displayErrorMsg = (element, str) => {
  element.textContent = str;
};

const resetAllErrorMsg = () => {
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  ageError.textContent = "";
  interestsError.textContent = "";
  termsError.textContent = "";
  privacyError.textContent = "";
};
