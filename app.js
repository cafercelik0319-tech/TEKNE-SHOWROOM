// Gerçekçi Tekne ve Arma Veri Tabanı
const boatData = [
  {
    id: 101,
    title: "2021 Bénéteau Oceanis 40.1 - İlk Sahibinden, Full Donanım & Raymarine Navigasyon",
    brand: "Bénéteau",
    model: "Oceanis 40.1",
    year: 2021,
    length: 12.87,
    beam: 4.18,
    cabins: 3,
    type: "Yelkenli",
    price: 265000,
    currency: "EUR",
    location: "Muğla / Marmaris",
    photoCount: 14,
    // Gerçek Yelkenli Görseli
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?auto=format&fit=crop&w=800&q=80",
    emblem: "https://cdn.worldvectorlogo.com/logos/beneteau.svg"
  },
  {
    id: 102,
    title: "Sunseeker Predator 55 EVO - Joystick Manevra, Sıfır Kondisyonda Lüks Motoryat",
    brand: "Sunseeker",
    model: "Predator 55",
    year: 2023,
    length: 17.05,
    beam: 4.48,
    cabins: 2,
    type: "Motoryat",
    price: 1180000,
    currency: "EUR",
    location: "Muğla / Bodrum",
    photoCount: 22,
    // Gerçek Lüks Motoryat Görseli
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80",
    emblem: "https://www.sunseeker.com/dist/images/logo.svg"
  },
  {
    id: 103,
    title: "Bavaria Cruiser 46 - Charter Çıkışı Olmayan Temiz Aile Teknesi, Webasto & Güneş Paneli",
    brand: "Bavaria",
    model: "Cruiser 46",
    year: 2019,
    length: 14.27,
    beam: 4.35,
    cabins: 4,
    type: "Yelkenli",
    price: 215000,
    currency: "EUR",
    location: "İzmir / Çeşme",
    photoCount: 18,
    // Açık Denizde Seyir Halinde Yelkenli
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    emblem: "https://cdn.worldvectorlogo.com/logos/bavaria-yachts.svg"
  },
  {
    id: 104,
    title: "Jeanneau Sun Odyssey 440 - Çift Dümen Dolabı, Tik Kokpit, Sarma Sistem",
    brand: "Jeanneau",
    model: "Sun Odyssey 440",
    year: 2020,
    length: 13.39,
    beam: 4.29,
    cabins: 3,
    type: "Yelkenli",
    price: 235000,
    currency: "EUR",
    location: "Antalya / Kaş",
    photoCount: 11,
    // Jeanneau Yelkenli Detay Görseli
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    emblem: "https://cdn.worldvectorlogo.com/logos/jeanneau.svg"
  },
  {
    id: 105,
    title: "Azimut 50 Flybridge - Klimalı, Su Yapıcı, Jeneratör, Williams Bot Dahil",
    brand: "Azimut",
    model: "Flybridge 50",
    year: 2018,
    length: 16.10,
    beam: 4.66,
    cabins: 3,
    type: "Motoryat",
    price: 920000,
    currency: "EUR",
    location: "İstanbul / Tuzla",
    photoCount: 30,
    // Gerçek Azimut Tarzı Flybridge Yatı
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80",
    emblem: "https://azimutyachts.com/etc/designs/azimut/clientlibs/build/img/logo.svg"
  },
  {
    id: 106,
    title: "Lagoon 42 Katamaran - Konfor Paketi, Geniş Salon, 4 Kabin 4 WC",
    brand: "Lagoon",
    model: "Lagoon 42",
    year: 2022,
    length: 12.80,
    beam: 7.70,
    cabins: 4,
    type: "Katamaran",
    price: 540000,
    currency: "EUR",
    location: "Muğla / Göcek",
    photoCount: 25,
    // Gerçek Çift Gövde Katamaran Görseli
    image: "https://images.unsplash.com/photo-1621277224630-81a7494b86ae?auto=format&fit=crop&w=800&q=80",
    emblem: "https://www.cata-lagoon.com/themes/custom/lagoon/logo.svg"
  }
];

// DOM Referansları
const boatTableBody = document.getElementById("boatTableBody");
const listingSummary = document.getElementById("listingSummary");
const totalCountBadge = document.getElementById("totalCountBadge");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const sortSelect = document.getElementById("sortSelect");
const brandFilterList = document.getElementById("brandFilterList");
const currentCategoryText = document.getElementById("currentCategoryText");

let activeBrand = "all";
let searchTerm = "";
let selectedTypes = [];

// Para formatlama fonksiyonu
function formatPrice(price, currency) {
  const sym = currency === "EUR" ? "€" : "$";
  return price.toLocaleString("tr-TR") + " " + sym;
}

// İlan Satırlarını Çizen Fonksiyon
function renderBoats() {
  let filtered = boatData.filter(boat => {
    const matchesBrand = (activeBrand === "all") || (boat.brand.toLowerCase() === activeBrand.toLowerCase());
    const matchesSearch = boat.title.toLowerCase().includes(searchTerm) ||
                          boat.brand.toLowerCase().includes(searchTerm) ||
                          boat.model.toLowerCase().includes(searchTerm);
    const matchesType = (selectedTypes.length === 0) || selectedTypes.includes(boat.type);

    return matchesBrand && matchesSearch && matchesType;
  });

  // Sıralama Mantığı
  const sortVal = sortSelect.value;
  if (sortVal === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortVal === "year-desc") {
    filtered.sort((a, b) => b.year - a.year);
  }

  listingSummary.innerHTML = `Toplam <strong>${filtered.length}</strong> ilan listeleniyor`;

  if (filtered.length === 0) {
    boatTableBody.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-anchor" style="font-size: 36px; color: #cbd5e1; margin-bottom: 12px; display: block;"></i>
        Arama kriterlerinize uygun tekne ilanı bulunamadı.
      </div>
    `;
    return;
  }

  // Sahibinden Tarzı Liste Satırları
  boatTableBody.innerHTML = filtered.map(boat => `
    <div class="boat-row">
      
      <!-- Görsel ve Fotoğraf Sayısı Rozeti -->
      <div class="thumb-container">
        <img src="${boat.image}" alt="${boat.model}" class="boat-thumb" loading="lazy">
        <span class="photo-badge"><i class="fa-solid fa-camera"></i> ${boat.photoCount}</span>
      </div>

      <!-- Başlık, Model ve Kabin Bilgisi -->
      <div class="boat-title-col">
        <div class="boat-title" title="${boat.title}">${boat.title}</div>
        <div class="boat-tags">
          <span class="tag-chip">${boat.type}</span>
          <span class="tag-chip">${boat.cabins} Kabin</span>
          <span class="tag-text">Model: ${boat.model}</span>
        </div>
      </div>

      <!-- Marka Arması ve Adı -->
      <div class="boat-brand-badge">
        <div class="brand-emblem-wrapper" title="${boat.brand}">
          <img src="${boat.emblem}" class="brand-emblem" alt="${boat.brand}" onerror="this.onerror=null; this.src='https://placehold.co/40x25?text=${boat.brand}'">
        </div>
        <span class="brand-name">${boat.brand}</span>
      </div>

      <!-- Yıl -->
      <div class="bold-cell">${boat.year}</div>

      <!-- Boy / En -->
      <div>
        <strong>${boat.length}m</strong>
        <div class="sub-dim">${boat.beam}m en</div>
      </div>

      <!-- Fiyat -->
      <div class="boat-price">${formatPrice(boat.price, boat.currency)}</div>

      <!-- Konum -->
      <div class="boat-location">
        <i class="fa-solid fa-location-dot"></i> ${boat.location}
      </div>

    </div>
  `).join("");
}

// Canlı Arama
searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderBoats();
});

// Arama Butonu
searchBtn.addEventListener("click", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderBoats();
});

// Sıralama Menüsü
sortSelect.addEventListener("change", () => {
  renderBoats();
});

// Sol Menü Marka Seçimi
brandFilterList.addEventListener("click", (e) => {
  const targetLi = e.target.closest("li");
  if (!targetLi) return;

  document.querySelectorAll("#brandFilterList li").forEach(li => li.classList.remove("active"));
  targetLi.classList.add("active");

  activeBrand = targetLi.getAttribute("data-brand");
  currentCategoryText.textContent = activeBrand === "all" ? "Tüm Tekne & Yat İlanları" : `${activeBrand} İlanları`;
  renderBoats();
});

// Gövde Tipi Filtresi
document.querySelectorAll('input[name="type"]').forEach(chk => {
  chk.addEventListener("change", () => {
    selectedTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(c => c.value);
    renderBoats();
  });
});

totalCountBadge.textContent = `(${boatData.length})`;
renderBoats();