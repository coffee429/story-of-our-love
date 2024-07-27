import { BUBBLE, MEMORY } from "../constant.js";

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Event listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business logic
let currentLocation = 0;
let numOfPages = BUBBLE.MAX_PICTURE;
let maxLocation = numOfPages + 1;

/* -------- Enhance logic ---------- */

createAlbum();
let papers = document.querySelectorAll(".paper");

function createAlbum() {
  for (let i = 0; i < numOfPages; i++) {
    const paper = document.createElement("div");
    paper.classList.add("paper");
    paper.setAttribute("id", `p${i}`);

    const front = document.createElement("div");
    front.classList.add("front");

    const frontContent = document.createElement("div");
    frontContent.classList.add("front-content");
    frontContent.setAttribute("id", `f${i}`);
    front.appendChild(frontContent);

    const back = document.createElement("div");
    back.classList.add("back");

    const backContent = document.createElement("div");
    backContent.classList.add("back-content");
    backContent.setAttribute("id", `b${i}`);
    back.appendChild(backContent);

    paper.appendChild(front);
    paper.appendChild(back);
    book.appendChild(paper);
  }
}

function openBook() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
  if (isAtBeginning) {
    book.style.transform = "translateX(0%)";
  } else {
    book.style.transform = "translateX(100%)";
  }
  prevBtn.style.transform = "translateX(0px)";
  nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    if (currentLocation == 0) {
      openBook();
    }

    papers[currentLocation].classList.add("flipped");
    papers[currentLocation].style.zIndex = currentLocation;

    if (currentLocation == numOfPages - 1) {
      closeBook();
    }
    currentLocation++;
  }
}

function goPrevPage() {
  if (currentLocation > 0) {
    if (currentLocation == 1) {
      closeBook(true);
    } else if (currentLocation == numOfPages) {
      openBook();
    }
    papers[currentLocation - 1].classList.remove("flipped");
    papers[currentLocation - 1].style.zIndex = numOfPages + 1 - currentLocation;
    currentLocation--;
  }
}
