import dayjs from 'dayjs';
import {getRandomInteger} from '../utils';
import {
  titles,
  posters,
  directors,
  writers,
  actors,
  countries,
  genres,
  textPieces,
  emotions,
  names
} from '../consts';

const generateTitle = () => {
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateRatio = () => {
  const MAX_RATIO = 10;
  const MIN_RATIO = 1;
  const FRACTION_PART_VALUE = 1;

  const ratio = (getRandomInteger(MIN_RATIO, MAX_RATIO) * Math.random()).toFixed(FRACTION_PART_VALUE);
  return ratio;
};

const generateDirector = () => {
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writersList = [];
  const WRITERS_COUNT = 4;

  for (let i = 0; i < WRITERS_COUNT; i++) {
    const randomIndex = getRandomInteger(0, writers.length - 1);

    writersList.push(writers[randomIndex]);
  }

  return writersList;
};

const generateActors = () => {
  const actorsList = [];
  const ACTORS_COUNT = 4;

  for (let i = 0; i < ACTORS_COUNT; i++) {
    const randomIndex = getRandomInteger(0, actors.length - 1);

    actorsList.push(actors[randomIndex]);
  }

  return actorsList;
};

const generateReleaseDate = () => {
  const FIRST_MOVIE_SHOWN_YEAR = 1896;
  const DAYS_NUMBER_IN_YEAR = 365;

  const currentYear = Number(dayjs().toDate().getFullYear());
  const maxDaysGap = (currentYear - FIRST_MOVIE_SHOWN_YEAR) * DAYS_NUMBER_IN_YEAR;
  const daysGap = getRandomInteger(-maxDaysGap, 0);

  return dayjs().add(daysGap, 'day').toDate();
};

const generateCountry = () => {
  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateRuntime = () => {
  const MAX_RUNTIME_IN_MINUTES = 240;

  const runtimeInMinutes = getRandomInteger(0, MAX_RUNTIME_IN_MINUTES);

  return runtimeInMinutes;
};

const generateGenresElement = () => {
  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateGenres = () => {
  const GENRES_COUNT = 3;
  const genresArray = [];

  for (let i = 0; i < GENRES_COUNT; i++) {
    genresArray.push(generateGenresElement());
  }

  return genresArray;
};

const generateTextFragment = () => {
  const randomIndex = getRandomInteger(0, textPieces.length - 1);

  return textPieces[randomIndex];
};

const generateDescription = () => {
  const REPEATS_COUNT = 5;
  const description = [];

  for (let i = 0; i < REPEATS_COUNT; i++) {
    description.push(generateTextFragment());
  }

  return description.join(' ');
};

const generateIsWatched = () => {
  const isWatched = Boolean(getRandomInteger(0, 1));

  return isWatched;
};

const generateEmotions = () => {
  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateCommentAuthorName = () => {
  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateDate = () => {
  const MAX_MINUTES_GAP = 525600;
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, 0);

  return dayjs().add(minutesGap, 'minute').toDate();
};

export const generateComments = () => {
  const comments = [];
  const MAX_COMMENTS_NUMBER = 5;
  const commentsNumber = getRandomInteger(0, MAX_COMMENTS_NUMBER);

  for (let i = 0; i < commentsNumber; i++) {
    const comment = new Object();
    comment.id = i + 1;
    comment.text = generateTextFragment();
    comment.emotion = generateEmotions();
    comment.author = generateCommentAuthorName();
    comment.date = generateDate();

    comments.push(comment);
  }

  return comments;
};

export const generateFilm = () => {
  const isWatched = generateIsWatched();
  const generateWatchingDate = () => {
    if (isWatched === false) {
      return null;
    }

    return generateDate();
  };

  return {
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    poster: generatePoster(),
    totalRating: generateRatio(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    ageRating: getRandomInteger(1, 18),
    release: {
      releaseCountry: generateCountry(),
      date: generateReleaseDate(),
    },
    runtime: generateRuntime(),
    genre: generateGenres(),
    description: generateDescription(),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: isWatched,
      watchingDate: generateWatchingDate(),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
