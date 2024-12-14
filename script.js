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
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `../en/${currentPage}`;
        } else if (preferredLang === 'fr' && isOnEnglishPage) {
            // Redirect to the French version (default structure)
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `../fr/${currentPage}`;
        }
    }
});

//handling the burgle click
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
//handling missing contact form input 
document.addEventListener("DOMContentLoaded",()=>{
const nameInput=document.getElementById("nom");
const emailInput =document.getElementById("destinataire");
const MessageInput=document.querySelector("textarea");
const SubjectInput=document.getElementById("sujet");
const nameError=document.querySelector(" .error-nom");
const emailError=document.querySelector(".error-destin");

let isvalidNom=false;
let isvalidMail=false;

// Initialize EmailJS
emailjs.init('kiiyjRptDBbgH5nwW');
nameInput.addEventListener("blur",()=>{
if(nameInput.value.trim()===""){
isvalidNom=false;
    nameError.style.display ="block";
}
else {
    isvalidNom=true;
    nameError.style.display ="none";
}
});

emailInput.addEventListener("blur", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
        isvalidMail=false
        emailError.style.display = "block";
    } else if (!emailRegex.test(emailInput.value)) {
    isvalidMail=false
        emailError.style.display = "block";
    } else {
        isvalidMail=true;
        emailError.style.display = "none";
    }
});
document.getElementById("send_mail").addEventListener("click", (e) => {
    e.preventDefault();
    const preferredLang = localStorage.getItem("preferredLang");

    const Pobup={
        "en":{
            "success":{
                title: "Success!",
                text: "Your message has been sent.",
                icon: "success",
                confirmButtonText: "OK",
            },
            "error":{
                title: "Error!",
                text: "There was an issue sending your message.",
                icon: "error",
                confirmButtonText: "Try Again",
            }
        },
        "fr":{
            "success": {
                title: "Succès!",
                text: "Votre message a été envoyé.",
                icon: "success",
                confirmButtonText: "D'accord",
            },
            "error": {
                title: "Erreur!",
                text: "Il y a eu un problème lors de l'envoi de votre message.",
                icon: "error",
                confirmButtonText: "Réessayer",
            }
        }
    
    }
  
    if (isvalidNom && isvalidMail) {
        const param={
            from_name:nameInput.value,
            email_id:emailInput.value,
            subject:SubjectInput.value,
            message:MessageInput.value
        }
        // Send email using EmailJS
        emailjs.send("service_6g2zndm", "template_g3m6fsk",
            param
        ).then(() => {
            Swal.fire(Pobup[preferredLang]["success"]);
        }).catch((error) => {
            Swal.fire(
                Pobup[preferredLang]["error"]
            );
            console.error("EmailJS Error:", error);
        });
    }
});
});