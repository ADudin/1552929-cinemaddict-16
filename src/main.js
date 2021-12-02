import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createUserProfileTemplate} from './view/user-profile-view.js';
import {createSortMenuTemplate} from './view/sort-menu-view.js';
//import {createStatisticTemplate} from './view/statistic-view.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics-view.js';
import {createFilmsSectionTemplate} from './view/films-section-view.js';
import {createFilmsListTemplate} from './view/films-list-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createShowMoreBtnTemplate} from './view/show-more-btn-view.js';
import {createPopupTemplate} from './view/popup-view.js';
import {createFilmsListTopRatedTemplate} from './view/films-list-top-rated.js';
import {createFilmsListMostCommentedTemplate} from './view/films-list-most-commented.js';
import {
  generateFilm,
  generateComments,
} from './mock/film.js';
import {
  RenderPosition,
  FILM_CARDS_NUMBER,
  FILM_COUNT_PER_STEP
} from './consts.js';
import {generateFilter} from './mock/filter.js';

const filmCards = Array.from({length: FILM_CARDS_NUMBER}, generateFilm);
const filmComments = Array.from({length: FILM_CARDS_NUMBER}, generateComments);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(siteMainElement, createFilmsSectionTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createSortMenuTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createSiteMenuTemplate(filters), RenderPosition.AFTERBEGIN);
renderTemplate(siteHeaderElement, createUserProfileTemplate(), RenderPosition.BEFOREEND);
//renderTemplate(siteMainElement, createStatisticTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createFooterStatisticsTemplate(), RenderPosition.BEFOREEND);

const filmsSection = siteMainElement.querySelector('.films');

renderTemplate(filmsSection, createFilmsListTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(filmsSection, createFilmsListTopRatedTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmsSection, createFilmsListMostCommentedTemplate(), RenderPosition.BEFOREEND);

const filmsList = filmsSection.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(filmCards.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(filmCards[i], filmComments[i]), RenderPosition.AFTERBEGIN);
}

renderTemplate(siteFooterElement, createPopupTemplate(filmCards[0], filmComments[0]), RenderPosition.AFTEREND);

if (filmCards.length > FILM_COUNT_PER_STEP) {
  let renderFilmCount = FILM_COUNT_PER_STEP;

  renderTemplate(filmsList, createShowMoreBtnTemplate(), RenderPosition.BEFOREEND);

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
