// -----------------js mediaquerys--------------------*/

function mediaQJS(w) {
    var navM = $('.js--main-nav');
    if (w.matches) { // If media query matches
        //if smaller than 767
    } else {
        //if bigger than 768
        // remove inline style from section-nav__main after resizing 
        if (navM.css('display') != null) {
            navM.removeAttr("style");
        }
    }
}

var w = window.matchMedia("(max-width: 768px)")
mediaQJS(w) // Call listener function at run time
w.addListener(mediaQJS) // Attach listener function on state changes 

// ----------------- end js mediaquerys--------------------*/
// -----------------waypoints--------------------*/

$(document).ready(function () {
    $('.js--section-introduction').waypoint(function (direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '15%'
    })


    /* mobile hamburger */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link')
    navToggle.addEventListener('click', () => {
        var navR = $('.js--main-nav');
        document.body.classList.toggle('nav-closed');
        document.body.classList.toggle('nav-open');
        navR.slideToggle(300);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('nav-open');
            document.body.classList.remove('nav-closed');
        })
    })

    /* mobile navigation*/
    /*
    $('.js-nav-icon').click(function () {
        var navR = $('.js--main-nav');
        var navI = $('.js-nav-icon i');
        navR.slideToggle(300);
        if (navI.hasClass('fa-align-justify')) {
            navI.addClass('fa-times');
            navI.removeClass('fa-align-justify');

        } else {
            navI.addClass('fa-align-justify');
            navI.removeClass('fa-times');
        }
    });
*/
    // ----------------- end waypoints--------------------*/

    // -----------------smooth scroll--------------------*/
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    // -----------------smooth scroll--------------------*/

    // -----------------language--------------------*/

    // Initialization
    $.sls.init({
        defaultLang: "en",
        path: "/resources/js/languages/",
        persistent: true,
        clean: true,
        attributes: ["title", "data-my-custom-attribute"],
        observe: document
    });

    // Event hook example
    $(document).on("jquery-sls-language-switched", function (event) {
        // Make select element reflect current language if language loaded from persistence
        if ($('#lang-switcher').val != $.sls.getLang()) {
            $('#lang-switcher').val($.sls.getLang());
        }
        console.log("Language switched: " + event.message);
    });

    // -----------------recaptcha--------------------*/
/*
    $('#contact-form').on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: "mail.php",
            method: "POST",
            data: $(this).serialize(),
            dataType: "json",
            beforeSend: function () {
                $('#register').attr('disabled', 'disabled');
            },
            success: function (data) {
                $('#register').attr('disabled', false);
                if (data.success) {
                    $('#captcha_form')[0].reset();
                    $('#name_error').text('');
                    $('#email_error').text('');
                    $('#interest_error').text('');
                    $('#message_error').text('');
                    $('#captcha_error').text('');
                    grecaptcha.reset();
                    alert('Form Successfully validated');
                } else {
                    $('#name_error').text(data.name_error);
                    $('#email_error').text(data.email_error);
                    $('#interest_error').text(data.interest_error);
                    $('#message_error').text(data.message_error);
                    $('#captcha_error').text(data.captcha_error);
                }
            }
        })
    });*/
    // -----------------recaptcha--------------------*/


});


function selectLanguage(select) {
    $.sls.setLang(select.value);
}

// ----------------- end language--------------------*/

// ----------------- lightbox--------------------*/
var initPhotoSwipeFromDOM = function (gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');
// ----------------- end lightbox--------------------*/
// ----------------- GOOGLE CHPTCHA--------------------*/

const publicKey = ""; //GOOGLE public key

// Get token from API
function check_grecaptcha() {
    grecaptcha.ready(function () {
        grecaptcha.execute(publicKey, {
            action: "ajaxForm"
        }).then(function (token) {
            $("[name='recaptcha-token']").val(token);
        });
    });
}

$(function() {
    check_grecaptcha();
    $("form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 5
            }
        },
        // Customize your messages
        messages: {
            name: {
                required: "Please enter your name.",
                minlength: "Must be at least 3 characters long."
            },
            email: "Please enter a valid email.",
            message: {
                required: "Please enter your message.",
                minlength: "Must be at least 5 characters long."
            }
        },
        errorClass: "invalid-feedback",
        highlight: function (element) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        submitHandler: function (form) {
            $(".spinner-border").removeClass("d-none");
            $.get(form.action, $(form).serialize())
                .done(function (response) {
                    $(".toast-body").html(JSON.parse(response));
                    $(".toast").toast('show');
                    $(".spinner-border").addClass("d-none");
                    $("#submit-btn").prop("disabled", true);
                    check_grecaptcha();
                    setTimeout(function () {
                        $("#submit-btn").prop("disabled", false);
                        $("form").trigger("reset");
                        $("form").each(function () {
                            $(this).find(".form-control").removeClass("is-valid")
                        })
                    }, 3000);
                })
                .fail(function (response) {
                    $(".toast-body").html(JSON.parse(response));
                    $(".toast").toast('show');
                    $(".spinner-border").addClass("d-none");
                });
        }
    });
});


// ----------------- GOOGLE CHPTCHA--------------------*/
