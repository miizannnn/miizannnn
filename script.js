```javascript
// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });


    links.forEach(link => {

        link.style.opacity = "0.6";


        if(link.getAttribute("href") === "#" + current){

            link.style.opacity = "1";

        }

    });


});





// ==========================
// IMAGE FADE IN
// ==========================


const images = document.querySelectorAll(".item");


const observer = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){


            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";


        }


    });


},{


    threshold:0.2


});



images.forEach(image=>{


    image.style.opacity="0";

    image.style.transform="translateY(40px)";

    image.style.transition="0.8s ease";


    observer.observe(image);


});





// ==========================
// VIDEO HERO LOAD EFFECT
// ==========================


window.addEventListener("load",()=>{


    const hero = document.querySelector(".hero-text");


    hero.style.opacity="0";

    hero.style.transform="translateY(30px)";


    setTimeout(()=>{


        hero.style.transition="1s ease";


        hero.style.opacity="1";

        hero.style.transform="translateY(0)";


    },300);


});
```
