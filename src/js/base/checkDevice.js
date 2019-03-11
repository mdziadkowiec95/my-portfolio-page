export const isIE = () => !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
export const isTouchDevice = () => 'ontouchstart' in document.documentElement;