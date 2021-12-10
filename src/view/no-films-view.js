import AbstractView from './abstract-view.js';

const createNoFilmsTemplate = () => (
  `<p class="board__no-tasks">
    There are no movies in our database
  </p>`
);

export default class NoFilmsView extends AbstractView{
  get template() {
    return createNoFilmsTemplate();
  }
}
