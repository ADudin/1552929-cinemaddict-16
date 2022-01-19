import AbstractObsrvable from '../utils/abstract-observable';

export default class MoviesModel extends AbstractObsrvable {
  #apiService = null;
  #filmCards = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.filmCards.then((filmCards) => {
      console.log(filmCards);
    });
  }

  set filmCards(filmCards) {
    this.#filmCards = [...filmCards];
  }

  get filmCards() {
    return this.#filmCards;
  }

  updateFilmCard = (updateType, update) => {
    const index = this.#filmCards.findIndex((filmCard) => filmCard.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting filmCard');
    }

    this.#filmCards = [
      ...this.#filmCards.slice(0, index),
      update,
      ...this.#filmCards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
