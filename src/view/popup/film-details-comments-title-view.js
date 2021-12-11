import AbstractView from '../abstract-view.js';

const createFilmDetailsCommentsTitleTemplate = (comments) => {
  const commentsNumber = comments.length;

  return `<h3 class="film-details__comments-title">
    Comments <span class="film-details__comments-count">${commentsNumber}</span>
  </h3>`;
};

export default class FilmDetailsCommentsTitleView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsCommentsTitleTemplate(this.#comments);
  }
}
