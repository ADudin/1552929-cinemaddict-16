import {
  RenderPosition,
  StatisticFilterType
} from '../consts';

import {
  remove,
  render
} from '../utils/render';

import StatisticView from '../view/statistic-view';

export default class StatisticPresenter {
  #statisticContainer = null;
  #moviesModel = null;
  #statisticComponent = null;

  #currentFilterType = StatisticFilterType.ALL;

  constructor(statisticContainer, moviesModel) {
    this.#statisticContainer = statisticContainer;
    this.#moviesModel = moviesModel;
  }

  get watchedMovies() {
    return this.#moviesModel.filmCards.filter((filmCard) => filmCard.userDetails.alreadyWatched === true);
  }

  init = () => {
    //this.#currentFilterType = StatisticFilterType.ALL;
    //console.log(this.#currentFilterType);
    const watchedMovies = this.watchedMovies;
    this.#statisticComponent = new StatisticView(watchedMovies, this.#currentFilterType);
    this.#statisticComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    render(this.#statisticContainer, this.#statisticComponent, RenderPosition.BEFOREEND);

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    remove(this.#statisticComponent);
    //this.#currentFilterType = StatisticFilterType.ALL;
    this.#moviesModel.removeObserver(this.#handleModelEvent);
  }


  #handleFilterTypeChange = (currentFilterType) => {
    this.#currentFilterType = currentFilterType;
    //console.log(this.#currentFilterType);

    remove(this.#statisticComponent);
    this.#statisticComponent = new StatisticView(this.watchedMovies, this.#currentFilterType);
    render(this.#statisticContainer, this.#statisticComponent, RenderPosition.BEFOREEND);
  }


  #handleModelEvent = (update) => {
    if (update) {
      remove(this.#statisticComponent);
      render(this.#statisticContainer, this.#statisticComponent, RenderPosition.BEFOREEND);
    }
  }
}
