// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- Mobile Menu Toggle (NEW) ---
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

    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// --- 1. Interactive Glow Follower (Mouse Trail) ---
const glow = document.getElementById('interactive-glow');

// Only enable on non-touch devices for performance
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        glow.style.setProperty('--x', e.clientX + 'px');
        glow.style.setProperty('--y', e.clientY + 'px');
    });
} else {
    // Disable glow on touch devices
    if (glow) {
        glow.style.display = 'none';
    }
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
        duration: 0.7,
        ease: "power4.out"
    })
    .to("#loader-bar", {
        width: "100%",
        duration: 1.2,
        ease: "expo.inOut"
    }, "-=0.4")
    .to("#loader-text", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
    })
    .to(mainNav, {
        autoAlpha: 1, 
        duration: 1.2,
        ease: "power2.out"
    }, "-=0.2") 
    .to(mainContent, {
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
            mainContent.classList.add('blur-clear');
        }
    }, "-=1.2")
    .from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
        // Touch-optimized interactions
        card.addEventListener('touchstart', () => {
            gsap.to(card, { borderColor: "#01DE82", duration: 0.2 });
        });
        card.addEventListener('touchend', () => {
            gsap.to(card, { borderColor: "rgba(1, 222, 130, 0.1)", duration: 0.3 });
        });
    } else {
        // Desktop hover
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { borderColor: "#01DE82", duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { borderColor: "rgba(1, 222, 130, 0.1)", duration: 0.3 });
        });
    }
});

// --- 5. Image Glow Interaction ---
const glowImages = document.querySelectorAll('.glow-image');

glowImages.forEach(img => {
    if (isTouch) {
        // Reduced glow for mobile
        img.addEventListener('touchstart', () => {
            gsap.to(img, {
                filter: "drop-shadow(0 0 20px rgba(1, 222, 130, 0.6))",
                duration: 0.3
            });
        });
        img.addEventListener('touchend', () => {
            const isHero = img.classList.contains('hero-glow-pulse');
            gsap.to(img, {
                filter: isHero ? "" : "drop-shadow(0 0 0px rgba(1, 222, 130, 0))",
                duration: 0.3,
                clearProps: isHero ? "filter" : "" 
            });
        });
    } else {
        // Full glow for desktop
        img.addEventListener('mouseenter', () => {
            gsap.to(img, {
                filter: "drop-shadow(0 0 30px rgba(1, 222, 130, 0.9))",
                duration: 0.4
            });
        });
        img.addEventListener('mouseleave', () => {
            const isHero = img.classList.contains('hero-glow-pulse');
            gsap.to(img, {
                filter: isHero ? "" : "drop-shadow(0 0 0px rgba(1, 222, 130, 0))",
                duration: 0.4,
                clearProps: isHero ? "filter" : "" 
            });
        });
    }
});

// --- 6. Smooth Scroll for Anchor Links (NEW) ---
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

// --- 7. Viewport Height Fix for Mobile (NEW) ---
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// --- 8. Resize Handler with ScrollTrigger Refresh (NEW) ---
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
}, { passive: true });

// --- 9. Orientation Change Handler (NEW) ---
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 300);
});
