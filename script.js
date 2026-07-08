const galleries = {

    porsche:[

        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a"

    ],

    bmw:[

        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"

    ],

    track:[

        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"

    ]

};



function openGallery(name){

    let gallery = document.getElementById("gallery-images");

    gallery.innerHTML = "";

    galleries[name].forEach(image => {

        gallery.innerHTML += `
            <img src="${image}">
        `;

    });

    document.getElementById("lightbox").style.display = "block";

}



function closeGallery(){

    document.getElementById("lightbox").style.display = "none";

}



/* close when clicking outside */

document.getElementById("lightbox").addEventListener("click", function(e){

    if(e.target.id === "lightbox"){

        closeGallery();

    }

});
