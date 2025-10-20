// GijutsuKnight Portfolio JavaScript

class Portfolio {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
    this.isScrolling = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.setupSmoothScrolling();
    this.setupScrollAnimations();
    this.setupProjectFiltering();
    this.setupSkillBars();
    this.setupFormValidation();
    this.setupMobileMenu();
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle?.addEventListener("click", () => {
      this.toggleTheme();
    });

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

    // Contact form
    const contactForm = document.getElementById("contactForm");
    contactForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(contactForm);
    });

    // Project filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterProjects(btn);
      });
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

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme();
    localStorage.setItem("theme", this.currentTheme);
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme);
    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className =
      this.currentTheme === "light" ? "fas fa-moon" : "fas fa-sun";
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

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".stat-item, .skill-item, .project-card, .contact-item"
    );
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      observer.observe(el);
    });
  }

  setupProjectFiltering() {
    this.currentFilter = "all";
  }

  filterProjects(button) {
    const filter = button.getAttribute("data-filter");
    const projectCards = document.querySelectorAll(".project-card");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // Update active filter button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.classList.add("hidden");
        }, 300);
      }
    });

    this.currentFilter = filter;
  }

  setupSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");

          setTimeout(() => {
            progressBar.style.width = width;
          }, 500);

          observer.unobserve(progressBar);
        }
      });
    }, observerOptions);

    skillBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  setupFormValidation() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute("name");
    let isValid = true;
    let errorMessage = "";

    // Clear previous errors
    this.clearFieldError(field);

    // Validation rules
    switch (fieldName) {
      case "name":
        if (!value) {
          isValid = false;
          errorMessage = "Name is required";
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters";
        }
        break;

      case "email":
        if (!value) {
          isValid = false;
          errorMessage = "Email is required";
        } else if (!this.isValidEmail(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;

      case "subject":
        if (!value) {
          isValid = false;
          errorMessage = "Subject is required";
        } else if (value.length < 5) {
          isValid = false;
          errorMessage = "Subject must be at least 5 characters";
        }
        break;

      case "message":
        if (!value) {
          isValid = false;
          errorMessage = "Message is required";
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    field.style.borderColor = "#ef4444";

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = message;
    errorDiv.style.color = "#ef4444";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";

    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.style.borderColor = "";
    const errorDiv = field.parentNode.querySelector(".field-error");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  handleFormSubmit(form) {
    const formData = new FormData(form);
    const inputs = form.querySelectorAll("input, textarea");

    // Validate all fields
    let isFormValid = true;
    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification("Please fix the errors in the form", "error");
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      this.showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
    }, 2000);
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

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: var(--spacing-md);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

    // Add to DOM
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 4000);
  }

  getNotificationIcon(type) {
    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    };
    return icons[type] || "info-circle";
  }

  // Typing animation for hero text
  setupTypingAnimation() {
    const nameElement = document.querySelector(".name");
    if (!nameElement) return;

    const text = nameElement.textContent;
    nameElement.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        nameElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Parallax effect for hero section
  setupParallaxEffect() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector(".hero");
      const heroImage = document.querySelector(".hero-image");

      if (hero && heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Initialize animations on page load
  initializeAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll(
      ".hero-title, .hero-description, .hero-buttons"
    );
    heroElements.forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";

      setTimeout(() => {
        el.style.transition = "all 0.6s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, index * 200);
    });

    // Animate floating icons
    const floatingIcons = document.querySelectorAll(".floating-icon");
    floatingIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.style.opacity = "1";
        icon.style.transform = "translateY(0)";
      }, 1000 + index * 200);
    });
  }
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }
    
    .notification-success {
        border-left: 4px solid var(--accent-color);
    }
    
    .notification-error {
        border-left: 4px solid var(--danger-color);
    }
    
    .notification-warning {
        border-left: 4px solid var(--warning-color);
    }
    
    .notification-info {
        border-left: 4px solid var(--primary-color);
    }
    
    .field-error {
        color: var(--danger-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
`;
document.head.appendChild(style);

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const portfolio = new Portfolio();

  // Initialize animations
  portfolio.initializeAnimations();
  portfolio.setupTypingAnimation();
  portfolio.setupParallaxEffect();

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// Smooth scrolling polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js";
  document.head.appendChild(script);
}
