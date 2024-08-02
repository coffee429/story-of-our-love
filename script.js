import { FIRSTDATE } from "./constant.js";

const heart = document.querySelector(".love-heart");
heart.innerText = calculateLoveDays();
const albumBtn = document.querySelector("#love-album-btn");

function calculateLoveDays() {
  const sampleDate = new Date(FIRSTDATE.DATE);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentDate.getTime() - sampleDate.getTime();

  // Convert milliseconds to days
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return daysDiff;
}

/* ---------------- Heart trace pointer effect ---------------- */
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
  }, 1000); // Remove the heart element after 1 seconds
}

albumBtn.addEventListener("click", openAlbum);

function openAlbum() {
  window.location.href = "./album.html";
}
