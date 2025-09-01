document.addEventListener('DOMContentLoaded', () => {
    
    // --- Starry Background Fade on Scroll ---
    const starsContainer = document.getElementById('stars-container');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - scrollPosition / 500);
        if (starsContainer) {
            starsContainer.style.opacity = opacity;
        }
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        if (anchor.id !== 'projects-nav-link') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    });

    // --- Modal Logic ---
    const projectsNavLink = document.getElementById('projects-nav-link');
    const projectsTitleContainer = document.querySelector('.projects-title-container');
    const modal = document.getElementById('projects-modal');
    const closeButton = document.querySelector('.close-button');
    const modalButtons = document.querySelectorAll('.modal-button');
    
    // Reusable function to show the modal
    function showModal(e) {
        if (e) e.preventDefault();
        modal.style.display = 'flex';
    }

    // Reusable function to hide the modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Attach event listeners to open the modal
    if (projectsNavLink) projectsNavLink.addEventListener('click', showModal);
    if (projectsTitleContainer) projectsTitleContainer.addEventListener('click', showModal);

    // Attach event listeners to close the modal
    if (closeButton) closeButton.addEventListener('click', hideModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // --- Projects Section Sliding Logic ---
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const categories = ['ml-projects', 'software-projects', 'misc-projects'];

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetIndex = categories.indexOf(targetId);

            if (targetIndex !== -1 && projectsWrapper) {
                const translateValue = -targetIndex * (100 / categories.length);
                projectsWrapper.style.transform = `translateX(${translateValue}%)`;
                
                hideModal();

                document.getElementById('projects-container').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});