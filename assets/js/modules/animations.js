/* Animation Management Module */
export class AnimationManager {
  constructor() {
    this.observers = new Map();
  }

  init() {
    this.setupScrollAnimations();
    this.setupTypingAnimation();
    this.setupParallaxEffect();
    this.initializeAnimations();
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

    this.observers.set("scroll", observer);
  }

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

  // Cleanup method
  destroy() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}
