import AbstractView from './abstract-view.js';
import {getUserProfileRating} from '../utils/common.js';

const createUserProfileTemplate = (watchedMoviesCount) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${getUserProfileRating(watchedMoviesCount)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class UserProfileView extends AbstractView {
  #moviesModel = null;
  #watchedMoviesCount = null;

  constructor (moviesModel) {
    super();
    this.#moviesModel = moviesModel;
    this.#watchedMoviesCount = this.#moviesModel.filmCards.filter((filmCard) => filmCard.userDetails.alreadyWatched === true).length;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  get template() {
    return createUserProfileTemplate(this.#watchedMoviesCount);
  }

  #handleModelEvent = (update) => {
    if (update) {
      this.#watchedMoviesCount = this.#moviesModel.filmCards.filter((filmCard) => filmCard.userDetails.alreadyWatched === true).length;
      this.element.querySelector('.profile__rating').textContent = getUserProfileRating(this.#watchedMoviesCount);
    }
  }
}
