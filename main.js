document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const statNumbers = document.querySelectorAll('.stat-number');
    let currentSlide = 0;
    let slideInterval;
    
    // Toggle Menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (hamburger.classList.contains('active')) {
            hamburger.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburger.querySelector('span:nth-child(2)').style.opacity = '0';
            hamburger.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
            hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
            hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.querySelector('span:nth-child(1)').style.transform = 'none';
            hamburger.querySelector('span:nth-child(2)').style.opacity = '1';
            hamburger.querySelector('span:nth-child(3)').style.transform = 'none';
        });
    });
    
    // Hero Slider Functions
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start auto slide
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    // Event listeners for slider controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                clearInterval(slideInterval);
                currentSlide = index;
                showSlide(currentSlide);
                startSlideInterval();
            });
        });
        
        // Initialize slider
        showSlide(currentSlide);
        startSlideInterval();
    }
    
    // Animate stats counter when in viewport
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const increment = target / 100;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 20);
            } else {
                stat.innerText = target;
            }
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Start animation when stats section is in viewport
    let statsAnimated = false;
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats');
        if (statsSection && isInViewport(statsSection) && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active menu item on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission with validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (valid) {
                // Simulating form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'Enviando...';
                submitBtn.disabled = true;
                
                // Fake a delay to simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = 'Mensaje Enviado';
                    submitBtn.style.backgroundColor = '#43b024';
                    
                    // Reset form after success
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = 'Enviar Mensaje';
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                    }, 3000);
                }, 1500);
            }
        });
        
        // Reset validation styles on input
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailInput.style.borderColor = 'red';
                return;
            }
            
            submitBtn.innerHTML = 'Suscrito';
            submitBtn.style.backgroundColor = '#43b024';
            emailInput.disabled = true;
            submitBtn.disabled = true;
            
            setTimeout(() => {
                newsletterForm.reset();
                submitBtn.innerHTML = 'Suscribirse';
                submitBtn.style.backgroundColor = '';
                emailInput.disabled = false;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.about-content, .service-card, .project-card');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on page load
});