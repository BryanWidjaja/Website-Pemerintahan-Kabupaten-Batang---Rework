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

        const link = document.createElement("a");
        link.href = item.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        const img = document.createElement("img");
        img.src = item["img-link"];
        img.alt = "carousel image";

        link.appendChild(img);
        carouselItem.appendChild(link);
        parentElement.appendChild(carouselItem);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};
