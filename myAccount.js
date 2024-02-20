document.addEventListener("DOMContentLoaded", () => {
    const signedInUser = JSON.parse(localStorage.getItem('signedInUser'));
    if (signedInUser) {
        document.getElementById('first-name').value = signedInUser.firstName;
        document.getElementById('last-name').value = signedInUser.lastName;
        document.getElementById('email').value = signedInUser.email; //email field is disabled
        document.getElementById('phone').value = signedInUser.phoneNumber;
        document.getElementById('city').value = signedInUser.city;
        document.getElementById('password').value = signedInUser.password;
        document.getElementById('confirm-password').value = signedInUser.confirmPassword;

    }

    const accountForm = document.querySelector(".account-form");
    accountForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validate form fields before submitting
        if (isValidForm()) {
            signedInUser.firstName = document.getElementById('first-name').value.trim();
            signedInUser.lastName = document.getElementById('last-name').value.trim();
            signedInUser.phoneNumber = document.getElementById('phone').value.trim();
            signedInUser.city = document.getElementById('city').value.trim();
            signedInUser.password = document.getElementById('password').value.trim();
            signedInUser.confirmPassword = document.getElementById('confirm-password').value.trim();

            // Save updated user object to local storage
            localStorage.setItem('signedInUser', JSON.stringify(signedInUser));

            console.log(signedInUser);
            alert("Details updated successfully!");

        }
    });
});

const isValidForm = () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

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
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
};
