const basePath =
  window.location.hostname === "bryanwidjaja.github.io"
    ? "/Website-Pemerintahan-Kabupaten-Batang---Rework"
    : "";

const renderNews = (newsRowID, category = null) => {
  fetch(`${basePath}/assets/json/news.json`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      const parentElement = document.querySelector(`#${newsRowID}`);
      if (!parentElement) {
        console.error(`Parent element #${newsRowID} not found`);
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

      parentElement.innerHTML = "";

      articles.slice(0, 3).forEach((article) => {
        const container = document.createElement("div");
        container.classList.add("berita-container");
        container.innerHTML = `
          <img src="./assets/images/berita/${article.img.src}.jpg" alt="${
          article.title
        }" class="berita-img" />
          <a href="./pages/berita.html?title=${encodeURIComponent(
            article.title
          )}" class="berita-title">${article.title}</a>
          <div class="berita-info-row">
            <div class="berita-info-container">
              <img src="./assets/icons/date.svg" alt="date : " class="berita-info-icon" />
              <p class="berita-date">${article.date}</p>
            </div>
            <div class="berita-info-container">
              <img src="./assets/icons/user.svg" alt="writer : " class="berita-info-icon" />
              <p class="berita-writer">${article.writer}</p>
            </div>
            <div class="berita-info-container">
              <img src="./assets/icons/tag.svg" alt="category : " class="berita-info-icon" />
              <a href="./pages/berita-list.html" class="berita-category">${
                article.category
              }</a>
            </div>
          </div>
          <div class="horizontal-line"></div>
          <p class="berita-content">${article.content.split("\n\n")[0]}</p>
        `;

        parentElement.appendChild(container);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};

renderNews("terbaru-row");
