import UserProfileView from './view/user-profile-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import StatisticView from './view/statistic-view.js';
import MovieBoardPresenter from './presenter/movie-board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import {
  RenderPosition,
  ScreenModeType,
  AUTHORIZATION,
  END_POINT
} from './consts.js';

import {remove, render} from './utils/render.js';

import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';
import ApiService from './api-service.js';

const moviesModel = new MoviesModel(new ApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const movieBoardPresenter = new MovieBoardPresenter(siteMainElement, moviesModel, commentsModel, filterModel);

let statsComponent = null;

const handleSiteMenuClick = (modeType) => {

  if (modeType === ScreenModeType.STATISTIC) {
    movieBoardPresenter.destroy();
    statsComponent = new StatisticView(moviesModel);
    render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
  } else {
    movieBoardPresenter.init();
    remove(statsComponent);
  }
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, moviesModel);

filterPresenter.init();
movieBoardPresenter.init();
moviesModel.init().finally(() => {
  render(siteHeaderElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);
  render(siteFooterElement, new FooterStatisticsView(), RenderPosition.BEFOREEND);
});

export {handleSiteMenuClick};
