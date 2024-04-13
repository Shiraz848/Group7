document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('coaches-form');
    form.addEventListener('submit', (e) => {
        // Prevent the default form submission
        e.preventDefault();

        // Find all checked checkboxes within the search-results-list
        const checkedCheckboxes = document.querySelectorAll('#search-results-list input[type="checkbox"]:checked');

        // Remove any previous hidden inputs
        const previousHiddenInputs = form.querySelectorAll('input[type="hidden"][name="selected_coaches"]');
        previousHiddenInputs.forEach(input => input.remove());

        // Create new hidden inputs for checked checkboxes and append them to the form
        checkedCheckboxes.forEach(checkbox => {
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'selected_coaches';
            hiddenInput.value = checkbox.value;
            form.appendChild(hiddenInput);
        });
        // Submit the form after all hidden inputs have been added
        form.submit();
    });

    const locationRadio = document.getElementById('geolocation');
    locationRadio.addEventListener('change', (event) => {
        if(event.target.checked) {
            askForLocationPermission();
        }
    });
});


const askForLocationPermission = () => {
    // Show a custom confirmation dialog before asking for permission
    const userAgreed = confirm("We need to access your location to find coaches near you. Is that okay?");
    if (userAgreed && navigator.geolocation) {
        // Only if the user agrees, call the function to trigger the browser's permission prompt
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("You have declined location access. We will use your city location instead.");
    }
}

function showPosition(position) {
    document.getElementById('latitudeInput').value = position.coords.latitude;
    document.getElementById('longitudeInput').value = position.coords.longitude;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        default:
            alert("An unknown error occurred.");
            break;
    }
}