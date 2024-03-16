// Show the modal
function showLearnMore(coachId) {
    const modal = document.getElementById(`details-modal-${coachId}`);
    if (modal) {
        modal.style.display = "block";
    }
}

// Hide the modal
function hideLearnMore(coachId) {
    const modal = document.getElementById(`details-modal-${coachId}`);
    if (modal) {
        modal.style.display = "none";
    }
}


