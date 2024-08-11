let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
let navLinks = document.querySelectorAll(".navbar a");
let sections = document.querySelectorAll("section");
let udemy = document.querySelectorAll(".udemy");
let isMobileNavOpen = false;
document.body.classList.add(currentTheme == "light" ? "light" : "dark");

function switchMode() {
  if (currentTheme == "light") {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    currentTheme = "dark";
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
    currentTheme = "light";
  }
  udemy.forEach((el) => {
    el.src = currentTheme == "dark" ? "./images/resume/udemy-light.png" : "./images/resume/udemy-dark.png";
  });
}

function toggleMobileNav() {
  let mobileNav = document.getElementById("mobileNav");
  let mobileNavToggler = document.getElementById("mobileNavToggler");

  if (isMobileNavOpen) {
    mobileNav.classList.remove("translate-y-0");
    mobileNav.classList.add("-translate-y-full");
    mobileNavToggler.classList.remove("fa-xmark");
    mobileNavToggler.classList.add("fa-bars");
    isMobileNavOpen = false;
  } else {
    mobileNav.classList.remove("-translate-y-full");
    mobileNav.classList.add("translate-y-0");
    mobileNavToggler.classList.remove("fa-bars");
    mobileNavToggler.classList.add("fa-xmark");
    isMobileNavOpen = true;
  }
}

function updateActiveSection() {
  let maxVisibleArea = 0;
  let activeSection = null;

  sections.forEach((section) => {
    const visibleArea = getVisibleArea(section);

    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      activeSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-highlighter", "border-b-2", "border-highlighter");
    if (link.classList.contains(activeSection)) {
      link.classList.add("text-highlighter", "border-b-2", "border-highlighter");
    }
  });
}

function getVisibleArea(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  return visibleHeight * visibleWidth;
}

function scrollToSection(event) {
  event.preventDefault();
  if (event.target.id == "downloadMobile") return;

  if (isMobileNavOpen) {
    mobileNav.classList.remove("translate-y-0");
    mobileNav.classList.add("-translate-y-full");
    mobileNavToggler.classList.remove("fa-xmark");
    mobileNavToggler.classList.add("fa-bars");
    isMobileNavOpen = false;
  }
  var targetId = this.getAttribute("href").substring(1);
  var targetElement = document.getElementById(targetId);
  window.scrollTo({
    top: targetElement.offsetTop - 80,
    behavior: "smooth",
  });
}

const copyContent = async (element) => {
  let text = document.getElementById(element).innerHTML;
  let tooltip = document.getElementById(element == "email" ? "email-tooltip" : "phone-tooltip");
  try {
    await navigator.clipboard.writeText(text);
    tooltip.classList.remove("hidden");

    setTimeout(() => {
      tooltip.classList.add("hidden");
    }, 1000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

window.onload = function () {
  navLinks.forEach(function (link) {
    link.addEventListener("click", scrollToSection);
  });

  udemy.forEach((el) => {
    el.src = currentTheme == "dark" ? "./images/resume/udemy-light.png" : "./images/resume/udemy-dark.png";
  });

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);
};
