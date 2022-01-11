export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const TITLES = [
  'Made for Each Other',
  'Popeye Meets Sinbad',
  'Sagebrush Trial',
  'Santa Claus Conquers the Martians',
  'The Dance of Life',
  'The Great Flamarion',
  'The Man With the Golden Arm',
];

export const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

export const DIRECTORS = [
  'Steven Spielberg',
  'Martin Scorsese',
  'Alfred Hitchcock',
  'Stanley Kubrick',
  'Quentin Tarantino',
  'Ridley Scott',
  'Christopher Nolan',
];

export const WRITERS = [
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

export const WRITERS_COUNT = 4;

export const ACTORS = [
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

export const ACTORS_COUNT = 4;

export const COUNTRIES = [
  'USA',
  'France',
  'Italy',
  'Germany',
  'Sweden',
  'Australia',
  'UK',
  'Netherlands',
];

export const GENRES = [
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

export const GENRES_COUNT = 3;

export const TEXT_FRAGMENTS = [
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

export const TEXT_FRAGMENTS_CONT = 5;

export const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const NAMES = [
  'James Abdnor',
  'Spencer Abrakham',
  'Sandy Adams',
  'Carl Albert',
  'Maryone Allen',
  'Tom Beville',
];

export const MAX_AGE_RATING = 18;
export const MIN_AGE_RATING = 3;

export const MAX_RUNTIME_IN_MINUTES = 240;
export const MIN_RUNTIME_IN_MINUTES = 40;

export const FILM_CARDS_NUMBER = 20;
export const FILM_COUNT_PER_STEP = 5;
export const TOP_RATED_FILMS_COUNT = 2;
export const MOST_COMMENTED_FILMS_COUNT = 2;

export const MAX_COMMENTS_COUNT = 5;

export const SortType = {
  DEFAULT: 'default',
  BY_DATE: 'date-down',
  BY_RATING: 'total-rating-down',
};

export const UserAction = {
  UPDATE_FILMCARD: 'UPDATE_FILMCARD',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITE: 'FAVORITE',
  STATS: 'STATS',
};
