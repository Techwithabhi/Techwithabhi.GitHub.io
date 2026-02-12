document.addEventListener("DOMContentLoaded", function () {

    emailjs.init("Cf_Y3oLLUVj_A1FwR"); // Public Key

    const form = document.getElementById("contact-form");

    if (!form) {
        console.error("Contact form not found!");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_jt9kk8j",
            "template_z2jwjvr",
            this
        ).then(
            function () {
                alert("Message sent successfully📲📧✅");
                form.reset();
            },
            function (error) {
            console.error("EmailJS Error FULL:", error);
            alert("Failed: " + error.text);
            }
        );
    });

});