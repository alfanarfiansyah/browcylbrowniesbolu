/* =====================================================
   MOBILE NAVBAR
===================================================== */

const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.getElementById("navMenu");

if (mobileToggle) {

    mobileToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const icon = mobileToggle.querySelector("i");

        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon = mobileToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   ACTIVE NAVBAR
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let current = "home";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =====================================================
   ORDER PRODUCT TO WHATSAPP
===================================================== */

function orderProduct(product, price) {

    const phone = "6285382920804";

    const message =
`Halo Browcyl Brownies dan Bolu Makassar,

Saya tertarik untuk memesan:

Produk: ${product}
Harga: ${price}

Mohon informasi mengenai ketersediaan produk dan cara pemesanannya.

Terima kasih.`;

    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");

}


/* =====================================================
   GALLERY
===================================================== */

const galleryModal =
    document.getElementById("galleryModal");

const modalImage =
    document.getElementById("modalImage");


function openGallery(element) {

    const image =
        element.querySelector("img");

    if (!image) return;

    modalImage.src = image.src;

    modalImage.alt = image.alt;

    galleryModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeGallery() {

    galleryModal.classList.remove("show");

    document.body.style.overflow = "";

}


galleryModal.addEventListener("click", function(e) {

    if (e.target === galleryModal) {

        closeGallery();

    }

});


document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {

        closeGallery();

    }

});


/* =====================================================
   TESTIMONIAL AUTO SLIDER
===================================================== */

const track =
    document.getElementById("testimonialTrack");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const dotsContainer =
    document.getElementById("sliderDots");

let currentSlide = 0;

let slideInterval;


/* CREATE DOTS */

testimonialCards.forEach((_, index) => {

    const dot =
        document.createElement("button");

    dot.className = "slider-dot";

    if (index === 0) {

        dot.classList.add("active");

    }

    dot.addEventListener("click", () => {

        goToSlide(index);

        restartSlider();

    });

    dotsContainer.appendChild(dot);

});


const dots =
    document.querySelectorAll(".slider-dot");


function goToSlide(index) {

    currentSlide = index;

    track.style.transform =
        `translateX(-${currentSlide * 100}%)`;

    dots.forEach(dot => {

        dot.classList.remove("active");

    });

    dots[currentSlide].classList.add("active");

}


function nextSlide() {

    currentSlide++;

    if (currentSlide >= testimonialCards.length) {

        currentSlide = 0;

    }

    goToSlide(currentSlide);

}


function startSlider() {

    slideInterval =
        setInterval(nextSlide, 4500);

}


function restartSlider() {

    clearInterval(slideInterval);

    startSlider();

}


startSlider();


/* =====================================================
   PAUSE SLIDER WHEN HOVER
===================================================== */

const testimonialSlider =
    document.querySelector(".testimonial-slider");

testimonialSlider.addEventListener("mouseenter", () => {

    clearInterval(slideInterval);

});

testimonialSlider.addEventListener("mouseleave", () => {

    startSlider();

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".product-card, .feature-item, .gallery-item, .testimonial-card"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    revealObserver.observe(element);

});