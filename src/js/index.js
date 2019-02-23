
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}


const throttle = (func, limit) => {
  let inThrottle
  return function () {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

console.log(('ontouchstart' in document.documentElement));


const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
const isTouchDevice = 'ontouchstart' in document.documentElement;


if (!isIE && !isTouchDevice) {
  const cards = [].slice.call(document.querySelectorAll('.card-wrap'));
  let isHovered = false;

  const runCardAnimation = e => {
    if (!isHovered) {
      isHovered = true;
      const target = e.target.closest('.card') || e.target.children[0],
        cardOffsetTop = target.parentNode.offsetTop,
        cardOffsetLeft = target.parentNode.offsetLeft,
        cardWidth = target.offsetWidth,
        cardHeight = target.offsetHeight;

      console.log(cardOffsetLeft, cardOffsetTop, cardWidth, cardHeight);

      const setCardPosition = e => {
        if (target) {

          target.style.transform = `
            rotateX(${-(e.clientY - cardOffsetTop - (cardHeight / 2)) * 0.1}deg) 
            rotateY(${(e.clientX - cardOffsetLeft - (cardWidth / 2)) * 0.1}deg)
        `;
        }

      };
      target.addEventListener('mousemove', throttle(setCardPosition, 200));
    }

  };

  const destroyCardAnimation = e => {
    const card = e.target.closest('.card') || e.target.children[0];
    card.style = '';

    isHovered = false;
  };

  cards.forEach(card => card.addEventListener('mouseenter', runCardAnimation));
  cards.forEach(card => card.addEventListener('mouseleave', destroyCardAnimation));
}

