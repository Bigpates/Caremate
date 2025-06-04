/**
 * Care Mate - Main JavaScript
 *
 * This file contains the core functionality for the Care Mate application
 * including navigation, animations, and UI interactions.
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initNavbar();
  initAnimations();
  initModals();
  initMobileMenu();
  initOnboarding();

  // Add event listeners for interactive elements
  addEventListeners();
});

/**
 * Initialize navbar functionality
 * - Handles navbar transparency/solid on scroll
 */
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  // Change navbar style on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Trigger scroll event on page load to set initial state
  window.dispatchEvent(new Event("scroll"));
}

/**
 * Initialize animations
 * - Handles scroll-based animations
 */
function initAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Observe elements that should animate on scroll
  document
    .querySelectorAll(
      ".section-title, .section-subtitle, .feature-card, .service-card",
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

/**
 * Initialize modal functionality
 */
function initModals() {
  // Get all modal triggers and modals
  const modalTriggers = document.querySelectorAll("[data-modal]");
  const modals = document.querySelectorAll(".modal");

  // Add click event to all modal triggers
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        openModal(modal);
      }
    });
  });

  // Add close functionality to all modals
  modals.forEach((modal) => {
    // Close when clicking the close button
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeModal(modal);
      });
    }

    // Close when clicking outside the modal content
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Close when pressing Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal(modal);
      }
    });
  });
}

/**
 * Open a modal
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  if (!mobileMenuBtn || !mobileMenu) return;

  // Open mobile menu
  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });

  // Close mobile menu
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  }

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
    });
  });
}

/**
 * Add event listeners for interactive elements
 */
function addEventListeners() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      if (!validateForm(this)) {
        e.preventDefault();
      }
    });
  });
}

/**
 * Validate a form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  let isValid = true;

  // Check required fields
  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      markFieldAsInvalid(field, "This field is required");
      isValid = false;
    } else {
      clearFieldValidation(field);
    }
  });

  // Check email fields
  const emailFields = form.querySelectorAll('input[type="email"]');
  emailFields.forEach((field) => {
    if (field.value.trim() && !isValidEmail(field.value)) {
      markFieldAsInvalid(field, "Please enter a valid email address");
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Mark a form field as invalid
 * @param {HTMLElement} field - The field to mark as invalid
 * @param {string} message - The error message
 */
function markFieldAsInvalid(field, message) {
  field.classList.add("error");

  // Remove any existing error message
  const existingError = field.parentNode.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }

  // Add error message
  const errorElement = document.createElement("div");
  errorElement.className = "form-error";
  errorElement.textContent = message;
  field.parentNode.appendChild(errorElement);
}

/**
 * Clear validation state for a field
 * @param {HTMLElement} field - The field to clear validation for
 */
function clearFieldValidation(field) {
  field.classList.remove("error");

  // Remove any existing error message
  const existingError = field.parentNode.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Check if an email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Toggle dark/light mode (for future implementation)
 */
function toggleTheme() {
  const body = document.body;

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
}

/**
 * Set theme based on user preference (for future implementation)
 */
function setThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else if (savedTheme === "dark" || prefersDark) {
    document.body.classList.add("dark-mode");
  }
}

/**
 * Initialize onboarding experience
 */
function initOnboarding() {
  const modal = document.getElementById("onboarding-modal");
  if (!modal) return;

  const slides = modal.querySelectorAll(".onboarding-slide");
  const nextBtn = modal.querySelector(".onboarding-next");
  const skipBtn = modal.querySelector(".onboarding-skip");

  let step = 0;

  function showStep(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    if (index >= slides.length - 1) {
      nextBtn.textContent = "Finish";
    } else {
      nextBtn.textContent = "Next";
    }
  }

  function closeOnboarding() {
    closeModal(modal);
    localStorage.setItem("onboardingComplete", "true");
  }

  nextBtn.addEventListener("click", () => {
    step++;
    if (step >= slides.length) {
      closeOnboarding();
    } else {
      showStep(step);
    }
  });

  skipBtn.addEventListener("click", closeOnboarding);

  if (!localStorage.getItem("onboardingComplete")) {
    openModal(modal);
    showStep(step);
  }
}
