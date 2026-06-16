/**
 * Ambica Aquarium Restaurant - Main JavaScript file
 * Core Interactivity, Shopping Cart, Live Search, Theme Switcher, and Counters
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. HERO BUBBLE GENERATOR
       ========================================== */
    const bubbleContainer = document.getElementById('bubbleContainer');
    
    function createBubble() {
        if (!bubbleContainer) return;
        const bubble = document.createElement('span');
        bubble.classList.add('bubble');
        
        // Randomize size, horizontal position, and animation delay
        const size = Math.random() * 20 + 8; // 8px to 28px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 8; // 0s to 8s
        const duration = Math.random() * 6 + 8; // 8s to 14s

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        
        bubbleContainer.appendChild(bubble);
        
        // Remove bubble after animation ends to free memory
        setTimeout(() => {
            bubble.remove();
        }, (delay + duration) * 1000);
    }

    // Spawn bubbles periodically
    if (bubbleContainer) {
        for (let i = 0; i < 15; i++) {
            createBubble();
        }
        setInterval(createBubble, 1200);
    }


    /* ==========================================
       2. LIGHT & DARK THEME TOGGLE
       ========================================== */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference in LocalStorage, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });


    /* ==========================================
       3. STICKY NAV & SCROLL TO TOP
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

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ==========================================
       4. MOBILE NAVIGATION DRAWER
       ========================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');

    function openDrawer() {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        body.style.overflow = 'auto';
    }

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }


    /* ==========================================
       5. ACTIVE LINK SCROLL TRACKING
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
            }
        });
    }

    window.addEventListener('scroll', activeMenuTracking);


    /* ==========================================
       6. ANIMATED STATISTICS COUNTER
       ========================================== */
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach(counter => {
            const targetStr = counter.getAttribute('data-target');
            const isFloat = targetStr.includes('.');
            const target = parseFloat(targetStr);
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease-out quad function
                const easeProgress = progress * (2 - progress);
                const currentValue = easeProgress * target;

                if (isFloat) {
                    counter.textContent = currentValue.toFixed(1);
                } else {
                    counter.textContent = Math.floor(currentValue);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = targetStr; // Snap to target string
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    /* ==========================================
       7. MENU DYNAMIC LIVE SEARCH & CATEGORY FILTER
       ========================================== */
    const menuSearchInput = document.getElementById('menuSearchInput');
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCards = document.querySelectorAll('.menu-card');
    let activeFilter = 'all';

    function filterMenu() {
        const query = menuSearchInput.value.toLowerCase().trim();

        menuCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const dataName = card.getAttribute('data-name');
            
            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesQuery = !query || dataName.includes(query);

            if (matchesCategory && matchesQuery) {
                card.style.display = 'flex';
                // Small delay to trigger smooth transition
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Input event for live search
    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', filterMenu);
    }

    // Click event for tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            activeFilter = tab.getAttribute('data-filter');
            filterMenu();
        });
    });


    /* ==========================================
       8. ONLINE ORDERING CART DRAWER
       ========================================== */
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartTriggerBtn = document.getElementById('cartTriggerBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartBadgeCount = document.getElementById('cartBadgeCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSubtotalVal = document.getElementById('cartSubtotalVal');
    const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

    // Cart State
    let cart = [];

    // Helper to open/close cart drawer
    function toggleCartDrawer(open) {
        if (open) {
            cartDrawer.classList.add('open');
            cartOverlay.classList.add('open');
            body.style.overflow = 'hidden';
        } else {
            cartDrawer.classList.remove('open');
            cartOverlay.classList.remove('open');
            body.style.overflow = 'auto';
        }
    }

    if (cartTriggerBtn) {
        cartTriggerBtn.addEventListener('click', () => toggleCartDrawer(true));
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => toggleCartDrawer(false));
    }

    // Add To Order event listeners
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            const itemId = button.getAttribute('data-id');
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseInt(button.getAttribute('data-price'));
            
            addToCart(itemId, itemName, itemPrice);
            
            // Pulse anim for cart button
            cartTriggerBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartTriggerBtn.style.transform = 'scale(1)';
            }, 200);

            // Pop success toast
            showToast("Item Added", `${itemName} has been added to your order tray.`);
        }
    });

    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ id, name, price, qty: 1 });
        }
        
        updateCartUI();
    }

    function updateCartUI() {
        // Compute total quantity and subtotal
        let totalQty = 0;
        let subtotal = 0;
        
        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fa-solid fa-fish-fins"></i>
                    <p>Your order tray is empty. Add delicious items from our menu to start ordering!</p>
                </div>
            `;
            whatsappCheckoutBtn.disabled = true;
        } else {
            whatsappCheckoutBtn.disabled = false;
            
            cart.forEach(item => {
                totalQty += item.qty;
                subtotal += (item.price * item.qty);
                
                const itemRow = document.createElement('div');
                itemRow.classList.add('cart-item');
                itemRow.innerHTML = `
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">₹${item.price} each</span>
                        <div class="cart-item-controls">
                            <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
                            <span class="cart-item-qty">${item.qty}</span>
                            <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <div class="cart-item-action">
                        <i class="fa-solid fa-trash-can cart-item-delete" data-id="${item.id}" title="Remove Item"></i>
                    </div>
                `;
                cartItemsList.appendChild(itemRow);
            });
        }

        // Update badge and subtotal displays
        cartBadgeCount.textContent = totalQty;
        cartSubtotalVal.textContent = `₹${subtotal}`;
    }

    // Handles increasing/decreasing qty and deleting in cart drawer
    cartItemsList.addEventListener('click', (e) => {
        const button = e.target;
        const itemId = button.getAttribute('data-id');
        
        if (!itemId) return;

        const cartItem = cart.find(item => item.id === itemId);

        if (button.classList.contains('inc-qty')) {
            cartItem.qty += 1;
            updateCartUI();
        } else if (button.classList.contains('dec-qty')) {
            cartItem.qty -= 1;
            if (cartItem.qty <= 0) {
                cart = cart.filter(item => item.id !== itemId);
            }
            updateCartUI();
        } else if (button.classList.contains('cart-item-delete')) {
            cart = cart.filter(item => item.id !== itemId);
            updateCartUI();
            showToast("Item Removed", "Dish removed from your order.");
        }
    });

    // WhatsApp Checkout Checkout formatting
    if (whatsappCheckoutBtn) {
        whatsappCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = "*New Order - Ambica Aquarium Restaurant Kakinada*\n\n";
            message += "*Items Ordered:*\n";
            
            let totalVal = 0;
            cart.forEach((item, index) => {
                const rowTotal = item.price * item.qty;
                totalVal += rowTotal;
                message += `${index + 1}. ${item.name} x ${item.qty} (₹${rowTotal})\n`;
            });

            message += `\n*Subtotal:* ₹${totalVal}\n`;
            message += "*Delivery Address/Inquiry:* Please specify your address or Table details.\n\nThank you!";

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/918143976686?text=${encodedMessage}`;
            
            // Clear cart and close drawer
            cart = [];
            updateCartUI();
            toggleCartDrawer(false);

            window.open(whatsappUrl, '_blank');
        });
    }


    /* ==========================================
       9. REVIEWS TESTIMONIAL SLIDER
       ========================================== */
    const slider = document.getElementById('testimonialSlider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    const totalSlides = cards.length;
    let slideTimer;

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
        slideTimer = setInterval(nextSlide, 5000); // 5 seconds interval
    }

    function resetSlideTimer() {
        clearInterval(slideTimer);
        startSlideTimer();
    }

    if (totalSlides > 0) {
        startSlideTimer();
    }


    /* ==========================================
       10. FAQ ACCORDION
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement;
            const isActive = parent.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });


    /* ==========================================
       11. FORM SUBMISSIONS & TOAST MESSAGES
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
        }, 4000);
    }

    // Reservation Date Setting
    const resDateInput = document.getElementById('resDate');
    if (resDateInput) {
        resDateInput.value = formatDate(today);
        resDateInput.min = formatDate(today);
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            showToast("Inquiry Sent!", `Hello ${name}, thank you for contacting us. We will get back to you soon.`);
            contactForm.reset();
        });
    }

    // Reservation Form Submission
    const mainReservationForm = document.getElementById('mainReservationForm');
    if (mainReservationForm) {
        mainReservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('resName').value;
            const date = document.getElementById('resDate').value;
            const time = document.getElementById('resTime').value;
            
            showToast(
                "Table Reserved!",
                `Greetings ${name}. We have reserved your aquarium view booth for ${date} at ${time}. Welcome!`
            );
            mainReservationForm.reset();
            if (resDateInput) {
                resDateInput.value = formatDate(today);
            }
        });
    }


    /* ==========================================
       12. SCROLL ANIME REVEAL
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
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
