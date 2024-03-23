document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const geolocationRadio = document.getElementById('geolocation');
    const cityLocationRadio = document.getElementById('cityLocation');
    const latitudeInput = document.getElementById('latitudeInput');
    const longitudeInput = document.getElementById('longitudeInput');

    searchForm.addEventListener('submit', (e) => {
        if (geolocationRadio.checked) {
            e.preventDefault(); // Stop the form from submitting immediately

            navigator.geolocation.getCurrentPosition((position) => {
                latitudeInput.value = position.coords.latitude;
                longitudeInput.value = position.coords.longitude;
                searchForm.submit(); // Submit the form with coordinates
            }, (error) => {
                alert('Geolocation is not enabled. Please select "In My City" or enable geolocation.');
                cityLocationRadio.checked = true; // Fallback to city search
                searchForm.submit();
            });
        }
        // If "In My City" is checked, the form submits normally without intercepting.
    });
});


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
});

