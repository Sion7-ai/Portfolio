document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamisches Jahr im Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Cursor Follower ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let cursorVisible = false; // Flag, um Initialisierung zu steuern

    // Nur auf Nicht-Touch-Geräten initialisieren
    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Macht den Cursor sichtbar beim ersten Bewegen
            if (!cursorVisible) {
                document.body.classList.add('cursor-ready');
                cursorVisible = true;
            }

            if (cursorDot) {
                // Direkte Positionierung für schnelles Folgen
                cursorDot.style.transform = `translate(${posX - 4}px, ${posY - 4}px)`;
            }
            if (cursorOutline) {
                // Verzögerte Positionierung für smoothes Folgen (Alternative zu GSAP)
                 cursorOutline.style.transform = `translate(${posX - 17.5}px, ${posY - 17.5}px) ${document.body.classList.contains('cursor-interact') ? 'scale(1.4)' : 'scale(1)'}`; // Skalierung hier auch steuern
                 // GSAP Variante (wenn eingebunden):
                 // gsap.to(cursorOutline, { duration: 0.3, x: posX, y: posY });
            }
        }, { passive: true }); // Performance Optimierung für scroll/mousemove

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
                    const delay = entry.target.dataset.delay ? parseFloat(entry.target.dataset.delay) * 1000 : 0;
                    entry.target.style.transitionDelay = `${delay / 1000}s`; // Setze Delay via Style
                    entry.target.classList.add('is-visible'); // Löst CSS Transition aus
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // 10% sichtbar
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }


    // --- Hero Text Maus-Parallax ---
    const heroSection = document.getElementById('hero');
    const heroNames = document.querySelectorAll('.hero-name');
    if (heroSection && heroNames.length > 0 && window.matchMedia('(pointer: fine)').matches) {
        const sensitivity = 25; // Etwas stärkerer Effekt

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2); // -1 bis 1
            const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2); // -1 bis 1

            heroNames.forEach(nameEl => {
                const depth = parseFloat(nameEl.getAttribute('data-depth') || '0.1');
                const moveX = -(mouseX * sensitivity * depth);
                const moveY = -(mouseY * sensitivity * depth);
                 // Verwende translate3d für potenziell bessere Performance (GPU-Beschleunigung)
                nameEl.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });
        }, { passive: true });

         heroSection.addEventListener('mouseleave', () => {
              heroNames.forEach(nameEl => {
                 nameEl.style.transform = 'translate3d(0, 0, 0)';
             });
         });
    }


    // --- Portfolio Hover Preview Window Positionierung ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const previewWindow = item.querySelector('.preview-window');
        const imageWrapper = item.querySelector('.portfolio-image-wrapper');

        if (previewWindow && imageWrapper && window.matchMedia('(pointer: fine)').matches) {
            item.addEventListener('mousemove', (e) => { // Listener auf das ganze Item
                const itemRect = item.getBoundingClientRect();
                // Mausposition relativ zum Viewport
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Fensterposition berechnen (z.B. 20px rechts und 20px unter der Maus)
                let targetX = mouseX + 20;
                let targetY = mouseY + 20;

                // Kollisionserkennung mit Viewport-Rändern
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const previewWidth = previewWindow.offsetWidth;
                const previewHeight = previewWindow.offsetHeight;

                // Rechts über Rand? Position links von der Maus
                if (targetX + previewWidth > windowWidth - 20) { // 20px Puffer
                    targetX = mouseX - previewWidth - 20;
                }
                // Unten über Rand? Position über der Maus
                if (targetY + previewHeight > windowHeight - 20) {
                    targetY = mouseY - previewHeight - 20;
                }
                 // Links über Rand? (Seltener, aber sicherheitshalber)
                if (targetX < 20) {
                    targetX = 20;
                }
                // Oben über Rand?
                if (targetY < 20) {
                    targetY = 20;
                }


                previewWindow.style.left = `${targetX}px`;
                previewWindow.style.top = `${targetY}px`;
                // Position fixed verwenden, damit es relativ zum Viewport ist
                previewWindow.style.position = 'fixed';

            }, { passive: true });

            // Stelle sicher, dass das Fenster beim Verlassen des Items versteckt wird
             item.addEventListener('mouseleave', () => {
                // Nötig, falls die Maus zu schnell bewegt wird und das :hover CSS nicht greift
                previewWindow.style.opacity = '0';
                previewWindow.style.visibility = 'hidden';
            });
            item.addEventListener('mouseenter', () => {
                // Nötig, falls die Maus zu schnell bewegt wird und das :hover CSS nicht greift
                 // Kurze Verzögerung, um Flackern zu vermeiden, wenn man nur drüberstreicht
                setTimeout(() => {
                    // Prüfen, ob Maus noch über dem Element ist
                     if (item.matches(':hover')) {
                        previewWindow.style.opacity = '1';
                        previewWindow.style.visibility = 'visible';
                    }
                }, 50); // 50ms Verzögerung
            });
        }
    });


     // --- Sanftes Scrollen für Scroll-Indikator ---
     const scrollIndicator = document.querySelector('.scroll-indicator');
     const portfolioSection = document.getElementById('portfolio');
     if (scrollIndicator && portfolioSection) {
        scrollIndicator.addEventListener('click', (e) => {
             e.preventDefault();
             portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start'});
        });
     }

    // --- Setze Textur-Variablen (falls data-texture verwendet wird) ---
    const sectionsWithTexture = document.querySelectorAll('.section[data-texture]');
    sectionsWithTexture.forEach(section => {
        const textureUrl = section.getAttribute('data-texture');
        if (textureUrl) {
             section.style.setProperty('--texture-url', `url(${textureUrl})`);
        }
    });


}); // Ende DOMContentLoaded