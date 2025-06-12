const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q")?.toLowerCase() || "";

const outputSearchNews = (outputContainer) => {
  return fetch(`${basePath}/assets/json/news.json`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      const results = [];

      Object.keys(categories).forEach((cat) => {
        categories[cat].forEach((article) => {
          if (article.title.toLowerCase().includes(query)) {
            results.push({ ...article, category: cat });
          }
        });
      });

      if (results.length === 0) return 0;

      const container = document.getElementById(outputContainer);
      results.forEach((article) => {
        const el = document.createElement("div");
        el.classList.add("result-inner-container");
        el.innerHTML = `
          <a href="./berita.html?title=${encodeURIComponent(
            article.title
          )}" class="berita-title">${article.title}</a>
        `;
        container.appendChild(el);
      });

      return results.length;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      return 0;
    });
};

const outputSearchDownloadables = (outputContainer) => {
  return fetch(`${basePath}/assets/json/downloadables.json`)
    .then((res) => res.json())
    .then((data) => {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(query)
      );

      if (results.length === 0) return 0;

      const container = document.getElementById(outputContainer);
      results.forEach((item) => {
        const el = document.createElement("div");
        el.classList.add("result-inner-container");
        el.innerHTML = `
          <a href="${item.link}" class="berita-title" target="_blank">${item.name}</a>
        `;
        container.appendChild(el);
      });

      return results.length;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      return 0;
    });
};
