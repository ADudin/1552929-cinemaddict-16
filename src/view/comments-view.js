import {getCommentDate} from '../utils';
import {createUnorderedListOfElements} from '../render';

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

const renderComments = (array) => {
  const commentsArray = [];
  for(let i = 0; i < array.length; i++) {
    commentsArray.push(renderComment(array[i]));
  }

  return commentsArray;
};

export default class CommentsView {
  #element = null;
  #comments = null;

  constructor(comments) {
    this.#comments = comments;
  }

  get element() {
    if (!this.#element) {
      this.#element = createUnorderedListOfElements(this.template);
    }

    return this.#element;
  }

  get template() {

    return renderComments(this.#comments);
  }

  removeElement() {
    this.#element = null;
  }
}
