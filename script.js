// ==========================
// PREVENT AUTO SCROLL / HASH JUMP
// ==========================

if (history.scrollRestoration) {

    history.scrollRestoration = "manual";

}


window.addEventListener("load", () => {

    if (window.location.hash) {

        history.replaceState(null, null, " ");

    }

    window.scrollTo(0,0);

});





// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");


window.addEventListener("scroll",()=>{


    let current="";


    sections.forEach(section=>{


        const sectionTop = section.offsetTop - 200;


        if(window.scrollY >= sectionTop){

            current = section.id;

        }


    });



    links.forEach(link=>{


        link.style.opacity=".6";


        if(link.getAttribute("href")==="#"+current){

            link.style.opacity="1";

        }


    });


});







// ==========================
// IMAGE FADE
// ==========================


const items=document.querySelectorAll(".item");


const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}


});


},{threshold:.2});



items.forEach(item=>{


item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".8s ease";


observer.observe(item);


});







// ==========================
// HERO ANIMATION
// ==========================


window.addEventListener("load",()=>{


const hero=document.querySelector(".hero-text");


if(hero){


hero.style.opacity="0";

hero.style.transform="translateY(30px)";


setTimeout(()=>{


hero.style.transition="1s ease";

hero.style.opacity="1";

hero.style.transform="translateY(0)";


},300);


}


});







// ==========================
// VIDEO SOUND SYSTEM
// ==========================


const videos=document.querySelectorAll("video");

const buttons=document.querySelectorAll(".sound-btn");



function updateButton(button, muted){


if(muted){

button.classList.add("muted");

}

else{

button.classList.remove("muted");

}


}



buttons.forEach(button=>{


const video=button.parentElement.querySelector("video");


// start muted

video.muted=true;

updateButton(button,true);



button.addEventListener("click",()=>{


// mute all other videos

videos.forEach(v=>{


if(v!==video){

v.muted=true;


const otherButton=
v.parentElement.querySelector(".sound-btn");


if(otherButton){

updateButton(otherButton,true);

}


}


});



// toggle current


video.muted=!video.muted;


updateButton(button,video.muted);



});


});


// ==========================
// AUTO MUTE REELS WHEN OUT OF VIEW
// ==========================

const reelVideos = document.querySelectorAll(
    ".reel-card video, .mobile-reel video"
);


const reelObserver = new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        const video = entry.target;

        const button = video.parentElement.querySelector(".sound-btn");


        if(entry.isIntersecting){

            // keep playing but muted
            video.play();

        } 
        else {


            // mute when leaving screen
            video.muted = true;


            if(button){

                button.classList.add("muted");

            }


        }


    });


},{

    threshold:0.5

});



reelVideos.forEach(video=>{

    reelObserver.observe(video);

});




// ==========================
// POPUP GALLERY
// ==========================


const galleries={


laferrari:[
"images/cars/la-ferrari/project.webp"
],


stoevo2:[
"images/cars/lamborghini-sto-evo2/project.webp"
],


carrerasc:[
"images/cars/porsche-carrera-sc-hwa/project.webp"
],


r34:[
"images/cars/nissan-gtr-r34/project.webp"
],


rirana:[
"images/cars/rirana/project.webp"
],


ferrari296:[
"images/cars/ferrari-296-gtb/project.webp"
],


gt3:[
"images/cars/porsche-gt3/project.webp"
],


purosangue:[
"images/cars/ferrari-purosangue/project.webp"
],


turbos:[
"images/cars/porsche-turbo-s/project.webp"
]


};







function openGallery(car){


const popup=document.getElementById("popup");

const container=document.getElementById("popup-images");


container.innerHTML="";


galleries[car].forEach(image=>{


const img=document.createElement("img");


img.src=image;


container.appendChild(img);


});



popup.style.display="block";


document.body.style.overflow="hidden";


}







function closeGallery(){


document.getElementById("popup").style.display="none";


document.body.style.overflow="auto";


}


// ==========================
// DESKTOP SIDEBAR TOGGLE
// ==========================


const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");


if(sidebarToggle){


    sidebarToggle.addEventListener("click",()=>{


        sidebar.classList.toggle("closed");

        content.classList.toggle("expand");


    });


}
