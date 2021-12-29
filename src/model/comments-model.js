import AbstractObsrvable from '../utils/abstract-observable';

export default class CommentsModel extends AbstractObsrvable {
  #comments = [];

  set comments(comments) {
    this.#comments = [...comments];
  }

  get comments() {
    return this.#comments;
  }
}
