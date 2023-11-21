import AbstractView from "./AbstractView.js";

export default class Article extends AbstractView {
  constructor() {
    super();
    const target = document.querySelector("#contents");
    this.$newEl = target.cloneNode(true);
    this.$newEl.innerHTML = this.getTemplate();
    target.replaceWith(this.$newEl);
  }
  getTemplate() {
    return `
      <div class="article__inner">
        <div class="article__box"></div>
        <div class="article__opinions">
          <p>
            <span>재미있게 읽으셨나요?</span>
            <br>
            좋았는지, 아쉬웠는지, 아래 이모지를 눌러 의견을 들려주세요.
          </p>
        </div>
      </div>
    `;
  }
  getData(data) {
    this.setTitle(data["title"]);

    const div = this.$newEl.querySelector(".article__box");

    div.innerHTML = `
      <div class="article__img"><img src="${data["img"]}"></div>
      <h3>${data["title"]}</h3>
      <div class="article__info">
        <div class="article__info-text">
          <span class="article__author">${data["author"]}</span>
          <span class="article__date">${data["date"]}</span>
        </div>
      </div>
      <div class="article__contents">${data["content"]}</div>
    `;
    return div;
  }
}
