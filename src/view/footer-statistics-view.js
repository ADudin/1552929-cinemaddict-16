import AbstractView from './abstract-view.js';

const createFooterStatisticsTemplate = () => (
  `<section class="footer__statistics">
  <p>130 291 movies inside</p>
</section>`
);

export default class FooterStatisticsView extends AbstractView {
  get template() {
    return createFooterStatisticsTemplate();
  }
}
