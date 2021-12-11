import {getCommentDate} from '../../utils/common';
import AbstractView from '../abstract-view.js';

const renderComment = (comment) => {
  const {
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
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class CommentsView extends AbstractView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments;
  }

  get template() {

    return renderComment(this.#comments);
  }
}
