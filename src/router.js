import Controller from "./controller.js";
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
    const controller = new Controller(match.route.view);
    controller.getArticles(match);
  }
};

export default router;
