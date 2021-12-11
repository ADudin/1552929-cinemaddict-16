import AbstractView from './abstract-view.js';

const createFilmsListTemplate = (sectionClass, titleClass, title) => {
  const template = `<section class="films-list ${sectionClass}">
    <h2 class="films-list__title ${titleClass}">${title}</h2>
  </section>`;

  return template;
};

export default class FilmsListView extends AbstractView {
  #sectionClass = null;
  #titleClass = null;
  #title = null;

  constructor(sectionClass, titleClass, title) {
    super();
    this.#sectionClass = sectionClass;
    this.#titleClass = titleClass;
    this.#title = title;
  }

  get template() {
    return createFilmsListTemplate(this.#sectionClass, this.#titleClass, this.#title);
  }
}
