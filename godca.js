// Vídeos: se cargan al pulsar (la web va más rápida)
document.querySelectorAll('.video[data-id]').forEach(function(v){
  var id=v.dataset.id;
  v.style.backgroundImage='url(https://i.ytimg.com/vi/'+id+'/hqdefault.jpg)';
  v.addEventListener('click',function(){
    v.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="'+(v.dataset.t||'Vídeo de Godca')+'"></iframe>';
  },{once:true});
});
// Cuentas atrás: data-cuenta="local" (medianoche del 19 en la hora del visitante) o una fecha UTC
var local=new Date(2026,10,19,0,0,0);
document.querySelectorAll('[data-cuenta]').forEach(function(c){
  var fin=c.dataset.cuenta==='local'?local:new Date(c.dataset.cuenta);
  function pinta(){
    var ms=fin-new Date();
    if(ms<=0){
      c.outerHTML='<div class="respuesta"><b>🌴 GTA 6 ya está disponible</b><span>Si no puedes entrar, revisa la región de tu cuenta</span></div>';
      clearInterval(t); return;
    }
    var s=Math.floor(ms/1000);
    c.querySelector('[data-d]').textContent=Math.floor(s/86400);
    c.querySelector('[data-h]').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');
    c.querySelector('[data-m]').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');
    c.querySelector('[data-s]').textContent=String(s%60).padStart(2,'0');
  }
  var t=setInterval(pinta,1000); pinta();
});
try{
  var z=document.getElementById('zona'); if(z) z.textContent=(Intl.DateTimeFormat().resolvedOptions().timeZone||'').replace(/_/g,' ');
  var iso=local.toISOString().replace('.000','');
  document.querySelectorAll('tr[data-utc]').forEach(function(r){ if(r.dataset.utc===iso) r.classList.add('tu'); });
}catch(e){}
// Lista de la noche del lanzamiento (se guarda en este navegador)
(function(){
  var cajas=document.querySelectorAll('[data-check]'); if(!cajas.length) return;
  var p=document.getElementById('check-progreso');
  function lee(k){try{return localStorage.getItem('godca-'+k)==='1'}catch(e){return false}}
  function guarda(k,v){try{localStorage.setItem('godca-'+k,v?'1':'0')}catch(e){}}
  function cuenta(){var n=0;cajas.forEach(function(c){if(c.checked)n++});if(p)p.textContent=n===cajas.length?'🌴 Todo listo. Nos vemos en Leonida.':'Llevas '+n+' de '+cajas.length+'.'}
  cajas.forEach(function(c){c.checked=lee(c.dataset.check);c.addEventListener('change',function(){guarda(c.dataset.check,c.checked);cuenta()})});
  cuenta();
})();
// Copiar enlace
document.querySelectorAll('[data-copiar]').forEach(function(b){
  b.addEventListener('click',function(){
    var u=b.dataset.copiar;
    (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){b.textContent='¡Copiado!'},function(){prompt('Copia el enlace:',u)});
  });
});
