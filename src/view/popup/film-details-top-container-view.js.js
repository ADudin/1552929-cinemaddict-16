import {
  getRuntimeFromMinutes,
  getReleaseDateForPopup,
  checkIsActiveClassNamePopup
} from '../../utils/common';

import AbstractView from '../abstract-view.js';

const renderGenres = (genresArray) => {
  const genres = [];

  for (let i = 0; i < genresArray.length; i ++) {
    genres.push(`<span class="film-details__genre">${genresArray[i]}</span>`);
  }

  return genres.join('');
};

export const createFilmDetailsTopContainerTemplate = (card) => {
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

  return `<div class="film-details__top-container">
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
  </div>`;
};

export default class FilmDetailsTopContainerView extends AbstractView {
  #card = null;
  #comments = null;

  constructor(card, comments) {
    super();
    this.#card = card;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTopContainerTemplate(this.#card, this.#comments);
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

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
