















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

        


        document.addEventListener('DOMContentLoaded', function () {
            const slidess = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.slide-controls button');
            let currentSlide = 0;
            let slideInterval;

            // Function to show a specific slide
            function showSlide(index) {
                // Remove active class from all slides and indicators
                slidess.forEach(slide => slide.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));

                // Handle wrap-around for slide index
                if (index >= slidess.length) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = slidess.length - 1;
                } else {
                    currentSlide = index;
                }

                // Add active class to current slide and indicator
                slidess[currentSlide].classList.add('active');
                indicators[currentSlide].classList.add('active');
            }

            // Function to go to next slide
            function nextSlide() {
                showSlide(currentSlide + 1);
            }

            // Start automatic slideshow
            function startSlideshow() {
                slideInterval = setInterval(nextSlide, 3000);
            }

            // Stop automatic slideshow
            function stopSlideshow() {
                clearInterval(slideInterval);
            }

            // Event listeners for indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function () {
                    stopSlideshow();
                    showSlide(index);
                    startSlideshow();
                });
            });

            // Pause slideshow when user hovers over slideshow
            const slideshowSection = document.querySelector('.slideshow-section');
            slideshowSection.addEventListener('mouseenter', stopSlideshow);
            slideshowSection.addEventListener('mouseleave', startSlideshow);

            // Start the slideshow initially
    startSlideshow();
    
});



//TESTIMONIAL
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById("slider-track");
        const slides = document.querySelectorAll(".testimonial-card");
        let index = 0;

        function updateSlide() {
            track.style.transform = `translateX(-${index * 100}%)`;

            // Reset all slides
            slides.forEach(slide => slide.classList.remove("active"));

            // Activate current slide
            slides[index].classList.add("active");
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            updateSlide();
        }

        function prevSlide() {
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        }

        // Auto scroll every 4000ms
        setInterval(nextSlide, 7000);
        

});



//SEVICES SLIDES
document.addEventListener('DOMContentLoaded', function () {
        const track = document.querySelector('.slider-track');
        const dotsContainer = document.querySelector('.dots');
        const cards = document.querySelectorAll('.service-cards');

        let cardsPerSlide = 3;
        let totalSlides = Math.ceil(cards.length / cardsPerSlide);
        let currentSlide = 0;
        let autoScrollInterval;

        // Determine cards per slide dynamically
        function updateCardsPerSlide() {
            const width = window.innerWidth;
            if (width <= 600) cardsPerSlide = 1;
            else if (width <= 992) cardsPerSlide = 2;
            else cardsPerSlide = 3;

            totalSlides = Math.ceil(cards.length / cardsPerSlide);
            createDots();
            goToSlide(0);
        }

        // Create dots
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => { stopAutoScroll(); goToSlide(i); });
                dotsContainer.appendChild(dot);
            }
        }

        // Go to slide
        function goToSlide(index) {
            currentSlide = index;
            const movePercent = (100 / cardsPerSlide) * cardsPerSlide * index;
            track.style.transform = `translateX(-${movePercent}%)`;
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            document.querySelectorAll('.dot')[index].classList.add('active');
        }

        // Auto-scroll
        function autoScroll() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }

        function startAutoScroll() { autoScrollInterval = setInterval(autoScroll, 2000); }
        function stopAutoScroll() { clearInterval(autoScrollInterval); }

        // Initialize
        updateCardsPerSlide();
        startAutoScroll();
        window.addEventListener('resize', updateCardsPerSlide);

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container-services');
        sliderContainer.addEventListener('mouseenter', stopAutoScroll);
    sliderContainer.addEventListener('mouseleave', startAutoScroll);
});


document.addEventListener('DOMContentLoaded', function () {
 function formatNumber(num) {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + "M";
            } else if (num >= 1000) {
                return (num / 1000).toFixed(1) + "K";
            }
            return num;
        }

        function animateCounter(counter) {
            const target = +counter.getAttribute("data-target");
            let current = 0;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = formatNumber(target);
                    clearInterval(timer);
                } else {
                    counter.innerText = formatNumber(Math.ceil(current));
                }
            }, stepTime);
        }

        const counters = document.querySelectorAll(".stat-number");
        const boxes = document.querySelectorAll(".stat-box");

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // animate box
                    entry.target.classList.add("animate");

                    // animate number if it's a counter
                    const counter = entry.target.querySelector(".stat-number");
                    if (counter) {
                        animateCounter(counter);
                    }

                    obs.unobserve(entry.target); // run once
                }
            });
        }, { threshold: 0.3 });

    boxes.forEach(box => observer.observe(box));
    });


//footer
// Footer animation on scroll
    document.addEventListener('DOMContentLoaded', function () {
        // Animate footer on scroll
        const footerBoxes = document.querySelectorAll('.footer-box');
        const footerBottom = document.querySelector('.footer-bottom');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.2 });
        footerBoxes.forEach(box => observer.observe(box));
        observer.observe(footerBottom);

        // Back-to-Top button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            backToTop.style.display = (window.scrollY > 200) ? 'flex' : 'none';
        });

        // Accelerating scroll to top
        backToTop.addEventListener('click', () => {
            const start = window.scrollY;
            let startTime = null;

            function easeInQuad(t) { return t * t; }

            function scrollStep(timestamp) {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;
                const duration = 1000; // total duration in ms
                const progress = Math.min(elapsed / duration, 1);
                const distance = start * (1 - easeInQuad(progress));
                window.scrollTo(0, distance);
                if (progress < 1) requestAnimationFrame(scrollStep);
            }

            requestAnimationFrame(scrollStep);
        });
          });

//WHY CHOOSE US
document.addEventListener('DOMContentLoaded', function () {
            const buttons = document.querySelectorAll('.toggle-text-btn');
            const closeButtons = document.querySelectorAll('.close-text-btn');
            const texts = document.querySelectorAll('.why-us-text');

            // Function to hide all text overlays
            function hideAllTexts() {
                texts.forEach(text => {
                    text.style.display = 'none';
                });
                buttons.forEach(btn => {
                    btn.style.display = 'block';
                });
            }

            // Add click event to each + button
            buttons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    // Hide all other text overlays first
                    hideAllTexts();

                    // Show the clicked card's text
                    texts[index].style.display = 'block';

                    // Hide the + button of the clicked card
                    btn.style.display = 'none';
                });
            });

            // Add click event to each close button
            closeButtons.forEach((closeBtn, index) => {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    texts[index].style.display = 'none';
                    buttons[index].style.display = 'block';
                });
            });

            // Close text when clicking outside of it
            document.addEventListener('click', function (e) {
                if (!e.target.closest('.why-us-text') && !e.target.closest('.toggle-text-btn')) {
                    hideAllTexts();
                }
            });

            // Prevent closing when clicking inside the text container
            texts.forEach(text => {
                text.addEventListener('click', function (e) {
                    e.stopPropagation();
                });
            });
});
        

//GALLERY
document.addEventListener('DOMContentLoaded', function () {
// Filtering
    const tabss = document.querySelectorAll(".project-tabss a");
    const cardss = document.querySelectorAll(".project-cards");

    tabss.forEach(tab => {
      tab.addEventListener("click", () => {
        tabss.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter");

        cardss.forEach(card => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Modal
    const modal = document.querySelector(".modal");
    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".close");
    const prevBtn = modal.querySelector(".prev");
    const nextBtn = modal.querySelector(".next");

    let currentIndex = 0;
    let images = [];

    function openModal(index) {
      images = Array.from(document.querySelectorAll(".project-cards"))
        .filter(card => card.style.display !== "none")
        .map(card => card.querySelector("img").src);

      currentIndex = index;
      modalImg.src = images[currentIndex];
      modal.style.display = "flex";
    }

    document.querySelectorAll(".overlayy i").forEach((icon, index) => {
      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        openModal(index);
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex];
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex];
    });
    });