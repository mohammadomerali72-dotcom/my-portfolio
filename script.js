document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-list a, .hero-actions a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's an internal link
            if (this.hash !== '' && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(this.hash);
                if (targetElement) {
                    // Offset by header height for fixed header
                    const headerOffset = document.querySelector('.header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20; // -20px for extra padding

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    if (document.body.classList.contains('nav-open')) {
                        document.body.classList.remove('nav-open');
                        document.querySelector('.nav-toggle').classList.remove('active');
                        document.querySelector('.nav-menu').classList.remove('active');
                    }
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && document.body.classList.contains('nav-open')) {
            document.body.classList.remove('nav-open');
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Add sticky header class on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

 
              
                 
            

    // Optional: Add active class to nav link on scroll
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-list a');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px', // When 50% of section is visible
        threshold: 0.5 // When 50% of the target is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


});
