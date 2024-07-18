let page = 1;
let fetching = false;
const container = document.getElementById('the-ball-pit');
const cols = Array.from(container.getElementsByClassName('homunculus'));
console.log(cols);

const fetchImageData = async () => {
    try {
        fetching = true;
        const response = await fetch('images/color.json');
        const data = await response.json();
        fetching = false;
        return data.message;
    } catch (error) {
        console.error("Error fetching data:", error);
        fetching = false;
        throw error;
    }
};

const createCard = (imageData, col) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.classList.add('preview');  // Add class for selecting images later
    img.setAttribute('data', imageData.data); // Set the data attribute
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

const attachEventListeners = () => {
    const previews = document.querySelectorAll(".preview");
    const modal = document.querySelector(".modal");
    const full = document.querySelector(".modal-content");
    const data = document.querySelector(".data");

    console.log(previews); // Check if previews are selected
    console.log(modal); // Check if modal is selected
    console.log(full); // Check if full is selected
    console.log(data); // Check if data is selected

    previews.forEach(preview => {
        preview.addEventListener("click", () => {
            console.log('Image clicked'); // Check if click event is registered
            modal.classList.add("open");
            full.classList.add("open");
            const fullSrc = preview.getAttribute("src");
            const imageData = preview.getAttribute("data"); // Get the data attribute
            full.src = fullSrc;
            data.classList.add("open");
            data.textContent = imageData; // Set the data text content
        });
    });

    modal.addEventListener("click", (e) => {
        console.log('Modal clicked'); // Check if modal click event is registered
        if (e.target === modal || e.target === full) {
            modal.classList.remove("open");
            full.classList.remove("open");
            data.classList.remove("open");
        }
    });
};

fetchImageData().then((images) => {
    if (images.length > 0) {
        images.forEach((imageData, idx) => {
            createCard(imageData, cols[idx % cols.length]);
        });

        console.log('Images loaded'); // Confirm images are loaded
        // Attach event listeners after images are added
        attachEventListeners();
    }
}).catch((error) => {
    console.error("Error initial fetch:", error);
});