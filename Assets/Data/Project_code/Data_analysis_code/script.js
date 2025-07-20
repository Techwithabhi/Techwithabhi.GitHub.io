// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // =================== SMOOTH ENTRANCE ANIMATIONS ===================
    function animateOnLoad() {
        // Fade in container with scale effect
        const container = document.querySelector('.container');
        container.style.opacity = '0';
        container.style.transform = 'scale(0.95)';
        container.style.transition = 'all 1s ease-out';
        
        setTimeout(() => {
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 100);

        // Animate heading with typewriter effect
        const heading = document.querySelector('.heading');
        const originalText = heading.textContent;
        heading.textContent = '';
        heading.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        setTimeout(typeWriter, 500);

        // Animate text data with slide-in effect
        const textData = document.querySelector('.text-data');
        textData.style.opacity = '0';
        textData.style.transform = 'translateY(30px)';
        textData.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            textData.style.opacity = '1';
            textData.style.transform = 'translateY(0)';
        }, 1000);

        // Animate ending section
        const ending = document.querySelector('.ending');
        ending.style.opacity = '0';
        ending.style.transform = 'translateY(30px)';
        ending.style.transition = 'all 0.8s ease-out';
        
        setTimeout(() => {
            ending.style.opacity = '1';
            ending.style.transform = 'translateY(0)';
        }, 1800);
    }

    // =================== ANIMATED SKILL BARS ===================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.data-box');
        
        skillBars.forEach((bar, index) => {
            // Initial state
            bar.style.opacity = '0';
            bar.style.transform = 'translateX(-50px)';
            bar.style.transition = 'all 0.6s ease-out';
            
            // Animate appearance
            setTimeout(() => {
                bar.style.opacity = '1';
                bar.style.transform = 'translateX(0)';
            }, 1200 + (index * 150));

            // Animate the progress bars
            const leftBar = bar.querySelector('[class^="left"]');
            const rightText = bar.querySelector('[class^="right"]');
            
            if (leftBar && rightText) {
                const originalWidth = leftBar.style.width || getComputedStyle(leftBar).width;
                leftBar.style.width = '0%';
                leftBar.style.transition = 'width 1.5s ease-out';
                
                setTimeout(() => {
                    leftBar.style.width = originalWidth;
                    
                    // Animate percentage text
                    const targetPercentage = parseInt(rightText.textContent);
                    let currentPercentage = 0;
                    const increment = targetPercentage / 60;
                    
                    const countUp = setInterval(() => {
                        currentPercentage += increment;
                        if (currentPercentage >= targetPercentage) {
                            currentPercentage = targetPercentage;
                            clearInterval(countUp);
                        }
                        rightText.textContent = Math.round(currentPercentage) + '%';
                    }, 25);
                    
                }, 1500 + (index * 150));
            }
        });
    }

    // =================== INTERACTIVE EFFECTS ===================
    function addInteractiveEffects() {
        // Heading hover effect with color cycling
        const heading = document.querySelector('.heading');
        const colors = ['cyan', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        let colorIndex = 0;
        
        heading.addEventListener('mouseenter', () => {
            const currentColor = colors[colorIndex % colors.length];
            heading.style.textShadow = `
                0 0 10px ${currentColor},
                0 0 20px ${currentColor},
                0 0 40px ${currentColor},
                0 0 80px ${currentColor}
            `;
            colorIndex++;
        });

        // Skill bar hover effects
        const dataBoxes = document.querySelectorAll('.data-box');
        dataBoxes.forEach(box => {
            const img = box.querySelector('img');
            const percentage = box.querySelector('.percentage');
            
            box.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.2) rotate(5deg)';
                img.style.transition = 'transform 0.3s ease';
                percentage.style.transform = 'scale(1.05)';
                percentage.style.transition = 'transform 0.3s ease';
                percentage.style.boxShadow = '0 0 15px rgba(0,255,255,0.5)';
            });

            box.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1) rotate(0deg)';
                percentage.style.transform = 'scale(1)';
                percentage.style.boxShadow = 'none';
            });
        });

        // Enhanced button effects
        const buttons = document.querySelectorAll('.custom-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1) translateY(-5px)';
                button.style.boxShadow = `
                    0 0.2rem 0.4rem #00000033,
                    0 0.2rem 1rem #0000004d,
                    0 0.4rem 2rem #0000004d,
                    0 0 20px rgba(59, 180, 73, 0.5)
                `;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1) translateY(0)';
            });
        });
    }

    // // =================== PARTICLE BACKGROUND EFFECT ===================
    // function createParticleEffect() {
    //     const container = document.querySelector('.container');
    //     const particlesContainer = document.createElement('div');
    //     particlesContainer.style.position = 'absolute';
    //     particlesContainer.style.top = '0';
    //     particlesContainer.style.left = '0';
    //     particlesContainer.style.width = '100%';
    //     particlesContainer.style.height = '100%';
    //     particlesContainer.style.pointerEvents = 'none';
    //     particlesContainer.style.overflow = 'hidden';
        
    //     container.style.position = 'relative';
    //     container.appendChild(particlesContainer);

    //     function createParticle() {
    //         const particle = document.createElement('div');
    //         particle.style.position = 'absolute';
    //         particle.style.width = '4px';
    //         particle.style.height = '4px';
    //         particle.style.backgroundColor = 'rgba(255,255,255,0.7)';
    //         particle.style.borderRadius = '50%';
    //         particle.style.boxShadow = '0 0 6px rgba(255,255,255,0.8)';
            
    //         const startX = Math.random() * container.offsetWidth;
    //         const startY = container.offsetHeight + 10;
    //         const endY = -10;
    //         const duration = 3000 + Math.random() * 2000;
            
    //         particle.style.left = startX + 'px';
    //         particle.style.top = startY + 'px';
            
    //         particlesContainer.appendChild(particle);
            
    //         particle.animate([
    //             { transform: 'translateY(0px)', opacity: 0 },
    //             { transform: 'translateY(-20px)', opacity: 1 },
    //             { transform: `translateY(${endY - startY}px)`, opacity: 0 }
    //         ], {
    //             duration: duration,
    //             easing: 'linear'
    //         }).addEventListener('finish', () => {
    //             particle.remove();
    //         });
    //     }

    //     // Create particles periodically
    //     setInterval(createParticle, 300);
    // }

    // =================== SCROLL REVEAL ANIMATION ===================
    function setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll reveal
        document.querySelectorAll('.text-data, .data-icon, .ending').forEach(el => {
            observer.observe(el);
        });
    }

    // =================== DYNAMIC GRADIENT ANIMATION ===================
    function animateGradient() {
        const container = document.querySelector('.container');
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            const gradient = `linear-gradient(
                ${45 + Math.sin(hue * 0.01) * 15}deg,
                hsl(${hue}, 50%, 40%),
                hsl(${hue + 30}, 60%, 35%),
                hsl(${hue + 60}, 70%, 45%),
                hsl(${hue + 30}, 60%, 35%),
                hsl(${hue}, 50%, 40%)
            )`;
            container.style.background = gradient;
        }, 50);
    }

    // =================== PULSE EFFECT FOR ICONS ===================
    function addPulseEffect() {
        const icons = document.querySelectorAll('.data-icon img');
        
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'pulse 2s infinite';
                
                // Add CSS animation if not already present
                if (!document.getElementById('pulse-animation')) {
                    const style = document.createElement('style');
                    style.id = 'pulse-animation';
                    style.textContent = `
                        @keyframes pulse {
                            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
                            70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
                            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }, index * 200);
        });
    }

    // =================== INITIALIZE ALL EFFECTS ===================
    function init() {
        animateOnLoad();
        setTimeout(animateSkillBars, 800);
        setTimeout(addInteractiveEffects, 1000);
        setTimeout(createParticleEffect, 1500);
        setTimeout(animateGradient, 2000);
        setTimeout(addPulseEffect, 2500);
        setupScrollReveal();
    }

    // Start the magic!
    init();

    // =================== PERFORMANCE OPTIMIZATION ===================
    // Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize certain effects on resize if needed
            setupScrollReveal();
        }, 250);
    });

    // =================== EASTER EGG: KONAMI CODE ===================
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Easter egg activated!
            const heading = document.querySelector('.heading');
            heading.style.animation = 'rainbow 0.5s infinite';
            
            // Add rainbow animation
            if (!document.getElementById('rainbow-animation')) {
                const style = document.createElement('style');
                style.id = 'rainbow-animation';
                style.textContent = `
                    @keyframes rainbow {
                        0% { color: #ff0000; }
                        16.66% { color: #ff8000; }
                        33.33% { color: #ffff00; }
                        50% { color: #00ff00; }
                        66.66% { color: #0080ff; }
                        83.33% { color: #8000ff; }
                        100% { color: #ff0000; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            setTimeout(() => {
                heading.style.animation = '';
            }, 3000);
        }
    });
});