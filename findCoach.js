function searchCoaches() {
    // Dummy data for demonstration
    const coaches = [
        { name: "John Doe", rating: 4, id: 1 },
        { name: "Jane Smith", rating: 5, id: 2 },
        // Add more coaches as needed
    ];

    // Display search results
    const searchResultsDiv = document.getElementById("search-results");
    searchResultsDiv.innerHTML = ""; // Clear previous results

    coaches.forEach(function(coach) {
        // Create coach row
        const coachRow = document.createElement("div");
        coachRow.classList.add("coach-row");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        coachRow.appendChild(checkbox);

        // Create coach info
        const coachInfo = document.createElement("div");
        coachInfo.classList.add("coach-info");

        // Create coach name
        const coachName = document.createElement("span");
        coachName.textContent = coach.name;
        coachInfo.appendChild(coachName);

        // Create stars based on rating
        const stars = document.createElement("span");
        for (let i = 0; i < coach.rating; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            stars.appendChild(star);
        }
        coachInfo.appendChild(stars);

        // Create "Learn more" button
        const learnMoreButton = document.createElement("button");
        learnMoreButton.textContent = "Learn More";
        coachInfo.appendChild(learnMoreButton);

        // Create "Add to Favorites" button
        const addToFavoritesButton = document.createElement("button");
        addToFavoritesButton.textContent = "Add to Favorites";
        coachInfo.appendChild(addToFavoritesButton);

        coachRow.appendChild(coachInfo);

        // // Create "Choose" button
        // const chooseButton = document.createElement("button");
        // chooseButton.textContent = "Choose";
        // coachRow.appendChild(chooseButton);

        searchResultsDiv.appendChild(coachRow);
    });
}
