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
const bibleBooks = [
  { id: "GEN", name: "Gênesis", chapters: 50 },
  { id: "EXO", name: "Êxodo", chapters: 40 },
  { id: "LEV", name: "Levítico", chapters: 27 },
  { id: "NUM", name: "Números", chapters: 36 },
  { id: "DEU", name: "Deuteronômio", chapters: 34 },
  { id: "JOS", name: "Josué", chapters: 24 },
  { id: "JDG", name: "Juízes", chapters: 21 },
  { id: "RUT", name: "Rute", chapters: 4 },
  { id: "1SA", name: "1 Samuel", chapters: 31 },
  { id: "2SA", name: "2 Samuel", chapters: 24 },
  { id: "1KI", name: "1 Reis", chapters: 22 },
  { id: "2KI", name: "2 Reis", chapters: 25 },
  { id: "1CH", name: "1 Crônicas", chapters: 29 },
  { id: "2CH", name: "2 Crônicas", chapters: 36 },
  { id: "EZR", name: "Esdras", chapters: 10 },
  { id: "NEH", name: "Neemias", chapters: 13 },
  { id: "EST", name: "Ester", chapters: 10 },
  { id: "JOB", name: "Jó", chapters: 42 },
  { id: "PSA", name: "Salmos", chapters: 150 },
  { id: "PRO", name: "Provérbios", chapters: 31 },
  { id: "ECC", name: "Eclesiastes", chapters: 12 },
  { id: "SNG", name: "Cânticos", chapters: 8 },
  { id: "ISA", name: "Isaías", chapters: 66 },
  { id: "JER", name: "Jeremias", chapters: 52 },
  { id: "LAM", name: "Lamentações", chapters: 5 },
  { id: "EZK", name: "Ezequiel", chapters: 48 },
  { id: "DAN", name: "Daniel", chapters: 12 },
  { id: "HOS", name: "Oséias", chapters: 14 },
  { id: "JOL", name: "Joel", chapters: 3 },
  { id: "AMO", name: "Amós", chapters: 9 },
  { id: "OBA", name: "Obadias", chapters: 1 },
  { id: "JON", name: "Jonas", chapters: 4 },
  { id: "MIC", name: "Miquéias", chapters: 7 },
  { id: "NAM", name: "Naum", chapters: 3 },
  { id: "HAB", name: "Habacuque", chapters: 3 },
  { id: "ZEP", name: "Sofonias", chapters: 3 },
  { id: "HAG", name: "Ageu", chapters: 2 },
  { id: "ZEC", name: "Zacarias", chapters: 14 },
  { id: "MAL", name: "Malaquias", chapters: 4 },
  { id: "MAT", name: "Mateus", chapters: 28 },
  { id: "MRK", name: "Marcos", chapters: 16 },
  { id: "LUK", name: "Lucas", chapters: 24 },
  { id: "JHN", name: "João", chapters: 21 },
  { id: "ACT", name: "Atos", chapters: 28 },
  { id: "ROM", name: "Romanos", chapters: 16 },
  { id: "1CO", name: "1 Coríntios", chapters: 16 },
  { id: "2CO", name: "2 Coríntios", chapters: 13 },
  { id: "GAL", name: "Gálatas", chapters: 6 },
  { id: "EPH", name: "Efésios", chapters: 6 },
  { id: "PHP", name: "Filipenses", chapters: 4 },
  { id: "COL", name: "Colossenses", chapters: 4 },
  { id: "1TH", name: "1 Tessalonicenses", chapters: 5 },
  { id: "2TH", name: "2 Tessalonicenses", chapters: 3 },
  { id: "1TI", name: "1 Timóteo", chapters: 6 },
  { id: "2TI", name: "2 Timóteo", chapters: 4 },
  { id: "TIT", name: "Tito", chapters: 3 },
  { id: "PHM", name: "Filemom", chapters: 1 },
  { id: "HEB", name: "Hebreus", chapters: 13 },
  { id: "JAS", name: "Tiago", chapters: 5 },
  { id: "1PE", name: "1 Pedro", chapters: 5 },
  { id: "2PE", name: "2 Pedro", chapters: 3 },
  { id: "1JN", name: "1 João", chapters: 5 },
  { id: "2JN", name: "2 João", chapters: 1 },
  { id: "3JN", name: "3 João", chapters: 1 },
  { id: "JUD", name: "Judas", chapters: 1 },
  { id: "REV", name: "Apocalipse", chapters: 22 },
];

async function fetchBibleData(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${bibleApiUrl}${path}`, { signal: controller.signal });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Não foi possível carregar os dados da Bíblia.");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("A solicitação demorou demais. Verifique sua conexão e tente novamente.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
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
  let requestNumber = 0;

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

  function populateChapters(book, preferredChapter = 1) {
    chapterSelect.replaceChildren(
      ...Array.from({ length: book.chapters }, (_, index) => {
        const chapterNumber = index + 1;
        const option = document.createElement("option");
        option.value = chapterNumber;
        option.textContent = chapterNumber;
        return option;
      }),
    );

    chapterSelect.value = String(Math.min(Math.max(preferredChapter, 1), book.chapters));
  }

  function selectBookGroup(label, books) {
    const group = document.createElement("optgroup");
    group.label = label;

    books.forEach((book) => {
      const option = document.createElement("option");
      option.value = book.id;
      option.textContent = book.name;
      group.appendChild(option);
    });

    bookSelect.appendChild(group);
  }

  function prepareBook(bookId, preferredChapter = 1) {
    const book = bibleBooks.find((item) => item.id === bookId) || bibleBooks[0];
    bookSelect.value = book.id;
    populateChapters(book, preferredChapter);
    chapterSelect.disabled = false;
    submitButton.disabled = false;
    reference.textContent = "";
    versesContainer.replaceChildren();
    updateNavigation();
    setStatus("Escolha um capítulo e selecione “Abrir capítulo”.");
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
    prepareBook(bookSelect.value);
  });

  previousChapterButton.addEventListener("click", () => {
    chapterSelect.value = Number(chapterSelect.value) - 1;
    loadChapter();
  });

  nextChapterButton.addEventListener("click", () => {
    chapterSelect.value = Number(chapterSelect.value) + 1;
    loadChapter();
  });

  let savedReading = null;
  try {
    savedReading = JSON.parse(localStorage.getItem(bibleStorageKey));
  } catch {
    savedReading = null;
  }

  selectBookGroup("Antigo Testamento", bibleBooks.slice(0, 39));
  selectBookGroup("Novo Testamento", bibleBooks.slice(39));
  bookSelect.disabled = false;

  const initialBookId = bibleBooks.some((book) => book.id === savedReading?.bookId)
    ? savedReading.bookId
    : "GEN";
  prepareBook(initialBookId, savedReading?.chapter || 1);
  loadChapter();
}

initializeBibleReader();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderCalendar, { once: true });
} else {
  renderCalendar();
}
