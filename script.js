// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu ul li a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// Typing Effect
const textArray = ["AI/ML Specialist", "Final Year Student", "Web Developer", "WisdomLand Founder"];
const typingDelay = 100;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector(".typing-text");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        updateBadges(textArray[textArrayIndex]);
        setTimeout(type, typingDelay + 1100);
    }
}

// Skills Data for Dynamic Badges
const skillsData = {
    "AI/ML Specialist": [
        { icon: "fas fa-brain", text: "Neural Networks" },
        { icon: "fas fa-microchip", text: "Model Training" },
        { icon: "fas fa-project-diagram", text: "Predictive Analytics" }
    ],
    "Final Year Student": [
        { icon: "fas fa-graduation-cap", text: "Research & Analysis" },
        { icon: "fas fa-file-alt", text: "Paper Publishing" },
        { icon: "fas fa-users", text: "Soft Spoken" }
    ],
    "Web Developer": [
        { icon: "fab fa-react", text: "Front-End Dev" },
        { icon: "fas fa-server", text: "Backend Systems" },
        { icon: "fas fa-database", text: "PostgreSQL" }
    ],
    "WisdomLand Founder": [
        { icon: "fab fa-wordpress", text: "WordPress CMS" },
        { icon: "fas fa-search-dollar", text: "SEO Mastery" },
        { icon: "fas fa-tasks", text: "Project Management" }
    ]
};

function updateBadges(role) {
    const badgeContainer = document.getElementById('dynamic-badges');
    const skills = skillsData[role] || [];

    badgeContainer.style.opacity = '0';
    badgeContainer.style.transform = 'scale(0.95)';

    setTimeout(() => {
        badgeContainer.innerHTML = '';
        skills.forEach((skill, index) => {
            const badge = document.createElement('div');
            badge.className = `floating-badge badge-${index + 1}`;
            badge.innerHTML = `<i class="${skill.icon}"></i> ${skill.text}`;
            badgeContainer.appendChild(badge);
        });
        badgeContainer.style.opacity = '1';
        badgeContainer.style.transform = 'scale(1)';
    }, 400);
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) {
        setTimeout(() => {
            type();
            // Update initial badges
            updateBadges(textArray[0]);
        }, newTextDelay + 250);
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: observer.unobserve(entry.target); to animate only once
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ===== CERTIFICATE FILTER TABS =====
const certTabs = document.querySelectorAll('.cert-tab');
const certCards = document.querySelectorAll('.cert-card');

certTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        certTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        certCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== CERTIFICATE LIGHTBOX =====
const lightbox = document.getElementById('certLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxIssuer = document.getElementById('lightboxIssuer');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let visibleCards = [];
let currentIndex = 0;

function openLightbox(index) {
    visibleCards = Array.from(certCards).filter(c => !c.classList.contains('hidden'));
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    const card = visibleCards[currentIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = card.dataset.img;
        lightboxImg.alt = card.dataset.title;
        lightboxTitle.textContent = card.dataset.title;
        lightboxIssuer.textContent = card.dataset.issuer;
        lightboxImg.style.opacity = '1';
    }, 180);
    // Show/hide nav arrows
    lightboxPrev.style.display = visibleCards.length > 1 ? 'flex' : 'none';
    lightboxNext.style.display = visibleCards.length > 1 ? 'flex' : 'none';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

// Open on card click
certCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
        visibleCards = Array.from(certCards).filter(c => !c.classList.contains('hidden'));
        const visibleIdx = visibleCards.indexOf(card);
        openLightbox(visibleIdx);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % visibleCards.length;
    updateLightbox();
});

lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    updateLightbox();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % visibleCards.length; updateLightbox(); }
    if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length; updateLightbox(); }
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.custom-cursor');
const interactiveElements = document.querySelectorAll('a, button, .cert-card, .glass-panel');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ===== 3D GLASS TILT EFFECT =====
const glassPanels = document.querySelectorAll('.glass-panel');

glassPanels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    panel.addEventListener('mouseleave', () => {
        panel.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        setTimeout(() => panel.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', 50);
    });

    panel.addEventListener('mouseenter', () => {
        panel.style.transition = 'none'; // Remove transition for smooth immediate tracking
    });
});

// ===== NETWORK CANVAS BACKGROUND =====
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse collision/repel interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Connect particles if close enough

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = 'rgba(255, 136, 204, 0.4)'; // match accent color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                opacityValue = 1 - (distance / 20000);
                let dx = mouse.x - particlesArray[a].x;
                let dy = mouse.y - particlesArray[a].y;
                let mouseDistance = Math.sqrt(dx * dx + dy * dy);

                // Lines glow more if near mouse
                if (mouseDistance < 150) {
                    ctx.strokeStyle = `rgba(201, 76, 255, ${opacityValue})`;
                } else {
                    ctx.strokeStyle = `rgba(255, 136, 204, ${opacityValue * 0.2})`;
                }

                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
});

window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

init();
animate();
