window.showOverlay = function(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = 'flex';
    document.body.classList.add('overlay-active'); // Add class when showing overlay
};

window.hideOverlay = function(overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = 'none';
    document.body.classList.remove('overlay-active'); // Remove class when hiding overlay
};

// Add click event listener to all overlay containers
document.querySelectorAll('.project-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(event) {
        // If the click is directly on the overlay (not its children)
        if (event.target === overlay) {
            window.hideOverlay(overlay.id);
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Find all visible overlays and hide them
        document.querySelectorAll('.project-overlay').forEach(overlay => {
            if (overlay.style.display !== 'none') {
                window.hideOverlay(overlay.id);
            }
        });
    }
});
