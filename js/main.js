(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });



    // DH&A: Gallery tabs (robust, works even if Bootstrap tabs fail)
    function dhaShowGalleryTab(targetSelector){
        const tabClass = document.querySelector('#Galerie .tab-class');
        if(!tabClass) return;
        const buttons = tabClass.querySelectorAll('[data-bs-target]');
        const panes = tabClass.querySelectorAll('.tab-pane');
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active','show'));
        const btn = tabClass.querySelector(`[data-bs-target="${targetSelector}"]`);
        const pane = tabClass.querySelector(targetSelector);
        if(btn) btn.classList.add('active');
        if(pane) pane.classList.add('active','show');
    }

    // Activate on nav click
    document.addEventListener('click', function(e){
        const btn = e.target.closest('#Galerie .tab-class [data-bs-toggle="pill"][data-bs-target]');
        if(!btn) return;
        e.preventDefault();
        dhaShowGalleryTab(btn.getAttribute('data-bs-target'));
    });

    // Open specific tab from CTA buttons
    document.addEventListener('click', function(e){
        const trigger = e.target.closest('[data-open-tab]');
        if(!trigger) return;
        const tabId = trigger.getAttribute('data-open-tab'); // e.g. tab-garten
        dhaShowGalleryTab(`#${tabId}`);
    });

    // Ensure initial state is correct
    document.addEventListener('DOMContentLoaded', function(){
        dhaShowGalleryTab('#tab-all');
    });

    // DH&A: Video modal (mp4)
    const mediaModal = document.getElementById('mediaModal');
    const mediaVideo = document.getElementById('mediaVideo');

    if(mediaModal){
        mediaModal.addEventListener('show.bs.modal', function (event) {
            const btn = event.relatedTarget;
            if(!btn) return;
            const src = btn.getAttribute('data-media-src');
            const type = btn.getAttribute('data-media-type');
            if(mediaVideo){ mediaVideo.pause(); mediaVideo.removeAttribute('src'); mediaVideo.load(); }
            if(type === 'video' && mediaVideo && src){
                // set video source and force reload so it works reliably across browsers
                mediaVideo.src = src;
                mediaVideo.load();
            }
        });

        mediaModal.addEventListener('hidden.bs.modal', function(){
            if(mediaVideo){
                mediaVideo.pause();
                mediaVideo.removeAttribute('src');
                mediaVideo.load();
            }
        });
    }

})(jQuery);