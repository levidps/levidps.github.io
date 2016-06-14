// Toggle class
function toggleClass() {
	var className = "active";

	if (el.classList) {
	  el.classList.toggle(className);
	} else {
	  var classes = el.className.split(' ');
	  var existingIndex = classes.indexOf(className);

	  if (existingIndex >= 0)
	    classes.splice(existingIndex, 1);
	  else
	    classes.push(className);

	  el.className = classes.join(' ');
	}

}
// Credits fade in
var btn = document.querySelector('#creditToggle');
var el = document.querySelector('.credits');

btn.addEventListener('click', function(e) { 

  toggleClass(el);

});



var imgArray = [
    'assets/watts-work-background-2.jpg',
    'assets/watts-work-background-3.jpg',
    'assets/watts-work-background-4.jpg',
    'assets/watts-work-background-1.jpg'],
    curIndex = 0;
    imgDuration = 5000;

function slideShow() {
    document.getElementById('slider').className += "fadeOut";
    setTimeout(function() {
        document.getElementById('slider').src = imgArray[curIndex];
        document.getElementById('slider').className = "";
    },1000);
    curIndex++;
    if (curIndex == imgArray.length) { curIndex = 0; }
    setTimeout(slideShow, imgDuration);
}
slideShow();