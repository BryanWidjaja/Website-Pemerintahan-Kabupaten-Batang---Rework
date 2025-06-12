const createSKPDDropdown = (parentContainer, jsonPath, containerName) => {
  const container = document.querySelector(`.${parentContainer}`);

  const wrapper = document.createElement("div");
  wrapper.classList.add("main-result-container");
  wrapper.innerHTML = `
    <div class="skpd-dropdown-title-container">
      <div class="skpd-dropdown-title">
        <p class="skpd-dropdown-title-main">${containerName}</p>
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
        itemEl.classList.add("skpd-dropdown-inner-container");

        let infoHTML = "";

        if (item.address) {
          infoHTML += `
            <div class="skpd-info-inner-container">
              <img src="../assets/icons/location.svg" alt="v" class="skpd-inner-icon" />
              <p>${item.address}</p>
            </div>
          `;
        }

        if (item.phone) {
          infoHTML += `
            <div class="skpd-info-inner-container">
              <img src="../assets/icons/phone.svg" alt="v" class="skpd-inner-icon" />
              <p>${item.phone}</p>
            </div>
          `;
        }

        if (item.email) {
          infoHTML += `
            <div class="skpd-info-inner-container">
              <img src="../assets/icons/email.svg" alt="v" class="skpd-inner-icon" />
              <p>${item.email}</p>
            </div>
          `;
        }

        if (item.website) {
          infoHTML += `
            <div class="skpd-info-inner-container">
              <img src="../assets/icons/web.svg" alt="v" class="skpd-inner-icon" />
              <a href="https://${item.website}" target="_blank">${item.website}</a>
            </div>
          `;
        }

        itemEl.innerHTML = `
          <p class="skpd-inner-title">${item.name}</p>
          <div class="skpd-info-container">
            ${infoHTML}
          </div>
        `;

        resultsContainer.appendChild(itemEl);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
};
