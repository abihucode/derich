emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key

document
  .querySelector(".cta-button")
  .addEventListener("click", function () {
    const whatsappNumber = "1234567890";
    const message =
      "Hello! I would like to schedule an installation service.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });

// Add navigation handling
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const page = this.getAttribute("data-page");
    const mainContent = document.getElementById("main-content");
    const aboutSection = document.getElementById("about-section");
    const contactSection = document.getElementById("contact-section");

    // Hide all sections first
    mainContent.classList.add("hidden");
    aboutSection.classList.remove("active");
    contactSection.style.display = "none";

    if (page === "about") {
      aboutSection.classList.add("active");
    } else if (page === "contact") {
      contactSection.style.display = "block";
    } else {
      mainContent.classList.remove("hidden");
      alert(
        "This is a demo link. In a real website, this would navigate to: " +
          this.getAttribute("href")
      );
    }
  });
});

// Contact form submission handler
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
    const submitButton = form.querySelector('button[type="submit"]');

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Hide any existing messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Get form data
    const templateParams = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        templateParams
      )
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        successMessage.style.display = "block";
        form.reset();
      })
      .catch(function (error) {
        console.error("FAILED...", error);
        errorMessage.style.display = "block";
      })
      .finally(function () {
        // Re-enable submit button and restore text
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      });
  });

// Add intersection observer for fade-in animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".device-card").forEach((card) => {
  card.style.opacity = 0;
  observer.observe(card);
});

// Add slider functionality
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const sliderNav = document.querySelector(".slider-nav");

let currentSlide = 0;
const slideCount = slides.length;

// Create navigation dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("slider-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  sliderNav.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dot");

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(n) {
  currentSlide = n;
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideCount;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  goToSlide(currentSlide);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Auto advance slides
setInterval(nextSlide, 5000);