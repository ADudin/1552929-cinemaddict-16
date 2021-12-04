import SiteMenuView from './view/site-menu-view.js';
import UserProfileView from './view/user-profile-view.js';
import SortMenuView from './view/sort-menu-view.js';
//import StatisticView from './view/statistic-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmSectionView from './view/films-section-view.js';
import FilmsListView from './view/films-list-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import ShowMoreBtnView from './view/show-more-btn-view.js';
import {createPopupTemplate} from './view/popup-view.js';

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

import {renderTemplate, renderElement} from './render.js';
import CommentsView from './view/comments-view.js';
//import StatisticView from './view/statistic-view.js';

const filmCards = Array.from({length: FILM_CARDS_NUMBER}, generateFilm);
const filmComments = Array.from({length: FILM_CARDS_NUMBER}, generateComments);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderElement(siteMainElement, new FilmSectionView().element, RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SortMenuView().element, RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteMenuView(filters).element, RenderPosition.AFTERBEGIN);
renderElement(siteHeaderElement, new UserProfileView().element, RenderPosition.BEFOREEND);
//renderElement(siteMainElement, new StatisticView().element, RenderPosition.BEFOREEND);
renderElement(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);

const filmsSection = siteMainElement.querySelector('.films');

renderElement(filmsSection, new FilmsListView('','visually-hidden', '','All movies. Upcoming').element, RenderPosition.AFTERBEGIN);
renderElement(filmsSection, new FilmsListView('films-list--extra', '', 'films-list--top-rated-js','Top rated').element, RenderPosition.BEFOREEND);
renderElement(filmsSection, new FilmsListView('films-list--extra','', 'films-list--most-commented-js','Most Commented').element, RenderPosition.BEFOREEND);

const filmsList = filmsSection.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListContainerTopRated = filmsSection.querySelector('.films-list--top-rated-js');
const filmsListContainerMostCommented = filmsSection.querySelector('.films-list--most-commented-js');

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(filmCards[i], filmComments[i]), RenderPosition.AFTERBEGIN);
}

const topRatedFilms = getTopRatedFilms(filmCards, TOP_RATED_FILMS_COUNT);
const mostCommentedFilms = getMostCommentedFilms(filmCards, MOST_COMMENTED_FILMS_COUNT);

for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  renderTemplate(filmsListContainerTopRated, createFilmCardTemplate(topRatedFilms[i], filmComments[i]), RenderPosition.BEFOREEND);
}

for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  renderTemplate(filmsListContainerMostCommented , createFilmCardTemplate(mostCommentedFilms[i], filmComments[i]), RenderPosition.BEFOREEND);
}

renderTemplate(siteFooterElement, createPopupTemplate(filmCards[0], filmComments[0]), RenderPosition.AFTEREND);

const commentsList = document.querySelector('.film-details__comments-list');
const filmCommentsElement = filmComments[0];

renderElement(commentsList, new CommentsView(filmCommentsElement).element, RenderPosition.BEFOREEND);

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  renderElement(filmsList, new ShowMoreBtnView().element, RenderPosition.BEFOREEND);

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    filmCards
      .slice(renderFilmCount, renderFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film, comments) => renderTemplate(filmsListContainer, createFilmCardTemplate(film, comments), RenderPosition.BEFOREEND));

    renderFilmCount += FILM_COUNT_PER_STEP;

    if(renderFilmCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
}

