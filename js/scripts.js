
// Header logo (display social links )
function social() {
    $('.logo').click(function() {
        $('body').toggleClass('active');
    });
}


// Cheeky face animation
var faces = ['^_^', '^_-', '^_^', '^_^', '>_<'],
    text = ['happy', 'cheeky', 'happy', 'happy', 'dead'],
    i     = 0;

function transition() {

    if (i == faces.length - 1) {
        $('.face h1').html(faces[i]);
        $('.face p').html(text[i]);
         i = 0;
    } else {
        $('.face h1').html(faces[i]);
        $('.face p').html(text[i]);
         i++;
    }


}


// Init scripts
$(document).ready(function() {

    social();

    setInterval(transition, 550);

});
