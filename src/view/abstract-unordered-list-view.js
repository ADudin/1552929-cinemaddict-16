import {createUnorderedListOfElements} from '../render';

export default class AbstractUnorderedListView {
  #element = null;

  constructor() {
    if (new.target === AbstractUnorderedListView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createUnorderedListOfElements(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }
}
