import FilmCardView from '../view/film-card-view.js';
import FilmDetailsSectionView from '../view/popup/film-details-section-view.js';
import FilmDetailsFormView from '../view/popup/film-details-form-view.js';
import FilmDetailsBottomContainerView from '../view/popup/film-details-bottom-container-view.js';
import FilmDetailsTopContainerView from '../view/popup/film-details-top-container-view.js.js';
import FilmDetailsCommentsWrapView from '../view/popup/film-details-comments-wrap-view.js';
import FilmDetailsCommentsTitleView from '../view/popup/film-details-comments-title-view.js';
import FilmDetailsNewCommentView from '../view/popup/film-details-new-comment-view.js';
import FilmDetailsCommentsListView from '../view/popup/film-details-comments-list.js';
import CommentsView from '../view/popup/comments-view.js';

import {filmComments} from '../main.js';

import {
  render,
  remove,
  replace
} from '../utils/render.js';

import {RenderPosition} from '../consts.js';

export default class MovieCardPresenter {
  #movieListContainer = null;
  #changeData = null;

  #filmCardComponent = null;
  #documentBody = document.querySelector('body');
  #filmDetailsSection = null;
  #filmDetailsForm = null;
  #filmDetailsTopContainer = null;
  #filmDetailsBottomContainer = null;
  #filmDetailsCommentsWrap = null;
  #filmDetailsNewComment = null;
  #filmDetailsCommentsList = null;

  #filmCard = null;
  //#filmComments = [];

  constructor(movieListContainer, changeData) {
    this.#movieListContainer = movieListContainer;
    this.#changeData = changeData;
  }

  init = (filmCard) => {
    this.#filmCard = filmCard;
    //this.#filmComments = [];

    const prevFilmCardComponent = this.#filmCardComponent;
    const prevFilmDetailsComponent = this.#filmDetailsSection;

    this.#filmCardComponent = new FilmCardView(filmCard, filmComments);
    this.#filmDetailsSection = new FilmDetailsSectionView();
    this.#filmDetailsForm = new FilmDetailsFormView();
    this.#filmDetailsTopContainer = new FilmDetailsTopContainerView(filmCard);
    this.#filmDetailsBottomContainer = new FilmDetailsBottomContainerView();
    this.#filmDetailsCommentsWrap = new FilmDetailsCommentsWrapView();
    this.#filmDetailsNewComment = new FilmDetailsNewCommentView();
    this.#filmDetailsCommentsList = new FilmDetailsCommentsListView();

    this.#filmCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmCardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);

    this.#filmCardComponent.setShowPopupHandler(this.#handleFilmCardClick);
    this.#filmDetailsTopContainer.setCloseBtnClickHandler(this.#handleCloseBtnClick);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this.#movieListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieListContainer.element.contains(prevFilmCardComponent.element)) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if(this.#movieListContainer.element.contains(prevFilmDetailsComponent.element)) {
      replace(this.#filmDetailsSection, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#filmDetailsSection);
  }

  #showPopup = () => {
    render(this.#movieListContainer, this.#filmDetailsSection, RenderPosition.AFTEREND);
    render(this.#filmDetailsSection, this.#filmDetailsForm, RenderPosition.BEFOREEND);
    render(this.#filmDetailsForm, this.#filmDetailsTopContainer, RenderPosition.AFTERBEGIN);
    render(this.#filmDetailsForm, this.#filmDetailsBottomContainer, RenderPosition.BEFOREEND);
    render(this.#filmDetailsBottomContainer, this.#filmDetailsCommentsWrap, RenderPosition.BEFOREEND);

    const comments = filmComments.filter((element) => this.#filmCard.comments.includes(element.id));
    const filmDetailsCommentsTitle = new FilmDetailsCommentsTitleView(comments);

    render(this.#filmDetailsCommentsWrap, filmDetailsCommentsTitle, RenderPosition.AFTERBEGIN);
    render(this.#filmDetailsCommentsWrap, this.#filmDetailsCommentsList, RenderPosition.BEFOREEND);
    render(this.#filmDetailsCommentsWrap, this.#filmDetailsNewComment, RenderPosition.BEFOREEND);

    for (let i = 0; i < comments.length; i++) {
      render(this.#filmDetailsCommentsList, new CommentsView(comments[i]), RenderPosition.BEFOREEND);
    }

    this.#documentBody.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopup = () => {
    remove(this.#filmDetailsSection);
    remove(this.#filmDetailsCommentsWrap);
    remove(this.#filmDetailsCommentsList);

    this.#documentBody.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      evt.preventDefault();
      this.#closePopup();
    }
  }

  #handleFavoriteClick = () => {
    this.#changeData({...this.#filmCard, userDetails:{...this.#filmCard.userDetails, favorite: !this.#filmCard.userDetails.favorite}});
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#filmCard, userDetails:{...this.#filmCard.userDetails, watchlist: !this.#filmCard.userDetails.watchlist}});
  }

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#filmCard, userDetails:{...this.#filmCard.userDetails, alreadyWatched: !this.#filmCard.userDetails.alreadyWatched}});
  }

  #handleFilmCardClick = () => {
    this.#showPopup();
  }

  #handleCloseBtnClick = () => {
    this.#closePopup();
  }
}
