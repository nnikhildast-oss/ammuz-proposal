document.addEventListener('DOMContentLoaded',()=>{

  const page = document.body.id;
  const bgm = document.getElementById('bgm');
  const playBtn = document.getElementById('playMusic');

  /* 🎵 MUSIC CONTROL */
  if(playBtn && bgm){
    function updateText(){
      playBtn.textContent = bgm.paused ? "Play music" : "Pause music";
    }
    playBtn.addEventListener("click",()=>{
      if(bgm.paused){
        bgm.play().catch(()=>{});
      }else{
        bgm.pause();
      }
      updateText();
    });
    updateText();
  }

  /* 🎉 CONFETTI FOR FINAL PAGE */
  if(page === "page-final"){
    const yesBtn = document.getElementById("yesBtn");
    const maybeBtn = document.getElementById("maybeBtn");
    const celebrate = document.getElementById("celebrate");
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize",resize);

    function burst(){
      let pieces = [];
      for(let i=0;i<120;i++){
        pieces.push({
          x: Math.random()*canvas.width,
          y: Math.random()*canvas.height/2,
          vx:(Math.random()-0.5)*6,
          vy: Math.random()*-6,
          r:Math.random()*5+3,
          c:["#c59bff","#ffb7e9","#ecccff","#ffdfff"][Math.floor(Math.random()*4)]
        });
      }
      let t=0;
      function frame(){
        t++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        pieces.forEach(p=>{
          p.vy += 0.25;
          p.x += p.vx;
          p.y += p.vy;
          ctx.beginPath();
          ctx.fillStyle = p.c;
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fill();
        });
        if(t<130) requestAnimationFrame(frame);
      }
      frame();
    }

    function trigger(){
      celebrate.classList.remove("hidden");
      burst();
    }

    yesBtn?.addEventListener("click",trigger);
    maybeBtn?.addEventListener("click",trigger);
  }

});
