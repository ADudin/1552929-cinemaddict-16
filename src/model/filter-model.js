import AbstractObsrvable from '../utils/abstract-observable';
import {FilterType} from '../consts';

export default class FilterModel extends AbstractObsrvable {
  #filter = FilterType.ALL;

  get filter() {

    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
