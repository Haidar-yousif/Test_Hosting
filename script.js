//###############################################################################################################
//###############################################################################################################
//###############################################################################################################

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
//###############################################################################################################
//###############################################################################################################
//###############################################################################################################

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
//###############################################################################################################
//###############################################################################################################
//###############################################################################################################

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
//###############################################################################################################
//###############################################################################################################
//###############################################################################################################
//handle sending email
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nom");
    const emailInput = document.getElementById("destinataire");
    const messageInput = document.querySelector("textarea");
    const subjectInput = document.getElementById("sujet");
    const nameError = document.querySelector(".error-nom");
    const emailError = document.querySelector(".error-destin");

    let isValidNom = false;
    let isValidMail = false;

    nameInput.addEventListener("blur", () => {
        if (nameInput.value.trim() === "") {
            isValidNom = false;
            nameError.style.display = "block";
        } else {
            isValidNom = true;
            nameError.style.display = "none";
        }
    });

    emailInput.addEventListener("blur", () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            isValidMail = false;
            emailError.style.display = "block";
        } else if (!emailRegex.test(emailInput.value)) {
            isValidMail = false;
            emailError.style.display = "block";
        } else {
            isValidMail = true;
            emailError.style.display = "none";
        }
    });

    document.getElementById("send_mail").addEventListener("click", async (e) => {
        e.preventDefault();
        const preferredLang = localStorage.getItem("preferredLang");

        const popupMessages = {
            en: {
                success: {
                    title: "Success!",
                    text: "Your message has been sent.",
                    icon: "success",
                    confirmButtonText: "OK",
                },
                error: {
                    title: "Error!",
                    text: "There was an issue sending your message.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                },
            },
            fr: {
                success: {
                    title: "Succès!",
                    text: "Votre message a été envoyé.",
                    icon: "success",
                    confirmButtonText: "D'accord",
                },
                error: {
                    title: "Erreur!",
                    text: "Il y a eu un problème lors de l'envoi de votre message.",
                    icon: "error",
                    confirmButtonText: "Réessayer",
                },
            },
        };

        if (isValidNom && isValidMail) {
            // Prepare email parameters
            const emailParams = {
                sender: {
                    email: "haidaryousif40@gmail.com", // Replace with a verified email from Sendinblue
                    name: "Jano Xhenseval Web Site",
                },
                to: [{ email: "haidaryousif40@gmail.com" }], // Corrected syntax here
                subject: subjectInput.value,
                htmlContent: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <table style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; border: 1px solid #ddd;">
                        <thead>
                            <tr>
                                <th style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 20px; border-bottom: 1px solid #ddd;">
                                    Jano Xhenseval et son œuvre
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 15px; text-align: center; font-size: 18px; color: #555;">
                                    <p><strong>You have received a new message from the contact form on your website:</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px;">
                                    <p><strong>Sender's Name:</strong> ${nameInput.value}</p>
                                    <p><strong>Sender's Email:</strong> ${emailInput.value}</p>
                                    <p><strong>Subject:</strong> ${subjectInput.value}</p>
                                    <p><strong>Message:</strong></p>
                                    <div style="padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; font-size: 16px;">
                                        ${messageInput.value}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px; text-align: center; font-size: 14px; color: #888;">
                                    <p>Thank you for using our contact form. This is an automated notification.</p>
                                    <p><em>Jano Xhenseval et son œuvre</em></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `,
                replyTo: {
                    email: emailInput.value,
                    name: nameInput.value,
                },
            };
            
            // Send email using Sendinblue API
            try {
                const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key":'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', // Replace with your actual API key
                    },
                    body: JSON.stringify(emailParams),
                });

                if (response.ok) {
                    Swal.fire(popupMessages[preferredLang]["success"]);
                } else {
                    const errorData = await response.json();
                    Swal.fire(popupMessages[preferredLang]["error"]);
                    console.error("Sendinblue Error:", errorData);
                }
            } catch (error) {
                Swal.fire(popupMessages[preferredLang]["error"]);
                console.error("Unexpected Error:", error);
            }
        }
    });
});











