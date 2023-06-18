const heart = document.getElementById("love-heart");
const imageFolderPath = "image/love/";
const maxLovePicture = 51;

heart.innerText = calculateLoveDays();
function calculateLoveDays() {
  const sampleDate = new Date("2023-06-07");
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - sampleDate.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

const bubbleContainer = document.querySelector(".love-bubble-container");

let previousIndex = -1;
let currentIndex = -1;

function getRandomImage() {
  if (currentIndex === -1) {
    // Initial case or when currentIndex has reached maxLovePicture
    currentIndex = Math.floor(Math.random() * maxLovePicture) + 1;
  } else {
    // Generate a new random index that is different from the previous index
    do {
      currentIndex = Math.floor(Math.random() * maxLovePicture) + 1;
    } while (currentIndex === previousIndex);
  }

  // Update the previous index for the next iteration
  previousIndex = currentIndex;
  console.log(currentIndex);
  return `${currentIndex}.jpg`;
}

let bubbleInterval;
const bubbleGenerationDelay = 1000; // 1 second
const bubbleFloatingSpeed = 2; // Speed of the bubble floating (pixels per frame)
const bubbleRemovalThreshold = 0; // Threshold for bubble removal (top of the screen)

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("love-bubble");
  bubble.style.backgroundImage = `url(${imageFolderPath}${getRandomImage()})`;
  bubble.style.backgroundPosition = "center";
  bubble.style.backgroundRepeat = "no-repeat";
  bubble.style.backgroundSize = "cover";
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubble.style.bottom = "0";
  const randomSize = Math.floor(Math.random() * 50) + 100; // Random size between 30px and 70px
  bubble.style.width = `${randomSize}px`;
  bubble.style.height = `${randomSize}px`;
  bubbleContainer.appendChild(bubble);

  function updateBubblePosition() {
    const currentPosition = parseFloat(bubble.style.bottom);
    const newPosition = currentPosition + bubbleFloatingSpeed;

    bubble.style.bottom = `${newPosition}px`;

    if (newPosition <= bubbleRemovalThreshold) {
      bubbleContainer.removeChild(bubble);
      clearInterval(updatePositionInterval);
    }
  }

  const updatePositionInterval = setInterval(updateBubblePosition, 16); // 60 frames per second
}

function startBubbleGeneration() {
  bubbleInterval = setInterval(createBubble, bubbleGenerationDelay);
}

function stopBubbleGeneration() {
  clearInterval(bubbleInterval);
}

startBubbleGeneration(); // Start bubble generation after 1 second

/* ---------------- Heart trace effect ---------------- */
let isCreatingHeart = false;
document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
  if (!isCreatingHeart) {
    isCreatingHeart = true;
    setTimeout(() => {
      generateHeart(event);
      isCreatingHeart = false;
    }, 100); // Delay of 0.5 seconds
  }
}

function generateHeart(event) {
  const heart = document.createElement("i");
  heart.classList.add("fas", "fa-heart", "heart");
  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000); // Remove the heart element after 3 seconds
}
