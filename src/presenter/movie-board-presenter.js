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
  MOST_COMMENTED_FILMS_COUNT
} from '../consts.js';

import {
  getTopRatedFilms,
  getMostCommentedFilms,
  updateItem
} from '../utils/common.js';

import {
  render,
  remove
} from '../utils/render.js';

import MovieCardPresenter from './movie-card-presenter.js';

export default class MovieBoardPresenter {
  #mainContainer = null;

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

  #filmCards = [];
  #filmsComments = [];
  #renderFilmCardsCount = FILM_COUNT_PER_STEP;
  #movieCardPresenter = new Map();

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];
    this.#filmsComments = [];

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
  }

  #handleFilmCardChange = (updatedFilmCard) => {
    //console.log(this.#filmCards);
    //console.log(updatedFilmCard);
    this.#filmCards = updateItem(this.#filmCards, updatedFilmCard);
    //console.log(this.#filmCards);
    this.#movieCardPresenter.get(updatedFilmCard.id).init(updatedFilmCard);
  }

  #renderSortMenu = () => {
    render(this.#mainContainer, this.#sortMenuComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFilmCard = (movieListContainer, filmCard, comments) => {
    const movieCardPresenter = new MovieCardPresenter(movieListContainer, this.#handleFilmCardChange, this.#handleModeChange);
    movieCardPresenter.init(filmCard, comments);
    this.#movieCardPresenter.set(filmCard.id, movieCardPresenter);
  }

  #renderFilmCards = (movieListContainer, filmCards, comments) => {
    for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilmCard(movieListContainer, filmCards[i], comments[i]);
    }
  }

  #renderNoFilmCards = () => {
    render(this.#mainContainer, this.#noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #handleShowMoreBtnClick = () => {
    for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
      this.#renderFilmCard(this.#allMoviesListContainer, this.#filmCards[i + this.#renderFilmCardsCount], this.#filmsComments[i + this.#renderFilmCardsCount]);
    }

    this.#renderFilmCardsCount += FILM_COUNT_PER_STEP;

    if(this.#renderFilmCardsCount >= this.#filmCards.length) {
      remove(this.#showMoreBtnComponent);
    }
  }

  #renderShowMoreBtn = () => {

    render(this.#allMoviesListComponent, this.#showMoreBtnComponent, RenderPosition.BEFOREEND);
    this.#showMoreBtnComponent.setClickHandler(this.#handleShowMoreBtnClick);
  }

  #renderAllMoviesList = () => {
    this.#renderFilmCards(this.#allMoviesListContainer, this.#filmCards, this.#filmsComments);

    if (this.#filmCards.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreBtn();
    }
  }

  #renderTopRatedFilms = () => {
    const topRatedFilms = getTopRatedFilms(this.#filmCards, TOP_RATED_FILMS_COUNT);

    for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
      this.#renderFilmCard(this.#topRatedMoviesListContainer, topRatedFilms[i], this.#filmsComments[i]);
    }
  }

  #renderMostCommentedFilms = () => {
    const mostCommentedFilms = getMostCommentedFilms(this.#filmCards, MOST_COMMENTED_FILMS_COUNT);

    for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
      this.#renderFilmCard(this.#mostCommentedMoviesListContainer, mostCommentedFilms[i], this.#filmsComments[i]);
    }
  }

  #clearMovieBoard = () => {
    this.#movieCardPresenter.forEach((presenter) => presenter.destroy());
    this.#movieCardPresenter.clear();
    this.#renderFilmCardsCount = FILM_COUNT_PER_STEP;
    remove(this.#showMoreBtnComponent);
  }

  #renderMovieBoard = () => {
    if (this.#filmCards.length === 0) {
      this.#renderNoFilmCards();

      return;
    }

    this.#renderSortMenu();
    this.#renderAllMoviesList();
    this.#renderTopRatedFilms();
    this.#renderMostCommentedFilms();
  }
}
