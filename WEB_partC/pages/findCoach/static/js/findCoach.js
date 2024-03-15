function showModal(phone) {
  console.log("Showing modal for phone:", phone); // This is for debugging purposes.

  // Assuming each modal has an ID in the format "details-modal-<phone_number>"
  const modalId = 'details-modal-' + phone;
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.style.display = 'block';
  } else {
    console.error("No modal found for phone:", phone);
  }
}
