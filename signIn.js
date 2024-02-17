document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".form");

    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get user input
        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        // Retrieve registered users from local storage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Find user with matching credentials
        const user = registeredUsers.find(user => user.email === email && user.password === password);

        if (user) {
            // Redirect to the Find Coach page if user is found
            window.location.href = "findCoach.html";
        } else {
            // Display error message if user is not found
            displayError("Invalid email or password." + "Please try again.");
        }
    });
});

// Function to display error message
const displayError = (message) => {
    const errorElement = document.querySelector('.msg');
    errorElement.textContent = message;
    errorElement.style.display = 'block'; // Show the error message
};
