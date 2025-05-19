const accessibilityBtn = document.getElementById("accessability-btn");
const accessibilityMenu = document.querySelector(".accessibility-menu");
const closeBtn = document.getElementById("acc-close-btn");

const listenBtn = (btn) => {
  btn.addEventListener("click", () => {
    const isMenuVisible = accessibilityMenu.classList.toggle("visible");

    isMenuVisible
      ? accessibilityBtn.classList.add("display-none")
      : accessibilityBtn.classList.remove("display-none");
  });
};

listenBtn(accessibilityBtn);
listenBtn(closeBtn);
