//HOMEPAGE

        const words = ["Security Services", "Electrical Services", "IT Solutions"];
        let i = 0;
        let timer;
        let isDeleting = false;
        let text = "";
        const typingEl = document.getElementById("typingg");

        function type() {
            const currentWord = words[i % words.length];

            if (isDeleting) {
                text = currentWord.substring(0, text.length - 1);
            } else {
                text = currentWord.substring(0, text.length + 1);
            }

            typingEl.textContent = text;

            let typingSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && text === currentWord) {
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && text === "") {
                isDeleting = false;
                i++;
                typingSpeed = 500;
            }

            timer = setTimeout(type, typingSpeed);
        }

        document.addEventListener("DOMContentLoaded", function () {
            type();
        });

        document.querySelector(".appointment-form").addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Appointment scheduled successfully!");
        });
