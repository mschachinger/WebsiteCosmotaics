const { createApp } = Vue;

createApp({
    data() {
        return {
            name: "",
            email: "",
            message: "",
            status: "",
        };
    },
    methods: {
        async submitForm() {
            // Log die eingegebenen Werte im Frontend
            console.log("Name:", this.name);
            console.log("Email:", this.email);
            console.log("Message:", this.message);


            //Speichert die Daten in ein Formdata Objekt
            const formdata = {
                name: this.name,
                email: this.email,
                message: this.message,
            };

            // Sende die Formulardaten an den Server
            try {
                const response = await fetch("http://localhost:3000/submitForm", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formdata),
                });


                if (!response.ok) {
                    throw new Error("Server responded with an error");
                }

                const data = await response.json();

                if (data.success) {
                    this.status = "Form submitted successfully";
                    console.log("Form submitted successfully");

                    this.name = "";
                    this.email = "";
                    this.message = "";
                } else {
                    this.status = "Error: " + (data.error || "Unknown error");
                    console.error("Error:", data.error || "Unknown error");
                }
            } catch (error) {
                this.status = "An error occurred during form submission.";
                console.error("Error during submission:", error);
            }
        }
    }
}).mount("#app");

/**
 * GSAP Animations
 */

function applyHoverEffect(selector) {
    document.querySelectorAll(selector).forEach(card => {
      let hover = gsap.fromTo(card, { scale: 1 }, { paused: true, scale: 1.02, duration: 0.2, ease: "power2.inOut" });
  
      card.addEventListener("mouseenter", () => hover.play());
      card.addEventListener("mouseleave", () => hover.reverse()); 
    });
  }
  
  applyHoverEffect(".team_card");
  applyHoverEffect(".news_card");

  document.addEventListener("DOMContentLoaded", (event) => {
    gsap.fromTo(".arrow_image", { opacity: 0 }, { opacity: 1, duration: 2, delay: 5, ease: "ease-in" });

   });


/*
* Scroll Fade In Animation
*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.fade-section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});



/** 
 * Mobile-Menubar
 */

   document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuOpenIcon = document.getElementById("menu-open-icon");
    const menuCloseIcon = document.getElementById("menu-close-icon");
    
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
      menuOpenIcon.classList.toggle("hidden");
      menuCloseIcon.classList.toggle("hidden");
    });
  });


