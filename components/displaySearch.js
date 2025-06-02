const createResultContainer = (parentContainer, func, containerName) => {
  const container = document.querySelector(`.${parentContainer}`);

  const wrapper = document.createElement("div");
  wrapper.classList.add("main-result-container");
  wrapper.innerHTML = `
    <div class="result-title-container">
      <div class="result-title">
        <p class="result-title-main">${containerName}</p>
        <div class="result-title-desc">
          <p>Ditemukan -</p>
          <p class="result-title-amount" id="${containerName}-amount">0</p>
        </div>
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

  return func(`${containerName}-result-container`).then((count) => {
    if (count === 0) {
      wrapper.remove();
    } else {
      const amountEl = document.getElementById(`${containerName}-amount`);
      if (amountEl) {
        amountEl.textContent = count;
      }
    }
    return count;
  });
};
