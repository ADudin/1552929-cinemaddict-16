import SiteMenuView from '../view/site-menu-view';
import UserProfileView from '../view/user-profile-view.js';
import SortMenuView from '../view/sort-menu-view.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import FilmSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import PopupView from '../view/popup-view.js';
import CommentsView from '../view/comments-view.js';
import NoFilmsView from '../view/no-films-view.js';

import {
  generateFilm,
  generateComments,
} from '../mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
  FILM_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT
} from '../consts.js';

import {generateFilter} from '../mock/filter.js';

import {
  getTopRatedFilms,
  getMostCommentedFilms
} from '../utils/common.js';

import {
  render,
  remove
} from '../utils/render.js';

export default class MovieListPresenter {
  #headerContainer = null;
  #mainContainer = null;
  #footerContainer = null;

  #filmSectionComponent = new FilmSectionView();
  #footerStatisticsComponent = new FooterStatisticsView();
  #noFilmsComponent = new NoFilmsView();
  #sortMenuComponent = new SortMenuView();
  #userProfileComponent = new UserProfileView();
  #allMoviesListComponent = new FilmsListView('','visually-hidden', '','All movies. Upcoming');
  #topRatedMoviesListComponent = new FilmsListView('films-list--extra', '', 'films-list--top-rated-js','Top rated');
  #mostCommentedMoviesListComponent = new FilmsListView('films-list--extra','', 'films-list--most-commented-js','Most Commented');

  #filmCards = [];

  constructor(headerContainer, mainContainer, footerContainer) {
    this.#headerContainer = headerContainer;
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
  }

  init = (filmCards) => {
    this.#filmCards = [...filmCards];

    render(this.#headerContainer, this.#userProfileComponent, RenderPosition.BEFOREEND);

    if (this.#filmCards.length === 0) {
      render(this.#mainContainer, this.#noFilmsComponent, RenderPosition.BEFOREEND); // ?
    } else {
      render(this.#footerContainer, this.#footerStatisticsComponent, RenderPosition.BEFOREEND);
      render(this.#mainContainer, this.#filmSectionComponent, RenderPosition.AFTERBEGIN);
      render(this.#filmSectionComponent, this.#allMoviesListComponent, RenderPosition.AFTERBEGIN);
      render(this.#filmSectionComponent, this.#topRatedMoviesListComponent, RenderPosition.BEFOREEND);
      render(this.#filmSectionComponent, this.#mostCommentedMoviesListComponent, RenderPosition.BEFOREEND);
    }
  }

  #renderSiteMenu = () => {};

  #renderFilmsList = () => {};

  #renderNoFilms = () => {};

  #renderFilmCard = () => {};

  #renderShowMoreBtn = () => {};

  #renderComments = () => {};

  #renderPopup = () => {};

  #renderMovieList = () => {};
}
