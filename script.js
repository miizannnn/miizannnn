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
// SAFE PLAY HELPER & UNLOCKER
// ==========================
const playVideoSafely = (video) => {
  if (!video) return;
  // Mobile browsers strictly require muted properties AND attributes
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      // Handled silently if mobile OS blocks before first touch
    });
  }
};

// Global User Interaction Unlocker for Mobile Safari & Android
const unlockAutoplay = () => {
  document.querySelectorAll("video").forEach((v) => {
    // Play hero video, active background video, or visible reels
    if (v.closest(".hero") || v.classList.contains("active") || v.dataset.visible === "true") {
      playVideoSafely(v);
    }
  });
};

// Listen for any subtle touch or scroll gesture to immediately wake up autoplay
window.addEventListener("touchstart", unlockAutoplay, { passive: true, once: true });
window.addEventListener("scroll", unlockAutoplay, { passive: true, once: true });
window.addEventListener("click", unlockAutoplay, { passive: true, once: true });

// Attempt initial load play
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("video").forEach((v) => {
    v.muted = true;
    v.setAttribute("muted", "");
  });
  
  const heroVideo = document.querySelector(".hero video");
  if (heroVideo) {
    playVideoSafely(heroVideo);
  }
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

const itemObserver = new IntersectionObserver((entries) => {
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
  itemObserver.observe(item);
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
// VIDEO SHOWCASE SLIDER
// ==========================
const slider = document.getElementById('videoDragSlider');
if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

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
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      isDragging = true;
    }
    slider.scrollLeft = scrollLeft - walk;
  });

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
          playVideoSafely(bg);
        } else {
          bg.classList.remove('active');
          bg.pause();
        }
      });
    }
  };

  slider.addEventListener('scroll', updateBackgroundVideo);

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const getScrollStep = () => {
    if (videoCards.length > 0) {
      return videoCards[0].clientWidth + 20;
    }
    return 350;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }

  videoCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (isDragging) return;

      videoCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('playing')) {
          otherCard.classList.remove('playing');
          const embed = otherCard.querySelector('.yt-embed-container');
          if (embed) embed.innerHTML = '';
        }
      });

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
// REELS CONTROLS & LAZY OBSERVER
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
  video.setAttribute("muted", "");
  if (soundBtn) soundBtn.classList.add("muted");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        playVideoSafely(video);
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
          other.setAttribute("muted", "");
          const otherCard = other.closest(".reel-card, .mobile-reel");
          if (otherCard) {
            const otherBtn = otherCard.querySelector(".sound-btn");
            if (otherBtn) otherBtn.classList.add("muted");
          }
        });

        video.muted = false;
        video.removeAttribute("muted");
        soundBtn.classList.remove("muted");
      } else {
        video.muted = true;
        video.setAttribute("muted", "");
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

// IntersectionObserver to auto-play ONLY visible videos
const reelObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const video = entry.target;
    const card = video.closest(".reel-card, .mobile-reel");
    const soundBtn = card ? card.querySelector(".sound-btn") : null;

    if (entry.isIntersecting) {
      video.dataset.visible = "true";
      playVideoSafely(video);
    } else {
      video.dataset.visible = "false";
      video.pause();
      video.muted = true;
      video.setAttribute("muted", "");
      if (soundBtn) soundBtn.classList.add("muted");
    }
  });
}, { threshold: 0.3 });

allVideos.forEach((video) => {
  reelObserver.observe(video);
});

// Mobile reels center positioning
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

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.add("closed");
      content.classList.remove("open");
    }
  });
});
