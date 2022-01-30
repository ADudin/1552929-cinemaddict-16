import {
  getRuntimeFromMinutes,
  getShortDescription,
  checkIsActiveClassName
} from '../utils/common';

import AbstractView from './abstract-view.js';

const createFilmCardTemplate = (card) => {
  const {
    poster,
    title,
    totalRating,
    release,
    runtime,
    genre,
    description,
    userDetails,
    comments
  } = card;

  const releaseYear = release.date.getFullYear();
  const commentsNumber = comments.length;
  const watchlistClassName = userDetails.watchlist;
  const alreadyWatchedClassName = userDetails.alreadyWatched;
  const favoriteClassName = userDetails.favorite;

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${getRuntimeFromMinutes(runtime)}</span>
        <span class="film-card__genre">${(genre[0])}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <span class="film-card__comments"> ${commentsNumber} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${checkIsActiveClassName(watchlistClassName)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${checkIsActiveClassName(alreadyWatchedClassName)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${checkIsActiveClassName(favoriteClassName)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmCardTemplate(this.#card);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  }

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  }

  setShowPopupHandler = (callback) => {
    this._callback.showPopup = callback;
    this.element.querySelector('.film-card__link').addEventListener('click',this.#showPopupClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  #showPopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showPopup();
  }
}
