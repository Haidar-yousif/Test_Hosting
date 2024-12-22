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
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `../en/${currentPage}`;
        } else if (preferredLang === 'fr' && isOnEnglishPage) {
            // Redirect to the French version (default structure)
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            window.location.href = `../fr/${currentPage}`;
        }
    }
});
//##############################################################################################################################################
//##############################################################################################################################################
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

//##############################################################################################################################################
//##############################################################################################################################################
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

//##############################################################################################################################################
//##############################################################################################################################################
// artwork section image handling
//document.addEventListener('DOMContentLoaded', () => {
 //   const images = document.querySelectorAll('.artwork .img_container');
    
//    const body = document.body;
  
//    images.forEach(imagec => {
//      imagec.addEventListener('click', () => {
//        const fullscreenDiv = document.createElement('div');
//        fullscreenDiv.classList.add('fullscreen');
  
//        const fullscreenImage = document.createElement('img');
//        fullscreenImage.src = imagec.children[0].src;
//        fullscreenDiv.appendChild(fullscreenImage);
//        body.appendChild(fullscreenDiv);
  
        // Close fullscreen on click
//        fullscreenDiv.addEventListener('click', () => {
//          fullscreenDiv.remove();
//        });
//      });
//    });
//  });
 // #############################################################################################################
 let zoomLevel = 1; // Initial zoom level
let isDragging = false; // Flag for drag state
let startX, startY; // Starting cursor position for mouse and touch
let transformMatrix = [1, 0, 0, 1, 0, 0]; // Initial transform matrix

// Open Modal
function openImageModal(imageSrc) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalSection=document.getElementsByClassName("modal-section")[0];
    modal.style.display = "flex";
    modalSection.style.display="initial";
    modalImage.src = imageSrc;
    modalImage.style.transform = `matrix(${transformMatrix.join(",")})`;
    zoomLevel = 1; // Reset zoom level
    document.getElementById("zoomRange").value = zoomLevel;
}

// Close Modal
function closeModal() {
    document.getElementsByClassName("modal-section")[0].style.display="none";
    document.getElementById("imageModal").style.display = "none";
}

// Zoom In
function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 1, 10); // Max zoom level: 3
    applyZoom();
}

// Zoom Out
function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 1, 0.1); // Min zoom level: 1
    applyZoom();
}

// Zoom via Range Input
function zoomImage(value) {
    zoomLevel = parseFloat(value);
    applyZoom();
}

// Apply Zoom to Image
function applyZoom() {
    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;
}

// Enable dragging of the image (Mouse)
function startDrag(event) {
    event.preventDefault(); // Prevent image from being selected
    if (event.button === 2) return; // Prevent dragging on right-click

    isDragging = true;
    startX = event.clientX - transformMatrix[4];
    startY = event.clientY - transformMatrix[5];
}

// Enable dragging of the image (Touch)
function startTouchDrag(event) {
    event.preventDefault(); // Prevent image from being selected
    if (event.touches.length > 1) return; // Only allow single touch to move the image

    isDragging = true;
    startX = event.touches[0].clientX - transformMatrix[4];
    startY = event.touches[0].clientY - transformMatrix[5];
}

// Stop dragging the image
function stopDrag() {
    isDragging = false;
}

// Drag the image while dragging is enabled (Mouse)
function dragImage(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    transformMatrix[4] = deltaX;
    transformMatrix[5] = deltaY;

    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;
}

// Drag the image while dragging is enabled (Touch)
function dragTouchImage(event) {
    if (!isDragging) return;

    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    transformMatrix[4] = deltaX;
    transformMatrix[5] = deltaY;

    const modalImage = document.getElementById("modalImage");
    modalImage.style.transform = `matrix(${zoomLevel}, 0, 0, ${zoomLevel}, ${transformMatrix[4]}, ${transformMatrix[5]})`;
}

// Reset dragging behavior on right-click
function resetDrag() {
    document.removeEventListener("contextmenu", (e) => e.preventDefault(), false);
}

// Attach events for dragging (Mouse)
const modalImage = document.getElementById("modalImage");
modalImage.addEventListener("mousedown", startDrag); // Start drag on mouse down
document.addEventListener("mouseup", stopDrag); // Stop dragging on mouse up
document.addEventListener("mousemove", dragImage); // Drag image on mouse move

// Attach events for dragging (Touch)
modalImage.addEventListener("touchstart", startTouchDrag); // Start drag on touch start
document.addEventListener("touchend", stopDrag); // Stop dragging on touch end
document.addEventListener("touchmove", dragTouchImage); // Drag image on touch move

// Disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
