// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// --- 1. Interactive Glow Follower (Mouse Trail) ---
const glow = document.getElementById('interactive-glow');
window.addEventListener('mousemove', (e) => {
    glow.style.setProperty('--x', e.clientX + 'px');
    glow.style.setProperty('--y', e.clientY + 'px');
});

// --- 2. Loader and Hero Entry Sequence ---
// script.js - inside the window 'load' listener
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
        duration: 1.2, // Slightly faster for better feel
        ease: "expo.inOut"
    }, "-=0.4")
    .to("#loader-text", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
    })
    /* --- THE FIX: We use autoAlpha to force visibility --- */
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
    }, "-=1.2") // Overlap the blur removal with the nav reveal
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
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { borderColor: "#01DE82", duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { borderColor: "rgba(1, 222, 130, 0.1)", duration: 0.3 });
    });
});

// --- 5. Image Glow Interaction ---
const glowImages = document.querySelectorAll('.glow-image');
glowImages.forEach(img => {
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
});


