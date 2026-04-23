// ==============================
// ELEMENTOS
// ==============================
const searchInput = document.getElementById("searchInput");
const cards = Array.from(document.querySelectorAll(".perfume-card"));
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumbersContainer = document.getElementById("pageNumbers");
const pagination = document.querySelector(".pagination");

// ==============================
// CONFIG
// ==============================
let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
const itemsPerPage = 8;

// ==============================
// FILTRO
// ==============================
function getFilteredCards() {
  if (!searchInput || searchInput.value.trim() === "") {
    return cards;
  }

  const value = searchInput.value.toLowerCase().trim();

  return cards.filter(card =>
    card.dataset.name &&
    card.dataset.name.toLowerCase().includes(value)
  );
}

// ==============================
// PAGINAÇÃO INTELIGENTE
// ==============================
function renderPagination(totalPages) {
  if (!pageNumbersContainer) return;

  pageNumbersContainer.innerHTML = "";

  addPageButton(1);

  if (currentPage > 3) {
    addDots();
  }

  let start = Math.max(2, currentPage - 1);
  let end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    addPageButton(i);
  }

  if (currentPage < totalPages - 2) {
    addDots();
  }

  if (totalPages > 1) {
    addPageButton(totalPages);
  }
}

function addPageButton(page) {
  const btn = document.createElement("button");
  btn.textContent = page;

  if (page === currentPage) {
    btn.classList.add("active");
  }

  btn.addEventListener("click", () => {
    currentPage = page;
    localStorage.setItem("currentPage", currentPage);
    renderPage();
    scrollToTop();
  });

  pageNumbersContainer.appendChild(btn);
}

function addDots() {
  const span = document.createElement("span");
  span.textContent = "...";
  pageNumbersContainer.appendChild(span);
}

// ==============================
// RENDERIZAÇÃO
// ==============================
function renderPage() {
  const filteredCards = getFilteredCards();
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;

  // garante limites válidos
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // salva estado
  localStorage.setItem("currentPage", currentPage);

  // esconde todos
  cards.forEach(card => (card.style.display = "none"));

  // mostra apenas os da página atual
  filteredCards.forEach((card, index) => {
    if (
      index >= (currentPage - 1) * itemsPerPage &&
      index < currentPage * itemsPerPage
    ) {
      card.style.display = "block";
    }
  });

  renderPagination(totalPages);

  // botões
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;

  // esconder paginação se não precisar
  if (pagination) {
    pagination.style.display = totalPages > 1 ? "flex" : "none";
  }
}

// ==============================
// SCROLL SUAVE
// ==============================
function scrollToTop() {
  const catalog = document.getElementById("catalog");

  if (catalog) {
    catalog.scrollIntoView({
      behavior: "smooth"
    });
  }
}

// ==============================
// EVENTOS
// ==============================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    localStorage.setItem("currentPage", 1);
    renderPage();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentPage--;
    localStorage.setItem("currentPage", currentPage);
    renderPage();
    scrollToTop();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentPage++;
    localStorage.setItem("currentPage", currentPage);
    renderPage();
    scrollToTop();
  });
}

// ==============================
// INIT
// ==============================
renderPage();