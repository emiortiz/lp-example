/**
* Template Name: Selecao - v2.2.0
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

  
})(jQuery);


// Llamada a todos los elementos con la clase '.sheet-write'
const sheetsWrite = document.querySelectorAll('.sheet-write');
sheetsWrite.forEach(sheetWrite => {
    const dataSet = sheetWrite.dataset;
    let words = JSON.parse(dataSet.words);
    // Reducir elementos para evitar valores indefinidos o repetidos
    let clean_words = words.reduce((acc,cur)=>{
        if(cur && cur.trim() != ""){
            acc.push(cur);
        }
        return acc
    },[])
    let all_words = clean_words.filter((el, index) => {
        let reduce_words = [];
        if (index >= 0) {
            if(clean_words.length > 1){
                if (words[index - 1] != words[index] && el) {
                    reduce_words.push(el)
                    return reduce_words
                }
            }else{
                reduce_words.push(el)
                return reduce_words
            }

        }
    });
    let all_words_length = all_words.length;
    // Si el array se encuentra vacio no se ejecuta nada
    if (!all_words) return;
    // Crear cursor parpadeante al final del texto
    let blinkTxtCursor = document.createElement('span');
    blinkTxtCursor.classList.add('blink-cursor');
    blinkTxtCursor.textContent = '|';
    sheetWrite.parentElement.appendChild(blinkTxtCursor);
    // Datasets
    let init_delay = dataSet.initdelay ? dataSet.initdelay : 10,
        write_speed = dataSet.writespeed ? dataSet.writespeed : 100,
        delete_speed = dataSet.deletespeed ? dataSet.deletespeed : 40,
        delay_delete = dataSet.delaydelete ? dataSet.delaydelete : 5000,
        infinite = dataSet.infinite ? false : true;
    let continue_interval = true,
        continue_loop = true,
        limit_back = 0,
        counter_interval = 0,
        current_word = 0;
    // Intervalo de tiempo para crear el efecto de maquina de escribir
    setInterval(function () {
        if (continue_interval) {
            counter_interval++;
        }
        if (counter_interval >= init_delay * current_word) {
            continue_interval = false;
            let letters = all_words[current_word].split(''),
                letters_lenght = letters.length,
                letter_index = 0;
            // Intervalo de escritura
            let write = setInterval(function () {
                if (letter_index >= limit_back) {
                    sheetWrite.innerHTML += letters[letter_index];
                }
                letter_index++;
                if (letter_index >= letters_lenght) {
                    blinkTxtCursor.classList.add('stop-write');
                    if (current_word >= all_words_length && !infinite || all_words_length <= 1) {
                        continue_loop = false;
                    }
                    if (continue_loop) {
                        // Despues de que termine el tiempo asignado en la variable ( delay_delete ) se ejecuta el siguiente proceso
                        setTimeout(function () {
                            // Remueve la clase 'stop-write' para quitar el parpadeo al elemento ( blinkTxtCursor )
                            blinkTxtCursor.classList.remove('stop-write');
                            let deleteInterval = setInterval(function () {
                                // Comparar la letra anterior con la letra actual
                                let current_compare_letters = '',
                                    prev_compare_letters = '';
                                if (current_word >= all_words_length) {
                                    current_compare_letters = all_words[current_word - 1].split('');
                                    prev_compare_letters = all_words[0].split('');
                                }
                                if (current_word > 0 && current_word < all_words_length) {
                                    current_compare_letters = all_words[current_word].split('');
                                    prev_compare_letters = all_words[current_word - 1].split('');
                                }
                                limit_back = 0;
                                let a = 0;
                                while (true) {
                                    if (prev_compare_letters[a] == current_compare_letters[a]) {
                                        limit_back++;
                                    } else {
                                        break;
                                    }
                                    a++;
                                }
                                // Eliminar letra por letra 
                                if (letter_index >= limit_back) {
                                    sheetWrite.innerHTML = all_words[current_word - 1].slice(0, letter_index);
                                }
                                letter_index--;
                                if (letter_index < 0) {
                                    if (current_word >= all_words_length) {
                                        // Reiniciar valores
                                        setTimeout(function () {
                                            current_word = 0;
                                            counter_interval = 0;
                                            continue_interval = true;

                                        }, write_speed)
                                    } else {
                                        continue_interval = true;
                                    }
                                    clearInterval(deleteInterval);
                                }
                            }, delete_speed);

                        }, delay_delete)
                    }
                    clearInterval(write);
                }
            }, write_speed);
            current_word++;
        }
    });
})