document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling initially
    document.body.classList.add('loading');

    // Stats Cards Animation
    gsap.from(".neo-border", {
        scrollTrigger: {
            trigger: ".neo-border",
            start: "top 95%"
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
    });

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
    // Updated to target the "reveal" class used in HTML
    .from(".reveal", {
        y: 30,
        opacity: 0,
        duration: 0.001,
        stagger: 0.2,
        ease: "power3.out"
    }, "+=0.1");
});