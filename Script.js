// ================= Contact Form Validation =================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values from form
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector("textarea").value.trim();

        // Check if any field is empty
        if (!name || !email || !message) {
            alert("❌ Please fill all fields");
            return;
        }

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("❌ Please enter a valid email address");
            return;
        }

        // Success message and reset form
        alert("✅ Message sent successfully!");
        this.reset();
    });
}

// ================= Navbar Active Link on Scroll =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

// ================= Smooth Scroll =================
navLinks.forEach(link => {
    link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});

// ================= Razorpay Payment =================
function payNow(item, price) {
    if (typeof Razorpay === "undefined") {
        alert("❌ Razorpay SDK not loaded");
        return;
    }

    const options = {
        key: "rzp_test_RiksrCFbdFEKhn", // Razorpay Test Key
        amount: price, // in paise
        currency: "INR",
        name: "FreshDish",
        description: `Payment for ${item}`,
        image: "/images/S.png", // ✅ Vercel safe path
        handler: function (response) {
            alert(
                "✅ Payment Successful!\nPayment ID: " +
                response.razorpay_payment_id
            );
        },
        theme: {
            color: "#FF4C3B"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}
