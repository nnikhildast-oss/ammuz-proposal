// main.js — cute animations, kitties, confetti, hearts, parallax
document.addEventListener("DOMContentLoaded", ()=>{

  const page = document.body.id;
  const bgm = document.getElementById("bgm");
  const playBtn = document.getElementById("playMusic");

  /* ===== Music button ===== */
  if(playBtn && bgm){
    function update(){
      playBtn.textContent = bgm.paused ? "Play music" : "Pause music";
    }
    playBtn.onclick = ()=>{
      if(bgm.paused){ bgm.play().catch(()=>{}); }
      else{ bgm.pause(); }
      update();
    };
    update();
  }

  /* ===== HERO fade-in ===== */
  const hero = document.querySelector(".hero-inner");
  if(hero){
    setTimeout(()=>{
      hero.style.transition="0.6s ease";
      hero.style.opacity=1;
      hero.style.transform="translateY(0)";
    },180);
  }

  /* ===== Card Reveal Observer ===== */
  const cards = document.querySelectorAll(".card");
  if(cards.length){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add("inview");
        }
      });
    },{threshold:0.2});
    cards.forEach(c=> obs.observe(c));
  }

  /* ===== Mouse Parallax (desktop only) ===== */
  const dots = document.querySelector(".bg-dots");
  const floatKitty = document.querySelector(".kitty-float");
  if(dots){
    window.addEventListener("mousemove", e=>{
      const x = (e.clientX / window.innerWidth - 0.5)*18;
      const y = (e.clientY / window.innerHeight - 0.5)*10;
      dots.style.backgroundPosition = `${50+x}% ${50+y}%, ${90-x}% ${70-y}%`;
      if(floatKitty){
        floatKitty.style.transform = `translate(${x*0.7}px, ${y*0.7}px)`;
      }
    });
  }

  /* ===== Confetti + Heart Particles for YES ===== */
  if(page==="page-final"){
    const yesBtn = document.getElementById("yesBtn");
    const maybeBtn = document.getElementById("maybeBtn");
    const celebrate = document.getElementById("celebrate");
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    function resize(){
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    resize();
    addEventListener("resize", resize);

    function confettiBurst(){
      let parts = [];
      for(let i=0;i<120;i++){
        parts.push({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height/2,
          vx:(Math.random()-0.5)*6,
          vy:Math.random()*-6,
          r:Math.random()*5+3,
          c:["#c59bff","#ffb7e9","#e5c4ff"][Math.floor(Math.random()*3)]
        });
      }
      let t=0;
      function frame(){
        t++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        parts.forEach(p=>{
          p.vy+=0.25;
          p.x+=p.vx;
          p.y+=p.vy;
          ctx.beginPath();
          ctx.fillStyle=p.c;
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fill();
        });
        if(t<140) requestAnimationFrame(frame);
      }
      frame();
    }

    function heartParticles(){
      for(let i=0;i<20;i++){
        const h = document.createElement("div");
        h.textContent = "💗";
        h.className="particle";
        h.style.left = (innerWidth/2 + (Math.random()*150-75))+"px";
        h.style.top = (innerHeight/2)+"px";
        document.body.appendChild(h);
        const endY = -50 - Math.random()*200;
        const drift = Math.random()*100-50;
        h.animate([
          {transform:`translate(0,0)`, opacity:1},
          {transform:`translate(${drift}px,${endY}px)`, opacity:0}
        ],{
          duration:1500 + Math.random()*800,
          easing:"ease-out"
        });
        setTimeout(()=>h.remove(),2000);
      }
    }

    function trigger(){
      celebrate.classList.remove("hidden");
      confettiBurst();
      heartParticles();
    }

    yesBtn.onclick = trigger;
    maybeBtn.onclick = trigger;
  }

});
