



  // Initialize EmailJS with your user ID
  emailjs.init('dKnidPp3Y-VIZBfoI'); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID

  // Event listener for form submission
  document.querySelector('.container form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect form data using class names
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    // Prepare the data to send via EmailJS
    const formData = {
      from_name: name,
      from_email: email,
      service_type: service,
      message: message
    };

    // Send the email using EmailJS
    emailjs.send('service_40grx89', 'template_re51x9a', formData)
      .then(function(response) {
        console.log("Email sent successfully: ", response);
        alert("Your message has been sent successfully!");
      }, function(error) {
        console.error("Error sending email: ", error);
        alert("Failed to send your message. Please try again.");
      });

    // Reset the form after submission
    document.querySelector('.container form').reset();
  });


  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".service-card");
    elements.forEach((elem) => {
      const rect = elem.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        elem.classList.add("animate-fadeUp");
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check