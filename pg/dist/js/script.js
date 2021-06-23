jQuery(document).ready(function() {


    // document.cookie = "dark_mode=false; expires=Fri, 31 Dec 9999 23:59:59 GMT";

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    var mode_cookie_value = readCookie('dark_mode');
    if (mode_cookie_value === 'true') {
        jQuery(document.body).addClass('dark');
    }

    jQuery('.dark-contrast').click(function() {
        jQuery(document.body).addClass('dark');
        document.cookie = "dark_mode=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";

    });
    jQuery('.normal-contrast').click(function() {
        jQuery(document.body).removeClass('dark');
        document.cookie = "dark_mode=false; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        return false;
    });


    jQuery('.news .excerpt p').each(function(index) {
        if (jQuery(this).text().length > 130) {
            jQuery(this).text(jQuery(this).text().substring(0, 130) + ' ...')
        }
    });

    jQuery('.news .title a').each(function(index) {
        if (jQuery(this).text().length > 160) {
            jQuery(this).text(jQuery(this).text().substring(0, 160) + ' ...')
        }
    });

    var publication = 0;
    jQuery('.news .publication').each(function() {
        if (publication < jQuery(this).outerHeight()) {
            publication = jQuery(this).outerHeight();
        };
    });
    jQuery('.news .publication').outerHeight(publication);

    // jQuery('.navbar-nav a.nav-link').click(function(){
    //   jQuery('html, body').animate({
    //       scrollTop: jQuery( jQuery(this).attr('href') ).offset().top - 100
    //   }, {duration: 200});
    //
    //   jQuery('.navbar-nav a.nav-link').removeClass('active');
    //   jQuery(this).addClass('active');
    //   return false;
    // });
    jQuery('a.banner-link').click(function() {
        jQuery('html, body').animate({
            scrollTop: jQuery(jQuery(this).attr('href')).offset().top - 100
        }, {
            duration: 200
        });
        return false;
    });


    var navLiDesktop = 0;
    jQuery('.topbar__custom.desktop ul li').each(function() {
        if (navLiDesktop < jQuery(this).outerHeight()) {
            navLiDesktop = jQuery(this).outerHeight();
        };
    });
    jQuery('.topbar__custom.desktop ul li').outerHeight(navLiDesktop);

    var navLiMobile = 0;
    jQuery('.topbar__custom.phone ul li').each(function() {
        if (navLiMobile < jQuery(this).outerHeight()) {
            navLiMobile = jQuery(this).outerHeight();
        };
    });
    jQuery('.topbar__custom.phone ul li').outerHeight(navLiMobile);

    // if(jQuery(window).width() > 768 ){

    var faqsCategoryItemWrapper = 0;
    jQuery('.faqs-category-wrapper .faqs-category a').each(function() {
        if (faqsCategoryItemWrapper < jQuery(this).outerHeight()) {
            faqsCategoryItemWrapper = jQuery(this).outerHeight();
        };
    });
    jQuery('.faqs-category-wrapper .faqs-category a').outerHeight(faqsCategoryItemWrapper);

    // }




    jQuery('.collapse').on('shown.bs.collapse', function() {
        jQuery(this).parent().addClass('active');
    });

    jQuery('.collapse').on('hidden.bs.collapse', function() {
        jQuery(this).parent().removeClass('active');
    });


    $(document).on('shown.bs.collapse', '.collapse', function(e) {
        jQuery(this).parent().addClass('active');
    })
    $(document).on('shown.bs.hidden', '.collapse', function(e) {
        jQuery(this).parent().removeClass('active');
    })

    var stickyTop = jQuery('.header').offset().top;

    jQuery(window).scroll(function() {
        var windowTop = jQuery(window).scrollTop();

        if (stickyTop < windowTop) {
            jQuery('.header').addClass('shrink');
        } else {
            jQuery('.header').removeClass('shrink');
        }
    });




    // This section makes the search work.
    (function() {
        var searchTerm, panelContainerId;
        $('#accordion_search_bar').on('change keyup', function() {
            searchTerm = $(this).val();
            if (searchTerm.length == '' || searchTerm.length == '0') {
                $('.accordian-enclosed .panel').removeClass('border');
            }
            $('#accordion > .accordian-enclosed > .panel').each(function() {
                panelContainerId = '#' + $(this).attr('id');

                // Makes search to be case insesitive
                $.extend($.expr[':'], {
                    'contains': function(elem, i, match, array) {
                        return (elem.textContent || elem.innerText || '').toLowerCase()
                            .indexOf((match[3] || "").toLowerCase()) >= 0;
                    }
                });

                // END Makes search to be case insesitive


                // Show and Hide Triggers
                $(panelContainerId + ':not(:contains(' + searchTerm + '))').removeClass('active').hide(); //Hide the rows that done contain the search query.
                $(panelContainerId + ':contains(' + searchTerm + ')').addClass('active').show(); //Show the rows that do!



            });
        });
    }());


    var $myGroup = $('#accordion');
    $myGroup.on('show.bs.collapse', '.collapse', function() {
        $myGroup.find('.collapse').collapse('hide');
    });

    var hash, timeout = 0,
        poll = window.setInterval(function() {
            hash = $(window.location.hash);

            if (hash.length) {
                var jQuerytarget = jQuery('body').find(window.location.hash);
                if (jQuerytarget.hasClass('collapse')) {
                    var jQuerytargetAccordion = jQuerytarget.find('.collapse');
                    jQuerytarget.collapse('show');
                }
                $("html, body").animate({
                    scrollTop: hash.offset().top - 300
                });
                window.clearInterval(poll);

            } else if (timeout++ > 100) { // cancel the interval after 100 attempts (== 10s)
                window.clearInterval(poll);
            }
        }, 100);


    if (document.getElementById('faq-title-wrapper') != null) {
        fetch("dist/data/faqs.json").then(response => response.json()).then(data => {
                let faqData = '';
                faqData = '<div class="title">' + data.content[0].title + '</div><div class="subtitle">' + data.content[0].subtitle + '</div><div class="date"><i data-feather="clock"></i><span class="content">UPDATED AS ON ' + data.content[0].date + '</span></div>';
                document.getElementById('faq-title-wrapper').innerHTML = faqData;
                feather.replace();
            })
            .catch(function(e) {
                faqData = '<p style="text-align:left;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
                document.getElementById('faq-title-wrapper').innerHTML = faqData;
            });
    }


    fetch("dist/data/faqs.json").then(response => response.json()).then(data => {

            $('#accordion').each(function(i) {
                var acc = '';
                for (var j = 0; j < data.items.length; j++) {

                    acc = '<div class="category-title-wrapper" id="' + data.items[j].content_title_wrapper + '"><h4 class="title">' + data.items[j].category + '</h4></div><span id="' + data.items[j].content_title_wrapper + '"class="accordian-enclosed">'
                    for (var k = 0; k < data.items[j].content.length; k++) {

                        acc = acc + '<div class="panel ' + data.items[j].content[k].toggle + '" id="' + data.items[j].content[k].panel + '"><div class="panel-heading" role="tab" id="' + data.items[j].content[k].panel_heading + '"><h4 class="panel-title"><a id="" class="' + data.items[j].content[k].state + ' card-title" role="button" data-toggle="collapse" data-parent="#' + data.items[j].data_parent + '" data-target="#' + data.items[j].content[k].slug + '" aria-expanded="true" aria-controls="' + data.items[j].content[k].slug + '" data-ga-trigger="ga-event-tracking" data-ga-event-category="FAQs" data-ga-event-action="Click" data-ga-event-label="' + data.items[j].content[k].question + '">' + data.items[j].content[k].question + '</a></h4></div><div id="' + data.items[j].content[k].slug + '" class="collapse panel-collapse ' + data.items[j].content[k].visibility + '" role="tabpanel" data-parent="#' + data.items[j].data_parent + '" aria-labelledby="' + data.items[j].content[k].panel_heading + '"><div class="panel-body">' + data.items[j].content[k].answer + '</div></div></div>';
                    }
                    acc = acc + '</span>';
                    $(this).append(acc);
                }
            })

            $('#v-pills-tab').each(function(m) {
                var acc1 = '';
                for (var l = 0; l < data.items.length; l++) {
                    acc1 = '<li class="' + data.items[l].content_title_wrapper + '"><a class="nav-link ' + data.items[l].class + '" id="title-' + data.items[l].content_title_wrapper + '" data-toggle="pill" href="#' + data.items[l].content_title_wrapper + '" role="tab" aria-controls="' + data.items[l].content_title_wrapper + '" aria-selected="true"  data-ga-trigger="ga-event-tracking" data-ga-event-category="FAQs Category" data-ga-event-action="Click" data-ga-event-label="Desktop Category - ' + data.items[l].category + '"><span>' + data.items[l].category + '</span></a></li>';

                    $(this).append(acc1);
                }
            })

            $('.floating-category .item-wrapper .nav').each(function(m) {
                var acc2 = '';
                for (var l = 0; l < data.items.length; l++) {
                    // acc2 = '<div class="col-md-6 ' + data.items[l].content_title_wrapper + '"><a class="category ' + data.items[l].class + '" id="'+ data.items[l].content_title_wrapper + '"  href="#' + data.items[l].content_title_wrapper + '">' + data.items[l].category + '</a></div>';
                    acc2 = '<li class="' + data.items[l].content_title_wrapper + '"><a class="nav-link ' + data.items[l].class + '" id="title-' + data.items[l].content_title_wrapper + '" data-toggle="pill" href="#' + data.items[l].content_title_wrapper + '" role="tab" aria-controls="' + data.items[l].content_title_wrapper + '" aria-selected="true" data-ga-trigger="ga-event-tracking" data-ga-event-category="FAQs Category" data-ga-event-action="Click" data-ga-event-label="Mobile Category - ' + data.items[l].category + '"><span>' + data.items[l].category + '</span></a></li>';
                    $(this).append(acc2);
                }
            })
        })
        .catch(function(e) {
            acc = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('accordion').innerHTML = acc;
        });


    // slider
    var $carousel = $('.myths-and-facts-slider');
    var settings = {
        slidesToShow: 2,
        centerMode: false,
        centerPadding: '15px',
        // infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        fade: false,
        cssEase: "linear",
        lazyLoadlazyLoad: 'ondemand',
        prevArrow: $(".myths-and-facts-slider__prev"),
        nextArrow: $(".myths-and-facts-slider__next"),
        variableWidth: false,
        responsive: [{
                breakpoint: 1900,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    arrows: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    arrows: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                    dots: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: false
                }
            }
        ]
    };


    $carousel.slick(settings);

    var action = document.getElementById("accordion_search_bar")
    if (action) {
        action.addEventListener("keyup", function() {
            if (document.getElementById('accordion_search_bar').value.length == 0) {
                $('.category-title-wrapper').css({
                    'display': 'block'
                });
            } else {
                $('.category-title-wrapper').css({
                    'display': 'none'
                });
                $('.panel-group').css({
                    'margin-top': '30px'
                });
            }
        });
    }

    jQuery('.floating-category .cta').click(function() {
        jQuery('.floating-category .item-wrapper').toggleClass('open');
        return false;
    });
    jQuery('.floating-category .nav .nav-link').click(function() {
        // jQuery('.floating-category .item-wrapper').removeClass('open');
        // return false;
    });

    $(document).on('click', 'a[href^="#"]', function(e) {
        // target element id
        var id = $(this).attr('href');

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $id.offset().top - 100;

        // animated top scrolling
        $('body, html').animate({
            scrollTop: pos
        });
        jQuery('.floating-category .item-wrapper').removeClass('open');
    });

    $(".arrow-rotate").click(function() {
        $("#arrow-rotate svg").toggleClass('rotate');
    });

    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        var element = elementBottom > viewportTop && elementTop < viewportBottom;
        return elementBottom > viewportTop && elementTop < viewportBottom;

    };

    $(window).on('resize scroll', function() {
        $('.accordian-enclosed').each(function() {
            var activeColor = $(this).attr('id');


            if ($(this).isInViewport()) {
                jQuery('.nav li a').removeClass('active');
                jQuery('.nav li #title-' + activeColor).addClass('active');
                return false;

            }
        });
    });


    // Common side effects Faqs Aefi json data fetch

    var $accordionGroup = $('#accordion-aefi');
    $accordionGroup.on('show.bs.collapse', '.collapse', function() {
        $accordionGroup.find('.collapse').collapse('hide');
    });

    fetch("dist/data/faqs-aefi.json").then(response => response.json()).then(aefidata => {

            $('#accordion-aefi').each(function(i) {
                var accaefi = '';
                for (var j = 0; j < aefidata.items.length; j++) {

                    accaefi = '<span id="' + aefidata.items[j].content_title_wrapper + '"class="accordian-enclosed">'
                    for (var k = 0; k < aefidata.items[j].content.length; k++) {

                        accaefi = accaefi + '<div class="panel ' + aefidata.items[j].content[k].toggle + '" id="' + aefidata.items[j].content[k].panel + '"><div class="panel-heading" role="tab" id="' + aefidata.items[j].content[k].panel_heading + '"><h4 class="panel-title"><a id="" class="' + aefidata.items[j].content[k].state + ' card-title" role="button" data-toggle="collapse" data-parent="#' + aefidata.items[j].data_parent + '" data-target="#' + aefidata.items[j].content[k].slug + '" aria-expanded="true" aria-controls="' + aefidata.items[j].content[k].slug + '" data-ga-trigger="ga-event-tracking" data-ga-event-category="FAQs-AEFI" data-ga-event-action="Click" data-ga-event-label="AEFI - ' + aefidata.items[j].content[k].question + '" >' + aefidata.items[j].content[k].question + '</a></h4></div><div id="' + aefidata.items[j].content[k].slug + '" class="collapse panel-collapse ' + aefidata.items[j].content[k].visibility + '" role="tabpanel" data-parent="#' + aefidata.items[j].data_parent + '" aria-labelledby="' + aefidata.items[j].content[k].panel_heading + '"><div class="panel-body">' + aefidata.items[j].content[k].answer + '</div></div></div>';
                    }
                    accaefi = accaefi + '</span>';

                    $(this).append(accaefi);
                }
            })
        })
        .catch(function(e) {
            accaefi = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('accordion-aefi').innerHTML = accaefi;
        });

    $(document).on('shown.bs.collapse', '.collapse', function(e) {
        jQuery(this).parent().addClass('active');
    })
    $(document).on('shown.bs.hidden', '.collapse', function(e) {
        jQuery(this).parent().removeClass('active');
    })


    fetch("dist/data/videos.json").then(response => response.json()).then(video_home_data => {

            $('#video-gallery-slider').each(function(i) {
                var video_home = '';
                for (var j = 0; j < 4; j++) {

                    video_home = '<div class="custom-offset-slider-item" ><div class="item-wrapper"><a href="javascript:;" onclick="window.open(\'' + video_home_data.items[j].video_url + '\', \'YT\',  \'width=600,height=400\');" data-ga-trigger="ga-event-tracking" data-ga-event-category="Home" data-ga-event-action="Click" data-ga-event-label="Video - ' + video_home_data.items[j].title + '" ><img src="./dist/images/yt/' + video_home_data.items[j].thumbnail + '" class="lazy"/></a><a href="javascript:;" onclick="window.open(\'' + video_home_data.items[j].video_url + '\', \'YT\',  \'width=600,height=400\');" data-ga-trigger="ga-event-tracking" data-ga-event-category="Home" data-ga-event-action="Click" data-ga-event-label="Video - ' + video_home_data.items[j].title + '"> ' + video_home_data.items[j].title + '</a></div></div>';

                    $(this).append(video_home);
                }
            })

            $('.video-gallery-slider').slick({
                slidesToShow: 2,
                centerMode: false,
                centerPadding: '15px',
                // infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                speed: 500,
                fade: false,
                cssEase: "linear",
                lazyLoadlazyLoad: 'ondemand',
                // arrows:true,
                appendArrows: true,
                prevArrow: $(".video-gallery-slider-arrow-wrapper .custom-offset-slider__prev"),
                nextArrow: $(".video-gallery-slider-arrow-wrapper .custom-offset-slider__next"),
                variableWidth: false,
                responsive: [{
                        breakpoint: 1900,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            arrows: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            arrows: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            arrows: false,
                            dots: false,
                            autoplay: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: false
                        }
                    }
                ]
            });

            $('.video-gallery-wrapper-inner').each(function(i) {

                for (var j = 0; j < video_home_data.items.length; j++) {

                    video_gallery = '<div class="col-12 col-md-4 item-wrapper"><div class="item"><div class="video-thumbnail"> <a href="javascript:;" onclick="window.open(\'' + video_home_data.items[j].video_url + '\', \'YT\',  \'width=600,height=400\');" data-ga-trigger="ga-event-tracking" data-ga-event-category="Video Gallery" data-ga-event-action="Click" data-ga-event-label="' + video_home_data.items[j].title + '" ><img src="./dist/images/yt/' + video_home_data.items[j].thumbnail + '" class="lazy"/> </a></div><div class="video-title"> <a href="javascript:;" onclick="window.open(\'' + video_home_data.items[j].video_url + '\', \'YT\', \'width=600,height=400\');" data-ga-trigger="ga-event-tracking" data-ga-event-category="Video Gallery" data-ga-event-action="Click" data-ga-event-label="' + video_home_data.items[j].title + '" >' + video_home_data.items[j].title + '</a></div></div></div>';

                    $(this).append(video_gallery);
                }
            })

            // setTimeout(function(){
            jQuery(function() {

                jQuery(".video-gallery-wrapper .item-wrapper").slice(0, 6).show();
                jQuery(".video-gallery #loadMore").on('click', function(e) {

                    e.preventDefault();
                    jQuery(".video-gallery-wrapper .item-wrapper:hidden").slice(0, 3).slideDown('fast');
                    if (jQuery(".video-gallery-wrapper .item-wrapper:hidden").length == 0) {
                        jQuery(".video-gallery #loadMore").fadeOut('slow');
                    }
                    jQuery('html,body').animate({
                        scrollTop: jQuery(this).offset().top + 500
                    }, 100);
                });
            });
            // }, 1000);

        })
        .catch(function(e) {
            video_home = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('video-gallery-slider').innerHTML = video_home;
            video_gallery = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('video-gallery-wrapper-inner').innerHTML = video_gallery;
        });




    fetch("dist/data/important-information.json").then(response => response.json()).then(important_documents_data => {

            $('#important-documents-slider').each(function(i) {
                var important_documents_home = '';
                for (var j = 0; j < 4; j++) {
                    important_documents_home = '<div class="custom-offset-slider-item" ><div class="item-wrapper shadow mb-4"> <a href="' + important_documents_data.items[j].document_url + '" target="_blank" data-ga-trigger="ga-event-tracking" data-ga-event-category="Home" data-ga-event-action="Click" data-ga-event-label="Important Document - ' + important_documents_data.items[j].title + '"><div class="category ' + important_documents_data.items[j].category_class + '"><span>' + important_documents_data.items[j].category + '</span></div><div class="date"><p>' + important_documents_data.items[j].date + '</p></div><div class="title"><p>' + important_documents_data.items[j].title + '</p></div><div class="cta"><svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="18.121" viewBox="0 0 17.5 18.121"> <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(-6.75 -6.439)"> <path id="Path_23" data-name="Path 23" d="M7.5,18h16" transform="translate(0 -2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/> <path id="Path_24" data-name="Path 24" d="M18,7.5l8,8-8,8" transform="translate(-2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/> </g> </svg></div> </a></div></div>'

                    $(this).append(important_documents_home);
                }
            })




            $('.important-documents-slider').slick({
                slidesToShow: 2,
                centerMode: false,
                centerPadding: '15px',
                // infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                speed: 500,
                fade: false,
                cssEase: "linear",
                lazyLoadlazyLoad: 'ondemand',
                // arrows:true,
                appendArrows: true,
                prevArrow: $(".important-documents-slider-slider-arrow-wrapper .custom-offset-slider__prev"),
                nextArrow: $(".important-documents-slider-slider-arrow-wrapper .custom-offset-slider__next"),
                variableWidth: false,
                responsive: [{
                        breakpoint: 1900,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            arrows: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            infinite: true,
                            arrows: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            arrows: false,
                            dots: false,
                            autoplay: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: false
                        }
                    }
                ]
            });

            var importantInformationItemWrapper = 0;
            jQuery('.important-documents-slider .item-wrapper').each(function() {
                if (importantInformationItemWrapper < jQuery(this).outerHeight()) {
                    importantInformationItemWrapper = jQuery(this).outerHeight();
                };

            });
            jQuery('.important-documents-slider .item-wrapper').outerHeight(importantInformationItemWrapper);



            $('.important-information .important-information-wrapper').each(function(i) {
                var important_documents = '';
                for (var j = 0; j < important_documents_data.items.length; j++) {
                    // important_documents = '<div class="col-12 col-md-4 item"><div class="item-wrapper shadow mb-4"> <a href="' + important_documents_data.items[j].document_url + '" target="_blank" data-ga-trigger="ga-event-tracking" data-ga-event-category="Important Document" data-ga-event-action="Click" data-ga-event-label="Important Document - ' + important_documents_data.items[j].title + '"><div class="category ' + important_documents_data.items[j].category_class + '"><span>' + important_documents_data.items[j].category + '</span></div><div class="date"><p>' + important_documents_data.items[j].date + '</p></div><div class="title"><p>' + important_documents_data.items[j].title + '</p></div><div class="cta"> <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="18.121" viewBox="0 0 17.5 18.121"> <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(-6.75 -6.439)"> <path id="Path_23" data-name="Path 23" d="M7.5,18h16" transform="translate(0 -2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /> <path id="Path_24" data-name="Path 24" d="M18,7.5l8,8-8,8" transform="translate(-2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /> </g> </svg></div> </a></div></div>'
                    important_documents = '<div class="col-12 col-md-4 item"> <a href="' + important_documents_data.items[j].document_url + '" target="_blank" data-ga-trigger="ga-event-tracking" data-ga-event-category="Important Document" data-ga-event-action="Click" data-ga-event-label="Important Document - ' + important_documents_data.items[j].title + '"><div class="item-wrapper shadow mb-4"><div class="category ' + important_documents_data.items[j].category_class + '"><span>' + important_documents_data.items[j].category + '</span></div><div class="date"><p>' + important_documents_data.items[j].date + '</p></div><div class="title"><p>' + important_documents_data.items[j].title + '</p></div><div class="cta"> <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="18.121" viewBox="0 0 17.5 18.121"> <g id="Icon_feather-arrow-right" data-name="Icon feather-arrow-right" transform="translate(-6.75 -6.439)"> <path id="Path_23" data-name="Path 23" d="M7.5,18h16" transform="translate(0 -2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /> <path id="Path_24" data-name="Path 24" d="M18,7.5l8,8-8,8" transform="translate(-2.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" /> </g> </svg></div></div> </a></div>';
                    $(this).append(important_documents);
                }
            })

            if (jQuery(window).width() > 768) {
                var importantInformationItem = 0;
                jQuery('.important-information .important-information-wrapper .item').each(function() {
                    if (importantInformationItem < jQuery(this).outerHeight()) {
                        importantInformationItem = jQuery(this).outerHeight();
                    };

                });
                jQuery('.important-information .important-information-wrapper .item .item-wrapper').outerHeight(importantInformationItem);
            }

            jQuery(function() {


                jQuery(".important-information .important-information-wrapper .item").slice(0, 6).show();

                if (jQuery(".important-information .important-information-wrapper .item:hidden").length === 0) {
                    jQuery(".important-information #loadMore").fadeOut('slow');
                }
                jQuery(".important-information #loadMore").on('click', function(e) {
                    e.preventDefault();
                    jQuery(".important-information .important-information-wrapper .item:hidden").slice(0, 3).slideDown('fast');
                    if (jQuery(".important-information .important-information-wrapper .item:hidden").length == 0) {
                        jQuery(".important-information #loadMore").fadeOut('slow');
                    }
                    jQuery('html,body').animate({
                        scrollTop: jQuery(this).offset().top + 500
                    }, 100);
                });
            });



        })
        .catch(function(e) {
            important_documents_home = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('important-documents-slider').innerHTML = important_documents_home;
            important_documents = '<p style="text-align: center;padding-top: 10px;font-size: 12px;color: #868686;">Something went wrong, please try again!</p>';
            document.getElementById('.important-information .important-information-wrapper').innerHTML = important_documents;
        });




    $('.lazy').Lazy({
        // your configuration goes here
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        onError: function(element) {
            console.log('error loading ' + element.data('src'));
        }
    });




    // Fontsize increase, decrease, samesize

    setTimeout(function() {

        // $('[data-ga-trigger=ga-event-tracking]').click(function() {
        //     gtag('event', $(this).attr('data-ga-event-action'), {
        //         'event_category': $(this).attr('data-ga-event-category'),
        //         'event_label': $(this).attr('data-ga-event-label')
        //     });
        //
        // });

        var jQueryaffectedElements = jQuery("p, a, .title, .subtitle,.card-title, .panel-body").not('.topbar__custom li a, .site-meta a, .site-meta, .navbar-nav li.nav-item, .navbar-nav li.nav-item a');

        var countInc = 0;
        var countDec = 0;
        jQueryaffectedElements.each(function() {
            var jQuerythis = jQuery(this);
            jQuerythis.data("orig-size", jQuerythis.css("font-size"));
        });

        jQuery("#increaseFont").click(function() {

            if (countInc < 3) {
                changeFontSize(1);
                countInc++;
                countDec--;
            }
        })

        jQuery("#decreaseFont").click(function() {
            // countInc--;
            if (countDec < 3) {
                changeFontSize(-1);
                countDec++;
                countInc--;
            }
        })


        jQuery("#sameFont").click(function() {
            jQueryaffectedElements.each(function() {
                var jQuerythis = jQuery(this);
                jQuerythis.css("font-size", jQuerythis.data("orig-size"));
            });
        })

        jQuery("#increaseFontMob").click(function() {
            // countDec--;
            if (countInc < 3) {
                changeFontSize(1);
                countInc++;
                countDec--;
            }
        })

        jQuery("#decreaseFontMob").click(function() {
            // countInc--;
            if (countDec < 3) {
                changeFontSize(-1);
                countDec++;
                countInc--;
            }
        })


        jQuery("#sameFontMob").click(function() {
            jQueryaffectedElements.each(function() {
                var jQuerythis = jQuery(this);
                jQuerythis.css("font-size", jQuerythis.data("orig-size"));
            });
        })

        function changeFontSize(direction) {
            jQueryaffectedElements.each(function() {
                var jQuerythis = jQuery(this);
                jQuerythis.css("font-size", parseInt(jQuerythis.css("font-size")) + direction);
            });
        }

    }, 1000);


    $('.header-carousel').slick({
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: true,
        fade: true,
    });

});

// Fontsize increase, decrease, samesize
var jQueryaffectedElements = jQuery("p, a, .title, .subtitle, .card-title, .panel-body, .date, .nav-link").not('.topbar__custom li a, .site-meta a, .site-meta, .navbar-nav li.nav-item, .navbar-nav li.nav-item a');
// var jQueryaffectedElements = jQuery("p, a, .title, .subtitle, .card-title, .panel-body, .date, .nav-link").not('.topbar__custom li a, .site-meta a, .site-meta, .navbar-nav li.nav-item, .navbar-nav li.nav-item a');
var countInc = 0;
var countDec = 0;
jQueryaffectedElements.each(function() {
    var jQuerythis = jQuery(this);
    jQuerythis.data("orig-size", jQuerythis.css("font-size"));
});

jQuery("#increaseFont").click(function() {
    // countDec--;
    if (countInc < 3) {
        changeFontSize(1);
        countInc++;
        countDec--;
    }
})

jQuery("#decreaseFont").click(function() {
    // countInc--;
    if (countDec < 3) {
        changeFontSize(-1);
        countDec++;
        countInc--;
    }
})


jQuery("#sameFont").click(function() {
    jQueryaffectedElements.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.css("font-size", jQuerythis.data("orig-size"));
    });
})

jQuery("#increaseFontMob").click(function() {
    // countDec--;
    if (countInc < 3) {
        changeFontSize(1);
        countInc++;
        countDec--;
    }
})

jQuery("#decreaseFontMob").click(function() {
    // countInc--;
    if (countDec < 3) {
        changeFontSize(-1);
        countDec++;
        countInc--;
    }
})


jQuery("#sameFontMob").click(function() {
    jQueryaffectedElements.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.css("font-size", jQuerythis.data("orig-size"));
    });
})

function changeFontSize(direction) {
    jQueryaffectedElements.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.css("font-size", parseInt(jQuerythis.css("font-size")) + direction);
    });
}

// $("#increaseFont").click(function() {
// Fontsize increase, decrease, samesize
var jQueryaffectedElements = jQuery("p, a, .title, .subtitle, .card-title, .panel-body, .date, .nav-link").not('.topbar__custom li a, .site-meta a, .site-meta, .navbar-nav li.nav-item, .navbar-nav li.nav-item a');
// var jQueryaffectedElements = jQuery("p, a, .title, .subtitle, .card-title, .panel-body, .date, .nav-link").not('.topbar__custom li a, .site-meta a, .site-meta, .navbar-nav li.nav-item, .navbar-nav li.nav-item a');
var countInc = 0;
var countDec = 0;
jQueryaffectedElements.each(function() {
    var jQuerythis = jQuery(this);
    jQuerythis.data("orig-size", jQuerythis.css("font-size"));
});

jQuery("#increaseFont").click(function() {
    // countDec--;
    if (countInc < 3) {
        changeFontSize(1);
        countInc++;
        countDec--;
    }
})

jQuery("#decreaseFont").click(function() {
    // countInc--;
    if (countDec < 3) {
        changeFontSize(-1);
        countDec++;
        countInc--;
    }
})


jQuery("#sameFont").click(function() {
    jQueryaffectedElements.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.css("font-size", jQuerythis.data("orig-size"));
    });
})

jQuery("#increaseFontMob").click(function() {
    // countDec--;
    if (countInc < 3) {
        changeFontSize(1);
        countInc++;
        countDec--;
    }
})

jQuery("#decreaseFontMob").click(function() {
    // countInc--;
    if (countDec < 3) {
        changeFontSize(-1);
        countDec++;
        countInc--;
    }
})


jQuery("#sameFontMob").click(function() {
    jQueryaffectedElements.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.css("font-size", jQuerythis.data("orig-size"));
    });
})


// });

//# sourceMappingURL=maps/script.js.map