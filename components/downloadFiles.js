const formatSizeWithDots = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const insertDownloadables = (table) => {
  fetch(`${basePath}/assets/json/downloadables.json`)
    .then((response) => response.json())
    .then((data) => {
      data
        .slice()
        .reverse()
        .forEach((file, index) => {
          const url = file.link;
          const name = file.name;
          const ext = url.split(".").pop().split("?")[0];

          fetch(url, { method: "HEAD" })
            .then((res) => {
              const sizeBytes = res.headers.get("Content-Length");
              const sizeKB = sizeBytes
                ? formatSizeWithDots(Math.round(sizeBytes / 1024)) + " KB"
                : "Unknown";
              appendRow(index + 1, name, ext, sizeKB, url);
            })
            .catch(() => {
              appendRow(index + 1, name, ext, "Unknown", url);
            });
        });

      function appendRow(no, name, ext, size, url) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${no}</td>
        <td>${name}</td>
        <td>${ext}</td>
        <td>${size}</td>
        <td>
            <div 
              class="download-btn" 
              onclick="downloadFile('${url}', '${name}.${ext}')"
            >
              Download
            </div>
          </td>
      `;
        document.getElementById(table).appendChild(row);
      }
    });
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
