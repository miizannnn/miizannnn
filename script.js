// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    links.forEach(link => {

        link.style.opacity = "0.6";

        if (link.getAttribute("href") === "#" + current) {
            link.style.opacity = "1";
        }

    });

});


// ==========================
// IMAGE FADE IN
// ==========================

const items = document.querySelectorAll(".item");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, { threshold: 0.2 });

items.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "0.8s ease";

    observer.observe(item);

});


// ==========================
// HERO ANIMATION
// ==========================

window.addEventListener("load", () => {

    const hero = document.querySelector(".hero-text");

    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px)";

    setTimeout(() => {

        hero.style.transition = "1s ease";
        hero.style.opacity = "1";
        hero.style.transform = "translateY(0)";

    }, 300);

});


// ==========================
// POPUP GALLERY
// ==========================

const galleries = {

    laferrari: [
        "images/cars/la-ferrari/01.jpg",
        "images/cars/la-ferrari/02.jpg",
        "images/cars/la-ferrari/03.jpg",
        "images/cars/la-ferrari/04.jpg"
    ],

    stoevo2: [
        "images/cars/lamborghini-sto-evo2/01.jpg",
        "images/cars/lamborghini-sto-evo2/02.jpg",
        "images/cars/lamborghini-sto-evo2/03.jpg"
    ],

    carrerasc: [
        "images/cars/porsche-carrera-sc-hwa/01.jpg",
        "images/cars/porsche-carrera-sc-hwa/02.jpg"
    ],

    r34: [
        "images/cars/nissan-gtr-r34/01.jpg",
        "images/cars/nissan-gtr-r34/02.jpg"
    ],

    rirana: [
        "images/cars/rirana/01.jpg",
        "images/cars/rirana/02.jpg"
    ],

    ferrari296: [
        "images/cars/ferrari-296-gtb/01.jpg",
        "images/cars/ferrari-296-gtb/02.jpg"
    ],

    gt3: [
        "images/cars/porsche-gt3/01.jpg",
        "images/cars/porsche-gt3/02.jpg"
    ],

    purosangue: [
        "images/cars/ferrari-purosangue/01.jpg",
        "images/cars/ferrari-purosangue/02.jpg"
    ],

    gt3rs: [
        "images/cars/porsche-gt3-rs/01.jpg",
        "images/cars/porsche-gt3-rs/02.jpg"
    ]

};

function openGallery(car) {

    const popup = document.getElementById("popup");
    const container = document.getElementById("popup-images");

    container.innerHTML = "";

    galleries[car].forEach(image => {

        const img = document.createElement("img");

        img.src = image;

        container.appendChild(img);

    });

    popup.style.display = "block";

    document.body.style.overflow = "hidden";

}

function closeGallery() {

    document.getElementById("popup").style.display = "none";

    document.body.style.overflow = "auto";

}
