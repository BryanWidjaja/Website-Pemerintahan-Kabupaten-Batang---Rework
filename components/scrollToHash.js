window.addEventListener("load", () => {
  const id = window.location.hash.substring(1);
  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });

        el.classList.add("highlighted");

        setTimeout(() => {
          el.classList.remove("highlighted");
        }, 3000);
      }, 100);
    } else {
      setTimeout(tryScroll, 100);
    }
  };
  if (id) tryScroll();
});
