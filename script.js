// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form UX (client-side validation + status)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  // Simple HTML5 validation
  if (!form.checkValidity()) return;

  e.preventDefault();
  status.textContent = 'Sending…';

  const data = new FormData(form);
  try {
    const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
    if (res.ok) {
      status.textContent = 'Thanks! We’ll get back to you shortly.';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please email contact@avcon.tech.';
    }
  } catch {
    status.textContent = 'Network error. Please email contact@avcon.tech.';
  }
});
