// Pet Details Page Script
let petsData = [];


// Load pets data from JSON with fallback
async function loadPetsData() {
    try {
        const response = await fetch('./pets-data.json');
        if (!response.ok) {
            throw new Error(`Failed to load pets data: ${response.status}`);
        }
        const data = await response.json();
        petsData = data.pets;
        console.log('Pets data loaded from JSON:', petsData);
    } catch (error) {
        console.warn('Could not load JSON, using embedded data:', error);
        petsData = EMBEDDED_PETS_DATA;
        console.log('Using embedded pet data:', petsData);
    }
}

// Get pet ID from URL
function getPetIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    console.log('Pet ID from URL:', id);
    return id;
}

// Populate pet details on page load
async function populatePetDetails() {
    await loadPetsData();
    
    const petId = getPetIdFromURL();
    console.log('Available pets:', petsData);
    console.log('Looking for pet ID:', petId);
    
    const pet = petsData.find(p => p.id === petId);
    console.log('Found pet:', pet);
    
    if (!pet) {
        document.querySelector('.pet-details-container').innerHTML = '<p style="color: red; text-align: center; padding: 50px;">Pet not found! Please go back and select a valid pet.</p>';
        return;
    }

    try {
            // Set main image to first pet image
        const mainImage = document.getElementById('main-pet-image');
        mainImage.src = pet.images[0];
        mainImage.alt = pet.name;

        // Populate thumbnails
        const thumbnailsContainer = document.getElementById('thumbnails-container');
        thumbnailsContainer.innerHTML = ''; // clear any old thumbnails

        pet.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${pet.name} photo ${index + 1}`;
            thumbnail.className = index === 0 ? 'active' : '';
            thumbnail.addEventListener('click', () => {
                document.querySelectorAll('.pet-gallery-thumbnails img').forEach(img => {
                    img.classList.remove('active');
                });
                thumbnail.classList.add('active');
                mainImage.src = image;
            });
            thumbnailsContainer.appendChild(thumbnail);
        });

        const adoptBtn = document.getElementById('adoptBtn');
        adoptBtn.addEventListener('click', () => {
            window.location.href = `adoptForm.html?id=${pet.id}`;
        });

        // Set pet header
        document.getElementById('pet-name').textContent = pet.name;
        document.getElementById('pet-type-location').textContent = `${pet.type} • ${pet.location}`;

        // Set about section
        document.getElementById('pet-about').textContent = pet.about;

        // Set pet specs
        const specsList = document.getElementById('pet-specs');
        specsList.innerHTML = `
            <li><strong>Breed:</strong> ${pet.breed}</li>
            <li><strong>Age:</strong> ${pet.age}</li>
            <li><strong>Gender:</strong> ${pet.gender}</li>
            <li><strong>Size:</strong> ${pet.size}</li>
        `;

        // Set health info
        const healthList = document.getElementById('pet-health');
        healthList.innerHTML = pet.health.map(item => `<li>${item}</li>`).join('');

        // Set location
        document.getElementById('pet-location').textContent = pet.location;

        
        console.log('Pet details populated successfully');
    } catch (error) {
        console.error('Error populating pet details:', error);
        document.querySelector('.pet-details-container').innerHTML = '<p style="color: red; text-align: center; padding: 50px;">Error displaying pet details. Please refresh the page.</p>';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', populatePetDetails);

// Menu toggle functionality (from homepage)
const toggleMenu = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('small-screen-menu');
const iconChange = toggleMenu ? toggleMenu.querySelector('i') : null;

if (toggleMenu) {
    toggleMenu.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        if (iconChange) {
            if (sideMenu.classList.contains('active')) {
                iconChange.classList.replace('fa-bars', 'fa-xmark');
            } else {
                iconChange.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    });
}

// Footer collapse functionality
document.querySelectorAll('.footer-info-container article aside h4').forEach(infoHeader => {
    infoHeader.addEventListener('click', () => {
        const parentAside = infoHeader.parentElement;
        parentAside.classList.toggle('active');
    });
});
