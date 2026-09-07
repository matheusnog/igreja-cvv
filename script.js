const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const specialDates = {
  0: [1, 7, 14, 21, 28],
  1: [4, 11, 18, 25],
  2: [1, 8, 15, 22, 29],
  3: [5, 12, 19, 26],
  4: [3, 10, 17, 24, 31],
  5: [7, 14, 21, 28],
  6: [5, 12, 19, 26],
  7: [2, 9, 16, 23, 30],
  8: [6, 13, 20, 27],
  9: [4, 11, 18, 25],
  10: [1, 8, 15, 22, 29],
  11: [6, 13, 20, 27],
};

const currentMonthIndex = new Date().getMonth();
const calendarBoard = document.querySelector("#calendarBoard");

function renderCalendar() {
  if (!calendarBoard) return;

  calendarBoard.innerHTML = "";

  monthNames.forEach((monthName, index) => {
    const monthCard = document.createElement("article");
    monthCard.className = `month-card${index === currentMonthIndex ? " is-current" : ""}`;

    const header = document.createElement("div");
    header.className = "month-header";
    header.textContent = monthName;

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const weekdayRow = document.createElement("div");
    weekdayRow.className = "calendar-weekdays";

    weekdays.forEach((weekday) => {
      const el = document.createElement("span");
      el.className = "weekday";
      el.textContent = weekday;
      weekdayRow.appendChild(el);
    });

    const daysGrid = document.createElement("div");
    daysGrid.className = "calendar-days";

    const firstDay = new Date(2026, index, 1).getDay();
    const totalDays = new Date(2026, index + 1, 0).getDate();

    for (let i = 0; i < firstDay; i += 1) {
      const emptyCell = document.createElement("span");
      emptyCell.className = "day-cell is-empty";
      daysGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const dayCell = document.createElement("span");
      dayCell.className = "day-cell";
      dayCell.textContent = day;

      if (specialDates[index]?.includes(day)) {
        dayCell.classList.add("is-event");
      }

      if (day === 1 && index === currentMonthIndex) {
        dayCell.classList.add("is-highlight");
      }

      daysGrid.appendChild(dayCell);
    }

    monthCard.append(header, weekdayRow, daysGrid);
    calendarBoard.appendChild(monthCard);
  });
}

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
renderCalendar();
