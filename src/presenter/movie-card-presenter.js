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

import {render, remove} from '../utils/render.js';

import {RenderPosition} from '../consts.js';

export default class MovieCardPresenter {
  #movieListContainer = null;

  #filmCardComponent = null;
  #filmDetailsTopContainer = null;
  #documentBody = document.querySelector('body');
  #filmDetailsSection = new FilmDetailsSectionView();
  #filmDetailsForm = new FilmDetailsFormView();
  #filmDetailsBottomContainer = new FilmDetailsBottomContainerView();
  #filmDetailsCommentsWrap = new FilmDetailsCommentsWrapView();
  #filmDetailsNewComment = new FilmDetailsNewCommentView();
  #filmDetailsCommentsList = new FilmDetailsCommentsListView();

  #filmCard = null;
  #filmComments = [];

  constructor(movieListContainer) {
    this.#movieListContainer = movieListContainer;
  }

  init = (filmCard, filmComments) => {
    this.#filmCard = filmCard;
    this.#filmComments = [...filmComments];

    this.#filmCardComponent = new FilmCardView(filmCard, filmComments);
    this.#filmDetailsTopContainer = new FilmDetailsTopContainerView(filmCard);

    this.#filmCardComponent.setShowPopupHandler(this.#handleFilmCardClick);
    this.#filmDetailsTopContainer.setCloseBtnClickHandler(this.#handleCloseBtnClick);

    render(this.#movieListContainer, this.#filmCardComponent, RenderPosition.BEFOREEND);
  }

  #showPopup = () => {
    render(this.#movieListContainer, this.#filmDetailsSection, RenderPosition.AFTEREND);
    render(this.#filmDetailsSection, this.#filmDetailsForm, RenderPosition.BEFOREEND);
    render(this.#filmDetailsForm, this.#filmDetailsTopContainer, RenderPosition.AFTERBEGIN);
    render(this.#filmDetailsForm, this.#filmDetailsBottomContainer, RenderPosition.BEFOREEND);
    render(this.#filmDetailsBottomContainer, this.#filmDetailsCommentsWrap, RenderPosition.BEFOREEND);

    const filmDetailsCommentsTitle = new FilmDetailsCommentsTitleView(this.#filmComments);

    render(this.#filmDetailsCommentsWrap, filmDetailsCommentsTitle, RenderPosition.AFTERBEGIN);
    render(this.#filmDetailsCommentsWrap, this.#filmDetailsCommentsList, RenderPosition.BEFOREEND);
    render(this.#filmDetailsCommentsWrap, this.#filmDetailsNewComment, RenderPosition.BEFOREEND);

    const comments = this.#filmComments;

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

  #handleFilmCardClick = () => {
    this.#showPopup();
  }

  #handleCloseBtnClick = () => {
    this.#closePopup();
  }
}
