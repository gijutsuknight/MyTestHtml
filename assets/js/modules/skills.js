/* Skill Management Module */
export class SkillManager {
  constructor() {
    this.observer = null;
  }

  init() {
    this.setupSkillBars();
  }

  setupSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    const observerOptions = {
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width");

          setTimeout(() => {
            progressBar.style.width = width;
          }, 500);

          this.observer.unobserve(progressBar);
        }
      });
    }, observerOptions);

    skillBars.forEach((bar) => {
      this.observer.observe(bar);
    });
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
