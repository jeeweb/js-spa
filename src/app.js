import base from "./views/base.js";
import router from "./router.js";

const currentDomain = location.origin;
const app = document.querySelector("#app");
app.innerHTML = base;

const navigateTo = (url) => {
  if (url !== currentDomain) {
    location.href = url;
  }
  window.history.pushState(null, null, url);
  router();
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("a");

    if (!(target instanceof HTMLAnchorElement)) return;

    e.preventDefault();
    navigateTo(target.href);
  });
  router();
});

window.addEventListener("popstate", router);
