(function ($) {
    "use strict";

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {opacity: 'show'},
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({id: 'mobile-nav'});
        $mobile_nav.find('> ul').attr({'class': '', 'id': ''});
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Stick the header at top on scroll
    $("#header").sticky({topSpacing: 0, zIndex: '50'});

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });
    
    // Date and time picker
    $('#date').datetimepicker({
        format: 'L'
    });
    $('#time').datetimepicker({
        format: 'LT'
    });
    
    // Cart Quantity
    $('.quantity').prepend('<span class="dec q-btn">-</span>');
    $('.quantity').append('<span class="inc q-btn">+</span>');
    $('.q-btn').on('click', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
    });
    
})(jQuery);

let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");

shuffleSlides();  // Shuffle slides before showing
showSlides();

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Function to shuffle the slides randomly
function shuffleSlides() {
    for (let i = slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        slides[i].parentNode.insertBefore(slides[j], slides[i].nextSibling);
    }
}

function fetchGoogleReviews() {
    // Mock data simulating API response
    const mockReviews = [
        {
            author_name: "John Doe",
            rating: 5,
            text: "Great service and high-quality products. Highly recommend!",
        },
        {
            author_name: "Jane Smith",
            rating: 4,
            text: "Good experience overall. The team was professional and the results were fantastic.",
        },
        {
            author_name: "Michael Brown",
            rating: 3,
            text: "Service was decent, but there were some delays in delivery.",
        }
    ];

    // Display mock reviews
    const reviewsContainer = document.getElementById('google-reviews');
    reviewsContainer.innerHTML = '';

    mockReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('testimonial-item');
        reviewElement.innerHTML = `
            <div class="testimonial-content">
                <h4>${review.author_name}</h4>
                <div class="rating">${'⭐'.repeat(review.rating)}</div>
                <p>${review.text}</p>
            </div>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

function openGoogleReview() {
    // Replace with your place ID
    const PLACE_ID = 'ChIJtZeocVenlR4Rk4syssqqFkY';
    window.open(`https://search.google.com/local/writereview?placeid=${PLACE_ID}`, '_blank');
}

// Simulate API call when the page loads
document.addEventListener('DOMContentLoaded', fetchGoogleReviews);
