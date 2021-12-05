import {createElement} from '../render';

const createFilmsSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmSectionView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsSectionTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
