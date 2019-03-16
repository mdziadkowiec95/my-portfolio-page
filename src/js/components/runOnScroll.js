import { throttle } from 'underscore';

const runOnScroll = () => {
  const elements = [].slice.call(document.querySelectorAll('[data-show-on-scroll]')),
    navbar = document.querySelector('.header__navbar');

  const checkElementsPosition = (e) => {
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const isHalfVisible = top - window.innerHeight + (el.offsetHeight / 2) < 0;

      if (isHalfVisible) el.classList.add('active');
    });
  };

  let lastScrollPosition = 0;
  const checkNavPosition = (e) => {

    lastScrollPosition > window.pageYOffset ? navbar.classList.add('header__navbar--fixed') : navbar.classList.remove('header__navbar--fixed');

    lastScrollPosition = window.pageYOffset;
  };


  const checkElementsPositionThrottled = throttle(checkElementsPosition, 300);
  const checkNavPositionThrottled = throttle(checkNavPosition, 100);

  window.addEventListener('scroll', (e) => {
    checkElementsPositionThrottled(e);
    checkNavPositionThrottled(e);



  });
};


export default runOnScroll;