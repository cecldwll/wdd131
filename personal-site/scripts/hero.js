window.addEventListener('load', () => {
    const images = document.querySelectorAll('.bg img');
    const loadingScreen = document.getElementById('loading-screen');
    const starBg = document.querySelector('.star-bg');

    // After the loading screen fades out
    loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.style.display = 'none';
    });

    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.display = 'block';
            img.style.opacity = '1';
            img.style.transform = 'scale(1.05)';
        }, index * 3000); // Adjust timing as needed
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Start the falling stars animation
    startStars();

    // Stop the stars and fade them out before the loading screen fades out
    setTimeout(() => {
        stopStars();
        const starBg = document.querySelector('.star-bg');
        starBg.classList.add('fade-out');
    }, 5500); // Time until the stars start fading out

    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.classList.add('fade-out');

        // Wait for the fade-out transition to finish before setting display to 'none'
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 3000); // Match this with transition duration
    }, 5500); // Time until the fade-out starts (including star fade-out time)
});

document.addEventListener('DOMContentLoaded', () => {
    const parentBgE1 = document.querySelector('.bg');
    const homeLink = document.querySelector('.container .text a:first-child');
    const homeSpan = homeLink.querySelector('span');
    const homeId = homeSpan.getAttribute('data-id');
    const homeBgE1 = parentBgE1.querySelector(`.id-${homeId}`);

    parentBgE1.querySelectorAll("img").forEach(img => {
        img.style.display = 'none';
    });
    homeBgE1.style.display = 'block';
    animateImage(homeBgE1);

    const linksEls = document.querySelectorAll('.container .text a');
    
    linksEls.forEach(link => {
        link.addEventListener('mouseover', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const id = link.querySelector('span').getAttribute('data-id');
            const bgE1 = parentBgE1.querySelector(`.id-${id}`);

            parentBgE1.querySelectorAll("img").forEach(img => {
                img.style.display = 'none';
            });
            bgE1.style.display = 'block';
            animateImage(bgE1);
        });
    });
});

function animateImage(element) {
    element.style.opacity = '0.6';
    element.style.transform = 'scale(1)';
    let opacity = 0.6;
    let scale = 1;

    const animation = setInterval(() => {
        opacity += 0.04; // Adjust the increment for smoother animation
        scale += 0.01; // Adjust the increment for smoother animation

        if (opacity >= 1) {
            clearInterval(animation);
            return;
        }

        element.style.opacity = opacity;
        element.style.transform = `scale(${scale})`;
    }, 25); // Adjust the interval for smoother animation
}

function startStars() {
    const starBg = document.querySelector('.star-bg');
    starBg.style.display = 'block'; // Ensure the star background is visible
    console.log('Starting stars'); // Debug statement

    function createStars() {
        for (let i = 0; i < 150; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 150}vw`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starBg.appendChild(star);
            console.log(`Star ${i} created`); // Debug statement
        }
    }

    createStars();
    console.log(`Total stars: ${starBg.children.length}`); // Debug statement
}

function stopStars() {
    const starBg = document.querySelector('.star-bg');
    starBg.innerHTML = ''; // Remove all star elements
}
