import AbstractView from '../abstract-view.js';

const createFilmDetailsSectionTemplate = () => (
  `<section class="film-details">
</section>`
);

export default class FilmDetailsSectionView extends AbstractView {
  get template() {
    return createFilmDetailsSectionTemplate();
  }
}
