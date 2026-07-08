```javascript id="xq4m8n"
// =========================
// SMOOTH ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

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

});


// =========================
// FADE-IN ANIMATION
// =========================

const items = document.querySelectorAll(".item");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

items.forEach(item => observer.observe(item));


// =========================
// OPTIONAL IMAGE PARALLAX
// =========================

window.addEventListener("mousemove", (e) => {

    const images = document.querySelectorAll(".item img");

    images.forEach(img => {

        const speed = 0.01;

        const x = (window.innerWidth / 2 - e.pageX) * speed;
        const y = (window.innerHeight / 2 - e.pageY) * speed;

        img.style.transform = `translate(${x}px, ${y}px)`;

    });

});
```
