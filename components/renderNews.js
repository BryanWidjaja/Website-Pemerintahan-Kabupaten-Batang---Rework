const renderNews = (
  newsRowID,
  category = null,
  inPages = false,
  javanese = false
) => {
  const cacheBuster = new Date().getTime();
  fetch(
    javanese
      ? `${basePath}/assets/json/news_Javanese.json?cb=${cacheBuster}`
      : `${basePath}/assets/json/news.json?cb=${cacheBuster}`
  )
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

      pathStart = inPages ? "../" : "./";
      pagesLink = inPages ? "./" : "./pages/";

      articles.slice(0, 3).forEach((article) => {
        const container = document.createElement("div");
        container.classList.add("berita-container");
        container.innerHTML = `
          <img src="${pathStart}assets/images/berita/${
          article.img.src
        }.jpg" alt="${article.title}" class="berita-img" />
          <a href="${pagesLink}berita.html?title=${encodeURIComponent(
          article.title
        )}" class="berita-title">${article.title}</a>
          <div class="berita-info-row">
            <div class="berita-info-container">
              <img src="${pathStart}assets/icons/date.svg" alt="date : " class="berita-info-icon invert-icons" />
              <p class="berita-date">${article.date}</p>
            </div>
            <div class="berita-info-container">
              <img src="${pathStart}assets/icons/user.svg" alt="writer : " class="berita-info-icon invert-icons" />
              <p class="berita-writer">${article.writer}</p>
            </div>
            <div class="berita-info-container">
              <img src="${pathStart}assets/icons/tag.svg" alt="category : " class="berita-info-icon invert-icons" />
              <a href="${pagesLink}berita-list.html#${
          article.category
        }" class="berita-category">${article.category}</a>
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
