import AbstractView from './abstract-view';

const createNoFilmCardsTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoFilmCardsTemplate();
  }
}
