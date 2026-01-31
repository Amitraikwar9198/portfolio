// ================= Mobile Menu =================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileNav.classList.remove('active');
}

document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
        closeMobileMenu();
    }
});

// ================= Resume Download =================
function downloadResume() {
    const button = document.getElementById('downloadBtn');
    const originalText = button.innerHTML;

    button.innerHTML = '⬇️ Downloading...';
    button.classList.add('downloading');

    setTimeout(() => {
        const a = document.createElement('a');
        a.href = 'Resume.pdf'; // Ensure this file exists in your project
        a.download = 'Amit_Raikwar_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        button.innerHTML = '✅ Downloaded!';
        button.classList.remove('downloading');
        button.classList.add('downloaded');

        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('downloaded');
        }, 3000);
    }, 2000);
}

// ================= Smooth Scroll =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================= Sticky Navbar + Scroll Progress =================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollIndicator) {
        scrollIndicator.style.width = scrollPercentage + '%';
    }
});

// ================= Intersection Animations =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.about, .skill-category, .project-card').forEach(el => {
    observer.observe(el);
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.2}s`;
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.3}s`;
});

// ================= Contact Form Simulated Submit =================
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#4CAF50';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            this.reset();
        }, 2000);
    }, 1500);
});

// ================= Hero Parallax Scroll =================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ================= Mouse Movement Hero Background =================
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        hero.style.backgroundPosition = `${x}% ${y}%`;
    }
});

// ================= Gallery Upload & Overlay =================
const uploadInput = document.getElementById("upload");
const galleryContainer = document.getElementById("galleryContainer");
const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const imageTitle = document.getElementById("imageTitle");
const imageDescription = document.getElementById("imageDescription");

uploadInput?.addEventListener("change", function () {
    Array.from(uploadInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const box = document.createElement("div");
            box.classList.add("image-box");

            const img = document.createElement("img");
            img.src = e.target.result;

            const overlayText = document.createElement("div");
            overlayText.className = "img-overlay";
            overlayText.innerText = file.name;

            box.appendChild(img);
            box.appendChild(overlayText);
            box.onclick = () => showOverlay(e.target.result, file.name, "Uploaded image");

            galleryContainer.appendChild(box);
        };
        reader.readAsDataURL(file);
    });
});

function showOverlay(src, title, desc) {
    overlayImage.src = src;
    imageTitle.textContent = title;
    imageDescription.textContent = desc;
    overlay.style.display = "flex";
}

function closeOverlay() {
    overlay.style.display = "none";
}
