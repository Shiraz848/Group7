document.addEventListener("DOMContentLoaded", () => {
    const accountForm = document.querySelector(".account-form");
    accountForm.addEventListener("submit", (event) => {
        // Prevent the default form submission to validate the form first
        event.preventDefault();

        // Validate form fields before allowing the form to submit
        if (isValidForm()) {
            console.log("Form is valid. Details ready to be submitted.");
            alert("Details updated successfully!");
        }
    });
});

const isValidForm = () => {
    // Retrieve form values
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Check for empty fields
    if (!firstName || !lastName || !phoneNumber || !city || !password || !confirmPassword) {
        displayError("Please fill in all fields!");
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        displayError("Passwords do not match!");
        return false;
    }

    // Check if phone number is valid
    if (!isValidPhoneNumber(phoneNumber)) {
        displayError("Please enter a valid phone number!");
        return false;
    }

    // If all validations pass
    return true;
};

const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.textContent = message; // Use textContent for plain text to prevent HTML injection
    msg.classList.add('error');
    setTimeout(() => {
        msg.textContent = '';
        msg.classList.remove('error');
    }, 5000);
};

const isValidPhoneNumber = (phoneNumber) => {
    // Define a regex pattern for a valid phone number
    // Adjust the pattern to fit the phone number format you need
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};
