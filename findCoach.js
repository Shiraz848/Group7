// Function to filter coaches based on search criteria
function filterCoaches() {
    const searchInput = ""; // No search input in the provided HTML
    const classTypeInput = document.getElementById("training-type").value.toLowerCase();
    const trainingTimeInput = document.querySelector('input[name="training-time"]:checked').value.toLowerCase();
    const trainingLevelInput = document.getElementById("training-level").value.toLowerCase();

    // Filter coaches based on search inputs
    const filteredCoaches = coaches.filter(function(coach) {
        // Convert coach name and other properties to lowercase for case-insensitive search
        const coachClassType = coach.classType.toLowerCase();
        const coachTrainingTime = coach.trainingTime.toLowerCase();
        const coachTrainingLevel = coach.trainingLevel.toLowerCase();

        // Return true if any of the coach properties match the search inputs
        return (classTypeInput === "" || coachClassType.includes(classTypeInput)) &&
            (trainingTimeInput === "" || coachTrainingTime.includes(trainingTimeInput)) &&
            (trainingLevelInput === "" || coachTrainingLevel.includes(trainingLevelInput));
    });

    // Display filtered coaches
    displaySearchResults(filteredCoaches);
}



// Display search results
function displaySearchResults(coachesToShow) {
    const searchResultsList = document.getElementById("search-results-list");

    searchResultsList.innerHTML = ""; // Clear previous results

    // Loop through coaches and create HTML for each
    coachesToShow.forEach(function(coach) {
        // Create coach row
        const coachRow = document.createElement("div");
        coachRow.classList.add("coach");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        coachRow.appendChild(checkbox);

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

        // Create "Add To Favorites" button
        const addToFavoritesButton = document.createElement("button");
        addToFavoritesButton.classList.add("addToFavorites-button");
        addToFavoritesButton.textContent = "Add To Favorites";
        coachRow.appendChild(addToFavoritesButton);

        // Add event listener to "Learn More" button
        learnMoreButton.addEventListener('click', function() {
            displayCoachDetails(coach);
        });

        // Add event listener to "Add To Favorites" button
        addToFavoritesButton.addEventListener('click', function() {
            addToFavorites(coach);
        });

        // Append coach row to search results list
        searchResultsList.appendChild(coachRow);
    });
}

// Function to add a coach to the favorites list
function addToFavorites(coach) {
    // Retrieve existing favorite coaches from local storage
    const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches')) || [];

    // Check if the coach is already in the favorites list
    const isDuplicate = storedFavoriteCoaches.some(favoriteCoach => favoriteCoach.name === coach.name);

    if (!isDuplicate) {
        // Add the coach to the favorites list
        storedFavoriteCoaches.push(coach);

        // Update the stored favorite coaches in local storage
        localStorage.setItem('favoriteCoaches', JSON.stringify(storedFavoriteCoaches));

        // After adding the coach, update the display of favorite coaches
        displayFavoriteCoaches();
    } else {
        alert("Coach is already in favorites!");
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

// Function to handle search button click
function handleSearchButtonClick() {
    console.log("Search button clicked");
    filterCoaches();
}

// Add event listener to the search button
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', handleSearchButtonClick);

// Call filterCoaches() initially to display all coaches
filterCoaches();