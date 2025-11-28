document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle (assuming this is already in your script)
    const menuToggle = document.getElementById('menu-toggle');
    const smallScreenMenu = document.getElementById('small-screen-menu');

    if (menuToggle && smallScreenMenu) {
        menuToggle.addEventListener('click', () => {
            smallScreenMenu.classList.toggle('active');
            // Toggle between fa-bars and fa-xmark for the icon
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Pet Care Tips Accordion
    const careTipItems = document.querySelectorAll('.care-tip-item');

    careTipItems.forEach(item => {
        const header = item.querySelector('.care-tip-header');
        header.addEventListener('click', () => {
            // Close other open accordions (optional, but good for UX)
            careTipItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle the 'active' class on the clicked item
            item.classList.toggle('active');
        });
    });
});