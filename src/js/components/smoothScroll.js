import smoothscroll from 'smoothscroll-polyfill';
import { matchesPolyfill, closestPolyfill } from '../base/polyfills';

// kick off the polyfill!
smoothscroll.polyfill();
matchesPolyfill();
closestPolyfill();

const scrollTo = target => {
  const hrefArr = target.split('/');
  const ID = hrefArr[hrefArr.length - 1].replace('#', '');

  document.getElementById(ID).scrollIntoView({ behavior: 'smooth' });
}

const checkTarget = (e) => {
  const target = e.target;

  if (target.matches('.nav__link')) {
    scrollTo(target.href);
  } else if (target.matches('.scroll-down, .scroll-down *')) {
    const href = target.closest('.scroll-down').href;
    scrollTo(href);
  }
}

document.querySelector('.header').addEventListener('click', checkTarget);


