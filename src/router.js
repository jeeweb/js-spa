import tech from "./views/tech.js";
import article from "./views/article.js";
import { page404 } from "./views/404.js";
import { dummyData } from "./db.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const routes = [
  { path: "/", view: tech },
  { path: "/article/:id", view: article },
];

const router = () => {
  const { pathname } = window.location;
  const contents = document.querySelector("#contents");
  const potentialMatch = routes.map((route) => {
    return {
      route: route,
      result: pathname.match(pathToRegex(route.path)),
    };
  });

  const match = potentialMatch.find((el) => el.result !== null);

  if (!match) {
    contents.innerHTML = page404;
    return;
  } else {
    const view = new match.route.view();
    const id = match.result[1];
    const data = dummyData.results.find((item) => item["id"] === id);

    id !== undefined ? view.getData(data) : view.getData(dummyData);
  }
};

export default router;
