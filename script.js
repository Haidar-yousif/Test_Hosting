//##############################################################################################################################################
//##############################################################################################################################################
//update path based on the language
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
            const currentPage = window.location.pathname.split('/').pop() || 'index';
            window.location.href = `../en/${currentPage}`;
        } else if (preferredLang === 'fr' && isOnEnglishPage) {
            // Redirect to the French version (default structure)
            const currentPage = window.location.pathname.split('/').pop() || 'index';
            window.location.href = `../fr/${currentPage}`;
        }
    }
});
//##############################################################################################################################################
//##############################################################################################################################################
//handling the burgle click
let wind=1060

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav');
    const page = document.querySelector('body'); // Target the whole body or specific content sections

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        burger.classList.toggle('open');
        page.classList.toggle('hide-body-content');
    });
});
// Function to handle adding/removing the "close" class based on screen width
function handleNavLinks() {
    const burger = document.getElementById('burger');
    const navLinks = document.querySelector('.nav');
    const page = document.querySelector('body'); // Target the whole body or specific content sections
    if(burger.classList.contains("open")){
    if (window.innerWidth > wind) {
        navLinks.classList.remove('show');
        
        page.classList.remove("hide-body-content");
    } else {
        navLinks.classList.add('show');
       
        page.classList.add("hide-body-content");
    }}
}

// Run the function on page load
handleNavLinks();

// Add an event listener for window resize
window.addEventListener('resize', handleNavLinks);

//##############################################################################################################################################
//##############################################################################################################################################
// header scroll animation

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
     
    window.addEventListener("scroll", () => {
     
        if (window.scrollY > 50) {  // If scrolled down more than 50px
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    });
});

