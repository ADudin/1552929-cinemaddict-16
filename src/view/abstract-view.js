import {
  createElement,
  createUnorderedListOfElements
} from '../utils/render';

export default class AbstractView {
  #element = null;
  #unorderedListElement = null;
  _callback = {};

  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get unorderedListElement() {
    if (!this.#unorderedListElement) {
      this.#unorderedListElement = createUnorderedListOfElements(this.template);
    }

    return this.#unorderedListElement;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }

  removeUnorderedListElement() {
    this.#unorderedListElement = null;
  }
}
