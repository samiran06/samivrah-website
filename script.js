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
  <div class="utility-bar"><div class="container utility-inner"><p>Independent ideas. Practical digital solutions.</p><div><a href="tel:${SAMIVRAH_PHONE_LINK}">${SAMIVRAH_PHONE_DISPLAY}</a><a href="mailto:${SAMIVRAH_EMAIL}">${SAMIVRAH_EMAIL}</a></div></div></div>
  <header class="site-header"><div class="container nav-wrap">
    <a class="logo" href="index.html" aria-label="SAMIVRAH home"><img src="images/samivrah-logo.png" alt="SAMIVRAH Business Solutions logo"></a>
    <button class="menu-button" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-navigation"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="main-navigation" aria-label="Main navigation"><a href="web-solutions.html">Websites</a><a href="social-media-management.html">Social</a><a href="taskflow.html">TaskFlow</a><a href="index.html#selected-work">Our work</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav>
    <button class="button button-dark header-cta" type="button" data-project-open>Let's talk <span>↗</span></button>
  </div></header>
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
  window.gtag("event", "contact_click", { method, page_path: window.location.pathname });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  const grid = form.querySelector(".form-grid");
  const emailInput = form.querySelector('input[name="email"]');

  if (grid && emailInput && !form.querySelector('input[name="phone"]')) {
    const phoneLabel = document.createElement("label");
    phoneLabel.innerHTML = 'Mobile number *<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="10-digit mobile number">';
    emailInput.closest("label").insertAdjacentElement("afterend", phoneLabel);
  }

  form.querySelectorAll('input[name="name"], input[name="email"], select[name="service"]').forEach(field => field.required = true);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
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

    window.gtag("event", "enquiry_prepared", { method: "website_form", service, page_path: window.location.pathname });
    window.location.href = `mailto:${SAMIVRAH_EMAIL}?subject=${encodeURIComponent(`${service} enquiry from ${name}`)}&body=${encodeURIComponent(message)}`;
  });
});

if ("IntersectionObserver" in window) document.documentElement.classList.add("reveal-ready");
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


// Intentional enquiry popup: opened by visitors, never a timed interruption.
const projectDialog = document.createElement('dialog');
projectDialog.className = 'project-dialog';
projectDialog.setAttribute('aria-labelledby', 'project-dialog-title');
projectDialog.innerHTML = `
<div class="project-dialog-grid"><div class="project-dialog-intro"><div><span class="studio-kicker">LET’S MAKE YOUR NEXT MOVE.</span><h2 id="project-dialog-title">A good project<br>starts with<br><em>a conversation.</em></h2><p>Tell us a little about your business. We’ll discuss the scope, timeline and the right next step.</p></div><div class="project-dialog-contact"><a href="tel:${SAMIVRAH_PHONE_LINK}">${SAMIVRAH_PHONE_DISPLAY}</a><br><a href="mailto:${SAMIVRAH_EMAIL}">${SAMIVRAH_EMAIL}</a></div></div><form class="project-dialog-form"><button type="button" class="project-dialog-close" aria-label="Close project enquiry">×</button><label>Your name *<input name="name" autocomplete="name" required maxlength="100" placeholder="What should we call you?"></label><label>Work email *<input name="email" type="email" autocomplete="email" required maxlength="150" placeholder="you@company.com"></label><label>What do you need? *<select name="service" required><option value="">Choose a service</option><option>Business website</option><option>E-commerce website</option><option>Website redesign</option><option>Social media management</option><option>TaskFlow or business system</option><option>Business Growth Starter Package</option></select></label><label>Your idea<textarea name="requirement" maxlength="1500" placeholder="Your business, goals and preferred timeline"></textarea></label><button class="button button-dark" type="submit">Prepare my enquiry <span>↗</span></button><p class="project-dialog-note">Opens a prepared email in your email app. Review and send it there. This website does not store your enquiry.</p><p class="project-feedback" role="status"></p><button class="studio-link copy-project-brief" type="button" hidden>Copy enquiry instead ↗</button></form></div>`;
document.body.appendChild(projectDialog);
let projectOpener = null;
function openProjectDialog(event) {
  closeMenu();
  projectOpener = event.currentTarget;
  const requestedService = projectOpener.dataset.projectService;
  if (requestedService) projectDialog.querySelector('[name="service"]').value = requestedService;
  projectDialog.querySelector('.project-feedback').textContent = '';
  if (typeof projectDialog.showModal !== 'function') { window.location.href = 'contact.html'; return; }
  projectDialog.showModal();
  document.body.classList.add('modal-open');
  window.gtag('event', 'project_enquiry_open', {page_path: window.location.pathname});
}
document.querySelectorAll('[data-project-open]').forEach(button => button.addEventListener('click', openProjectDialog));
projectDialog.querySelector('.project-dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  if (event.target !== projectDialog) return;
  const r = projectDialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) projectDialog.close();
});
projectDialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (projectOpener) projectOpener.focus(); });
let preparedProjectBrief = '';
projectDialog.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  if (!name) { projectDialog.querySelector('.project-feedback').textContent = 'Please enter your name.'; return; }
  const service = String(data.get('service'));
  preparedProjectBrief = `Hello SAMIVRAH,\n\nName: ${name}\nEmail: ${data.get('email')}\nService: ${service}\nRequirement: ${String(data.get('requirement') || '').trim() || 'Please contact me to discuss.'}`;
  projectDialog.querySelector('.project-feedback').textContent = 'Your enquiry is prepared. Send it from your email app, or copy it below and email ' + SAMIVRAH_EMAIL + '.';
  projectDialog.querySelector('.copy-project-brief').hidden = false;
  window.gtag('event', 'enquiry_prepared', {service, page_path: window.location.pathname});
  window.location.href = `mailto:${SAMIVRAH_EMAIL}?subject=${encodeURIComponent(service + ' enquiry from ' + name)}&body=${encodeURIComponent(preparedProjectBrief)}`;
});
projectDialog.querySelector('.copy-project-brief').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(preparedProjectBrief); projectDialog.querySelector('.project-feedback').textContent = 'Copied. Paste the enquiry into an email to ' + SAMIVRAH_EMAIL + '.'; }
  catch { projectDialog.querySelector('.project-feedback').textContent = preparedProjectBrief; projectDialog.querySelector('.project-feedback').style.whiteSpace = 'pre-wrap'; }
});
const projectPrompt = document.createElement('button');
projectPrompt.className = 'project-prompt'; projectPrompt.type = 'button'; projectPrompt.innerHTML = 'Have a project in mind? <span>↗</span>';
projectPrompt.addEventListener('click', openProjectDialog); document.body.appendChild(projectPrompt);
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
const billboard = document.getElementById('billboard-frame');
const billboardFace = document.getElementById('billboard-face');
const lightToggle = document.getElementById('spotlight-toggle');
if (billboard && billboardFace) {
  billboard.addEventListener('pointermove', event => {
    if (!finePointer.matches || motionPreference.matches) return;
    const r = billboard.getBoundingClientRect(), x = (event.clientX-r.left)/r.width, y = (event.clientY-r.top)/r.height;
    billboard.style.setProperty('--tilt-x', ((x-.5)*3)+'deg'); billboard.style.setProperty('--tilt-y', ((.5-y)*2)+'deg');
    billboardFace.style.setProperty('--light-x', (x*100)+'%'); billboardFace.style.setProperty('--light-y', (y*100)+'%');
  });
  billboard.addEventListener('pointerleave', () => { billboard.style.setProperty('--tilt-x','0deg'); billboard.style.setProperty('--tilt-y','0deg'); });
  lightToggle.addEventListener('click', () => { const off = billboardFace.classList.toggle('lights-off'); lightToggle.setAttribute('aria-pressed', String(!off)); lightToggle.innerHTML = '<span class="light-icon">☼</span> Spotlight '+(off?'off':'on'); });
}
if (finePointer.matches && !motionPreference.matches) {
  const cursor = document.createElement('div'); cursor.className = 'studio-cursor'; cursor.setAttribute('aria-hidden','true'); document.body.appendChild(cursor);
  document.addEventListener('pointermove', event => { if(motionPreference.matches)return; cursor.style.left=event.clientX+'px'; cursor.style.top=event.clientY+'px'; cursor.style.opacity='1'; cursor.classList.toggle('is-link',!!event.target.closest('a,button,summary')); });
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) cursor.style.opacity='0'; });
}
const readingProgress = document.createElement('div'); readingProgress.className='reading-progress';readingProgress.setAttribute('aria-hidden','true');document.body.appendChild(readingProgress);
let scrollScheduled=false;
window.addEventListener('scroll',()=>{if(scrollScheduled)return;scrollScheduled=true;requestAnimationFrame(()=>{const height=document.documentElement.scrollHeight-window.innerHeight;readingProgress.style.transform='scaleX('+(height>0?window.scrollY/height:0)+')';scrollScheduled=false;});},{passive:true});
