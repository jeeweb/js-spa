import Model from "./model.js";
import Tech from "./views/tech.js";
import Design from "./views/design.js";
import Article from "./views/article.js";
import { page404 } from "./views/404.js";

export default class Controller {
  constructor() {
    this.model = new Model();
  }

  getView(view) {
    let result;
    switch (view) {
      case "tech":
        result = new Tech();
        break;
      case "design":
        result = new Design();
        break;
    }
    return result;
  }

  async getArticleById(id) {
    await this.model.then((data) => {
      const articleView = new Article();
      const article = data.find((item) => item.id === id);
      articleView.getData(article);
    });
  }
  async getAllArticles(dataType) {
    await this.model.then((data) => {
      const articles = data.filter((item) => item.type === dataType);
      this.getView(dataType).getData(articles);
    });
  }

  render(path) {
    const contents = document.querySelector("#contents");

    if (!path) {
      contents.innerHTML = page404;
      return;
    }

    const id = path.result[1];

    if (!id) {
      const dataType = path.route.view.name.toLowerCase();
      this.getAllArticles(dataType);
    } else {
      this.getArticleById(id);
    }
  }
}
