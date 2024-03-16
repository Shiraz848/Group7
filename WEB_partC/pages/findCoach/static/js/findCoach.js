// Function to show modal
function showModal(phone) {
    const modal = document.getElementById(`details-modal-${phone}`);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to hide modal
function hideModal(phone) {
    const modal = document.getElementById(`details-modal-${phone}`);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to handle the contact form submission
document.getElementById('coaches-form').addEventListener('submit', function (event) {
    const selectedCoaches = [...this.querySelectorAll('input[name="selected_coaches"]:checked')].map(input => input.value);
    if (selectedCoaches.length === 0) {
        event.preventDefault();
        // Display error message
        alert('Please select at least one coach.');
    } else {
        // Continue with form submission
        // The server-side will handle adding to MongoDB
    }
});

// Function to show the confirmation modal
function showConfirmationModal() {
    const modal = document.getElementById('confirmation-message');
    modal.style.display = 'block';
}

// Close handlers for modals
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal-content').parentElement.style.display = 'none';
    });
});

