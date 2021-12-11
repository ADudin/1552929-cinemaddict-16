import SiteMenuView from './view/site-menu-view.js';
import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
//import StatisticView from './view/statistic-view.js';
import MovieBoardPresenter from './presenter/film-cards-presenter.js';

import {
  generateFilm,
  generateComments,
} from './mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
} from './consts.js';

import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';

const filmCards = Array.from({length: FILM_CARDS_NUMBER}, generateFilm);
const filmComments = Array.from({length: FILM_CARDS_NUMBER}, generateComments);
const filters = generateFilter(filmCards);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieBoardPresenter = new MovieBoardPresenter(siteMainElement);

render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREBEGIN);
render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
//renderElement(siteMainElement, new StatisticView().element, RenderPosition.BEFOREEND);

movieBoardPresenter.init(filmCards, filmComments);
