export default class Model {
  constructor() {
    return fetch("/src/db.json").then((res) => res.json());
  }
}
