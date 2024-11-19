// Function to handle intersection changes and trigger animations
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        // If the section or paragraph is in view, add the 'animate' class to trigger animations
        if (entry.isIntersecting) {
            // Ensure that animation is not already applied, or apply again if needed
            if (!entry.target.classList.contains('animate')) {
                entry.target.classList.add('animate'); // Add animation class

                // Force a reflow to restart the animation (ensures that animation can restart)
                entry.target.offsetHeight; // This triggers the reflow
            }
        } else {
            // If the section is not in view, remove the animation class to reset it
            entry.target.classList.remove('animate');
        }
    });
}

// Select all sections and paragraphs
const sections = document.querySelectorAll('.section');
const paragraphs = document.querySelectorAll('.section .content');

// Options for the IntersectionObserver (you can adjust the root margin to trigger animations earlier or later)
const options = {
    root: null, // Default: viewport
    rootMargin: '0px',
    threshold: 0.5 // 50% of the section needs to be visible to trigger the animation
};

// Create an IntersectionObserver instance for sections and paragraphs
const observer = new IntersectionObserver(handleIntersection, options);

// Observe each section and paragraph
sections.forEach(section => {
    observer.observe(section);
});

paragraphs.forEach(paragraph => {
    observer.observe(paragraph);
});

// Gradient Colors for background change
const gradients = [
    'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(120deg, #a1c4fd 0%,rgb(47, 175, 234) 100%)',
    'linear-gradient(120deg, #ff9a9e 0%, #fad0c4 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)'
];

// Function to change gradient when a section is fully visible
let currentGradientIndex = 0;

function changeGradient() {
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
    document.body.style.background = gradients[currentGradientIndex];
    document.body.style.transition = 'background 0.8s ease';
}

// Observer for gradient changes based on sections visibility
const gradientObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                changeGradient();
            }
        });
    },
    { threshold: 0.5 }
);

// Observe sections for gradient changes
sections.forEach(section => {
    gradientObserver.observe(section);
});

// Navbar hover and touch interactions (responsiveness for smaller screens)
const navbar = document.querySelector('.navbar');

// On hover (desktop) - show the sections
navbar.addEventListener('mouseenter', () => {
    sections.forEach(section => {
        section.classList.add('open');
    });
});

// On mouseleave (desktop) - hide the sections
navbar.addEventListener('mouseleave', () => {
    sections.forEach(section => {
        section.classList.remove('open');
    });
});

// Mobile-friendly event listeners: use touch events for mobile and small screens
navbar.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sections.forEach(section => {
            section.classList.toggle('open');
        });
    }
});

// Optionally, add an event listener to close the navbar on clicking outside (mobile view)
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768 && !navbar.contains(event.target)) {
        sections.forEach(section => {
            section.classList.remove('open');
        });
    }
});

// Optional: Handle window resizing for mobile-first
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Reset sections to desktop-friendly hover effect if the screen is large
        sections.forEach(section => {
            section.classList.remove('open');
        });
    }
});
