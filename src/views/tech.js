import AbstractView from "./AbstractView.js";

export default class Tech extends AbstractView {
  constructor() {
    super();
    this.setTitle("토스 기술 블로그, 토스 테크");
  }
  async getHtml() {
    return `
      <div class="section__inner">
        <h2>개발</h2>
        <ul class="articles__list">
          <li class="article__item">
            <a href="/detail" class="article__link">
              <div class="article__thumb"><img src="" alt="" /></div>
              <div class="article__text">
                <span class="article__title">Article Title</span>
                <p class="article__summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <span class="article__date">2023. 00. 00</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    `;
  }
}
