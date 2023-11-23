import tech from "./views/tech.js";
import article from "./views/article.js";
import design from "./views/design.js";
import { page404 } from "./views/404.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getArticles = async (subject) => {
  const dataList = await fetch("/src/db.json")
    .then((res) => res.json())
    .then((data) => {
      if (subject) {
        return data[subject];
      }
    });

  return await Promise.all(dataList);
};

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
  //console.log(match);

  if (!match) {
    contents.innerHTML = page404;
    return;
  } else {
    const view = new match.route.view();
    const id = match.result[1];

    /*
    선택한 article의 주제 (tech / design)를 가져오는 더 나은 방법 고민 필요
    */
    const dataSubject = !id
      ? match.route.view.name.toLowerCase()
      : id.split("-")[0].toLowerCase();

    const showData = (subject) => {
      getArticles(subject).then((data) => {
        if (!id) {
          view.getData(data);
        } else {
          const articleData = data.find((article) => article.id === id);
          view.getData(articleData);
        }
      });
    };

    showData(dataSubject);
  }
};

export default router;
