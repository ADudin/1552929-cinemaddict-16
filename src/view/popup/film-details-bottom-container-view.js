import AbstractView from '../abstract-view.js';

const createFilmDetailsBottomContainerTemplate = () => (
  `<div class="film-details__bottom-container">
  </div>`
);

export default class FilmDetailsBottomContainerView extends AbstractView {
  get template() {
    return createFilmDetailsBottomContainerTemplate();
  }
}
