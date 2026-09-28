const GA4_MEASUREMENT_ID = "G-NY910DZLEE";
const SAMIVRAH_EMAIL = "samivrah.business@gmail.com";
const SAMIVRAH_PHONE_DISPLAY = "+91 62955 86761";
const SAMIVRAH_PHONE_LINK = "+916295586761";

const analyticsScript = document.createElement("script");
analyticsScript.async = true;
analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
document.head.appendChild(analyticsScript);

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag("js", new Date());
window.gtag("config", GA4_MEASUREMENT_ID);

const businessSubject = encodeURIComponent("Business requirement for SAMIVRAH");

const headerHTML = `
  <div class="utility-bar">
    <div class="container utility-inner">
      <p>Digital growth support for service businesses</p>
      <div>
        <a href="tel:${SAMIVRAH_PHONE_LINK}">Call ${SAMIVRAH_PHONE_DISPLAY}</a>
        <a href="mailto:${SAMIVRAH_EMAIL}">${SAMIVRAH_EMAIL}</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="logo" href="index.html" aria-label="SAMIVRAH home">
        <img src="images/samivrah-logo.png" alt="SAMIVRAH Business Solutions logo">
      </a>
      <button class="menu-button" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-navigation">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" id="main-navigation" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <a href="social-media-management.html">Social Media</a>
        <a href="web-solutions.html">Web Solutions</a>
        <a href="taskflow.html">TaskFlow<small>New</small></a>
        <a href="business-technology-solutions.html">Business Systems</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </nav>
      <a class="button button-dark header-cta" href="contact.html">Get a Proposal <span>↗</span></a>
    </div>
  </header>
`;

const footerHTML = `
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <img class="footer-logo" src="images/samivrah-white-logo.png" alt="SAMIVRAH Business Solutions">
        <p>Websites, social media and practical digital systems for ambitious service businesses.</p>
        <div class="footer-contact-pills">
          <a href="tel:${SAMIVRAH_PHONE_LINK}">☎ ${SAMIVRAH_PHONE_DISPLAY}</a>
          <a href="mailto:${SAMIVRAH_EMAIL}">✉ ${SAMIVRAH_EMAIL}</a>
        </div>
      </div>
      <div class="footer-col">
        <p class="footer-title">Services</p>
        <a href="web-solutions.html">Business websites</a>
        <a href="social-media-management.html">Social media management</a>
        <a href="taskflow.html">TaskFlow delegation system</a>
        <a href="business-technology-solutions.html">Lead tracking &amp; business systems</a>
      </div>
      <div class="footer-col">
        <p class="footer-title">Company</p>
        <a href="about.html">About SAMIVRAH</a>
        <a href="contact.html">Contact</a>
        <a href="recruitment-services.html">Recruitment — Coming Soon</a>
        <a href="numerology-consultation.html">Numerology division</a>
      </div>
      <div class="footer-col">
        <p class="footer-title">Information</p>
        <a href="privacy-policy.html">Privacy policy</a>
        <a href="terms.html">Service terms</a>
        <p>Remote delivery across India</p>
        <p>Mon–Sat · 9:30 AM–6:30 PM</p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© <span id="current-year"></span> SAMIVRAH. All rights reserved.</span>
      <span>Technology · Visibility · Growth</span>
    </div>
  </footer>
  <div class="mobile-actions" aria-label="Quick contact actions">
    <a href="tel:${SAMIVRAH_PHONE_LINK}"><span>☎</span> Call now</a>
    <a href="mailto:${SAMIVRAH_EMAIL}?subject=${businessSubject}"><span>✉</span> Email us</a>
  </div>
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

function closeMenu() {
  if (!menuButton || !mainNav) return;
  mainNav.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });
  mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 980) closeMenu(); });
}

const yearTarget = document.getElementById("current-year");
if (yearTarget) yearTarget.textContent = new Date().getFullYear();

document.addEventListener("click", (event) => {
  const contactLink = event.target.closest('a[href^="mailto:"], a[href^="tel:"]');
  if (!contactLink) return;
  const method = contactLink.href.startsWith("tel:") ? "phone" : "email";
  window.gtag("event", "generate_lead", { method, page_path: window.location.pathname });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  const grid = form.querySelector(".form-grid");
  const emailInput = form.querySelector('input[name="email"]');

  if (grid && emailInput && !form.querySelector('input[name="phone"]')) {
    const phoneLabel = document.createElement("label");
    phoneLabel.innerHTML = 'Mobile number *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile number">';
    emailInput.closest("label").insertAdjacentElement("afterend", phoneLabel);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const city = String(data.get("city") || "").trim();
    const service = String(data.get("service") || "").trim();
    const requirement = String(data.get("requirement") || "").trim();
    const error = form.querySelector(".form-error");
    const cleanPhone = phone.replace(/\D/g, "");

    if (!name || cleanPhone.length < 10 || !email || !service) {
      if (error) {
        error.textContent = "Please enter your name, valid mobile number, email address and required service.";
        error.style.display = "block";
      }
      return;
    }

    if (error) error.style.display = "none";

    const message = [
      "Hello SAMIVRAH, I am submitting a business requirement from the website.",
      "",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Email: ${email}`,
      `Company: ${company || "Not provided"}`,
      `City: ${city || "Not provided"}`,
      `Service: ${service}`,
      `Requirement: ${requirement || "Please contact me to discuss"}`
    ].join("\n");

    window.gtag("event", "generate_lead", { method: "website_form", service, page_path: window.location.pathname });
    window.location.href = `mailto:${SAMIVRAH_EMAIL}?subject=${encodeURIComponent(`${service} enquiry from ${name}`)}&body=${encodeURIComponent(message)}`;
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

const taskflowDemo = document.querySelector("[data-taskflow-demo]");

if (taskflowDemo) {
  const demoTasks = [
    {
      id: "STF-2609-0001",
      task: "Confirm night-shift guard deployment",
      team: "Security Operations",
      assignee: "Arjun Rao",
      priority: "High",
      due: "Today",
      status: "In Progress",
      progress: 60,
      note: "Four guards confirmed. One replacement is awaiting supervisor approval.",
      dueToday: true,
      overdue: false
    },
    {
      id: "STF-2609-0002",
      task: "Arrange absentee replacement at Site B",
      team: "Security Operations",
      assignee: "Meera Das",
      priority: "Urgent",
      due: "Yesterday",
      status: "Blocked",
      progress: 35,
      note: "Backup guard identified. Client access approval is still pending.",
      dueToday: false,
      overdue: true
    },
    {
      id: "STF-2609-0003",
      task: "Submit monthly client service report",
      team: "Client Relations",
      assignee: "Priya Nair",
      priority: "Medium",
      due: "30 Sep 2026",
      status: "In Progress",
      progress: 75,
      note: "Attendance and incident data added. Final review is pending.",
      dueToday: false,
      overdue: false
    },
    {
      id: "STF-2609-0004",
      task: "Inspect fire-safety equipment checklist",
      team: "Facility Maintenance",
      assignee: "Rohan Sen",
      priority: "High",
      due: "29 Sep 2026",
      status: "Open",
      progress: 10,
      note: "Inspection scheduled with the site supervisor for tomorrow morning.",
      dueToday: false,
      overdue: false
    },
    {
      id: "STF-2609-0005",
      task: "Update employee contact directory",
      team: "Administration",
      assignee: "Meera Das",
      priority: "Low",
      due: "27 Sep 2026",
      status: "Completed",
      progress: 100,
      note: "Directory checked and approved by administration.",
      dueToday: false,
      overdue: false
    }
  ];

  const taskList = document.getElementById("taskflow-task-list");
  const detailPanel = document.getElementById("taskflow-detail");
  const teamFilter = document.getElementById("taskflow-team-filter");
  const assigneeFilter = document.getElementById("taskflow-assignee-filter");
  const resetButton = document.getElementById("taskflow-reset");
  const emptyState = document.getElementById("taskflow-empty");
  const resultCount = document.getElementById("tf-result-count");

  const statusClass = (task) => {
    if (task.status === "Completed") return "completed";
    if (task.status === "Blocked") return "blocked";
    if (task.overdue) return "overdue";
    return "";
  };

  function showTask(task) {
    const whatsappMessage = [
      "SAMIVRAH TaskFlow – Demo Assignment",
      "",
      `Task ID: ${task.id}`,
      `Task: ${task.task}`,
      `Priority: ${task.priority}`,
      `Due: ${task.due}`,
      "",
      "This is a fictional website demonstration."
    ].join("\n");

    detailPanel.innerHTML = `
      <span class="tf-detail-label">${task.id}</span>
      <h3>${task.task}</h3>
      <p>${task.team}</p>
      <div class="tf-detail-meta">
        <div><span>Assignee</span><strong>${task.assignee}</strong></div>
        <div><span>Priority</span><strong>${task.priority}</strong></div>
        <div><span>Due date</span><strong>${task.due}</strong></div>
        <div><span>Status</span><strong>${task.status}</strong></div>
      </div>
      <div class="tf-progress">
        <div class="tf-progress-head"><span>PROGRESS</span><strong>${task.progress}%</strong></div>
        <div class="tf-progress-bar"><i style="width:${task.progress}%"></i></div>
      </div>
      <p class="tf-detail-note">${task.note}</p>
      <div class="tf-demo-actions">
        <a href="https://wa.me/?text=${encodeURIComponent(whatsappMessage)}" target="_blank" rel="noopener">Preview WhatsApp ↗</a>
        <button type="button" id="tf-update-demo">Preview update</button>
      </div>
    `;

    document.querySelectorAll(".tf-task-row").forEach((row) => row.classList.toggle("active", row.dataset.taskId === task.id));
    const updateButton = document.getElementById("tf-update-demo");
    if (updateButton) {
      updateButton.addEventListener("click", () => {
        window.alert(`Demo progress form\n\nTask ID: ${task.id}\nAssignee: ${task.assignee}\n\nIn a client system, this opens a prefilled Google Form.`);
      });
    }
  }

  function renderTasks() {
    const selectedTeam = teamFilter.value;
    const selectedAssignee = assigneeFilter.value;
    const filtered = demoTasks.filter((task) => {
      const teamMatch = selectedTeam === "all" || task.team === selectedTeam;
      const assigneeMatch = selectedAssignee === "all" || task.assignee === selectedAssignee;
      return teamMatch && assigneeMatch;
    });

    taskList.innerHTML = "";
    filtered.forEach((task) => {
      const row = document.createElement("button");
      row.className = "tf-task-row";
      row.type = "button";
      row.dataset.taskId = task.id;
      row.innerHTML = `
        <span>${task.id}</span>
        <div class="tf-task-main"><strong>${task.task}</strong><small>${task.team} · Due ${task.due.toLowerCase()}</small></div>
        <div class="tf-task-assignee"><strong>${task.assignee}</strong><small>${task.priority} priority</small></div>
        <b class="tf-status ${statusClass(task)}">${task.overdue && task.status !== "Completed" ? "Overdue" : task.status}</b>
      `;
      row.addEventListener("click", () => showTask(task));
      taskList.appendChild(row);
    });

    emptyState.hidden = filtered.length > 0;
    resultCount.textContent = `${filtered.length} task${filtered.length === 1 ? "" : "s"} shown`;
    document.getElementById("tf-kpi-open").textContent = filtered.filter((task) => task.status !== "Completed").length;
    document.getElementById("tf-kpi-completed").textContent = filtered.filter((task) => task.status === "Completed").length;
    document.getElementById("tf-kpi-blocked").textContent = filtered.filter((task) => task.status === "Blocked").length;
    document.getElementById("tf-kpi-today").textContent = filtered.filter((task) => task.dueToday && task.status !== "Completed").length;
    document.getElementById("tf-kpi-overdue").textContent = filtered.filter((task) => task.overdue && task.status !== "Completed").length;

    if (filtered.length) showTask(filtered[0]);
  }

  teamFilter.addEventListener("change", renderTasks);
  assigneeFilter.addEventListener("change", renderTasks);
  resetButton.addEventListener("click", () => {
    teamFilter.value = "all";
    assigneeFilter.value = "all";
    renderTasks();
  });
  renderTasks();

  document.querySelectorAll("[data-taskflow-package]").forEach((link) => {
    link.addEventListener("click", () => {
      const packageSelect = document.getElementById("taskflow-package-select");
      if (packageSelect) packageSelect.value = link.dataset.taskflowPackage;
    });
  });
}

function createTaskFlowPopup() {
  if (document.body.classList.contains("taskflow-page")) return;
  if (sessionStorage.getItem("samivrahTaskFlowPopupSeen") === "yes") return;

  const popup = document.createElement("div");
  popup.className = "taskflow-popup-backdrop";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-modal", "true");
  popup.setAttribute("aria-labelledby", "taskflow-popup-title");
  popup.innerHTML = `
    <div class="taskflow-popup">
      <button class="taskflow-popup-close" type="button" aria-label="Close TaskFlow announcement">×</button>
      <div class="taskflow-popup-visual">
        <div class="taskflow-popup-icon">✓</div>
        <h3>SAMIVRAH TaskFlow</h3>
        <p>Task assignment, field updates and management visibility in one practical system.</p>
      </div>
      <div class="taskflow-popup-content">
        <span class="taskflow-popup-kicker">New service · First 3 clients</span>
        <h2 id="taskflow-popup-title">Stop losing tasks inside calls and chats.</h2>
        <p>Built for security agencies, facility-management companies and growing service teams.</p>
        <div class="taskflow-popup-offer">
          <div><span>Starter</span><strong>₹3,999</strong></div>
          <div><span>With dashboard</span><strong>₹5,999</strong></div>
        </div>
        <div class="taskflow-popup-actions">
          <a class="button button-rose" href="taskflow.html">View TaskFlow &amp; Live Demo <span>↗</span></a>
          <button class="taskflow-popup-later" type="button">Maybe later</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  const closePopup = () => {
    popup.classList.remove("open");
    document.body.classList.remove("modal-open");
    sessionStorage.setItem("samivrahTaskFlowPopupSeen", "yes");
    window.setTimeout(() => popup.remove(), 300);
  };

  popup.querySelector(".taskflow-popup-close").addEventListener("click", closePopup);
  popup.querySelector(".taskflow-popup-later").addEventListener("click", closePopup);
  popup.addEventListener("click", (event) => { if (event.target === popup) closePopup(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && popup.classList.contains("open")) closePopup(); }, { once: true });

  window.setTimeout(() => {
    popup.classList.add("open");
    document.body.classList.add("modal-open");
    popup.querySelector(".taskflow-popup-close").focus();
  }, 3500);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createTaskFlowPopup);
} else {
  createTaskFlowPopup();
}
