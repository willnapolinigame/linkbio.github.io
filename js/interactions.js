function setupInteractions() {
    const interactionElements = document.querySelectorAll('.bento-item, .social-item, .github-link');

    interactionElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('social-item') || this.classList.contains('github-link')) {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            }
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        element.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.2);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    if (!document.querySelector('#ripple-styles')) {
        const rippleStyles = document.createElement('style');
        rippleStyles.id = 'ripple-styles';
        rippleStyles.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
    }
}
