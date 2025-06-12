import Splide from "https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/js/splide.esm.min.js";

new Splide("#bupatiCarousel", {
  type: "loop",
  perPage: 1,
  focus: "center",
  autoplay: true,
  interval: 3000,
  pauseOnHover: false,
  pauseOnFocus: false,
  arrows: false,
  pagination: false,
}).mount();
