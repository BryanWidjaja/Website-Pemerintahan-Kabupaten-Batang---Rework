const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = document.getElementById("search-input").value.trim();
  if (query) {
    const isInPages = window.location.pathname.includes("/pages/");
    const targetPath = isInPages ? "./search.html" : "./pages/search.html";
    window.location.href = `${targetPath}?q=${encodeURIComponent(query)}`;
  }
});
