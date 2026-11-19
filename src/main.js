// Shared interactions for the homepage and legal pages.
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");

function closeMenu() {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  navigation.classList.remove("is-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !open);
  });

  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!navigation.classList.contains("is-open")) return;
    if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });
}

const screenshotDialog = document.querySelector("[data-screenshot-dialog]");
const openScreenshot = document.querySelector("[data-open-screenshot]");
const closeScreenshot = document.querySelector("[data-close-screenshot]");

if (screenshotDialog && openScreenshot && closeScreenshot) {
  openScreenshot.addEventListener("click", () => {
    screenshotDialog.showModal();
    document.body.style.overflow = "hidden";
  });

  closeScreenshot.addEventListener("click", () => screenshotDialog.close());

  screenshotDialog.addEventListener("click", (event) => {
    if (event.target !== screenshotDialog) return;
    const bounds = screenshotDialog.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) screenshotDialog.close();
  });

  screenshotDialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
}