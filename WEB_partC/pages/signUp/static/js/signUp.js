document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('#registrationForm');
    registrationForm.addEventListener('submit', (event) => {
        // Call validation functions here
        const isValidForm = validateForm();
        if (!isValidForm) {
            event.preventDefault(); // Prevent form submission if data is invalid
        }
    });
});

const validateForm = () => {
    // Collect form data using querySelector
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    const city = document.querySelector('input[name="city"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;
    const locationAccess = document.querySelector('input[name="locationAccess"]').checked;

    // Perform validations
    if (!isValidName(firstName)) {
        displayError("First name must be more than 3 characters and contain only English letters");
        return null;
    }

    // last name
    if (!isValidName(lastName)) {
        displayError("Last name must be more than 3 characters and contain only English letters");
        return null;
    }

    // email
    if (!isValidEmail(email)) {
        displayError("Please enter a valid email address");
        return null;
    }

    // phone number
    if (!isValidPhoneNumber(phoneNumber)) {
        displayError("Please enter a valid phone number");
        return null;
    }

    // // city
    // if (!isValidCity(city)) {
    //     displayError("Please enter a valid city in Israel!");
    //     return null;
    // }

    // password
    if (!isValidPassword(password)) {
        displayError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number");
        // displayError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character");
        return null;
    }

    // Confirm password
    if (password !== confirmPassword) {
        displayError("Passwords do not match");
        return null;
    }

    return true;
}


const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.innerHTML = message;
    msg.classList.add('error');
    setTimeout(() => {
        msg.innerHTML = '';
        msg.classList.remove('error');
    }, 5000);
};

const isValidName = (name) => {
    return /^[A-Za-z]{3,}$/.test(name);
};

const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password);
};

const arePasswordsMatching = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        displayError("Passwords do not match");
        return false;
    }
    return true;
};