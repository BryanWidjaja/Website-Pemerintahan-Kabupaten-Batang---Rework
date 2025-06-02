const renderPhotoNews = (
  newsRowID,
  category = null,
  inPages = false,
  sliceStart,
  sliceEnd
) => {
  fetch(`${basePath}/assets/json/news_Photos.json`)
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

      articles.slice(sliceStart, sliceEnd).forEach((article) => {
        const container = document.createElement("div");
        container.classList.add("berita-foto-container");
        container.innerHTML = `
            <a href="${pagesLink}berita.html?title=${encodeURIComponent(
          article.title
        )}-photo" class="berita-foto-link">
                <img src="${pathStart}assets/images/berita/${
          article.img.src
        }.jpg" alt="${article.title}" />
                ${article.title}
              </a>
        `;

        parentElement.appendChild(container);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};
