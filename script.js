const banner = document.querySelector(".cookie-banner");
const modal = document.querySelector(".cookie-modal");
const year = document.getElementById("year");
const consentKey = "satyadata-cookie-consent";
const prefsKey = "satyadata-cookie-preferences";

year.textContent = new Date().getFullYear();

const openModal = () => {
  modal.classList.add("is-visible");
  modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  modal.classList.remove("is-visible");
  modal.setAttribute("aria-hidden", "true");
};

const acceptAll = () => {
  localStorage.setItem(consentKey, "accepted");
  const preferences = {
    functional: true,
    analytics: true,
  };
  localStorage.setItem(prefsKey, JSON.stringify(preferences));
  banner.style.display = "none";
  closeModal();
};

const loadPreferences = () => {
  const stored = localStorage.getItem(prefsKey);
  if (!stored) return;
  try {
    const preferences = JSON.parse(stored);
    document.querySelectorAll("[data-toggle]").forEach((toggle) => {
      const key = toggle.getAttribute("data-toggle");
      toggle.checked = Boolean(preferences[key]);
    });
  } catch (error) {
    console.warn("Failed to read cookie preferences", error);
  }
};

if (localStorage.getItem(consentKey) === "accepted") {
  banner.style.display = "none";
}

document.querySelectorAll("[data-open-settings]").forEach((button) => {
  button.addEventListener("click", () => {
    loadPreferences();
    openModal();
  });
});

document.querySelectorAll("[data-close-settings]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.querySelectorAll("[data-accept-cookies]").forEach((button) => {
  button.addEventListener("click", acceptAll);
});

document.querySelector("[data-save-consent]").addEventListener("click", () => {
  const preferences = {};
  document.querySelectorAll("[data-toggle]").forEach((toggle) => {
    preferences[toggle.getAttribute("data-toggle")] = toggle.checked;
  });
  localStorage.setItem(prefsKey, JSON.stringify(preferences));
  localStorage.setItem(consentKey, "accepted");
  banner.style.display = "none";
  closeModal();
});

document.querySelectorAll("[data-accordion]").forEach((header) => {
  header.addEventListener("click", () => {
    const key = header.getAttribute("data-accordion");
    const body = document.querySelector(`[data-accordion-body="${key}"]`);
    body.classList.toggle("is-open");
  });
});

document.querySelector("[data-toggle-more]").addEventListener("click", (event) => {
  const more = document.querySelector(".cookie-more");
  const isHidden = more.hasAttribute("hidden");
  if (isHidden) {
    more.removeAttribute("hidden");
    event.currentTarget.textContent = "Show less";
  } else {
    more.setAttribute("hidden", "hidden");
    event.currentTarget.textContent = "Show more";
  }
});

const emailToggle = document.querySelector("[data-email-toggle]");
const emailReveal = document.querySelector("[data-email]");
if (emailToggle && emailReveal) {
  emailToggle.addEventListener("click", () => {
    const isHidden = emailReveal.hasAttribute("hidden");
    if (isHidden) {
      emailReveal.removeAttribute("hidden");
      emailToggle.textContent = "Hide email";
    } else {
      emailReveal.setAttribute("hidden", "hidden");
      emailToggle.textContent = "Show email";
    }
  });
}

if (window.VANTA) {
  VANTA.NET({
    el: "#hero-vanta",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xfa6599,
    backgroundColor: 0x011c34,
    points: 12.0,
    maxDistance: 33.0,
    spacing: 16.0,
    showDots: false,
  });
}
