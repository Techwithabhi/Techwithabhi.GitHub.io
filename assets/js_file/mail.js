document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("Cf_Y3oLLUVj_A1FwR");

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Contact form not found!");
        return;
    }

    function showMessage(type, text) {
        // Remove any existing message
        const existing = document.getElementById("form-status");
        if (existing) existing.remove();

        const msg = document.createElement("div");
        msg.id = "form-status";
        msg.textContent = text;
        msg.style.cssText = `
            margin-top: 0.75rem;
            padding: 0.85rem 1.2rem;
            border-radius: 0.75rem;
            font-size: 0.9rem;
            font-weight: 500;
            opacity: 0;
            transform: translateY(-8px);
            transition: opacity 0.35s ease, transform 0.35s ease;
            border: 1.5px solid;
            color: ${type === "success" ? "var(--accent)" : "#ff6b6b"};
            border-color: ${type === "success" ? "var(--accent)" : "#ff6b6b"};
            background-color: ${type === "success" ? "var(--accent-glow)" : "rgba(255,107,107,0.08)"};
        `;

        form.appendChild(msg);

        // Trigger animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                msg.style.opacity = "1";
                msg.style.transform = "translateY(0)";
            });
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            msg.style.opacity = "0";
            msg.style.transform = "translateY(-8px)";
            setTimeout(() => msg.remove(), 350);
        }, 4000);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const btn = form.querySelector("button[type='submit']");
        btn.textContent = "SENDING...";
        btn.disabled = true;

        emailjs.sendForm(
            "service_jt9kk8j",
            "template_z2jwjvr",
            this
        ).then(
            function () {
                btn.textContent = "DROP YOUR THOUGHTS";
                btn.disabled = false;
                form.reset();
                showMessage("success", "✓ Message sent! I'll get back to you soon.");
            },
            function (error) {
                console.error("EmailJS Error FULL:", error);
                btn.textContent = "DROP YOUR THOUGHTS";
                btn.disabled = false;
                showMessage("error", "✕ Failed to send. Please try again.");
            }
        );
    });

});