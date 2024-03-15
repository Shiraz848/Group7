document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector(".form");

    signInForm.addEventListener("submit", (event) => {
        // This part is handled by your server now, no need to prevent the default form submit behavior
        // event.preventDefault();

        // The error message will be displayed by the server-rendered template
    });
});


// Function to display error message
const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.textContent = message;
    msg.classList.add('error');
    setTimeout(() => {
        msg.textContent = '';
        msg.classList.remove('error');
    }, 5000);
};