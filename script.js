document.addEventListener("DOMContentLoaded", () => {
    const langSwitchLinks = document.querySelectorAll(".lang-switch a");

    langSwitchLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = new URL(link.href);
            const lang = url.pathname.includes('/en/') ? 'en' : 'fr'; // Determine language from URL
            // Save the selected language to localStorage
            localStorage.setItem("preferredLang", lang);
            // Redirect to the clicked link
            window.location.href = link.href;
        });
    });

    // Ensure the correct language is loaded based on localStorage
    const preferredLang = localStorage.getItem("preferredLang");

    if (preferredLang) {
        const isOnEnglishPage = window.location.pathname.includes('/en/');
        if (preferredLang === 'en' && !isOnEnglishPage) {
            // Redirect to the English version
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `/en/${currentPage}`;
        } else if (preferredLang === 'fr' && isOnEnglishPage) {
            // Redirect to the French version (default structure)
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `/${currentPage}`;
        }
    }
});
