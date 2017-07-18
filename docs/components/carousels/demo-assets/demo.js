// temp fix
if (document.getElementById('sliderTarget')) {
  var carousel = new LoopedCarousel('sliderTarget', {
    autoplay: true,
    autoplaySpeed: 2000,
  });
  var carouselFinite = new FiniteCarousel('sliderTarget2', {
    autoplay: true,
    autoplaySpeed: 2000,
  });

  console.log(carousel instanceof Carousel);
  console.log(carouselFinite instanceof Carousel);
}
