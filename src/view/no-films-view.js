import {createElement} from '../render';

const createNoFilmsTemplate = () => (
  `<p class="board__no-tasks">
    There are no movies in our database
  </p>`
);

export default class NoFilmsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoFilmsTemplate();
  }

  removeElement() {
    this.element = null;
  }
}
