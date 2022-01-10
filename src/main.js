import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
//import StatisticView from './view/statistic-view.js';
import MovieBoardPresenter from './presenter/movie-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import {
  generateFilm
} from './mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
} from './consts.js';

import {render} from './utils/render.js';

import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const filmComments = [];
const filmCards = Array.from({length: FILM_CARDS_NUMBER}, () => generateFilm(filmComments));

const moviesModel = new MoviesModel();
moviesModel.filmCards = filmCards;

const commentsModel = new CommentsModel();
commentsModel.comments = filmComments;

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieBoardPresenter = new MovieBoardPresenter(siteMainElement, moviesModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
//renderElement(siteMainElement, new StatisticView().element, RenderPosition.BEFOREEND);

filterPresenter.init();
movieBoardPresenter.init();

export {commentsModel};
