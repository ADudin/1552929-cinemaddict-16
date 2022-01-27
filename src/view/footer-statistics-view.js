import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = (filmCardsCount) => (
  `<section class="footer__statistics">
  <p>${filmCardsCount} movies inside</p>
</section>`
);

export default class FooterStatisticsView extends AbstractView {
  #moviesModel = null;

  constructor (moviesModel) {
    super();
    this.#moviesModel = moviesModel;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#moviesModel.filmCards.length);
  }
}
