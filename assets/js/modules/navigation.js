/* Navigation Management Module */
export class NavigationManager {
  constructor() {
    this.isScrolling = false;
    this.mobileMenuOpen = false;
  }

  init() {
    this.setupEventListeners();
    this.setupSmoothScrolling();
    this.setupMobileMenu();
  }

  setupEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        this.scrollToSection(targetId);
        this.updateActiveNavLink(link);
      });
    });

    // Scroll events
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    mobileMenuToggle?.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll(".nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });
  }

  setupSmoothScrolling() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href").substring(1);
        this.scrollToSection(targetId);
      });
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 70; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }

  handleScroll() {
    if (this.isScrolling) return;

    this.isScrolling = true;
    requestAnimationFrame(() => {
      this.updateActiveNavLink();
      this.isScrolling = false;
    });
  }

  updateActiveNavLink(clickedLink = null) {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        clickedLink === link ||
        link.getAttribute("href") === `#${currentSection}`
      ) {
        link.classList.add("active");
      }
    });
  }

  setupMobileMenu() {
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    const navMenu = document.getElementById("navMenu");
    const mobileToggle = document.getElementById("mobileMenuToggle");

    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      navMenu.style.display = "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "100%";
      navMenu.style.left = "0";
      navMenu.style.right = "0";
      navMenu.style.backgroundColor = "var(--bg-primary)";
      navMenu.style.borderTop = "1px solid var(--border-color)";
      navMenu.style.padding = "var(--spacing-lg)";
      navMenu.style.boxShadow = "var(--shadow-lg)";

      mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      this.closeMobileMenu();
    }
  }

  closeMobileMenu() {
    const navMenu = document.getElementById("navMenu");
    const mobileToggle = document.getElementById("mobileMenuToggle");

    navMenu.style.display = "none";
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    this.mobileMenuOpen = false;
  }
}
