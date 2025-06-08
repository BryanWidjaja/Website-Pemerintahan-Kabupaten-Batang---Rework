const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let paginatedData = [];

const formatSizeWithDots = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const insertDownloadables = async (table) => {
  const response = await fetch(`${basePath}/assets/json/downloadables.json`);
  const data = await response.json();
  const reversed = data.slice().reverse();

  const fileData = await Promise.all(
    reversed.map(async (file, index) => {
      const url = file.link;
      const name = file.name;
      const ext = url.split(".").pop().split("?")[0];

      try {
        const res = await fetch(url, { method: "HEAD" });
        const sizeBytes = res.headers.get("Content-Length");
        const sizeKB = sizeBytes
          ? formatSizeWithDots(Math.round(sizeBytes / 1024)) + " KB"
          : "Unknown";
        return { index: index + 1, name, ext, size: sizeKB, url };
      } catch {
        return { index: index + 1, name, ext, size: "Unknown", url };
      }
    })
  );

  paginatedData = fileData;
  renderTable(table);
  renderPaginationControls(table);
};

const renderTable = (tableId) => {
  const table = document.getElementById(tableId);
  table.innerHTML = ""; // Clear table first

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = paginatedData.slice(start, end);

  currentItems.forEach(({ index, name, ext, size, url }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${name}</td>
      <td>${ext}</td>
      <td>${size}</td>
      <td>
        <div class="download-btn" onclick="downloadFile('${url}', '${name}.${ext}')">
          Download
        </div>
      </td>
    `;
    table.appendChild(row);
  });

  renderSummary(
    start,
    Math.min(end, paginatedData.length),
    paginatedData.length
  );
};

const renderSummary = (startIndex, endIndex, total) => {
  const summary = document.getElementById("pagination-summary");
  summary.textContent = `Menampilkan ${
    startIndex + 1
  } sampai ${endIndex} dari ${total} entries`;
};

const renderPaginationControls = (tableId) => {
  const totalPages = Math.ceil(paginatedData.length / ITEMS_PER_PAGE);
  const controls = document.getElementById("pagination-controls");
  controls.innerHTML = "";

  const createButton = (label, page) => {
    const btn = document.createElement("button");
    btn.classList.add("pagination-btn");
    btn.textContent = label;
    btn.disabled = page === currentPage;
    btn.addEventListener("click", () => {
      currentPage = page;
      renderTable(tableId);
      renderPaginationControls(tableId);
    });
    return btn;
  };

  const leftButton = createButton("«", Math.max(currentPage - 1, 1));
  leftButton.classList.add("ends");
  controls.appendChild(leftButton);

  for (let i = 1; i <= totalPages; i++) {
    controls.appendChild(createButton(i, i));
  }

  const rightButton = createButton("»", Math.min(currentPage + 1, totalPages));
  rightButton.classList.add("ends");
  controls.appendChild(rightButton);
};

const downloadFile = (url, filename) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert(`Successfully downloaded ${filename}`);
};

insertDownloadables("downloadTable");
