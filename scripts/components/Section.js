//вставляет разметку карточки в DOM
//отрисовывает разметку, которую возвращает Card

//items — это массив данных, которые нужно добавить на страницу при инициализации класса
//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице
export default class Section {
  constructor({ data , renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
