document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the signed-in user object from local storage
    const signedInUser = JSON.parse(localStorage.getItem('signedInUser'));
    if (signedInUser) {
        // Populate the form fields with the signed-in user's data
        document.getElementById('first-name').value = signedInUser.firstName;
        document.getElementById('last-name').value = signedInUser.lastName;
        document.getElementById('email').value = signedInUser.email; // Since email field is disabled, no need to populate
        document.getElementById('phone').value = signedInUser.phoneNumber;
        document.getElementById('city').value = signedInUser.city;
        // Password fields should not be populated for security reasons
    }

    const accountForm = document.querySelector(".account-form");

    accountForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        // Validate form fields before submitting
        if (validateForm()) {
            // Proceed with form submission
            alert("Details updated successfully!");
            // You can add further logic here, like sending the form data to the server
        }
    });
});

class User {
    constructor(firstName, lastName, email, phoneNumber, city, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.password = password;
    }
}

const validateForm = () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Validate form fields
    if (!firstName || !lastName || !phoneNumber || !city || !password || !confirmPassword) {
        displayError("Please fill in all fields!");
        return false;
    }

    if (password !== confirmPassword) {
        displayError("Passwords do not match!");
        return false;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        displayError("Please enter a valid phone number!");
        return false;
    }

    return true;
};


const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.innerHTML = message;
    msg.classList.add('error');
    setTimeout(() => {
        msg.innerHTML = '';
        msg.classList.remove('error');
    }, 5000);
};

const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation (10 digits starting with 0)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};
