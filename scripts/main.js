let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
document.body.classList.add(currentTheme == "light" ? "light" : "dark");
let isMobileNavOpen = false;

function switchMode() {
  let udemy = document.querySelectorAll(".udemy");
  let logo = document.getElementById("logo");
  let heroImg = document.getElementById("hero-img");

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
  heroImg.src = currentTheme == "light" ? "./images/hero-light.png" : "./images/hero-dark.png";
  logo.src = currentTheme == "light" ? "./images/logo-light.png" : "./images/logo-dark.png";

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
  let navLinks = document.querySelectorAll(".navbar a");
  let sections = document.querySelectorAll("section");

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
    link.classList.remove("after:scale-x-100", "text-highlighter");
    link.classList.add("after:scale-x-0");
    if (link.classList.contains(activeSection)) {
      link.classList.add("after:scale-x-100", "text-highlighter");
      link.classList.remove("after:scale-x-0");
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

function init() {
  let currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
  let navLinks = document.querySelectorAll(".navbar a");
  let udemy = document.querySelectorAll(".udemy");
  let logo = document.getElementById("logo");
  let heroImg = document.getElementById("hero-img");

  navLinks.forEach(function (link) {
    link.addEventListener("click", scrollToSection);
  });

  if (heroImg) {
    heroImg.src = currentTheme == "light" ? "./images/hero-light.png" : "./images/hero-dark.png";
  }

  if (logo) {
    logo.src = currentTheme == "light" ? "./images/logo-light.png" : "./images/logo-dark.png";
  }

  udemy.forEach((el) => {
    if (el) {
      el.src = currentTheme == "dark" ? "./images/resume/udemy-light.png" : "./images/resume/udemy-dark.png";
    }
  });

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);
}
