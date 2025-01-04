//##############################################################################################################################################
//##############################################################################################################################################
// Handling missing contact form input 

document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nom");
    const emailInput = document.getElementById("destinataire");
    const messageInput = document.querySelector("textarea");
    const subjectInput = document.getElementById("sujet");

    const nameError = document.querySelector(".error-nom");
    const emailError = document.querySelector(".error-destin");
    const subjectError = document.querySelector(".error-sujet");
    const messageError = document.querySelector(".error-message");

    // Initialize EmailJS
    emailjs.init('kiiyjRptDBbgH5nwW');

    // Helper function for validating fields
    function validateField(input, errorElement, validationFn) {
        if (validationFn(input.value.trim())) {
            errorElement.style.display = "none";
            return true;
        } else {
            errorElement.style.display = "block";
            return false;
        }
    }

    // Add blur event listeners for validation
    nameInput.addEventListener("blur", () => {
        validateField(nameInput, nameError, (value) => value !== "");
    });

    emailInput.addEventListener("blur", () => {
        validateField(emailInput, emailError, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    });

    // Add input event listeners to hide errors while typing
    subjectInput.addEventListener("input", () => {
        if (subjectInput.value.trim() !== "") {
            subjectError.style.display = "none";
        }
    });

    messageInput.addEventListener("input", () => {
        if (messageInput.value.trim() !== "") {
            messageError.style.display = "none";
        }
    });

    document.getElementById("send_mail").addEventListener("click", (e) => {
        e.preventDefault();

        const preferredLang = localStorage.getItem("preferredLang") || "en";

        const Popups = {
            "en": {
                "success": {
                    title: "Success!",
                    text: "Your message has been sent.",
                    icon: "success",
                    confirmButtonText: "OK",
                },
                "error": {
                    title: "Error!",
                    text: "There was an issue sending your message.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                }
            },
            "fr": {
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
        };

        // Validate all fields
        const isNameValid = validateField(nameInput, nameError, (value) => value !== "");
        const isEmailValid = validateField(emailInput, emailError, (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        const isSubjectValid = validateField(subjectInput, subjectError, (value) => value !== "");
        const isMessageValid = validateField(messageInput, messageError, (value) => value !== "");

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            const params = {
                from_name: nameInput.value,
                email_id: emailInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            };

            // Send email using EmailJS
            emailjs.send("service_6g2zndm", "template_g3m6fsk", params)
                .then(() => {
                    Swal.fire(Popups[preferredLang]["success"]);
                    // Clear fields after successful submission
                    nameInput.value = "";
                    emailInput.value = "";
                    subjectInput.value = "";
                    messageInput.value = "";
                })
                .catch((error) => {
                    Swal.fire(Popups[preferredLang]["error"]);
                    console.error("EmailJS Error:", error);
                });
        }
    });
});
