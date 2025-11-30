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
    { "image" : "images/adoptImages/name1.jpg" },
    { "image" : "images/adoptImages/name3.jpg" },
    { "image" : "images/adoptImages/name2.jpg" },
    { "image" : "images/adoptImages/name1.jpg" },
    { "image" : "images/adoptImages/name4.jpg" },
    { "image" : "images/adoptImages/name2.jpg" },
    { "image" : "images/adoptImages/name4.jpg" },
    { "image" : "images/adoptImages/name3.jpg" },
];

async function makeGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    if (!galleryContainer) return; // Exit if element doesn't exist

    // ensure a track exists inside the container so we can translate it
    let track = galleryContainer.querySelector('.gallery-track');
    if (!track) {
        track = document.createElement('div');
        track.classList.add('gallery-track');
        // move existing children (if any) into the track
        while (galleryContainer.firstChild) {
            track.appendChild(galleryContainer.firstChild);
        }
        galleryContainer.appendChild(track);
    } else {
        // clear previous items
        track.innerHTML = '';
    }

    galleryList.forEach(img => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('gallery-card');

        imgContainer.innerHTML = `
            <i class="fa-solid fa-paw"></i>
            <img src="${img.image}">
        `;

        track.appendChild(imgContainer);
    });

    // create arrows if not present
    const createArrow = (dir) => {
        const cls = `gallery-arrow gallery-arrow-${dir}`;
        let btn = galleryContainer.querySelector(`.gallery-arrow-${dir}`);
        if (!btn) {
            btn = document.createElement('button');
            btn.type = 'button';
            btn.className = cls;
            btn.setAttribute('aria-label', dir === 'right' ? 'Next images' : 'Previous images');
            btn.innerHTML = dir === 'right' ? '<i class="fa-solid fa-chevron-right"></i>' : '<i class="fa-solid fa-chevron-left"></i>';
            galleryContainer.appendChild(btn);
        }
        return btn;
    };

    const btnLeft = createArrow('left');
    const btnRight = createArrow('right');

    // sliding logic: translate the track by viewport-sized steps
    let offset = 0;

    function updateLimits() {
        const containerWidth = galleryContainer.clientWidth;
        const maxOffset = Math.max(0, track.scrollWidth - containerWidth);
        // clamp offset
        offset = Math.max(0, Math.min(offset, maxOffset));
        track.style.transform = `translateX(${-offset}px)`;
        // toggle disabled state
        btnLeft.disabled = offset <= 0;
        btnRight.disabled = offset >= maxOffset - 1; // small fudge
    }

    // move by container width (one 'page')
    function moveRight() {
        const step = galleryContainer.clientWidth;
        const maxOffset = Math.max(0, track.scrollWidth - galleryContainer.clientWidth);
        offset = Math.min(maxOffset, offset + step);
        updateLimits();
    }

    function moveLeft() {
        const step = galleryContainer.clientWidth;
        offset = Math.max(0, offset - step);
        updateLimits();
    }

    btnRight.addEventListener('click', moveRight);
    btnLeft.addEventListener('click', moveLeft);

    // support resize to recalc sizes
    window.addEventListener('resize', () => {
        // keep current 'page' by recalculating offset bounds
        updateLimits();
    });

    // initialize transform and button states
    // give a small timeout to allow images to load and sizes to settle
    setTimeout(updateLimits, 100);
}

// Populate News & Blog

// In paw-patrol.js (Replace the current incomplete newsList array)

const newsList = [
    {
        "headline": "Meet Our Newly Rescued Pets",
        "story": "Discover the latest animals who have joined our care—each with a unique story and ready for a fresh start",
        "image": "" // 👈 Add your image path
    },
    {
        "headline": "Tips for First-Time Pet Adopters",
        "story": "Thinking about adopting your first pet? Here are simple, essential tips to help you prepare",
        "image": "images/news-tips.jpg" // 👈 Add your image path
    },
    {
        "headline": "Community Adoption Drive Success",
        "story": "Our recent adoption event brought together families, volunteers, and pets in need",
        "image": "images/news-drive-success.jpg" // 👈 Add your image path
    },
    {
        "headline": "How We Rehabilitate Rescued Animals",
        "story": "Go behind the scenes and see how our team provides medical care and emotional support",
        "image": "images/news-rehab-process.jpg" // 👈 Add your image path
    }
];

// In paw-patrol.js (Replace the existing function)

function makeNewsHomepage() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    newsContainer.innerHTML = ""; // Clear first if reloading

    newsList.forEach((news, index) => {
        const newsCard = document.createElement('article');
        newsCard.classList.add('news-card');

        const detailUrl = `news.html?id=${index}`; 

        // 🚨 CRITICAL FIX: Removed the <div class="news-img-container">...</div>
        // The remaining text-content div now holds the entire card's content.
        newsCard.innerHTML = `
            <div class="news-text-content">
                <h4>${news.headline}</h4>
                <p>${news.story}</p>
                <a href="${detailUrl}" class="read-more-link">Read More</a> 
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}
document.addEventListener('DOMContentLoaded', makeNewsHomepage);


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

async function donateForm() {
    const amounts = document.querySelectorAll('.amount');
    const customInput = document.getElementById('customAmount');
    let selectedAmount = null;

    amounts.forEach(opt => {
        opt.addEventListener('click', () => {
            // Clear previous selection
            amounts.forEach(a => a.classList.remove('selected'));

            opt.classList.add('selected');

            // If custom
            if (opt.classList.contains('custom')) {
                customInput.disabled = false;
                customInput.focus();
                selectedAmount = null;
            } else {
                customInput.value = "";
                customInput.disabled = true;
                selectedAmount = opt.dataset.value;
            }
        });
    });
}

// Switch between Main Sections 
// (di na ako nag create ng separate html file, hide nalang yung Main)
document.addEventListener('DOMContentLoaded', () => {
    const switchBtns = document.querySelectorAll(".switch-btn");
    const pages = document.querySelectorAll(".page");

    switchBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetID = btn.dataset.show;
            const targetPage = document.getElementById(targetID);

            // Hide all pages
            pages.forEach(page => page.classList.remove("active"));

            // Show target page
            targetPage.classList.add("active");

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});


// Populate Wishlist Cards
function wishlistCards(items) {
    const container = document.querySelector('.wish-container');
    container.innerHTML = ''; // Clear previous cards

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <span class="price">₱${item.amount_value}</span>
            <div class="card-content">
                <h3>${item.name}</h3>
                <p class="desc">${item.description}</p>
                <p class="amount">Amount Needed: ${item.amount_needed}</p>
                <p class="priority">Priority: ${item.priority}</p>
                <button onclick="donateItem(${item.id})">Donate Now</button>
            </div>
        `;

        container.appendChild(card);
    });
}
// initiliaze wishlist
async function initWishlist() {
    const wishlist = await loadJSON('pets-wishlist.json'); // Path to your JSON file

    // Initial render (all items)
    wishlistCards(wishlist);

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            document.querySelectorAll('.filter-btn').forEach(b => 
                b.classList.remove('active')
            );

            btn.classList.add('active');

            if (category === 'all') {
                wishlistCards(wishlist);
            } else {
                const filtered = wishlist.filter(item => item.category === category);
                wishlistCards(filtered);
            }
        });
    });
}

// Populate Event Cards 
function eventCards(events) {
    const container = document.querySelector('.event-container');
    container.innerHTML = '';

    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <div class="event-img-container">
                <img src="${event.img}" alt="${event.title}">
            </div>
            <div class="card-content">
                <h3>${event.title}</h3>
                <p class="desc">${event.brief}</p>
                <p class="date">${event.calDay}, ${event.calMonth}, ${event.time}</p>
                <p class="place">${event.place}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
async function initEvent() {
    const event = await loadJSON('pets-event.json');

    // COUNT EVENTS
    const upcomingCount = event.filter(e => e.category === "upcoming").length;
    const pastCount = event.filter(e => e.category === "past").length;

    // INSERT COUNTS INTO NAV BUTTONS
    document.querySelector('.upcoming-count').textContent = `(${upcomingCount})`;
    document.querySelector('.past-count').textContent = `(${pastCount})`;

    // Load all
    eventCards(event);

    document.querySelectorAll('.event-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;

            document.querySelectorAll('.event-filter-btn').forEach(b => 
                b.classList.remove('active')
            );

            btn.classList.add('active');

            if(category === 'all') {
                eventCards(event);
            } else {
                const filtered = event.filter(e => e.category === category);
                eventCards(filtered);
            }
        });
    });
}


// Populate adopt cards when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    makeAdoptHomepage();
    makeGallery();
    makeNewsHomepage();
    donateForm();
    initWishlist();
    initEvent();
});

//petcare TIPS
