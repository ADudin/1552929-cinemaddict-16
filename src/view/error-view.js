import AbstractView from './abstract-view';

const createNoFilmCardsTemplate = (message) => (
  `<h2 class="films-list__title">
    ${message}
  </h2>`
);

export default class ErrorView extends AbstractView {
  #message = null;

  constructor (message) {
    super();
    this.#message = message;
  }

  get template() {
    return createNoFilmCardsTemplate(this.#message);
  }
}
