// main.js — full animation pack: hearts, sparkles, confetti, cursor, typing, parallax, tilt, button click sound
document.addEventListener('DOMContentLoaded', ()=>{

  const page = document.body.id || '';
  const bgm = document.getElementById('bgm');         // background music (music.mp3)
  const clickSnd = new Audio('click .mp3');           // button touch sound (click.mp3) — upload to repo root
  clickSnd.volume = 0.9;

  // safe play helper (try/catch)
  function tryPlay(a){ if(!a) return; a.play().catch(()=>{}); }

  /* ========== BUTTON SOUND: play click sound on any button touch/click ========== */
  document.addEventListener('pointerdown', (e)=>{
    // play click sound for buttons/links only
    const el = e.target.closest('button, a, .btn');
    if(el){ tryPlay(clickSnd); }
  }, {passive:true});

  /* ========== MUSIC CONTROL (play/pause button) ========== */
  const playBtn = document.getElementById('playMusic');
  if(playBtn && bgm){
    function updateBtn(){ playBtn.textContent = bgm.paused ? 'Play music' : 'Pause music'; }
    playBtn.addEventListener('click', ()=>{
      if(bgm.paused) tryPlay(bgm);
      else bgm.pause();
      updateBtn();
    });
    updateBtn();
  }

  /* ========== HERO INTRO FADE ========= */
  (function heroIntro(){
    const hero = document.querySelector('.hero-inner');
    if(hero){ setTimeout(()=>{ hero.style.opacity = 1; hero.style.transform = 'translateY(0)'; }, 150); }
  })();

  /* ========== CARDS: IntersectionObserver reveal (stagger) ========= */
  (function cardsObserver(){
    const cards = document.querySelectorAll('.card');
    if(!cards.length) return;
    const obs = new IntersectionObserver((entries, o)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const parent = entry.target.parentElement;
          // stagger reveal of all cards in grid
          Array.from(parent.children).forEach((c,i)=> setTimeout(()=> c.classList.add('inview'), i*90));
          o.disconnect(); // one-time
        }
      });
    }, {threshold:0.18});
    cards.forEach(c=> obs.observe(c));
  })();

  /* ========== PARALLAX: background & home kitty float (desktop) ========= */
  (function parallax(){
    const dots = document.querySelector('.bg-dots');
    const kf = document.querySelector('.kitty-float');
    if(!dots) return;
    window.addEventListener('mousemove', e=>{
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      dots.style.backgroundPosition = `${50 + x}% ${50 + y}%, ${90 - x}% ${70 - y}%`;
      if(kf) kf.style.transform = `translate(${x*0.6}px, ${y*0.6}px)`;
    }, {passive:true});
  })();

  /* ========== CARD POINTER TILT (pointermove) ========= */
  (function cardTilt(){
    document.querySelectorAll('.card').forEach(card=>{
      let last = null;
      card.addEventListener('pointermove', e=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width - 0.5;
        const py = (e.clientY - r.top)/r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${ -py*6 }deg) rotateY(${ px*6 }deg) scale(1.02)`;
      });
      card.addEventListener('pointerleave', ()=> { card.style.transform = ''; });
    });
  })();

  /* ========== CURSOR HEART (desktop) ========= */
  (function heartCursor(){
    if(window.matchMedia && window.matchMedia('(pointer:fine)').matches){
      const c = document.createElement('div'); c.className = 'cursor-heart'; c.textContent = '💗';
      document.body.appendChild(c);
      document.body.classList.add('custom-cursor');
      window.addEventListener('mousemove', e=>{
        c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
      }, {passive:true});
    }
  })();

  /* ========== TYPING EFFECT for letter page (if element present) ========= */
  (function typing(){
    const el = document.getElementById('typing');
    if(!el) return;
    const text = el.dataset && el.dataset.text ? el.dataset.text : el.textContent;
    el.textContent = '';
    let i = 0;
    function step(){
      if(i <= text.length){ el.textContent = text.slice(0,i); i++; setTimeout(step, 45); }
    }
    step();
  })();

  /* ========== PARTICLES: sparkles & hearts spawn helpers ========= */
  function spawnSparkles(x,y,n=12){
    for(let i=0;i<n;i++){
      const s = document.createElement('div'); s.className='sparkle';
      document.body.appendChild(s);
      s.style.left = (x + (Math.random()*120-60)) + 'px';
      s.style.top = (y + (Math.random()*60-30)) + 'px';
      const dx = (Math.random()*200-100), dy = (Math.random()*-160-20);
      s.animate([{transform:'translate(0,0)', opacity:1},{transform:`translate(${dx}px,${dy}px)`, opacity:0}], {duration:700+Math.random()*800, easing:'ease-out'});
      setTimeout(()=> s.remove(), 1800);
    }
  }
  function spawnHearts(x,y,n=14){
    for(let i=0;i<n;i++){
      const h = document.createElement('div'); h.className='heart-particle'; h.textContent = ['💗','💖','💕'][Math.floor(Math.random()*3)];
      document.body.appendChild(h);
      h.style.left = (x + (Math.random()*140-70)) + 'px';
      h.style.top = y + 'px';
      const dx = (Math.random()*160-80), dy = - (120 + Math.random()*260);
      h.animate([{transform:'translate(0,0)', opacity:1},{transform:`translate(${dx}px,${dy}px)`, opacity:0}], {duration:1200+Math.random()*900, easing:'cubic-bezier(.2,.8,.2,1)'});
      setTimeout(()=> h.remove(), 2200);
    }
  }

  /* ========== CONFETTI (canvas) ========= */
  function confettiBurst(){
    let canvas = document.getElementById('confetti');
    if(!canvas){
      canvas = document.createElement('canvas'); canvas.id='confetti'; document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
    resize(); addEventListener('resize', resize);
    const parts = [];
    for(let i=0;i<140;i++){
      parts.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height/2, vx:(Math.random()-0.5)*7, vy: -(Math.random()*8+2), r:Math.random()*5+3, c: ['#c59bff','#ffb7e9','#e5c4ff'][Math.floor(Math.random()*3)] });
    }
    let t=0;
    function frame(){
      t++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      parts.forEach(p=>{
        p.vy += 0.35;
        p.x += p.vx; p.y += p.vy;
        ctx.beginPath(); ctx.fillStyle = p.c; ctx.ellipse(p.x,p.y,p.r,p.r,0,0,Math.PI*2); ctx.fill();
      });
      if(t<140) requestAnimationFrame(frame);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    frame();
  }

  /* ========== FINAL PAGE: YES & MAYBE buttons trigger confetti + hearts + sparkles ========== */
  if(page === 'page-final'){
    const yes = document.getElementById('yesBtn');
    const maybe = document.getElementById('maybeBtn');
    const celebrate = document.getElementById('celebrate');
    function partyAtCenter(){
      const cx = innerWidth/2, cy = innerHeight/2;
      spawnSparkles(cx, cy, 20);
      spawnHearts(cx, cy, 20);
      confettiBurst();
    }
    yes && yes.addEventListener('click', ()=>{
      tryPlay(clickSnd); celebrate && celebrate.classList.remove('hidden');
      partyAtCenter();
      tryPlay(bgm);
    });
    maybe && maybe.addEventListener('click', ()=>{
      tryPlay(clickSnd); celebrate && celebrate.classList.remove('hidden');
      spawnHearts(innerWidth/2, innerHeight/2, 10);
      confettiBurst();
    });
  }

  /* ========== OPTIONAL: enable heart spawn when any .btn is clicked (brief) ========= */
  document.addEventListener('click', (e)=>{
    if(e.target.closest('.btn')){
      const rect = (e.target.getBoundingClientRect && e.target.getBoundingClientRect()) || {left: innerWidth/2, top: innerHeight/2, width: 80, height:30};
      spawnSparkles(rect.left + rect.width/2, rect.top + rect.height/2, 10);
    }
  });

  /* ========== TYPING example trigger when opening letter page: fill #typing if exists ========== */
  if(page === 'page-letter'){
    const tEl = document.getElementById('typing');
    if(tEl){
      const text = tEl.dataset.text || "From the moment you entered my life, everything changed for the better...";
      tEl.textContent = '';
      let i=0;
      const id = setInterval(()=>{ tEl.textContent = text.slice(0, ++i); if(i>=text.length) clearInterval(id); }, 45);
    }
  }

}); // DOMContentLoaded
