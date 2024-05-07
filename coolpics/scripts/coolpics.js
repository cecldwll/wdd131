// fix the menu
const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
  const menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    if (menu.classList.contains("hide")) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  });
}

menuButton.addEventListener("click", toggleMenu);

// handle the window resize event
function handleResize() {
  const menus = document.querySelectorAll(".menu");
  menus.forEach((menu) => {
    if (window.innerWidth > 700) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  });
}

handleResize();
window.addEventListener("resize", handleResize);

// image viewer
function viewerTemplate(pic, alt) {
  return `<div class="viewer">
      <span class="close-viewer">X</span>
      <img src="${pic}" alt="${alt}">
      </div>`;
}

document.querySelectorAll(".gallery img").forEach((image) => {
  image.addEventListener("click", viewHandler);
});

function viewHandler(event) {
  // create a variable to hold the element that was clicked on from event.target
  const imgElement = event.target;

  // get the src attribute from that element and 'split' it on the "-"
  const src = imgElement.src;
  const parts = src.split("-sm");

  // construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
  const fullImageSrc = `${parts[0]}-full.jpeg`;
  const altText = imgElement.alt;

  // insert the viewerTemplate into the top of the body element
  const viewerHTML = viewerTemplate(fullImageSrc, altText);

  // (element.insertAdjacentHTML("afterbegin", htmltoinsert))
  document.body.insertAdjacentHTML("afterbegin", viewerHTML);

  // add a listener to the close button (X) that calls a function called closeViewer when clicked
  document
    .querySelector(".close-viewer")
    .addEventListener("click", closeViewer);
}

// Function to close the viewer
function closeViewer() {
  const viewer = document.querySelector(".viewer");
  if (viewer) {
    viewer.remove();
  }
}

// Ensure that viewer is set up correctly on page load and when resizing
function setupViewerOnLoad() {
  handleResize(); // Ensures menu is correctly shown or hidden on load
  window.addEventListener("resize", handleResize); // Continues to apply correct menu visibility on resize
}

// Call setup function on page load
setupViewerOnLoad();
