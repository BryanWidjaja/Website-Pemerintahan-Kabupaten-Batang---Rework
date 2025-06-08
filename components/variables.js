const navBar = document.querySelector(".navbar-container");
let javaneseActive = localStorage.getItem("javaneseActive") === "true";

const basePath =
  window.location.hostname === "bryanwidjaja.github.io"
    ? "/Website-Pemerintahan-Kabupaten-Batang---Rework"
    : "";

let searchResult1 = 0;
let searchResult2 = 0;

// const formatId = (str) => {
//   return str.replace(/[ /.]/g, "-");
// };
