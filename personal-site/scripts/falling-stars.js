document.addEventListener('DOMContentLoaded', () => {
    const starBg = document.querySelector('.star-bg');

    function createStars() {
        for (let i = 0; i < 150; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 150}vw`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starBg.appendChild(star);
        }
    }

    createStars();

    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            starBg.classList.add('fade-out');
        }, 5000); // Adjust timing as needed
    });
});
