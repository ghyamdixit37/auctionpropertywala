// ---- EDIT THESE: your real contact details ----
const CONFIG = {
  whatsapp: "919999999999",          // country code + number, no + or spaces
  phoneDisplay: "+91 99999 99999",
  email: "info@example.com",
  address: "Jaipur, Rajasthan"
};
// -----------------------------------------------

const wa = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

document.querySelectorAll("[data-whatsapp]").forEach(a => {
  a.href = wa("Hello, I would like guidance on a property in Jaipur.");
  a.target = "_blank"; a.rel = "noopener";
});

document.getElementById("foot-contact").textContent =
  `${CONFIG.address} · ${CONFIG.phoneDisplay} · ${CONFIG.email}`;

const form = document.getElementById("enquiry");
const note = document.getElementById("formnote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const name = (d.get("name") || "").trim(), phone = (d.get("phone") || "").trim();
  if (!name || !phone) { note.textContent = "Please enter your name and phone number."; return; }
  const text = `Hello, I am ${name} (${phone}). I need help with: ${d.get("topic")}.\n${(d.get("msg") || "").trim()}`;
  note.textContent = "Opening WhatsApp with your message.";
  window.open(wa(text), "_blank", "noopener");
});
