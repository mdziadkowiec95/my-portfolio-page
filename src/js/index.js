
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

document.documentElement.addEventListener('mousemove', throttle);
document.documentElement.removeEventListener('mousemove', throttle);

console.log('Touch device: ' + ('ontouchstart' in document.documentElement));


const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
const isTouchDevice = 'ontouchstart' in document.documentElement;

const cardMaxWidth = 400; // maximum possible card width

if (!isIE && !isTouchDevice) {
  const cards = [].slice.call(document.querySelectorAll('.card'));

  const runCardAnimation = e => {

    const cardInner = e.target.closest('.card__inner') || e.target.children[0],
      cardWrapper = cardInner.parentNode,
      cardOffsetTop = cardWrapper.offsetTop,
      cardOffsetLeft = cardWrapper.offsetLeft,
      cardWidth = cardWrapper.offsetWidth,
      cardHeight = cardWrapper.offsetHeight,
      rotationFactor = cardWidth / cardMaxWidth * 0.07; // calculate rotation (more narrow card === softer rotation)
    let rY, rX; // rotation angles

    const setCardPosition = e => {
      if (cardInner) {
        rX = -((e.pageY - cardOffsetTop - (cardHeight / 2)) * rotationFactor).toFixed(2);
        rY = ((e.pageX - cardOffsetLeft - (cardWidth / 2)) * rotationFactor).toFixed(2);

        cardInner.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg)`;
      }
    };
    const throttledPositionHandler = throttle(setCardPosition, 150);

    cardWrapper.addEventListener('mousemove', throttledPositionHandler);

    const resetCardAnimation = e => {
      cardInner.style = '';
      cardWrapper.removeEventListener('mousemove', throttledPositionHandler);
      cardWrapper.removeEventListener('mouseleave', resetCardAnimation);
    };

    cardWrapper.addEventListener('mouseleave', resetCardAnimation);

  };

  // attach listener for hovering card
  cards.forEach(card => card.addEventListener('mouseenter', runCardAnimation));

}

