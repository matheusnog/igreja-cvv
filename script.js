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
    { day: 29, label: "Congresso dos Jovens" },
    { day: 30, label: "Congresso dos Jovens" },
  ],
  Setembro: [
    { day: 12, label: "Aniversário da Congregação" },
    { day: 13, label: "Culto de Santa Ceia/Primícias" },
    { day: 19, label: "Congresso das Mulheres" },
    { day: 20, label: "Congresso das Mulheres" },
  ],
  Outubro: [
    { day: 11, label: "Culto de Santa Ceia/Primícias" },
    { day: 31, label: "Festa das crianças (Sede e Congregação - Chácara)" },
  ],
  Novembro: [
    { day: 8, label: "Culto de Santa Ceia/Primícias" },
    { day: 14, label: "Congresso do Louvor" },
    { day: 15, label: "Congresso do Louvor" },
  ],
  Dezembro: [
    { day: 13, label: "Culto de Santa Ceia/Primícias" },
  ],
};

const eventColors = ["#d97706", "#0ea5e9", "#16a34a", "#a855f7", "#ef4444", "#f59e0b", "#ec4899"];
const eventColor = "#c9983c";
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
        dayCell.style.background = eventColor;
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

const bibleApiUrl = "https://bible-api.com";
const bibleStorageKey = "igreja-cvv-bible-reading";

async function fetchBibleData(path) {
  const response = await fetch(`${bibleApiUrl}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Não foi possível carregar os dados da Bíblia.");
  }

  return data;
}

function initializeBibleReader() {
  const reader = document.querySelector("[data-bible-reader]");
  if (!reader) return;

  const form = reader.querySelector("[data-bible-form]");
  const bookSelect = reader.querySelector("[data-bible-book]");
  const chapterSelect = reader.querySelector("[data-bible-chapter]");
  const submitButton = reader.querySelector("[data-bible-submit]");
  const previousChapterButton = reader.querySelector("[data-bible-previous]");
  const nextChapterButton = reader.querySelector("[data-bible-next]");
  const reference = reader.querySelector("[data-bible-reference]");
  const status = reader.querySelector("[data-bible-status]");
  const versesContainer = reader.querySelector("[data-bible-verses]");
  const chapterCache = new Map();
  let requestNumber = 0;
  let bookRequestNumber = 0;

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  function updateNavigation() {
    const chapterNumber = Number(chapterSelect.value);
    const lastChapter = chapterSelect.options.length;
    const isLoading = submitButton.disabled;

    previousChapterButton.disabled = isLoading || chapterNumber <= 1;
    nextChapterButton.disabled = isLoading || chapterNumber >= lastChapter;
  }

  async function loadBookChapters(bookId, preferredChapter = 1) {
    const activeBookRequest = ++bookRequestNumber;
    chapterSelect.disabled = true;
    submitButton.disabled = true;
    reference.textContent = "";
    versesContainer.replaceChildren();
    updateNavigation();
    setStatus("Carregando capítulos...");

    try {
      let bookData = chapterCache.get(bookId);
      if (!bookData) {
        bookData = await fetchBibleData(`/data/almeida/${encodeURIComponent(bookId)}`);
        chapterCache.set(bookId, bookData);
      }

      if (activeBookRequest !== bookRequestNumber) return;

      chapterSelect.replaceChildren(
        ...bookData.chapters.map((chapter) => {
          const option = document.createElement("option");
          option.value = chapter.chapter;
          option.textContent = chapter.chapter;
          return option;
        }),
      );

      const availableChapter = bookData.chapters.some(
        (chapter) => chapter.chapter === preferredChapter,
      )
        ? preferredChapter
        : 1;
      chapterSelect.value = availableChapter;
      chapterSelect.disabled = false;
      submitButton.disabled = false;
      setStatus("Selecione um capítulo para começar a leitura.");
      updateNavigation();
    } catch {
      if (activeBookRequest !== bookRequestNumber) return;
      setStatus("Não foi possível carregar os capítulos. Verifique sua conexão e tente novamente.", true);
      updateNavigation();
    }
  }

  async function loadChapter() {
    const selectedBook = bookSelect.selectedOptions[0];
    const bookId = bookSelect.value;
    const chapterNumber = Number(chapterSelect.value);
    if (!selectedBook || !bookId || !chapterNumber) return;

    const activeRequest = ++requestNumber;
    bookSelect.disabled = true;
    chapterSelect.disabled = true;
    submitButton.disabled = true;
    updateNavigation();
    versesContainer.replaceChildren();
    setStatus("Carregando capítulo...");

    try {
      const chapter = await fetchBibleData(
        `/${encodeURIComponent(`${bookId} ${chapterNumber}`)}?translation=almeida`,
      );

      if (activeRequest !== requestNumber) return;

      reference.textContent = chapter.reference;
      chapter.verses.forEach((verse) => {
        const paragraph = document.createElement("p");
        paragraph.className = "bible-verse";

        const number = document.createElement("span");
        number.className = "bible-verse-number";
        number.textContent = verse.verse;

        paragraph.append(number, document.createTextNode(verse.text.trim()));
        versesContainer.appendChild(paragraph);
      });

      setStatus("");
      try {
        localStorage.setItem(
          bibleStorageKey,
          JSON.stringify({ bookId, chapter: chapterNumber }),
        );
      } catch {}
    } catch {
      if (activeRequest !== requestNumber) return;
      reference.textContent = "";
      setStatus("Não foi possível carregar este capítulo. Verifique sua conexão e tente novamente.", true);
    } finally {
      if (activeRequest === requestNumber) {
        bookSelect.disabled = false;
        chapterSelect.disabled = false;
        submitButton.disabled = false;
        updateNavigation();
      }
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loadChapter();
  });

  bookSelect.addEventListener("change", () => {
    loadBookChapters(bookSelect.value);
  });

  previousChapterButton.addEventListener("click", () => {
    chapterSelect.value = Number(chapterSelect.value) - 1;
    loadChapter();
  });

  nextChapterButton.addEventListener("click", () => {
    chapterSelect.value = Number(chapterSelect.value) + 1;
    loadChapter();
  });

  async function loadCatalog() {
    try {
      const catalog = await fetchBibleData("/data/almeida");
      catalog.books.forEach((book) => {
        const option = document.createElement("option");
        option.value = book.id;
        option.textContent = book.name;
        bookSelect.appendChild(option);
      });

      let savedReading = null;
      try {
        savedReading = JSON.parse(localStorage.getItem(bibleStorageKey));
      } catch {
        savedReading = null;
      }

      const initialBook = catalog.books.find((book) => book.id === savedReading?.bookId)
        || catalog.books[0];
      bookSelect.value = initialBook.id;
      bookSelect.disabled = false;
      await loadBookChapters(initialBook.id, savedReading?.chapter || 1);
      await loadChapter();
    } catch {
      setStatus("Não foi possível carregar a Bíblia. Verifique sua conexão e atualize a página.", true);
    }
  }

  loadCatalog();
}

initializeBibleReader();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderCalendar, { once: true });
} else {
  renderCalendar();
}
