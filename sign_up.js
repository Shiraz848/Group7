// document.addEventListener("DOMContentLoaded", () => {
//     const signInForm = document.querySelector(".form");
//
//     signInForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Prevent the form from submitting normally
//
//         // Redirect to the sign-in page if all fields are correctly filled
//         if (validateForm()) {
//             window.location.href = "signIn.html";
//         }
//     });
// });

class User {
    constructor(firstName, lastName, email, phoneNumber, city, password, locationAccess) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.password = password;
        this.locationAccess = locationAccess;
    }
}

const validateForm = () => {
    const firstName = document.querySelector('input[name="firstName"]').value.trim();
    const lastName = document.querySelector('input[name="lastName"]').value.trim();
    const email = document.querySelector('input[name="Email"]').value.trim();
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value.trim();
    const city = document.querySelector('input[name="city"]').value.trim();
    const password = document.querySelector('input[name="password"]').value.trim();
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value.trim();
    const locationAccess = document.querySelector('input[name="locationAccess"]').checked;

    // Validate form fields
    if (!firstName || !lastName || !email || !phoneNumber || !city || !password || !confirmPassword) {
        displayError("Please fill in all fields");
        return null;
    }

    if (password !== confirmPassword) {
        displayError("Passwords do not match");
        return null;
    }

    if (!isValidEmail(email)) {
        displayError("Please enter a valid email address");
        return null;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        displayError("Please enter a valid phone number");
        return null;
    }

    // Clear any existing error messages
    // clearError();

    return new User(firstName, lastName, email, phoneNumber, city, password, locationAccess);
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

const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for phone number validation (10 digits starting with 0)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

const handleSubmit = (event) => {
    event.preventDefault();
    const user = validateForm();
    if (user) {
        // Do something with the user object, like sending it to a server
        console.log(user);
        alert("Registration successful!");
        document.getElementById("registrationForm").reset();
        window.location.href = "signIn.html"; // Redirect to sign-in page
    }
};

document.getElementById("registrationForm").addEventListener("submit", handleSubmit);
