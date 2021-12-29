import SortMenuView from '../view/sort-menu-view.js';
import FilmSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import NoFilmsView from '../view/no-films-view.js';
import FilmsListContainerView from '../view/film-list-container-view.js';

import {
  RenderPosition,
  FILM_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT,
  SortType
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

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieBoardPresenter {
  #mainContainer = null;
  #moviesModel = [];
  #commentsModel = [];

  #filmSectionComponent = new FilmSectionView();
  #noFilmsComponent = new NoFilmsView();
  #sortMenuComponent = new SortMenuView();
  #allMoviesListComponent = new FilmsListView('','visually-hidden', 'All movies. Upcoming');
  #topRatedMoviesListComponent = new FilmsListView('films-list--extra', '','Top rated');
  #mostCommentedMoviesListComponent = new FilmsListView('films-list--extra','', 'Most Commented');
  #allMoviesListContainer = new FilmsListContainerView();
  #topRatedMoviesListContainer = new FilmsListContainerView();
  #mostCommentedMoviesListContainer = new FilmsListContainerView();
  #showMoreBtnComponent = new ShowMoreBtnView();

  #renderFilmCardsCount = FILM_COUNT_PER_STEP;
  #movieCardPresenter = new Map();
  #topRatedCardPresenter = new Map();
  #mostCommentedCardPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(mainContainer, moviesModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
  }

  get filmCards() {
    switch (this.#currentSortType) {
      case SortType.BY_DATE:
        return getSortedByDateFilms(this.#moviesModel.filmCards, this.#moviesModel.filmCards.length);
      case SortType.BY_RATING:
        return getTopRatedFilms(this.#moviesModel.filmCards, this.#moviesModel.filmCards.length);
    }

    return this.#moviesModel.filmCards;
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

    this.#renderMovieBoard();
  }

  #handleModeChange = () => {
    this.#movieCardPresenter.forEach((presenter) => presenter.resetView());
    this.#topRatedCardPresenter.forEach((presenter) => presenter.resetView());
    this.#mostCommentedCardPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleFilmCardChange = (updatedFilmCard) => {
    //this.#filmCards = updateItem(this.#filmCards, updatedFilmCard);
    //this.#sourcedFilmCards = updateItem(this.#sourcedFilmCards, updatedFilmCard);

    if (this.#movieCardPresenter.has(updatedFilmCard.id)) {
      this.#movieCardPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
    }

    if(this.#topRatedCardPresenter.has(updatedFilmCard.id)) {
      this.#topRatedCardPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
    }

    if (this.#mostCommentedCardPresenter.has(updatedFilmCard.id)) {
      this.#mostCommentedCardPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMovieBoard();
    this.#renderMovieBoard();
  }

  #renderSortMenu = () => {
    render(this.#mainContainer, this.#sortMenuComponent, RenderPosition.AFTERBEGIN);
    this.#sortMenuComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCard = (movieListContainer, filmCard, comments, presenter) => {
    const movieCardPresenter = new MovieCardPresenter(movieListContainer, this.#mainContainer, this.#handleFilmCardChange, this.#handleModeChange);
    movieCardPresenter.init(filmCard, comments);
    presenter.set(filmCard.id, movieCardPresenter);
  }

  #renderFilmCards = (movieListContainer, filmCards, comments, presenter) => {
    for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderMovieCard(movieListContainer, filmCards[i], comments[i], presenter);
    }
  }

  #renderNoFilmCards = () => {
    render(this.#mainContainer, this.#noFilmsComponent, RenderPosition.BEFOREEND);
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

    render(this.#allMoviesListComponent, this.#showMoreBtnComponent, RenderPosition.BEFOREEND);
    this.#showMoreBtnComponent.setClickHandler(this.#handleShowMoreBtnClick);
  }

  #renderAllMoviesList = () => {
    this.#renderFilmCards(this.#allMoviesListContainer, this.filmCards, this.filmsComments, this.#movieCardPresenter);

    if (this.filmCards.length > FILM_COUNT_PER_STEP) {
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

  #clearMovieBoard = () => {
    this.#movieCardPresenter.forEach((presenter) => presenter.destroy());
    this.#topRatedCardPresenter.forEach((presenter) => presenter.destroy());
    this.#mostCommentedCardPresenter.forEach((presenter) => presenter.destroy());
    this.#movieCardPresenter.clear();
    this.#topRatedCardPresenter.clear();
    this.#mostCommentedCardPresenter.clear();
    this.#renderFilmCardsCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreBtnComponent);
  }

  #renderMovieBoard = () => {
    if (this.filmCards.length === 0) {
      this.#renderNoFilmCards();

      return;
    }

    this.#renderSortMenu();
    this.#renderAllMoviesList();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  }
}
