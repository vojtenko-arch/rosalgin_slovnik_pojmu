const terms = window.ROSALGIN_TERMS;
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "Z"];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function termHref(term) {
  return `../pojem/${term.slug}/index.html`;
}

const grouped = terms.reduce((acc, term) => {
  acc[term.letter] ||= [];
  acc[term.letter].push(term);
  return acc;
}, {});

document.querySelector("#alphabet").innerHTML = alphabet
  .map((letter) => grouped[letter] ? `<a href="#${letter}">${letter}</a>` : `<span>${letter}</span>`)
  .join("");

document.querySelector("#dictionaryList").innerHTML = Object.keys(grouped)
  .sort((a, b) => alphabet.indexOf(a) - alphabet.indexOf(b))
  .map((letter) => `
    <section class="letter-section" id="${letter}">
      <div class="letter-mark">${letter}</div>
      <div class="term-grid">
        ${grouped[letter].map((term) => `
          <a class="term-card" href="${termHref(term)}">
            <strong>${esc(term.title)}</strong>
            <p>${esc(term.summary)}</p>
            <span class="tags">${term.tags.slice(0, 3).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</span>
          </a>
        `).join("")}
      </div>
    </section>
  `)
  .join("");
