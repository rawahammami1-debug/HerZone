const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(opened));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
const phoneField = form.querySelector('input[name="phone"]');
phoneField.addEventListener('input', () => {
  phoneField.value = phoneField.value.replace(/\s+/g, '');
});
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedback.textContent = 'Envoi en cours...';
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
    const result = await response.json();
    if (!response.ok) {
      const errors = result && Array.isArray(result.errors) ? result.errors.map(error => error && error.message).filter(Boolean).join(' ') : '';
      throw new Error(errors || 'Impossible d’envoyer le message. Vérifiez les champs et réessayez.');
    }
    feedback.textContent = 'Merci ! Votre message a bien été envoyé à HERZONE.';
    form.reset();
  } catch (error) {
    feedback.textContent = error.message || 'Impossible d’envoyer le message. Réessayez plus tard.';
  } finally {
    button.disabled = false;
  }
});
