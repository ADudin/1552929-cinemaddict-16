import AbstractView from '../abstract-view.js';

const createFilmDetailsFormTemplate = () => (
  `<form class="film-details__inner" action="" method="get">
  </form>`
);

export default class FilmDetailsFormView extends AbstractView {
  get template() {
    return createFilmDetailsFormTemplate();
  }
}
