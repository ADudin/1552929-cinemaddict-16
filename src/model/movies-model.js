import AbstractObsrvable from '../utils/abstract-observable';
import {UpdateType} from '../consts';

export default class MoviesModel extends AbstractObsrvable {
  #apiService = null;
  #filmCards = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
    /*
    this.#apiService.filmCards.then((filmCards) => {
      console.log(filmCards.map(this.#adaptToClient));
    });
    */
  }

  /*
  set filmCards(filmCards) {
    this.#filmCards = [...filmCards];
  }
  */

  get filmCards() {
    return this.#filmCards;
  }

  init = async () => {
    try {
      const filmCards = await this.#apiService.filmCards;
      //console.log(filmCards);
      this.#filmCards = filmCards.map(this.#adaptToClient);
      //console.log(this.#filmCards);
    } catch(err) {
      this.#filmCards = [];
    }

    this._notify(UpdateType.INIT);
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

  #adaptToClient = (filmCard) => {
    const adaptedFilmCard = {...filmCard,
      'id': filmCard.id,
      'title': filmCard.film_info.title,
      'alternativeTitle': filmCard.film_info.alternative_title,
      'poster': filmCard.film_info.poster,
      'totalRating': filmCard.film_info.total_rating,
      'director': filmCard.film_info.director,
      'writers': [...filmCard.film_info.writers],
      'actors': [...filmCard.film_info.actors],
      'ageRating': filmCard.film_info.age_rating,
      'release': {
        'releaseCountry': filmCard.film_info.release.release_country,
        'date': new Date(filmCard.film_info.release.date),
      },
      'runtime': filmCard.film_info.runtime,
      'genre': [...filmCard.film_info.genre],
      'description': filmCard.film_info.description,
      'userDetails': {
        'watchlist': filmCard.user_details.watchlist,
        'alreadyWatched':filmCard.user_details.already_watched,
        'watchingDate': filmCard.user_details.watching_date,
        'favorite': filmCard.user_details.favorite,
      },
      'comments': filmCard.comments,
    };

    //console.log(filmCard.comments);

    delete adaptedFilmCard['id'];
    delete adaptedFilmCard['film_info'];
    delete adaptedFilmCard['user_details'];
    delete adaptedFilmCard['comments'];

    return adaptedFilmCard;
  }
}
