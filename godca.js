// Vídeos: se cargan al pulsar (la web va más rápida y Google la valora mejor)
document.querySelectorAll('.video[data-id]').forEach(function(v){
  var id=v.dataset.id;
  v.style.backgroundImage='url(https://i.ytimg.com/vi/'+id+'/hqdefault.jpg)';
  v.addEventListener('click',function(){
    v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="'+(v.dataset.t||'Vídeo de Godca')+'"></iframe>';
  },{once:true});
});
// Cuenta atrás hasta las 00:00 del 19 de noviembre en la hora del visitante
(function(){
  var c=document.getElementById('cuenta'); if(!c) return;
  var fin=new Date(2026,10,19,0,0,0);
  function pinta(){
    var ms=fin-new Date();
    if(ms<=0){
      document.getElementById('cuenta-bloque').innerHTML='<h2 style="margin-top:20px">🌴 GTA 6 ya está disponible en tu zona</h2><p class="lead">Si aún no puedes entrar, revisa que la región de tu cuenta de PlayStation o Xbox coincide con tu país.</p><a class="btn" href="respuestas.html">Resolver dudas del lanzamiento</a>';
      clearInterval(t); return;
    }
    var s=Math.floor(ms/1000);
    c.querySelector('[data-d]').textContent=Math.floor(s/86400);
    c.querySelector('[data-h]').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
    c.querySelector('[data-m]').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
    c.querySelector('[data-s]').textContent=String(s%60).padStart(2,'0');
  }
  var t=setInterval(pinta,1000); pinta();
  try{
    var zona=Intl.DateTimeFormat().resolvedOptions().timeZone||'';
    var z=document.getElementById('zona'); if(z) z.textContent=zona.replace(/_/g,' ');
    document.querySelectorAll('tr[data-tz]').forEach(function(r){ if(r.dataset.tz.split(' ').indexOf(zona)>=0) r.classList.add('tu'); });
  }catch(e){}
})();
