const accessibilityBtn = document.getElementById("accessability-btn");
const accessibilityMenu = document.querySelector(".accessibility-menu");
const closeBtn = document.getElementById("acc-close-btn");

const darkmodeBtn = document.getElementById("darkmode-btn");
const smalltextBtn = document.getElementById("smalltext-btn");
const bigtextBtn = document.getElementById("bigtext-btn");
const saturationBtn = document.getElementById("saturation-btn");
const disleksiaBtn = document.getElementById("disleksia-btn");
const sundaBtn = document.getElementById("sunda-btn");

const listenMenuBtn = (btn) => {
  btn.addEventListener("click", () => {
    const isMenuVisible = accessibilityMenu.classList.toggle("visible");

    isMenuVisible
      ? accessibilityBtn.classList.add("display-none")
      : accessibilityBtn.classList.remove("display-none");
  });
};

const listenBtnToFunction = (btn, func) => {
  btn.addEventListener("click", () => {
    func();
  });
};

const increaseTextSize = () => {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  document.querySelectorAll("body, body *").forEach((element) => {
    const computedSize = getComputedStyle(element).fontSize;
    const pxValue = parseFloat(computedSize);

    if (!isNaN(pxValue)) {
      const currentRem = pxValue / rootFontSize;
      const newRem = currentRem * 1.1;
      element.style.fontSize = newRem + "rem";
    }
  });
};

let currThemeSetting = localStorage.getItem("theme") || "dark";
document.querySelector("html").setAttribute("data-theme", currThemeSetting);

const changeTheme = () => {
  const newTheme = currThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currThemeSetting = newTheme;
};

listenMenuBtn(accessibilityBtn);
listenMenuBtn(closeBtn);

listenBtnToFunction(darkmodeBtn, changeTheme);
listenBtnToFunction(bigtextBtn, increaseTextSize);
