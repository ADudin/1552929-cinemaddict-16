import SortMenuView from '../view/sort-menu-view.js';
import FilmSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import PopupView from '../view/popup-view.js';
import CommentsView from '../view/comments-view.js';
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
  getMostCommentedFilms
} from '../utils/common.js';

import {
  render,
  remove
} from '../utils/render.js';

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

  #filmCards = [];
  #filmsComments = [];

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (filmCards, filmsComments) => {
    this.#filmCards = [...filmCards];
    this.#filmsComments = [...filmsComments];

    render(this.#mainContainer, this.#filmSectionComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmSectionComponent, this.#allMoviesListComponent, RenderPosition.AFTERBEGIN);
    render(this.#filmSectionComponent, this.#topRatedMoviesListComponent, RenderPosition.BEFOREEND);
    render(this.#filmSectionComponent, this.#mostCommentedMoviesListComponent, RenderPosition.BEFOREEND);

    render(this.#allMoviesListComponent, this.#allMoviesListContainer, RenderPosition.BEFOREEND);
    render(this.#topRatedMoviesListComponent, this.#topRatedMoviesListContainer, RenderPosition.BEFOREEND);
    render(this.#mostCommentedMoviesListComponent, this.#mostCommentedMoviesListContainer, RenderPosition.BEFOREEND);

    this.#renderMovieBoard();
  }

  #renderSortMenu = () => {
    render(this.#mainContainer, this.#sortMenuComponent, RenderPosition.AFTERBEGIN);
  }

  #renderFilmCard = (movieListContainer, filmCard, comments) => {
    const filmComponent = new FilmCardView(filmCard, comments);
    const popup = new PopupView(filmCard, comments);
    const documentBody = document.querySelector('body');

    const showPopup = () => {
      this.#mainContainer.appendChild(popup.element);
      documentBody.classList.add('hide-overflow');
    };

    const closePopup = () => {
      this.#mainContainer.removeChild(popup.element);
      documentBody.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === ('Escape' || 'Esc')) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.setShowPopupHandler(() => {
      showPopup();

      const commentsList = popup.element.querySelector('.film-details__comments-list');
      const filmCommentsElement = comments;

      for (let i = 0; i < filmCommentsElement.length; i++) {
        render(commentsList, new CommentsView(filmCommentsElement[i]), RenderPosition.BEFOREEND);
      }

      document.addEventListener('keydown', onEscKeyDown);
    });

    popup.setCloseBtnClickHandler(() => {
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(movieListContainer, filmComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmCards = (movieListContainer, filmCards, comments) => {
    for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilmCard(movieListContainer, filmCards[i], comments[i]);
    }
  }

  #renderNoFilmCards = () => {
    render(this.#mainContainer, this.#noFilmsComponent, RenderPosition.BEFOREEND);
  }

  #renderShowMoreBtn = () => {
    let renderFilmCount = FILM_COUNT_PER_STEP;
    const loadMoreButton = new ShowMoreBtnView();

    render(this.#allMoviesListComponent, loadMoreButton, RenderPosition.BEFOREEND);

    loadMoreButton.setClickHandler(() => {

      for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
        this.#renderFilmCard(this.#allMoviesListContainer, this.#filmCards[i + renderFilmCount], this.#filmsComments[i + renderFilmCount]/*, FILM_COUNT_PER_STEP*/);
      }

      renderFilmCount += FILM_COUNT_PER_STEP;

      if(renderFilmCount >= this.#filmCards.length) {
        remove(loadMoreButton);
      }
    });
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
