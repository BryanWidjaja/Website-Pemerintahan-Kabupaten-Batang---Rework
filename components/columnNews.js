const basePath =
  window.location.hostname === "bryanwidjaja.github.io"
    ? "/Website-Pemerintahan-Kabupaten-Batang---Rework"
    : "";

const renderNews = (newsColumnID, category = null, photoActive = false) => {
  fetch(`${basePath}/assets/json/news.json`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      const parentElement = document.querySelector(`#${newsColumnID}`);
      if (!parentElement) {
        console.error(`Parent element #${newsColumnID} not found`);
        return;
      }

      let articles = [];

      if (category && categories[category]) {
        articles = categories[category].map((article) => ({
          ...article,
          category,
        }));
      } else if (category) {
        articles = [];
      } else {
        Object.keys(categories).forEach((catName) => {
          categories[catName].forEach((article) => {
            articles.push({
              ...article,
              category: catName,
            });
          });
        });
      }

      articles.sort((a, b) => new Date(b.date) - new Date(a.date));

      const filteredArticles = articles.filter(
        (article) => article.title !== title
      );

      let sliceEnd = filteredArticles.length;
      if (photoActive) {
        sliceEnd = Math.floor(sliceEnd / 2);
      }

      parentElement.innerHTML = "";

      filteredArticles.slice(0, sliceEnd).forEach((article) => {
        const container = document.createElement("div");
        container.classList.add("berita-container");
        container.innerHTML = `
          <img src="../assets/images/berita/${article.img.src}.jpg" alt="${
          article.title
        }" class="berita-img" />
          <div class="berita-text-container">
            <a href="./berita.html?title=${encodeURIComponent(
              article.title
            )}" class="berita-title tdu">${article.title}</a>
            <div class="berita-info-container">
              <img src="../assets/icons/date.svg" alt="date : " class="berita-info-icon invert-icons" />
              <p class="berita-date">${article.date}</p>
            </div>
          </div>
        `;

        parentElement.appendChild(container);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};

renderNews("berita-lainnya", null, photoActive);
