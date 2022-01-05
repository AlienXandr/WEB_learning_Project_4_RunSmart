// $(document).ready(function(){
//   $('.carousel__inner').slick({
//     speed: 1000,
//     // adaptiveHeight: true,
//     prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/arrow_left.png" alt="arrow_left"></button>',
//     nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/arrow_right.png" alt="arrow_left"></button>',
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           dots: true,
//           arrows: false,
//         }
//       },
//     ]
//   });
// });

const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});