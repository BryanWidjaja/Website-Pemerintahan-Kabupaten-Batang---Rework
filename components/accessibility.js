const accessibilityBtn = document.getElementById("accessability-btn");
const accessibilityMenu = document.querySelector(".accessibility-menu");
const closeBtn = document.getElementById("acc-close-btn");
const footer = document.querySelector(".footer");

const darkmodeBtn = document.getElementById("darkmode-btn");
const smalltextBtn = document.getElementById("smalltext-btn");
const bigtextBtn = document.getElementById("bigtext-btn");
const saturationBtn = document.getElementById("saturation-btn");
const disleksiaBtn = document.getElementById("disleksia-btn");
const jawaBtn = document.getElementById("jawa-btn");
const resetBtn = document.getElementById("reset-btn");

const allBtns = [
  darkmodeBtn,
  smalltextBtn,
  bigtextBtn,
  saturationBtn,
  disleksiaBtn,
  jawaBtn,
];

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

const stepButtonsMap = new Map([
  [smalltextBtn, "smallTextStep"],
  [bigtextBtn, "bigTextStep"],
  [saturationBtn, SATURATION_KEY],
]);

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

const toggleActiveClass = (btn) => {
  btn.classList.toggle("active");
};

const resetActiveClass = (btn) => {
  btn.classList.remove("active");
};

const updateButtonActiveState = (btn) => {
  const key = stepButtonsMap.get(btn);
  if (!key) return;
  const step = stepCounters.get(key) || 0;
  if (step > 0) btn.classList.add("active");
  else btn.classList.remove("active");
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
  applySaturationOnWrapper(footer, step);
};

const resetAllFilters = () => {
  resetFilters(mainWrapper);
  resetFilters(heroWrapper);
  resetFilters(navBar);
  resetFilters(accessibilityBtn);
  resetFilters(accessibilityMenu);
  resetFilters(footer);
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

const incrementStep = (keyParam, steps, incrementSize) => {
  if (!stepCounters.has(keyParam)) stepCounters.set(keyParam, 0);

  let currentStep = stepCounters.get(keyParam);

  if (currentStep + 1 > MAX_STEPS) {
    steps.forEach((step) => step.classList.remove("active"));

    stepCounters.set(keyParam, 0);
    localStorage.setItem(keyParam, 0);

    if (keyParam === "bigTextStep" || keyParam === "smallTextStep") {
      fontScale = 1.0;
      localStorage.setItem("fontScale", fontScale);
      document.documentElement.style.fontSize = `${fontScale}rem`;
    }

    if (keyParam === SATURATION_KEY) {
      resetAllFilters();
    }

    stepButtonsMap.forEach((key, btn) => {
      if (key === keyParam) updateButtonActiveState(btn);
    });

    return;
  }

  steps[currentStep].classList.add("active");
  stepCounters.set(keyParam, currentStep + 1);
  localStorage.setItem(keyParam, currentStep + 1);

  if (keyParam === "bigTextStep") {
    changeFontSize(true);
  } else if (keyParam === "smallTextStep") {
    changeFontSize(false);
  } else if (keyParam === SATURATION_KEY) {
    applyAllSaturation(currentStep + 1);
  }

  stepButtonsMap.forEach((key, btn) => {
    if (key === keyParam) updateButtonActiveState(btn);
  });
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

const changeJavanese = () => {
  javaneseActive = !javaneseActive;
  localStorage.setItem("javaneseActive", javaneseActive);
  location.reload();
};

const clearAllLocalStorageKeys = () => {
  localStorage.removeItem("darkmodeActive");
  localStorage.removeItem("disleksiaActive");
  localStorage.removeItem("jawaActive");
  localStorage.removeItem("javaneseActive");

  localStorage.removeItem("smallTextStep");
  localStorage.removeItem("bigTextStep");
  localStorage.removeItem(SATURATION_KEY);

  localStorage.removeItem("theme");
  localStorage.removeItem("font");
  localStorage.removeItem("fontScale");
};

const resetAllSettings = () => {
  clearAllLocalStorageKeys();
  location.reload();

  allBtns.forEach((btn) => {
    resetActiveClass(btn);
  });

  currThemeSetting = "light";
  document.querySelector("html").setAttribute("data-theme", currThemeSetting);
  localStorage.setItem("theme", currThemeSetting);

  currFontSetting = "Poppins";
  document.body.style.fontFamily = currFontSetting;
  localStorage.setItem("font", currFontSetting);

  fontScale = 1.0;
  document.documentElement.style.fontSize = `${fontScale}rem`;
  localStorage.setItem("fontScale", fontScale);

  stepCounters.set("smallTextStep", 0);
  stepCounters.set("bigTextStep", 0);
  stepCounters.set(SATURATION_KEY, 0);

  javaneseActive = false;

  resetSteps(smallTextSteps);
  resetSteps(bigTextSteps);
  resetSteps(saturationSteps);
  resetAllFilters();
};

const restoreButtonActiveStates = () => {
  const buttonsWithStorageKeys = [
    { btn: darkmodeBtn, key: "darkmodeActive" },
    { btn: disleksiaBtn, key: "disleksiaActive" },
    { btn: jawaBtn, key: "jawaActive" },
  ];

  buttonsWithStorageKeys.forEach(({ btn, key }) => {
    const savedState = localStorage.getItem(key);
    if (savedState === "true") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  stepButtonsMap.forEach((key, btn) => {
    updateButtonActiveState(btn);
  });
};

const restoreStepButtonsActiveState = () => {
  stepButtonsMap.forEach((storageKey, btn) => {
    const step = stepCounters.get(storageKey) || 0;

    if (step > 0) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

listenMenuBtn(accessibilityBtn);
listenMenuBtn(closeBtn);

listenBtnToFunction(darkmodeBtn, () => {
  changeTheme();
  toggleActiveClass(darkmodeBtn);
  localStorage.setItem(
    "darkmodeActive",
    darkmodeBtn.classList.contains("active")
  );
});

initSaturationSteps();
listenBtnToFunction(saturationBtn, () =>
  incrementStep(SATURATION_KEY, saturationSteps)
);

initStepCounter("smallTextStep", smallTextSteps);
initStepCounter("bigTextStep", bigTextSteps);
listenBtnToFunction(smalltextBtn, decreaseTextSize);
listenBtnToFunction(bigtextBtn, increaseTextSize);
document.documentElement.style.fontSize = `${fontScale}rem`;

listenBtnToFunction(disleksiaBtn, () => {
  changeDyslexic();
  toggleActiveClass(disleksiaBtn);
  localStorage.setItem(
    "disleksiaActive",
    disleksiaBtn.classList.contains("active")
  );
});

listenBtnToFunction(jawaBtn, () => {
  changeJavanese();
  toggleActiveClass(jawaBtn);
  localStorage.setItem("jawaActive", jawaBtn.classList.contains("active"));
});

listenBtnToFunction(resetBtn, resetAllSettings);

restoreStepButtonsActiveState();
restoreButtonActiveStates();
