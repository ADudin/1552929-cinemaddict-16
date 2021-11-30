import {
  getRuntimeFromMinutes,
  getShortDescription,
  getFirstArrayElement,
  checkIsActiveClassName
} from '../utils';

export const createFilmCardTemplate = (card, comments) => {
  const {
    poster,
    title,
    totalRating,
    release,
    runtime,
    genre,
    description,
    userDetails
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
        <span class="film-card__genre">${getFirstArrayElement(genre)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
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
