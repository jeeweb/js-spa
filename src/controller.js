import Model from "./model.js";

export default class Controller {
  constructor(view) {
    this.view = new view();
    this.model = new Model();
  }
  getArticles(matchPath) {
    const id = matchPath.result[1];

    const fetchData = async () => {
      await this.model.then((data) => {
        const dataType = !id
          ? matchPath.route.view.name.toLowerCase()
          : data.find((item) => item.id === id).type;
        const dataGroupByType = data.filter((item) => item.type === dataType);
        //console.log(dataType, dataGroupByType);
        if (!id) {
          this.view.getData(dataGroupByType);
        } else {
          const article = data.find((item) => item.id === id);
          this.view.getData(article);
        }
      });
    };
    fetchData();
  }
}
