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

    const container = document.querySelector("#article-detail");

    container.innerHTML = `
        <h1>${article.title}</h1>
        <img src="../assets/images/berita/${article.img.src}.jpg" alt="${
      article.title
    }" />
        <p><strong>Date:</strong> ${article.date}</p>
        <p><strong>Writer:</strong> ${article.writer}</p>
        <p><strong>Category:</strong> ${article.category}</p>
        <hr>
        <p>${article.content.replace(/\n\n/g, "<br><br>")}</p>
    `;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
