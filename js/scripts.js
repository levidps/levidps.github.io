// Ajax page load/history update/animation function
function pageLoad() {

    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    //  Catch all internally-focused links and push a new state.
    //  Note: External links will not be affected by this behavior.
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
        History.pushState({}, "", this.pathname);
    });

    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();
        $.get(State.url, function(data){    // Use AJAX to get the new content.
            document.title = data.match(/<title>(.*?)<\/title>/)[1];
            $('html,body').animate({scrollTop:0}, '600', 'swing');
            $('.content').fadeOut(600).queue( function() {
                $(this).html( $(data).find('.content') ).dequeue();
                s.refresh();
            }).fadeIn(500); // Pull the post we want out of the .content class.

                                                            // If you change the class of the post container,
                                                            // you must change it here!!!
            _gaq.push(['_trackPageview', State.url]);   // This updates Google Analytics with a visit to the new page.
                                                        // If you don't use Google Analytics, you can safety comment or
                                                        // remove that line.

            transition();


            $('.face h2').html(greet[t]);
            $('.face p').html(text[t]);

        });
    });

}

// Detect scroll direction
function scrollDirection() {
    $(function(){
        var lastScrollTop = 0, delta = 5;
        $(window).scroll(function(event){
           var st = $(this).scrollTop();
           
           if(Math.abs(lastScrollTop - st) <= delta)
              return;
           
           if (st > lastScrollTop && $(window).scrollTop() >= 350){
               // downscroll code
               $('.site-header .wrapper').addClass('hidden');
           } else {
              // upscroll code
              $('.site-header .wrapper').removeClass('hidden');
           }
           lastScrollTop = st;
        });
    });
}

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

    $('.face h2').html(greet[t]);
    $('.face p').html(text[t]);

}

// Init scripts
$(document).ready(function() {

    scrollDirection();
    pageLoad();
    social();
    about();

    setInterval(transition, 550);

});

// Document Scroll
$(window).scroll(function() {
    if ( $(window).scrollTop() <= $(window).height() ) {
        $('.post-header h1').css('margin-top', ($(window).scrollTop() * .325) + 'px' );
        $('.post-header h1').css('opacity', 1 - ($(window).scrollTop() * .00125) );
    }
});

