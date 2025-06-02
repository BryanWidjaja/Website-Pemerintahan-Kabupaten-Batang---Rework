const renderAllNews = () => {
  return fetch(`${basePath}/assets/json/news.json`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      const parent = document.querySelector(`.main`);
      Object.keys(categories).forEach((category) => {
        const container = document.createElement("div");
        container.classList.add("main-sections");
        container.id = `${category}`;
        container.innerHTML = `
          <div class="section-header">
            <p class="section-header-title">Berita <strong>${category}</strong></p>
            <div class="horizontal-line bg-primary-gradient"></div>
            </div>

            <div class="main-sections-container">
            <div class="berita-container-row" id="${category.toLowerCase()}-row"> </div>
          </div>
        `;

        parent.appendChild(container);

        renderNews(
          `${category.toLowerCase()}-row`,
          `${category}`,
          true,
          javaneseActive
        );
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};

const appendPhotoRows = () => {
  const parent = document.querySelector(`.main`);
  const container = document.createElement("div");
  container.classList.add("main-sections");
  container.id = "Foto";
  container.innerHTML = `
    <div class="section-header">
      <p class="section-header-title">Berita <strong>Foto</strong></p>
      <div class="horizontal-line bg-primary-gradient"></div>
    </div>
    <div class="main-sections-container">
      <div class="berita-foto-row" id="berita-foto-row-1"></div>
      <div class="berita-foto-row" id="berita-foto-row-2"></div>
    </div>
  `;
  parent.appendChild(container);
};

renderNews("terbaru-row", null, true, javaneseActive);

renderAllNews().then(() => {
  appendPhotoRows();
  renderPhotoNews("berita-foto-row-1", null, true, 0, 3);
  renderPhotoNews("berita-foto-row-2", null, true, 3, 6);
});
