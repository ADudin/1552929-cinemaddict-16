import SiteMenuView from '../view/site-menu-view';
import {
  RenderPosition,
  UpdateType,
  FilterType,
  ScreenModeType,
} from '../consts';

import {
  render,
  remove,
  replace,
} from '../utils/render';

import {filter} from '../utils/filter';

import {handleSiteMenuClick} from '../main';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #moviesModel = null;

  #filterComponent = null;

  #currentScreenMode = ScreenModeType.MOVIE_LISTS;

  constructor(filterContainer, filterModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#moviesModel = moviesModel;
  }

  get filters() {
    const filmCards = this.#moviesModel.filmCards;

    return [
      {
        type: FilterType.ALL,
        name: 'all movies',
        count: filter[FilterType.ALL](filmCards).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'watchlist',
        count: filter[FilterType.WATCHLIST](filmCards).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'history',
        count: filter[FilterType.HISTORY](filmCards).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'favorite',
        count: filter[FilterType.FAVORITE](filmCards).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new SiteMenuView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    this.#filterComponent.setStatisticMenuClickHandler(this.#handleScreenModeTypeChange);

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  #handleScreenModeTypeChange = (modeType) => {

    if (this.#currentScreenMode === modeType) {
      return;
    }

    this.#currentScreenMode = modeType;
    handleSiteMenuClick(this.#currentScreenMode);
  }
}
