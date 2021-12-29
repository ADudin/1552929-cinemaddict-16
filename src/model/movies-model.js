import AbstractObsrvable from '../utils/abstract-observable';

export default class MoviesModel extends AbstractObsrvable {
  #filmCards = [];

  set filmCards(filmCards) {
    this.#filmCards = [...filmCards];
  }

  get filmCards() {
    return this.#filmCards;
  }
}
