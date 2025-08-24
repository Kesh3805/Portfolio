document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;

        cursorOutline.animate([
            { left: `${clientX}px`, top: `${clientY}px` }
        ], { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.opacity = '0.5';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.opacity = '1';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    const API_BASE_URL = window.location.origin + '/api';

    // Mobile Navigation Toggle with Enhanced Animations
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;
    
    if (navToggle && navMenu) {
        // Toggle menu function
        const toggleMenu = () => {
            const isOpen = navMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isOpen);
            body.style.overflow = isOpen ? 'hidden' : '';
            
            // Add/remove no-scroll class to body when menu is open/closed
            if (isOpen) {
                body.classList.add('no-scroll');
            } else {
                // Wait for the close animation to complete before removing the class
                setTimeout(() => {
                    if (!navMenu.classList.contains('active')) {
                        body.classList.remove('no-scroll');
                    }
                }, 500);
            }
            
            // Toggle aria-expanded for accessibility
            navToggle.setAttribute('aria-expanded', isOpen);
        };
        
        // Toggle menu on button click
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                toggleMenu();
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu();
                navToggle.focus();
            }
        });
        
        // Improve keyboard navigation in the menu
        const navLinks = navMenu.querySelectorAll('a');
        const firstLink = navLinks[0];
        const lastLink = navLinks[navLinks.length - 1];
        
        navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                // Close menu when pressing Enter or Space on a link
                if (e.key === 'Enter' || e.key === ' ') {
                    toggleMenu();
                }
                
                // Trap focus within the menu when open
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstLink) {
                        e.preventDefault();
                        lastLink.focus();
                    } else if (!e.shiftKey && document.activeElement === lastLink) {
                        e.preventDefault();
                        firstLink.focus();
                    }
                }
            });
        });
    }

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }


    // Active nav link highlighting
    window.addEventListener('scroll', debounce(() => {
        const sections = document.querySelectorAll('section');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));

    // Animate elements on scroll with Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'show');
                // Optional: unobserve after revealing to prevent re-triggering
                // observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .hidden, .section-title, .about-text, .about-image, .skill-category, .project-card, .contact-info, .contact-form, .timeline-item').forEach(el => revealObserver.observe(el));

    // Visitor tracking
    async function trackVisitor() {
        try {
            const sessionId = sessionStorage.getItem('portfolio_session') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            sessionStorage.setItem('portfolio_session', sessionId);
            await fetch(`${API_BASE_URL}/analytics/visit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: window.location.pathname, referrer: document.referrer, sessionId })
            });
        } catch (error) {
            console.log('Analytics tracking failed:', error);
        }
    }
    trackVisitor();

    // Counter animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const update = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(update);
            } else {
                element.textContent = target + '+';
            }
        };
        update();
    }
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(stat => animateCounter(stat, parseInt(stat.textContent)));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) statsObserver.observe(aboutStats);

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            if (!data.name || !data.email || !data.subject || !data.message || !/^[^ -\s@]+@[^ -\s@]+\.[^ -\s@]+$/.test(data.email)) {
                return showNotification('Please fill all fields correctly.', 'error');
            }
            const btn = contactForm.querySelector('button');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            try {
                const response = await fetch(`${API_BASE_URL}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
                const result = await response.json();
                showNotification(result.message, result.success ? 'success' : 'error');
                if (result.success) contactForm.reset();
            } catch (error) {
                showNotification('Network error. Please try again.', 'error');
            } finally {
                btn.textContent = 'Send Message';
                btn.disabled = false;
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        document.querySelector('.notification')?.remove();
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `<span>${message}</span><button class="notification-close">&times;</button>`;
        document.body.appendChild(notification);
        notification.querySelector('.notification-close').onclick = () => notification.remove();
        setTimeout(() => notification.remove(), 5000);
    }

    // Parallax effect
    const heroContent = document.querySelector('.hero-container');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            heroContent.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        });
    }

    // Scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    window.addEventListener('scroll', () => {
        scrollToTopBtn.classList.toggle('visible', window.scrollY > 300);
    });
    scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Load projects
    async function loadProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        try {
            const response = await fetch('/api/projects?featured=true');
            const { data: projects } = await response.json();
            projectsGrid.innerHTML = projects.map(p => `
                <div class="project-card reveal">
                    <div class="project-image">
                        <img src="${p.imageUrl}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="project-content">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        <div class="project-tech">${p.technologies.map(t => `<span>${t}</span>`).join('')}</div>
                        <div class="project-links">
                            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Live</a>` : ''}
                            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                        </div>
                    </div>
                </div>`).join('');
            VanillaTilt.init(document.querySelectorAll('.project-card'), { max: 15, speed: 400, glare: true, "max-glare": 0.2 });
            document.querySelectorAll('.project-card').forEach(el => revealObserver.observe(el));
        } catch (error) {
            projectsGrid.innerHTML = '<p class="error-message">Could not load projects.</p>';
        }
    }
    loadProjects();

    // Populate skills
    const skills = [
        { name: 'JavaScript', icon: 'fab fa-js-square' }, { name: 'TypeScript', icon: 'fas fa-code' },
        { name: 'Python', icon: 'fab fa-python' }, { name: 'Java', icon: 'fab fa-java' },
        { name: 'Go', icon: 'fab fa-golang' }, { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' }, { name: 'SASS', icon: 'fab fa-sass' },
        { name: 'React', icon: 'fab fa-react' }, { name: 'Next.js', icon: 'fas fa-arrow-right' },
        { name: 'Node.js', icon: 'fab fa-node-js' }, { name: 'Express.js', icon: 'fas fa-server' },
        { name: 'Spring Boot', icon: 'fas fa-leaf' }, { name: 'MongoDB', icon: 'fas fa-database' },
        { name: 'PostgreSQL', icon: 'fas fa-database' }, { name: 'GraphQL', icon: 'fas fa-project-diagram' },
        { name: 'Docker', icon: 'fab fa-docker' }, { name: 'Kubernetes', icon: 'fas fa-dharmachakra' },
        { name: 'AWS', icon: 'fab fa-aws' }, { name: 'GCP', icon: 'fab fa-google' },
        { name: 'CI/CD', icon: 'fas fa-cogs' }, { name: 'Terraform', icon: 'fas fa-layer-group' },
        { name: 'Git & GitHub', icon: 'fab fa-github' }, { name: 'Jest', icon: 'fas fa-vial' }
    ];
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        skillsGrid.innerHTML = skills.map(s => `
            <div class="skill-card reveal">
                <i class="${s.icon}"></i>
                <span>${s.name}</span>
            </div>`).join('');
        document.querySelectorAll('.skill-card').forEach(el => revealObserver.observe(el));
    }

    // Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: { number: { value: 60 }, color: { value: '#00ffff' }, shape: { type: 'circle' }, opacity: { value: 0.4, random: true }, size: { value: 2, random: true }, line_linked: { enable: true, distance: 150, color: '#00ffff', opacity: 0.2, width: 1 }, move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out' } },
            interactivity: { events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } }, modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } } },
            retina_detect: true
        });
    }

    // Typewriter effect
    const taglineEl = document.querySelector('.hero-tagline');
    if (taglineEl) {
        const text = taglineEl.getAttribute('data-text');
        let index = 0;
        taglineEl.textContent = '';
        taglineEl.style.borderRight = '2px solid var(--cyan)';
        function type() {
            if (index < text.length) {
                taglineEl.textContent += text.charAt(index++);
                setTimeout(type, 60);
            } else {
                taglineEl.style.borderRightColor = 'transparent';
                taglineEl.classList.add('cursor-blink');
            }
        }
        setTimeout(type, 500);
    }
});
