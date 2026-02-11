// ==============================
// ELEMENTOS
// ==============================
const searchInput = document.getElementById("searchInput");
const cards = Array.from(document.querySelectorAll(".perfume-card"));
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumbersContainer = document.getElementById("pageNumbers");

// ==============================
// CONFIG
// ==============================
let currentPage = 1;
const itemsPerPage = 8;

// ==============================
// FUNÇÕES
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

function renderPagination(totalPages) {
  pageNumbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    pageNumbersContainer.appendChild(btn);
  }
}

function renderPage() {
  const filteredCards = getFilteredCards();
  const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;

  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  cards.forEach(card => (card.style.display = "none"));

  filteredCards.forEach((card, index) => {
    if (
      index >= (currentPage - 1) * itemsPerPage &&
      index < currentPage * itemsPerPage
    ) {
      card.style.display = "block";
    }
  });

  renderPagination(totalPages);

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// ==============================
// EVENTOS
// ==============================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderPage();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentPage--;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentPage++;
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==============================
// INIT
// ==============================
renderPage();
