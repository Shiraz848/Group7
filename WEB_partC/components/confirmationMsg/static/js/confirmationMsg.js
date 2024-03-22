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
