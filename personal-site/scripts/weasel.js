const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".really-awesome-container img");
const full = document.querySelector(".modal-content");

previews.forEach(preview => {
    preview.addEventListener("click", () => {
        modal.classList.add("open");
        full.classList.add("open");
        const fullSrc = preview.getAttribute("src");
        full.src = fullSrc;
    });
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
        full.classList.remove("open");
    }
});
