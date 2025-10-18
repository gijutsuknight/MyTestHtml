/* Project Management Module */
export class ProjectManager {
  constructor() {
    this.currentFilter = "all";
  }

  init() {
    this.setupEventListeners();
    this.setupProjectFiltering();
  }

  setupEventListeners() {
    // Project filter buttons
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterProjects(btn);
      });
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
}
