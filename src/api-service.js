const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get filmCards() {
    return this.#load({url: 'movies'})
      .then(ApiService.parseResponce);
  }

  updateFilmCard = async (filmCard) => {
    const responce = await this.#load({
      url: `movies/${filmCard.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(filmCard)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponce(responce);

    return parsedResponce;
  }

  getComments = async (filmCard) => {
    const response = await this.#load({
      url: `comments/${filmCard.id}`,
    });

    const parsedResponse = await ApiService.parseResponce(response);

    return parsedResponse;
  }

  addComment = async (filmCard, comment) => {
    const response = await this.#load({
      url: `comments/${filmCard.id}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptCommentToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponce(response);

    return parsedResponse;
  }

  deleteComment = async (comment) => {
    const response = await this.#load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const responce = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(responce);
      return(responce);
    } catch(err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (filmCard) => {
    const adaptedFilmCard = {...filmCard,
      'id': filmCard.id,
      'film_info': {
        'title': filmCard.title,
        'alternative_title': filmCard.alternativeTitle,
        'total_rating': filmCard.totalRating,
        'poster': filmCard.poster,
        'age_rating': filmCard.ageRating,
        'director': filmCard.director,
        'writers': [...filmCard.writers],
        'actors': [...filmCard.actors],
        'release': {
          'date': filmCard.release.date,
          'release_country': filmCard.release.releaseCountry,
        },
        'runtime': filmCard.runtime,
        'genre': [...filmCard.genre],
        'description': filmCard.description,
      },
      'user_details': {
        'watchlist': filmCard.userDetails.watchlist,
        'already_watched': filmCard.userDetails.alreadyWatched,
        'watching_date': filmCard.userDetails.watchingDate,
        'favorite': filmCard.userDetails.favorite,
      },
      'comments': filmCard.comments,
    };

    delete adaptedFilmCard.title;
    delete adaptedFilmCard.alternativeTitle;
    delete adaptedFilmCard.totalRating;
    delete adaptedFilmCard.poster;
    delete adaptedFilmCard.ageRating;
    delete adaptedFilmCard.director;
    delete adaptedFilmCard.writers;
    delete adaptedFilmCard.actors;
    delete adaptedFilmCard.release;
    delete adaptedFilmCard.runtime;
    delete adaptedFilmCard.genre;
    delete adaptedFilmCard.description;
    delete adaptedFilmCard.userDetails;

    delete adaptedFilmCard.activeEmoji;
    delete adaptedFilmCard.commentText;

    return adaptedFilmCard;
  }

  #adaptCommentToServer = (comment) => {
    const adaptedComment = {...comment,
      'comment': comment.text,
    };

    delete adaptedComment.id;
    delete adaptedComment.text;
    delete adaptedComment.date;

    return adaptedComment;
  }

  static parseResponce = (responce) => responce.json();

  static checkStatus = (responce) => {
    if (!responce.ok) {
      throw new Error(`${responce.status}: ${responce.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
