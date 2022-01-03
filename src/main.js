import SiteMenuView from './view/site-menu-view.js';
import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
//import StatisticView from './view/statistic-view.js';
import MovieBoardPresenter from './presenter/movie-board-presenter.js';

import {
  generateFilm
} from './mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
} from './consts.js';

import {generateFilter} from './mock/filter.js';
import {render} from './utils/render.js';

import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';

const filmComments = [];
const filmCards = Array.from({length: FILM_CARDS_NUMBER}, () => generateFilm(filmComments));
const filters = generateFilter(filmCards);

const moviesModel = new MoviesModel();
moviesModel.filmCards = filmCards;

const commentsModel = new CommentsModel();
commentsModel.comments = filmComments;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieBoardPresenter = new MovieBoardPresenter(siteMainElement, moviesModel, commentsModel);

render(siteMainElement, new SiteMenuView(filters), RenderPosition.BEFOREBEGIN);
render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
//renderElement(siteMainElement, new StatisticView().element, RenderPosition.BEFOREEND);

movieBoardPresenter.init();

export {commentsModel};
//export {filmComments};
//console.log(filmComments);
