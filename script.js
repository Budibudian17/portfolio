// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add active class on clickable elements
document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-category').forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// DOM Elements
const loader = document.querySelector('.loader-wrapper');
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollToTop = document.querySelector('.scroll-to-top');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialsTrack = document.querySelector('.testimonials-track');
const contactForm = document.getElementById('contactForm');
const contactFormWrapper = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');
const portfolioModal = document.getElementById('portfolioModal');
const modalImage = portfolioModal.querySelector('.modal-image');
const modalTitle = portfolioModal.querySelector('.modal-title');
const modalDescription = portfolioModal.querySelector('.modal-description');
const modalLinks = portfolioModal.querySelectorAll('.modal-link');

// Loader
window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Header Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Scroll To Top
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTop.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal
// Hapus event listener click pada .portfolio-item (jika ada)

// Testimonials Slider
let currentSlide = 0;

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

function updateSlider() {
    testimonialsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    testimonialDots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Auto slide testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialDots.length;
    updateSlider();
}, 5000);

// Initialize EmailJS
emailjs.init("UTjeSvsQlMZmM_GIp"); // Ganti dengan public key Anda dari EmailJS

// Custom Alert Function
function showCustomAlert(message, type = 'success') {
    const alertBox = document.getElementById('custom-alert');
    const alertMsg = document.getElementById('custom-alert-message');
    const alertIcon = document.getElementById('custom-alert-icon');
    alertMsg.textContent = message;
    if (type === 'success') {
        alertIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        alertBox.className = 'custom-alert success';
    } else {
        alertIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        alertBox.className = 'custom-alert error';
    }
    alertBox.style.display = 'flex';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3500);
}

// Contact Form

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // EmailJS parameters
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Send email
    emailjs.send('service_m2m5lme', 'template_jkr2w1k', templateParams)
        .then(function(response) {
            showCustomAlert('Pesan berhasil dikirim! Saya akan segera membalas email Anda.', 'success');
            contactFormWrapper.classList.add('fade');
            setTimeout(() => {
                contactForm.reset();
                contactFormWrapper.classList.remove('fade');
            }, 400);
        }, function(error) {
            showCustomAlert('Maaf, terjadi kesalahan. Silakan coba lagi nanti.', 'error');
            console.error('Error:', error);
        });
});

// Newsletter Form
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(newsletterForm);
    const data = Object.fromEntries(formData);
    
    // Send form data to server
    fetch('/api/newsletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Subscribed successfully!');
            newsletterForm.reset();
        } else {
            alert('Error subscribing. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error subscribing. Please try again.');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .about-inner, .services-grid, .skills-grid, .portfolio-grid, .testimonials-slider, .contact-info, .contact-form, .footer-inner');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Typed Text Animation
const typedText = document.querySelector('.typed-text');
const textArray = ['Web Developer', 'Front-End Developer', 'User Experience Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Portfolio Data
const portfolioData = {
    'ciptalife': {
        title: 'CiptaLife',
        description: "As a front-end developer, I contributed to building the user interface and implementing responsive designs for CiptaLife, a healthcare platform for Depok's Health Department. My role involved creating interactive components and ensuring optimal user experience across all devices.",
        image: 'img/ciptalife.png',
        tech: ['HTML', 'CSS', 'JavaScript', 'Next.JS', 'React.JS', 'Golang', 'MySQL'],
        website: 'https://ciptalife.id/',
        github: null
    },
    'erp': {
        title: 'ERP System',
        description: 'An Enterprise Resource Planning system designed to streamline business operations. It includes modules for inventory management, sales tracking, and financial reporting.',
        image: 'img/ERP.jpeg',
        tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        website: null,
        github: null
    },
    'portfolio': {
        title: 'Portfolio Website',
        description: 'A personal portfolio website showcasing my skills, projects, and experience in web development. Built with modern design principles and responsive layout.',
        image: 'img/portfolio.png',
        tech: ['HTML', 'CSS', 'JavaScript'],
        website: '#',
        github: '#'
    }
};

// Event untuk icon search di portfolio
document.querySelectorAll('.portfolio-link[data-project]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        const project = portfolioData[projectId];
        if (!project) return;

        // Set modal content
        modalImage.src = project.image;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        // Tech stack
        const modalTech = portfolioModal.querySelector('.modal-tech');
        modalTech.innerHTML = '';
        if (project.tech && Array.isArray(project.tech)) {
            project.tech.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tech-tag';
                tag.textContent = tech;
                modalTech.appendChild(tag);
            });
        }

        // Set links - only show GitHub link if it exists
        modalLinks[0].href = project.website;
        if (project.github) {
            modalLinks[1].style.display = 'block';
            modalLinks[1].href = project.github;
        } else {
            modalLinks[1].style.display = 'none';
        }

        //Set Links - Only show website link if it exists
        modalLinks[0].href = project.website;
        if (project.website) {
            modalLinks[0].style.display = 'block';
            modalLinks[0].href = project.website;
        } else {
            modalLinks[0].style.display = 'none';
        }

        // Tampilkan modal
        portfolioModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Tetap pertahankan event close modal
modalClose.addEventListener('click', () => {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        revealOnScroll();
    });
}); 