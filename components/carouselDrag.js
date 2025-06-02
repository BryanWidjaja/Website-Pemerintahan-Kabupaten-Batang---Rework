const carousel = document.querySelector(".carousel");

let isDragging = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove("dragging");
});

carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast factor
  carousel.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("touchend", () => {
  isDragging = false;
  carousel.classList.remove("dragging");
});
carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});
