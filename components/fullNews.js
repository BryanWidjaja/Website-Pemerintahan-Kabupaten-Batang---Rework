const params = new URLSearchParams(window.location.search);
let title = params.get("title") || "";
let photoActive = false;

if (title.endsWith("-photo")) {
  photoActive = true;
  title = title.slice(0, -6);
}

const renderMainNews = (containerClass, javanese = false, photo = false) => {
  const cacheBuster = new Date().getTime();
  let url = "../assets/json/news.json";

  if (javanese) url = "../assets/json/news_Javanese.json";
  else if (photo) url = "../assets/json/news_Photos.json";

  fetch(`${url}?cb=${cacheBuster}`)
    .then((res) => res.json())
    .then((data) => {
      const allArticles = [];
      Object.keys(data.categories).forEach((category) => {
        data.categories[category].forEach((article) => {
          allArticles.push({ ...article, category });
        });
      });

      const article = allArticles.find((a) => a.title === title);

      const container = document.querySelector(`.${containerClass}`);

      container.innerHTML = `
      <div class="main-berita-directory-container">
        <a href="../index.html" class="main-berita-directory">Home</a>
        <p class="main-berita-directory-separator">/</p>
        <a href="./berita-list.html" class="main-berita-directory">Berita</a>
        <p class="main-berita-directory-separator">/</p>
        <a href="./berita-list.html#${
          article.category
        }" class="main-berita-directory">${article.category}</a>
      </div>
      <p class="main-berita-title">${article.title}</p>
      <div class="main-berita-info-row">
        <div class="main-berita-info-container">
          <img src="../assets/icons/date.svg" alt="date : " class="main-berita-info-icon invert-icons" />
          <p class="main-berita-date">${article.date}</p>
        </div>
        <div class="main-berita-info-container">
          <img src="../assets/icons/user.svg" alt="writer : " class="main-berita-info-icon invert-icons" />
          <p class="main-berita-writer">${article.writer}</p>
        </div>
        <div class="main-berita-info-container">
          <img src="../assets/icons/tag.svg" alt="category : " class="main-berita-info-icon invert-icons" />
          <a href="./berita-list.html#${
            article.category
          }" class="main-berita-category">${article.category}</a>
        </div>
      </div>
      <img src="../assets/images/berita/${
        article.img.src
      }.jpg" class="main-berita-img"alt="${article.title}" />
      <p class="main-berita-content">${article.content.replace(
        /\n\n/g,
        "<br><br>"
      )}</p>
    `;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

renderMainNews("main-berita-container", javaneseActive, photoActive);
