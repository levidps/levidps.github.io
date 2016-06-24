
// Header logo (display social links )
function social() {
    $('.logo').click(function() {
        $('body').toggleClass('active');
    });
}

// Navigation
function about() {
    $('#about').click(function() {
        $('#aboutSection').fadeToggle(400);
    });
}

// Cheeky face animation
var faces = ['^_^', '^_-', '^_^', '^_^', '>_<'],
    text  = ['beautiful', 'sexy', 'bae', 'adj.', 'punk', 'human'],
    i     = 0,
    t     = Math.floor(Math.random() * 6) + 1 ;

function transition() {

    if (i == faces.length - 1) {
        $('.face h1').html(faces[i]);
         i = 0;
    } else {
        $('.face h1').html(faces[i]);
         i++;
    }

}


// Init scripts
$(document).ready(function() {

    social();
    about();
    $('.face p').html(text[t]);

    setInterval(transition, 550);

});
