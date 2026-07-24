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
// REELS CONTROL SYSTEM
// ==========================


const reelCards = document.querySelectorAll(
    ".reel-card, .mobile-reel"
);



reelCards.forEach(card=>{


const video = card.querySelector("video");


if(!video) return;





// CREATE CONTROLS


const controls=document.createElement("div");

controls.className="reel-controls";



const playBtn=document.createElement("button");

playBtn.className="control-btn play-btn";

playBtn.innerHTML="▶";



const muteBtn=document.createElement("button");

muteBtn.className="control-btn mute-control";

muteBtn.innerHTML=`

<svg class="sound-icon" viewBox="0 0 24 24">

<path class="speaker"
d="M11 5L6 9H2V15H6L11 19V5Z"/>

<path class="wave"
d="M15 9C16.5 10.5 16.5 13.5 15 15"/>

</svg>

`;



controls.appendChild(playBtn);

controls.appendChild(muteBtn);



card.appendChild(controls);







// PROGRESS BAR


const progressBar=document.createElement("div");

progressBar.className="progress-bar";



const progress=document.createElement("div");

progress.className="progress";



progressBar.appendChild(progress);


card.appendChild(progressBar);








// DEFAULT


video.muted=true;






// PLAY / PAUSE


playBtn.addEventListener("click",()=>{


if(video.paused){


video.play();

playBtn.innerHTML="❚❚";



}else{


video.pause();

playBtn.innerHTML="▶";


}



});








// MUTE


muteBtn.addEventListener("click",()=>{


video.muted=!video.muted;



if(video.muted){


muteBtn.classList.add("muted");


}else{


muteBtn.classList.remove("muted");


}



});









// PROGRESS UPDATE


video.addEventListener("timeupdate",()=>{


if(video.duration){


let percent =
(video.currentTime / video.duration) * 100;



progress.style.width = percent + "%";


}



});








// RESET


video.addEventListener("ended",()=>{


playBtn.innerHTML="▶";

progress.style.width="0%";


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


        const muteBtn = video.parentElement.querySelector(".mute-control");


        if(entry.isIntersecting){


            video.play();


        }

        else{


            video.muted = true;


            if(muteBtn){

                muteBtn.classList.add("muted");

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
// MOBILE REEL FOCUS EFFECT
// ==========================


if(window.innerWidth <= 900){



const mobileReels = document.querySelectorAll(".mobile-reel");



const mobileObserver = new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.style.transform="scale(1.08)";


entry.target.style.transition=".4s ease";



const video = entry.target.querySelector("video");

if(video){

video.play();

}



}


else{


entry.target.style.transform="scale(1)";


}



});


},{

threshold:.7

});



mobileReels.forEach(reel=>{


mobileObserver.observe(reel);


});



}









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
// SIDEBAR TOGGLE
// ==========================


const sidebarToggle =
document.getElementById("sidebarToggle");


const sidebar =
document.querySelector(".sidebar");


const content =
document.querySelector(".content");


const overlay =
document.getElementById("sidebarOverlay");





sidebarToggle.addEventListener("click",()=>{


sidebar.classList.toggle("closed");


content.classList.toggle("open");



if(overlay){


overlay.classList.toggle("active");


}



});







if(overlay){


overlay.addEventListener("click",()=>{


sidebar.classList.add("closed");


content.classList.remove("open");


overlay.classList.remove("active");


});


}
