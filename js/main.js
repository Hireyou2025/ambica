/**
 * Amaravati Family Restaurant - Main JS File
 * Core Interactivity, Navigation, Form Submissions, and Sliders
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. STICKY HEADER & SCROLL TO TOP
       ========================================== */
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll back to top when button clicked
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================
       2. MOBILE NAVIGATION DRAWER
       ========================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop page scrolling
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = 'auto'; // Resume page scrolling
    }

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Close drawer when a link is clicked
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });


    /* ==========================================
       3. ACTIVE NAVIGATION SCROLL TRACKING
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function activeMenuTracking() {
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                drawerLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activeMenuTracking);


    /* ==========================================
       4. RESTAURANT MENU FILTERING
       ========================================== */
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for fade in transition
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================
       5. TABLE RESERVATION MODAL TRIGGERS
       ========================================== */
    const reservationModal = document.getElementById('reservationModal');
    const closeReservationBtn = document.getElementById('closeReservation');
    const reservationForm = document.getElementById('reservationForm');
    const resDateInput = document.getElementById('resDate');

    const today = new Date();
    // Format YYYY-MM-DD
    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    if (resDateInput) {
        resDateInput.value = formatDate(today);
        resDateInput.min = formatDate(today);
    }

    // Open Table Modal
    document.querySelectorAll('.open-reservation-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            reservationModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeReservationModal() {
        reservationModal.classList.remove('open');
        document.body.style.overflow = 'auto';
        reservationForm.reset();
        if (resDateInput) {
            resDateInput.value = formatDate(today);
        }
    }

    closeReservationBtn.addEventListener('click', closeReservationModal);
    
    // Close reservation modal if clicking backdrop
    reservationModal.addEventListener('click', (e) => {
        if (e.target === reservationModal) {
            closeReservationModal();
        }
    });


    /* ==========================================
       6. PHOTO GALLERY FILTERING
       ========================================== */
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    /* ==========================================
       7. TESTIMONIAL SLIDER
       ========================================== */
    const slider = document.getElementById('testimonialSlider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    const totalSlides = cards.length;
    let slideTimer;

    // Create dot elements dynamically
    if (dotsContainer && totalSlides > 0) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetSlideTimer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        currentSlide = index;
        if (slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update dots state
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= totalSlides) next = 0;
        goToSlide(next);
    }

    function startSlideTimer() {
        slideTimer = setInterval(nextSlide, 5000); // Change slides every 5 seconds
    }

    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }

    if (totalSlides > 0) {
        startSlideTimer();
    }


    /* ==========================================
       8. FAQ COLLAPSIBLE ACCORDION
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            const isActive = parent.classList.contains('active');

            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If it wasn't already active, open it
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });


    /* ==========================================
       9. FORM SUBMISSION & SUCCESS TOASTS
       ========================================== */
    const successToast = document.getElementById('successToast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(title, message) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        successToast.classList.add('show');

        setTimeout(() => {
            successToast.classList.remove('show');
        }, 5000); // Show toast for 5 seconds
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            showToast(
                "Message Sent!",
                `Thank you ${name}. Our team has received your message and will reply shortly.`
            );
            contactForm.reset();
        });
    }

    // Table Reservation Submission
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('resName').value;
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            
            closeReservationModal();
            showToast(
                "Table Booked Successfully!",
                `Hello ${name}, your table has been reserved for ${date} at ${time}. Welcome!`
            );
        });
    }


    /* ==========================================
       10. INTERSECTION OBSERVER ANIMATION REVEAL
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
