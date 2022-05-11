export const elementInViewport = (el: any) => {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    top + height <= window.pageYOffset + window.innerHeight &&
    left + width <= window.pageXOffset + window.innerWidth
  );
};

export const navigateNonSmooth = (router: any, path: string = '/') => {
  const htmlElement = document.querySelector('html');
  if (htmlElement) {
    htmlElement.style.scrollBehavior = 'initial';
  }
  router.navigateByUrl(path, {
    skipLocationChange: true,
  });
  if (htmlElement) {
    htmlElement.style.scrollBehavior = 'smooth';
  }
};

export const navigateToContactFormAndMessage = (message: string) => {
  const form = document.querySelector('#contact-form');
  if (form && !elementInViewport(form)) {
    form.scrollIntoView();
  }
  const messageElement = document.querySelector('#contact-form-message');
  if (messageElement) {
    (messageElement as any).value = message;
  }
};
