document.addEventListener("DOMContentLoaded", function() {
    const signInForm = document.querySelector(".form");

    signInForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Redirect to the Find Coach page
        window.location.href = "findCoach.html";
    });
});
