// Custom Cursor with performance optimization
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Use requestAnimationFrame for smooth cursor movement
function updateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Smooth follower movement
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Start cursor animation
updateCursor();

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
// Improved: Button state always resets after sending (success or error)
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get submit button and store original text outside try-catch for proper scope
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            throw new Error('Please fill in all fields');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // EmailJS parameters
        const templateParams = {
            name,
            email,
            subject,
            message
        };

        // Send email
        const response = await emailjs.send('service_m2m5lme', 'template_jkr2w1k', templateParams);
        
        if (response.status === 200) {
            showCustomAlert('Pesan berhasil dikirim! Saya akan segera membalas email Anda.', 'success');
            contactFormWrapper.classList.add('fade');
            setTimeout(() => {
                contactForm.reset();
                contactFormWrapper.classList.remove('fade');
            }, 400);
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        showCustomAlert(error.message || 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.', 'error');
    } finally {
        // Always reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
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

// Improved scroll performance with debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll reveal with Intersection Observer
const revealElements = document.querySelectorAll('.section-title, .about-inner, .services-grid, .skills-grid, .portfolio-grid, .testimonials-slider, .contact-info, .contact-form, .footer-inner');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            revealObserver.unobserve(entry.target); // Stop observing once revealed
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Typed Text Animation
const typedText = document.querySelector('.typed-text');
const textArray = ['Web Developer', 'Front-End Dev', 'Full Stack Dev'];
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
        tech: ['HTML', 'CSS', 'Next.JS', 'React.JS', 'Golang', 'MySQL'],
        website: 'https://ciptalife.id/',
        github: null
    },
    'erp': {
        title: 'ERP System',
        description: 'An Enterprise Resource Planning system designed to streamline business operations. It includes modules for inventory management, sales tracking, and financial reporting.',
        image: 'img/ERP.jpeg',
        tech: ['HTML', 'CSS', 'JavaScript', 'Phalcon', 'MySQL'],
        website: null,
        github: null
    },
    'portfolio': {
        title: 'Portfolio Website',
        description: 'A personal portfolio website showcasing my skills, projects, and experience in web development. Built with modern design principles and responsive layout.',
        image: 'img/portfolio.png',
        tech: ['HTML', 'CSS', 'JavaScript'],
        website: 'https://hilmiportfoliodev.netlify.app/',
        github: 'https://github.com/Budibudian17/portfolio.git'
    },
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

// Memory Card Game
const gameModal = document.getElementById('gameModal');
const openGameBtn = document.getElementById('open-game');
const closeGameBtn = document.querySelector('.game-modal-close');
const gameBoard = document.querySelector('.game-board');
const movesCount = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let moves = 0;
let seconds = 0;
let minutes = 0;
let gameStarted = false;
let boardLocked = false;

// Items array
const items = [
    { name: 'html', image: 'img/skills/html.png' },
    { name: 'css', image: 'img/skills/css.png' },
    { name: 'js', image: 'img/skills/js.png' },
    { name: 'react', image: 'img/skills/react.png' },
    { name: 'next', image: 'img/skills/next.png' },
    { name: 'golang', image: 'img/skills/go.png' }
];

// Initialize game
function initializeGame() {
    moves = 0;
    seconds = 0;
    minutes = 0;
    movesCount.innerHTML = moves;
    timeValue.innerHTML = `00:00`;
    gameStarted = false;
    clearInterval(interval);
    boardLocked = false;
    firstCard = false;
    secondCard = false;
    
    // Create cards
    const cardValues = [...items, ...items]
        .sort(() => Math.random() - 0.5)
        .map(item => `
            <div class="memory-card" data-card-value="${item.name}">
                <div class="card-front">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="card-back">
                    <i class="fas fa-code"></i>
                </div>
            </div>
        `).join('');
    
    gameBoard.innerHTML = cardValues;
    cards = document.querySelectorAll('.memory-card');
    
    // Add click event to cards
    cards.forEach(card => {
        // Hapus event listener lama (dengan cloneNode)
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
    });
    // Ambil ulang cards setelah replace
    cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            if (boardLocked) return;
            if (!gameStarted) {
                startGame();
            }
            if (!this.classList.contains('flipped') && !this.classList.contains('matched')) {
                flipCard(this);
            }
        });
    });
}

// Start game
function startGame() {
    gameStarted = true;
    interval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timeValue.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Flip card
function flipCard(card) {
    card.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = card;
    } else {
        moves++;
        movesCount.innerHTML = moves;
        secondCard = card;
        boardLocked = true;
        
        if (firstCard.dataset.cardValue === secondCard.dataset.cardValue) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            firstCard = false;
            secondCard = false;
            boardLocked = false;
            
            // Check if all cards are matched
            const matchedCards = document.querySelectorAll('.matched');
            if (matchedCards.length === items.length * 2) {
                setTimeout(() => {
                    showCustomAlert('Congratulations! You won!', 'success');
                    clearInterval(interval);
                    saveScoreToLeaderboard(timeValue.innerHTML, moves);
                }, 500);
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = false;
                secondCard = false;
                boardLocked = false;
            }, 400);
        }
    }
}

// Open game modal
openGameBtn.addEventListener('click', () => {
    gameModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        document.querySelector('.game-modal-content').classList.add('show');
    }, 10);
    initializeGame();
});

// Close game modal
closeGameBtn.addEventListener('click', () => {
    document.querySelector('.game-modal-content').classList.remove('show');
    setTimeout(() => {
        gameModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        clearInterval(interval);
    }, 350);
});

// Close modal when clicking outside
gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        document.querySelector('.game-modal-content').classList.remove('show');
        setTimeout(() => {
            gameModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            clearInterval(interval);
        }, 350);
    }
});

// Event listeners
startButton.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});

restartButton.addEventListener('click', initializeGame);

// Initialize game on load
initializeGame(); 

// Leaderboard logic
function saveScoreToLeaderboard(timeStr, moves) {
    // timeStr format: MM:SS
    const [min, sec] = timeStr.split(':').map(Number);
    const totalSeconds = min * 60 + sec;
    const score = { time: timeStr, moves, totalSeconds, date: new Date().toISOString() };
    let leaderboard = JSON.parse(localStorage.getItem('memoryLeaderboard') || '[]');
    leaderboard.push(score);
    // Sort by totalSeconds ascending, if same then by moves ascending
    leaderboard.sort((a, b) => {
        if (a.totalSeconds !== b.totalSeconds) return a.totalSeconds - b.totalSeconds;
        return a.moves - b.moves;
    });
    // Keep only top 10
    leaderboard = leaderboard.slice(0, 10);
    localStorage.setItem('memoryLeaderboard', JSON.stringify(leaderboard));
}

function renderLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    let leaderboard = JSON.parse(localStorage.getItem('memoryLeaderboard') || '[]');
    // Sort by totalSeconds ascending, if same then by moves ascending
    leaderboard.sort((a, b) => {
        if (a.totalSeconds !== b.totalSeconds) return a.totalSeconds - b.totalSeconds;
        return a.moves - b.moves;
    });
    leaderboard = leaderboard.slice(0, 10);
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<p style="text-align:center; color:#888;">No records yet. Play the game to set your best score!</p>';
        return;
    }
    let html = '<table style="width:100%;border-collapse:collapse;">';
    html += '<tr style="background:var(--primary);color:#fff;"><th style="padding:8px;">#</th><th style="padding:8px;">Time</th><th style="padding:8px;">Moves</th><th style="padding:8px;">Date</th></tr>';
    leaderboard.forEach((entry, idx) => {
        html += `<tr${idx === 0 ? ' style="background: #e6ddfa; font-weight: bold;"' : ''}>
            <td style="text-align:center; padding:6px;">${idx + 1}</td>
            <td style="text-align:center; padding:6px;">${entry.time}</td>
            <td style="text-align:center; padding:6px;">${entry.moves}</td>
            <td style="text-align:center; padding:6px; font-size:0.9em; color:#888;">${new Date(entry.date).toLocaleString()}</td>
        </tr>`;
    });
    html += '</table>';
    leaderboardList.innerHTML = html;
}

// Leaderboard modal events
const leaderboardModal = document.getElementById('leaderboardModal');
const openLeaderboardBtn = document.getElementById('open-leaderboard');
const closeLeaderboardBtn = document.querySelector('.leaderboard-close');

openLeaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
    leaderboardModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        leaderboardModal.querySelector('.game-modal-content').classList.add('show');
    }, 10);
});

closeLeaderboardBtn.addEventListener('click', () => {
    leaderboardModal.querySelector('.game-modal-content').classList.remove('show');
    setTimeout(() => {
        leaderboardModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 350);
});

leaderboardModal.addEventListener('click', (e) => {
    if (e.target === leaderboardModal) {
        leaderboardModal.querySelector('.game-modal-content').classList.remove('show');
        setTimeout(() => {
            leaderboardModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 350);
    }
});

// Game toggle button logic
const gameToggleBtn = document.getElementById('game-toggle-btn');
const gameToggleIcon = document.getElementById('game-toggle-icon');
const gameButtonsPanel = document.getElementById('game-buttons-panel');
const gameToggleWrapper = document.querySelector('.game-toggle-wrapper');
const gameMenuModal = document.getElementById('gameMenuModal');
const gameMenuModalClose = document.querySelector('.game-menu-modal-close');
const openGameMobileBtn = document.getElementById('open-game-mobile');
const openLeaderboardMobileBtn = document.getElementById('open-leaderboard-mobile');

// Pastikan panel tertutup saat load
if (gameButtonsPanel) {
    gameButtonsPanel.classList.remove('active');
}

function isMobile() {
    return window.innerWidth <= 768;
}

gameToggleBtn.addEventListener('click', () => {
    if (isMobile()) {
        // Tampilkan modal mobile
        gameMenuModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        if (gameButtonsPanel.classList.contains('active')) {
            gameButtonsPanel.classList.remove('active');
            gameToggleIcon.textContent = '>';
            if (gameToggleWrapper) gameToggleWrapper.classList.remove('panel-active');
        } else {
            gameButtonsPanel.classList.add('active');
            gameToggleIcon.textContent = '<';
            if (gameToggleWrapper) gameToggleWrapper.classList.add('panel-active');
        }
    }
});

// Modal mobile: close logic
if (gameMenuModalClose) {
    gameMenuModalClose.addEventListener('click', () => {
        gameMenuModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}
gameMenuModal.addEventListener('click', (e) => {
    if (e.target === gameMenuModal) {
        gameMenuModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Modal mobile: tombol game/leaderboard
if (openGameMobileBtn) {
    openGameMobileBtn.addEventListener('click', () => {
        gameMenuModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Trigger open game modal
        openGameBtn.click();
    });
}
if (openLeaderboardMobileBtn) {
    openLeaderboardMobileBtn.addEventListener('click', () => {
        gameMenuModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Trigger open leaderboard modal
        openLeaderboardBtn.click();
    });
} 

// Experience Section Animation
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            experienceObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    experienceObserver.observe(item);
});

// Add hover effect for timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        
        // Add subtle pulse animation to dot
        dot.style.animation = 'pulse 1s infinite';
        
        // Add glow effect to content
        content.style.boxShadow = '0 8px 30px rgba(var(--primary-rgb), 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        
        // Remove animations
        dot.style.animation = '';
        content.style.boxShadow = '';
    });
});

// Add click effect for tech tags
document.querySelectorAll('.timeline-tech .tech-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        tag.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0.4);
        }
        70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(var(--primary-rgb), 0);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(var(--primary-rgb), 0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 