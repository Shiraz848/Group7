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

    // form fields
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

    // city
    if (!isValidCity(city)) {
        displayError("Please enter a valid city in Israel!");
        return null;
    }

    // Confirm password
    if (password !== confirmPassword) {
        displayError("Passwords do not match");
        return null;
    }

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

// Define a list of Israeli cities
const israeliCities = ['Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Holon', 'Bnei Brak', 'Ramat Gan', 'Ashkelon', 'Bat Yam', 'Herzliya', 'Kfar Saba', 'Modiin', 'Nahariya', 'Hadera', 'Raanana', 'Lod', 'Ramla', 'Larnaca', 'Petah Tikva', 'Holon', 'Herzliya'];

const isValidCity = (city) => {
    const lowerCaseCity = city.toLowerCase();
    return israeliCities.some(c => c.toLowerCase() === lowerCaseCity);
};


const handleSubmit = (event) => {
    event.preventDefault();
    const user = validateForm();
    if (user) {
        console.log(user);

        // Store the user data in local storage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        registeredUsers.push(user);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

        alert("Registration successful!");
        document.getElementById("registrationForm").reset();
        window.location.href = "signIn.html"; // Redirect to sign-in page
    }
};

document.getElementById("registrationForm").addEventListener("submit", handleSubmit);
