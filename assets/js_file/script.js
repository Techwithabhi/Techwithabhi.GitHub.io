// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 0. Theme Toggle Logic (Immediate Execution) ---
const toggleBtn = document.getElementById('theme-toggle');

document.addEventListener("click", (e) => {
  const sparkCount = 25;

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("div");
    spark.className = "click-spark";

    const angle = Math.random() * Math.PI * 5;
    const distance = Math.random() * 20 + 15;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.left = e.pageX + "px";
    spark.style.top = e.pageY + "px";
    spark.style.setProperty("--dx", `${dx}px`);
    spark.style.setProperty("--dy", `${dy}px`);
    spark.style.transform = `rotate(${angle}rad)`;

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
  }
});

// Helper to set theme
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

// Check Local Storage or System Preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // Optional: Auto-detect system preference
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    //     setTheme('light');
    // }
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
}

// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// --- 1. Interactive Glow Follower ---
const glow = document.getElementById('interactive-glow');
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--x', e.clientX + 'px');
        glow.style.setProperty('--y', e.clientY + 'px');
    });
} else {
    if (glow) glow.style.display = 'none';
}

// --- 2. Loader and Hero Entry Sequence ---
window.addEventListener('load', () => {
    const mainContent = document.getElementById('main-content');
    const mainNav = document.getElementById('main-nav');
    
    const tl = gsap.timeline({
        onComplete: () => {
            document.body.classList.remove('loading');
            document.getElementById('loader').classList.add('hide');
        }
    });

    tl.to("#loader-text", {
        opacity: 1,
        y: -10,
        duration: 1,
        ease: "power4.out"
    })
    .to("#loader-bar", {
        width: "100%",
        duration: 0.6,
        ease: "expo.inOut"
    }, "-=0.3")
    .to("#loader-text", {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in"
    })
    .to(mainNav, {
        autoAlpha: 1, 
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2") 
    .to(mainContent, {
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
            mainContent.classList.add('blur-clear');
        }
    }, "-=1.2")
    .from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.8");
});

// --- 3. Scroll Reveal for Sections ---
gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// --- 4. JavaScript Fallback Enhancements for Cards ---
const cards = document.querySelectorAll('.neo-border');
const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

cards.forEach(card => {
    if (isTouch) {
        card.addEventListener('touchstart', () => {
            gsap.to(card, { borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent'), duration: 0.2 });
        });
        card.addEventListener('touchend', () => {
            gsap.to(card, { borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color'), duration: 0.3 });
        });
    } else {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent'), duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { borderColor: getComputedStyle(document.documentElement).getPropertyValue('--border-color'), duration: 0.3 });
        });
    }
});

// --- 5. Image Glow Interaction ---
const glowImages = document.querySelectorAll('.glow-image');

glowImages.forEach(img => {
    if (isTouch) {
        img.addEventListener('touchstart', () => {
            gsap.to(img, {
                filter: "drop-shadow(0 0 20px " + getComputedStyle(document.documentElement).getPropertyValue('--accent') + ")",
                duration: 0.3
            });
        });
        img.addEventListener('touchend', () => {
            const isHero = img.classList.contains('hero-glow-pulse');
            gsap.to(img, {
                filter: isHero ? "" : "drop-shadow(0 0 0px rgba(0,0,0,0))",
                duration: 0.3,
                clearProps: isHero ? "filter" : "" 
            });
        });
    } else {
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: "drop-shadow(0 0 30px " + getComputedStyle(document.documentElement).getPropertyValue('--accent') + ")",
                duration: 0.4
            });
        });
        img.addEventListener('mouseleave', () => {
            const isHero = img.classList.contains('hero-glow-pulse');
            gsap.to(img, {
                filter: isHero ? "" : "drop-shadow(0 0 0px rgba(0,0,0,0))",
                duration: 0.4,
                clearProps: isHero ? "filter" : "" 
            });
        });
    }
});

// --- 6. Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- 7. Viewport & Resize ---
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVH();
window.addEventListener('resize', setVH);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
}, { passive: true });