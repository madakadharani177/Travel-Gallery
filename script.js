
const images = [
    {
        title: "Mountain Adventure",
        location: "Himalayas",
        src: "images/mountain_landscape.avif"
    },
    {
        title: "Beautiful Beach",
        location: "Maldives",
        src: "images/beach_image.avif"
    },
    {
        title: "Green Forest",
        location: "Amazon",
        src: "images/forest_image.avif"
    },
    {
        title: "City Lights",
        location: "New York",
        src: "images/city_sunset.jpg"
    },
    {
        title: "Desert Beauty",
        location: "Sahara",
        src: "images/desert_photo.jpg"
    },
    {
        title: "Green Valley",
        location: "Switzerland",
        src: "images/peaceful_lakes.jpg"
    },
    {
        title: "Snow Mountains",
        location: "Canada",
        src: "images/snowmountain.jpg"
    },
    {
        title: "Peaceful Lake",
        location: "Bali",
        src: "images/peaceful_lakes.jpg"
    }
];

const galleryGrid = document.getElementById("galleryGrid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxLocation = document.getElementById("lightboxLocation");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Create gallery cards
images.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";

    card.innerHTML = `
        <div class="card-image-wrap">
            <img
                class="card-image"
                src="${item.src}"
                alt="${item.title}"
                loading="lazy"
            >
            <span class="card-number">
                ${String(index + 1).padStart(2, "0")}
            </span>
        </div>

        <div class="card-info">
            <h3>${item.title}</h3>
            <p>
                <span class="location-icon">📍</span>
                ${item.location}
            </p>
        </div>
    `;

    const cardImg = card.querySelector("img");

    cardImg.addEventListener("error", () => {
        cardImg.alt = "Image not found: " + item.src;
        cardImg.style.objectFit = "contain";
        cardImg.style.padding = "15px";
    });

    card.addEventListener("click", () => {
        openLightbox(index);
    });

    galleryGrid.appendChild(card);
});

// Open selected image
function openLightbox(index) {
    currentIndex = index;
    showImage();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
}

// Display image details
function showImage() {
    const item = images[currentIndex];

    lightboxImage.src = item.src;
    lightboxImage.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxLocation.textContent = "📍 " + item.location;
}

// Close image
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

// Previous image
function showPrevious() {
    currentIndex =
        (currentIndex - 1 + images.length) % images.length;
    showImage();
}

// Next image
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
}

closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrevious);
nextBtn.addEventListener("click", showNext);

// Close when clicking the dark background
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowLeft") {
        showPrevious();
    } else if (event.key === "ArrowRight") {
        showNext();
    }
});
