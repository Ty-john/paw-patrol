// Fetch JSON Files
async function loadJSON(path) {
    const response = await fetch(path);
    if(!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }
    return await response.json();
}

const toggleMenu = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('small-screen-menu');
const iconChange = toggleMenu.querySelector('i');

toggleMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');

    // change icon bet. bars and x in small screen view
    if (sideMenu.classList.contains('active')) {
        iconChange.classList.replace('fa-bars', 'fa-xmark');
    }
    else {
        iconChange.classList.replace('fa-xmark', 'fa-bars');
    }
});

document.querySelectorAll('.footer-info-container article aside h4').forEach(infoHeader => {
    infoHeader.addEventListener('click', () => {
        const parentAside = infoHeader.parentElement;
        parentAside.classList.toggle('active');
    });
});

// --- existing menu/footer code stays above this ---

// Parallax scroll (hero-relative)
(function() {
  const hero = document.querySelector('.hero');
  const sky   = document.querySelector('.hero .sky');
  const tower   = document.querySelector('.hero .tower');
  const back  = document.querySelector('.hero .back');
  const mid   = document.querySelector('.hero .mid');
  const front = document.querySelector('.hero .front');

  // safe-guard if layers missing
  if (!hero) return;

  function updateParallax() {
    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // how far the hero has scrolled into view (0..1)
    // when rect.top == viewportHeight => factor = 0 (hero below fold)
    // when rect.bottom == 0 => factor = 1 (hero scrolled past)
    const total = rect.height + viewportHeight;
    const progress = 1 - Math.max(0, Math.min(1, (rect.top + rect.height) / total));

    // convert progress to a pixel offset based on hero height:
    const maxOffset = rect.height; // max px layers can move
    const base = progress * maxOffset;

    // different multipliers give depth (adjust to taste)
    if (back)  back.style.transform  = `translateY(${base * 0.2}px)`;

    if (mid)   mid.style.transform   = `translateY(${base * 0.3}px)`;
    if (tower) tower.style.transform = `translateY(${base * 0.25}px)`;

    if (front) front.style.transform = `translateY(${base * 0.3}px)`;
    // sky usually very subtle
    if (sky)   sky.style.transform   = `translateY(${base * 0.06}px)`;
  }

  // run on load and scroll and resize
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax);
  document.addEventListener('DOMContentLoaded', updateParallax);
  updateParallax();
})();

// Populate Gallery 
const galleryList = [
    { "image" : "images/adoptImages/name2.jpg" },
    { "image" : "images/adoptImages/name3.jpg" },
    { "image" : "images/adoptImages/name4.jpg" },
    { "image" : "images/adoptImages/name2.jpg" },
    { "image" : "images/adoptImages/name4.jpg" },
    { "image" : "images/adoptImages/name2.jpg" },
    { "image" : "images/adoptImages/name4.jpg" },
    { "image" : "images/adoptImages/name3.jpg" },
];

async function makeGallery() {
    const galleryContainer = document.getElementById('series-gallery');
    if (!galleryContainer) return; // Exit if element doesn't exist

    galleryList.forEach(img => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('gallery-card');

        imgContainer.innerHTML = `
            <i class="fa-solid fa-paw"></i>
            <img src="${img.image}">
        `;

        galleryContainer.appendChild(imgContainer);
    });
}

// Populate News & Blog

const newsList = [
    {
        "headline": "Meet Our Newly Rescued Pets",
        "story": "Discover the latest animals who have joined our care—each with a unique story and ready for a fresh start"
    },
    {
        "headline": "Tips for First-Time Pet Adopters",
        "story": "Thinking about adopting your first pet? Here are simple, essential tips to help you prepare"
    },
    {
        "headline": "Community Adoption Drive Success",
        "story": "Our recent adoption event brought together families, volunteers, and pets in need"
    },
    {
        "headline": "How We Rehabilitate Rescued Animals",
        "story": "Go behind the scenes and see how our team provides medical care and emotional support"
    }
];

async function makeNewsHomepage() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return; // Exit if element doesn't exist

    newsList.forEach(news => {
        const newsCard = document.createElement('article');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <h4>${news.headline}</h4>
            <p>${news.story}</p>
            <a href="">Read More</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}


// Populate Adopt Cards for Homepage
const adoptList = [
    {
        "id": 1,
        "image": "images/adoptImages/name1.jpg",
        "name": "Leonard"
    },
    {
        "id": 2,
        "image": "images/adoptImages/name2.jpg",
        "name": "Ian"
    },
    {
        "id": 3,
        "image": "images/adoptImages/name3.jpg",
        "name": "Tyrone"
    },
    {
        "id": 4,
        "image": "images/adoptImages/name4.jpg",
        "name": "Zweily"
    },
    {
        "id": null,
        "image": "images/logo1.png",
        "name": "Meet More"
    }
];

async function makeAdoptHomepage() {
    const adoptContainer = document.getElementById('container-adopt-card');
    if (!adoptContainer) return; // Exit if element doesn't exist

    adoptList.forEach(card => {
        const adoptCard = document.createElement('aside');
        adoptCard.classList.add('adopt-card');

        adoptCard.innerHTML = `
            <div class="adopt-img-container">
                <img src="${card.image}">
            </div>
            <h3>${card.name}</h3>
        `;
        
        // Add click event if pet has an ID
        if (card.id) {
            adoptCard.style.cursor = 'pointer';
            adoptCard.addEventListener('click', () => {
                window.location.href = `pet-details.html?id=${card.id}`;
            });
        }
        
        adoptContainer.appendChild(adoptCard);
    });
}

// Populate adopt cards when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    makeAdoptHomepage();
    makeGallery();
    makeNewsHomepage();
});
