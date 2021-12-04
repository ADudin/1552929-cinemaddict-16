export const createFilmsListTemplate = (sectionClass, titleClass, serviceClass, title) => {
  const template = `<section class="films-list ${sectionClass}">
    <h2 class="films-list__title ${titleClass}">${title}</h2>
    <div class="films-list__container ${serviceClass}">
    </div>
  </section>`;

  return template;
};
