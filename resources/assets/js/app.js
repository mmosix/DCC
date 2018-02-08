try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap')
} catch (e) {}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

(function ($) {
// start function mobile navigation
    mobile_nav = function () {
        var mb;
        jQuery('#menu-btn').on("click", function () {
            var iteration = $(this).data('iteration') || 1;
            switch (iteration) {
                case 1:
                    mb = 1;
                    var h = jQuery('#mainmenu').css("height");
                    jQuery('header').stop().animate({
                        "height": h
                    }, 400);
                    break;

                case 2:
                    jQuery('header').stop().animate({
                        "height": "80px"
                    }, 400);
                    mb = 0;
                    break;
            }
            iteration++;
            if (iteration > 2) iteration = 1;
            $(this).data('iteration', iteration);
        });
    }
// close function mobile navigation

    jQuery(document).ready(function(){

        // hide preloader
        jQuery('#preloader').delay(500).fadeOut(500);

        // start function anim
        anim = function () {
            jQuery('.animated').each(function () {
                var imagePos = jQuery(this).offset().top;
                var topOfWindow = jQuery(window).scrollTop();
                if (imagePos < topOfWindow + 500) {
                    jQuery(this).fadeTo(1, 500);
                    var $anim = jQuery(this).attr('data-animation')
                    jQuery(this).addClass($anim);
                }
            });
        }
        // close function anim

        var $header = jQuery("header"),
            $clone = $header.before($header.clone().addClass("clone"));
        jQuery(window).on("scroll", function () {
            var fromTop = jQuery(window).scrollTop();
            jQuery("body").toggleClass("down", (fromTop > 240));
            anim();
        });

        mobile_nav();
    });
})(jQuery);