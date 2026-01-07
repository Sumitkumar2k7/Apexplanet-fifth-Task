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

    // Basic email validation
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
        const sectionTop = section.offsetTop - 100;
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
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

function payNow(item, price) {
    var options = {
        "key": "rzp_test_RiksrCFbdFEKhn", // Razorpay Test/Live Key
        "amount": price, // in paise
        "currency": "INR",
        "name": "FreshDish",
        "description": `Payment for ${item}`,
        "image": "images/S.png",
        "handler": function (response){
            alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        },
        "theme": {
            "color": "#FF4C3B"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
