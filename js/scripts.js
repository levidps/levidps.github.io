
// Header logo (display social links )
function social() {
    $('.social-button').click(function() {
        $('body').toggleClass('active');
    });
}

// Navigation
function about() {
    $('.page-link').click(function() {
        var id = $(this).attr('data-id');

        $(this).toggleClass('visible');
        $('#' + id ).toggleClass('visible');
    });
}

// Cheeky face animation
var faces = ['^_^', '^_-', '^_^', '^_^', '>_<'],
    greet = [ "'sup" , "Hello," , 'Aloha,' , "Beunos dias," , 'Greetings,' , 'Howdy,' ],
    text  = [ 'sexy' , 'beautiful' , 'baby' , 'punk' , 'human' , 'legend' ],
    i     = 0,
    t     = Math.floor(Math.random() * 6) ;

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
    $('.face h2').html(greet[t]);
    $('.face p').html(text[t]);

    setInterval(transition, 550);

});
