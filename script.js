// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroCarousel();
    initExperienceCarousel();
    initSkillsTabs();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hero carousel functionality
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow();
        });
    });

    // Pause on hover
    const heroCarousel = document.querySelector('.hero-carousel');
    heroCarousel.addEventListener('mouseenter', stopSlideshow);
    heroCarousel.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    heroCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    heroCarousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                showSlide(currentSlide);
            }
            stopSlideshow();
            startSlideshow();
        }
    }
}

// Experience carousel functionality
function initExperienceCarousel() {
    const track = document.querySelector('.experience-track');
    const cards = document.querySelectorAll('.experience-card');
    const prevBtn = document.getElementById('exp-prev');
    const nextBtn = document.getElementById('exp-next');
    let currentIndex = 0;

    function updateCarousel() {
        // Remove active class from all cards
        cards.forEach(card => card.classList.remove('active'));
        
        // Add active class to current card
        cards[currentIndex].classList.add('active');
        
        // Move the track
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
    }

    function nextExperience() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevExperience() {
        currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    // Button event listeners
    nextBtn.addEventListener('click', nextExperience);
    prevBtn.addEventListener('click', prevExperience);

    // Auto-advance every 8 seconds
    setInterval(nextExperience, 8000);

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const swipeThreshold = 50;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextExperience();
            } else {
                prevExperience();
            }
        }
    });

    // Initialize
    updateCarousel();
}

// Skills tabs functionality
function initSkillsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillsCategories = document.querySelectorAll('.skills-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Remove active class from all tabs and categories
            tabBtns.forEach(tab => tab.classList.remove('active'));
            skillsCategories.forEach(category => category.classList.remove('active'));

            // Add active class to clicked tab
            btn.classList.add('active');

            // Show corresponding category
            const targetCategory = document.querySelector(`[data-category="${targetTab}"]`);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.competency-card, .experience-card, .skill-item, .cert-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Form field animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Competencies carousel auto-scroll
function initCompetenciesScroll() {
    const track = document.querySelector('.competencies-track');
    if (!track) return;

    // Clone cards for infinite scroll
    const cards = track.querySelectorAll('.competency-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
}

// Initialize competencies scroll after DOM is loaded
document.addEventListener('DOMContentLoaded', initCompetenciesScroll);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Hero carousel keyboard navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const heroSection = document.querySelector('#home');
        const rect = heroSection.getBoundingClientRect();
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            e.preventDefault();
            const indicators = document.querySelectorAll('.indicator');
            const currentActive = document.querySelector('.indicator.active');
            const currentIndex = Array.from(indicators).indexOf(currentActive);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex === 0 ? indicators.length - 1 : currentIndex - 1;
            } else {
                newIndex = (currentIndex + 1) % indicators.length;
            }
            
            indicators[newIndex].click();
        }
    }
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Recalculate carousel positions on resize
    const experienceTrack = document.querySelector('.experience-track');
    const currentCard = document.querySelector('.experience-card.active');
    
    if (experienceTrack && currentCard) {
        const cards = document.querySelectorAll('.experience-card');
        const currentIndex = Array.from(cards).indexOf(currentCard);
        const translateX = -currentIndex * 100;
        experienceTrack.style.transform = `translateX(${translateX}%)`;
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style);

