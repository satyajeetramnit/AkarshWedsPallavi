window.WEDDING_DATA = {
  groom: "Akarsh",
  groomFull: "चि० आकर्ष आनन्द",
  bride: "Pallavi",
  brideFull: "आयु० पल्लवी कुमारी साहू",
  venue: "Hotel Ramada, Bishtupur, Jamshedpur",
  dates: {
    haldi: "2026-11-23",
    mehndi: "2026-11-24",
    barat: "2026-11-25",
    wedding: "2026-11-25",
    reception: "2026-11-27",
    dayOne: "2026-11-23",
    dayTwo: "2026-11-25",
    dayThree: "2026-11-27",
    rsvpBy: "2026-11-20",
    countdownTime: "12:00:00+05:30",
  },
  phones: ["8792390458", "7258883959"],
};

(() => {
  const { bride, groom, venue, dates } = window.WEDDING_DATA;
  const parseDate = (value) => new Date(`${value}T00:00:00Z`);
  const formatDate = (value, options) =>
    new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...options }).format(
      parseDate(value),
    );
  const ordinal = (value) => {
    const day = Number(value.slice(-2));
    const suffix =
      day % 100 >= 11 && day % 100 <= 13
        ? "th"
        : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] || "th");
    return `${day}${suffix}`;
  };
  const shortDate = (value) =>
    formatDate(value, { day: "numeric", month: "short" });
  const longDate = (value) =>
    formatDate(value, { day: "numeric", month: "long", year: "numeric" });
  const weekdayDate = (value, shortMonth = false, shortWeekday = false) =>
    formatDate(value, {
      weekday: shortWeekday ? "short" : "long",
      day: "numeric",
      month: shortMonth ? "short" : "long",
      year: "numeric",
    });

  const replacements = new Map([
    ["Kamayani", bride],
    ["Ankit", groom],
    ["Shivani", bride],
    ["Shubham", groom],
    ["Nahargarh Palace, Ranthambore", venue],
    ["Nahargarh Palace, Ranopur", venue],
    ["31 Oct & 1 Nov 2026", "23 – 27 Nov 2026"],
    ["31 October & 1 November 2026", "23 to 27 November 2026"],
    ["31 October 2026", "23 November 2026"],
    ["1 November 2026", "25 November 2026"],
    ["#ankitkikhushy", "#AkarshKiPallavi"],
  ]);

  const replacementPattern = new RegExp(
    [...replacements.keys()]
      .sort((left, right) => right.length - left.length)
      .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "g",
  );
  const replaceValues = (value) =>
    value.replace(replacementPattern, (match) => replacements.get(match));

  const applyWeddingData = () => {
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest("script, style")) continue;
      node.nodeValue = replaceValues(node.nodeValue);
    }
    document.querySelectorAll("*").forEach((element) => {
      for (const attribute of element.attributes) {
        attribute.value = replaceValues(attribute.value);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyWeddingData, { once: true });
  } else {
    applyWeddingData();
  }
})();