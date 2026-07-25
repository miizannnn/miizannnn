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
  window.scrollTo(0, 0);
});

// ==========================
// ACTIVE NAVIGATION
// ==========================
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.style.opacity = ".6";
    if (link.getAttribute("href") === "#" + current) {
      link.style.opacity = "1";
    }
  });
});

// ==========================
// IMAGE FADE
// ==========================
const items = document.querySelectorAll(".item");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: .2 });

items.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(40px)";
  item.style.transition = ".8s ease";
  observer.observe(item);
});

// ==========================
// HERO ANIMATION
// ==========================
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-text");
  if (hero) {
    hero.style.opacity = "0";
    hero.style.transform = "translateY(30px)";

    setTimeout(() => {
      hero.style.transition = "1s ease";
      hero.style.opacity = "1";
      hero.style.transform = "translateY(0)";
    }, 300);
  }
});

// ==========================
// VIDEO SHOWCASE SLIDER & BACKGROUND SWITCHER
// ==========================
const slider = document.getElementById('videoDragSlider');
if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  // Dragging Functionality
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.8;
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
    slider.scrollLeft = scrollLeft - walk;
  });

  // Dynamic Background Switcher Based on Centered Card
  const videoCards = slider.querySelectorAll('.video-card');
  const bgVideos = document.querySelectorAll('.video-bg');

  const updateBackgroundVideo = () => {
    const sliderCenter = slider.scrollLeft + (slider.clientWidth / 2);
    let closestCard = null;
    let minDistance = Infinity;

    videoCards.forEach((card) => {
      const cardCenter = card.offsetLeft + (card.clientWidth / 2);
      const distance = Math.abs(sliderCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
      }
    });

    if (closestCard) {
      const vidId = closestCard.getAttribute('data-vid');
      bgVideos.forEach((bg) => {
        if (bg.getAttribute('data-vid') === vidId) {
          bg.classList.add('active');
        } else {
          bg.classList.remove('active');
        }
      });
    }
  };

  slider.addEventListener('scroll', updateBackgroundVideo);

  // Play YouTube Video inside Card on Click
  videoCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (isDragging) return; // Prevent triggering video play on click-drag

      // Reset and stop any active iframe on other cards
      videoCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('playing')) {
          otherCard.classList.remove('playing');
          const embed = otherCard.querySelector('.yt-embed-container');
          if (embed) embed.innerHTML = '';
        }
      });

      // Embed YouTube Player
      if (!card.classList.contains('playing')) {
        const ytId = card.getAttribute('data-yt');
        const embedContainer = card.querySelector('.yt-embed-container');
        if (ytId && embedContainer) {
          embedContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          card.classList.add('playing');
        }
      }
    });
  });
}

// ==========================
// REELS CONTROL SYSTEM
// ==========================
const reelCards = document.querySelectorAll(".reel-card, .mobile-reel");
let allVideos = [];

const playIconSvg = `<svg class="play-icon" viewBox="0 0 24 24"><path d="M8 5V19L19 12L8 5Z"/></svg>`;
const pauseIconSvg = `<svg class="play-icon" viewBox="0 0 24 24"><path d="M6 5H10V19H6V5ZM14 5H18V19H14V5Z"/></svg>`;

reelCards.forEach((card) => {
  const video = card.querySelector("video");
  if (!video) return;

  allVideos.push(video);

  const playBtn = card.querySelector(".play-btn");
  const soundBtn = card.querySelector(".sound-btn");
  const progress = card.querySelector(".progress");

  video.muted = true;
  if (soundBtn) soundBtn.classList.add("muted");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }

  video.addEventListener("play", () => {
    if (playBtn) playBtn.innerHTML = pauseIconSvg;
  });

  video.addEventListener("pause", () => {
    if (playBtn) playBtn.innerHTML = playIconSvg;
  });

  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const isCurrentlyMuted = video.muted;

      if (isCurrentlyMuted) {
        allVideos.forEach((other) => {
          other.muted = true;
          const otherCard = other.closest(".reel-card, .mobile-reel");
          if (otherCard) {
            const otherBtn = otherCard.querySelector(".sound-btn");
            if (otherBtn) otherBtn.classList.add("muted");
          }
        });

        video.muted = false;
        soundBtn.classList.remove("muted");
      } else {
        video.muted = true;
        soundBtn.classList.add("muted");
      }
    });
  }

  video.addEventListener("timeupdate", () => {
    if (video.duration && progress) {
      let percent = (video.currentTime / video.duration) * 100;
      progress.style.width = percent + "%";
    }
  });

  video.addEventListener("ended", () => {
    if (progress) progress.style.width = "0%";
  });
});

// ==========================
// AUTO MUTE REELS WHEN OUT OF VIEW
// ==========================
const reelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    const card = video.closest(".reel-card, .mobile-reel");
    const soundBtn = card ? card.querySelector(".sound-btn") : null;

    if (entry.isIntersecting) {
      video.play().catch(() => {});
    } else {
      video.muted = true;
      if (soundBtn) {
        soundBtn.classList.add("muted");
      }
    }
  });
}, { threshold: 0.5 });

allVideos.forEach((video) => {
  reelObserver.observe(video);
});

// ==========================
// MOBILE REELS FOCUS & DEFAULT CENTER (REEL 3)
// ==========================
if (window.innerWidth <= 900) {
  const mobileReelsContainer = document.querySelector(".mobile-reels");
  const mobileReels = document.querySelectorAll(".mobile-reel");

  const scrollToThirdReel = () => {
    if (mobileReels[2] && mobileReelsContainer) {
      const reelThree = mobileReels[2];
      const scrollPosition = reelThree.offsetLeft - (mobileReelsContainer.clientWidth / 2) + (reelThree.clientWidth / 2);
      mobileReelsContainer.scrollLeft = scrollPosition;
    }
  };

  window.addEventListener("load", scrollToThirdReel);

  let hasAutoScrolledToMiddle = false;

  const mobileObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        if (!hasAutoScrolledToMiddle) {
          hasAutoScrolledToMiddle = true;
          scrollToThirdReel();
        }
      } else {
        entry.target.classList.remove("active");
        const video = entry.target.querySelector("video");
        if (video) video.muted = true;
        const soundBtn = entry.target.querySelector(".sound-btn");
        if (soundBtn) soundBtn.classList.add("muted");
      }
    });
  }, { threshold: 0.6 });

  mobileReels.forEach((reel) => {
    mobileObserver.observe(reel);
  });
}

// ==========================
// POPUP GALLERY
// ==========================
const galleries = {
  laferrari: ["images/cars/la-ferrari/project.webp"],
  stoevo2: ["images/cars/lamborghini-sto-evo2/project.webp"],
  carrerasc: ["images/cars/porsche-carrera-sc-hwa/project.webp"],
  r34: ["images/cars/nissan-gtr-r34/project.webp"],
  rirana: ["images/cars/rirana/project.webp"],
  ferrari296: ["images/cars/ferrari-296-gtb/project.webp"],
  gt3: ["images/cars/porsche-gt3/project.webp"],
  purosangue: ["images/cars/ferrari-purosangue/project.webp"],
  turbos: ["images/cars/porsche-turbo-s/project.webp"]
};

function openGallery(car) {
  const popup = document.getElementById("popup");
  const container = document.getElementById("popup-images");

  container.innerHTML = "";

  if (galleries[car]) {
    galleries[car].forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      container.appendChild(img);
    });
  }

  popup.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  document.getElementById("popup").style.display = "none";
  document.body.style.overflow = "auto";
}

// ==========================
// SIDEBAR TOGGLE
// ==========================
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("closed");
    content.classList.toggle("open");
  });
}

// ==========================
// CLOSE SIDEBAR ON NAV CLICK (MOBILE)
// ==========================
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.add("closed");
      content.classList.remove("open");
    }
  });
});
