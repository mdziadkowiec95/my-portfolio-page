import { isTouchDevice } from '../base/checkDevice';

if (isTouchDevice()) {
  const cards = [].slice.call(document.querySelectorAll('.card'));

  cards.forEach(card => card.classList.add('card--visible'));
}