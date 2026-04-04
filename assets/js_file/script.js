// =============================================================================
// MAIN.JS — Portfolio Site Scripts
// =============================================================================

// --- Plugin Registration ---
gsap.registerPlugin(ScrollTrigger);


// =============================================================================
// 1. THEME
// =============================================================================

const toggleBtn = document.getElementById('theme-toggle');

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
}

function initThemeToggle() {
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'light' ? 'dark' : 'light');

        // ── ADD ONLY THESE 3 LINES ──────────────────────
        toggleBtn.classList.remove('ripple');
        void toggleBtn.offsetWidth; // restart animation
        toggleBtn.classList.add('ripple');
        setTimeout(() => toggleBtn.classList.remove('ripple'), 450);
        // ────────────────────────────────────────────────
    });
}


// =============================================================================
// 2. CLICK SPARKS
// =============================================================================

function initClickSparks() {
    document.addEventListener('click', (e) => {
        const SPARK_COUNT = 25;

        for (let i = 0; i < SPARK_COUNT; i++) {
            const spark = document.createElement('div');
            spark.className = 'click-spark';

            const angle    = Math.random() * Math.PI * 5;
            const distance = Math.random() * 20 + 15;

            spark.style.left = `${e.pageX}px`;
            spark.style.top  = `${e.pageY}px`;
            spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
            spark.style.transform = `rotate(${angle}rad)`;

            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    });
}


// =============================================================================
// 3. MOBILE MENU
// =============================================================================

function initMobileMenu() {
    const menuBtn   = document.getElementById('mobile-menu-btn');
    const menu      = document.getElementById('mobile-menu');
    const links     = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !menu) return;

    function setIcon(isOpen) {
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars',  !isOpen);
        icon.classList.toggle('fa-times',  isOpen);
    }

    function closeMenu() {
        menu.classList.add('hidden');
        setIcon(false);
    }

    menuBtn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        setIcon(!isHidden);
    });

    links.forEach(link => link.addEventListener('click', closeMenu));
}


// =============================================================================
// 4. INTERACTIVE GLOW FOLLOWER
// =============================================================================

function initGlowFollower() {
    const glow = document.getElementById('interactive-glow');
    if (!glow) return;

    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hasHover) {
        window.addEventListener('mousemove', (e) => {
            glow.style.setProperty('--x', `${e.clientX}px`);
            glow.style.setProperty('--y', `${e.clientY}px`);
        });
    } else {
        glow.style.display = 'none';
    }
}


// =============================================================================
// 5. PAGE LOADER & HERO ENTRY ANIMATION
// =============================================================================

function initLoader() {
    window.addEventListener('load', () => {
        const mainContent = document.getElementById('main-content');
        const mainNav     = document.getElementById('main-nav');

        gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('loading');
                document.getElementById('loader').classList.add('hide');
            }
        })
        .to('#loader-text', { opacity: 1, y: -10,   duration: 0.6, ease: 'power4.out' })
        .to('#loader-bar',  { width: '100%',         duration: 0.6, ease: 'expo.inOut'  }, '-=0.3')
        .to('#loader-text', { opacity: 0, y: -20,   duration: 0.2, ease: 'power2.in'   })
        .to(mainNav,        { autoAlpha: 1,          duration: 0.5, ease: 'power2.out'  }, '-=0.2')
        .to(mainContent,    {
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => mainContent.classList.add('blur-clear')
        }, '-=1.2')
        .from('.hero-anim', { y: 30, opacity: 0,    duration: 0.5, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    });
}


// =============================================================================
// 6. SCROLL REVEAL
// =============================================================================

function initScrollReveal() {
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, { // 1. Change gsap.from to gsap.to
            scrollTrigger: { trigger: el, start: 'top 80%' },
            y: 0,         // 2. Animate TO y: 0 (its natural position)
            opacity: 1,   // 3. Animate TO opacity: 1 (fully visible)
            duration: 1,
            ease: 'power3.out'
        });
    });
}


// =============================================================================
// 7. CARD BORDER HOVER (NEO-BORDER)
// =============================================================================

function initCardHover() {
    const cards   = document.querySelectorAll('.neo-border');
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const accentColor      = () => getComputedStyle(document.documentElement).getPropertyValue('--accent');
    const borderColor      = () => getComputedStyle(document.documentElement).getPropertyValue('--border-color');

    cards.forEach(card => {
        if (isTouch) {
            card.addEventListener('touchstart', () => gsap.to(card, { borderColor: accentColor(), duration: 0.2 }));
            card.addEventListener('touchend',   () => gsap.to(card, { borderColor: borderColor(), duration: 0.3 }));
        } else {
            card.addEventListener('mouseenter', () => gsap.to(card, { borderColor: accentColor(), duration: 0.3 }));
            card.addEventListener('mouseleave', () => gsap.to(card, { borderColor: borderColor(), duration: 0.3 }));
        }
    });
}


// =============================================================================
// 8. IMAGE GLOW INTERACTION
// =============================================================================

function initImageGlow() {
    const images  = document.querySelectorAll('.glow-image');
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const accentColor = () => getComputedStyle(document.documentElement).getPropertyValue('--accent');

    images.forEach(img => {
        const isHero = img.classList.contains('hero-glow-pulse');

        function onEnter() {
            gsap.to(img, {
                filter: `drop-shadow(0 0 ${isTouch ? 20 : 30}px ${accentColor()})`,
                duration: isTouch ? 0.3 : 0.4
            });
        }

        function onLeave() {
            gsap.to(img, {
                filter:     isHero ? '' : 'drop-shadow(0 0 0px rgba(0,0,0,0))',
                duration:   isTouch ? 0.3 : 0.4,
                clearProps: isHero ? 'filter' : ''
            });
        }

        if (isTouch) {
            img.addEventListener('touchstart', onEnter);
            img.addEventListener('touchend',   onLeave);
        } else {
            img.addEventListener('mouseenter', onEnter);
            img.addEventListener('mouseleave', onLeave);
        }
    });
}


// =============================================================================
// 9. SMOOTH SCROLL
// =============================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length <= 1) return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// =============================================================================
// 10. VIEWPORT HEIGHT (--vh) & SCROLL-TRIGGER RESIZE
// =============================================================================

function initViewport() {
    const setVH = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 250);
    }, { passive: true });
}


// =============================================================================
// 11. PROJECT CARD 3D TILT
// =============================================================================

function initProjectCardTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x    = e.clientX - rect.left;
            const y    = e.clientY - rect.top;
            const cx   = rect.width  / 2;
            const cy   = rect.height / 2;

            const rotY =  ((x - cx) / cx) * 10;
            const rotX = -((y - cy) / cy) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            card.style.setProperty('--mx', `${(x / rect.width)  * 100}%`);
            card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}


// =============================================================================
// 12. CERTIFICATE PAGE
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ── Only run on pages that have the gallery cards ── */
    const pills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.img-card');
    if (!pills.length && !cards.length) return;

    /* ── Inject fadeInUp keyframe once ── */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    /* ── Filter pills ── */
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.dataset.filter;

            cards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                if (match) {
                    card.removeAttribute('data-hidden');
                    card.style.animation = 'none';
                    requestAnimationFrame(() => {
                        card.style.animation = 'fadeInUp .4s ease forwards';
                    });
                } else {
                    card.setAttribute('data-hidden', '');
                }
            });
        });
    });

    /* ── Click ripple ── */
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            const link = this.dataset.link;
            if (link && link !== '#') window.location.href = link;

            const ripple = document.createElement('div');
            ripple.classList.add('img-card__ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size / 2}px;
                top:${e.clientY - rect.top  - size / 2}px;
            `;
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    /* ── GSAP scroll reveal for gallery cards ── */
    if (typeof gsap !== 'undefined') {
        gsap.utils.toArray('.img-card.reveal').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: .7,
                    ease: 'power3.out',
                    delay: (i % 4) * 0.08,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }

});

// =============================================================================
// INIT — Run Everything
// =============================================================================

initTheme();
initThemeToggle();
initClickSparks();
initMobileMenu();
initGlowFollower();
initLoader();
initScrollReveal();
initCardHover();
initImageGlow();
initSmoothScroll();
initViewport();
initProjectCardTilt();