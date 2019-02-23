
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


const cards = document.querySelectorAll('.card-wrap');

const runCardAnimation = e => {
  const target = e.target.closest('.card') || e.target.children[0];
  const cardOffsetTop = target.parentNode.offsetTop;
  const cardOffsetLeft = target.parentNode.offsetLeft;
  const cardWidth = target.offsetWidth;
  const cardHeight = target.offsetHeight;

  const setCardPosition = e => {
    console.log(e);

    if (target) {
      console.log(cardOffsetTop);
      target.style.transform = `
      rotateX(${-(e.pageY - cardOffsetTop - (cardHeight / 2)) * 0.1}deg) 
      rotateY(${(e.pageX - cardOffsetLeft - (cardWidth / 2)) * 0.12}deg)
    `;
    }

  };

  target.addEventListener('mousemove', throttle(setCardPosition, 150));
};

const destroyCardAnimation = e => {
  const card = e.target.closest('.card') || e.target.children[0];

  console.log(card);
  card.style.transform = 'rotate(0deg)';
};

cards.forEach(card => card.addEventListener('mouseover', throttle(runCardAnimation, 150)));
cards.forEach(card => card.addEventListener('mouseleave', destroyCardAnimation));