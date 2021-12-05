import SiteMenuView from './view/site-menu-view.js';
import UserProfileView from './view/user-profile-view.js';
import SortMenuView from './view/sort-menu-view.js';
//import StatisticView from './view/statistic-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmSectionView from './view/films-section-view.js';
import FilmsListView from './view/films-list-view.js';
import FilmCardView from './view/film-card-view.js';
import ShowMoreBtnView from './view/show-more-btn-view.js';
import PopupView from './view/popup-view.js';

import {
  generateFilm,
  generateComments,
} from './mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
  FILM_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  MOST_COMMENTED_FILMS_COUNT
} from './consts.js';

import {generateFilter} from './mock/filter.js';

import {
  getTopRatedFilms,
  getMostCommentedFilms
} from './utils.js';

import {render} from './render.js';
import CommentsView from './view/comments-view.js';
import NoFilmsView from './view/no-films-view.js';
//import StatisticView from './view/statistic-view.js';

const filmCards = Array.from({length: FILM_CARDS_NUMBER}, generateFilm);
const filmComments = Array.from({length: FILM_CARDS_NUMBER}, generateComments);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const renderFilmCard = (filmListElement, filmCard, comments) => {
  const filmComponent = new FilmCardView(filmCard);
  const popup = new PopupView(filmCard, comments);
  const documentBody = document.querySelector('body');

  const showPopup = () => {
    siteMainElement.appendChild(popup.element);
    documentBody.classList.add('hide-overflow');
  };

  const closePopup = () => {
    siteMainElement.removeChild(popup.element);
    documentBody.classList.remove('hide-overflow');
  };

  filmComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    showPopup();

    const commentsList = popup.element.querySelector('.film-details__comments-list');
    const filmCommentsElement = comments;

    render(commentsList, new CommentsView(filmCommentsElement).element, RenderPosition.BEFOREEND);
  });

  popup.element.querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    closePopup();
  });

  render(filmListElement, filmComponent.element, RenderPosition.BEFOREEND);
};

render(siteMainElement, new SiteMenuView(filters).element, RenderPosition.BEFOREBEGIN);
render(siteHeaderElement, new UserProfileView().element, RenderPosition.BEFOREEND);
//renderElement(siteMainElement, new StatisticView().element, RenderPosition.BEFOREEND);

if (filmCards.length === 0) {
  render(siteMainElement, new NoFilmsView().element, RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new FilmSectionView().element, RenderPosition.AFTERBEGIN);
  render(siteMainElement, new SortMenuView().element, RenderPosition.AFTERBEGIN);
  render(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);

  const filmsSection = siteMainElement.querySelector('.films');

  render(filmsSection, new FilmsListView('','visually-hidden', '','All movies. Upcoming').element, RenderPosition.AFTERBEGIN);
  render(filmsSection, new FilmsListView('films-list--extra', '', 'films-list--top-rated-js','Top rated').element, RenderPosition.BEFOREEND);
  render(filmsSection, new FilmsListView('films-list--extra','', 'films-list--most-commented-js','Most Commented').element, RenderPosition.BEFOREEND);

  const filmsList = filmsSection.querySelector('.films-list');
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  const filmsListContainerTopRated = filmsSection.querySelector('.films-list--top-rated-js');
  const filmsListContainerMostCommented = filmsSection.querySelector('.films-list--most-commented-js');

  for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
    renderFilmCard(filmsListContainer, filmCards[i], filmComments[i]);
  }

  if (filmCards.length > FILM_COUNT_PER_STEP) {
    let renderFilmCount = FILM_COUNT_PER_STEP;

    render(filmsList, new ShowMoreBtnView().element, RenderPosition.BEFOREEND);

    const loadMoreButton = filmsList.querySelector('.films-list__show-more');

    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      for (let i = 0; i < FILM_COUNT_PER_STEP; i++) {
        renderFilmCard(filmsListContainer, filmCards[i + renderFilmCount], filmComments[i + renderFilmCount]);
      }

      renderFilmCount += FILM_COUNT_PER_STEP;

      if(renderFilmCount >= filmCards.length) {
        loadMoreButton.remove();
      }
    });
  }

  const topRatedFilms = getTopRatedFilms(filmCards, TOP_RATED_FILMS_COUNT);
  const mostCommentedFilms = getMostCommentedFilms(filmCards, MOST_COMMENTED_FILMS_COUNT);

  for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
    renderFilmCard(filmsListContainerTopRated, topRatedFilms[i], filmComments[i]);
  }

  for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
    renderFilmCard(filmsListContainerMostCommented , mostCommentedFilms[i], filmComments[i]);
  }
}
