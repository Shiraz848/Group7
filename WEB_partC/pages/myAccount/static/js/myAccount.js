document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.querySelector('.account-form');
    accountForm.addEventListener('submit', (event) => {
        const isValidForm = validateForm();
        if (!isValidForm) {
            event.preventDefault();
        }
    });
});

const validateForm = () => {
    const firstName = document.querySelector('input[name="first-name"]').value;
    const lastName = document.querySelector('input[name="last-name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

    let isValid = true;

    // first name
    if (!isValidName(firstName)) {
        displayError("First name must be more than 3 characters and contain only English letters");
        isValid = false;
    }

    // last name
    if (!isValidName(lastName)) {
        displayError("Last name must be more than 3 characters and contain only English letters");
        isValid = false;
    }

    // phone number
    if (!isValidPhoneNumber(phone)) {
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

    return isValid;
}

const displayError = (message) => {
    const msg = document.querySelector('.msg');
    msg.innerHTML = message;
    msg.classList.add('error');
    setTimeout(() => {
        msg.innerHTML = '';
        msg.classList.remove('error');
        msg.style.display = 'none';
    }, 5000);
};

const isValidName = (name) => {
    return /^[A-Za-z]{3,}$/.test(name);
};

const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    return passwordRegex.test(password);
};