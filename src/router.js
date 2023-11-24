import tech from "./views/tech.js";
import article from "./views/article.js";
import design from "./views/design.js";
import { page404 } from "./views/404.js";

const routes = [
  { path: "/", view: tech },
  { path: "/design", view: design },
  { path: "/article/:id", view: article },
];

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const fetchData = () => {
  return fetch("/src/db.json")
    .then((res) => res.json())
    .then((data) => data);
};

const router = () => {
  const { pathname } = window.location;
  const contents = document.querySelector("#contents");
  const pathMatch = routes.map((route) => {
    return {
      route: route,
      result: pathname.match(pathToRegex(route.path)),
    };
  });

  const match = pathMatch.find((el) => el.result !== null);

  if (!match) {
    contents.innerHTML = page404;
    return;
  } else {
    const view = new match.route.view();
    const id = match.result[1];

    const getArticles = () => {
      fetchData().then((data) => {
        const dataType = !id
          ? match.route.view.name.toLowerCase()
          : data.find((item) => item.id === id).type;

        const dataGroupByType = data.filter((item) => item.type === dataType);

        if (!id) {
          view.getData(dataGroupByType);
        } else {
          const article = data.find((item) => item.id === id);
          view.getData(article);
        }
      });
    };
    getArticles();
  }
};

export default router;
