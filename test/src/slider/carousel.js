$(document).ready(function() {
  $('.slider').slick({
    centerMode: true,
    centerPadding: '100px',
    slidesToShow: 1,
    speed: 100,
    index: 1,
    focusOnSelect:true,
    prevArrow: $('#left-button'),
    nextArrow: $('#right-button'),
    responsive: [{
      breakpoint: 1000,
      settings: {
        centerMode: true,
        centerPadding: '105px',
        slidesToShow: 1,
      }
    }, {
      breakpoint: 400,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '105px',
        slidesToShow: 1
      }
    }]
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
