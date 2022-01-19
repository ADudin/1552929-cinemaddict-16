const Method = {
  GET: 'GET',
  PUT: 'PUT',
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
      body: JSON.stringify(filmCard),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponce = await ApiService.parseResponce(responce);

    return parsedResponce;
  }

  getComments = async (filmCard) => {
    const responce = await this.#load({
      url: `comments/${filmCard.id}`,
    });

    const parsedResponce = await ApiService.parseResponce(responce);

    return parsedResponce;
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
