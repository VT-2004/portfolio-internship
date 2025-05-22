document.addEventListener('DOMContentLoaded', () => {
    // Updated navLinks to include the new #skills link
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const currentYearSpan = document.getElementById('currentYear');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to set the theme
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Save theme preference
        // Update the theme toggle icon
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    };

    // Check for saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Default to light theme if no preference is saved
        setTheme('light');
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    });

    // Highlight active nav link on scroll
    const highlightActiveNavLink = () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for fixed header
            if (pageYOffset >= sectionTop - 80 && pageYOffset < sectionTop + sectionHeight - 80) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNavLink);
    // Call on load to set initial active link if page is scrolled
    highlightActiveNavLink();

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
    });

    // NEW: Close menu if clicking outside of it on mobile
    document.addEventListener('click', (event) => {
        // Check if the click is outside the nav and not on the menu toggle itself, and if the nav is currently active
        if (!navUl.contains(event.target) && !menuToggle.contains(event.target) && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
        }
    });

    // NEW: Close menu if 'Escape' key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navUl.classList.contains('active')) {
            navUl.classList.remove('active');
        }
    });

    // Contact Form Validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (name === '' || email === '' || subject === '' || message === '') {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            return;
        }

        // Basic email format validation
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            return;
        }

        // For this client-side only demo:
        formMessage.textContent = 'Message sent successfully! (This is a client-side demo. No actual email sent.)';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        contactForm.reset(); // Clear the form

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000); // Hide message after 5 seconds
    });

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Set initial active link for Home if at top of page
    if (window.pageYOffset === 0) {
        document.querySelector('a[href="#home"]').classList.add('active');
    }
});
