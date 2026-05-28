const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/400x300/2563eb/ffffff?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung Galaxy S25", price: 22990000, category: "phone", image: "https://placehold.co/400x300/1d4ed8/ffffff?text=Galaxy+S25", rating: 4.3, inStock: true },
    { id: 3, name: "Xiaomi 14 Pro", price: 18490000, category: "phone", image: "https://placehold.co/400x300/7c3aed/ffffff?text=Xiaomi+14", rating: 4.2, inStock: false },
    { id: 4, name: "MacBook Air M3", price: 32990000, category: "laptop", image: "https://placehold.co/400x300/059669/ffffff?text=MacBook+Air", rating: 4.8, inStock: true },
    { id: 5, name: "Dell XPS 15", price: 28490000, category: "laptop", image: "https://placehold.co/400x300/0d9488/ffffff?text=Dell+XPS+15", rating: 4.4, inStock: true },
    { id: 6, name: "ASUS ROG Zephyrus", price: 35990000, category: "laptop", image: "https://placehold.co/400x300/dc2626/ffffff?text=ROG+Zephyrus", rating: 4.6, inStock: true },
    { id: 7, name: "iPad Pro 13 M4", price: 29990000, category: "tablet", image: "https://placehold.co/400x300/d97706/ffffff?text=iPad+Pro", rating: 4.7, inStock: true },
    { id: 8, name: "Samsung Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/400x300/b45309/ffffff?text=Galaxy+Tab", rating: 4.1, inStock: false },
    { id: 9, name: "Lenovo Tab P12 Pro", price: 14990000, category: "tablet", image: "https://placehold.co/400x300/92400e/ffffff?text=Lenovo+Tab", rating: 3.9, inStock: true },
    { id: 10, name: "Sony WH-1000XM5", price: 8490000, category: "audio", image: "https://placehold.co/400x300/374151/ffffff?text=Sony+WH1000", rating: 4.9, inStock: true },
    { id: 11, name: "AirPods Pro 2", price: 6990000, category: "audio", image: "https://placehold.co/400x300/1f2937/ffffff?text=AirPods+Pro", rating: 4.6, inStock: true },
    { id: 12, name: "Bose QuietComfort 45", price: 7490000, category: "audio", image: "https://placehold.co/400x300/111827/ffffff?text=Bose+QC45", rating: 4.5, inStock: false },
];

let activeCategory = "all";
let searchQuery = "";
let sortValue = "";
let cartCount = 0;

const productGrid = document.querySelector("#productGrid");
const categoryFilters = document.querySelector("#categoryFilters");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const cartBadge = document.querySelector("#cartBadge");
const darkToggle = document.querySelector("#darkToggle");
const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
const modalOverlay = document.querySelector("#modalOverlay");

function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

function getFilteredProducts() {
    let result = [...products];

    if (activeCategory !== "all") {
        result = result.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (sortValue === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortValue === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name-asc") {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "rating-desc") {
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
}

function renderProducts() {
    const filtered = getFilteredProducts();
    productGrid.innerHTML = "";

    const fragment = document.createDocumentFragment();

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card" + (product.inStock ? "" : " out-of-stock");
        card.dataset.id = product.id;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const info = document.createElement("div");
        info.className = "card-info";

        const name = document.createElement("div");
        name.className = "card-name";
        name.textContent = product.name;

        const price = document.createElement("div");
        price.className = "card-price";
        price.textContent = formatPrice(product.price);

        const rating = document.createElement("div");
        rating.className = "card-rating";
        rating.textContent = "★".repeat(Math.floor(product.rating)) + ` ${product.rating}`;

        const category = document.createElement("div");
        category.className = "card-category";
        category.textContent = product.category;

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(rating);
        info.appendChild(category);

        const addBtn = document.createElement("button");
        addBtn.className = "add-cart-btn";
        addBtn.textContent = product.inStock ? "Thêm giỏ hàng" : "Hết hàng";
        addBtn.disabled = !product.inStock;
        addBtn.dataset.action = "addCart";

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(addBtn);
        fragment.appendChild(card);
    });

    productGrid.appendChild(fragment);
}

function buildCategoryFilters() {
    const categories = ["all", ...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "cat-btn" + (cat === "all" ? " active" : "");
        btn.textContent = cat === "all" ? "Tất cả" : cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.dataset.category = cat;
        categoryFilters.appendChild(btn);
    });
}

function openModal(product) {
    modalContent.innerHTML = "";

    const closeBtn = document.createElement("button");
    closeBtn.id = "modalClose";
    closeBtn.textContent = "✕";
    closeBtn.addEventListener("click", closeModal);

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const h2 = document.createElement("h2");
    h2.textContent = product.name;

    const priceEl = document.createElement("div");
    priceEl.className = "modal-price";
    priceEl.textContent = formatPrice(product.price);

    const ratingEl = document.createElement("div");
    ratingEl.className = "modal-rating";
    ratingEl.textContent = "★".repeat(Math.floor(product.rating)) + ` ${product.rating}/5`;

    const stockEl = document.createElement("div");
    stockEl.className = "modal-stock";
    stockEl.textContent = product.inStock ? "Còn hàng" : "Hết hàng";

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modalContent.appendChild(h2);
    modalContent.appendChild(priceEl);
    modalContent.appendChild(ratingEl);
    modalContent.appendChild(stockEl);

    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

productGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = parseInt(card.dataset.id);
    const product = products.find(p => p.id === id);
    if (!product) return;

    if (e.target.dataset.action === "addCart") {
        if (!product.inStock) return;
        cartCount++;
        cartBadge.textContent = cartCount;
        cartBadge.classList.remove("hidden");
        return;
    }

    openModal(product);
});

modalOverlay.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

categoryFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
});

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

sortSelect.addEventListener("change", (e) => {
    sortValue = e.target.value;
    renderProducts();
});

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

buildCategoryFilters();
renderProducts();
