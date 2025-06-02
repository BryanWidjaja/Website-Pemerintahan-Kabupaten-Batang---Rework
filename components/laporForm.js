const laporForm = document.querySelector(".lapor-form");

const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const jenislaporInput = document.querySelectorAll(
  'input[name="jenislapor-input"]'
);
const problemInput = document.getElementById("problem-input");
const evidenceInput = document.getElementById("evidence-input");
const fileInputText = document.getElementById("file-input-text");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const jenislaporError = document.getElementById("jenislapor-error");
const problemError = document.getElementById("problem-error");
const evidenceError = document.getElementById("evidence-error");

evidenceInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    fileInputText.textContent = file.name;
    fileInputText.style.color = "var(--main-lightgray)";
  } else {
    fileInputText.textContent = "Masukkan bukti yang anda miliki";
    fileInputText.style.color = "var(--main-lightgray)";
  }
});

const displayErrorMsg = (element, str) => {
  element.textContent = str;
};

const resetAllErrorMsg = () => {
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  jenislaporError.textContent = "";
  problemError.textContent = "";
  evidenceError.textContent = "";
};

laporForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  resetAllErrorMsg();

  if (!nameInput.value.trim()) {
    displayErrorMsg(nameError, "Masukkan nama anda!");
    valid = false;
  }

  if (!emailInput.value.trim()) {
    displayErrorMsg(emailError, "Masukkan alamat e-mail anda!");
    valid = false;
  } else if (!validEmail(emailInput.value.trim())) {
    valid = false;
  }

  if (!phoneInput.value.trim()) {
    displayErrorMsg(phoneError, "Masukkan nomor telepon anda!");
    valid = false;
  } else if (!validPhoneNumber(phoneInput.value.trim())) {
    displayErrorMsg(phoneError, "Nomor telepon tidak valid!");
    valid = false;
  }

  let interestChecked = false;

  jenislaporInput.forEach((checkbox) => {
    if (checkbox.checked) interestChecked = true;
  });

  if (!interestChecked) {
    displayErrorMsg(jenislaporError, "Tolong pilih minimal 1");
    valid = false;
  }

  if (!problemInput.value.trim()) {
    displayErrorMsg(problemError, "Masukkan permasalahan anda!");
    valid = false;
  }

  if (!evidenceInput.files || evidenceInput.files.length === 0) {
    displayErrorMsg(evidenceError, "Masukkan bukti permasalahan anda!");
    valid = false;
  }

  if (valid) {
    resetAllErrorMsg();
    alert("Form Successfuly Submitted!");
  }
});

const validPhoneNumber = (phone) => {
  const phoneRegex = /^8\d{8,12}$/;
  return phoneRegex.test(phone);
};

const validEmail = (emailInput) => {
  const atIndex = emailInput.indexOf("@");
  if (atIndex <= 0) {
    displayErrorMsg(emailError, "Invalid email address");
    return false;
  }

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
