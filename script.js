const searchInput = document.getElementById("searchInput");
if (!searchInput) return;


const allCards = [...document.querySelectorAll('.perfume-card')];
const pageInfo = document.getElementById('pageInfo');
let currentPage = 1;
const itemsPerPage = 9;


function renderPage() {
allCards.forEach((card, index) => {
card.style.display = index >= (currentPage-1)*itemsPerPage && index < currentPage*itemsPerPage ? 'block' : 'none';
});
}


renderPage();