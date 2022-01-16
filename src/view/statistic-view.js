import SmartView from './popup/smart-view';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import {getUserProfileRating} from '../utils/common.js';
import {StatisticFilterType} from '../consts';
//import Chart from 'chart.js';
//import ChartDataLabels from 'chartjs-plugin-datalabels';

dayjs.extend(dayOfYear);
dayjs.extend(isSameOrAfter);

const createFilterItemTemplate = (type, name, currentFilterType) => (
  `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentFilterType.type ? 'checked' : ''}>
  <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`
);

const createStatisticTemplate = (watchedMovies, dateFrom, currentFilterType) => {
  const filterItemsList = Object.values(StatisticFilterType).map((value) => createFilterItemTemplate(value.type, value.name, currentFilterType)).join('');
  const watchedMoviesCount = watchedMovies.length;

  const isWatchedInPeriod = (movie) => dayjs(movie.userDetails.watchingDate).isSameOrAfter(dateFrom);

  const filteredMovies = watchedMovies.filter((movie) => isWatchedInPeriod(movie));
  /*
  const getFilteredMovies = (movies) => {
    const filteredMoviesArray = [];

    for (let i = 0; i < movies.length; i++) {
      const watchingDate = movies[i].userDetails.watchingDate;

      if (dayjs(watchingDate).isSameOrAfter(dateFrom)) {
        filteredMoviesArray.push(movies[i]);
      }
    }

    return filteredMoviesArray;
  };
  */
  const getFilteredMoviesTotalDuration = (movies) => {
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

  const getGenresList = (movies) => {
    const genres = new Set();
    for(const movie of movies) {
      genres.add(...movie.genre.map((genre) => genre));
    }

    return [...genres];
  };

  const getMoviesByGenre = (movies) => {
    const genres = getGenresList(movies);
    const moviesByGenre = new Array();
    genres.forEach((genre) => {
      const moviesCount = movies.slice().filter((movie) => movie.genre.includes(genre)).length;
      moviesByGenre.push(moviesCount);
    });

    return moviesByGenre;
  };

  const getTopGenre = (movies) => {
    const genres = getGenresList(movies);
    const moviesByGenre = getMoviesByGenre(movies);
    const topGenreMoviesNumber = Math.max(...moviesByGenre);
    const genresMoviesPairs = [];
    const topGenre = [];

    let count = 0;

    for(const genre of genres) {
      genresMoviesPairs.push({name: genre, count: moviesByGenre[count]});
      count ++;
    }

    for(const pair of genresMoviesPairs) {
      if(pair.count === topGenreMoviesNumber) {
        topGenre.push(pair.name);
      }
    }

    return [...topGenre];
  };

  const totalDuration = getFilteredMoviesTotalDuration(filteredMovies);
  const topGenge = getTopGenre(filteredMovies);

  //console.log(watchedMoviesCount);
  //console.log(filteredMovies.length);

  return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${getUserProfileRating(watchedMoviesCount)}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterItemsList}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filteredMovies.length >= 1 ? filteredMovies.length : 0} <span class="statistic__item-description">${filteredMovies > 1 || filteredMovies === 0 ? 'movies' : 'movie'}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalDuration.hours} <span class="statistic__item-description">h</span> ${totalDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${filteredMovies.length === 0 ? '' : topGenge}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class StatisticView extends SmartView {
  #watchedMovies = null;
  #currentFilterType = null;

  constructor (watchedMovies, currentFilterType) {
    super();
    this.#watchedMovies = watchedMovies;
    this.#currentFilterType = currentFilterType;

    this._data = {
      dateFrom: dayjs().subtract(100, 'year').toDate(),
      dateTo: dayjs().toDate(),
    };
  }

  get template() {

    return createStatisticTemplate(this.#watchedMovies, this._data.dateFrom, this.#currentFilterType);
  }

  restoreHandlers = () => {
    this.setFilterTypeChangeHandler();
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelector('.statistic__filters').addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value === StatisticFilterType.TODAY.type) {
      this.#currentFilterType = StatisticFilterType.TODAY;
      this.updateData({
        dateFrom: dayjs().toDate(),
      });
    }

    if (evt.target.value === StatisticFilterType.WEEK.type) {
      const dayOfCurrentWeek = dayjs().day();
      this.#currentFilterType = StatisticFilterType.WEEK;
      this.updateData({
        dateFrom: dayjs().subtract(dayOfCurrentWeek, 'day').toDate()
      });
    }

    if (evt.target.value === StatisticFilterType.MONTH.type) {
      const dayOfCurrentMonth = dayjs().date();
      this.#currentFilterType = StatisticFilterType.MONTH;
      this.updateData({
        dateFrom: dayjs().subtract(dayOfCurrentMonth, 'day').toDate()
      });
    }

    if (evt.target.value === StatisticFilterType.YEAR.type) {
      const dayOfCurrentYear = dayjs().dayOfYear();
      this.#currentFilterType = StatisticFilterType.YEAR;
      this.updateData({
        dateFrom: dayjs().subtract(dayOfCurrentYear, 'day').toDate()
      });
    }

    if (evt.target.value === StatisticFilterType.ALL.type) {
      this.#currentFilterType = StatisticFilterType.ALL;
      this.updateData({
        dateFrom: dayjs().subtract(100, 'year').toDate()
      });
    }
  }
}
