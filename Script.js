// ================= Contact Form Validation =================
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
        alert("❌ Please fill all fields");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("❌ Please enter a valid email address");
        return;
    }

    alert("✅ Message sent successfully!");
    this.reset();
});

// ================= Navbar Active Link on Scroll =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute("href"));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ================= Razorpay Payment =================
function payNow(item, price) {

    // ✅ Safety check (Vercel issue fix)
    if (typeof Razorpay === "undefined") {
        alert("❌ Razorpay SDK not loaded. Please refresh.");
        return;
    }

    const options = {
        key: "rzp_test_RiksrCFbdFEKhn",   // TEST KEY
        amount: Math.round(price * 100), 
        currency: "INR",
        name: "FreshDish",
        description: `Payment for ${item}`,
        image: "https://your-vercel-site.vercel.app/images/S.png",
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
