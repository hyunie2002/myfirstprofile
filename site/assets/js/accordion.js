function enablePostAccordions() {
  document
    .querySelectorAll(
      "article.blog-post .post-content, article.cv-post .post-content",
    )
    .forEach((content) => {
      const headings = Array.from(content.children).filter(
        (element) => element.tagName === "H2",
      );

      headings.forEach((heading) => {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        const headingText = document.createElement("span");
        const headingCopy = heading.cloneNode(true);

        headingCopy
          .querySelectorAll(".post-heading__anchor")
          .forEach((anchor) => anchor.remove());

        details.className = "post-section-accordion";
        details.open = true;
        if (heading.id) {
          details.id = heading.id;
        }

        headingText.className = "post-section-accordion__heading";
        headingText.setAttribute("role", "heading");
        headingText.setAttribute("aria-level", "2");
        headingText.innerHTML = headingCopy.innerHTML;
        summary.appendChild(headingText);
        details.appendChild(summary);

        let next = heading.nextElementSibling;
        while (next && next.tagName !== "H2") {
          const following = next.nextElementSibling;
          details.appendChild(next);
          next = following;
        }

        heading.replaceWith(details);
      });
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", enablePostAccordions);
} else {
  enablePostAccordions();
}
