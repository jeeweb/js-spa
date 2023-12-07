export default class Model {
  constructor() {
    this.showLodingSpinner();
    return fetch("/src/db.json")
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .finally(() => {
        this.hideLoadingSpinner();
      });
  }
  showLodingSpinner() {
    const app = document.querySelector("#app");
    const loadingSpinner = document.createElement("div");
    loadingSpinner.className = "loading-spinner";
    app.appendChild(loadingSpinner);
  }
  hideLoadingSpinner() {
    const app = document.querySelector("#app");
    const loadingSpinner = document.querySelector(".loading-spinner");
    app.removeChild(loadingSpinner);
  }
}
