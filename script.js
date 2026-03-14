
// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Staggered reveal
document.querySelectorAll('.features-grid .feature-card, .pricing-grid .pricing-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// Nav scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  nav.style.borderBottomColor = window.scrollY > 50 ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.12)';
});

// Nav contato link
document.querySelector('nav').innerHTML += '';
document.querySelectorAll('a[href="#contato"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
  });
});

// Modais
function openModal(id) {
  document.getElementById(id).style.display = 'block';
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal('modal-termos');
    closeModal('modal-privacidade');
  }
});

// Formulário de contato
function handleContato() {
  // Coleta os valores dos campos
  const payload = {
    nome: document.getElementById('c-nome').value.trim(),
    email: document.getElementById('c-email').value.trim(),
    whatsapp: document.getElementById('c-whatsapp').value.trim(),
    escritorio: document.getElementById('c-escritorio').value.trim(),
    volume: document.getElementById('c-processos').value.trim()
  };

  // Validação simples
  if (!payload.nome || !payload.email || !payload.whatsapp) {
    alert('Por favor, preencha nome, e-mail e WhatsApp.');
    return;
  }

  const enviarFormulario = async () => {
    try {
      const response = await fetch('/api/contato',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Mensagem enviada com sucesso! Entraremos em contato.");
      } else {
        alert("Erro ao enviar. Tente novamente mais tarde.");
      }
    } catch (err) { console.error("Erro na requisição:", err); }
  };
  enviarFormulario();
}