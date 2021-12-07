import AbstractView from './abstract-view.js';

const createFilmsSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class FilmSectionView extends AbstractView {
  get template() {
    return createFilmsSectionTemplate();
  }
}
