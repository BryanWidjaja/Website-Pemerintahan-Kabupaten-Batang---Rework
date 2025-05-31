const accessibilityBtn = document.getElementById("accessability-btn");
const accessibilityMenu = document.querySelector(".accessibility-menu");
const closeBtn = document.getElementById("acc-close-btn");

const darkmodeBtn = document.getElementById("darkmode-btn");
const smalltextBtn = document.getElementById("smalltext-btn");
const bigtextBtn = document.getElementById("bigtext-btn");
const saturationBtn = document.getElementById("saturation-btn");
const disleksiaBtn = document.getElementById("disleksia-btn");
const sundaBtn = document.getElementById("sunda-btn");
const resetBtn = document.getElementById("reset-btn");

const smallTextSteps = document.querySelectorAll("#smalltext-steps .steps");
const bigTextSteps = document.querySelectorAll("#bigtext-steps .steps");

let currThemeSetting = localStorage.getItem("theme") || "light";
document.querySelector("html").setAttribute("data-theme", currThemeSetting);

let currFontSetting = localStorage.getItem("font") || "Poppins";
document.body.style.fontFamily = currFontSetting;

const MAX_STEPS = 3;

let currentStep = 0;
const stepCounters = new Map();
let fontScale = parseFloat(localStorage.getItem("fontScale")) || 1.0;

const saturationSteps = document.querySelectorAll("#saturation-steps .steps");
const SATURATION_KEY = "saturationStep";

const mainWrapper = document.querySelector(".main");
const heroWrapper = document.querySelector(".hero");

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

const changeTheme = () => {
  const newTheme = currThemeSetting === "dark" ? "light" : "dark";
  document.querySelector("html").setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  currThemeSetting = newTheme;
};

const applySaturationOnWrapper = (wrapper, step) => {
  let filterValue = "";
  if (step === 1) filterValue = "saturate(0.5)";
  else if (step === 2) filterValue = "saturate(1.5)";
  else if (step === 3) filterValue = "grayscale(100%)";
  else filterValue = "";

  wrapper.style.filter = filterValue;
};

const resetFilters = (wrapper) => {
  wrapper.style.filter = "";
};

const applyAllSaturation = (step) => {
  applySaturationOnWrapper(mainWrapper, step);
  applySaturationOnWrapper(heroWrapper, step);
  applySaturationOnWrapper(navBar, step);
  applySaturationOnWrapper(accessibilityBtn, step);
  applySaturationOnWrapper(accessibilityMenu, step);
};

const resetAllFilters = () => {
  resetFilters(mainWrapper);
  resetFilters(heroWrapper);
  resetFilters(navBar);
  resetFilters(accessibilityBtn);
  resetFilters(accessibilityMenu);
};

const initSaturationSteps = () => {
  let step = parseInt(localStorage.getItem(SATURATION_KEY));
  if (isNaN(step) || step > MAX_STEPS) step = 0;
  stepCounters.set(SATURATION_KEY, step);

  saturationSteps.forEach((stepEl, index) => {
    if (index < step) stepEl.classList.add("active");
    else stepEl.classList.remove("active");
  });

  if (step > 0) applyAllSaturation(step);
};

const resetSteps = (steps) => {
  steps.forEach((step) => {
    step.classList.remove("active");
  });
};

const incrementStep = (key, steps, incrementSize) => {
  if (!stepCounters.has(key)) stepCounters.set(key, 0);

  let currentStep = stepCounters.get(key);

  if (currentStep >= MAX_STEPS) {
    steps.forEach((step) => step.classList.remove("active"));
    stepCounters.set(key, 0);
    localStorage.setItem(key, 0);

    if (key === "bigTextStep" || key === "smallTextStep") {
      fontScale = 1.0;
      localStorage.setItem("fontScale", fontScale);
      document.documentElement.style.fontSize = `${fontScale}rem`;
    }

    if (key === SATURATION_KEY) {
      resetAllFilters();
    }

    return;
  }

  steps[currentStep].classList.add("active");
  stepCounters.set(key, currentStep + 1);
  localStorage.setItem(key, currentStep + 1);

  if (key === "bigTextStep") {
    changeFontSize(true);
  } else if (key === "smallTextStep") {
    changeFontSize(false);
  } else if (key === SATURATION_KEY) {
    applyAllSaturation(currentStep + 1);
  }
};

const changeFontSize = (increment) => {
  const step = 0.1;
  const baseRem = 1;

  if (increment && fontScale < 2.0) {
    fontScale += step;
  } else if (!increment && fontScale > 0.6) {
    fontScale -= step;
  }

  fontScale = parseFloat(fontScale.toFixed(2));
  localStorage.setItem("fontScale", fontScale);

  document.documentElement.style.fontSize = `${baseRem * fontScale}rem`;
};

const initStepCounter = (key, steps) => {
  let step = parseInt(localStorage.getItem(key));
  if (isNaN(step) || step > MAX_STEPS) step = 0;
  stepCounters.set(key, step);

  steps.forEach((stepEl, index) => {
    if (index < step) stepEl.classList.add("active");
    else stepEl.classList.remove("active");
  });
};

const decreaseTextSize = () => {
  incrementStep("smallTextStep", smallTextSteps, false);
};

const increaseTextSize = () => {
  incrementStep("bigTextStep", bigTextSteps, true);
};

const changeDyslexic = () => {
  const isCurrentlyDyslexic = currFontSetting === "OpenDyslexic";
  const newFont = isCurrentlyDyslexic ? "Poppins" : "OpenDyslexic";

  document.body.style.fontFamily = newFont;
  localStorage.setItem("font", newFont);
  currFontSetting = newFont;

  if (newFont === "OpenDyslexic") {
    const step = 0.1;
    const baseRem = 1;

    // Decrease font scale only if above min
    if (fontScale > 0.6) {
      fontScale -= step;
      fontScale = parseFloat(fontScale.toFixed(2));
      localStorage.setItem("fontScale", fontScale);
      document.documentElement.style.fontSize = `${baseRem * fontScale}rem`;
    }
  } else {
    fontScale = 1.0;
    document.documentElement.style.fontSize = `${fontScale}rem`;
    localStorage.setItem("fontScale", fontScale);

    resetSteps(smallTextSteps);
    stepCounters.set("smallTextStep", 0);
    localStorage.setItem("smallTextStep", 0);
  }
};

const resetAllSettings = () => {
  currThemeSetting = "light";
  document.querySelector("html").setAttribute("data-theme", currThemeSetting);
  localStorage.setItem("theme", currThemeSetting);

  currFontSetting = "Poppins";
  document.body.style.fontFamily = currFontSetting;
  document.body.style.letterSpacing = "";
  localStorage.setItem("font", currFontSetting);

  fontScale = 1.0;
  document.documentElement.style.fontSize = `${fontScale}rem`;
  localStorage.setItem("fontScale", fontScale);

  stepCounters.set("smallTextStep", 0);
  stepCounters.set("bigTextStep", 0);
  localStorage.setItem("smallTextStep", 0);
  localStorage.setItem("bigTextStep", 0);
  resetSteps(smallTextSteps);
  resetSteps(bigTextSteps);

  stepCounters.set(SATURATION_KEY, 0);
  localStorage.setItem(SATURATION_KEY, 0);
  resetSteps(saturationSteps);
  resetAllFilters();
};

listenMenuBtn(accessibilityBtn);
listenMenuBtn(closeBtn);

listenBtnToFunction(darkmodeBtn, changeTheme);

initSaturationSteps();
listenBtnToFunction(saturationBtn, () =>
  incrementStep(SATURATION_KEY, saturationSteps)
);

initStepCounter("smallTextStep", smallTextSteps);
initStepCounter("bigTextStep", bigTextSteps);
listenBtnToFunction(smalltextBtn, decreaseTextSize);
listenBtnToFunction(bigtextBtn, increaseTextSize);
document.documentElement.style.fontSize = `${fontScale}rem`;

listenBtnToFunction(disleksiaBtn, changeDyslexic);

listenBtnToFunction(resetBtn, resetAllSettings);
