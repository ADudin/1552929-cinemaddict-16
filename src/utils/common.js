import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

export const getRuntimeFromMinutes = (mins) => { // Преобразование продолжительности фильма в заданный формат (модули: film-card-view.js, film-details-view.js);
  const HOURS_ABB = 'h ';
  const MINUTES_ABB = 'm';
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  if (mins < 60) {

    return minutes + MINUTES_ABB;
  }

  if (minutes === 0) {

    return hours + HOURS_ABB;
  }

  return hours + HOURS_ABB + minutes + MINUTES_ABB;
};

export const getReleaseDateForPopup = (key) => { // Преобразование даты релиза в заданный формат (модули: film-details-view.js);
  const releaseDate = key.date;
  const formattedReleaseDate = dayjs(releaseDate).format('DD MMMM YYYY');

  return formattedReleaseDate;
};

export const getCommentDate = (date) => { // Преобразование даты комментария в заданный формат (модуль: comments-view.js);
  const commentDate = dayjs(date).fromNow();

  return commentDate;
};

export const getShortDescription = (text) => { // Преобразование описания фильма в заданный формат (модуль: film-card-view.js);
  const LIMIT = 140;
  const description = text;
  const etc = '...';

  if (description.length <= LIMIT) {

    return description;
  }

  return description.substring(0, LIMIT - 1) + etc;
};

export const getFirstArrayElement = (array) => { // Получение первого элемента массива (модуль: film-card-view.js);
  const genre = array[0];

  return genre;
};

export const checkIsActiveClassName = (key) => { // Проверка для добаления активного класса кнопкам (модуль: film-card-view.js, film-details-view.js);
  const className = '';
  const activeClassName = 'film-card__controls-item--active';

  if (key) {

    return activeClassName;
  }

  return className;
};

export const checkIsActiveClassNamePopup = (key) => { // Проверка для добаления активного класса кнопкам (модуль: film-details-view.js);
  const className = '';

  if (key) {

    return 'film-details__control-button--active';
  }

  return className;
};

export const formatFirstLetterToUpperCase = (title) => (title[0].toUpperCase() + title.slice(1)); // Формат с большой буквы (модуль: site-menu-view.js);

export const getTopRatedFilms = (films, filmsCount) => { // Сортировка карточек фильмов по рейтингу (модуль: main.js);
  const sortedFilms = films.slice().sort((a, b) => b.totalRating - a.totalRating).slice(0, filmsCount);

  return sortedFilms;
};

export const getMostCommentedFilms = (films, filmsCount) => { // Сортировка карточек фильмов по количеству комментариев (модуль: main.js);
  const sortedFilms = films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, filmsCount);

  return sortedFilms;
};

export const getSortedByDateFilms = (films, filmsCount) => {
  const sortedFilms = films.slice().sort((a, b) => b.release.date - a.release.date).slice(0, filmsCount);

  return sortedFilms;
};

export const getUserProfileRating = (watchedMoviesCount) => {
  const UserRankType = {
    NOVICE: 'Novice',
    FAN: 'Fan',
    MOVIE_BUFF: 'Movie Buff',
  };

  if (watchedMoviesCount === 0) {
    return '';
  }
  if (watchedMoviesCount <= 10) {
    return UserRankType.NOVICE;
  }
  if (watchedMoviesCount <= 20) {
    return UserRankType.FAN;
  }

  return UserRankType.MOVIE_BUFF;
};

export const isWatchedInPeriod = (movie, date) => dayjs(movie.userDetails.watchingDate).isSameOrAfter(date); // statistic-view.js

export const getFilteredMoviesTotalDuration = (movies) => { // statistic-view.js
  let totalDurationInMins = 0;

  for (let i = 0; i < movies.length; i++) {
    totalDurationInMins += movies[i].runtime;
  }

  const hours = Math.trunc(totalDurationInMins / 60);
  const minutes = totalDurationInMins % 60;
  const duration = new Object();
  duration.hours = hours;
  duration.minutes = minutes;

  return duration;
};

const getMaxObjectKey = (obj) => {
  const maxValue = Math.max.apply(null, Object.values(obj));

  return Object.keys(obj).filter((key) => obj[key] === maxValue);
};

export const getCurrentGenresObject = (movies) => { // statistic-view.js
  const genres = [];
  const currentGenres = {};

  movies.forEach((movie) => genres.push(movie.genre));
  genres.flat().forEach((item) => {currentGenres[item] = (currentGenres[item] || 0) + 1;});

  return currentGenres;
};

export const getTopGenreFromMovies = (movies) => { // statistic-view.js
  const genres = getCurrentGenresObject(movies);

  return getMaxObjectKey(genres).slice(0, 1);
};
