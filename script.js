document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const siteLogo = document.getElementById('site-logo');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // 1. Theme Logic
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeBtn.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // 2. Mobile Menu
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 3. Scroll to Top (Logo)
    siteLogo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Form Submission (AJAX - No Redirect)
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = new FormData(contactForm);
            formStatus.textContent = "Sending your message...";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    formStatus.innerHTML = "✨ Message Sent! Thanks for contacting, Muhammad Omer Ali will get back to you soon.";
                    contactForm.reset();
                    contactForm.style.display = "none"; // Form hide kar dein success par
                } else {
                    formStatus.textContent = "Oops! Something went wrong. Try again.";
                }
            } catch (error) {
                formStatus.textContent = "Error! Please check your internet connection.";
            }
        });
    }

    // Auto-close menu
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.getElementById('year').textContent = new Date().getFullYear();
});
