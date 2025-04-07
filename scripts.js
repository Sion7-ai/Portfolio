/* CSS Variablen */
:root {
    --bg-color-light: #f0f2f5;
    --bg-color-dark: #1a1d24;
    --bg-color-blue: #0d3f83;
    --text-color-dark: #1a1d24;
    --text-color-light: #ffffff;
    --text-color-blue-light: #adc8ff;

    --accent-color-1: #0077FF; /* Leuchtendes Blau */
    --accent-color-2: #e60073; /* Kräftiges Magenta */
    --accent-hover-1: #0056b3;
    --accent-hover-2: #b30059;

    --font-heading: 'Montserrat', sans-serif;
    --font-body: 'Inter', sans-serif;

    --spacing-unit: 8px;
    --header-height: 70px;

    /* Cursor Farben */
    --cursor-dot-color: var(--accent-color-1);
    --cursor-outline-color: rgba(0, 119, 255, 0.5);
    --cursor-outline-interact-color: var(--accent-color-2);
}

/* Basis-Reset und globale Stile */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 100%; }
body {
    font-family: var(--font-body);
    background-color: var(--bg-color-light);
    color: var(--text-color-dark);
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    cursor: none;
}
@media (hover: none) or (pointer: coarse) {
    body { cursor: auto; }
    a, button, .scroll-indicator, .skill-item, .portfolio-item { cursor: pointer; }
    .cursor-dot, .cursor-outline { display: none !important; }
}
h1, h2, h3 { font-family: var(--font-heading); font-weight: 700; line-height: 1.2; margin-bottom: calc(var(--spacing-unit) * 2); }
p { margin-bottom: calc(var(--spacing-unit) * 2); max-width: 65ch; font-size: clamp(0.95rem, 1vw + 0.7rem, 1.1rem); }
a { color: var(--accent-color-1); text-decoration: none; transition: color 0.3s ease; cursor: none; }
a:hover { color: var(--accent-hover-1); }
img { max-width: 100%; height: auto; display: block; }
ul { list-style: none; }

/* Section Content Wrapper */
.section-content-wrapper {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding-left: calc(var(--spacing-unit) * 4);
    padding-right: calc(var(--spacing-unit) * 4);
}

/* Cursor Follower */
/* ... (Cursor-Styling bleibt unverändert zur vorherigen Version) ... */
.cursor-dot, .cursor-outline { position: fixed; top: 0; left: 0; pointer-events: none; border-radius: 50%; z-index: 9999; opacity: 0; transition: opacity 0.3s ease, transform 0.1s linear; will-change: transform; backface-visibility: hidden; }
.cursor-dot { width: 8px; height: 8px; background-color: var(--cursor-dot-color); transform: translate(-4px, -4px); }
.cursor-outline { width: 35px; height: 35px; border: 1px solid var(--cursor-outline-color); transform: translate(-17.5px, -17.5px) scale(1); transition: opacity 0.3s ease, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.2s ease, background-color 0.2s ease; }
body.cursor-ready .cursor-dot, body.cursor-ready .cursor-outline { opacity: 1; }
body.cursor-interact .cursor-outline { transform: translate(-17.5px, -17.5px) scale(1.4); border-color: var(--cursor-outline-interact-color); background-color: rgba(230, 0, 115, 0.1); }
body.cursor-interact .cursor-dot { background-color: var(--accent-color-2); }


/* Header */
.site-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background-color: var(--bg-color-dark);
    z-index: 1000;
    /* Kein border-bottom mehr, klarer Schnitt */
}
.header-content { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 calc(var(--spacing-unit) * 4); }
.logo-simple { font-family: var(--font-heading); font-weight: 700; font-size: 1.8rem; color: var(--text-color-light); }
.logo-p { color: var(--accent-color-1); } /* P. in Blau */

.main-nav ul { display: flex; gap: calc(var(--spacing-unit) * 4); }
.main-nav ul li a { font-family: var(--font-body); font-weight: 500; color: rgba(255, 255, 255, 0.8); padding: calc(var(--spacing-unit) * 1) 0; position: relative; transition: color 0.3s ease; }
.main-nav ul li a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background-color: var(--accent-color-1); transition: width 0.3s ease; }
.main-nav ul li a:hover { color: var(--text-color-light); }
.main-nav ul li a:hover::after { width: 100%; }

/* Header Welle Divider CSS ENTFERNT */


/* Main Content Startpunkt */
main {
    padding-top: var(--header-height);
}


/* Sektionen Allgemein */
.section {
    min-height: calc(100vh - var(--header-height));
    padding: calc(var(--spacing-unit) * 10) 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden; /* Wichtig, damit z.B. Glitch nicht überläuft */
}
.section::before { display: none; } /* Keine Texturen */

/* Theme-spezifische Farben */
.theme-light { background-color: var(--bg-color-light); color: var(--text-color-dark); }
.theme-dark  { background-color: var(--bg-color-dark);  color: var(--text-color-light); }
.theme-blue  { background-color: var(--bg-color-blue);  color: var(--text-color-blue-light); }

/* Cursor Farben Anpassung */
/* ... (bleibt wie zuvor) ... */
.theme-light .cursor-dot { background-color: var(--accent-color-1); }
.theme-light .cursor-outline { border-color: rgba(0, 119, 255, 0.5); }
.theme-light.cursor-interact .cursor-dot { background-color: var(--accent-color-2); }
.theme-light.cursor-interact .cursor-outline { border-color: var(--accent-color-2); background-color: rgba(230, 0, 115, 0.1); }

.theme-dark .cursor-dot, .theme-blue .cursor-dot { background-color: var(--accent-color-1); }
.theme-dark .cursor-outline, .theme-blue .cursor-outline { border-color: rgba(0, 119, 255, 0.6); }
.theme-dark.cursor-interact .cursor-dot, .theme-blue.cursor-interact .cursor-dot { background-color: var(--accent-color-2); }
.theme-dark.cursor-interact .cursor-outline, .theme-blue.cursor-interact .cursor-outline { border-color: var(--accent-color-2); background-color: rgba(230, 0, 115, 0.1); }


/* Hero Sektion */
.hero-section {
    align-items: center;
    text-align: center;
    padding-top: calc(var(--header-height) + var(--spacing-unit) * 5);
    min-height: 100vh;
}
.hero-content { z-index: 1; }
.hero-text-wrapper { /* Wrapper für Hover-Effekt */
    display: inline-block; /* Sorgt dafür, dass Hover nur auf Textbereich wirkt */
}
.name-title {
    font-family: var(--font-heading);
    font-weight: 900;
    font-size: clamp(4rem, 12vw + 1rem, 10rem);
    line-height: 1.1;
    margin: 0;
    color: var(--text-color-dark);
    text-transform: uppercase;
    transition: text-shadow 0.1s ease, transform 0.1s ease; /* Weicher Übergang zum Glitch */
}
.name-p { color: var(--accent-color-1); display: inline-block; }

/* Glitch Effekt auf Hover */
.hero-text-wrapper:hover .hero-name {
    text-shadow: 2px 2px 0px var(--accent-color-2), /* Magenta */
                 -2px -2px 0px rgba(0, 255, 255, 0.7); /* Cyan als dritter Farbton */
    animation: glitch-anim 0.08s infinite linear alternate-reverse; /* Schnellere, lineare Animation */
}

@keyframes glitch-anim {
  0% { transform: translate(0); }
  25% { transform: translate(-1px, 1px); }
  50% { transform: translate(1px, -1px); }
  75% { transform: translate(-1px, -1px); }
  100% { transform: translate(1px, 1px); }
}

.subtitle { font-family: var(--font-body); font-weight: 500; font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem); color: var(--text-color-dark); opacity: 0.7; margin-top: calc(var(--spacing-unit) * 1); }
.scroll-indicator { position: absolute; bottom: calc(var(--spacing-unit) * 4); left: 50%; transform: translateX(-50%); font-size: 2rem; color: var(--accent-color-1); animation: bounce 2s infinite; opacity: 0.7; }
@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translate(-50%, 0); } 40% { transform: translate(-50%, -10px); } 60% { transform: translate(-50%, -5px); } }


/* Divider CSS ENTFERNT */


/* Portfolio Sektion */
.portfolio-section {
    text-align: left;
    border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtile Linie als Trenner */
    padding-top: calc(var(--spacing-unit) * 10);
}
.portfolio-title { font-size: clamp(2.5rem, 6vw + 1rem, 5rem); color: var(--accent-color-2); text-transform: none; font-weight: 700; margin-bottom: calc(var(--spacing-unit) * 5); }
.portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: calc(var(--spacing-unit) * 4); }
.portfolio-item { position: relative; overflow: hidden; border-radius: 12px; transition: transform 0.3s ease, box-shadow 0.3s ease; background-color: #2a2e37; }
.portfolio-item:hover { transform: translateY(-6px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25); }
.portfolio-link { display: block; color: inherit; }
.portfolio-link:hover { color: inherit; }
.portfolio-image-wrapper { width: 100%; padding-bottom: 65%; position: relative; background-color: #333; }
.portfolio-item img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.portfolio-item:hover img { transform: scale(1.05); }
.portfolio-info { padding: calc(var(--spacing-unit) * 2.5) calc(var(--spacing-unit) * 3); color: var(--text-color-light); }
.portfolio-info h3 { font-family: var(--font-heading); font-weight: 700; font-size: 1.2rem; margin-bottom: calc(var(--spacing-unit) * 0.5); color: var(--text-color-light); }
.portfolio-info p { font-size: 0.9rem; margin-bottom: 0; color: rgba(255, 255, 255, 0.7); }


/* Über Mich Sektion */
.about-section {
    align-items: center;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtile Linie */
    padding-top: calc(var(--spacing-unit) * 10);
}
.about-title { font-size: clamp(3rem, 8vw + 1rem, 6.5rem); color: var(--accent-color-1); font-weight: 900; text-transform: none; margin-bottom: calc(var(--spacing-unit) * 5); }
.skills-icons { display: flex; flex-wrap: wrap; justify-content: center; gap: calc(var(--spacing-unit) * 6); margin-top: 0; margin-bottom: calc(var(--spacing-unit) * 5); width: 100%; }
.skill-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: calc(var(--spacing-unit) * 1); opacity: 0; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease; flex: 1; min-width: 120px; max-width: 180px; }
.skill-item iconify-icon { font-size: clamp(2.8rem, 5vw + 1rem, 4rem); color: var(--accent-color-1); margin-bottom: var(--spacing-unit); transition: color 0.3s ease, transform 0.3s ease; }
.skill-item span { font-size: 0.9rem; color: var(--text-color-blue-light); font-family: var(--font-body); font-weight: 500; transition: color 0.3s ease; }
.skill-item:hover { transform: translateY(-5px); }
.skill-item:hover iconify-icon { color: var(--text-color-light); transform: scale(1.1); }
.skill-item:hover span { color: var(--text-color-light); }
.about-text { max-width: 60ch; margin: 0 auto; opacity: 0; }
.about-text p { font-size: clamp(1rem, 1.5vw + 0.7rem, 1.2rem); text-align: center; color: var(--text-color-blue-light); }


/* Kontakt Sektion */
.contact-section {
    align-items: center;
    text-align: center;
    min-height: 70vh;
    border-top: 1px solid rgba(0, 0, 0, 0.1); /* Subtile Linie */
    padding-top: calc(var(--spacing-unit) * 10);
}
.contact-title { font-size: clamp(3rem, 8vw + 1rem, 6.5rem); color: var(--text-color-dark); font-weight: 900; margin-bottom: calc(var(--spacing-unit) * 3); }
.contact-title .connect-word { color: var(--accent-color-1); }
.contact-info { display: flex; flex-direction: column; align-items: center; }
.contact-info p.contact-prompt { font-size: clamp(1rem, 2vw + 0.5rem, 1.3rem); margin-bottom: calc(var(--spacing-unit) * 1); color: var(--text-color-dark); opacity: 0.8; }
.contact-link { font-family: var(--font-heading); font-weight: 700; font-size: clamp(1.2rem, 3vw + 0.5rem, 2.2rem); color: var(--accent-color-1); display: inline-block; margin-bottom: calc(var(--spacing-unit) * 4); position: relative; padding-bottom: 3px; transition: transform 0.3s ease; }
.contact-link::after { display: none; }
.contact-link:hover { color: var(--accent-hover-1); transform: scale(1.03); }
.social-icons-contact { display: flex; justify-content: center; gap: calc(var(--spacing-unit) * 3); }
.social-icons-contact a { font-size: clamp(1.6rem, 2.5vw + 1rem, 2.2rem); color: var(--text-color-dark); opacity: 0.6; transition: color 0.3s ease, transform 0.3s ease, opacity 0.3s ease; }
.social-icons-contact a:hover { color: var(--accent-color-1); opacity: 1; transform: translateY(-3px); }


/* Footer */
.site-footer { background-color: var(--bg-color-dark); color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; }
.footer-content { max-width: 1200px; margin: 0 auto; padding: calc(var(--spacing-unit) * 3) calc(var(--spacing-unit) * 4); text-align: center; }

/* Animationen */
[data-animate] { opacity: 0; transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
[data-animate="fade-up"] { transform: translateY(30px); }
[data-animate="fade-left"] { transform: translateX(-30px); }
[data-animate="fade-right"] { transform: translateX(30px); }
[data-animate="pop-in"] { transform: scale(0.9); }
.is-visible[data-animate] { opacity: 1; transform: translate(0, 0) scale(1); }
.is-visible[data-delay="0.1"] { transition-delay: 0.1s !important; }
.is-visible[data-delay="0.2"] { transition-delay: 0.2s !important; }
.is-visible[data-delay="0.3"] { transition-delay: 0.3s !important; }
.is-visible[data-delay="0.4"] { transition-delay: 0.4s !important; }
.is-visible[data-delay="0.5"] { transition-delay: 0.5s !important; }
.is-visible[data-delay="0.6"] { transition-delay: 0.6s !important; }

/* Responsivität */
@media (max-width: 768px) {
    .section { padding: calc(var(--spacing-unit) * 8) 0; }
    .section-content-wrapper { padding-left: calc(var(--spacing-unit) * 3); padding-right: calc(var(--spacing-unit) * 3); }
    .main-nav { display: none; }
    .name-title { font-size: clamp(3.5rem, 15vw + 1rem, 8rem); }
    .section-title { font-size: clamp(2.2rem, 7vw + 1rem, 4.5rem); }
    .portfolio-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: calc(var(--spacing-unit) * 3); }
    .skills-icons { gap: calc(var(--spacing-unit) * 4); }
    .skill-item iconify-icon { font-size: clamp(2.5rem, 5vw + 1rem, 3.5rem); }
    .contact-title { font-size: clamp(2.5rem, 7vw + 1rem, 5rem); }
    .contact-link { font-size: clamp(1rem, 2.5vw + 0.5rem, 1.8rem); }
    .social-icons-contact a { font-size: clamp(1.4rem, 2vw + 1rem, 2rem); }
    .scroll-indicator { font-size: 1.8rem; bottom: calc(var(--spacing-unit) * 3); }
}
