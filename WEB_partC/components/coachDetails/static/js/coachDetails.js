// Show the modal
function showLearnMore(coachId) {
    const modal = document.getElementById(`details-modal-${coachId}`);
    if (modal) {
        modal.style.display = "block";
    }
}

// Hide the modal
// Hide the modal and prevent default action if it's a form submission
function hideLearnMore(coachId, event) {
  if (event) event.preventDefault();  // This line is crucial
  const modal = document.getElementById(`details-modal-${coachId}`);
  modal.style.display = 'none';
}




