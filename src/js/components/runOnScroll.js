const runOnScroll = () => {

  const elements = [].slice.call(document.querySelectorAll('[data-run-on-scroll]'));



  const checkPosition = (e) => {
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top,
        halfVisible = top - window.innerHeight + (el.offsetHeight / 2) < 0;

      if (halfVisible) el.classList.add('active');

      console.log(halfVisible);



      // console.log(middleOfElement);
      // console.log(bottomEdge);
      // console.log(window.innerHeight);


    });
  };



  window.addEventListener('scroll', checkPosition);
};


export default runOnScroll;