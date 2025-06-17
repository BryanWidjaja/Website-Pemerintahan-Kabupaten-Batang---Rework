const laporForm = document.querySelector(".lapor-form");

const titleInput = document.getElementById("title-input");
const jenislaporInput = document.querySelectorAll(
  'input[name="jenislapor-input"]'
);
const problemInput = document.getElementById("problem-input");
const categoryInput = document.getElementById("category-input");

const titleError = document.getElementById("title-error");
const jenislaporError = document.getElementById("jenislapor-error");
const problemError = document.getElementById("problem-error");
const categoryError = document.getElementById("category-error");

const displayErrorMsg = (element, str) => {
  element.textContent = str;
};

const resetAllErrorMsg = () => {
  titleError.textContent = "";
  jenislaporError.textContent = "";
  problemError.textContent = "";
  categoryError.textContent = "";
};

laporForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  resetAllErrorMsg();

  let interestChecked = false;

  jenislaporInput.forEach((checkbox) => {
    if (checkbox.checked) interestChecked = true;
  });

  if (!interestChecked) {
    displayErrorMsg(jenislaporError, "Tolong pilih minimal 1");
    valid = false;
  }

  if (!titleInput.value.trim()) {
    displayErrorMsg(titleError, "Masukkan judul laporan anda!");
    valid = false;
  }

  if (!problemInput.value.trim()) {
    displayErrorMsg(problemError, "Masukkan isi laporan anda!");
    valid = false;
  }

  if (!categoryInput.value) {
    displayErrorMsg(categoryError, "Pilih kategori terlebih dahulu!");
    valid = false;
  }

  if (valid) {
    resetAllErrorMsg();
    alert("Laporan Anda Berhasil Disampaikan!");
  }
});
