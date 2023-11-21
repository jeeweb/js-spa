import tech from "./views/tech.js";
import article from "./views/article.js";
import design from "./views/design.js";
import { page404 } from "./views/404.js";
import { dummyData } from "./db.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const routes = [
  { path: "/", view: tech },
  { path: "/design", view: design },
  { path: "/article/:id", view: article },
];

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
    const dataSubject = dummyData.find(
      (data) =>
        data.subject.toLowerCase() === match.route.view.name.toLowerCase()
    );

    if (!id) {
      view.getData(dataSubject);
    } else {
      const ctg = dummyData.find(
        (data) => data.subject.toLowerCase() === id.split("-")[0].toLowerCase()
      );
      const articleData = ctg.results.find((data) => data.id === id);
      view.getData(articleData);
    }
  }
};

export default router;
