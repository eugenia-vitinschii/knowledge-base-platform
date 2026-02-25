//copy button markdown

import { onMounted, onBeforeUnmount } from "vue";

export function useCodeCopy(containerRef: any) {
   function onPreviewClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!target.classList.contains("code-block__copy")) return;

      const wrapper = target.closest(".code-block");
      if (!wrapper) return;

      const codeEl = wrapper.querySelector("code")
      const code = codeEl?.textContent || '';

      if (!code) return;

      navigator.clipboard.writeText(code);

      const old = target.textContent;
      target.textContent = "copied";

      setTimeout(() => {
         target.textContent = old || "copy";
      }, 800);
   }

   onMounted(() => {
      containerRef.value?.addEventListener('click', onPreviewClick)
   })

   onBeforeUnmount(() => {
      containerRef.value?.removeEventListener('click', onPreviewClick)
   })
}

