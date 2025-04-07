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
        if (theme === 'dark' || theme === 'blue') {
            document.documentElement.style.setProperty('--cursor-dot-color', 'var(--accent-color-1)'); // Blau auf Dunkel/Blau
            document.documentElement.style.setProperty('--cursor-outline-color', 'rgba(0, 119, 255, 0.6)');
            document.documentElement.style.setProperty('--cursor-outline-interact-color', 'var(--accent-color-2)'); // Magenta Interact
        } else { // theme 'light'
            document.documentElement.style.setProperty('--cursor-dot-color', 'var(--accent-color-1)'); // Blau auf Hell
            document.documentElement.style.setProperty('--cursor-outline-color', 'rgba(0, 119, 255, 0.5)');
            document.documentElement.style.setProperty('--cursor-outline-interact-color', 'var(--accent-color-2)'); // Magenta Interact
        }
    };

    // Nur auf Nicht-Touch-Geräten initialisieren
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            if (!cursorVisible) {
                document.body.classList.add('cursor-ready');
                cursorVisible = true;
                 // Initial Cursor Farbe setzen
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
                 // Skalierung wird nun via body class gesteuert
                 cursorOutline.style.transform = `translate(${posX - 17.5}px, ${posY - 17.5}px)`;
            }

             // Prüfen, über welcher Sektion sich die Maus befindet, um Cursorfarbe anzupassen
            const sectionElement = document.elementFromPoint(posX, posY)?.closest('.section');
            let newTheme = 'light'; // Default
             if (sectionElement) {
                 if (sectionElement.classList.contains('theme-dark')) newTheme = 'dark';
                 else if (sectionElement.classList.contains('theme-blue')) newTheme = 'blue';
             } else {
                 // Wenn nicht über einer Sektion (z.B. Header/Footer), Farbe des nächsten/vorherigen annehmen oder Default
                 // Vereinfacht: Helle Farbe als Fallback
             }

            if (newTheme !== currentColorScheme) {
                updateCursorColors(newTheme);
                currentColorScheme = newTheme;
            }

        }, { passive: true });

         // Hover-Effekt für den Outline
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
                    // Delay wird jetzt im CSS über .is-visible[data-delay] gesteuert
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Element muss zu 10% sichtbar sein
            rootMargin: "0px 0px -50px 0px" // Trigger etwas früher auslösen
        });
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }


    // --- Portfolio Hover Logik (ENTFERNT) ---
    // Die Logik für das Preview Window wurde entfernt.

     // --- Sanftes Scrollen für Header-Links & Scroll-Indikator ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                // Berechnung der Zielposition unter Berücksichtigung des fixen Headers
                const headerOffset = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


}); // Ende DOMContentLoaded
