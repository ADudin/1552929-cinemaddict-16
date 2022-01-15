import {formatFirstLetterToUpperCase} from '../utils/common';
import AbstractView from './abstract-view.js';
import {ScreenModeType} from '../consts';

const DEFAULT_SCREEN_MODE = ScreenModeType.MOVIE_LISTS;
const STATISTIC_SCREEN_MODE = ScreenModeType.STATISTIC;

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  const defaultType = 'ALL';

  return `<a href="#${type}" class="main-navigation__item ${type === currentFilterType  ? 'main-navigation__item--active' : ''}" data-type="${type}" data-mode="${DEFAULT_SCREEN_MODE}">${formatFirstLetterToUpperCase(name)} <span class="main-navigation__item-count ${type === defaultType ? 'visually-hidden' : ''}">${count}</span></a>`;
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional" data-mode="${STATISTIC_SCREEN_MODE}">Stats</a>
  </nav>`;
};

export default class SiteMenuView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createSiteMenuTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((item) => item.addEventListener('click', this.#handleFilterTypeChange));
  }

  setStatisticMenuClickHandler = (callback) => {
    this._callback.statisticMenuClick = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((item) => item.addEventListener('click', this.#handleStatisticMenuClick));
    this.element.querySelector('.main-navigation__additional').addEventListener('click', this.#handleStatisticMenuClick);
  }


  #handleFilterTypeChange = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.type);
  }

  #handleStatisticMenuClick = (evt) => {
    const statisticMenuButton = this.element.querySelector('.main-navigation__additional');
    const filterMenuButtons = this.element.querySelectorAll('.main-navigation__item');

    evt.preventDefault();
    if (evt.target.dataset.mode === ScreenModeType.STATISTIC) {
      statisticMenuButton.classList.add('main-navigation__additional--active');

      for (let i = 0; i < filterMenuButtons.length; i++) {
        if (filterMenuButtons[i].classList.contains('main-navigation__item--active')) {
          filterMenuButtons[i].classList.remove('main-navigation__item--active');
        }
      }
    }

    if (evt.target.dataset.mode === ScreenModeType.MOVIE_LISTS && evt.target.dataset.type === this.#currentFilterType) {
      evt.target.classList.add('main-navigation__item--active');
      statisticMenuButton.classList.remove('main-navigation__additional--active');
    }

    this._callback.statisticMenuClick(evt.target.dataset.mode);
  }
}
