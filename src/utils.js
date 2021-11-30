import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => { // Генерация случайного числа (модули: film.js);
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRuntimeFromMinutes = (mins) => { // Преобразование продолжительности фильма в заданный формат (модули: film-card-view.js, popup-view.js);
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

export const getReleaseDateForPopup = (key) => { // Преобразование даты релиза в заданный формат (модули: popup-view.js);
  const releaseDate = key.date;
  const formattedReleaseDate = dayjs(releaseDate).format('DD MMMM YYYY');

  return formattedReleaseDate;
};

export const getCommentDate = (date) => { // Преобразование даты комментария в заданный формат (модуль: comment-view.js);
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

export const getFirstArrayElement = (Array) => { // Получение первого элемента массива (модуль: film-card-view.js);
  const genre = Array[0];

  return genre;
};

export const checkIsActiveClassName = (key) => { // Проверка для добаления активного класса кнопкам (модуль: film-card-view.js, popup-view.js);
  const className = '';

  if (key) {

    return 'film-card__controls-item--active';
  }

  return className;
};

export const checkIsActiveClassNamePopup = (key) => { // Проверка для добаления активного класса кнопкам (модуль: popup-view.js);
  const className = '';

  if (key) {

    return 'film-details__control-button--active';
  }

  return className;
};
/*
const getIdValue = (object) => { // Служебная функция для функции getIdValueArray;
  const idValue = object.id;

  return idValue;
};

export const getIdValueArray = (array) => { // Плучение массива из id комментариев (модуль: film-view.js);
  const idArray = [];

  for (let i = 0; i < array.length; i++) {
    idArray.push(getIdValue(array[i]));
  }

  return idArray;
};
*/


