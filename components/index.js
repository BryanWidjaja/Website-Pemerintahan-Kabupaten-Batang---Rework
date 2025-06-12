import Splide from "https://cdn.jsdelivr.net/npm/@splidejs/splide@4/dist/js/splide.esm.min.js";
import { AutoScroll } from "https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.esm.js";

renderNews("terbaru-row", null, false, javaneseActive);

addCarousel("layananPublikCarousel", "layananPublik")
  .then(() => {
    new Splide("#layananPublikCarousel", {
      type: "loop",
      drag: "free",
      focus: "center",
      arrows: false,
      pagination: false,
      autoScroll: { speed: 0.33 },
      autoWidth: true,
    }).mount({ AutoScroll });
  })
  .catch(console.error);

addCarousel("lembagaBatangCarousel", "lembagaBatang")
  .then(() => {
    new Splide("#lembagaBatangCarousel", {
      type: "loop",
      drag: "free",
      focus: "center",
      arrows: false,
      pagination: false,
      autoScroll: { speed: 0.33 },
      autoWidth: true,
    }).mount({ AutoScroll });
  })
  .catch(console.error);
