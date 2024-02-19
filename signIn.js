document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".form");

    signInForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get user input
        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value.trim();

        // get registered users from local storage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

        // Find user with matching information
        const user = registeredUsers.find(user => user.email === email && user.password === password);

        if (user) {
            // Store user data in local storage
            localStorage.setItem('signedInUser', JSON.stringify(user));
            // if user is found go to the Find Coach page
            window.location.href = "findCoach.html";
        } else {
            // Display error message
            displayError("Invalid email or password.");
        }
    });
});

// Function to display error message
const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.innerHTML = message;
    msg.classList.add('error');
    setTimeout(() => {
        msg.innerHTML = '';
        msg.classList.remove('error');
    }, 5000);
};