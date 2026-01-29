// ============================================
// Mobile Navigation Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ============================================
// WhatsApp Phone Number Configuration
// ============================================
// Replace this with your actual WhatsApp number (include country code, no + or spaces)
// Example: 919753304470 for India
const WHATSAPP_NUMBER = '919753304470';

// ============================================
// Book Service Function (from service cards)
// ============================================
function bookService(serviceName) {
    const message = `Hi! I would like to book an appointment for: ${serviceName}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ============================================
// Booking Form Submission
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const timeInput = document.getElementById('time');
            const time = timeInput ? timeInput.value : '';
            
            // Get selected services (multiple checkboxes)
            const serviceCheckboxes = document.querySelectorAll('input[name="service"]:checked');
            const selectedServices = Array.from(serviceCheckboxes).map(cb => cb.value);
            const serviceError = document.getElementById('serviceError');
            
            // Validate form
            if (!name || !phone) {
                alert('Please enter your name and phone number');
                return;
            }
            
            if (selectedServices.length === 0) {
                if (serviceError) {
                    serviceError.textContent = 'Please select at least one service';
                } else {
                    alert('Please select at least one service');
                }
                return;
            }
            if (serviceError) serviceError.textContent = '';
            
            if (!date) {
                alert('Please select a preferred date');
                return;
            }
            
            if (!time) {
                alert('Please select a preferred time');
                return;
            }
            
            // Validate phone number (basic validation for 10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            // Validate date (should not be in the past)
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                alert('Please select a future date');
                return;
            }
            
            // Format date for display
            const formattedDate = new Date(date).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Format time (e.g. 14:30 -> 2:30 PM)
            const [hours, minutes] = time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const formattedTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
            
            const servicesText = selectedServices.length === 1
                ? selectedServices[0]
                : selectedServices.join(', ');
            
            // Create WhatsApp message
            const message = `Hello! I would like to book an appointment:\n\n` +
                          `Name: ${name}\n` +
                          `Phone: ${phone}\n` +
                          `Service(s): ${servicesText}\n` +
                          `Preferred Date: ${formattedDate}\n` +
                          `Preferred Time: ${formattedTime}\n\n` +
                          `Please confirm availability. Thank you!`;
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset form after a delay
            setTimeout(function() {
                bookingForm.reset();
                if (serviceError) serviceError.textContent = '';
            }, 1000);
        });
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll is handled by CSS (scroll-behavior: smooth)
    // This function adds additional smoothness for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(139, 111, 126, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(139, 111, 126, 0.1)';
    }
});

// ============================================
// Set Minimum Date for Date Input (Today)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Clear service error when user selects at least one checkbox
document.addEventListener('DOMContentLoaded', function() {
    const serviceCheckboxes = document.querySelectorAll('input[name="service"]');
    const serviceError = document.getElementById('serviceError');
    if (serviceCheckboxes.length && serviceError) {
        serviceCheckboxes.forEach(function(cb) {
            cb.addEventListener('change', function() {
                const anyChecked = document.querySelector('input[name="service"]:checked');
                if (anyChecked) serviceError.textContent = '';
            });
        });
    }
});

// ============================================
// Form Input Animations
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        // Remove focus animation
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// Gallery Image Click Handler (Optional Enhancement)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Optional: Add lightbox functionality here
            // For now, just a simple click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});

// ============================================
// Lazy Loading for Images (Performance)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
