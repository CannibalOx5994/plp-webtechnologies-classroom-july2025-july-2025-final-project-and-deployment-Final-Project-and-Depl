/* main.js
   Responsible for:
   - mobile nav toggle
   - small dynamic bits (year)
   - simple form validation for contact
   - minor animations (reusable functions)
*/

/* ---------- Utilities / Reusable Functions ---------- */

// Toggle a class on an element. Reusable for other toggles.
function toggleClass(el, className) {
  if (!el) return;
  el.classList.toggle(className);
  return el.classList.contains(className);
}

// Set current year in selected spans
function setYear(selector) {
  const el = document.querySelector(selector);
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Header / Navigation ---------- */
(function navController(){
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');

  // Add accessible toggle for small screens
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opened = toggleClass(nav, 'open'); // toggles .open
      toggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
  }

  // Close mobile nav when a link is clicked
  document.addEventListener('click', (e) => {
    if (!nav) return;
    if (nav.classList.contains('open') && e.target.tagName === 'A') {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ---------- set footer years on each page ---------- */
setYear('#year');
setYear('#year-about');
setYear('#year-services');
setYear('#year-contact');

/* ---------- Contact form validation ---------- */
(function contactForm(){
  const form = document.getElementById('contact-form');
  if (!form) return;

  const name = document.getElementById('cname');
  const email = document.getElementById('cemail');
  const message = document.getElementById('cmessage');
  const feedback = document.getElementById('contact-feedback');

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    feedback.textContent = '';
    feedback.style.color = '';

    if (!name.value.trim()) {
      feedback.textContent = 'Please enter your name.';
      feedback.style.color = 'crimson';
      name.focus();
      return;
    }
    if (!validEmail(email.value.trim())) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = 'crimson';
      email.focus();
      return;
    }
    if (message.value.trim().length < 10) {
      feedback.textContent = 'Message should be at least 10 characters.';
      feedback.style.color = 'crimson';
      message.focus();
      return;
    }

    // Simulate success (in a real site you'd POST to an API)
    feedback.textContent = 'Thanks! Your message has been sent.';
    feedback.style.color = 'green';
    form.reset();
  });
})();

/* ---------- Minimal animation helper (for cards) ---------- */
(function simpleReveal(){
  // Add 'reveal' class to .card elements when scrolled into view (simple)
  const cards = Array.from(document.querySelectorAll('.card, .service-card'));
  if (!cards.length) return;

  function check() {
    const trigger = window.innerHeight * 0.85;
    cards.forEach(c => {
      const rect = c.getBoundingClientRect();
      if (rect.top < trigger) c.classList.add('visible');
    });
  }
  window.addEventListener('scroll', check);
  window.addEventListener('load', check);
  check();
})();
