const root = document.documentElement;
const body = document.body;
const header = document.getElementById("site-header");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const themeColor = document.querySelector('meta[name="theme-color"]');
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("main section[id]")];
const workDialog = document.getElementById("work-dialog");
const workDialogClose = workDialog.querySelector(".work-dialog-close");
const workDialogKicker = document.getElementById("work-dialog-kicker");
const workDialogTitle = document.getElementById("work-dialog-title");
const workDialogRole = document.getElementById("work-dialog-role");
const workDialogDescription = document.getElementById("work-dialog-description");
const workDialogConfidentiality = document.getElementById("work-dialog-confidentiality");
const workDialogBody = workDialog.querySelector(".work-dialog-body");
const workDialogSide = document.getElementById("work-dialog-side");
const workDialogStack = document.getElementById("work-dialog-stack");
const workDialogHighlights = document.getElementById("work-dialog-highlights");
const workDialogTags = document.getElementById("work-dialog-tags");
const workDialogIcon = document.getElementById("work-dialog-icon");
const workDialogLink = document.getElementById("work-dialog-link");
const workDialogHeaderLink = document.getElementById("work-dialog-header-link");
const certificateDialog = document.getElementById("certificate-dialog");
const certificateDialogClose = certificateDialog.querySelector(".certificate-dialog-close");
const certificateDialogTitle = document.getElementById("certificate-dialog-title");
const certificateDialogMeta = document.getElementById("certificate-dialog-meta");
const certificateDialogImage = document.getElementById("certificate-dialog-image");
const certificatePlaceholder = document.getElementById("certificate-placeholder");

const workProjects = {
  toolsera: {
    kicker: "Personal product",
    title: "Toolsera",
    role: "Founder & engineer",
    description:
      "Toolsera is an independently conceived and built web platform that brings focused, browser-based utilities into one consistent experience. It serves developers and everyday users with tools for JSON workflows, Tailwind CSS, PDFs, images, text, and finance calculations. Every utility is centered on a specific task, requires no account, and includes enough context to help users move from input to a useful result quickly.",
    highlights: [
      "Defined the product direction, information architecture, and reusable experience across six tool categories",
      "Built developer workflows for formatting, comparing, repairing, and transforming JSON, along with practical Tailwind CSS helpers",
      "Delivered PDF and image workflows for merging, splitting, compression, resizing, and format conversion",
      "Added text and finance utilities including UUID generation, JWT decoding, hashing, EMI, SIP, and GST calculations",
      "Designed responsive, account-free experiences with clear instructions and light, dark, and system theme support",
      "Own the product lifecycle across UX, engineering, deployment, discoverability, analytics, and continued iteration",
    ],
    technologies: ["Next.js", "React", "Browser APIs"],
    url: "https://www.toolsera.dev/",
    icon: "fa-solid fa-screwdriver-wrench",
  },
  resumeNow: {
    kicker: "Resume-building platform",
    title: "Resume-Now builder",
    role: "BOLD · Software engineering",
    description:
      "Resume-Now is a guided resume-building platform that helps job seekers turn their experience into professional, structured resumes through templates, pre-written content, and intelligent assistance. As part of BOLD's product engineering team, I contribute to the customer-facing builder by delivering new capabilities, strengthening the shared front-end foundation used across portals, and improving the reliability and performance of production workflows.",
    highlights: [
      "Developed and shipped multiple customer-facing features, including AI-assisted functionality within the resume-building experience",
      "Created reusable components and shared feature modules that could be integrated efficiently across other BOLD portals",
      "Diagnosed and resolved critical production issues affecting builder workflows and the customer experience",
      "Monitored builder health and performance, then implemented targeted optimizations to improve stability and responsiveness",
      "Worked across requirements, implementation, testing, release support, and iterative refinement to deliver dependable product changes",
      "Contributed to ongoing engineering work through technical investigation, maintenance, code quality improvements, and production support",
    ],
    technologies: ["React"],
    url: "https://www.resume-now.com/build-resume",
    icon: "fa-regular fa-file-lines",
  },
  photonInsight: {
    kicker: "Part-time project",
    title: "Photon Insight",
    role: "Software engineering",
    description:
      "A part-time product engagement focused on contributing to the implementation and iterative refinement of a practical web experience.",
    highlights: ["Part-time software engineering contribution", "Product implementation and iterative refinement"],
    technologies: [],
    icon: "fa-solid fa-chart-line",
  },
  chatbot: {
    kicker: "Conversational AI",
    title: "Multilingual support chatbot",
    role: "Agiliad · Full-stack engineering",
    description:
      "Expanded an English-only chatbot into a localized experience for Japanese, German, Spanish, French, and additional languages across the interface, API, and data layers.",
    confidentiality: "Client and product names are withheld in line with confidentiality obligations.",
    highlights: ["Multilingual conversational flows", "Full-stack localization support", "Monitoring and analytics integrations"],
    technologies: ["React", "Node.js", "Material UI", "MongoDB", "Express", "Conversational AI", "Google Dialogflow", "Grafana", "Kibana", "Power BI"],
    icon: "fa-solid fa-comments",
  },
  deployment: {
    kicker: "Deployment automation",
    title: "Enterprise deployment platform",
    role: "Agiliad · Front-end engineering",
    description:
      "Contributed to a React single-page application that helps engineering teams configure and deploy applications across multiple environments and infrastructure targets.",
    confidentiality: "Client and product names are withheld in line with confidentiality obligations.",
    highlights: ["Multi-environment deployment workflows", "Application and infrastructure views", "Reusable interface patterns for complex operational flows"],
    technologies: ["React", "Sass"],
    icon: "fa-solid fa-code-branch",
  },
};

let lastWorkTrigger = null;

const populateWorkDialog = (project) => {
  const technologies = project.technologies || [];
  const hasLink = Boolean(project.url);

  workDialogKicker.textContent = project.kicker;
  workDialogTitle.textContent = project.title;
  workDialogRole.textContent = project.role;
  workDialogDescription.textContent = project.description;
  workDialogIcon.className = project.icon;
  workDialogConfidentiality.hidden = !project.confidentiality;
  workDialogConfidentiality.querySelector("span").textContent = project.confidentiality || "";
  workDialogStack.hidden = technologies.length === 0;
  workDialogLink.hidden = !hasLink;
  workDialogLink.href = project.url || "#";
  workDialogHeaderLink.hidden = !hasLink;
  workDialogHeaderLink.href = project.url || "#";
  workDialogSide.hidden = technologies.length === 0 && !hasLink;
  workDialogBody.classList.toggle("is-single-column", workDialogSide.hidden);
  workDialogHighlights.replaceChildren(...project.highlights.map((highlight) => {
    const item = document.createElement("li");
    item.textContent = highlight;
    return item;
  }));
  workDialogTags.replaceChildren(...technologies.map((technology) => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    return tag;
  }));
};

document.querySelectorAll(".work-card-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = workProjects[button.dataset.project];
    if (!project) return;

    lastWorkTrigger = button;
    populateWorkDialog(project);
    body.classList.add("work-dialog-open");
    workDialog.showModal();
  });
});

workDialogClose.addEventListener("click", () => workDialog.close());

workDialog.addEventListener("click", (event) => {
  if (event.target === workDialog) workDialog.close();
});

workDialog.addEventListener("close", () => {
  body.classList.remove("work-dialog-open");
  lastWorkTrigger?.focus();
});

let lastCertificateTrigger = null;

document.querySelectorAll(".certificate-open").forEach((button) => {
  button.addEventListener("click", () => {
    const imageSource = button.dataset.certificateSrc?.trim();

    lastCertificateTrigger = button;
    certificateDialogTitle.textContent = button.dataset.certificateTitle;
    certificateDialogMeta.textContent = button.dataset.certificateMeta;
    certificateDialog.dataset.certificateOrientation = button.dataset.certificateOrientation || "landscape";
    certificateDialogImage.hidden = !imageSource;
    certificatePlaceholder.hidden = Boolean(imageSource);

    if (imageSource) {
      certificateDialogImage.src = imageSource;
      certificateDialogImage.alt = `Scanned certificate for ${button.dataset.certificateTitle}`;
    } else {
      certificateDialogImage.removeAttribute("src");
      certificateDialogImage.alt = "";
    }

    body.classList.add("certificate-dialog-open");
    certificateDialog.showModal();
  });
});

certificateDialogClose.addEventListener("click", () => certificateDialog.close());

certificateDialog.addEventListener("click", (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

certificateDialogImage.addEventListener("error", () => {
  certificateDialogImage.hidden = true;
  certificatePlaceholder.hidden = false;
});

certificateDialog.addEventListener("close", () => {
  body.classList.remove("certificate-dialog-open");
  lastCertificateTrigger?.focus();
});

const updateThemeUI = () => {
  const isDark = root.dataset.theme === "dark";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeToggle.title = `Switch to ${isDark ? "light" : "dark"} theme`;
  themeColor.content = isDark ? "#101114" : "#f7f3ea";
};

const setTheme = (theme) => {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  updateThemeUI();
};

const closeMenu = () => {
  body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  menuToggle.querySelector("i").className = "fa-solid fa-bars";
};

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const willOpen = !body.classList.contains("nav-open");
  body.classList.toggle("nav-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation" : "Open navigation");
  menuToggle.querySelector("i").className = willOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const setActiveSection = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.hash === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveSection(visible.target.id);
  },
  { rootMargin: "-22% 0px -58%", threshold: [0, 0.1, 0.25, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealMotionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealMotionAllowed) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -9%", threshold: 0.12 },
  );

  const registerReveal = (selector, direction, delay = 0, stagger = 0) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal-ready");
      element.dataset.revealDirection = direction;
      element.style.setProperty("--reveal-delay", `${delay + index * stagger}ms`);
      revealObserver.observe(element);
    });
  };

  registerReveal(".hero-intro, .hero-name, .hero-role, .hero-lede, .hero-actions, .hero-experience", "up", 0, 55);
  registerReveal(".hero-artwork", "right", 100);

  registerReveal(".about-heading > *", "left", 0, 70);
  registerReveal(
    ".about-portrait, .about-lead, .about-content > .section-copy, .about-principle, .feature-item",
    "up",
    60,
    65,
  );

  registerReveal(".expertise-heading > *", "left", 0, 70);
  registerReveal(".process-step", "up", 50, 85);
  registerReveal(".skills-intro > *", "left", 0, 70);
  registerReveal(".skill-group", "up", 50, 75);

  registerReveal(".work-heading > *", "left", 0, 70);
  registerReveal(".work-card", "up", 50, 85);

  registerReveal(".experience-heading > *", "left", 0, 70);
  registerReveal(".career-panel-heading, .career-entry", "up", 50, 70);
  registerReveal(".career-side-card", "up", 110, 80);

  registerReveal(".contact-heading > *", "left", 0, 70);
  registerReveal(".contact-primary", "up", 50);
  registerReveal(".contact-detail-row, .contact-socials", "up", 110, 70);
}

const updateHeader = () => {
  header.classList.toggle("header-scrolled", window.scrollY > 18);
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pageProgress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
  header.style.setProperty("--page-progress", String(pageProgress));
};

let scrollFrame = null;
const requestScrollUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    updateHeader();
    scrollFrame = null;
  });
};

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1120) closeMenu();
  requestScrollUpdate();
});

document.querySelectorAll("[data-copy-target]").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const status = document.getElementById("copy-status");

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      status.textContent = button.dataset.copyTarget === "email-value" ? "Email copied to clipboard." : "Phone number copied to clipboard.";
    } catch {
      status.textContent = "Copying is unavailable here. Please select the text above.";
    }

    window.setTimeout(() => {
      status.textContent = "";
    }, 2400);
  });
});

document.getElementById("current-year").textContent = new Date().getFullYear();
updateThemeUI();
updateHeader();
