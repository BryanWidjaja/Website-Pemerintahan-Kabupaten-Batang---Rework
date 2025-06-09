createSKPDDropdown(
  "badan-container",
  `${basePath}/assets/json/badan.json`,
  "Badan"
);

createSKPDDropdown(
  "dinas-container",
  `${basePath}/assets/json/dinas.json`,
  "Dinas"
);

createSKPDDropdown(
  "lembaga-container",
  `${basePath}/assets/json/lembaga_teknis.json`,
  "Lembaga Teknis"
);

document.addEventListener("DOMContentLoaded", () => {
  const resultTitleContainers = document.querySelectorAll(
    ".skpd-dropdown-title-container"
  );
  resultTitleContainers.forEach((titleContainer) => {
    titleContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      const resultsContainer = titleContainer
        .closest(".main-result-container")
        .querySelector(".results-container");
      const resultTitleDesc =
        titleContainer.querySelector(".skpd-dropdown-title-desc");
      const isResultsVisible = resultsContainer.classList.toggle("active");
      titleContainer.classList.toggle("active", isResultsVisible);
      if (resultTitleDesc) {
        resultTitleDesc.classList.toggle("active", isResultsVisible);
      }
    });
  });
});
