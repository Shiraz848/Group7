document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.querySelector('#registrationForm');
    registrationForm.addEventListener('submit', (event) => {
        const isValidForm = validateForm();
        if (!isValidForm) {
        event.preventDefault();       }
    });
});


const validateForm = () => {
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    let isValid = true;

    // Perform validations
    if (!isValidName(firstName)) {
        displayError("First name must be more than 3 characters and contain only English letters");
        isValid = false;
    }

    // last name
    if (!isValidName(lastName)) {
        displayError("Last name must be more than 3 characters and contain only English letters");
        isValid = false;
    }

    // email
    if (!isValidEmail(email)) {
        displayError("Please enter a valid email address");
        isValid = false;
    }

    // phone number
    if (!isValidPhoneNumber(phoneNumber)) {
        displayError("Please enter a valid phone number");
        isValid = false;
    }

    // password
    if (!isValidPassword(password)) {
        displayError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number");
        isValid = false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        displayError("Passwords do not match");
        isValid = false;
    }
    console.log(isValid);
    return isValid;
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