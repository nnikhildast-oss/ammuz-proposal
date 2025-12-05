// main.js - navigation, animations, confetti & music control
document.addEventListener('DOMContentLoaded', function(){
  // helper to show pages
  function show(id){
    document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  // initial
  show('page1');

  // fade helper
  function fadeIn(el, delay=0){
    if(!el) return;
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(()=>{
      el.style.transition = 'opacity .45s ease, transform .45s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, delay);
  }

  // page buttons
  document.getElementById('start')?.addEventListener('click', function(){
    show('page2');
    Array.from(document.querySelectorAll('.card')).forEach((c,i)=>fadeIn(c, 90*i));
  });
  document.getElementById('toLetter')?.addEventListener('click', function(){ show('page3'); fadeIn(document.querySelector('.letter-card'), 80); });
  document.getElementById('toFinal')?.addEventListener('click', function(){ show('page4'); fadeIn(document.querySelector('.card.center'), 60); });

  // music control
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playMusic');
  playBtn?.addEventListener('click', function(){
    if(bgm.paused){ bgm.play(); playBtn.textContent = 'Pause music'; }
    else { bgm.pause(); playBtn.textContent = 'Play music'; }
  });

  // confetti canvas setup
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext && canvas.getContext('2d');
  function resize(){ if(!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);

  // simple confetti burst
  function burst(n){
    if(!ctx) return;
    const pieces = [];
    for(let i=0;i<n;i++){
      pieces.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height/3,
        vx: (Math.random()-0.5)*8,
        vy: - (Math.random()*8 + 2),
        r: Math.random()*6+3,
        c: ['#BFA5FF','#DCCBFF','#FFE8FF','#E8D7FF'][Math.floor(Math.random()*4)]
      });
    }
    let t = 0;
    function frame(){
      t++;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pieces.forEach(p=>{
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.ellipse(p.x,p.y,p.r,p.r,0,0,Math.PI*2);
        ctx.fill();
      });
      if(t < 110) requestAnimationFrame(frame);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    frame();
  }

  // yes button actions
  document.getElementById('yesBtn')?.addEventListener('click', function(){
    document.getElementById('celebrate').classList.remove('hidden');
    burst(110);
  });
  document.getElementById('maybeBtn')?.addEventListener('click', function(){
    document.getElementById('celebrate').classList.remove('hidden');
    burst(70);
  });
});
