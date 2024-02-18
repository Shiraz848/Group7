const coaches = [
    {
        name: "John Doe",
        rating: 4,
        classType: "Cardio",
        trainingTime: "Afternoon / Evening",
        trainingLevel: "Beginner",
        experience: "5 years",
        certification: "ACE Certified",
        address: "7 Rubin Reuven St. Beer-Sheva"
    },
    {
        name: "Jane Smith",
        rating: 5,
        classType: "Weight Lifting",
        trainingTime: "Afternoon / Evening",
        trainingLevel: "Advanced",
        experience: "8 years",
        certification: "NASM Certified",
        address: "124 Rager St. Beer-Sheva"
    },
    {
        name: "Inbal Epshtein",
        rating: 2,
        classType: "Pilates",
        trainingTime: "Morning",
        trainingLevel: "Beginner",
        experience: "10 years",
        certification: "Wingate Certified",
        address: "133 Rager St. Beer-Sheva"
    },
    {
        name: "Yuval Amit",
        rating: 5,
        classType: "Tennis",
        trainingTime: "Morning",
        trainingLevel: "Advanced",
        experience: "18 years",
        certification: "Ramat Hasharon Tennis Center Certified",
        address: "54 Wingate St. Beer-Sheva"
    }
];

class coachesSearch {
    constructor() {
        this.initialize();
    }

    initialize = () => {
        const searchButton = document.querySelector('.search-button');
        searchButton.addEventListener('click', this.searchTrainers);
        this.displaySearchResults(coaches);

        const contactMeButton = document.getElementById("contact-me-button");
        contactMeButton.addEventListener('click', this.onContactMeButtonClick);

    };

    searchTrainers = () => {
        const classTypeInput = document.getElementById("training-type").value.toLowerCase();
        const trainingTimeInput = document.querySelector('input[name="training-time"]:checked').value.toLowerCase();
        const trainingLevelInput = document.getElementById("training-level").value.toLowerCase();
        const locationInput = document.querySelector('input[name="location"]:checked').value;

        const filteredCoaches = coaches.filter(coach => {
            const coachClassType = coach.classType.toLowerCase();
            const coachTrainingTime = coach.trainingTime.toLowerCase();
            const coachTrainingLevel = coach.trainingLevel.toLowerCase();
            return (classTypeInput === "" || coachClassType.includes(classTypeInput)) &&
                (trainingTimeInput === "" || coachTrainingTime.includes(trainingTimeInput)) &&
                (trainingLevelInput === "" || coachTrainingLevel.includes(trainingLevelInput)) &&
                (locationInput === "current" || this.isNearMyAddress(coach.address));
        });

        this.displaySearchResults(filteredCoaches);
    };

    isNearMyAddress = (coachAddress) => {
        return true; // Placeholder logic
    };

    displaySearchResults = (coachesToShow) => {
        const searchResultsList = document.getElementById("search-results-list");
        searchResultsList.innerHTML = "";

        coachesToShow.forEach(coach => {
            const coachRow = document.createElement("div");
            coachRow.classList.add("coach");
            coachRow.innerHTML = `
                <input type="checkbox">
                <span class="coach-name">${coach.name}</span>
                <span class="stars">${this.generateStars(coach.rating)}</span>
                <span class="class-type">Type: ${coach.classType}</span>
                <button class="learn-more-button">Learn More</button>
                <button class="addToFavorites-button">Add To Favorites</button>
            `;

            coachRow.querySelector('.learn-more-button').addEventListener('click', () => this.displayCoachDetails(coach));
            coachRow.querySelector('.addToFavorites-button').addEventListener('click', () => this.addToFavorites(coach));

            searchResultsList.appendChild(coachRow);
        });

        const contactMeButton = document.getElementById("contact-me-button");
        contactMeButton.style.display = "block";
    };

    addToFavorites = (coach) => {
        const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches')) || [];
        const isDuplicate = storedFavoriteCoaches.some(favoriteCoach => favoriteCoach.name === coach.name);

        if (!isDuplicate) {
            storedFavoriteCoaches.push(coach);
            localStorage.setItem('favoriteCoaches', JSON.stringify(storedFavoriteCoaches));
            console.log("Coach added to favorites:", coach);
        } else {
            alert("Coach is already in favorites!");
        }
    };


    displayCoachDetails = (coach) => {
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
        ratingContainer.innerHTML = this.generateStars(coach.rating);

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => modal.style.display = "none";

        const rateButton = document.querySelector(".rate-button");
        rateButton.addEventListener('click', () => this.displayRatingModal());

        const closeLearnMoreButton = document.querySelector('#learnMore-button');
        closeLearnMoreButton.addEventListener('click', () => modal.style.display = 'none');

        modal.style.display = "block";
    };

    generateStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? "★" : "☆";
        }
        return stars;
    };

    displayRatingModal = () => {
        const ratingModal = document.getElementById("ratingModal");
        ratingModal.style.display = "block";

        const closeButton = ratingModal.querySelector(".close");
        closeButton.onclick = () => ratingModal.style.display = "none";

        window.onclick = function(event) {
            if (event.target === ratingModal) {
                ratingModal.style.display = "none";
            }
        };

        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.getAttribute('data-rating'));
                stars.forEach(s => {
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
        submitButton.addEventListener('click', () => ratingModal.style.display = 'none');
    };

    displayConfirmationMessage = () => {
        const confirmationModal = document.getElementById('confirmation-message');
        confirmationModal.style.display = 'block';

        const closeButton = confirmationModal.querySelector(".close");
        closeButton.onclick = () => confirmationModal.style.display = "none";

        window.onclick = function(event) {
            if (event.target === confirmationModal) {
                confirmationModal.style.display = "none";
            }
        };

        const closeMessageButton = document.querySelector('.close-button');
        closeMessageButton.addEventListener('click', () => confirmationModal.style.display = 'none');
    };

    onContactMeButtonClick = () => {
    const selectedCoaches = document.querySelectorAll('.coach input[type="checkbox"]:checked');
        if (selectedCoaches.length === 0) {
            alert("Please select one or more coaches before contacting.");
        } else {
            this.displayConfirmationMessage();
        }
    };

}

window.onload = () => new coachesSearch();
