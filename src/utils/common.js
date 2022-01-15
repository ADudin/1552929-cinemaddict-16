import dayjs from 'dayjs';
import {MAX_COMMENTS_COUNT} from '../consts';

export const getRandomInteger = (a = 0, b = 1) => { // Генерация случайного числа (модуль: film.js);
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => { // Генерация случайного элемента массива (модуль: film.js);
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const getRandomArray = (array, randomArrayLength) => { // Генерация случайного массива элементов (модуль: film.js);
  const randomArray = [];

  for (let i = 0; i < randomArrayLength; i++) {
    const randomIndex = getRandomInteger(0, array.length - 1);

    randomArray.push(array[randomIndex]);
  }

  return randomArray;
};

export const generateRatio = () => { // Генерация случайного рейтинга фильма (модуль: film.js);
  const MAX_RATIO = 10;
  const MIN_RATIO = 1;
  const FRACTION_PART_VALUE = 1;

  const ratio = (getRandomInteger(MIN_RATIO, MAX_RATIO) * Math.random()).toFixed(FRACTION_PART_VALUE);
  return ratio;
};

export const generateReleaseDate = () => { // Генерация случайной даты релиза фильма (модуль: film.js);
  const FIRST_MOVIE_SHOWN_YEAR = 1896;
  const DAYS_NUMBER_IN_YEAR = 365;

  const currentYear = Number(dayjs().toDate().getFullYear());
  const maxDaysGap = (currentYear - FIRST_MOVIE_SHOWN_YEAR) * DAYS_NUMBER_IN_YEAR;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

export const generateDate = () => { // Генерация случайной даты релиза фильма (модуль: film.js);
  const MAX_MINUTES_GAP = 525600;
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, 0);

  return dayjs().add(minutesGap, 'minute').toDate();
};

export const isFilmWatched = () => { // Генерация случайного значения "просмотрен / не просмотрен фильм" (модули: film.js, filter.js);
  const isWatched = Boolean(getRandomInteger(0, 1));

  return isWatched;
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
