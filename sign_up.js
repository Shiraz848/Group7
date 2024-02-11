document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("registrationForm");

            form.addEventListener("submit", function(event) {
                event.preventDefault(); // Prevent the form from submitting normally

                // Redirect to the welcome page
                window.location.href = "welcome.html";
            });
        });
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    var firstName = document.getElementsByName('firstName')[0].value;
    var lastName = document.getElementsByName('lastName')[0].value;
    var phoneNumber = document.getElementsByName('phoneNumber')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('password')[0].value;

    if (firstName.length < 3) {
        alert('First name must be more than 3 characters.');
        event.preventDefault();
        return false;
    }

    if (lastName.length < 3) {
        alert('Last name must be more than 3 characters.');
        event.preventDefault();
        return false;
    }

    // You can add more validation logic here for phone number format, email format, and password strength

    return true; // Submit the form if all conditions are met
});