const searchInput = document.getElementById("searchInput");
const templateCards = document.querySelectorAll(".template-card");
const filterBtns = document.querySelectorAll(".filter-btn");

// Fungsi greedy untuk pencarian
function greedyTemplateFilter() {
  const keyword = searchInput.value.toLowerCase().trim();
  const activeCategory = document.querySelector(".filter-btn.active").dataset.category;

  templateCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const color = card.dataset.color?.toLowerCase() || "";
    const category = card.dataset.category;

    const matchKeyword = title.includes(keyword) || color.includes(keyword);
    const matchCategory = activeCategory === "all" || category === activeCategory;

    if (matchKeyword && matchCategory) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Saat klik tombol kategori (Semua, Wedding, Birthday, Seminar)
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const keyword = searchInput.value.trim();
    
    // Jika tidak ada keyword pencarian, tampilkan semua sesuai kategori
    if (keyword === "") {
      const category = btn.dataset.category;

      templateCards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    } else {
      // Jika sedang ada pencarian, pakai greedy pencarian
      greedyTemplateFilter();
    }
  });
});

// Live search
searchInput.addEventListener("input", greedyTemplateFilter);

// Tombol "Cari" manual (onclick di HTML)
window.filterTemplates = greedyTemplateFilter;
