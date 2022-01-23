export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

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
  INIT: 'INIT',
};

export const FilterType = {
  ALL: 'ALL',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY',
  FAVORITE: 'FAVORITE',
  STATS: 'STATS',
};

export const ScreenModeType = {
  MOVIE_LISTS: 'MOVIE_LISTS',
  STATISTIC: 'STATISTIC',
};

export const StatisticFilterType = {
  ALL: {
    type: 'all-time',
    name: 'All time',
  },
  TODAY: {
    type: 'today',
    name: 'Today',
  },
  WEEK: {
    type: 'week',
    name: 'Week',
  },
  MONTH: {
    type: 'month',
    name: 'Month',
  },
  YEAR: {
    type: 'year',
    name: 'Year',
  },
};

export const AUTHORIZATION = 'Basic kTy0gIdzs1234rD';
export const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict/';
