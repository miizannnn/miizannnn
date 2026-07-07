// Smooth scrolling
document.querySelectorAll('a').forEach(link=>{

link.addEventListener('click',function(e){

e.preventDefault();

document.querySelector(this.getAttribute('href'))
.scrollIntoView({
behavior:"smooth"
});

});

});
.project{

    position:relative;
    cursor:pointer;
    overflow:hidden;

}


.project img{

    width:100%;
    height:500px;
    object-fit:cover;

    filter:grayscale(100%);
    transition:0.6s;

}


.project:hover img{

    filter:grayscale(0%);
    transform:scale(1.05);

}


.project-title{

    position:absolute;
    bottom:20px;
    left:20px;

    font-size:18px;
    letter-spacing:3px;

}



/* Gallery */

#lightbox{

    display:none;

    position:fixed;
    inset:0;

    background:black;

    z-index:100;

    padding:50px;

    overflow:auto;

}


#lightbox span{

    position:absolute;
    top:20px;
    right:40px;

    font-size:50px;

    cursor:pointer;

}


#gallery-images img{

    width:100%;
    max-width:900px;

    display:block;

    margin:30px auto;

}
