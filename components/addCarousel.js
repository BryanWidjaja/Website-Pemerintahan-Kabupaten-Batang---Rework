const addCarousel = (carouselID, jsonName) => {
  fetch(`${basePath}/assets/json/${jsonName}.json`)
    .then((res) => res.json())
    .then((data) => {
      const parentElement = document.querySelector(`#${carouselID}`);
      if (!parentElement) {
        console.error(`Parent element #${carouselID} not found`);
        return;
      }

      data.forEach((item) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        carouselItem.style.backgroundImage = `url(${item["img-link"]})`;
        carouselItem.style.backgroundSize = "cover";
        carouselItem.style.backgroundPosition = "center";

        const darken = document.createElement("div");
        darken.classList.add("darken");
        carouselItem.appendChild(darken);

        const btn = document.createElement("button");
        btn.classList.add("carousel-btn");

        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.name;

        btn.appendChild(link);
        carouselItem.appendChild(btn);
        parentElement.appendChild(carouselItem);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};
