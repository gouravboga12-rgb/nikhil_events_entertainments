import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });

    // Typewriter logic
    const typeWriter = async (element, text, speed = 50, isHTML = false) => {
        if (!element) return;
        
        if (isHTML) {
            // For complex HTML, we'll type text content and then restore HTML structure
            // Or simpler: just type the characters one by one and skip tags
            let i = 0;
            element.innerHTML = '';
            
            return new Promise((resolve) => {
                const type = () => {
                    if (i < text.length) {
                        if (text[i] === '<') {
                            const tagEnd = text.indexOf('>', i);
                            element.innerHTML += text.substring(i, tagEnd + 1);
                            i = tagEnd + 1;
                        } else if (text[i] === '&') {
                            const entityEnd = text.indexOf(';', i);
                            if (entityEnd !== -1 && entityEnd - i < 10) {
                                element.innerHTML += text.substring(i, entityEnd + 1);
                                i = entityEnd + 1;
                            } else {
                                element.innerHTML += text[i];
                                i++;
                            }
                        } else {
                            element.innerHTML += text[i];
                            i++;
                        }
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                };
                type();
            });
        } else {
            let i = 0;
            element.textContent = '';
            return new Promise((resolve) => {
                const type = () => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                };
                type();
            });
        }
    };

    // Initialize animations
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');

    if (titleEl && descEl) {
        const titleText = titleEl.innerHTML;
        const descText = descEl.textContent.trim();
        
        // Clear elements initially
        titleEl.innerHTML = '';
        descEl.textContent = '';
        
        // Start title animation
        setTimeout(() => {
            typeWriter(titleEl, titleText, 50, true).then(() => {
                // Remove cursor from title and add to desc (optional)
                titleEl.classList.remove('typewriter-cursor');
                descEl.classList.add('typewriter-cursor');
                
                // Start description animation
                typeWriter(descEl, descText, 30, false).then(() => {
                     descEl.classList.remove('typewriter-cursor');
                     
                     // Show buttons after typing
                     const btnBook = document.getElementById('btn-book');
                     const btnServices = document.getElementById('btn-services');
                     if (btnBook) btnBook.classList.add('animate-fade-in-up');
                     if (btnServices) btnServices.classList.add('animate-fade-in-up');
                });
            });
        }, 500);
    }

    // Simple mobile menu toggle logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Contact form handling (simple alert for demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Your message has been sent to Nikhil Events & Entertainments via WhatsApp request logic.');
            contactForm.reset();
        });
    }
});
