document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.account-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Perform validation
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const city = document.getElementById('city').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // You can add more validation logic here as needed

        // Check if any field is empty
        if (firstName === '' || lastName === '' || city === '' || phone === '' || password === '' || confirmPassword === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        // If all validation passes, you can submit the form
        // Uncomment the line below to submit the form
        // form.submit();

        // For demonstration purposes, log the form data to the console
        console.log({
            'First Name': firstName,
            'Last Name': lastName,
            'City': city,
            'Phone Number': phone,
            'Password': password,
            'Confirm Password': confirmPassword
        });

        // Optionally, you can redirect the user or perform other actions here
    });
});

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
