class Gallery {
  constructor(gallery) {
    if (!gallery) {
      throw new Error('No Gallery Found!');
    }
    this.gallery = gallery;
    this.modal = document.querySelector('.modal');
    this.images = Array.from(gallery.querySelectorAll('img'));
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');

    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.images.forEach(image => image.addEventListener('click', e =>
      this.showImage(e.currentTarget)));

    this.images.forEach(image => image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    }));

    this.modal.addEventListener('click', this.handleClickOutside);
  }

  openModal() {
    if (this.modal.matches('open')) {
      return;
    }
    this.modal.classList.add('open');
    window.addEventListener('keyup', this.handleKeyUp);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
  }

  closeModal() {
    this.modal.classList.remove('open');
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.prevButton.removeEventListener('click', this.showPrevImage);
  }

  handleClickOutside(e) {
    if (e.target === e.currentTarget) this.closeModal();
  }

  handleKeyUp(e) {
    if (e.key === 'Escape') return this.closeModal();
    if (e.key === 'ArrowRight') return this.showNextImage();
    if (e.key === 'ArrowLeft') return this.showPrevImage();
  }

  showNextImage(e) {
    this.showImage(this.currentImage.nextElementSibling ||
      this.gallery.firstElementChild);
  }

  showPrevImage(e) {
    this.showImage(this.currentImage.previousElementSibling ||
      this.gallery.lastElementChild);
  }

  showImage(el) {
    if (!el) {
      return;
    }
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    this.currentImage = el;
    this.openModal();
  }

}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
