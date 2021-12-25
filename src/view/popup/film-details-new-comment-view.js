//import { updateItem } from '../../utils/common.js';
import SmartView from './smart-view.js';

const createFilmDetailsNewCommentTemplate = () => {
  const defaultEmojiSrc = 'images/emoji/smile.png';

  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      <img src="${defaultEmojiSrc}" width="55" height="55" alt="emoji-smile">
    </div>

    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>

    <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
    </div>
  </div>`;
};

export default class FilmDetailsNewCommentView extends SmartView {
  constructor() {
    super();
  }

  get template() {
    return createFilmDetailsNewCommentTemplate();
  }

  setEmojiClickHandler = () => {
    this.element.querySelectorAll('.film-details__emoji-label img').forEach((item) => {
      item.addEventListener('click', this.#emojiClickHandler);
    });
  }

  #getCommentText = () => {
    const commentText = this.element.querySelector('.film-details__comment-input');

    return commentText.value;
  }

  #emojiClickHandler = (evt) => {
    const activeEmoji = this.element.querySelector('.film-details__add-emoji-label img');
    activeEmoji.src = evt.target.src;
  }
}
