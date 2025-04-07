document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamisches Jahr im Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Cursor Follower ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let cursorVisible = false;
    let currentColorScheme = 'light'; // Startet Hell

    // Funktion zum Aktualisieren der Cursor-Farbe basierend auf dem Theme
    const updateCursorColors = (theme) => {
        const rootStyle = document.documentElement.style;
        if (theme === 'dark' || theme === 'blue') {
            rootStyle.setProperty('--cursor-dot-color', 'var(--accent-color-1)');
            rootStyle.setProperty('--cursor-outline-color', 'rgba(0, 119, 255, 0.6)');
            rootStyle.setProperty('--cursor-outline-interact-color', 'var(--accent-color-2)');
        } else { // theme 'light'
            rootStyle.setProperty('--cursor-dot-color', 'var(--accent-color-1)');
            rootStyle.setProperty('--cursor-outline-color', 'rgba(0, 119, 255, 0.5)');
            rootStyle.setProperty('--cursor-outline-interact-color', 'var(--accent-color-2)');
        }
    };

    // Nur auf Nicht-Touch-Geräten initialisieren
    if (window.matchMedia('(pointer: fine)').matches) {
        document.body.style.cursor = 'none'; // Verstecke Standardcursor nur auf Desktop

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (!cursorVisible) {
                document.body.classList.add('cursor-ready');
                cursorVisible = true;
                 const initialSection = document.elementFromPoint(posX, posY)?.closest('.section');
                 const initialTheme = initialSection?.classList.contains('theme-dark') ? 'dark' :
                                      initialSection?.classList.contains('theme-blue') ? 'blue' : 'light';
                updateCursorColors(initialTheme);
                currentColorScheme = initialTheme;
            }

            if (cursorDot) {
                cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
            }
            if (cursorOutline) {
                 cursorOutline.style.transform = `translate(${posX - 17.5}px, ${posY - 17.5}px)`;
            }

            const sectionElement = document.elementFromPoint(posX, posY)?.closest('.section');
            let newTheme = 'light';
             if (sectionElement) {
                 if (sectionElement.classList.contains('theme-dark')) newTheme = 'dark';
                 else if (sectionElement.classList.contains('theme-blue')) newTheme = 'blue';
             }

            if (newTheme !== currentColorScheme) {
                updateCursorColors(newTheme);
                currentColorScheme = newTheme;
            }

        }, { passive: true });

         const interactiveElements = 'a, button, .skill-item, .scroll-indicator, .portfolio-item';
         document.querySelectorAll(interactiveElements).forEach(el => {
             el.addEventListener('mouseenter', () => document.body.classList.add('cursor-interact'));
             el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-interact'));
         });

    }

    // --- Intersection Observer für Scroll-Animationen ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" // Trigger etwas früher
        });
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

     // --- Sanftes Scrollen für Header-Links & Scroll-Indikator ---
    document.querySelectorAll('a[href^="#"], .scroll-indicator').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href') || '#portfolio'; // Fallback für Scroll Indicator
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                const headerOffset = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Berücksichtige aktuelle Scrollposition und Header-Höhe
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

}); // Ende DOMContentLoaded
