const navBar = document.querySelector(".navbar-container");
const heroSection = document.querySelector(".hero");
let lastScrollY = window.scrollY;

const updateNavbar = () => {
  const heroHeight = heroSection.offsetHeight;
  const currentScrollY = window.scrollY;

  let opacity = currentScrollY / heroHeight;
  if (opacity > 1) opacity = 1;

  navBar.style.background = `linear-gradient(135deg, rgba(144, 198, 124, ${opacity}), rgba(50, 142, 110, ${opacity}))`;

  lastScrollY = currentScrollY;
};

window.addEventListener("scroll", function () {
  updateNavbar();
});

updateNavbar();
