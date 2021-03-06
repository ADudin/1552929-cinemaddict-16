import AbstractView from '../abstract-view';

export default class SmartView extends AbstractView {
  _data = {};

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    const scrollPosition = this.element.scrollTop;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);
    this.element.scrollTop = scrollPosition;
    this.restoreHandlers();
  }

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = {...this._data, ...update};

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
