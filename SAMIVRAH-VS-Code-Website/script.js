const SAMIVRAH_PHONE = "916295586761";
const WHATSAPP_BASE = `https://wa.me/${SAMIVRAH_PHONE}`;

const headerHTML = `
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="logo" href="index.html" aria-label="SAMIVRAH home">
        <img src="images/samivrah-logo.png" alt="SAMIVRAH Business Solutions logo">
      </a>
      <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false">☰</button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="recruitment-services.html">Recruitment</a>
        <a href="web-solutions.html">Web Solutions</a>
        <a href="social-media-management.html">Social Media</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <a class="button button-dark header-cta" href="${WHATSAPP_BASE}?text=${encodeURIComponent("Hello SAMIVRAH, I would like to discuss a business requirement.")}" target="_blank" rel="noopener">Let’s Talk ↗</a>
    </div>
  </header>
`;

const footerHTML = `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-col">
        <img class="footer-logo" src="images/samivrah-white-logo.png" alt="SAMIVRAH Business Solutions">
        <p>Recruitment, web solutions and digital growth support for service businesses across India.</p>
      </div>
      <div class="footer-col">
        <p class="footer-title">Recruitment</p>
        <a href="facility-management-recruitment.html">Facility management</a>
        <a href="security-guard-recruitment.html">Security staff</a>
        <a href="housekeeping-staff-recruitment.html">Housekeeping staff</a>
        <a href="hospitality-recruitment.html">Hospitality professionals</a>
      </div>
      <div class="footer-col">
        <p class="footer-title">Company</p>
        <a href="about.html">About SAMIVRAH</a>
        <a href="contact.html">Contact</a>
        <a href="privacy-policy.html">Privacy policy</a>
        <a href="terms.html">Service terms</a>
      </div>
      <div class="footer-col">
        <p class="footer-title">Start a conversation</p>
        <a href="tel:+${SAMIVRAH_PHONE}">+91 62955 86761</a>
        <a href="${WHATSAPP_BASE}" target="_blank" rel="noopener">WhatsApp SAMIVRAH</a>
        <p>Serving businesses across India</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span id="current-year"></span> SAMIVRAH. All rights reserved.</span>
      <span>Business solutions built around real requirements.</span>
    </div>
  </footer>
  <a class="whatsapp-float" href="${WHATSAPP_BASE}?text=${encodeURIComponent("Hello SAMIVRAH, I need help with a business requirement.")}" target="_blank" rel="noopener" aria-label="Chat with SAMIVRAH on WhatsApp">◉ WhatsApp</a>
`;

const headerTarget = document.getElementById("site-header");
const footerTarget = document.getElementById("site-footer");

if (headerTarget) headerTarget.innerHTML = headerHTML;
if (footerTarget) footerTarget.innerHTML = footerHTML;

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".main-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});

const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

const yearTarget = document.getElementById("current-year");
if (yearTarget) yearTarget.textContent = new Date().getFullYear();

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const company = String(data.get("company") || "").trim();
    const city = String(data.get("city") || "").trim();
    const service = String(data.get("service") || "").trim();
    const requirement = String(data.get("requirement") || "").trim();
    const error = form.querySelector(".form-error");

    if (!name || !phone || !service) {
      if (error) {
        error.textContent = "Please enter your name, phone number and required service.";
        error.style.display = "block";
      }
      return;
    }

    if (error) error.style.display = "none";

    const message = [
      "Hello SAMIVRAH, I am submitting a requirement from the website.",
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Phone: ${phone}`,
      `City: ${city || "Not provided"}`,
      `Service: ${service}`,
      `Requirement: ${requirement || "Please contact me to discuss"}`
    ].join("\n");

    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const popup = document.getElementById("recruitment-popup");
const popupClose = document.getElementById("popup-close");

function closePopup() {
  if (!popup) return;
  popup.classList.remove("open");
  popup.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  sessionStorage.setItem("samivrah-popup-seen", "yes");
}

if (popup) {
  const seen = sessionStorage.getItem("samivrah-popup-seen");
  if (!seen) {
    window.setTimeout(() => {
      popup.classList.add("open");
      popup.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    }, 2800);
  }

  popup.addEventListener("click", (event) => {
    if (event.target === popup) closePopup();
  });
}

if (popupClose) popupClose.addEventListener("click", closePopup);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePopup();
});
