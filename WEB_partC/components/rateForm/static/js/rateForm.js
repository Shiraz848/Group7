
// Function to show modal
function showRating(phone) {
  // Ensure the hidden input is set to the coach's phone number
  document.getElementById('coachPhoneInput').value = phone;

  const modal = document.getElementById('ratingModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

// Function to hide modal
document.querySelectorAll('.close').forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.rating-modal').style.display = 'none';
  });
});

// Script to make stars clickable
// Get all the stars
const stars = document.querySelectorAll('.star');

// Function to remove 'selected' class from stars
function removeSelectedStars() {
  stars.forEach(star => {
    star.classList.remove('selected');
  });
}

// Add click event to each star
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    removeSelectedStars(); // First, remove the 'selected' class from all stars
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('selected'); // Add 'selected' class to the clicked star and all preceding stars
    }
    const ratingValue = index + 1; // Since index is 0-based, add 1 for the actual rating
    const ratingInput = document.querySelector('input[name="rating"]'); // Select the input field for rating
    ratingInput.value = ratingValue; // Set the rating value
  });
});

