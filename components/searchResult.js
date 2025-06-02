const emptyResult = document.querySelector(".empty-result");

document.addEventListener("DOMContentLoaded", () => {
  const queryResultEl = document.getElementById("query-result");
  queryResultEl.textContent = query;

  const parentClass = "main-query-container";

  Promise.all([
    outputSearchNewsCount(query),
    outputSearchDownloadablesCount(query),
  ]).then(([newsCount, downloadsCount]) => {
    const container = document.querySelector(`.${parentClass}`);

    if (newsCount === 0 && downloadsCount === 0) {
      emptyResult.classList.remove("hidden");
      emptyResult.innerHTML = `Hasil pencarian <strong>${query}</strong> tidak ditemukan.`;
    } else {
      const info = document.createElement("p");
      info.classList.add("search-info");
      info.textContent = "Klik tab di bawah ini untuk melihat hasil pencarian";
      container.appendChild(info);
    }

    createResultContainer(parentClass, outputSearchNews, "Berita Batang");
    createResultContainer(
      parentClass,
      outputSearchDownloadables,
      "Dokumen dan Informasi Penting"
    );

    const resultTitleContainers = document.querySelectorAll(
      ".result-title-container"
    );
    resultTitleContainers.forEach((titleContainer) => {
      titleContainer.addEventListener("click", (e) => {
        e.stopPropagation();
        const resultsContainer = titleContainer
          .closest(".main-result-container")
          .querySelector(".results-container");
        const resultTitleDesc =
          titleContainer.querySelector(".result-title-desc");
        const isResultsVisible = resultsContainer.classList.toggle("active");
        titleContainer.classList.toggle("active", isResultsVisible);
        if (resultTitleDesc) {
          resultTitleDesc.classList.toggle("active", isResultsVisible);
        }
      });
    });
  });
});

function outputSearchNewsCount(query) {
  return fetch(`${basePath}/assets/json/news.json`)
    .then((res) => res.json())
    .then((data) => {
      const categories = data.categories;
      let count = 0;
      Object.keys(categories).forEach((cat) => {
        categories[cat].forEach((article) => {
          if (article.title.toLowerCase().includes(query)) {
            count++;
          }
        });
      });
      return count;
    })
    .catch(() => 0);
}

function outputSearchDownloadablesCount(query) {
  return fetch(`${basePath}/assets/json/downloadables.json`)
    .then((res) => res.json())
    .then((data) => {
      return data.filter((item) => item.name.toLowerCase().includes(query))
        .length;
    })
    .catch(() => 0);
}
