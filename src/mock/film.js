import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye Meets Sinbad',
    'Sagebrush Trial',
    'Santa Claus Conquers the Martians',
    'The Dance of Life',
    'The Great Flamarion',
    'The Man With the Golden Arm',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    '../public/images/posters/made-for-each-other.png',
    '../public/images/posters/popeye-meets-sinbad.png',
    '../public/images/posters/sagebrush-trail.png',
    '../public/images/posters/santa-claus-conquers-the-martians.png',
    '../public/images/posters/the-dance-of-life.png',
    '../public/images/posters/the-great-flamarion.png',
    '../public/images/posters/the-man-with-the-golden-arm.png',
  ];

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
  const directors = [
    'Steven Spielberg',
    'Martin Scorsese',
    'Alfred Hitchcock',
    'Stanley Kubrick',
    'Quentin Tarantino',
    'Ridley Scott',
    'Christopher Nolan',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writersList = [];
  const WRITERS_COUNT = 4;

  for (let i = 0; i < WRITERS_COUNT; i++) {
    const writers = [
      'Asghar Farhadi',
      'Eric Roth',
      'Aaron Sorkin',
      'Woody Allen',
      'Chang-Dong Lee',
      'Richard Linklater',
      'Lars von Trier',
      'Quentin Tarantino',
      'James Cameron',
      'Tom McCarthy',
      'Sarah Polley',
      'Rian Johnson',
    ];

    const randomIndex = getRandomInteger(0, writers.length - 1);

    writersList.push(writers[randomIndex]);
  }

  return writersList;
};

const generateActors = () => {
  const actorsList = [];
  const ACTORS_COUNT = 4;

  for (let i = 0; i < ACTORS_COUNT; i++) {
    const actors = [
      'Jack Nicholson',
      'Robert De Niro',
      'Al Pacino',
      'Dustin Hoffman',
      'Tom Hanks',
      'Brad Pitt',
      'Anthony Hopkins',
      'Jeremy Irons',
      'Denzel Washington',
      'Jeff Bridges',
      'Kevin Costner',
      'Clint Eastwood',
      'Leonardo DiCaprio',
      'Meryl Streep',
      'Jodie Foster',
      'Elizabeth Taylor',
      'Katharine Hepburn',
      'Natalie Portman',
      'Charlize Theron',
      'Cate Blanchett',
      'Judi Dench',
      'Monica Bellucci',
      'Angelina Jolie',
      'Nicole Kidman',
    ];

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
  const countries = [
    'USA',
    'France',
    'Italy',
    'Germany',
    'Sweden',
    'Australia',
    'UK',
    'Netherlands',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateRuntime = () => {
  const MAX_RUNTIME_IN_MINUTES = 240;

  const runtimeInMinutes = getRandomInteger(0, MAX_RUNTIME_IN_MINUTES);

  /*
  generateRuntimeFromMinutes = (mins) => {
    const HOURS_ABB = 'h ';
    const MINUTES_ABB = 'm';
    const hours = Math.trunk(mins / 60);
    const minutes = mins % 60;

    return hours + HOURS_ABB + minutes + MINUTES_ABB;
  }
  */
  return runtimeInMinutes;
};

const generateGenresElement = () => {
  const genres = [
    'Romance',
    'Thriller',
    'Sci-Fi',
    'Comedy',
    'Horror',
    'Action',
    'Documentary',
    'Adventure',
    'Western',
    'Roadmovie',
    'Drama',
    'Animation',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateGenres = () => {
  const GENRES_COUNT = 3;

  const genres = [];

  for (let i = 0; i < GENRES_COUNT; i++) {
    genres.push(generateGenresElement());
  }

  return genres;
};

const generateTextFragment = () => {
  const textPieces = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

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

/*
const generateShortDescription = () => {
  const LIMIT = 140;
  const description = generateDescription();
  const etc = '...';

  if (description.length <= LIMIT) {

    return description;
  } else {

    return description.substring(0, LIMIT - 1) + etc;
  }
};
*/

const generateIsWatched = () => {
  const isWatched = Boolean(getRandomInteger(0, 1));

  return isWatched;
};

const generateEmotions = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];
  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateCommentAuthorName = () => {
  const names = [
    'James Abdnor',
    'Spencer Abrakham',
    'Sandy Adams',
    'Carl Albert',
    'Maryone Allen',
    'Tom Beville',
  ];
  const randomIndex = getRandomInteger(0, names.length - 1);

  return names[randomIndex];
};

const generateDate = () => {
  const MAX_MINUTES_GAP = 525600;
  const minutesGap = getRandomInteger(-MAX_MINUTES_GAP, 0);

  return dayjs().add(minutesGap, 'minute').toDate();
};

const generateComments = () => {
  const comments = [];
  const MAX_COMMENTS_NUMBER = 5;
  const commentsNumber = getRandomInteger(0, MAX_COMMENTS_NUMBER);

  for (let i = 0; i < commentsNumber; i++) {
    const comment = new Object();
    comment.id = getRandomInteger(0, i);
    comment.text = generateTextFragment();
    comment.emotion = generateEmotions();
    comment.author = generateCommentAuthorName();
    comment.date = generateDate();

    comments.push(comment);
  }

  return comments;
};

/*
export const generateFilms = () => {
  const films = [];
  const FILMS_NUMBER = 10;

  for (let i = 0; i < FILMS_NUMBER; i++) {

    };

    films.push(generateFilm());
  }

  return films;
};
*/

export const generateFilm = () => {
  const isWatched = generateIsWatched();
  const generateWatchingDate = () => {
    if (isWatched === false) {
      return null;
    }

    return generateDate();
  };

  return {
    //id: i,
    //comments: generateComments(), //rewrite
    title: generateTitle(),
    alternativeTitle: generateTitle(),
    poster: generatePoster(),
    totalRating: generateRatio(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      releaseCountry: generateCountry(),
      date: generateReleaseDate(),
    },
    runtime: generateRuntime(),
    genre: generateGenres(),
    //genres: generateGenresElement(),
    description: generateDescription(),
    //shortDescription: generateShortDescription(),
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: isWatched,
      watchingDate: generateWatchingDate(),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
