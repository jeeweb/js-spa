import Controller from "./controller.js";
import tech from "./views/tech.js";
import article from "./views/article.js";
import design from "./views/design.js";

const routes = [
  { path: "/", view: tech },
  { path: "/design", view: design },
  { path: "/article/:id", view: article },
];

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const router = () => {
  const { pathname } = window.location;
  const pathMatch = routes.map((route) => {
    return {
      route: route,
      result: pathname.match(pathToRegex(route.path)),
    };
  });
  const match = pathMatch.find((el) => el.result !== null);
  const controller = new Controller();
  controller.render(match);
  window.scrollTo(0, 0); // 화면 이동시 상단으로 이동
};

export default router;
