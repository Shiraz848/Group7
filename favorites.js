class FavoriteCoaches {
    displayFavoriteCoaches = () => {
        const favoritesList = document.getElementById("favorites-list");
        favoritesList.innerHTML = "";

        const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches'));

        if (storedFavoriteCoaches) {
            storedFavoriteCoaches.forEach(coach => {
                const coachRow = document.createElement("div");
                coachRow.classList.add("favorite-coach");

                const bullet = document.createElement("span");
                bullet.textContent = "• ";
                coachRow.appendChild(bullet);

                const coachName = document.createElement("span");
                coachName.classList.add("coach-name");
                coachName.textContent = coach.name;
                coachRow.appendChild(coachName);

                const stars = document.createElement("span");
                stars.classList.add("stars");
                stars.textContent = this.generateStars(coach.rating);
                coachRow.appendChild(stars);

                const classType = document.createElement("span");
                classType.classList.add("class-type");
                classType.textContent = "Type: " + coach.classType;
                coachRow.appendChild(classType);

                const learnMoreButton = document.createElement("button");
                learnMoreButton.classList.add("learn-more-button");
                learnMoreButton.textContent = "Learn More";
                coachRow.appendChild(learnMoreButton);

                const deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");
                deleteButton.textContent = "Delete";
                coachRow.appendChild(deleteButton);

                favoritesList.appendChild(coachRow);

                learnMoreButton.addEventListener('click', () => this.displayCoachDetails(coach));
                deleteButton.addEventListener('click', () => this.deleteCoach(coach));
            });
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

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        const closeButton = document.querySelector(".close");
        closeButton.onclick = () => modal.style.display = "none";

        const rateButton = document.querySelector(".rate-button");
        rateButton.addEventListener('click', () => this.displayRatingModal());

        const closeLearnMoreButton = document.querySelector('.close-button');
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

        window.onclick = (event) => {
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

    deleteCoach = (coach) => {
        const storedFavoriteCoaches = JSON.parse(localStorage.getItem('favoriteCoaches'));
        const updatedFavoriteCoaches = storedFavoriteCoaches.filter(favCoach => favCoach.name !== coach.name);
        localStorage.setItem('favoriteCoaches', JSON.stringify(updatedFavoriteCoaches));
        this.displayFavoriteCoaches();
    };
}

const favoriteCoaches = new FavoriteCoaches();
favoriteCoaches.displayFavoriteCoaches();
