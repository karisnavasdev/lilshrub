const CA = "SHRUBSOON";

const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CA);
    } catch {
      const el = document.createElement("textarea");
      el.value = CA;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    showToast("CA copied — SHRUBSOON");
  });
});

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 700);
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.querySelectorAll(".faq-item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const open = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
    if (!open) item.classList.add("open");
  });
});

/* Falling cartoon leaves */
const leafLayer = document.getElementById("leaves");
const leafColors = ["#3f8f3a", "#6bbf4e", "#c6d94e", "#e2b13c", "#2d6d28"];
function spawnLeaf() {
  const leaf = document.createElement("div");
  const size = 10 + Math.random() * 16;
  leaf.style.cssText = `
    position:absolute; top:-30px; left:${Math.random() * 100}%;
    width:${size}px; height:${size * 0.7}px; border-radius: 0 70% 0 70%;
    background:${leafColors[Math.floor(Math.random() * leafColors.length)]};
    --drift:${(-80 + Math.random() * 160)}px;
    animation: fall ${8 + Math.random() * 8}s linear forwards;
    transform: rotate(${Math.random() * 360}deg);
    opacity:.85;
  `;
  leafLayer.appendChild(leaf);
  setTimeout(() => leaf.remove(), 17000);
}
setInterval(spawnLeaf, 420);
for (let i = 0; i < 12; i++) setTimeout(spawnLeaf, i * 180);

/* Hide and seek */
const bushes = [...document.querySelectorAll(".bush")];
const statusEl = document.getElementById("camo-status");
const hideIndex = Math.floor(Math.random() * bushes.length);
let found = false;
bushes.forEach((bush, i) => {
  if (i === hideIndex) {
    const img = document.createElement("img");
    img.src = "assets/peek.png";
    img.alt = "HOODSHRUB hiding in the shrub";
    img.className = "hidden-shrub";
    bush.appendChild(img);
    bush.dataset.home = "1";
  }
  bush.addEventListener("click", () => {
    bush.classList.add("rustle");
    setTimeout(() => bush.classList.remove("rustle"), 450);
    if (found) return;
    if (bush.dataset.home) {
      found = true;
      bush.classList.add("found");
      statusEl.textContent = "Found him! HOODSHRUB mastered blending in. The rest of us are still trying.";
      celebrate();
    } else {
      statusEl.textContent = "Just a shrub. Keep looking...";
    }
  });
});

function celebrate() {
  const layer = document.getElementById("coins");
  for (let i = 0; i < 18; i++) {
    const img = document.createElement("img");
    img.src = "assets/coin.png";
    img.alt = "";
    const left = Math.random() * 100;
    img.style.cssText = `
      position:absolute; top:-80px; left:${left}%; width:${36 + Math.random() * 28}px;
      --drift:${(-60 + Math.random() * 120)}px;
      animation: fall ${2.4 + Math.random() * 2}s linear forwards;
    `;
    layer.appendChild(img);
    setTimeout(() => img.remove(), 5000);
  }
  showToast("Peak camouflage unlocked");
}
