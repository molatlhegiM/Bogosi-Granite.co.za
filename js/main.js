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





















const apiKey = 'AIzaSyBMs-DsB6pg3VEwNZsNmNwgj2EmbnjNwCQ'; // Example Place ID for BGT Granite and Tombstones Pty Ltd
const PLACE_ID = 'ChIJtZeocVenlR4Rk4syssqqFkY';
function openGoogleReview() {
    // Now PLACE_ID can be used safely
}
const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.result.reviews) {
            const reviews = data.result.reviews;
            displayReviews(reviews);
        } else {
            console.error("Error fetching reviews:", data.error_message);
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('google-reviews');
    reviewsContainer.innerHTML = ''; // Clear any existing reviews

    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'testimonial-item';

        reviewElement.innerHTML = `
            <div class="testimonial-content">
                <div class="img">
                    <img src="${review.profile_photo_url || 'default-avatar.jpg'}" class="testimonial-img" alt="${review.author_name}">
                </div>
                <h4>${review.author_name}</h4>
                <h5>${'⭐'.repeat(Math.round(review.rating))}</h5>
                <p>${review.text}</p>
            </div>
        `;

        reviewsContainer.appendChild(reviewElement);
    });

    // Initialize the Owl Carousel or your preferred slider library here
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
}

function openGoogleReview() {
    const reviewLink = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
    window.open(reviewLink, '_blank');
}

// Fetch reviews when the page loads
document.addEventListener('DOMContentLoaded', fetchGoogleReviews);
