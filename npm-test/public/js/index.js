const searchText = document.getElementById('searchText');
 const formElement = document.getElementById('form');
searchText.addEventListener("keypress", function(event) {
   if (event.key === "Enter") {
    formElement.submit();   
   
  }
});
function createLike() {
  
}
function createBars() {
  var leftPane = document.getElementById("leftPane");
  if (leftPane.style.display == "flex") {
    leftPane.style.display = "none";
  } else {
    leftPane.style.display = "flex";
  }
}
function clearText(index) {
  var text = document.getElementById(index);
  text.value = "";
  text.focus();
}
function reportWindowSize() {
  var leftPane = document.getElementById("leftPane");

  if (window.innerWidth > 755) {
    leftPane.style.display = "flex";
  } else {
    leftPane.style.display = "none";
  }
}
function resizeObject() {
  var object = document.getElementById("right-bar");
  object.style.width = object.style.width++;
}
function goSite(url) {
  var link = document.getElementById("goSite");
  link.setAttribute("href", url);

  link.click();
}
function likesButton() {
  var link = document.getElementById("likes-button");
  var setInput = document.getElementById("input-no-like");
  setInput.name = "likes";
  link.submit();
}
function unLikesButton() {
  var link = document.getElementById("un-likes-button");
  var setInput = document.getElementById("input-no-like");
  setInput.name = "un_likes";
  link.submit();
}
 
window.onresize = reportWindowSize;
