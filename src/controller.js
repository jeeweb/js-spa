import Model from "./model.js";
import { page404 } from "./views/404.js";

export default class Controller {
  constructor() {
    this.model = new Model();
  }

  getView(view) {
    return new view();
  }

  async getArticles(path) {
    const id = path.result[1];
    const matchView = path.route.view;

    await this.model.then((data) => {
      const dataType = !id
        ? matchView.name.toLowerCase()
        : data.find((item) => item.id === id).type;
      const dataGroupByType = data.filter((item) => item.type === dataType);

      if (!id) {
        this.getView(matchView).getData(dataGroupByType);
      } else {
        const article = data.find((item) => item.id === id);
        this.getView(matchView).getData(article);
      }
    });
  }

  render(path) {
    const contents = document.querySelector("#contents");
    if (!path) {
      contents.innerHTML = page404;
      return;
    } else {
      this.getArticles(path);
    }
  }
}
