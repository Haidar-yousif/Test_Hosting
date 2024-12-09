document.addEventListener("DOMContentLoaded", () => {
    const langSwitchLinks = document.querySelectorAll(".lang-switch a");
    langSwitchLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const url = new URL(link.href);
            const lang = url.pathname.split('/')[1]; // 'en' or 'fr'
            // Save the selected language to localStorage
            localStorage.setItem("preferredLang", lang);
            // Redirect to the clicked link
            window.location.href = link.href;
        });
    });
    // Ensure the correct language is loaded based on localStorage
    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang && !window.location.pathname.includes(preferredLang)) {
        const currentPage = window.location.pathname.split('/').pop();
        window.location.href = `../${preferredLang}/${currentPage}`;
    }
});