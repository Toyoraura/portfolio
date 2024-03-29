export default class Header {
  constructor(element) {
    this.element = element;
    this.scrollLimit = 0.1;
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  init() {
    // console.log('ceci est un header');
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    this.setHeaderState();
    this.setDirectionState();
  }

  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      // console.log('header-is-hidden');
      this.html.classList.add('header-is-hidden');
    } else {
      // console.log('header-is-visible');
      this.html.classList.remove('header-is-hidden');
    }
    // console.log(this.scrollPosition);
  }

  setDirectionState() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
