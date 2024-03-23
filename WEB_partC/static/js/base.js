window.addEventListener('load', () => {
    setTimeout(() => {
        const flashMessagesContainer = document.getElementById('flash-messages');
        if (flashMessagesContainer) {
            flashMessagesContainer.style.opacity = '0';
            setTimeout(() => {
                flashMessagesContainer.style.display = 'none';
            }, 500); // Match the transition duration
        }
    }, 1500);
});
