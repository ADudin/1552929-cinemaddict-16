import AbstractView from './abstract-view.js';
import {SortType} from '../consts.js';

const createSortMenuTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortMenuView extends AbstractView {
  get template() {
    return createSortMenuTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #changeActiveClass = (evt) => {
    const buttons = this.element.querySelectorAll('.sort__button');

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] === evt.target) {
        buttons[i].classList.add('sort__button--active');
      }
      if (buttons[i] !== evt.target) {
        buttons[i].classList.remove('sort__button--active');
      }
    }
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.#changeActiveClass(evt);
  }
}
