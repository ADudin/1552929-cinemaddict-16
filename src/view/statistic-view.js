import SmartView from './popup/smart-view';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import {StatisticFilterType} from '../consts';

import {
  getUserProfileRating,
  isWatchedInPeriod,
  getFilteredMoviesTotalDuration,
  getCurrentGenresObject,
  getTopGenreFromMovies
} from '../utils/common.js';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

dayjs.extend(dayOfYear);

const renderStatisticChart = (statisticCtx, watchedMovies, dateFrom) => {

  const filteredMovies = watchedMovies.filter((movie) => isWatchedInPeriod(movie, dateFrom));
  const BAR_HEIGHT = 50;
  const genres = Object.keys(getCurrentGenresObject(filteredMovies));
  const genresCounts = Object.values(getCurrentGenresObject(filteredMovies));

  statisticCtx.height =  BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: genresCounts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createFilterItemTemplate = (type, name, currentFilterType) => (
  `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentFilterType.type ? 'checked' : ''}>
  <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`
);

const createStatisticTemplate = (watchedMovies, dateFrom, currentFilterType) => {
  const filterItemsList = Object.values(StatisticFilterType).map((value) => createFilterItemTemplate(value.type, value.name, currentFilterType)).join('');
  const watchedMoviesCount = watchedMovies.length;
  const filteredMovies = watchedMovies.filter((movie) => isWatchedInPeriod(movie, dateFrom));
  const totalDuration = getFilteredMoviesTotalDuration(filteredMovies);
  const topGenge = getTopGenreFromMovies(filteredMovies);

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
        <p class="statistic__item-text">${filteredMovies.length === 0 ? '' : topGenge[0]}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class StatisticView extends SmartView {
  #moviesModel = null;
  #watchedMovies;
  #currentFilterType = StatisticFilterType.ALL;
  #chart = null;

  constructor (moviesModel) {
    super();
    this.#moviesModel = moviesModel;
    this.#watchedMovies = this.#moviesModel.filmCards.filter((filmCard) => filmCard.userDetails.alreadyWatched === true);

    this._data = {
      dateFrom: dayjs().subtract(100, 'year').toDate(),
    };

    this.#setFilterTypeChangeHandler();
    this.#renderCharts();
  }

  get template() {
    return createStatisticTemplate(this.#watchedMovies, this._data.dateFrom, this.#currentFilterType);
  }

  restoreHandlers = () => {
    this.#setFilterTypeChangeHandler();
    this.#renderCharts();
  }

  #setFilterTypeChangeHandler = () => {
    this.element.querySelector('.statistic__filters').addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value === StatisticFilterType.TODAY.type) {
      this.#currentFilterType = StatisticFilterType.TODAY;
      const startOfTheDay = dayjs().hour(0).minute(0);
      this.updateData({
        dateFrom: startOfTheDay
      });
    }

    if (evt.target.value === StatisticFilterType.WEEK.type) {
      this.#currentFilterType = StatisticFilterType.WEEK;
      const startOfTheWeek = dayjs().day(-6).hour(0).minute(0);
      this.updateData({
        dateFrom: startOfTheWeek
      });
    }

    if (evt.target.value === StatisticFilterType.MONTH.type) {
      this.#currentFilterType = StatisticFilterType.MONTH;
      const startOfTheMonth = dayjs().date(1).hour(0).minute(0);
      this.updateData({
        dateFrom: startOfTheMonth
      });
    }

    if (evt.target.value === StatisticFilterType.YEAR.type) {
      this.#currentFilterType = StatisticFilterType.YEAR;
      const startOfTheYear = dayjs().dayOfYear(1).hour(0).minute(0);
      this.updateData({
        dateFrom: startOfTheYear
      });
    }

    if (evt.target.value === StatisticFilterType.ALL.type) {
      this.#currentFilterType = StatisticFilterType.ALL;
      this.updateData({
        dateFrom: dayjs().subtract(100, 'year').toDate()
      });
    }
  }

  #renderCharts = () => {
    const {dateFrom} = this._data;
    const statisticCtx = this.element.querySelector('.statistic__chart');

    this.#chart = renderStatisticChart(statisticCtx, this.#watchedMovies, dateFrom);
  }
}
