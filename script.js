document.addEventListener('DOMContentLoaded', () => {
    // Background Floating Hearts effect
    createFloatingHearts();

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
                            launchHeartConfetti();
                        }, 500);
                    }
                }
            });
        });
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeOutUp {
            0% { opacity: 0.7; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-50px) scale(3); }
        }
    `;
    document.head.appendChild(style);
});

function createFloatingHearts() {
    const container = document.body;
    const heartsList = ['❤️', '💖', '💕', '💑', '👩‍❤️‍👨', '🌹', '✨'];
    for(let i=0; i<35; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartsList[Math.floor(Math.random() * heartsList.length)];
        heart.classList.add('bg-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 6 + 4) + 's'; /* 4s to 10s fall */
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        container.appendChild(heart);
    }
}

function launchHeartConfetti() {
    for (let i = 0; i < 60; i++) {
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
