import AbstractView from './abstract-view.js';

const createFilmsListTemplate = (sectionClass, titleClass, serviceClass, title) => {
  const template = `<section class="films-list ${sectionClass}">
    <h2 class="films-list__title ${titleClass}">${title}</h2>
    <div class="films-list__container ${serviceClass}">
    </div>
  </section>`;

  return template;
};

export default class FilmsListView extends AbstractView {
  #sectionClass = null;
  #titleClass = null;
  #serviceClass = null;
  #title = null;

  constructor(sectionClass, titleClass, serviceClass, title) {
    super();
    this.#sectionClass = sectionClass;
    this.#titleClass = titleClass;
    this.#serviceClass = serviceClass;
    this.#title = title;
  }

  get template() {
    return createFilmsListTemplate(this.#sectionClass, this.#titleClass, this.#serviceClass, this.#title);
  }
}
