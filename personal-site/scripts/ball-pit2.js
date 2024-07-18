let page = 1;
let fetching = false;
const container = document.getElementById('the-ball-pit');
const cols = Array.from(container.getElementsByClassName('homunculus'));
console.log(cols)

const fetchImageData = async () => {
    try {
        fetching = true;
        const response = await fetch ('images/color.json');
        const data = await response.json();
        fetching = false;
        return data.message;
    } catch (error) {
        console.error("Error fetching data:", error);
        fetching = false;
        throw error;
    }
};

fetchImageData().then((images) => {
    if (images.length > 0) {
        images.forEach((imageData, index) => {
            createCard(imageData, cols[index % cols.length]);

            console.log(index % cols.length)
        });
    }
}).catch((error) => {
    console.error("Error initial fetch:", error);
});

const createCard = (imageData, col) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.style.width = "100%";
    img.onerror = function () {
        this.parentElement.style.display = "none";
    };
    card.appendChild(img);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.textContent = imageData.overlay;
    card.appendChild(overlay);

    col.appendChild(card);
};