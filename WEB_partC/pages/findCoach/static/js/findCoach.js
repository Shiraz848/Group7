document.addEventListener('DOMContentLoaded', () => {
    const locationRadioButtons = document.querySelectorAll('input[name="location"]');
    const searchButton = document.querySelector('.search-button');

    // Function to get the user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                // Set the value of the hidden fields
                const latitudeField = document.querySelector('input[name="latitude"]');
                const longitudeField = document.querySelector('input[name="longitude"]');
                latitudeField.value = position.coords.latitude;
                longitudeField.value = position.coords.longitude;
            }, error => {
                console.error("Error getting user's location:", error);
                alert("Error getting your location. Please allow location access or enter your location manually.");
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            alert("Geolocation is not supported by your browser.");
        }
    }

    // Attach event listeners to location radio buttons
    locationRadioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'current' && radio.checked) {
                getUserLocation();
            }
        });
    });


    // Event handler for the contact me button
    const contactMeButton = document.getElementById("contact-me-button");
    contactMeButton.addEventListener('click', (event) => {
        const selectedCoaches = document.querySelectorAll('.coach input[type="checkbox"]:checked');

        if (selectedCoaches.length === 0) {
            event.preventDefault(); // Prevent form submission if no coaches are selected
            alert("Please select one or more coaches before contacting.");
        } else {
            const form = document.getElementById('contact-form');
            const selectedCoachesField = document.getElementById('selected-coaches');

            // Create a list of selected coach IDs
            const selectedCoachIds = Array.from(selectedCoaches).map(checkbox => checkbox.value);
            selectedCoachesField.value = JSON.stringify(selectedCoachIds);

            form.submit(); // Submit the form with the selected coach IDs
        }
    });

});