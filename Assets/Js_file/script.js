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
  progressBar.style.height = "4px";
  progressBar.style.background = "#14b8a6";
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
    ".tools img, .ai img, .language img"
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
