
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