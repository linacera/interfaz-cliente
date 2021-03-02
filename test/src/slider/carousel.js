document.addEventListener('touchstart', ()=>{}, {passive: true});
jQuery.event.special.touchstart = {
  setup: function( _, ns, handle ){
    if ( ns.includes("noPreventDefault") ) {
      this.addEventListener("touchstart", handle, { passive: false });
    } else {
      this.addEventListener("touchstart", handle, { passive: true });
    }
  }
};
jQuery.event.special.touchmove = {
  setup: function( _, ns, handle ){
    if ( ns.includes("noPreventDefault") ) {
      this.addEventListener("touchmove", handle, { passive: false });
    } else {
      this.addEventListener("touchmove", handle, { passive: true });
    }
  }
};

$('.slider').on('init', () => {
  console.log('onInit');
  window.resizeTo(100,100)
  window.resizeTo(1025,600)
})
$(document).ready(function() {
  $('.slider').slick({
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 1,
    speed: 100,
    index: 1,
    focusOnSelect:true,
    mobileFirst:true,
    prevArrow: $('#left-button'),
    nextArrow: $('#right-button'),
    responsive: [{
      breakpoint: 1024,
      settings: {
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
      }
    }, {
      breakpoint: 600,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }, {
      breakpoint: 0,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }]
  });
  $('.slider').slick('setPosition');
  $('.slider').on('breakpoint',()=>{
    console.log('breakpoint')
    $('.slider').slick('setPosition');
  });

$('.slides').slick({
  onAfterChange: function(){
  var id = $('.current').text($('.slides').slickCurrentSlide()+1);
  console.log("Id1: "+dataId);
  }
});
var current;
$('.slider').on('afterChange', function() {
  current = $('.slick-current');   
  //console.log(current.attr("data-slick-index"));
  document.getElementById('check-button').onclick = function() { 
    
  };

});

});
