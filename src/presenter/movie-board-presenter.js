import SortMenuView from '../view/sort-menu-view.js';
import FilmSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';
import LoadingView from '../view/loading-view.js';

import {
  RenderPosition,
  FILM_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT,
  SortType,
  UserAction,
  UpdateType,
  FilterType
} from '../consts.js';

import {
  getTopRatedFilms,
  getMostCommentedFilms,
  getSortedByDateFilms,
} from '../utils/common.js';

import {
  render,
  remove
} from '../utils/render.js';

import {filter} from '../utils/filter.js';

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieBoardPresenter {
  #mainContainer = null;
  #moviesModel = [];
  #commentsModel = [];
  #filterModel = null;

  #filmSectionComponent = new FilmSectionView();
  #noFilmsComponent = null;
  #sortMenuComponent = null;
  #allMoviesListComponent = new FilmsListView('','visually-hidden', 'All movies. Upcoming');
  #topRatedMoviesListComponent = new FilmsListView('films-list--extra', '','Top rated');
  #mostCommentedMoviesListComponent = new FilmsListView('films-list--extra','', 'Most Commented');
  #loadingComponent = new LoadingView();
  #allMoviesListContainer = new FilmsListContainerView();
  #topRatedMoviesListContainer = new FilmsListContainerView();
  #mostCommentedMoviesListContainer = new FilmsListContainerView();
  #showMoreBtnComponent = null;

  #renderFilmCardsCount = FILM_COUNT_PER_STEP;
  #movieCardPresenter = new Map();
  #topRatedCardPresenter = new Map();
  #mostCommentedCardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor(mainContainer, moviesModel, commentsModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
  }

  get filmCards() {
    this.#filterType = this.#filterModel.filter;
    const filmCards = this.#moviesModel.filmCards;
    const filteredFilmCards = filter[this.#filterType](filmCards);

    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return getSortedByDateFilms(filteredFilmCards, filteredFilmCards.length);
      case SortType.BY_RATING:
        return getTopRatedFilms(filteredFilmCards, filteredFilmCards.length);
    }

    return filteredFilmCards;
  }

  get filmsComments() {
    return this.#commentsModel.comments;
  }

  init = () => {

    render(this.#mainContainer, this.#filmSectionComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmSectionComponent, this.#allMoviesListComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmSectionComponent, this.#topRatedMoviesListComponent, RenderPosition.BEFOREEND);
    render(this.#filmSectionComponent, this.#mostCommentedMoviesListComponent, RenderPosition.BEFOREEND);

    render(this.#allMoviesListComponent, this.#allMoviesListContainer, RenderPosition.BEFOREEND);
    render(this.#topRatedMoviesListComponent, this.#topRatedMoviesListContainer, RenderPosition.BEFOREEND);
    render(this.#mostCommentedMoviesListComponent, this.#mostCommentedMoviesListContainer, RenderPosition.BEFOREEND);

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderMovieBoard();
  }

  destroy = () => {
    this.#clearMovieBoard({resetRenderedFilmCardsCount: true, resetSortType: true});
    remove(this.#filmSectionComponent);
    this.#moviesModel.removeObserver(this.#handleModelEvent);
    this.#commentsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #handleModeChange = () => {
    this.#movieCardPresenter.forEach((presenter) => presenter.resetView());
    this.#topRatedCardPresenter.forEach((presenter) => presenter.resetView());
    this.#mostCommentedCardPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update, comment) => {

    switch (actionType) {
      case UserAction.UPDATE_FILMCARD:
        this.#moviesModel.updateFilmCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update, comment);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update, comment);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#movieCardPresenter.has(data.id)) {
          this.#movieCardPresenter.get(data.id).init(data);
        }

        if(this.#topRatedCardPresenter.has(data.id)) {
          this.#topRatedCardPresenter.get(data.id).init(data);
        }

        if (this.#mostCommentedCardPresenter.has(data.id)) {
          this.#mostCommentedCardPresenter.get(data.id).init(data);
          this.#mostCommentedCardPresenter.forEach((presenter) => presenter.destroy());
          this.#mostCommentedCardPresenter.clear();
          this.#renderMostCommentedFilms();
        }
        break;
      case UpdateType.MINOR:
        this.#clearMovieBoard();
        this.#renderMovieBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearMovieBoard({resetRenderedFilmCardsCount: true, resetSortType: true});
        this.#renderMovieBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderMovieBoard();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMovieBoard({resetRenderedFilmCardsCount: true});
    this.#renderMovieBoard();
  }

  #renderSortMenu = () => {
    this.#sortMenuComponent = new SortMenuView(this.#currentSortType);
    render(this.#mainContainer, this.#sortMenuComponent, RenderPosition.AFTERBEGIN);
    this.#sortMenuComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCard = (movieListContainer, filmCard, comments, presenter) => {
    if (!filmCard) {  //Проверка нужна на случай, если количество карточек для отрисовки меньше FILM_COUNT_PER_STEP;
      return;
    }
    const movieCardPresenter = new MovieCardPresenter(movieListContainer, this.#mainContainer, this.#handleViewAction, this.#handleModeChange, this.#filterType);
    movieCardPresenter.init(filmCard, comments);
    presenter.set(filmCard.id, movieCardPresenter);
  }

  #renderFilmCards = (movieListContainer, filmCards, comments, presenter) => {
    for (let i = 0; i < Math.min(filmCards.length, this.#renderFilmCardsCount); i++) {
      this.#renderMovieCard(movieListContainer, filmCards[i], comments[i], presenter);
    }
  }

  #renderLoading = () => {
    render(this.#mainContainer, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoFilmCards = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filterType);
    render(this.#mainContainer, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #handleShowMoreBtnClick = () => {
    for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      this.#renderMovieCard(this.#allMoviesListContainer, this.filmCards[i + this.#renderFilmCardsCount], this.filmsComments[i + this.#renderFilmCardsCount], this.#movieCardPresenter);
    }

    this.#renderFilmCardsCount += FILM_COUNT_PER_STEP;

    if(this.#renderFilmCardsCount >= this.filmCards.length) {
      remove(this.#showMoreBtnComponent);
    }
  }

  #renderShowMoreBtn = () => {
    this.#showMoreBtnComponent = new ShowMoreBtnView();
    this.#showMoreBtnComponent.setClickHandler(this.#handleShowMoreBtnClick);
    render(this.#allMoviesListComponent, this.#showMoreBtnComponent, RenderPosition.BEFOREEND);
  }

  #renderAllMoviesList = () => {
    this.#renderFilmCards(this.#allMoviesListContainer, this.filmCards, this.filmsComments, this.#movieCardPresenter);

    if (this.filmCards.length > this.#renderFilmCardsCount) {
      this.#renderShowMoreBtn();
    }
  }

  #renderTopRatedFilms = () => {
    const topRatedFilms = getTopRatedFilms(this.filmCards, TOP_RATED_FILMS_COUNT);

    for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
      this.#renderMovieCard(this.#topRatedMoviesListContainer, topRatedFilms[i], this.filmsComments[i], this.#topRatedCardPresenter);
    }
  }

  #renderMostCommentedFilms = () => {
    const mostCommentedFilms = getMostCommentedFilms(this.filmCards, MOST_COMMENTED_FILMS_COUNT);

    for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
      this.#renderMovieCard(this.#mostCommentedMoviesListContainer, mostCommentedFilms[i], this.filmsComments[i], this.#mostCommentedCardPresenter);
    }
  }

  #clearMovieBoard = ({resetRenderedFilmCardsCount = false, resetSortType = false} = {}) => {
    this.#movieCardPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedCardPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedCardPresenter.forEach((presenter) => presenter.destroy());
    this.#movieCardPresenter.clear();
    this.#topRatedCardPresenter.clear();
    this.#mostCommentedCardPresenter.clear();

    remove(this.#sortMenuComponent);
    remove(this.#loadingComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    remove(this.#showMoreBtnComponent);

    if (resetRenderedFilmCardsCount) {
      this.#renderFilmCardsCount = FILM_COUNT_PER_STEP;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderMovieBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();

      return;
    }

    const filmCardsCount = this.filmCards.length;

    if (filmCardsCount === 0) {
      this.#renderNoFilmCards();

      return;
    }

    this.#renderSortMenu();
    this.#renderAllMoviesList();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  }
}
