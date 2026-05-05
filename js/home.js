document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Logic ---
    const menuTrigger = document.querySelector('.mobile-menu-trigger');
    const sideMenu = document.querySelector('.mobile-side-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const overlay = document.querySelector('.overlay');
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown .dropdown-toggle');

    const openMenu = () => {
        sideMenu.classList.add('open');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
    };

    if (menuTrigger) {
        menuTrigger.addEventListener('click', openMenu);
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const content = toggle.nextElementSibling;
            if (content.style.display === 'block') {
                content.style.display = 'none';
                toggle.querySelector('i').classList.remove('fa-angle-up');
                toggle.querySelector('i').classList.add('fa-angle-down');
            } else {
                content.style.display = 'block';
                toggle.querySelector('i').classList.remove('fa-angle-down');
                toggle.querySelector('i').classList.add('fa-angle-up');
            }
        });
    });


    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 5000; // 5 seconds auto-slide
        
        const goToSlide = (index) => {
            // Remove active class from all
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Handle bounds
            currentSlide = index;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            } else if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            
            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        };
        
        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };
        
        const prevSlide = () => {
            goToSlide(currentSlide - 1);
        };
        
        // Event Listeners
        if(nextArrow) {
            nextArrow.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }
        
        if(prevArrow) {
            prevArrow.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }
        
        // Auto-play
        const startInterval = () => {
            slideInterval = setInterval(nextSlide, intervalTime);
        };
        
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };
        
        // Initialize
        startInterval();
    }
    
    // --- Optional: Drag to scroll for Best Collections ---
    const collectionsCarousel = document.querySelector('.collections-carousel');
    if (collectionsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        collectionsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            collectionsCarousel.style.cursor = 'grabbing';
            startX = e.pageX - collectionsCarousel.offsetLeft;
            scrollLeft = collectionsCarousel.scrollLeft;
        });
        
        collectionsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            collectionsCarousel.style.cursor = 'grab';
        });
        
        collectionsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            collectionsCarousel.style.cursor = 'grab';
        });
        
        collectionsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - collectionsCarousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            collectionsCarousel.scrollLeft = scrollLeft - walk;
        });
    }
});
