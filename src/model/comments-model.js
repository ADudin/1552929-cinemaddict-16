import AbstractObsrvable from '../utils/abstract-observable';

export default class CommentsModel extends AbstractObsrvable {
  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  /*
  set comments(comments) {
    this.#comments = [...comments];
  }
  */

  get comments() {
    return this.#comments;
  }

  init = async (filmCard) => {
    try {
      const comments = await this.#apiService.getComments(filmCard);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    return this.#comments;
  }

  #adaptToClient = (comment) => {
    const adaptedComment = {...comment,
      'id': comment.id,
      'author': comment.author,
      'text': comment.comment,
      'emotion': comment.emotion,
      'date': comment.date,
    };

    delete adaptedComment['comment'];

    return adaptedComment;
  }

  addComment = (updateType, update, newComment) => {
    this.#comments = [
      newComment,
      ...this.#comments,
    ];
    this._notify(updateType, update);
  }

  deleteComment = (updateType, update, commentToDelete) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
