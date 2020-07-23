

$(document).ready(function() {
  $('.slider').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 1500,
    index: 2,
    focusOnSelect:true,
    prevArrow: $('#left-button'),
    nextArrow: $('#right-button'),
    responsive: [{
      breakpoint: 768,
      settings: {
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3,
      }
    }, {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
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
  console.log(current.attr("data-slick-index"));
  document.getElementById('check-button').onclick = function() { 
    current.click(console.log("cliked"));
  };

});

});
