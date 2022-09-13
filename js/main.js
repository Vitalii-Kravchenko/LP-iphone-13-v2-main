$(document).ready(function() {


  // Зацикливание галлереи fancybox

  $("[data-fancybox]").fancybox({
    loop: true
  });


  // Плавный скролл
  
  if ($(window).width() > 992) {
    $('.smooth-scroll').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-card', 150);
    });
  } else {
    $('.smooth-scroll').on('click', function (e) {
      e.preventDefault();
      smoothScroll('product-card__form', ($(window).height() - 200));
    });
  }

  $('.header-nav__wrapper-link--functions').on('click', function(e) {
    e.preventDefault();

    smoothScroll('functions', 0);
  });

  $('.header-nav__wrapper-link--video').on('click', function(e) {
    e.preventDefault();

    smoothScroll('video', 0);
  });

  $('.header-nav__wrapper-link--product').on('click', function(e) {
    e.preventDefault();

    smoothScroll('product', 0);
  });
  
  $('.header-nav__wrapper-link--feedback').on('click', function(e) {
    e.preventDefault();

    smoothScroll('feedback', 0);
  });

  function smoothScroll(classOfName, topSmooth) {
    $('html, body').animate({
      scrollTop: $("." + classOfName).offset().top - topSmooth
    }, 1500);
  }


  // Добавление нуля, если число < 10

  function addZero(num) {
    return (num > 9) ? num : '0' + num;
  }


  // Динамическая дата, от сегодняшней + 2 дня с добавлением нулей, если день или месяц меньше 10

  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  $('.sale--date').text(addZero(addDays(2).getDate()) + '/' + (addZero(addDays(2).getMonth() + 1)) + '/' + (addDays(2).getFullYear() - 2000));


  // Выбор звёздочек при написании отзыва

  function feedbackStar(e) {
    const target = e.target;
    let index;


    $('.feedback-modal__dialog-star').each(function (i, key) {
      if (target == key) {
        index = i;
      }
    });

    $('.feedback-modal__dialog-star').each(function (i, key) {
      $(key).removeClass('feedback-modal__dialog-star--active');

      if (i <= index) {
        $(key).addClass('feedback-modal__dialog-star--active');
      }
    });
  }

  $('.feedback-modal__dialog-star').on('click', function (e) {
    feedbackStar(e);
  });

  $('.feedback-modal__dialog-star').on('touchstart', function (e) {
    feedbackStar(e);
  });


  // Скрытие модалки с отзывом, после нажатия кнопки отправить

  $.fancybox.defaults.closeExisting = true;


  // Отключение возвращения fancybox картинки при выходе

  $.fancybox.defaults.backFocus = false;


  // Добавление видео ри клике на кноку Play в секции 'about'

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  $('.video-frame').on('click', function onYouTubeIframeAPIReady() {
    var dataVideo = $(this).data("video");
    player = new YT.Player('player', {
      videoId: dataVideo,
      events: {
        'onReady': videoPlay,
      }
    });
  });

  function videoPlay(e) {
    e.target.playVideo();
  }


  // Ховер эффект при наведени на video-frame

  $('.video-frame').on('mouseenter', function() {
    $('.video-frame__button-triangle').addClass('video-frame__button-triangle--active');
  });

  $('.video-frame').on('mouseleave', function() {
    $('.video-frame__button-triangle').removeClass('video-frame__button-triangle--active');
  });


  // Переключение цветов в секции 'product'

  $('.product-card__colors-item').on('click', function() {
    const color = $(this).attr('data-color');

    $(this).parents('.product-card__colors').children('.product-card__colors-item').each(function(i, key) {
      $(key).removeClass('product-card__colors-item--active');
    });

    $(this).addClass('product-card__colors-item--active');

    $(this).parents('.product-card').children('.product-card__iphone').each(function(i, key) {
      $(key).removeClass('product-card__iphone--active');

      if($(key).attr('data-color') == color) {
        $(key).addClass('product-card__iphone--active');
      }
    });
  });


  // Слайдер в секции 'feedback'

  const feedbackSwiper = new Swiper('.feedback-swiper', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 'auto',
  
    pagination: {
      el: '.feedback-slider__pagination',
      clickable: true,
    },
  });
  
});