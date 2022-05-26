function changeFragment(value) {
  var fragment = document.getElementById(value);
  var fragments = document.getElementsByClassName("fragment");

  for (let i = 0; i < fragments.length; i++) {
    fragments[i].style.display = "none";
  }
  fragment.style.display = "flex";
}
function viewLoginPage(index) {
  var page = document.getElementById(index);
  page.style.display = "flex";
}
function closePage(index) {
  var page = document.getElementById(index);
  page.style.display = "none";
}
