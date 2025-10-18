/* Form Management Module */
export class FormManager {
  constructor() {
    this.notificationStyles = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: var(--spacing-md) var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
    `;
  }

  init() {
    this.setupEventListeners();
    this.setupFormValidation();
    this.addNotificationStyles();
  }

  setupEventListeners() {
    // Contact form
    const contactForm = document.getElementById("contactForm");
    contactForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit(contactForm);
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
    notification.style.cssText = this.notificationStyles;

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

  addNotificationStyles() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideOutRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
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
    `;
    document.head.appendChild(style);
  }
}
