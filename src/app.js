import base from "./views/base.js";
import tech from "./views/tech.js";
import article from "./views/article.js";
import { page404 } from "./views/404.js";

const app = document.querySelector("#app");
app.innerHTML = base;

const routes = [
  { path: "/", view: tech },
  { path: "/article", view: tech },
  { path: "/article/:id", view: article },
];

const router = async () => {
  const pathMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: window.location.pathname === route.path,
    };
  });
  //console.log(pathMatches);

  let match = pathMatches.find((pathMatch) => pathMatch.isMatch);
  //console.log(match);

  const contents = document.querySelector("#contents");

  if (!match) {
    contents.innerHTML = page404;
    return;
  } else {
    const view = new match.route.view();
    contents.innerHTML = await view.getHtml();
  }
};

const navigateTo = (url) => {
  window.history.pushState(null, null, url);
  router();
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");

    // finding only anchor tag
    if (!(target instanceof HTMLAnchorElement)) return;

    // preventing page refresh
    e.preventDefault();
    navigateTo(target.href);
  });
  router();
});

window.addEventListener("popstate", router);
