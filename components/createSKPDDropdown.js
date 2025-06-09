const createSKPDDropdown = (parentContainer, jsonPath, containerName) => {
  const container = document.querySelector(`.${parentContainer}`);

  const wrapper = document.createElement("div");
  wrapper.classList.add("main-result-container");
  wrapper.innerHTML = `
    <div class="result-title-container">
      <div class="result-title">
        <p class="result-title-main">${containerName}</p>
      </div>
      <img
        src="../assets/icons/triangle-down-charcoal.svg"
        alt="v"
        class="result-arrow-icon"
      />
    </div>
    <div class="results-container" id="${containerName}-result-container"></div>
  `;

  container.appendChild(wrapper);

  const resultsContainer = document.getElementById(
    `${containerName}-result-container`
  );

  // Fetch the JSON from the given path
  fetch(jsonPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        const itemEl = document.createElement("div");
        itemEl.classList.add("result-inner-container");
        itemEl.innerHTML = `
          <p>${item.name}</p>
          <p>${item.address}</p>
          <p>${item.phone}</p>
          <p>${item.email}</p>
          <a href="https://${item.website}" target="_blank">${item.website}</a>
        `;
        resultsContainer.appendChild(itemEl);
      });
    })
    .catch((error) => {
      console.error("Failed to load JSON data:", error);
      resultsContainer.innerHTML =
        "<p style='color:red;'>Failed to load data.</p>";
    });
};
