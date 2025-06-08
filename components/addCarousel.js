const addCarousel = (carouselID, jsonName) => {
  return fetch(`${basePath}/assets/json/${jsonName}.json`)
    .then((res) => res.json())
    .then((data) => {
      const list = document.querySelector(`#${carouselID} .splide__list`);

      if (!list) {
        console.error(`.splide__list inside #${carouselID} not found`);
        return Promise.reject(`.splide__list inside #${carouselID} not found`);
      }

      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("splide__slide");

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

        listItem.appendChild(carouselItem);
        list.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      return Promise.reject(error);
    });
};
