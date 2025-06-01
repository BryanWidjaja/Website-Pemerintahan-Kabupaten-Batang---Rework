window.addEventListener("load", () => {
  const id = window.location.hash.substring(1);
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setTimeout(tryScroll, 100);
    }
  };
  if (id) tryScroll();
});
