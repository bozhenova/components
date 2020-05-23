class Slider {
  constructor(slider) {
    if (!(slider instanceof Element)) {
      throw new Error('No Slider Passed In!');
    }
    this.slider = slider;
    const prevButton = this.slider.querySelector('.goToPrev');
    const nextButton = this.slider.querySelector('.goToNext');
    this.slides = this.slider.querySelector('.slides');
    this.move = this.move.bind(this);

    this.startSlider();
    this.applyClasses();
    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', this.move);
  }

  startSlider() {
    this.current = this.slides.querySelector('.current') || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  }

  applyClasses() {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('next');
  }

  move(direction) {
    const classesToRemove = ['prev', 'current', 'next'];
    debugger;
    [this.prev, this.current, this.next].forEach(el => el.classList.remove(...classesToRemove));
    if (direction === 'back') {
      [this.prev, this.current, this.next] = [this.prev.previousElementSibling || this.slides.lastElementChild, this.prev, this.current];
    } else {
      [this.prev, this.current, this.next] = [this.current, this.next, this.next.nextElementSibling || this.slides.firstElementChild];
    }
    this.applyClasses();
  }

}

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

window.dogSlider = dogSlider;

window.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    dogSlider.move('back');
  }
});