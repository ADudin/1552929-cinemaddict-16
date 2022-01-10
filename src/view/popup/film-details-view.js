import he from 'he';
import SmartView from './smart-view';

import {
  getRuntimeFromMinutes,
  getReleaseDateForPopup,
  checkIsActiveClassNamePopup,
  getRandomArrayElement
} from '../../utils/common';

import CommentsView from './comments-view';
import {
  EMOTIONS,
  NAMES
} from '../../consts';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';

const renderGenres = (genresArray) => {
  const genres = [];

  for (let i = 0; i < genresArray.length; i ++) {
    genres.push(`<span class="film-details__genre">${genresArray[i]}</span>`);
  }

  return genres.join('');
};

const createEmojiItemTemplate = (emoji, card) => (
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}"
    value="${emoji}" ${card.activeEmoji === emoji ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emoji}">
    <img data-emoji="${emoji}" src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
  </label>`
);

const createFilmDetailsTemplate = (card, comments) => {
  const {
    title,
    alternativeTitle,
    poster,
    totalRating,
    director,
    writers,
    actors,
    ageRating,
    release,
    runtime,
    genre,
    description,
    userDetails
  } = card;

  const country = release.releaseCountry;
  const watchlistClassName = userDetails.watchlist;
  const alreadyWatchedClassName = userDetails.alreadyWatched;
  const favoriteClassName = userDetails.favorite;

  const commentsNumber = comments.length;
  const commentsList = comments.map((comment) => new CommentsView(comment).template).join('');
  const emojiList = EMOTIONS.map((emoji) => createEmojiItemTemplate(emoji, card)).join('');

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${getReleaseDateForPopup(release)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getRuntimeFromMinutes(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${renderGenres(genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${checkIsActiveClassNamePopup(watchlistClassName)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${checkIsActiveClassNamePopup(alreadyWatchedClassName)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${checkIsActiveClassNamePopup(favoriteClassName)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">
            Comments <span class="film-details__comments-count">${commentsNumber}</span>
          </h3>

          <ul class="film-details__comments-list">
            ${commentsList}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${card.activeEmoji ? `<img src="./images/emoji/${card.activeEmoji}.png" data-emoji="${card.activeEmoji}" width="55" height="55" alt="emoji-${card.activeEmoji}">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${card.commentText ? card.commentText : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojiList}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmDetailsView extends SmartView {
  #comments = null;
  #activeEmoji = null;

  constructor (card, comments) {
    super();
    this._data = FilmDetailsView.parseMovieToData(card);
    this.#comments = comments;
    this.#activeEmoji = card.activeEmoji;

    this.#setInnerHandlers();
  }

  get template() {

    return createFilmDetailsTemplate(this._data, this.#comments, this.#activeEmoji);
  }

  restoreHandlers = () => {
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setCloseBtnClickHandler(this._callback.click);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
    this.setAddNewCommentEventHandler(this._callback.addNewCommentEvent);
    this.#setInnerHandlers();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  setCloseBtnClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  }

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((item) => {
      item.addEventListener('click', this.#deleteCommentClickHandler);
    });
  }

  setAddNewCommentEventHandler = (callback) => {
    this._callback.addNewCommentEvent = callback;
    document.addEventListener('keydown', this.#addNewCommentKeyDownHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label img').forEach((item) => {
      item.addEventListener('click', this.#emojiClickHandler);
    });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(FilmDetailsView.parseDataToMovie(this._data));
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick(FilmDetailsView.parseDataToMovie(this._data));
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick(FilmDetailsView.parseDataToMovie(this._data));
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      activeEmoji: evt.target.dataset.emoji
    });
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      commentText: he.encode(evt.target.value)
    }, true);
  }

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    const commentId = evt.target.dataset.commentId;
    const commentToDeleteIndex = this.#comments.findIndex((comment) => comment.id === commentId);
    this._callback.deleteCommentClick(this.#comments[commentToDeleteIndex]);
  }

  #addNewCommentKeyDownHandler = (evt) => {
    if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
      evt.preventDefault();
      const newComment = new Object();
      newComment.id = nanoid();
      newComment.text = this._data.commentText;
      newComment.emotion = this._data.activeEmoji;
      newComment.author = getRandomArrayElement(NAMES);
      newComment.date = dayjs().format('YYYY/MM/DD HH:mm');
      if (newComment.text !== undefined && newComment.emotion !== undefined) {
        this._callback.addNewCommentEvent(newComment);
        document.removeEventListener('keydown', this.#addNewCommentKeyDownHandler);
      }
    }
  }

  static parseMovieToData = (movie) => ({
    ...movie,
    activeEmoji: movie.activeEmoji,
    commentText: movie.commentText
  });

  static parseDataToMovie = (data) => {
    const movie = {...data};

    if (!movie) {
      movie.activeEmoji = null;
      movie.commentText = null;
    }

    delete movie.activeEmoji;

    return movie;
  }
}
