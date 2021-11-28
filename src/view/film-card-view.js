import {generateComments} from '../mock/film';

const getRuntimeFromMinutes = (mins) => {
  const HOURS_ABB = 'h ';
  const MINUTES_ABB = 'm';
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  if (mins <= 60) {

    return minutes + MINUTES_ABB;
  }

  if (minutes === 0) {

    return hours + HOURS_ABB;
  }

  return hours + HOURS_ABB + minutes + MINUTES_ABB;
};

const getGenreFromGenres = (genresArray) => {
  const genre = genresArray[0];

  return genre;
};

const getShortDescription = (text) => {
  const LIMIT = 140;
  const description = text;
  const etc = '...';

  if (description.length <= LIMIT) {

    return description;
  }

  return description.substring(0, LIMIT - 1) + etc;
};

const checkIsActiveClassName = (key) => {
  const className = '';

  if (key) {

    return 'film-card__controls-item--active';
  }

  return className;
};

export const createFilmCardTemplate = (card) => {
  const {poster, title, totalRating, release, runtime, genre, description, userDetails} = card;
  const releaseYear = release.date.getFullYear();
  const commentsArray = generateComments();
  const commentsNumber = commentsArray.length;
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
        <span class="film-card__genre">${getGenreFromGenres(genre)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getShortDescription(description)}</p>
      <span class="film-card__comments">${commentsNumber} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${checkIsActiveClassName(watchlistClassName)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${checkIsActiveClassName(alreadyWatchedClassName)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${checkIsActiveClassName(favoriteClassName)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
