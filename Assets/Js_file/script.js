document.addEventListener("DOMContentLoaded", () => {
  // 1. Typing animation for <h1>
  const typedText = document.querySelector(".base h1 span");
  const words = [
    "Aspiring Data Analyst",
    "Junior Web Developer",
    "AI Explorer",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let typing = true;

  function typeEffect() {
    if (!typedText) return;
    if (typing) {
      if (charIndex < words[wordIndex].length) {
        typedText.textContent += words[wordIndex][charIndex++];
        setTimeout(typeEffect, 100);
      } else {
        typing = false;
        setTimeout(typeEffect, 1000);
      }
    } else {
      if (charIndex > 0) {
        typedText.textContent = words[wordIndex].slice(0, --charIndex);
        setTimeout(typeEffect, 50);
      } else {
        typing = true;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
      }
    }
  }
  typeEffect();

  // 2. Navbar hide/reveal on scroll
  let lastScrollTop = 0;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.style.top = "-60px"; // hide
    } else {
      navbar.style.top = "0"; // show
    }
    lastScrollTop = scrollTop;
  });

  // 3. Fade and scale in sections on scroll
  const revealElements = document.querySelectorAll("section");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "scale(1)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "scale(0.95)";
    el.style.transition = "all 0.6s ease-out";
    revealObserver.observe(el);
  });

  // 4. Ripple effect on CTA click
  const workBtn = document.querySelector(".work-btn");
  if (workBtn) {
    workBtn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${e.offsetX}px`;
      ripple.style.top = `${e.offsetY}px`;
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
        const href = this.getAttribute("href");
        if (href) window.location.href = href;
      }, 800);
    });
  }

  // 5. Scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.height = "3px";
  progressBar.style.background = "#09ff00ff";
  progressBar.style.zIndex = "1000";
  progressBar.style.width = "0%";
  progressBar.style.transition = "width 0.25s ease-out";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const percent = (scrolled / docHeight) * 100;
    progressBar.style.width = `${percent}%`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Select all icons in the tools, AI tools, and language sections
  const icons = document.querySelectorAll(
    ".tools img, .ai img, .language img, .main-scl img"
  );

  icons.forEach((icon) => {
    const tooltipText = icon.alt || "Technology";
    const tooltip = document.createElement("span");
    tooltip.className = "custom-tooltip";
    tooltip.innerText = tooltipText;

    const parent = icon.closest("div");
    parent.style.position = "relative";
    parent.appendChild(tooltip);

    icon.addEventListener("mouseenter", () => {
      tooltip.style.opacity = 1;
      tooltip.style.transform = "translateY(-10px)";
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.style.opacity = 0;
      tooltip.style.transform = "translateY(0)";
    });

    icon.addEventListener("click", () => {
      alert(`You clicked on ${tooltipText}`);
      // Replace alert with modal or info box logic if needed
    });
  });

  // Scroll fade-in animation using IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  icons.forEach((icon) => {
    icon.classList.add("fade-ready");
    observer.observe(icon);
  });
});



// Add required CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes wave {
            to { transform: scale(3); opacity: 0; }
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
        
        .animate-in {
            animation: slideUp 1s ease forwards !important;
        }
        
        .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: cyan;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            animation: particle-float 4s linear infinite;
        }
        
        @keyframes particle-float {
            0% {
                opacity: 1;
                transform: translateY(100px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0.5);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Mouse trail effect
document.addEventListener('mousemove', throttle(function(e) {
    const socialSection = document.getElementById('social');
    if (!socialSection) return;
    
    const rect = socialSection.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            background: rgba(0, 255, 247, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
    }
}, 50));

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
    }
`;
document.head.appendChild(trailStyle);