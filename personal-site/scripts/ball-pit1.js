let page = 1;
let fetching = false;
const container = document.getElementById('the-ball-pit');
const cols = Array.from(container.getElementsByClassName('really-awesome-container'));
console.log(cols);

const fetchImageData = async () => {
    try {
        fetching = true;
        const response = await fetch('images/bw.json');
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

    console.log(previews); // Check if previews are selected
    console.log(modal); // Check if modal is selected
    console.log(full); // Check if full is selected

    previews.forEach(preview => {
        preview.addEventListener("click", () => {
            console.log('Image clicked'); // Check if click event is registered
            modal.classList.add("open");
            full.classList.add("open");
            const fullSrc = preview.getAttribute("src");
            full.src = fullSrc;
        });
    });

    modal.addEventListener("click", (e) => {
        console.log('Modal clicked'); // Check if modal click event is registered
        if (e.target === modal || e.target === full) {
            modal.classList.remove("open");
            full.classList.remove("open");
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




//Infinite scroll
// const handleScroll = () => {
//     if (fetching) return;

//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const windowHeight = window.innerHeight;
//     const bodyHeight = document.documentElement.scrollHeight;

//     if (bodyHeight - scrollTop - windowHeight < 800) {
//         page++;
//         fetchImageData().then((images) => {
//             if (images.length > 0) {
//                 images.forEach((image, index) => {
//                     createCard(image, cols[index % cols.length]);
//                 });
//             }
//         }).catch((error) => {
//             console.error("Error handling scroll:", error);
//         });
//     }
// };

// window.addEventListener('scroll', handleScroll);