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
