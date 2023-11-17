import AbstractView from "./AbstractView.js";

export default class Article extends AbstractView {
  constructor() {
    super();
    this.setTitle("");
  }
  async getHtml() {
    return `
      <div class="article__inner">
        <div class="article__img"><img src=""></div>
        <h3>Article Title</h3>
        <div class="article__info">
          <div class="article__author-img"><img src=""></div>
          <div class="article__info-text">
            <span class="article__author">User Name · Dept</span>
            <span class="article__date">2023. 00. 00</span>
          </div>
        </div>
        <div class="article__contents">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
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
}
