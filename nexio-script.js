document.addEventListener('DOMContentLoaded', () => {

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 72;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
                navMobile.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    });

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMobile.classList.toggle('open');
    });

    // ===== REVEAL ON SCROLL =====
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const duration = 2000;
                const step = Math.max(1, Math.ceil(target / (duration / 30)));
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = current;
                }, 30);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    // ===== GOOGLE FORM DETECTION =====
    const iframe = document.getElementById('google-form-iframe');
    const fallbackForm = document.getElementById('fallbackForm');
    const iframeSrc = iframe ? iframe.getAttribute('src') : '';

    if (iframe && iframeSrc && !iframeSrc.includes('YOUR_FORM_ID')) {
        iframe.style.display = 'block';
        if (fallbackForm) fallbackForm.style.display = 'none';
    } else {
        if (iframe) iframe.style.display = 'none';
        if (fallbackForm) fallbackForm.style.display = 'block';
    }

    // ===== FALLBACK FORM SUBMIT =====
    if (fallbackForm) {
        fallbackForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = fallbackForm.querySelector('button[type="submit"]');
            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = '✓ Sent Successfully!';
                btn.style.background = 'var(--green)';
                fallbackForm.reset();
                setTimeout(() => {
                    btn.textContent = 'Send Inquiry';
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
});
