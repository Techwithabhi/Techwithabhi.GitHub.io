// EmailJS Configuration - Updated with your actual values
const EMAILJS_CONFIG = {
  publicKey: "m2wWvRNYYUV2tvLRe",
  serviceId: "Tech_with_abhi",
  templateId: "template_b9wjd9c",
};

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_CONFIG.publicKey);

// 3D Scene Setup
let scene, camera, renderer, particles, particleSystem;

function init3D() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.getElementById("canvas-container").appendChild(renderer.domElement);

  createParticles();
  createFloatingElements();

  camera.position.z = 5;
  animate();
}

function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const particleCount = 1500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;
    positions[i + 1] = (Math.random() - 0.5) * 30;
    positions[i + 2] = (Math.random() - 0.5) * 30;

    colors[i] = 0;
    colors[i + 1] = 1;
    colors[i + 2] = 0.97;

    sizes[i / 3] = Math.random() * 0.02 + 0.005;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function createFloatingElements() {
  // Add some floating geometric shapes
  const shapes = [];
  for (let i = 0; i < 5; i++) {
    const geometry = new THREE.RingGeometry(0.5, 0.7, 8);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00fff7,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10
    );
    ring.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    shapes.push(ring);
    scene.add(ring);
  }

  // Store shapes for animation
  window.floatingShapes = shapes;
}

function animate() {
  requestAnimationFrame(animate);

  if (particles) {
    particles.rotation.x += 0.0008;
    particles.rotation.y += 0.0012;

    // Animate individual particles
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.001;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

  // Animate floating shapes
  if (window.floatingShapes) {
    window.floatingShapes.forEach((shape, index) => {
      shape.rotation.x += 0.005 + index * 0.001;
      shape.rotation.y += 0.003 + index * 0.0005;
      shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
    });
  }

  renderer.render(scene, camera);
}

// Status message functions
function showStatus(message, type = "info") {
  const statusEl = document.getElementById("status-message");
  statusEl.textContent = message;
  statusEl.className = `status-message ${type} show`;

  setTimeout(() => {
    statusEl.classList.remove("show");
  }, 5000);
}

// Simplified login function for demo
function simulateLogin() {
  const email = document.getElementById("email").value.trim();
  const loginBtn = document.querySelector("#login-form .btn");
  const loginText = document.getElementById("login-text");

  if (!email) {
    showStatus("Please enter your Gmail address.", "error");
    return;
  }

  if (!email.includes("@gmail.com")) {
    showStatus("Please enter a valid Gmail address.", "error");
    return;
  }

  loginBtn.disabled = true;
  loginText.innerHTML = '<span class="loading"></span>Verifying...';

  // Simulate verification process
  setTimeout(() => {
    const user = {
      email: email,
      displayName: email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    };

    // Use in-memory storage instead of sessionStorage
    window.currentUser = user;

    showContactForm(user);
    showStatus("Login successful! Welcome to the contact portal.", "success");

    loginBtn.disabled = false;
    loginText.textContent = "Verify & Login";
  }, 2000);
}

function showContactForm(user) {
  document.getElementById("login-form").classList.add("hidden");
  document.getElementById("contact-form").classList.remove("hidden");
  document.getElementById(
    "user-name"
  ).textContent = `Welcome, ${user.displayName}`;
}

function logout() {
  window.currentUser = null;
  document.getElementById("login-form").classList.remove("hidden");
  document.getElementById("contact-form").classList.add("hidden");
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
  showStatus("Logged out successfully.", "info");
}

// Initialize on load
window.addEventListener("load", () => {
  init3D();
});

// Handle form submission with real email sending
document
  .getElementById("message-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!window.currentUser) {
      showStatus("Please login first.", "error");
      return;
    }

    const user = window.currentUser;
    const sendBtn = this.querySelector(".btn");
    const sendText = document.getElementById("send-text");
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!subject || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }

    sendBtn.disabled = true;
    sendText.innerHTML = '<span class="loading"></span>Sending...';

    const templateParams = {
      from_name: user.displayName,
      from_email: user.email,
      subject: subject,
      message: message,
      to_email: "abhisarkar6038@gmail.com",
    };

    // Send actual email using EmailJS
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
      .then((response) => {
        console.log("Email sent successfully:", response);
        showStatus(
          "Message sent successfully to abhisarkar6038@gmail.com! You will receive a reply soon.",
          "success"
        );
        document.getElementById("message-form").reset();
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        showStatus("Failed to send message. Please try again later.", "error");
      })
      .finally(() => {
        sendBtn.disabled = false;
        sendText.textContent = "Send Message";
      });
  });

// Handle window resize
window.addEventListener("resize", () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});

// Enhanced interactive particle effects
document.addEventListener("mousemove", (event) => {
  if (particles) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    particles.rotation.x += mouseY * 0.0005;
    particles.rotation.y += mouseX * 0.0005;
  }
});

// Add keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const loginForm = document.getElementById("login-form");
    const contactForm = document.getElementById("contact-form");

    if (!contactForm.classList.contains("hidden")) {
      logout();
    }
  }
});
