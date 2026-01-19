// ===========================
// PREMUM PATH SELECTOR LOGIC
// ===========================

// Expose function globally so onClick in HTML works
window.selectPath = function (pathType) {
    const traditionalCard = document.querySelector('.selection-card.traditional');
    const modernCard = document.querySelector('.selection-card.modern');
    const traditionalRoadmap = document.getElementById('traditional-roadmap');
    const modernRoadmap = document.getElementById('modern-roadmap');
    const contextText = document.getElementById('context-text');

    // Reset States
    traditionalCard.classList.remove('active');
    modernCard.classList.remove('active');

    // Reset Button Text
    traditionalCard.querySelector('.cta-fake-button').textContent = "Select Path";
    modernCard.querySelector('.cta-fake-button').textContent = "Select Path";

    // Activate Selected
    if (pathType === 'traditional') {
        traditionalCard.classList.add('active');
        traditionalCard.querySelector('.cta-fake-button').textContent = "Selected";

        traditionalRoadmap.style.display = 'block';
        modernRoadmap.style.display = 'none';

        contextText.innerHTML = "👇 <strong>Traditional Route</strong> is active. Scroll down for the 8-step foundational path.";

        // Scroll slightly to show change
        traditionalRoadmap.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } else {
        modernCard.classList.add('active');
        modernCard.querySelector('.cta-fake-button').textContent = "Selected";

        traditionalRoadmap.style.display = 'none';
        modernRoadmap.style.display = 'block';

        contextText.innerHTML = "👇 <strong>Modern Route</strong> is active. Scroll down for the 7-step fast-track path.";

        modernRoadmap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initial State Check (Ensure Traditional is visible by default)
    const traditionalRoadmap = document.getElementById('traditional-roadmap');
    const modernRoadmap = document.getElementById('modern-roadmap');

    if (traditionalRoadmap) traditionalRoadmap.style.display = 'block';
    if (modernRoadmap) modernRoadmap.style.display = 'none';
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all roadmap steps
document.addEventListener('DOMContentLoaded', () => {
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    roadmapSteps.forEach(step => {
        observer.observe(step);
    });

    // Observe consideration cards
    const considerationCards = document.querySelectorAll('.consideration-card');
    considerationCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

// Smooth scroll for anchor links
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

// ===========================
// TIMELINE PROGRESS INDICATOR
// ===========================

function updateTimelineProgress() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate visible progress
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;

    let progress = 0;

    if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
        const visibleHeight = Math.min(windowHeight - timelineTop, timelineHeight);
        progress = (visibleHeight / timelineHeight) * 100;
    } else if (timelineTop + timelineHeight < windowHeight) {
        progress = 100;
    }

    progress = Math.max(0, Math.min(100, progress));
}

// Update progress on scroll
window.addEventListener('scroll', updateTimelineProgress);
window.addEventListener('resize', updateTimelineProgress);

// ===========================
// PARALLAX EFFECT ON HERO
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// HOVER EFFECTS FOR CARDS
// ===========================

// Add tilt effect on mouse move for cards
const cards = document.querySelectorAll('.step-card, .consideration-card, .takeaway-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===========================
// DYNAMIC GRADIENT ANIMATION
// ===========================

// Add subtle color shift to gradients
let hueRotation = 0;

function animateGradients() {
    hueRotation += 0.5;
    if (hueRotation >= 360) hueRotation = 0;

    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.filter = `hue-rotate(${hueRotation}deg)`;
    }

    requestAnimationFrame(animateGradients);
}

// Start gradient animation
animateGradients();

// ============================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ===========================

// Create scroll to top button dynamically
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Style the button
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
        z-index: 1000;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(style);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// INITIALIZE ON LOAD
// ===========================

window.addEventListener('load', () => {
    // Initial timeline progress update
    updateTimelineProgress();

    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    console.log('🚀 AI Learning Roadmap 2026 - Ready!');
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

//Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions
const debouncedTimelineUpdate = debounce(updateTimelineProgress, 10);
window.addEventListener('scroll', debouncedTimelineUpdate);
