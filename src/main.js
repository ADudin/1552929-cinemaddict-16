import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
//import StatisticView from './view/statistic-view.js';
import MovieBoardPresenter from './presenter/movie-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import StatisticPresenter from './presenter/statistic-presenter.js';

import {
  generateFilm
} from './mock/film.js';

import {
  RenderPosition,
  FILM_CARDS_NUMBER,
  ScreenModeType,
} from './consts.js';

import {/*remove,*/ render} from './utils/render.js';

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
const statisticPresenter = new StatisticPresenter(siteMainElement, moviesModel);

//let statsComponent = null;

const handleSiteMenuClick = (modeType) => {

  if (modeType === ScreenModeType.STATISTIC) {
    movieBoardPresenter.destroy();
    statisticPresenter.init();
    //statsComponent = new StatisticView(moviesModel);
    //render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
  } else {
    movieBoardPresenter.destroy();
    movieBoardPresenter.init();
    statisticPresenter.destroy();
    //remove(statsComponent);
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

render(siteHeaderElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);
render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);

filterPresenter.init();
movieBoardPresenter.init();

export {commentsModel, handleSiteMenuClick};
