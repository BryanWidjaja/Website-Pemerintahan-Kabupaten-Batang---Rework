const params = new URLSearchParams(window.location.search);
const title = params.get("title");

fetch("../assets/json/news.json")
  .then((res) => res.json())
  .then((data) => {
    const allArticles = [];
    Object.keys(data.categories).forEach((category) => {
      data.categories[category].forEach((article) => {
        allArticles.push({ ...article, category });
      });
    });

    const article = allArticles.find((a) => a.title === title);

    const container = document.querySelector(".berita-container");

    container.innerHTML = `
      <div class="berita-directory-container">
        <a href="../index.html" class="berita-directory">Home</a>
        <p class="berita-directory-separator">/</p>
        <a href="./berita-list.html" class="berita-directory">Berita</a>
        <p class="berita-directory-separator">/</p>
        <a href="./berita-list.html#${
          article.category
        }" class="berita-directory">${article.category}</a>
      </div>
      <p class="berita-title">${article.title}</p>
      <div class="berita-info-row">
        <div class="berita-info-container">
          <img src="../assets/icons/date.svg" alt="date : " class="berita-info-icon" />
          <p class="berita-date">${article.date}</p>
        </div>
        <div class="berita-info-container">
          <img src="../assets/icons/user.svg" alt="writer : " class="berita-info-icon" />
          <p class="berita-writer">${article.writer}</p>
        </div>
        <div class="berita-info-container">
          <img src="../assets/icons/tag.svg" alt="category : " class="berita-info-icon" />
          <a href="./berita-list.html" class="berita-category">${
            article.category
          }</a>
        </div>
      </div>
      <img src="../assets/images/berita/${
        article.img.src
      }.jpg" class="berita-img"alt="${article.title}" />
      <p class="berita-content">${article.content.replace(
        /\n\n/g,
        "<br><br>"
      )}</p>
    `;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
