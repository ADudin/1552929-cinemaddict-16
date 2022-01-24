import {getCommentDate} from '../../utils/common';
import AbstractView from '../abstract-view.js';

const renderComment = (comment, isDeleting) => {
  const {
    id,
    text,
    emotion,
    author,
    date
  } = comment;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-sleeping">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getCommentDate(date)}</span>
        <button class="film-details__comment-delete" data-comment-id="${id}" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>`;
};

export default class CommentsView extends AbstractView {
  #comment = null;
  #isDeleting = false;

  constructor(comment, isDeleting) {
    super();
    this.#comment = comment;
    this.#isDeleting = isDeleting;
  }

  get template() {

    return renderComment(this.#comment, this.#isDeleting);
  }
}
