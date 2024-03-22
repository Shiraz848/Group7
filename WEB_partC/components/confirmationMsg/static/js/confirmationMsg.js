// Show the confirmation message modal
function showConfirmationMsg() {
    const confirmationModal = document.getElementById('confirmation-message');
    if (confirmationModal) {
        confirmationModal.style.display = "block";
    }
}


// Hide the confirmation message modal
function hideConfirmationMsg() {
    const confirmationModal = document.getElementById('confirmation-message');
    if (confirmationModal) {
        confirmationModal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
                showConfirmationMsg(); // This assumes you have defined this function in your confirmationMsg.js
            });
//
// // confirmationMsg.js
// document.addEventListener('DOMContentLoaded', function() {
//     // Assuming you have an element with the ID 'flash-messages' where flash messages are displayed
//     const flashMessages = document.getElementById('flash-messages');
//     if (flashMessages) {
//         // Check if a success message is present
//         const successMessage = flashMessages.querySelector('.flash-success');
//         if (successMessage) {
//             showConfirmationMsg();
//         }
//     }
// });

