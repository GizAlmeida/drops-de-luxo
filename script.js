document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const allCards = [...document.querySelectorAll(".perfume-card")];
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  let currentPage = 1;
  const itemsPerPage = 9;
  let filteredCards = [...allCards];

  function renderPage() {
    allCards.forEach(card => (card.style.display = "none"));

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    filteredCards.slice(start, end).forEach(card => {
      card.style.display = "block";
    });

    const totalPages = Math.max(
      1,
      Math.ceil(filteredCards.length / itemsPerPage)
    );

    if (pageInfo) {
      pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    }

    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase().trim();
      currentPage = 1;

      filteredCards = allCards.filter(card => {
        const name = card.dataset.name?.toLowerCase() || "";
        return name.includes(value);
      });

      renderPage();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });
  }

  renderPage();
});
