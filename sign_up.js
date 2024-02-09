document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("registrationForm");

            form.addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent the form from submitting normally

                // Redirect to the welcome page
                window.location.href = "welcome.html";
            });
        });