import AbstractView from '../abstract-view.js';

const createFilmDetailsCommentsWrapTemplate = () => (
  `<section class="film-details__comments-wrap">
  </section>`
);

export default class FilmDetailsCommentsWrapView extends AbstractView {
  get template() {
    return createFilmDetailsCommentsWrapTemplate();
  }
}
