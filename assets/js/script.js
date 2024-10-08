'use strict';

// Helper function to add event listeners to multiple elements
const addEventListenerToAll = (elements, event, handler) => {
  elements.forEach(element => element.addEventListener(event, handler));
};

// Typewriter effect
const typewriterEffect = (() => {
  const phrases = ["I'm a Software Engineer", "I'm a Web Developer"];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const dynamicTextElement = document.getElementById("dynamic-text");

  const typeWriter = () => {
    const currentPhrase = phrases[currentPhraseIndex];
    if (isDeleting) {
      dynamicTextElement.textContent = currentPhrase.substring(0, currentCharIndex--);
      if (currentCharIndex < 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
    } else {
      dynamicTextElement.textContent = currentPhrase.substring(0, currentCharIndex++);
      if (currentCharIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriter, 1500);
        return;
      }
    }
    setTimeout(typeWriter, isDeleting ? 50 : 100);
  };

  return { start: typeWriter };
})();

// Element toggle function
const elementToggleFunc = elem => elem.classList.toggle("active");

// Sidebar functionality
const initSidebar = () => {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
};

// Testimonials modal functionality
const initTestimonialsModal = () => {
  const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItems.forEach(item => {
    item.addEventListener("click", () => {
      modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.textContent = item.querySelector("[data-testimonials-title]").textContent;
      modalText.textContent = item.querySelector("[data-testimonials-text]").textContent;
      testimonialsModalFunc();
    });
  });

  [modalCloseBtn, overlay].forEach(elem => 
    elem.addEventListener("click", testimonialsModalFunc)
  );
};

// Custom select and filtering functionality
const initCustomSelectAndFilter = () => {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");

  select.addEventListener("click", () => elementToggleFunc(select));

  const filterFunc = selectedValue => {
    filterItems.forEach(item => {
      if (selectedValue === "all" || item.dataset.category.includes(selectedValue)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  };

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedValue = item.textContent.toLowerCase();
      selectValue.textContent = item.textContent;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  });

  filterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedValue = btn.textContent.toLowerCase();
      selectValue.textContent = btn.textContent;
      filterFunc(selectedValue);
      filterBtn.forEach(btn => btn.classList.remove("active"));
      btn.classList.add("active");
    });
  });
};

// Contact form validation
const initContactForm = () => {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  const validateForm = () => {
    formBtn.disabled = !form.checkValidity();
  };

  formInputs.forEach(input => input.addEventListener("input", validateForm));
};

// Page navigation
const initPageNavigation = () => {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetPage = link.textContent.toLowerCase();
      pages.forEach((page, index) => {
        if (targetPage === page.dataset.page) {
          page.classList.add("active");
          navigationLinks[index].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
          navigationLinks[index].classList.remove("active");
        }
      });
    });
  });
};

// Initialize all functionality when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  typewriterEffect.start();
  initSidebar();
  initTestimonialsModal();
  initCustomSelectAndFilter();
  initContactForm();
  initPageNavigation();
});