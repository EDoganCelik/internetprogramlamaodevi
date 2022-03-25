function createBars() {
  var leftPane = document.getElementById("leftPane");
  if(leftPane.style.display=="flex"){
     leftPane.style.display ="none";
  }else{
    leftPane.style.display ="flex";
  }

}
function clearText(index){
  var text = document.getElementById(index);
  text.value = "";
  text.focus();
 }
function reportWindowSize() {
  var leftPane = document.getElementById("leftPane");
  
  if(window.innerWidth > 755){
    leftPane.style.display ="flex";
  }else{
    leftPane.style.display ="none";
  }
}
function resizeObject(){
var object = document.getElementById('right-bar');
object.style.width = object.style.width++;
}
function goSite(url) {
  var link = document.getElementById('goSite');
  link.setAttribute("href", url);

  link.click();
}
window.onresize = reportWindowSize;