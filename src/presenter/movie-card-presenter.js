import FilmCardView from '../view/film-card-view.js';
import FilmDetailsView from '../view/popup/film-details-view.js';

import {
  render,
  remove,
  replace
} from '../utils/render.js';

import {
  RenderPosition,
  UserAction,
  UpdateType,
  FilterType,
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
  #filterType = null;
  #commentsModel = null;

  constructor(movieListContainer, popupContainer, changeData, changeMode, filterType, commentsModel) {
    this.#movieListContainer = movieListContainer;
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#filterType = filterType;
    this.#commentsModel = commentsModel;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsSection;

    this.#filmCardComponent = new FilmCardView(this.#filmCard);

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
      this.#commentsModel.init(this.#filmCard);
      this.#createPopup(this.#commentsModel.comments);
      replace(this.#filmDetailsSection, prevFilmDetailsComponent);
      this.#mode = Mode.SHOW;
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  }

  setSaving = () => {
    this.#filmDetailsSection.updateData({
      isSaving: true,
    });
  }

  setDeleting = (comment) => {
    this.#filmDetailsSection.updateData({
      isDeleting: true,
      commentToDeleteId: comment.id,
    });
  }

  setSaveAborting = () => {
    const resetFormState = () => {
      this.#filmDetailsSection.updateData({
        isSaving: false,
      });
    };
    const newCommentAddElement = document.querySelector('.film-details__new-comment');
    this.#filmDetailsSection.shake(resetFormState, newCommentAddElement);
  }

  setDeleteAborting = (comment) => {
    const resetFormState = () => {
      this.#filmDetailsSection.updateData({
        isDeleting: false,
        commentToDeleteId: null,
      });
    };
    const commentToDeleteElementId = this.#filmDetailsSection._data.comments.filter((item) => item === comment.id);
    const commentToDeleteElement = document.getElementById(commentToDeleteElementId);
    this.#filmDetailsSection.shake(resetFormState, commentToDeleteElement);
  }

  #createPopup = (comments) => {
    this.#filmDetailsSection = new FilmDetailsView(this.#filmCard, comments);
    this.#filmDetailsSection.setCloseBtnClickHandler(this.#handleCloseBtnClick);
    this.#filmDetailsSection.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsSection.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmDetailsSection.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#filmDetailsSection.setDeleteCommentClickHandler(this.#handleDeleteCommentClick);
    this.#filmDetailsSection.setAddNewCommentEventHandler(this.#handleAddNewCommentEvent);
  }

  #showPopup = async () => {
    let comments = [];
    try {
      comments = await this.#commentsModel.init(this.#filmCard);
    } catch(err) {
      comments = [];
    }

    this.#changeMode();
    this.#createPopup(comments);

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
      this.#filterType === FilterType.FAVORITE && this.#filmCard.userDetails.favorite === true ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#filmCard, userDetails:{...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite}}
    );
  }

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILMCARD,
      this.#filterType === FilterType.WATCHLIST && this.#filmCard.userDetails.watchlist === true ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#filmCard, userDetails:{...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist}}
    );
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILMCARD,
      this.#filterType === FilterType.HISTORY && this.#filmCard.userDetails.alreadyWatched === true ? UpdateType.MINOR : UpdateType.PATCH,
      {...this.#filmCard, userDetails:
        {
          ...this.#filmCard.userDetails,
          alreadyWatched: !this.#filmCard.userDetails.alreadyWatched,
          watchingDate: !this.#filmCard.userDetails.alreadyWatched ? new Date() : null
        }
      }
    );
  }

  #handleFilmCardClick = () => {
    this.#showPopup();
  }

  #handleCloseBtnClick = () => {
    this.#closePopup();
  }

  #handleDeleteCommentClick = (commentToDelete) => {
    const newComments = [];
    for (let i = 0; i < this.#filmCard.comments.length; i++) {
      if (this.#filmCard.comments[i] !== commentToDelete.id) {
        newComments.push(this.#filmCard.comments[i]);
      }
    }
    this.#filmCard.comments = newComments;
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#filmCard},
      commentToDelete
    );
  }

  #handleAddNewCommentEvent = (newComment) => {
    this.#filmCard.comments.push(newComment.id);
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {...this.#filmCard},
      newComment
    );
  }
}
