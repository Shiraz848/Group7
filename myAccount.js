document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the user object from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Populate the form fields with the user's data
        document.getElementById('first-name').value = user.firstName;
        document.getElementById('last-name').value = user.lastName;
        document.getElementById('email').value = user.email; // Since email field is disabled, no need to populate
        document.getElementById('phone').value = user.phoneNumber;
        document.getElementById('city').value = user.city;
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
















//-----------------------------------------------------------------------------
// document.addEventListener("DOMContentLoaded", () => {
//     const accountForm = document.querySelector(".account-form");
//
//     // Fetch user data and populate the form
//     const userData = getUserData(); // Implement this function to retrieve user data
//     if (userData) {
//         document.getElementById("email").value = userData.email;
//         document.getElementById("first-name").value = userData.firstName;
//         document.getElementById("last-name").value = userData.lastName;
//         document.getElementById("city").value = userData.city;
//         document.getElementById("phone").value = userData.phoneNumber;
//         // Password fields should not be pre-filled for security reasons
//     }
//
//     // Handle form submission
//     accountForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//
//         // Get updated data from the form
//         const updatedUserData = {
//             firstName: document.getElementById("first-name").value.trim(),
//             lastName: document.getElementById("last-name").value.trim(),
//             city: document.getElementById("city").value.trim(),
//             phoneNumber: document.getElementById("phone").value.trim(),
//             password: document.getElementById("password").value.trim(),
//             confirmPassword: document.getElementById("confirm-password").value.trim(),
//         };
//
//         // Validate the form data
//         if (!validateForm(updatedUserData)) {
//             return; // Stop further processing if validation fails
//         }
//
//         // Save the updated data
//         saveUserData(updatedUserData); // Implement this function to update user data
//         alert("Details updated successfully!");
//     });
// });
//
// // Function to validate form data
// const validateForm = (userData) => {
//     const { firstName, lastName, city, phoneNumber, password, confirmPassword } = userData;
//
//     if (!firstName || !lastName || !city || !phoneNumber || !password || !confirmPassword) {
//         alert("Please fill in all fields");
//         return false;
//     }
//
//     if (password !== confirmPassword) {
//         alert("Passwords do not match");
//         return false;
//     }
//
//     // Add more validation rules as needed
//
//     return true; // Form data is valid
// };
//
// // Example functions for getting and saving user data
// const getUserData = () => {
//     // Replace with actual implementation to retrieve user data from backend or storage
//     return {
//         email: "example@example.com",
//         firstName: "John",
//         lastName: "Doe",
//         city: "Example City",
//         phoneNumber: "1234567890",
//         // Omitting password fields for security reasons
//     };
// };
//
// const saveUserData = (userData) => {
//     // Replace with actual implementation to save user data to backend or storage
//     console.log("Saving user data:", userData);
// };
//









//----------------------------------------------
//    const form = document.querySelector('.account-form');
//
//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission
//
//         // Perform validation
//         const firstName = document.getElementById('first-name').value.trim();
//         const lastName = document.getElementById('last-name').value.trim();
//         const city = document.getElementById('city').value.trim();
//         const phone = document.getElementById('phone').value.trim();
//         const password = document.getElementById('password').value.trim();
//         const confirmPassword = document.getElementById('confirm-password').value.trim();
//
//         // You can add more validation logic here as needed
//
//         // Check if any field is empty
//         if (firstName === '' || lastName === '' || city === '' || phone === '' || password === '' || confirmPassword === '') {
//             alert('Please fill in all fields.');
//             return;
//         }
//
//         // Check if password and confirm password match
//         if (password !== confirmPassword) {
//             alert('Password and Confirm Password do not match.');
//             return;
//         }
//
//         // If all validation passes, you can submit the form
//         // Uncomment the line below to submit the form
//         // form.submit();
//
//         // For demonstration purposes, log the form data to the console
//         console.log({
//             'First Name': firstName,
//             'Last Name': lastName,
//             'City': city,
//             'Phone Number': phone,
//             'Password': password,
//             'Confirm Password': confirmPassword
//         });
//
//         // Optionally, you can redirect the user or perform other actions here
//     });
// });

//-----------------------------------------------------------




// document.addEventListener("DOMContentLoaded", function() {
//     const accountForm = document.getElementById("accountForm");
//
//     accountForm.addEventListener("submit", function(event) {
//         event.preventDefault(); // Prevent the form from submitting normally
//
//         // Retrieve form input values
//         const firstName = document.getElementById("firstName").value;
//         const lastName = document.getElementById("lastName").value;
//         const phoneNumber = document.getElementById("phoneNumber").value;
//         const city = document.getElementById("city").value;
//         const password = document.getElementById("password").value;
//         const confirmPassword = document.getElementById("confirmPassword").value;
//
//         // Perform basic form validation
//         if (!firstName || !lastName || !phoneNumber || !city || !password || !confirmPassword) {
//             alert("Please fill in all the required fields.");
//             return;
//         }
//
//         if (password !== confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }
//
//         // Here you can add code to submit the form data to your server for updating user details
//         // For example, you can use AJAX to send a POST request to your backend API
//         // Upon successful update, you can show a success message or redirect the user to another page
//         // You can also handle errors and edge cases accordingly
//     });
// });
