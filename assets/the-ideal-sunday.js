//////////////////////////////////////
// THE IDEAL SUNDAY CUSTOM SCRIPTS
//////////////////////////////////////

document.addEventListener('page:loaded', function () {
  // Page has loaded and theme assets are ready

  // Collection Description Height
  $('.read-more-button').click(function () {
    $(this).text(function (i, text) {
      return text === 'Read More' ? 'Read Less' : 'Read More';
    });
    $('.collection-description-closed').toggleClass('open');
  });


  $('.clearpay-button').click(function () {
    $('#clearpay-popup-wrapper').show();
  });

  $('.clearpay-close').click(function () {
    $('#clearpay-popup-wrapper').hide();
  });

  $('#st-product-description_0-0').append("<span class='product-read-more yellow-strike'>Read More</span>");

  $('.product-read-more').click(function () {
    $(this).text(function (i, text) {
      return text === 'Read More' ? 'Read Less' : 'Read More';
    });
    $('#st-product-description_0-0').toggleClass('open');
  });

  var mouse_is_inside = false;

$(document).ready(function()
{
    $('#PredictiveWrapper').hover(function(){ 
        mouse_is_inside=true; 
    }, function(){ 
        mouse_is_inside=false; 
    });

    $("body").mouseup(function(){ 
        if(! mouse_is_inside) $('#PredictiveWrapper').hide();
    });
});

  

  

  // Show / Hide Delivery & Rewards on Variant Change if Available
  document.addEventListener('variant:change', function (evt) {
    var variant = evt.detail.variant;
    if (variant.available) {
      // Available, Show Delivery Message
      $('.delivery-wrapper').removeClass('hide');
      $('.rewards-wrapper').removeClass('hide');
    } else {
      // Sold out, Hide delivery message
      $('.delivery-wrapper').addClass('hide');
      $('.rewards-wrapper').addClass('hide');
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


  // window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
  // window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });

  // Bundle & Save Modal
  // $('#shopify-section-collection-promotions').addClass('js-modal-open-bundle-save');
  // $('.announcement-slider__slide[data-index=2]').addClass('js-modal-open-bundle-save');

  // $('.js-modal-open-bundle-save').click(function () {
  //   $('body').addClass('modal-open');
  //   $('#BundleSaveModal').addClass('modal--is-active');
  // });

  // $('.js-modal-close').click(function () {
  //   $('body').removeClass('modal-open');
  //   $('#BundleSaveModal').removeClass('modal--is-active');
  // });

  // Header Reviews Reviews.io API
  // $.ajax({
  //   method: 'GET',
  //   url: 'https://api.reviews.co.uk/merchant/reviews?store=the-ideal-sunday',
  // }).done(function (data) {
  //   var data = data;
  //   $('.header-review-word').append('Rated <b>' + data.word + '</b>');
  //   $('.header-product-review-stars').append('&nbsp;<i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i><i class="ruk-icon-full-star-01" style="font-family: \'product-widget-iconfont\'"></i>');
  //   $('.header-reviews-total').append('from ' + data.stats.total_reviews + ' reviews');
  //   $('.header-reviews-average-rating').append('&nbsp;<b>' + data.stats.average_rating + '/5</b>');
  //   // $('.header-reviews-on').text('on');
  //   $('.header-reviews-image').append('<img src="https://cdn.shopify.com/s/files/1/0283/1466/5034/t/27/assets/reviewsio-logo.png?v=16353740605423461662" alt="The Ideal Sunday 5 Star Reviews">');
  // });



  // Bundle & Save Calculation Message
    // document.addEventListener('cart:updated', function (evt) {
    //   if (evt.detail.cart.total_price < 7500) {
    //     console.log('test')
    //     $('.bundle-save').show();
    //     $('.bundle-spend-remaining').text('£' + ((7500 - evt.detail.cart.total_price) / 100).toFixed(2));
    //     $('.bundle-discount-amount').text('£5');
    //     $('.cart-bundle-discount').hide();
    //     $('.ajaxcart__price-discounted').hide();
    //     $('.ajaxcart__price-original .money').removeClass('line-through');
    //   } else if (evt.detail.cart.total_price < 10000) {
    //     $('.bundle-save').show();
    //     $('.bundle-spend-remaining').text('£' + ((10000 - evt.detail.cart.total_price) / 100).toFixed(2));
    //     $('.bundle-discount-amount').text('£10');
    //     $('.cart-bundle-discount').show();
    //     $('.cart-bundle-discount-code').text('SAVE5');
    //     $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 500) / 100).toFixed(2) + '</span>');
    //     $('.ajaxcart__price-original .money').addClass('line-through');
    //   } else if (evt.detail.cart.total_price < 15000) {
    //     $('.bundle-save').show();
    //     $('.bundle-spend-remaining').text('£' + ((15000 - evt.detail.cart.total_price) / 100).toFixed(2));
    //     $('.bundle-discount-amount').text('£20');
    //     $('.cart-bundle-discount').show();
    //     $('.cart-bundle-discount-code').text('SAVE10');
    //     $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 1000) / 100).toFixed(2) + '</span>');
    //     $('.ajaxcart__price-original .money').addClass('line-through');
    //   } else {
    //     $('.bundle-save').hide();
    //     $('.cart-bundle-discount').show();
    //     $('.cart-bundle-discount-code').text('SAVE20');
    //     $('.ajaxcart__price-discounted').append("<span class='money'>" + '£' + ((evt.detail.cart.total_price - 2000) / 100).toFixed(2) + '</span>');
    //     $('.ajaxcart__price-original .money').addClass('line-through');
    //   }
    // });

  //   $(window).scroll(function() {
  //     var scrollPos = $(window).scrollTop()
  //     if ($(this).scrollTop() >= 58 && $(this).scrollTop() <= 200) {
  //       $('#HeaderWrapper').css('padding-bottom', scrollPos);
  //     }
  // });

  
});

