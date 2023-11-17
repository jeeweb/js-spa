import { header } from "./header.js";
import { footer } from "./footer.js";

const baseHTML = `
  ${header}
  <div class="container">
    <section id="contents" class="section"></section>
    ${footer}
  </div>
`;

export default baseHTML;
