const containers = document.querySelectorAll(".carousel-container");
const carousels = document.querySelectorAll(".carousel");

const autoScrollSpeed = 0.25;

containers.forEach((container, index) => {
  const innerContainer = carousels[index];

  let pressed = false;
  let startX;
  let x;
  let scrollLeft = 0;
  let autoScrollEnabled = true;

  innerContainer.innerHTML += innerContainer.innerHTML;

  container.addEventListener("mousedown", (e) => {
    pressed = true;
    autoScrollEnabled = false;
    startX = e.offsetX - (parseInt(innerContainer.style.left) || 0);
    container.style.cursor = "grabbing";
  });

  container.addEventListener("mouseup", () => {
    pressed = false;
    autoScrollEnabled = true;
    container.style.cursor = "grab";
  });

  container.addEventListener("mouseleave", () => {
    pressed = false;
    container.style.cursor = "grab";
  });

  container.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    scrollLeft = x - startX;
    innerContainer.style.left = `${scrollLeft}px`;
  });

  const autoScroll = () => {
    if (autoScrollEnabled && !pressed) {
      scrollLeft -= autoScrollSpeed;

      const firstSetWidth = innerContainer.scrollWidth / 2;
      if (Math.abs(scrollLeft) >= firstSetWidth) {
        scrollLeft = 0;
      }

      innerContainer.style.left = `${scrollLeft}px`;
    }
    requestAnimationFrame(autoScroll);
  };

  autoScroll();
});
