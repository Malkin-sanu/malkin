document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Background Floating Hearts effect - only if not strictly reduced motion
    if (!prefersReducedMotion) {
        createFloatingHearts(isMobile);
    }

    // Pause animations when tab is not visible to save CPU/battery
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            document.body.classList.add('pause-animations');
        } else {
            document.body.classList.remove('pause-animations');
        }
    });

    // Cake Candle Logic
    const candles = document.querySelectorAll('.candle');
    const finalMessage = document.getElementById('final-message');
    let blownOutCount = 0;

    if (candles.length > 0) {
        candles.forEach(candle => {
            candle.addEventListener('click', function() {
                const flame = this.querySelector('.flame');
                if (flame && !flame.classList.contains('blown-out')) {
                    flame.classList.add('blown-out');
                    blownOutCount++;

                    // Create smoke effect placeholder
                    const smoke = document.createElement('div');
                    smoke.style.position = 'absolute';
                    smoke.style.top = '-30px';
                    smoke.style.left = '5px';
                    smoke.style.width = '10px';
                    smoke.style.height = '10px';
                    smoke.style.background = 'gray';
                    smoke.style.borderRadius = '50%';
                    smoke.style.opacity = '0.5';
                    smoke.style.animation = 'fadeOutUp 1s forwards';
                    this.appendChild(smoke);
                    
                    if (blownOutCount === candles.length) {
                        setTimeout(() => {
                            if (finalMessage) {
                                finalMessage.classList.add('show');
                            }
                            if (!prefersReducedMotion) {
                                launchHeartConfetti(isMobile);
                            }
                        }, 500);
                    }
                }
            });
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOutUp {
            0% { opacity: 0.7; transform: translate3d(0, 0, 0) scale(1); }
            100% { opacity: 0; transform: translate3d(0, -50px, 0) scale(3); }
        }
    `;
    document.head.appendChild(style);
});

function createFloatingHearts(isMobile) {
    const container = document.body;
    const heartsList = ['❤️', '💖', '💕', '💑', '👩‍❤️‍👨', '🌹', '✨'];
    // Completely disable particle layer on mobile for max performance
    const count = isMobile ? 0 : 35;
    
    if (count === 0) return; // Exit early

    // Use DocumentFragment for batched DOM insertion (performance)
    const fragment = document.createDocumentFragment();

    for(let i=0; i<count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartsList[Math.floor(Math.random() * heartsList.length)];
        heart.classList.add('bg-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 6 + 4) + 's'; /* 4s to 10s fall */
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        fragment.appendChild(heart);
    }
    
    container.appendChild(fragment);
}

function launchHeartConfetti(isMobile) {
    // Reduce confetti count on mobile
    const count = isMobile ? 25 : 60;
    for (let i = 0; i < count; i++) {
        createHeartPiece();
    }
}

function createHeartPiece() {
    const confetti = document.createElement('div');
    const hearts = ['❤️', '💖', '💕', '💗', '💓'];
    
    confetti.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    confetti.style.position = 'fixed';
    confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
    confetti.style.top = '-50px';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.opacity = Math.random() * 0.5 + 0.5;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.willChange = 'transform, opacity'; // Hardware acceleration hint
    
    document.body.appendChild(confetti);

    const animationDuration = Math.random() * 3 + 2;
    
    confetti.animate([
        { transform: `translate3d(0,0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
        duration: animationDuration * 1000,
        easing: 'cubic-bezier(.37,0,.63,1)',
        fill: 'forwards'
    }).onfinish = () => confetti.remove();
}
