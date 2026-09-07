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

const calendarEvents = {
  Janeiro: [
    { day: 11, label: "Culto de Santa Ceia/Primícias" },
  ],
  Fevereiro: [
    { day: 8, label: "Culto de Santa Ceia/Primícias" },
  ],
  Março: [
    { day: 8, label: "Culto de Santa Ceia/Primícias" },
  ],
  Abril: [
    { day: 12, label: "Culto de Santa Ceia/Primícias" },
    { day: 25, label: "Congresso dos Jovens" },
  ],
  Maio: [
    { day: 10, label: "Culto de Santa Ceia/Primícias" },
    { day: 23, label: "Congresso do Diaconato" },
    { day: 24, label: "Congresso do Diaconato" },
  ],
  Junho: [
    { day: 14, label: "Culto de Santa Ceia/Primícias" },
    { day: 20, label: "Encontro de Casais" },
    { day: 27, label: "Aniversário da Igreja" },
    { day: 28, label: "Aniversário da Igreja" },
  ],
  Julho: [
    { day: 12, label: "Culto de Santa Ceia/Primícias" },
  ],
  Agosto: [
    { day: 9, label: "Culto de Santa Ceia/Primícias" },
    { day: 30, label: "Congresso dos Jovens" },
  ],
  Setembro: [
    { day: 13, label: "Culto de Santa Ceia/Primícias" },
    { day: 19, label: "Congresso das Mulheres" },
    { day: 20, label: "Congresso das Mulheres" },
  ],
  Outubro: [
    { day: 11, label: "Culto de Santa Ceia/Primícias" },
    { day: 31, label: "Congresso do Louvor" },
  ],
  Novembro: [
    { day: 8, label: "Culto de Santa Ceia/Primícias" },
    { day: 14, label: "Congresso do Louvor" },
  ],
  Dezembro: [
    { day: 13, label: "Culto de Santa Ceia/Primícias" },
  ],
};

const eventColors = ["#d97706", "#0ea5e9", "#16a34a", "#a855f7", "#ef4444", "#f59e0b", "#ec4899"];
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

    weekdays.forEach((weekday, weekdayIndex) => {
      const el = document.createElement("span");
      el.className = "weekday";
      el.textContent = weekday;
      el.style.color = eventColors[weekdayIndex % eventColors.length];
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

      const matchingEvent = calendarEvents[monthName]?.find((event) => event.day === day);
      if (matchingEvent) {
        dayCell.classList.add("is-event");
        dayCell.title = matchingEvent.label;
        dayCell.style.background = `linear-gradient(135deg, ${eventColors[(day + index) % eventColors.length]}, ${eventColors[(day + index + 1) % eventColors.length]})`;
      }

      if (day === 1 && index === currentMonthIndex) {
        dayCell.classList.add("is-highlight");
      }

      daysGrid.appendChild(dayCell);
    }

    const notes = document.createElement("div");
    notes.className = "month-notes";

    const monthNotes = calendarEvents[monthName] || [];
    monthNotes.forEach((event) => {
      const note = document.createElement("div");
      note.className = "month-note";
      note.innerHTML = `<span>${event.day}</span> ${event.label}`;
      notes.appendChild(note);
    });

    monthCard.append(header, weekdayRow, daysGrid, notes);
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderCalendar, { once: true });
} else {
  renderCalendar();
}
