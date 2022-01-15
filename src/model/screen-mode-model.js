import AbstractObsrvable from '../utils/abstract-observable';
import {ScreenModeType} from '../consts';

export default class ScreenModeModel extends AbstractObsrvable {
  #screenMode = ScreenModeType.MOVIE_LISTS;

  get screenMode() {

    return this.#screenMode;
  }

  setScreenMode = (screenMode) => {
    this.#screenMode = screenMode;
    this._notify(screenMode);
  }
}
