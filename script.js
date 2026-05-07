document.addEventListener("DOMContentLoaded", () => {

    const themeBtn = document.getElementById("theme-toggle");
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const siteLogo = document.getElementById("site-logo");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    const body = document.body;

    /* =====================================================
       1. THEME TOGGLE (SAFE + ICON SWITCH)
    ===================================================== */

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {

            body.classList.toggle("light-theme");

            const icon = themeBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-moon");
                icon.classList.toggle("fa-sun");
            }

        });
    }

    /* =====================================================
       2. MOBILE MENU (FIXED + OVERLAY STYLE)
    ===================================================== */

    function openMenu() {
        navMenu.classList.add("active");
        mobileToggle.classList.add("active");
        body.style.overflow = "hidden"; // scroll lock
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
        body.style.overflow = "auto";
    }

    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            if (navMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        /* click outside menu close */
        document.addEventListener("click", (e) => {
            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)
            ) {
                closeMenu();
            }
        });

        /* ESC key close */
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeMenu();
            }
        });
    }

    /* =====================================================
       3. LOGO SCROLL TOP
    ===================================================== */

    if (siteLogo) {
        siteLogo.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            closeMenu();
        });
    }

    /* =====================================================
       4. CLOSE MENU ON LINK CLICK
    ===================================================== */

    document.querySelectorAll(".nav-list a").forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    /* =====================================================
       5. FORM SUBMISSION (CLEAN + UX IMPROVED)
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const data = new FormData(contactForm);

            formStatus.textContent = "Sending message... 🚀";

            try {

                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: data,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {

                    formStatus.textContent =
                        "✅ Message sent successfully! I'll reply soon.";

                    contactForm.reset();

                    setTimeout(() => {
                        formStatus.textContent = "";
                    }, 5000);

                } else {

                    formStatus.textContent =
                        "❌ Failed to send message. Try again.";

                }

            } catch (error) {

                formStatus.textContent =
                    "⚠️ Network error. Check your internet.";

            }

        });

    }

    /* =====================================================
       6. AUTO YEAR
    ===================================================== */

    const yearEl = document.getElementById("year");

    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});
