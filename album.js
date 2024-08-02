import { BUBBLE, MEMORY, LOVE_IMAGE } from "./constant.js";

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const pageIndex = document.querySelector("#page-index");

// Event listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business logic
let currentLocation = 0;
let numOfPages = BUBBLE.MAX_PICTURE * 3;
let maxLocation = numOfPages + 1;

/* -------- Enhance logic ---------- */

createAlbum();
let papers = document.querySelectorAll(".paper");
updateAlbumCover();
// addPicture(0);

function createAlbum() {
  for (let i = 0; i < numOfPages + 1; i++) {
    /* --- Front page --- */
    const paper = document.createElement("div");
    paper.classList.add("paper");
    paper.setAttribute("id", `p${i}`);
    paper.style.zIndex = numOfPages + 1 - i;

    const front = document.createElement("div");
    front.classList.add("front");

    const frontContent = document.createElement("div");
    frontContent.classList.add("front-content");
    frontContent.setAttribute("id", `f${i}`);

    const description = document.createElement("div");
    description.classList.add(`${i == 0 ? "front-cover" : "page-description"}`);
    frontContent.appendChild(description);

    front.appendChild(frontContent);

    /* --- Back page --- */
    const back = document.createElement("div");
    back.classList.add("back");

    const backContent = document.createElement("div");
    backContent.classList.add("back-content");
    backContent.setAttribute("id", `b${i}`);

    const rim1 = document.createElement("h3");
    rim1.textContent =
      "\u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764";
    backContent.appendChild(rim1);

    const picture = document.createElement("div");
    picture.classList.add("page-picture");
    backContent.appendChild(picture);

    const rim2 = document.createElement("h3");
    rim2.textContent =
      "\u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764 \u2764";
    backContent.appendChild(rim2);

    back.appendChild(backContent);

    /* --- Pages --- */
    paper.appendChild(front);
    paper.appendChild(back);
    book.appendChild(paper);
  }
}

function openBook() {
  book.style.transform = "translateX(50%)";
  prevBtn.style.transform = "translateX(-180px)";
  nextBtn.style.transform = "translateX(180px)";
  pageIndex.style.transform = "translateX(50%)";
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
    papers[currentLocation].style.zIndex = currentLocation + 1;

    if (currentLocation == numOfPages) {
      closeBook();
    }
    if (currentLocation < numOfPages) {
      // No adding picture is last paper (book cover)
      addPicture(currentLocation);
    }
    currentLocation++;
    updatePageIndex();
  }
}

function goPrevPage() {
  if (currentLocation > 0) {
    if (currentLocation == 1) {
      closeBook(true);
    } else if (currentLocation == numOfPages + 1) {
      openBook();
    }
    papers[currentLocation - 1].classList.remove("flipped");
    papers[currentLocation - 1].style.zIndex = numOfPages + 2 - currentLocation;
    addPicture(currentLocation - 1);
    currentLocation--;
    updatePageIndex();
  }
}

function addPicture(id) {
  const back = papers[id].querySelector(".back-content");
  const i1 = Math.floor(id / LOVE_IMAGE.MAX);
  const i2 = id % LOVE_IMAGE.MAX;
  const picId = `i${i1}n${i2}`;
  const picture = back.querySelector(".page-picture");

  picture.style.backgroundImage = `url(${LOVE_IMAGE.PATH}${picId}.jpg)`;
  picture.style.backgroundPosition = "center";
  picture.style.backgroundRepeat = "no-repeat";
  picture.style.backgroundSize = "contain";

  if (id < numOfPages) {
    const front = papers[id + 1].querySelector(".front-content");
    const desc = front.querySelector(".page-description");
    if (MEMORY.hasOwnProperty(picId)) {
      desc.innerText = `\u2764 ${MEMORY[picId]}`;
    }
  }
}

function updatePageIndex() {
  pageIndex.textContent = `${currentLocation}/${
    BUBBLE.MAX_PICTURE * LOVE_IMAGE.MAX
  }`;
}

function updateAlbumCover() {
  const frontCover = document.querySelector(".front-cover");
  frontCover.style.backgroundImage = `url("./front_cover.jpg")`;
  frontCover.style.backgroundPosition = "center";
  frontCover.style.backgroundRepeat = "no-repeat";
  frontCover.style.backgroundSize = "contain";
}
