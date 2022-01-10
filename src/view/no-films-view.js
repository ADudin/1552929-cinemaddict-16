import AbstractView from './abstract-view.js';
import {FilterType} from '../consts.js';

const NoFilmCardsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]: 'There are no favorite movies now',
};

const createNoFilmsTemplate = (filterType) => {
  const noFilmCardsTextValue = NoFilmCardsTextType[filterType];
  return (
    `<p class="board__no-tasks">
    ${noFilmCardsTextValue}
    </p>`
  );
};

export default class NoFilmsView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoFilmsTemplate(this._data);
  }
}
