jQuery( function($) { 

    // Swiper Functions
    var initSwiper = function(el) {

        var mySwiper = new Swiper(el, {
            speed: 500,
            spaceBetween: 25,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            centeredSlides: true,
            slidesPerView: 1.25,
            keyboardControl: true,
        });

    };

    // Ajax page load/history update/animation :)
    var pageLoad = function() {
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
                $('body').removeClass('active_nav');
                $('html,body').animate({top: '-50px'}, '800', 'linear');
                $('.content').delay(300).fadeOut(600).queue( function() {
                    $(this).html( $(data).find('.content') ).dequeue();
                    if ( $('.swiper-container').length >= 1 ) {
                        initSwiper('.swiper-container');
                    }
                    $('html,body').css('top', '0px');
                    // s.refresh();
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
    };
    // End ajaxy page load :P


    // Toggle class javascirpt function - provide element and class to toggle
    var classToggle = function(el, className) {
        if ( !el || !className ) { return; }
        
        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0) {
            classes.splice(existingIndex, 1); } 
          else { classes.push(className); }

          el.className = classes.join(' ');
        }
    };

    // Aria toggle to toggle various aria attibutes - Element / Aria Attirube / Starting Value / Secondary Value
    var toggleAria = function( el, aria, v1, v2) {
        if ( el.getAttribute( aria ) === v1 ) {
            el.setAttribute( aria , v2 );
        } else {
            el.setAttribute( aria , v1 );
        }
    };



    // Detect scroll direction
    var scrollFunctions = function() {
        var lastScrollTop = 0, delta = 5;

        window.addEventListener('scroll', function() {

           var st = window.scrollY;
           var wrapper = document.querySelector('.site-header .wrapper');
           
           if(Math.abs(lastScrollTop - st) <= delta)
              return;
           
           if (st > lastScrollTop && window.scrollY >= wrapper.clientHeight ){
               // downscroll code
               document.body.classList.add('ui_internal');
           } else {
              // upscroll code
               document.body.classList.remove('ui_internal');
           }
           lastScrollTop = st;


            if (st > window.innerHeight ) {
                document.body.classList.add('masthead_visible');
            } else {
                $('.post-header .wrapper').css({
                    transform: 'translateY(' + st * .325 + 'px)',
                    opacity: 1 - (st * .0025),
                });
                document.body.classList.remove('masthead_visible');
            }

            $('.js-animate').each( function() {
                var top = $(this).offset().top;
                var h = $(this).height();
                var wh = window.innerHeight;

                if ( top >= st && top + h <= st + wh ) {
                    $(this).addClass('is_visible');
                } else {
                    $(this).removeClass('is_visible');
                }
            });


       });
    };
    // end scroll detection


    // functions for menu toggle ( aria expanded and body class )
    var menuFunctions = function() {

        var menuToggle = document.getElementById('menuToggle');

        // menu click functions
        menuToggle.addEventListener('click', function(event) {

            // menu specific variables
            var classTest = 'active_nav';
            var element = document.body;
            var aria = 'aria-expanded';

            // Prevent default -> toggle body class -> toggle aria
            event.preventDefault();
            classToggle(element, classTest);
            toggleAria(menuToggle, aria, 'true', 'false');
        });

    };

    // Init scripts
    window.addEventListener('load', function() {

        initSwiper('.swiper-container');

        pageLoad();
        menuFunctions();

        window.requestAnimationFrame( scrollFunctions() );        


    });


});

