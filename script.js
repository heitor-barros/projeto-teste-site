// ── NAV ──
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
});

// ── MOBILE MENU ──
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow=document.getElementById('mobileMenu').classList.contains('open')?'hidden':'';
}

// ── CARDÁPIO TABS ──
function showTab(id,btn){
  document.querySelectorAll('.msec').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  btn.classList.add('on');
}

// ── SCROLL REVEAL ──
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ── PARALLAX ──
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  const b1=document.querySelector('.hero-blob1');
  const b2=document.querySelector('.hero-blob2');
  if(b1) b1.style.transform=`translate(${s*0.03}px,${-s*0.06}px)`;
  if(b2) b2.style.transform=`translate(${-s*0.02}px,${s*0.04}px)`;
});

// ════════════════════════════════════════════
// ── FORMULÁRIO → WHATSAPP ──
// O que faz, passo a passo:
// 1. Lê o valor de cada campo pelo id (f-nome, f-tel, etc.)
// 2. Valida se nome e telefone foram preenchidos
// 3. Formata a data de AAAA-MM-DD para DD/MM/AAAA
// 4. Monta uma mensagem formatada com todos os dados
// 5. Abre o WhatsApp com essa mensagem já preenchida
// 6. Mostra feedback visual no botão
// ════════════════════════════════════════════
function handleSubmit(){
  // PASSO 1 — ler os campos
  const nome    = document.getElementById('f-nome').value.trim();
  const tel     = document.getElementById('f-tel').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const data    = document.getElementById('f-data').value;
  const hora    = document.getElementById('f-hora').value;
  const pessoas = document.getElementById('f-pessoas').value;
  const ocasiao = document.getElementById('f-ocasiao').value.trim();
  const obs     = document.getElementById('f-obs').value.trim();

  // PASSO 2 — validação: nome e telefone são obrigatórios
  if(!nome || !tel){
    alert('Por favor preenche pelo menos o nome e o telefone.');
    return;
  }

  // PASSO 3 — converter data para formato legível DD/MM/AAAA
  let dataFormatada = '—';
  if(data){
    const [y,m,d] = data.split('-');
    dataFormatada = d + '/' + m + '/' + y;
  }

  // PASSO 4 — montar a mensagem (campos opcionais só aparecem se preenchidos)
  const msg =
    '𐂐 *Nova Reserva — Maria Bonita Botequim*\n\n' +
    '•  *Nome:* '     + nome + '\n' +
    '•  *Telefone:* ' + tel  + '\n' +
    (email   ? '•  *Email:* '      + email   + '\n' : '') +
    '•  *Data:* '     + dataFormatada + '\n' +
    '•  *Horário:* '  + hora    + '\n' +
    '•  *Pessoas:* '  + pessoas + '\n' +
    (ocasiao ? '•  *Ocasião:* '     + ocasiao + '\n' : '') +
    (obs     ? '•  *Observações:* ' + obs     + '\n' : '') +
    '\n_Reserva enviada pelo site_';

  // PASSO 5 — abrir WhatsApp com a mensagem codificada
  // encodeURIComponent converte caracteres especiais para URL
  window.open('https://wa.me/351914028578?text=' + encodeURIComponent(msg), '_blank');

  // PASSO 6 — feedback visual no botão
  const btn = document.getElementById('submitBtn');
  btn.classList.add('done');
  btn.textContent = '✓ A abrir WhatsApp...';
  btn.disabled = true;
  setTimeout(()=>{
    btn.classList.remove('done');
    btn.textContent = '💬 Enviar Reserva via WhatsApp';
    btn.disabled = false;
  }, 4000);
}