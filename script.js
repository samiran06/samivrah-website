// Google Analytics 4
const GA4_MEASUREMENT_ID = "G-NY910DZLEE";

const googleTagScript =
  document.createElement("script");

googleTagScript.async = true;

googleTagScript.src =
  `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;

document.head.appendChild(googleTagScript);

window.dataLayer = window.dataLayer || [];

window.gtag = function () {
  window.dataLayer.push(arguments);
};

window.gtag("js", new Date());

window.gtag(
  "config",
  GA4_MEASUREMENT_ID
);

// Company email
const SAMIVRAH_EMAIL =
  "samivrah.business@gmail.com";

const EMAIL_SUBJECT =
  encodeURIComponent(
    "Business requirement for SAMIVRAH"
  );

// Track email clicks as leads
document.addEventListener(
  "click",
  function (event) {
    const emailLink =
      event.target.closest(
        'a[href^="mailto:"]'
      );

    if (!emailLink) return;

    window.gtag(
      "event",
      "generate_lead",
      {
        method: "email",
        page_path:
          window.location.pathname
      }
    );
  }
);

// Header
const headerHTML = `
  <header class="site-header">
    <div class="container nav-wrap">

      <a class="logo"
         href="index.html"
         aria-label="SAMIVRAH home">

        <img
          src="images/samivrah-logo.png"
          alt="SAMIVRAH Business Solutions logo"
        >

      </a>

      <button
        class="menu-button"
        type="button"
        aria-label="Open menu"
        aria-expanded="false">
        ☰
      </button>

      <nav
        class="main-nav"
        aria-label="Main navigation">

        <a href="recruitment-services.html">
          Recruitment
        </a>

        <a href="web-solutions.html">
          Web Solutions
        </a>
 
        <a href="social-media-management.html">
  Social Media
</a>

<a href="numerology-consultation.html">
  ✦ SAMIVRAH Numerology
</a>

<a href="about.html">
  About
</a>

        <a href="contact.html">
          Contact
        </a>

      </nav>

      <a
        class="button button-dark header-cta"
        href="mailto:${SAMIVRAH_EMAIL}?subject=${EMAIL_SUBJECT}">
        Email Us ↗
      </a>

    </div>
  </header>
`;

// Footer
const footerHTML = `
  <footer class="site-footer">

    <div class="container footer-grid">

      <div class="footer-col">

        <img
          class="footer-logo"
          src="images/samivrah-white-logo.png"
          alt="SAMIVRAH Business Solutions"
        >

        <p>
          Recruitment, web solutions and
          digital growth support for service
          businesses across India.
        </p>

      </div>

      <div class="footer-col">

        <p class="footer-title">
          Recruitment
        </p>

        <a href="facility-management-recruitment.html">
          Facility management
        </a>

        <a href="security-guard-recruitment.html">
          Security staff
        </a>

        <a href="housekeeping-staff-recruitment.html">
          Housekeeping staff
        </a>

        <a href="hospitality-recruitment.html">
          Hospitality professionals
        </a>

      </div>

      <div class="footer-col">

        <p class="footer-title">
          Company
        </p>

        <a href="about.html">
          About SAMIVRAH
        </a>

        <a href="contact.html">
          Contact
        </a>

        <a href="privacy-policy.html">
          Privacy policy
        </a>

        <a href="terms.html">
          Service terms
        </a>

      </div>

      <div class="footer-col">

        <p class="footer-title">
          Start a conversation
        </p>

        <a href="mailto:${SAMIVRAH_EMAIL}">
          ${SAMIVRAH_EMAIL}
        </a>

        <p>
          Serving businesses across India
        </p>

      </div>

    </div>

    <div class="container footer-bottom">

      <span>
        © <span id="current-year"></span>
        SAMIVRAH. All rights reserved.
      </span>

      <span>
        Business solutions built around
        real requirements.
      </span>

    </div>

  </footer>

  <a
    class="whatsapp-float"
    href="mailto:${SAMIVRAH_EMAIL}?subject=${EMAIL_SUBJECT}"
    aria-label="Email SAMIVRAH">
    ✉ Email Us
  </a>
`;

// Add header and footer
const headerTarget =
  document.getElementById(
    "site-header"
  );

const footerTarget =
  document.getElementById(
    "site-footer"
  );

if (headerTarget) {
  headerTarget.innerHTML =
    headerHTML;
}

if (footerTarget) {
  footerTarget.innerHTML =
    footerHTML;
}

// Convert all old contact links to email
const emailContactLink =
  `mailto:${SAMIVRAH_EMAIL}?subject=${EMAIL_SUBJECT}`;

document
  .querySelectorAll(
    'a[href*="wa.me"], a[href^="tel:"]'
  )
  .forEach((link) => {
    link.href =
      emailContactLink;

    link.removeAttribute(
      "target"
    );

    link.removeAttribute(
      "rel"
    );

    const linkText =
      link.textContent.toLowerCase();

    if (
      linkText.includes("whatsapp") ||
      linkText.includes("chat")
    ) {
      link.textContent =
        "Email SAMIVRAH ↗";
    }
  });

// Change all form buttons to email
document
  .querySelectorAll(
    '.lead-form button[type="submit"]'
  )
  .forEach((button) => {
    button.textContent =
      "Continue by Email →";
  });

// Remove old messaging wording
document
  .querySelectorAll(
    ".lead-form .eyebrow"
  )
  .forEach((text) => {
    if (
      text.textContent
        .toLowerCase()
        .includes("whatsapp")
    ) {
      text.textContent =
        "Email enquiry";
    }
  });

// Replace old wording throughout pages
document
  .querySelectorAll(
    "p, span, small"
  )
  .forEach((element) => {
    if (
      element.children.length > 0
    ) {
      return;
    }

    element.textContent =
      element.textContent
        .replace(
          /on WhatsApp/gi,
          "by email"
        )
        .replace(
          /to WhatsApp/gi,
          "to email"
        )
        .replace(
          /WhatsApp/gi,
          "email"
        );
  });

// Replace old direct-contact rows
const oldContactRows =
  Array.from(
    document.querySelectorAll(
      ".fee-row"
    )
  ).filter((row) => {
    const label =
      row.querySelector("strong");

    if (!label) return false;

    const value =
      label.textContent
        .trim()
        .toLowerCase();

    return (
      value === "phone" ||
      value === "whatsapp"
    );
  });

if (oldContactRows.length) {
  oldContactRows[0].innerHTML = `
    <strong>Email</strong>

    <span>
      <a href="mailto:${SAMIVRAH_EMAIL}">
        ${SAMIVRAH_EMAIL}
      </a>
    </span>
  `;

  oldContactRows
    .slice(1)
    .forEach((row) => {
      row.remove();
    });
}

// Current navigation item
const currentPage =
  window.location.pathname
    .split("/")
    .pop() || "index.html";

document
  .querySelectorAll(
    ".main-nav a"
  )
  .forEach((link) => {
    if (
      link.getAttribute("href") ===
      currentPage
    ) {
      link.classList.add(
        "active"
      );
    }
  });

// Mobile navigation
const menuButton =
  document.querySelector(
    ".menu-button"
  );

const mainNav =
  document.querySelector(
    ".main-nav"
  );

if (menuButton && mainNav) {
  menuButton.addEventListener(
    "click",
    () => {
      const isOpen =
        mainNav.classList.toggle(
          "open"
        );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.textContent =
        isOpen ? "×" : "☰";
    }
  );

  mainNav
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener(
        "click",
        () => {
          mainNav.classList.remove(
            "open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          menuButton.textContent =
            "☰";
        }
      );
    });
}

// Copyright year
const yearTarget =
  document.getElementById(
    "current-year"
  );

if (yearTarget) {
  yearTarget.textContent =
    new Date().getFullYear();
}

// Email forms
document
  .querySelectorAll(
    ".lead-form"
  )
  .forEach((form) => {
    // Convert any old phone input
    // into an email input
    const oldPhoneInput =
      form.querySelector(
        'input[name="phone"]'
      );

    if (oldPhoneInput) {
      oldPhoneInput.name =
        "email";

      oldPhoneInput.type =
        "email";

      oldPhoneInput.inputMode =
        "email";

      oldPhoneInput.placeholder =
        "Email address";

      oldPhoneInput.autocomplete =
        "email";

      const oldPhoneLabel =
        oldPhoneInput.closest(
          "label"
        );

      if (
        oldPhoneLabel &&
        oldPhoneLabel.firstChild
      ) {
        oldPhoneLabel
          .firstChild
          .textContent =
          "Email address *";
      }
    }

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const data =
          new FormData(form);

        const name =
          String(
            data.get("name") || ""
          ).trim();

        const email =
          String(
            data.get("email") || ""
          ).trim();

        const company =
          String(
            data.get("company") || ""
          ).trim();

        const city =
          String(
            data.get("city") || ""
          ).trim();

        const service =
          String(
            data.get("service") || ""
          ).trim();

        const requirement =
          String(
            data.get("requirement") ||
            ""
          ).trim();

        const error =
          form.querySelector(
            ".form-error"
          );

        if (
          !name ||
          !email ||
          !service
        ) {
          if (error) {
            error.textContent =
              "Please enter your name, email address and required service.";

            error.style.display =
              "block";
          }

          return;
        }

        if (error) {
          error.style.display =
            "none";
        }

        const message = [
          "Hello SAMIVRAH, I am submitting a requirement from the website.",
          `Name: ${name}`,
          `Company: ${
            company ||
            "Not provided"
          }`,
          `Email: ${email}`,
          `City: ${
            city ||
            "Not provided"
          }`,
          `Service: ${service}`,
          `Requirement: ${
            requirement ||
            "Please contact me to discuss"
          }`
        ].join("\n");

        const subject =
          encodeURIComponent(
            `${service} enquiry from ${name}`
          );

        const body =
          encodeURIComponent(
            message
          );

        window.location.href =
          `mailto:${SAMIVRAH_EMAIL}?subject=${subject}&body=${body}`;

        window.gtag(
          "event",
          "generate_lead",
          {
            method:
              "website_form",
            service: service,
            page_path:
              window.location.pathname
          }
        );
      }
    );
  });

// Scroll animations
const revealItems =
  document.querySelectorAll(
    "[data-reveal]"
  );

if (
  "IntersectionObserver" in window
) {
  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target
                .classList
                .add("visible");

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.12
      }
    );

  revealItems.forEach(
    (item) => {
      observer.observe(item);
    }
  );
} else {
  revealItems.forEach(
    (item) => {
      item.classList.add(
        "visible"
      );
    }
  );
}

// Recruitment popup
const popup =
  document.getElementById(
    "recruitment-popup"
  );

const popupClose =
  document.getElementById(
    "popup-close"
  );

function closePopup() {
  if (!popup) return;

  popup.classList.remove(
    "open"
  );

  popup.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

  sessionStorage.setItem(
    "samivrah-popup-seen",
    "yes"
  );
}

if (popup) {
  const seen =
    sessionStorage.getItem(
      "samivrah-popup-seen"
    );

  if (!seen) {
    window.setTimeout(
      () => {
        popup.classList.add(
          "open"
        );

        popup.setAttribute(
          "aria-hidden",
          "false"
        );

        document.body
          .classList
          .add("modal-open");
      },
      2800
    );
  }

  popup.addEventListener(
    "click",
    (event) => {
      if (
        event.target === popup
      ) {
        closePopup();
      }
    }
  );
}

if (popupClose) {
  popupClose.addEventListener(
    "click",
    closePopup
  );
}

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape"
    ) {
      closePopup();
    }
  }
);
