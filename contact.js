(function () {
    emailjs.init("dKnidPp3Y-VIZBfoI"); // Replace "YOUR_USER_ID" with your EmailJS user ID
  })();

  function sendEmail(event) {
    event.preventDefault();

    emailjs
      .sendForm("service_40grx89", "template_re51x9a", event.target)
      .then(
        function (response) {
          alert("Message sent successfully!");
        },
        function (error) {
          alert("Failed to send message. Please try again later.");
        }
      );
  }