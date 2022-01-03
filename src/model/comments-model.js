import AbstractObsrvable from '../utils/abstract-observable';

export default class CommentsModel extends AbstractObsrvable {
  #comments = [];

  set comments(comments) {
    this.#comments = [...comments];
  }

  get comments() {
    return this.#comments;
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
