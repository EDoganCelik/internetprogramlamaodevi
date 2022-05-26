function generateRainbowText(element) {
  var text = element.innerText;
  element.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    let charElem = document.createElement("span");
    charElem.style.color = "hsl(" + (360 * i) / text.length + ",80%,50%)";
    charElem.innerHTML = text[i];
    element.appendChild(charElem);
  }
}

function createRainbow() {
  generateRainbowText(rainbow);
}

function viewLoginPage(index) {
  try {
    var fullscreen = document.getElementById("main");
    var infopage = document.getElementById("info-page");
    var backpage = document.getElementById("backpage");
    backpage.style.display = "block";
    backpage.style.position = "fixed";
    fullscreen.style.opacity = "0.6";
    fullscreen.style.backgroundColor = "rgba(0,0,0,1)";
    fullscreen.style.zIndex = "-1";
    if (window.innerWidth < 770) {
      infopage.style.display = "none";
    } else {
      infopage.style.display = "block";
    }
  } catch (error) {}

  var page = document.getElementById(index);
  page.style.display = "flex";
}
function closePage(index) {
  try {
    var fullscreen = document.getElementById("main");
    var backpage = document.getElementById("backpage");

    backpage.style.display = "none";
    backpage.style.position = "z";
    var infopage = document.getElementById("info-page");
    fullscreen.style.opacity = "1";
    fullscreen.style.backgroundColor = "transparent";
    fullscreen.style.zIndex = "1";
  } catch (error) {}

  var page = document.getElementById(index);
  page.style.display = "none";
  infopage.style.display = "none";
}
function deleteOpenPage(index) {

  var page = document.getElementById(index);
  var deleteLink = document.getElementById('deleteLink');
  page.style.display = "flex";
}
function revisible() {
  try {
    var infopage = document.getElementById("info-page");
    if (window.innerWidth < 770) {
      infopage.style.display = "none";
    } else {
      infopage.style.display = "block";
    }
  } catch (error) {}
}
var x = 0;
var img = document.getElementsByClassName("gal-img");
function getData() {
  function write(num) {
    try {
      for (var i = 0; i < img.length; i++) {
        img[i].style.opacity = "0";
        img[i].style.display = "none";
      }
      img[num].style.display = "block";
      img[num].style.opacity = "1";
    } catch (error) {}
  }

  if (x === 0) {
    write(0);
    x++;
  } else if (x === 1) {
    write(1);
    x++;
  } else if (x === 2) {
    write(2);
    x++;
  } else if (x === 3) {
    write(3);
    x++;
  } else if (x === 4) {
    write(4);
    x++;
  } else {
    x = 0;
  }
}
function openFileDialog() {
  var fileSelect = document.getElementById("fileSelect");
  fileSelect.click();
}

function createLike() {
  /*Coming Soon*/
}
window.onresize = revisible;
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
      if (this.files && this.files[0]) {
          const img = document.querySelector('#imgUp');
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
          changeFragment('fragment2');
      }
  });
});
var run = setInterval(getData, 3000);
