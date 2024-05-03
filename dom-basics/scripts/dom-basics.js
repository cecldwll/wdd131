let fullName = "Caitlyn Caldwell";
// // // TEMP:
// // // console.log(fullName)

// // // fullName = "Ty Harvey";
// // // //TEMP:
// // // console.log(fullName)

const h1 = document.querySelector("h1");
h1.innerHTML += '<em>' + fullName + '</em>';

const section = document.createElement("section");
const h2 = document.createElement("h2");
h2.textContent = "Section 3";
const p = document.createElement("p");
p.textContent = "This is a paragraph in section 3";


section.appendChild(h2);
section.appendChild(p);
document.body.appendChild(section)

//document.querySelector("h1").innerHTML = '<em>${fullName}</em>';


//DOM Basics
const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Random image from picsum.");
document.body.appendChild(newImage);

const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

const newSection = document.createElement("section");
newSection.innerHTML = "<h2>DOM Basics</h2><p>This was added through Javascript</p>";
document.body.appendChild(newSection);