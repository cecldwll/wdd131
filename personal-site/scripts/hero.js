
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.bg img');
    const loadingScreen = document.getElementById('loading-screen');
    const starBg = document.querySelector('.star-bg');

    // Hide loading screen after fade-out
    loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.style.display = 'none';
    });

    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.display = 'block';
            img.style.opacity = '1';
            img.style.transform = 'scale(1.05)';
        }, index * 1000); // Adjusted timing for faster loading
    });
});

document.addEventListener('DOMContentLoaded', () => {
    startStars();

    setTimeout(() => {
        stopStars();
        document.querySelector('.star-bg').classList.add('fade-out');
    }, 5500); // Adjusted timing for faster star fade-out

    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');

        // Hide loading screen after fade-out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000); // Faster fade-out transition
    }, 5500);
});

document.addEventListener('DOMContentLoaded', () => {
    const parentBgEl = document.querySelector('.bg');
    const homeLink = document.querySelector('.container .text a:first-child');
    const homeSpan = homeLink.querySelector('span');
    const homeId = homeSpan.getAttribute('data-id');
    const homeBgEl = parentBgEl.querySelector(`.id-${homeId}`);

    parentBgEl.querySelectorAll("img").forEach(img => {
        img.style.display = 'none';
    });
    homeBgEl.style.display = 'block';
    animateImage(homeBgEl);

    const linksEls = document.querySelectorAll('.container .text a');
    
    linksEls.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            const id = link.querySelector('span').getAttribute('data-id');
            const bgEl = parentBgEl.querySelector(`.id-${id}`);

            parentBgEl.querySelectorAll("img").forEach(img => {
                img.style.display = 'none';
            });
            bgEl.style.display = 'block';
            animateImage(bgEl);
        });
    });
});

function animateImage(element) {
    element.style.opacity = '0.6';
    element.style.transform = 'scale(1)';
    let opacity = 0.6;
    let scale = 1;

    const animation = setInterval(() => {
        opacity += 0.04; 
        scale += 0.01;

        if (opacity >= 1) {
            clearInterval(animation);
            return;
        }

        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;
    }, 25);
}

function startStars() {
    const starBg = document.querySelector('.star-bg');
    starBg.style.display = 'block'; 

    function createStars() {
        for (let i = 0; i < 150; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}vw`; // Adjusted for better performance
            star.style.animationDelay = `${Math.random() * 5}s`;
            starBg.appendChild(star);
        }
    }

    createStars();
}

function stopStars() {
    document.querySelector('.star-bg').innerHTML = ''; 
}

