//src/shared/lib/markdown render

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export const md = new MarkdownIt({
   html: false,
   linkify: true,
   typographer: true,
   highlight(code, lang) {
      let highlighted = "";

      if (lang && hljs.getLanguage(lang)) {
         highlighted = hljs.highlight(code, { language: lang }).value;
      } else {
         highlighted = hljs.highlightAuto(code).value
      }
      return `
      <div class="code-block">
         <button 
            type="button" 
            class="code-block__copy muk-btn muk-btn--secondary muk-btn--sm"
         >
         copy
         </button>
         <pre><code class="hljs">${highlighted}</code></pre>
      </div>
      `;
   }
})
