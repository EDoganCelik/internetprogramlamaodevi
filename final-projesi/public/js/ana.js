const input = document.getElementById("searchText");

input.addEventListener("focusin", (e) => {
  const viewport_width = window.innerWidth;
  if (viewport_width < 600) input.parentElement.style.position = "absolute";
});
input.addEventListener("focusout", (e) => {
  input.parentElement.style.position = "relative";
});
