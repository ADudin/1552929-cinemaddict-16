import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {MAX_COMMENTS_COUNT} from '../consts';

dayjs.extend(isSameOrAfter);

export const getRandomInteger = (a = 0, b = 1) => { // Генерация случайного числа (модуль: film.js);
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => { // Генерация случайного элемента массива (модуль: film.js);
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

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
  const commentDate = dayjs(date).format('YYYY/MM/DD HH:mm');

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

export const getCommentsIdArray = () => { // Создание массива id комментариев (модуль: film.js);
  const commentsId = [];
  const idCount = getRandomInteger(0, MAX_COMMENTS_COUNT);

  for (let i = 0; i < idCount; i++) {
    commentsId.push(i);
  }

  return commentsId;
};

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
  const genresArray = [];
  const currentGenresObject = {};

  movies.forEach((movie) => genresArray.push(movie.genre));
  genresArray.flat().forEach((item) => {currentGenresObject[item] = (currentGenresObject[item] || 0) + 1;});

  return currentGenresObject;
};

export const getTopGenreFromMovies = (movies) => { // statistic-view.js
  const genresObject = getCurrentGenresObject(movies);

  return getMaxObjectKey(genresObject).slice(0, 1);
};
