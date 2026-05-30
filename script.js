// ════════════════════════════════════════════
// MARIA BONITA BOTEQUIM — script.js
// Organização:
// 1. Navegação — efeito scroll
// 2. Menu mobile — abrir/fechar
// 3. Cardápio — trocar abas
// 4. Scroll Reveal — animações de entrada
// 5. Parallax — blobs do hero
// 6. Formulário — envio via WhatsApp
// ════════════════════════════════════════════


// ─── 1. NAVEGAÇÃO — efeito ao fazer scroll ───
// Quando o utilizador desce mais de 60px,
// adiciona a classe "scrolled" ao nav
// que muda o fundo para preto opaco
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// ─── 2. MENU MOBILE — abrir e fechar ───
// Abre/fecha o menu de ecrã inteiro no mobile
// Bloqueia o scroll da página quando está aberto
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');

  // Bloqueia scroll do body quando menu está aberto
  if (menu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}


// ─── 3. CARDÁPIO — trocar abas ───
// Esconde todas as secções do cardápio
// e mostra apenas a que foi clicada
function showTab(id, btn) {
  // Remove "on" de todas as secções e botões
  document.querySelectorAll('.msec').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.mtab').forEach(t => t.classList.remove('on'));

  // Adiciona "on" à secção e botão escolhidos
  document.getElementById(id).classList.add('on');
  btn.classList.add('on');
}


// ─── 4. SCROLL REVEAL — animações de entrada ───
// Observa cada elemento com a classe "reveal"
// Quando entra no ecrã, adiciona "in" que
// dispara a animação de fade + subida definida no CSS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target); // Para de observar após animar
    }
  });
}, { threshold: 0.1 }); // Dispara quando 10% do elemento está visível

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ─── 5. PARALLAX — blobs do hero ───
// Move os blobs de cor suavemente enquanto
// o utilizador faz scroll, criando profundidade
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blob1 = document.querySelector('.hero-blob1');
  const blob2 = document.querySelector('.hero-blob2');

  if (blob1) blob1.style.transform = `translate(${scrollY * 0.03}px, ${-scrollY * 0.06}px)`;
  if (blob2) blob2.style.transform = `translate(${-scrollY * 0.02}px, ${scrollY * 0.04}px)`;
});


// ─── 6. FORMULÁRIO — envio via WhatsApp ───
// Lê todos os campos do formulário pelos seus ids,
// valida os campos obrigatórios,
// monta uma mensagem formatada
// e abre o WhatsApp com essa mensagem já preenchida
function handleSubmit() {

  // PASSO 1 — ler o valor de cada campo pelo id
  const nome    = document.getElementById('f-nome').value.trim();
  const tel     = document.getElementById('f-tel').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const data    = document.getElementById('f-data').value;
  const hora    = document.getElementById('f-hora').value;
  const pessoas = document.getElementById('f-pessoas').value;
  const ocasiao = document.getElementById('f-ocasiao').value.trim();
  const obs     = document.getElementById('f-obs').value.trim();

  // PASSO 2 — validação: nome e telefone são obrigatórios
  if (!nome || !tel) {
    alert('Por favor preenche pelo menos o nome e o telefone.');
    return;
  }

  // PASSO 3 — converter data de AAAA-MM-DD para DD/MM/AAAA
  let dataFormatada = '—';
  if (data) {
    const [y, m, d] = data.split('-');
    dataFormatada = `${d}/${m}/${y}`;
  }

  // PASSO 4 — montar a mensagem
  // Campos opcionais só aparecem se estiverem preenchidos
  const msg =
    '🍽️ *Nova Reserva — Maria Bonita Botequim*\n\n' +
    `👤 *Nome:* ${nome}\n` +
    `📞 *Telefone:* ${tel}\n` +
    (email   ? `✉️ *Email:* ${email}\n`           : '') +
    `📅 *Data:* ${dataFormatada}\n` +
    `🕐 *Horário:* ${hora}\n` +
    `👥 *Pessoas:* ${pessoas}\n` +
    (ocasiao ? `🎉 *Ocasião:* ${ocasiao}\n`        : '') +
    (obs     ? `📝 *Observações:* ${obs}\n`        : '') +
    '\n_Reserva enviada pelo site_';

  // PASSO 5 — abrir WhatsApp com a mensagem codificada
  // encodeURIComponent converte caracteres especiais (ç, ã, etc.) para URL
  window.open('https://wa.me/351914028578?text=' + encodeURIComponent(msg), '_blank');

  // PASSO 6 — feedback visual no botão
  const btn = document.getElementById('submitBtn');
  btn.classList.add('done');
  btn.textContent = '✓ A abrir WhatsApp...';
  btn.disabled = true;

  // Repõe o botão ao estado original após 4 segundos
  setTimeout(() => {
    btn.classList.remove('done');
    btn.textContent = '💬 Enviar Reserva via WhatsApp';
    btn.disabled = false;
  }, 4000);
}