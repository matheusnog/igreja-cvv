const carousel = document.querySelector("[data-carousel]");
const previousButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

function moveCarousel(direction) {
  if (!carousel) return;

  const card = carousel.querySelector(".post-card");
  const distance = card ? card.offsetWidth + 16 : carousel.clientWidth;

  carousel.scrollBy({
    left: direction * distance,
    behavior: "smooth",
  });
}

previousButton?.addEventListener("click", () => moveCarousel(-1));
nextButton?.addEventListener("click", () => moveCarousel(1));
