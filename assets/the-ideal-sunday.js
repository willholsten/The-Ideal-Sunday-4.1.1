//////////////////////////////////////
// THE IDEAL SUNDAY CUSTOM SCRIPTS
//////////////////////////////////////

document.addEventListener('page:loaded', function () {
  // Page has loaded and theme assets are ready
  console.log('test');

  // Change Logo on Scroll
  $(document).ready(function () {
    $(function () {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 33) {
          $('.the-ideal-sunday-wordmark').addClass('hide-logo', 200);
          $('.the-ideal-sunday-logo').removeClass('hide-logo', 200);
        } else {
          $('.the-ideal-sunday-wordmark').removeClass('hide-logo', 200);
          $('.the-ideal-sunday-logo').addClass('hide-logo', 200);
        }
      });
    });
  });

  // Collection Description Height
  $('.read-more-button').click(function () {
    $(this).text(function (i, text) {
      return text === 'Read More' ? 'Read Less' : 'Read More';
    });
    $('.collection-description-closed').toggleClass('open');
  });

  // Show / Hide Delivery & Rewards on Variant Change if Available
  document.addEventListener('variant:change', function (evt) {
    var variant = evt.detail.variant;
    if (variant.available) {
      // Available, Show Delivery Message
      $('.delivery-rewards-wrapper').removeClass('hide');
    } else {
      // Sold out, Hide delivery message
      $('.delivery-rewards-wrapper').addClass('hide');
    }
  });

  // Scroll to Product Reviews Anchor
  $(document).on('click', 'a[href^="#product-reviews"]', function (event) {
    event.preventDefault();
    $('html, body').animate(
      {
        scrollTop: $($.attr(this, 'href')).offset().top + -160,
      },
      1000
    );
  });

  // Bundle & Save Modal
  $('#shopify-section-collection-promotions').addClass('js-modal-open-bundle-save');
  $('.announcement-slider__slide[data-index=2]').addClass('js-modal-open-bundle-save');

  $('.js-modal-open-bundle-save').click(function () {
    $('body').addClass('modal-open');
    $('#BundleSaveModal').addClass('modal--is-active');
  });

  $('.js-modal-close').click(function () {
    $('body').removeClass('modal-open');
    $('#BundleSaveModal').removeClass('modal--is-active');
  });

  // Product Page Reviews.io API
  $.ajax({
    method: 'GET',
    url: 'https://api.reviews.co.uk/merchant/reviews?store=the-ideal-sunday',
  }).done(function (data) {
    var data = data;
    console.log(data); 
    $('.header-review-word').append('Rated <b>' + data.word + '</b>');
    $('.header-product-review-stars').append('&nbsp;&nbsp;<i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i>&nbsp;&nbsp;');
    $('.header-total-reviews').append('from ' + data.stats.total_reviews + 'reviews');
    $('.header-average-rating').text(data.stats.average_rating + '/5');
    $('.header-reviews-image').append('<img src="https://cdn.shopify.com/s/files/1/0283/1466/5034/t/27/assets/reviewsio-logo.png?v=16353740605423461662" alt="The Ideal Sunday 5 Star Reviews">');
  });

  // Bundle & Save Calculation Message
  $(document).ready(function () {
    document.addEventListener('cart:updated', function (evt) {
      if (evt.detail.cart.total_price < 7500) {
        $('.bundle-save').show();
        $('.bundle-spend-remaining').text('£' + ((7500 - evt.detail.cart.total_price) / 100).toFixed(2));
        $('.bundle-discount-amount').text('£5');
        $('.cart-bundle-discount').hide();
        $('.ajaxcart__price-discounted').hide();
        $('.ajaxcart__price-original .money').removeClass('line-through');
      } else if (evt.detail.cart.total_price < 10000) {
        $('.bundle-save').show();
        $('.bundle-spend-remaining').text('£' + ((10000 - evt.detail.cart.total_price) / 100).toFixed(2));
        $('.bundle-discount-amount').text('£10');
        $('.cart-bundle-discount').show();
        $('.cart-bundle-discount-code').text('SAVE5');
        $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 500) / 100).toFixed(2) + '</span>');
        $('.ajaxcart__price-original .money').addClass('line-through');
      } else if (evt.detail.cart.total_price < 15000) {
        $('.bundle-save').show();
        $('.bundle-spend-remaining').text('£' + ((15000 - evt.detail.cart.total_price) / 100).toFixed(2));
        $('.bundle-discount-amount').text('£20');
        $('.cart-bundle-discount').show();
        $('.cart-bundle-discount-code').text('SAVE10');
        $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 1000) / 100).toFixed(2) + '</span>');
        $('.ajaxcart__price-original .money').addClass('line-through');
      } else {
        $('.bundle-save').hide();
        $('.cart-bundle-discount').show();
        $('.cart-bundle-discount-code').text('SAVE20');
        $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 2000) / 100).toFixed(2) + '</span>');
        $('.ajaxcart__price-original .money').addClass('line-through');
      }
    });
  });
});

//Slick Sliders
// $('.collections-slider').slick({
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   infinite: false,
//   autoplay: false,
//   touchThreshold: 100,
//   mobileFirst: true,
//   dots: true,
//   arrows: false,
//   centerMode: true,
//   responsive: [
//     {
//       breakpoint: 770,
//       settings: {
//         slidesToShow: 4,
//         slidesToScroll: 0,
//         dots: false,
//       },
//     },
//   ],
// });

// $('.logo-slider').slick({
//   slidesToShow: 3.5,
//   slidesToScroll: 3,
//   infinite: false,
//   autoplay: false,
//   touchThreshold: 100,
//   mobileFirst: true,
//   arrows: false,
//   dots: true,
//   responsive: [
//     {
//       breakpoint: 770,
//       settings: {
//         slidesToShow: 5,
//         slidesToScroll: 3,
//         dots: true,
//         arrows: true,
//       },
//     },
//   ],
// });
