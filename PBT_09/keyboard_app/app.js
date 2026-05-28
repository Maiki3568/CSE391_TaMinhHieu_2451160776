const images = [
    { src: "https://placehold.co/900x500/1e3a5f/ffffff?text=Mountain+Dawn", caption: "Mountain Dawn — Bình minh trên núi" },
    { src: "https://placehold.co/900x500/14532d/ffffff?text=Forest+Path", caption: "Forest Path — Con đường trong rừng" },
    { src: "https://placehold.co/900x500/7c2d12/ffffff?text=Desert+Dunes", caption: "Desert Dunes — Đồi cát sa mạc" },
    { src: "https://placehold.co/900x500/1e1b4b/ffffff?text=Night+City", caption: "Night City — Thành phố về đêm" },
    { src: "https://placehold.co/900x500/064e3b/ffffff?text=Ocean+Calm", caption: "Ocean Calm — Mặt biển yên tĩnh" },
    { src: "https://placehold.co/900x500/4c1d95/ffffff?text=Lavender+Field", caption: "Lavender Field — Cánh đồng hoa oải hương" },
    { src: "https://placehold.co/900x500/7f1d1d/ffffff?text=Autumn+Leaves", caption: "Autumn Leaves — Lá mùa thu" },
    { src: "https://placehold.co/900x500/134e4a/ffffff?text=Waterfall", caption: "Waterfall — Thác nước" },
    { src: "https://placehold.co/900x500/1c1917/ffffff?text=Volcano+Glow", caption: "Volcano Glow — Ánh sáng núi lửa" },
];

const commands = [
    { icon: "🖼️", name: "Mở Gallery", desc: "Cuộn đến gallery", action: () => document.querySelector("#gallerySection").scrollIntoView({ behavior: "smooth" }) },
    { icon: "▶️", name: "Play Slideshow", desc: "Space", action: () => toggleSlideshow() },
    { icon: "⏭️", name: "Ảnh tiếp theo", desc: "→", action: () => goTo(currentIndex + 1) },
    { icon: "⏮️", name: "Ảnh trước", desc: "←", action: () => goTo(currentIndex - 1) },
    { icon: "1️⃣", name: "Nhảy đến ảnh 1", desc: "Phím 1", action: () => goTo(0) },
    { icon: "5️⃣", name: "Nhảy đến ảnh 5", desc: "Phím 5", action: () => goTo(4) },
    { icon: "9️⃣", name: "Nhảy đến ảnh 9", desc: "Phím 9", action: () => goTo(8) },
    { icon: "🔍", name: "Mở Command Palette", desc: "Ctrl+K", action: () => openPalette() },
    { icon: "❌", name: "Đóng / Thoát", desc: "Escape", action: () => { closeLightbox(); closePalette(); } },
];

let currentIndex = 0;
let slideshowTimer = null;
let paletteHighlight = -1;

const galleryImg = document.querySelector("#galleryImg");
const galleryCaption = document.querySelector("#galleryCaption");
const galleryCounter = document.querySelector("#galleryCounter");
const thumbnails = document.querySelector("#thumbnails");
const slideshowStatus = document.querySelector("#slideshowStatus");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const galleryFrame = document.querySelector("#galleryFrame");

const lightboxModal = document.querySelector("#lightboxModal");
const lightboxImg = document.querySelector("#lightboxImg");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxClose = document.querySelector("#lightboxClose");
const lightboxOverlay = document.querySelector("#lightboxOverlay");

const commandPalette = document.querySelector("#commandPalette");
const paletteInput = document.querySelector("#paletteInput");
const commandList = document.querySelector("#commandList");
const paletteOverlay = document.querySelector("#paletteOverlay");

function buildThumbnails() {
    images.forEach((img, i) => {
        const thumb = document.createElement("img");
        thumb.src = img.src;
        thumb.alt = img.caption;
        thumb.className = "thumb" + (i === 0 ? " active" : "");
        thumb.setAttribute("role", "listitem");
        thumb.setAttribute("tabindex", "0");
        thumb.setAttribute("aria-label", `Ảnh ${i + 1}: ${img.caption}`);
        thumb.dataset.index = i;
        thumbnails.appendChild(thumb);
    });
}

function updateGallery(index) {
    currentIndex = (index + images.length) % images.length;
    const img = images[currentIndex];

    galleryImg.style.opacity = "0";
    setTimeout(() => {
        galleryImg.src = img.src;
        galleryImg.alt = img.caption;
        galleryImg.style.opacity = "1";
    }, 150);

    galleryCaption.textContent = img.caption;
    galleryCounter.textContent = `${currentIndex + 1} / ${images.length}`;

    document.querySelectorAll(".thumb").forEach((t, i) => {
        t.classList.toggle("active", i === currentIndex);
    });
}

function goTo(index) {
    updateGallery(index);
}

function toggleSlideshow() {
    if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
        slideshowStatus.textContent = "Slideshow đã dừng";
    } else {
        slideshowTimer = setInterval(() => goTo(currentIndex + 1), 2500);
        slideshowStatus.textContent = "Slideshow đang chạy... (Space để dừng)";
    }
}

function openLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.caption;
    lightboxCaption.textContent = img.caption;
    lightboxModal.classList.remove("hidden");
    lightboxClose.focus();
}

function closeLightbox() {
    lightboxModal.classList.add("hidden");
    galleryFrame.focus();
}

function openPalette() {
    commandPalette.classList.remove("hidden");
    paletteInput.value = "";
    paletteHighlight = -1;
    renderCommands(commands);
    paletteInput.focus();
}

function closePalette() {
    commandPalette.classList.add("hidden");
}

function renderCommands(list) {
    commandList.innerHTML = "";
    paletteHighlight = -1;

    if (list.length === 0) {
        const empty = document.createElement("li");
        empty.className = "no-results";
        empty.textContent = "Không tìm thấy lệnh nào";
        commandList.appendChild(empty);
        return;
    }

    list.forEach((cmd, i) => {
        const li = document.createElement("li");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", "false");
        li.dataset.index = i;

        const iconEl = document.createElement("span");
        iconEl.className = "cmd-icon";
        iconEl.textContent = cmd.icon;
        iconEl.setAttribute("aria-hidden", "true");

        const nameEl = document.createElement("span");
        nameEl.className = "cmd-name";
        nameEl.textContent = cmd.name;

        const descEl = document.createElement("span");
        descEl.className = "cmd-desc";
        descEl.textContent = cmd.desc;

        li.appendChild(iconEl);
        li.appendChild(nameEl);
        li.appendChild(descEl);

        li.addEventListener("click", () => {
            cmd.action();
            closePalette();
        });

        commandList.appendChild(li);
    });
}

function highlightCommand(direction) {
    const items = commandList.querySelectorAll("li:not(.no-results)");
    if (items.length === 0) return;

    items.forEach(i => { i.classList.remove("highlighted"); i.setAttribute("aria-selected", "false"); });

    paletteHighlight = (paletteHighlight + direction + items.length) % items.length;
    items[paletteHighlight].classList.add("highlighted");
    items[paletteHighlight].setAttribute("aria-selected", "true");
    items[paletteHighlight].scrollIntoView({ block: "nearest" });
}

paletteInput.addEventListener("input", () => {
    const query = paletteInput.value.toLowerCase();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query));
    renderCommands(filtered);
});

paletteInput.addEventListener("keydown", (e) => {
    const items = commandList.querySelectorAll("li:not(.no-results)");
    if (e.key === "ArrowDown") {
        e.preventDefault();
        highlightCommand(1);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        highlightCommand(-1);
    } else if (e.key === "Enter") {
        if (paletteHighlight >= 0 && items[paletteHighlight]) {
            items[paletteHighlight].click();
        }
    } else if (e.key === "Escape") {
        closePalette();
    }
});

prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex + 1));
galleryFrame.addEventListener("click", openLightbox);
lightboxClose.addEventListener("click", closeLightbox);
lightboxOverlay.addEventListener("click", closeLightbox);
paletteOverlay.addEventListener("click", closePalette);

thumbnails.addEventListener("click", (e) => {
    const thumb = e.target.closest(".thumb");
    if (!thumb) return;
    goTo(parseInt(thumb.dataset.index));
});

thumbnails.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        const thumb = e.target.closest(".thumb");
        if (thumb) goTo(parseInt(thumb.dataset.index));
    }
});

document.addEventListener("keydown", (e) => {
    if (commandPalette.classList.contains("hidden") === false) return;

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(currentIndex + 1);
    } else if (e.key === " " && lightboxModal.classList.contains("hidden")) {
        e.preventDefault();
        toggleSlideshow();
    } else if (e.key === "Escape") {
        if (!lightboxModal.classList.contains("hidden")) {
            closeLightbox();
        }
    } else if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        openPalette();
    } else if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key) - 1;
        if (idx < images.length) goTo(idx);
    }
});

buildThumbnails();
updateGallery(0);
