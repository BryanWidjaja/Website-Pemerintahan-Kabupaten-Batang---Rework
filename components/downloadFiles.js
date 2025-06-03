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

  fileData.forEach(({ index, name, ext, size, url }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
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
