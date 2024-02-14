function displayFavoriteCoaches() {
    const favoritesList = document.getElementById("favorites-list");

    // Clear previous content
    favoritesList.innerHTML = "";

    // Retrieve favorite coaches from local storage
    const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches'));

    // Check if there are favorite coaches stored
    if (storedFavoriteCoaches) {
        // Loop through stored favorite coaches and create HTML for each
        storedFavoriteCoaches.forEach(function(coach) {
            // Create coach row
            const coachRow = document.createElement("div");
            coachRow.classList.add("favorite-coach");

            // Create bullet
            const bullet = document.createElement("span");
            bullet.textContent = "• ";
            coachRow.appendChild(bullet);

            // Create coach name
            const coachName = document.createElement("span");
            coachName.classList.add("coach-name");
            coachName.textContent = coach.name;
            coachRow.appendChild(coachName);

            // Create stars based on rating
            const stars = document.createElement("span");
            stars.classList.add("stars");
            for (let i = 0; i < 5; i++) {
                const star = document.createElement("span");
                star.textContent = i < coach.rating ? "★" : "☆";
                stars.appendChild(star);
            }
            coachRow.appendChild(stars);

            // Create coach class type
            const classType = document.createElement("span");
            classType.classList.add("class-type");
            classType.textContent = "Type: " + coach.classType;
            coachRow.appendChild(classType);

            // Create "Learn More" button
            const learnMoreButton = document.createElement("button");
            learnMoreButton.classList.add("learn-more-button");
            learnMoreButton.textContent = "Learn More";
            coachRow.appendChild(learnMoreButton);

            // Create "Delete" button
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Delete";
            coachRow.appendChild(deleteButton);

            // Append coach row to favorites list
            favoritesList.appendChild(coachRow);

            // Add event listener to "Learn More" button
            learnMoreButton.addEventListener('click', function() {
                displayCoachDetails(coach);
            });

            // Add event listener to "Delete" button
            deleteButton.addEventListener('click', function() {
                // Remove the coach row from the favorites list
                coachRow.remove();
                // Also remove the coach from the stored favorite coaches
                const updatedFavoriteCoaches = storedFavoriteCoaches.filter(favCoach => favCoach.name !== coach.name);
                // Update the stored favorite coaches in local storage
                localStorage.setItem('favoriteCoaches', JSON.stringify(updatedFavoriteCoaches));
            });
        });
    }
}

// Function to display modal with coach details
// Add the function to display the coach's address in the modal
function displayCoachDetails(coach) {
    const modal = document.getElementById("myModal");
    const coachName = document.getElementById("coach-name");
    const coachType = document.getElementById("coach-type");
    const coachExperience = document.getElementById("coach-experience");
    const coachCertification = document.getElementById("coach-certification");
    const coachAddress = document.getElementById("coach-address");
    const ratingContainer = document.getElementById("rating-container");

    coachName.textContent = coach.name;
    coachType.textContent = coach.classType;
    coachExperience.textContent = "Experience: " + coach.experience;
    coachCertification.textContent = "Certification: " + coach.certification;
    coachAddress.textContent = coach.address;

    // Clear previous stars
    ratingContainer.innerHTML = '';

    // Dynamically generate rating stars
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = i < coach.rating ? "★" : "☆";
        ratingContainer.appendChild(star);
    }

    // Show the modal
    modal.style.display = "block";

    // Close the modal when the close button is clicked
    const closeButton = document.querySelector(".close");
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks outside the modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Get the rate button and attach click event listener
    const rateButton = document.querySelector(".rate-button");
    rateButton.addEventListener('click', function() {
        displayRatingModal();
    });
}

// Function to display rating modal
function displayRatingModal() {
    const ratingModal = document.getElementById("ratingModal");

    // Show the rating modal
    ratingModal.style.display = "block";

    // Close the rating modal when the close button is clicked
    const closeButton = ratingModal.querySelector(".close");
    closeButton.onclick = function() {
        ratingModal.style.display = "none";
    };

    // Close the rating modal when the user clicks outside the modal
    window.onclick = function(event) {
        if (event.target === ratingModal) {
            ratingModal.style.display = "none";
        }
    };

    // Get all star elements
    const stars = document.querySelectorAll('.star');

    // Add click event listener to each star
    stars.forEach(function(star) {
        star.addEventListener('click', function() {
            const rating = parseInt(star.getAttribute('data-rating'));

            // Mark all stars with a rating less than or equal to the clicked star as clicked
            stars.forEach(function(s) {
                const sRating = parseInt(s.getAttribute('data-rating'));
                if (sRating <= rating) {
                    s.classList.add('clicked');
                } else {
                    s.classList.remove('clicked');
                }
            });
        });
    });

    const submitButton = document.querySelector('.submit-rating');
    submitButton.addEventListener('click', function() {
        // Close the rating modal
        const ratingModal = document.getElementById('ratingModal');
        ratingModal.style.display = 'none';

        // Show the learn more modal (assuming its ID is "myModal")
        const learnMoreModal = document.getElementById('myModal');
        learnMoreModal.style.display = 'block';
    });
}

// Call the function to display favorite coaches when the page loads
displayFavoriteCoaches();
