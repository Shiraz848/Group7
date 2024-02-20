const coaches = [
    {
        name: "John Doe",
        rating: 4,
        classType: "Cardio",
        trainingTime: "Afternoon / Evening",
        trainingLevel: "Beginner",
        experience: "5 years",
        certification: "ACE Certified",
        address: "Ben-Gurion University Sports Center",
        Latitude: 31.2618491,
        Longitude: 34.8119998
    },
    {
        name: "Jane Smith",
        rating: 5,
        classType: "Cardio",
        trainingTime: "Afternoon / Evening",
        trainingLevel: "Advanced",
        experience: "8 years",
        certification: "NASM Certified",
        address: "2 Yaakov Cohen st. Beer Sheva",
        Latitude: 31.2527846,
        Longitude: 34.800516
    },
    {
        name: "Inbal Epshtein",
        rating: 2,
        classType: "Pilates",
        trainingTime: "Morning",
        trainingLevel: "Beginner",
        experience: "10 years",
        certification: "Wingate Certified",
        address: "1 Yanush Korchak st. Hod Hasharon",
        Latitude: 32.1622844,
        Longitude: 34.9098584
    },
    {
        name: "Yuval Amit",
        rating: 5,
        classType: "Cardio",
        trainingTime: "Afternoon / Evening",
        trainingLevel: "Advanced",
        experience: "18 years",
        certification: "Ramat Hasharon Tennis Center Certified",
        address: "7 Levontin st. Tel Aviv-Yafo",
        Latitude: 32.0617781,
        Longitude: 34.779576
    }
];

class CoachesSearch {
    constructor() {
        this.initialize();
        this.userLocation = null;
        this.user = JSON.parse(localStorage.getItem('registeredUser')) || {};
    }

    initialize() {
        const searchButton = document.querySelector('.search-button');
        searchButton.addEventListener('click', this.searchTrainers.bind(this));
        this.displaySearchResults(coaches);

        const locationAccessCheckbox = document.querySelector('input[name="location"]');
        if (locationAccessCheckbox.checked) {
            this.getUserLocation();
        }

        const contactMeButton = document.getElementById("contact-me-button");
        contactMeButton.addEventListener('click', this.onContactMeButtonClick.bind(this));
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log("User's location:", this.userLocation);
                this.searchTrainers();
            }, error => {
                console.error("Error getting user's location:", error.message);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    searchTrainers() {
        const classTypeInput = document.getElementById("training-type").value.toLowerCase();
        const trainingTimeInput = document.querySelector('input[name="training-time"]:checked').value.toLowerCase();
        const trainingLevelInput = document.getElementById("training-level").value.toLowerCase();
        const locationInput = document.querySelector('input[name="location"]:checked').value;

        let filteredCoaches = coaches.filter(coach => {
            const coachClassType = coach.classType.toLowerCase();
            const coachTrainingTime = coach.trainingTime.toLowerCase();
            const coachTrainingLevel = coach.trainingLevel.toLowerCase();
            return (classTypeInput === "" || coachClassType.includes(classTypeInput)) &&
                (trainingTimeInput === "" || coachTrainingTime.includes(trainingTimeInput)) &&
                (trainingLevelInput === "" || coachTrainingLevel.includes(trainingLevelInput));
        });

        if (locationInput === "current" && this.userLocation) {
            filteredCoaches = filteredCoaches.filter(coach => {
                return this.isNearMyAddress(coach);
            });
        } else if (locationInput === "city" && this.user && this.user.city) {
            filteredCoaches = filteredCoaches.filter(coach => {
                return coach.address.toLowerCase().includes(this.user.city.toLowerCase());
            });
        }

        this.displaySearchResults(filteredCoaches);
    }

    isNearMyAddress(coach) {
        if (this.userLocation) {
            const coachDistance = this.calculateDistance(
                this.userLocation.latitude,
                this.userLocation.longitude,
                coach.Latitude,
                coach.Longitude
            );
            return coachDistance <= 15;
        } else {
            return false;
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    displaySearchResults(coachesToShow) {
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
    }

    addToFavorites(coach) {
        const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches')) || [];
        const isDuplicate = storedFavoriteCoaches.some(favoriteCoach => favoriteCoach.name === coach.name);

        if (!isDuplicate) {
            storedFavoriteCoaches.push(coach);
            localStorage.setItem('favoriteCoaches', JSON.stringify(storedFavoriteCoaches));
            console.log("Coach added to favorites:", coach);
        } else {
            alert("Coach is already in favorites!");
        }
    }

    displayCoachDetails(coach) {
        const modal = document.getElementById("details-modal");
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

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => modal.style.display = "none";

        const closeLearnMoreButton = document.querySelector('#learnMore-button');
        closeLearnMoreButton.addEventListener('click', () => modal.style.display = 'none');


        const rateButton = document.querySelector(".rate-button");
        rateButton.addEventListener('click', () => this.displayRatingModal());

        modal.style.display = "block";

        // this.displayMap(coach);
    }

    //--------------------------------we don't have an api key, so the map is not changing dynamically--------------------
    // displayStaticMap(coach) {
    //     const mapImg = document.getElementById("map");
    //     // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coach.Latitude},${coach.Longitude}&zoom=12&size=600x300&key=OUR_API_KEY`;
    //     mapImg.src = mapUrl;
    // }

    generateStars(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? "★" : "☆";
        }
        return stars;
    }

    displayRatingModal() {
        const ratingModal = document.getElementById("ratingModal");
        ratingModal.style.display = "block";

        const closeButton = ratingModal.querySelector(".close");
        closeButton.onclick = () => ratingModal.style.display = "none";

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
    }

    displayConfirmationMessage() {
        const confirmationModal = document.getElementById('confirmation-message');
        confirmationModal.style.display = 'block';

        const closeButton = confirmationModal.querySelector(".close");
        closeButton.onclick = () => confirmationModal.style.display = "none";

        const closeMessageButton = document.querySelector('.close-button');
        closeMessageButton.addEventListener('click', () => confirmationModal.style.display = 'none');
    }

    onContactMeButtonClick() {
        const selectedCoaches = document.querySelectorAll('.coach input[type="checkbox"]:checked');
        if (selectedCoaches.length === 0) {
            alert("Please select one or more coaches before contacting.");
        } else {
            this.displayConfirmationMessage();
        }
    }
}

window.onload = () => new CoachesSearch();
