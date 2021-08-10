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
  
});

