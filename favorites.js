// Dummy data for demonstration
const favoriteCoaches = [
    { name: "John Doe", rating: 4, classType: "Cardio", experience: "5 years", certification: "ACE Certified" },
    { name: "Jane Smith", rating: 5, classType: "Weight Lifting", experience: "8 years", certification: "NASM Certified" },
    // Add more favorite coaches as needed
];

// Function to display favorite coaches
function displayFavoriteCoaches() {
    const favoritesList = document.getElementById("favorites-list");

    // Clear previous content
    favoritesList.innerHTML = "";

    // Loop through favorite coaches and create HTML for each
    favoriteCoaches.forEach(function(coach) {
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
            coachRow.remove()
        });
    });
}

// Function to display modal with coach details
function displayCoachDetails(coach) {
    const modal = document.getElementById("myModal");
    const coachName = document.getElementById("coach-name");
    const coachType = document.getElementById("coach-type");
    const coachExperience = document.getElementById("coach-experience");
    const coachCertification = document.getElementById("coach-certification");
    const ratingContainer = document.getElementById("rating-container");

    coachName.textContent = coach.name;
    coachType.textContent = coach.classType;
    coachExperience.textContent = "Experience: " + coach.experience;
    coachCertification.textContent = "Certification: " + coach.certification;

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
    const closeButton = document.getElementsByClassName("close")[0];
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Close the modal when the user clicks outside the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// Call the function to display favorite coaches when the page loads
displayFavoriteCoaches();
