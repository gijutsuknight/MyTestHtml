/* Theme Management Module */
export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light";
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
  }

  setupEventListeners() {
    const themeToggle = document.getElementById("themeToggle");
    themeToggle?.addEventListener("click", () => {
      this.toggleTheme();
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
    if (themeIcon) {
      themeIcon.className =
        this.currentTheme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
  }
}
