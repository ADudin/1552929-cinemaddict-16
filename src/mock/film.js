import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  generateRatio,
  generateReleaseDate,
  generateDate,
  isFilmWatched,
} from '../utils';

import {
  TITLES,
  POSTERS,
  DIRECTORS,
  WRITERS,
  ACTORS,
  COUNTRIES,
  GENRES,
  TEXT_FRAGMENTS,
  EMOTIONS,
  NAMES,
  WRITERS_COUNT,
  ACTORS_COUNT,
  MAX_AGE_RATING,
  MIN_AGE_RATING,
  MAX_RUNTIME_IN_MINUTES,
  MIN_RUNTIME_IN_MINUTES,
  GENRES_COUNT,
  TEXT_FRAGMENTS_CONT
} from '../consts';

export const generateComments = () => {
  const comments = [];
  const MAX_COMMENTS_NUMBER = 5;
  const commentsNumber = getRandomInteger(0, MAX_COMMENTS_NUMBER);

  for (let i = 0; i < commentsNumber; i++) {
    const comment = new Object();
    comment.id = i + 1;
    comment.text = getRandomArrayElement(TEXT_FRAGMENTS);
    comment.emotion = getRandomArrayElement(EMOTIONS);
    comment.author = getRandomArrayElement(NAMES);
    comment.date = generateDate();

    comments.push(comment);
  }

  return comments;
};

export const generateFilm = () => {
  const isWatched = isFilmWatched();
  const generateWatchingDate = () => {
    if (isWatched === false) {
      return null;
    }

    return generateDate();
  };

  return {
    title: getRandomArrayElement(TITLES),
    alternativeTitle: getRandomArrayElement(TITLES),
    poster: getRandomArrayElement(POSTERS),
    totalRating: generateRatio(),
    director: getRandomArrayElement(DIRECTORS),
    writers: getRandomArray(WRITERS, WRITERS_COUNT),
    actors: getRandomArray(ACTORS, ACTORS_COUNT),
    ageRating: getRandomInteger(MIN_AGE_RATING, MAX_AGE_RATING),
    release: {
      releaseCountry: getRandomArrayElement(COUNTRIES),
      date: generateReleaseDate(),
    },
    runtime: getRandomInteger(MIN_RUNTIME_IN_MINUTES, MAX_RUNTIME_IN_MINUTES),
    genre: getRandomArray(GENRES, GENRES_COUNT),
    description: getRandomArray(TEXT_FRAGMENTS, TEXT_FRAGMENTS_CONT).join(' '),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: isWatched,
      watchingDate: generateWatchingDate(),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
