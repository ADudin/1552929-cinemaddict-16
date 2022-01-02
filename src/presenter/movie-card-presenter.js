import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/popup/film-details-view.js';

import {filmComments} from '../main.js';

import {
  render,
  remove,
  replace
} from '../utils/render.js';

import {
  RenderPosition,
  UserAction,
  UpdateType
} from '../consts.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  SHOW: 'SHOW',
};

export default class MovieCardPresenter {
  #movieListContainer = null;
  #popupContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmCardComponent = null;
  #documentBody = document.querySelector('body');
  #filmDetailsSection = null;

  #filmCard = null;
  #mode = Mode.DEFAULT;

  constructor(movieListContainer, popupContainer, changeData, changeMode) {
    this.#movieListContainer = movieListContainer;
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsSection;

    this.#filmCardComponent = new FilmCardView(filmCard, filmComments);

    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setShowPopupHandler(this.#handleFilmCardClick);

    if (prevFilmCardComponent === null) {
      render(this.#movieListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if(this.#mode === Mode.SHOW) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#createPopup();
      replace(this.#filmDetailsSection, prevFilmDetailsComponent);
      this.#mode = Mode.SHOW;
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsSection);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  }

  #createPopup = () => {
    const comments = filmComments.filter((element) => this.#filmCard.comments.includes(element.id));
    this.#filmDetailsSection = new FilmDetailsView(this.#filmCard, comments);

    this.#filmDetailsSection.setCloseBtnClickHandler(this.#handleCloseBtnClick);
    this.#filmDetailsSection.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsSection.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmDetailsSection.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmDetailsSection.setDeleteCommentClickHandler(this.#handleDeleteCommentClick);
  }

  #showPopup = () => {
    this.#changeMode();
    this.#createPopup();

    render(this.#popupContainer, this.#filmDetailsSection, RenderPosition.BEFOREEND);

    this.#documentBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.SHOW;
  }

  #closePopup = () => {
    remove(this.#filmDetailsSection);

    this.#documentBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      this.#closePopup();
    }
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILMCARD,
      UpdateType.PATCH,
      {...this.#filmCard, userDetails:{...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite}}
    );
  }

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILMCARD,
      UpdateType.PATCH,
      {...this.#filmCard, userDetails:{...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist}}
    );
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILMCARD,
      UpdateType.PATCH,
      {...this.#filmCard, userDetails:{...this.#filmCard.userDetails, alreadyWatched: !this.#filmCard.userDetails.alreadyWatched}}
    );
  }

  #handleFilmCardClick = () => {
    this.#showPopup();
  }

  #handleCloseBtnClick = () => {
    this.#closePopup();
  }

  #handleDeleteCommentClick = (commentToDelete) => {
    const commentToDeleteIndex = this.#filmCard.comments.findIndex((item) => item.id === commentToDelete.id);
    this.#filmCard.comments.splice(commentToDeleteIndex, 1);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#filmCard},
      commentToDelete
    );
  }
}
