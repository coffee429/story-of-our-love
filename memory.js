import { BUBBLE, MEMORY, LOVE_IMAGE } from "./constant.js";

const bubbleRemovalThreshold = 0; // Threshold for bubble removal (top of the screen)
const bubbleContainer = document.querySelector(".love-bubble-container");
let previousIndex = -1;
let currentIndex = -1;

// Slider effect variable
const backImg = document.getElementById("backImage");
const nextImg = document.getElementById("nextImage");
const dots = document.querySelectorAll(".dot");
let imgId;

let currentImageIndex = 0;
function getRandomImage() {
  if (currentIndex === -1) {
    // Initial case or when currentIndex has reached maxLovePicture
    currentIndex = Math.floor(Math.random() * BUBBLE.MAX_PICTURE);
  } else {
    // Generate a new random index that is different from the previous index
    do {
      currentIndex = Math.floor(Math.random() * BUBBLE.MAX_PICTURE);
    } while (currentIndex === previousIndex);
  }

  // Update the previous index for the next iteration
  previousIndex = currentIndex;
  return `i${currentIndex}n0`;
}

function createBubble() {
  const bubble = document.createElement("div");
  const id = getRandomImage();
  bubble.classList.add("love-bubble");
  bubble.setAttribute("id", id);
  bubble.style.backgroundImage = `url(${LOVE_IMAGE.PATH}${id}.jpg)`;
  bubble.style.backgroundPosition = "center";
  bubble.style.backgroundRepeat = "no-repeat";
  bubble.style.backgroundSize = "cover";
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubble.style.bottom = "0";
  const randomSize =
    Math.floor(Math.random() * BUBBLE.ADD_SIZE) + BUBBLE.MIN_SIZE; // Random size between 30px and 70px
  bubble.style.width = `${randomSize}px`;
  bubble.style.height = `${randomSize}px`;
  bubble.addEventListener("click", (e) => {
    readBubbleMemory(e);
  });
  bubbleContainer.appendChild(bubble);

  function updateBubblePosition() {
    const currentPosition = parseFloat(bubble.style.bottom);
    const newPosition = currentPosition + BUBBLE.SPEED;
    bubble.style.bottom = `${newPosition}px`;

    if (newPosition <= bubbleRemovalThreshold) {
      bubbleContainer.removeChild(bubble);
      clearInterval(updatePositionInterval);
    }
  }

  const updatePositionInterval = setInterval(
    updateBubblePosition,
    BUBBLE.UPDATE_POSTION_PERIOD
  );
}

function startBubbleGeneration() {
  setInterval(createBubble, BUBBLE.GENERATION_DELAY);
}

function readBubbleMemory(e) {
  currentImageIndex = 0;
  const id = e.target.id;
  imgId = id;
  updateImage();
  updateButtons();
  const loveMemory = document.querySelector(".love-memory");
  loveMemory.style.display = "block";
  const loveMemoryImg = loveMemory.querySelector(".love-memory-image");
  loveMemoryImg.style.backgroundImage = `url(${LOVE_IMAGE.PATH}${id}.jpg)`;
  loveMemoryImg.style.backgroundPosition = "center";
  loveMemoryImg.style.backgroundRepeat = "no-repeat";
  loveMemoryImg.style.backgroundSize = "cover";
  const loveMemoryDesciption = loveMemory.querySelector(
    ".love-memory-description"
  );
  if (MEMORY.hasOwnProperty(id)) {
    loveMemoryDesciption.innerText = `\u2764 ${MEMORY[id]}`;
  }
}

startBubbleGeneration(); // Start bubble generation after 1 second
const closeBtn = document.querySelector(".close-button");
const loveMemory = document.querySelector(".love-memory");

closeBtn.addEventListener("click", () => {
  loveMemory.style.display = "none";
});

// Image slider
// JavaScript logic for handling button clicks

backImg.addEventListener("click", () => {
  currentImageIndex--;
  updateImage();
  updateButtons();
});

nextImg.addEventListener("click", () => {
  currentImageIndex++;

  updateImage();
  updateButtons();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentImageIndex = index;
    updateImage();
    updateButtons();
  });
});

function updateImage() {
  let currentImageId = imgId;
  console.log(BUBBLE.MAX_PICTURE);
  const currentImageSubId = currentImageId.slice(0, -1) + currentImageIndex;
  let imagesUrl = [];
  for (let n = 0; n < LOVE_IMAGE.MAX; n++) {
    const newImgIndex = currentImageSubId.slice(0, -1) + n;
    const newImgUrl = `url(${LOVE_IMAGE.PATH}${newImgIndex}.jpg)`;
    imagesUrl.push(newImgUrl);
  }

  const loveMemoryImg = document.querySelector(".love-memory-image");
  loveMemoryImg.style.backgroundImage = imagesUrl[currentImageIndex];
  loveMemoryImg.style.backgroundPosition = "center";
  loveMemoryImg.style.backgroundRepeat = "no-repeat";
  loveMemoryImg.style.backgroundSize = "cover";

  const loveMemoryDesciption = loveMemory.querySelector(
    ".love-memory-description"
  );
  if (MEMORY.hasOwnProperty(currentImageSubId)) {
    loveMemoryDesciption.innerText = `\u2764 ${MEMORY[currentImageSubId]}`;
  }

  dots.forEach((dot, index) => {
    if (index === currentImageIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updateButtons() {
  backImg.disabled = currentImageIndex === 0;
  nextImg.disabled = currentImageIndex === LOVE_IMAGE.MAX - 1;
}
