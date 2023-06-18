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
const bubbleGenerationInterval = 1000;
let bubbleCount = 0;
const numberOfBubbles = 10;

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * maxLovePicture);
  const image = `${randomIndex}.jpg`;
  console.log(randomIndex);
  return image;
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("love-bubble");
  bubble.style.backgroundImage = `url(${imageFolderPath}${getRandomImage()})`;
  bubble.style.backgroundPosition = "center";
  bubble.style.backgroundRepeat = "no-repeat";
  bubble.style.backgroundSize = "cover";
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubbleContainer.appendChild(bubble);

  bubbleCount++;
  if (bubbleCount >= numberOfBubbles) {
    clearInterval(bubbleGeneration);
    bubbleContainer.removeChild(bubble);
  }
}

const bubbleGeneration = setInterval(createBubble, bubbleGenerationInterval);
