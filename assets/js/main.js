/* YeatTech Portfolio - Main JavaScript */

// Import modules
import { ThemeManager } from "./modules/theme.js";
import { NavigationManager } from "./modules/navigation.js";
import { AnimationManager } from "./modules/animations.js";
import { ProjectManager } from "./modules/projects.js";
import { FormManager } from "./modules/forms.js";
import { SkillManager } from "./modules/skills.js";

class Portfolio {
  constructor() {
    this.modules = {
      theme: new ThemeManager(),
      navigation: new NavigationManager(),
      animations: new AnimationManager(),
      projects: new ProjectManager(),
      forms: new FormManager(),
      skills: new SkillManager(),
    };

    this.init();
  }

  init() {
    // Initialize all modules
    Object.values(this.modules).forEach((module) => {
      if (module.init) {
        module.init();
      }
    });

    // Setup global event listeners
    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // Add loading animation
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Portfolio();
});

// Smooth scrolling polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js";
  document.head.appendChild(script);
}
