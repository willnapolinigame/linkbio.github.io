function initParallax() {
    let ticking = false;

    function updateParallax(e) {
        if (!ticking) {
            requestAnimationFrame(() => {
                const orbs = document.querySelectorAll('.floating-orb');
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                orbs.forEach((orb, index) => {
                    const speed = (index + 1) * 0.3;
                    const xPos = x * speed * 30;
                    const yPos = y * speed * 30;
                    orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    if (window.matchMedia('(hover: hover)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', updateParallax);
    }
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.bento-item, .social-item').forEach(el => {
        observer.observe(el);
    });
}

function setupResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
        }, 100);
    });

    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}

document.addEventListener('DOMContentLoaded', () => {
    setupInteractions();
    initParallax();
    setupIntersectionObserver();
    setupResizeHandler();
});
