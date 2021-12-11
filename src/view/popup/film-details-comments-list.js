import AbstractView from '../abstract-view.js';

const createFilmDetailsCommentsListTemplate = () => (
  `<ul class="film-details__comments-list">
</ul>`
);

export default class FilmDetailsCommentsListView extends AbstractView {
  get template() {
    return createFilmDetailsCommentsListTemplate();
  }
}
