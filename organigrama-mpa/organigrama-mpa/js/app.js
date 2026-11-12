const M=Object.fromEntries(D.map(x=>[x.id,x]));const kids=id=>D.filter(x=>x.p===id);
const PEND='<div class="pend">Información pendiente de completar con documentación oficial del MPA.</div>';
const ico='<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z"/></svg>';
const av=x=>'<div class="ph">'+(IMG[x.id]?'<img src="'+IMG[x.id]+'" alt="'+(x.n||x.t)+'">':ico)+'</div>';
function mapView(keys,zona){const u=[...new Set(keys)].filter(k=>CT[k]),zm=zona!=null;
 const paths=MP.c.map(a=>'<path class="dp '+(zm?'z'+a[0]+(zona==='all'||a[0]==zona?'':' dim')+(zona==='all'?' go':'')+'" data-k="z'+a[0]+(zona==='all'?'" data-g="fr'+a[0]:''):'zn')+'" d="'+a[1]+'"/>').join('');
 const pins=u.map(k=>'<g class="pin" tabindex="0" data-k="'+k+'" transform="translate('+CT[k].x+' '+CT[k].y+')"><title>'+CT[k].n+'</title><circle r="30" fill="transparent"/><circle class="ring" r="14"/><circle class="dot" r="12"/></g>').join('');
 let info;
 if(zm)info='<p style="margin:0 0 6px"><small>Zonas de las Fiscalías Regionales</small></p><ul class="fl" style="list-style:none;padding:0">'+[1,2,3,4].map(z=>'<li data-k="z'+z+'"'+(zona==='all'?' data-g="fr'+z+'" style="cursor:pointer"':'')+' class="'+(z==zona?'cur':'')+'"><span class="sw z'+z+'"></span>'+(zona==='all'?'Fiscalía Regional N.º '+z+' · Zona '+z:'Zona '+z+(z==zona?' · esta Fiscalía':''))+'</li>').join('')+'</ul><p class="nt">'+(zona==='all'?'Tocá una zona para entrar a su Fiscalía. ':'')+'Distribución territorial referencial, pendiente de confirmar.</p>';
 else info=u.length?'<p style="margin:0 0 6px"><small>Ubicación</small></p><ul class="fl" style="list-style:none;padding:0">'+u.map(k=>'<li data-k="'+k+'">📍 '+CT[k].n+'</li>').join('')+'</ul>':'<div class="pend">Ubicación pendiente de completar.</div>';
 return '<div class="mapbox"><svg class="mp" viewBox="0 0 '+MP.w+' '+MP.h+'" role="img" aria-label="Mapa interactivo de la Provincia de Jujuy">'+paths+pins+'</svg><div class="mi">'+info+'</div></div>'}
function miniMap(){return '<div class="hm mapbox"><svg class="mp" viewBox="0 0 '+MP.w+' '+MP.h+'" role="img" aria-label="Mapa de zonas de las Fiscalías Regionales">'+MP.c.map(a=>'<path class="dp z'+a[0]+' go" data-k="z'+a[0]+'" data-g="fr'+a[0]+'" d="'+a[1]+'"/>').join('')+'</svg><div class="zl">'+[1,2,3,4].map(z=>'<button class="zc" data-g="fr'+z+'" data-k="z'+z+'"><span class="sw z'+z+'"></span>N.º '+z+'</button>').join('')+'</div></div>'}
const mapOn=c=>c.mp||(M[c.p]&&M[c.p].mk);
const mapc=c=>mapOn(c)?card(c.zona?'Zona de competencia':'Ubicación',mapView(c.loc||[],c.zona)):'';
const hl=(e,on)=>{const t=e.target.closest&&e.target.closest('[data-k]');if(!t)return;const b=t.closest('.mapbox');if(b)b.querySelectorAll('[data-k="'+t.dataset.k+'"]').forEach(n=>n.classList.toggle('hl',on))};
document.addEventListener('mouseover',e=>hl(e,1));document.addEventListener('mouseout',e=>hl(e,0));document.addEventListener('focusin',e=>hl(e,1));document.addEventListener('focusout',e=>hl(e,0));
document.addEventListener('click',e=>{const t=e.target.closest('.mapbox [data-k]');if(t){const b=t.closest('.mapbox');b.querySelectorAll('.hl').forEach(n=>n.classList.remove('hl'));b.querySelectorAll('[data-k="'+t.dataset.k+'"]').forEach(n=>n.classList.add('hl'))}});
let S={tab:0,prof:0};
const card=(h,b)=>'<div class="card"><h2>'+h+'</h2>'+b+'</div>';
const list=a=>a&&a.length?'<ul class="fl">'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>':PEND;
const gcs=a=>'<div class="grid">'+a.map(x=>'<button class="gc" data-g="'+x.id+'">'+av(x)+'<b>'+x.t+'</b></button>').join('')+'</div>';
const vf=t=>'<div class="vid"><div class="play">▶</div><b>'+t+'</b><span>Espacio reservado para video institucional</span></div>';
const train=()=>'<div class="vg">'+[['Recorrido paso a paso','Conocé cómo funciona esta área en cada etapa.'],['Trivia institucional','Preguntas de opción múltiple.'],['Unir cargos con funciones','Actividad interactiva.'],['Evaluación final','Respondé y obtené tu resultado.']].map(x=>'<div class="card"><h2>'+x[0]+'</h2><p>'+x[1]+'</p><p style="margin-top:12px"><button class="btn" disabled>Próximamente</button></p></div>').join('')+'</div>';
function chart(){
 const R=D[0],st=D.filter(x=>x.s),ar=kids(R.id).filter(x=>!x.s);
 const nd=(x,c)=>'<button class="nd '+c+'" data-g="'+x.id+'">'+av(x)+'<b>'+x.t+'</b></button>';
 const root='<button class="nd root" data-g="procuracion"><div class="rt">Procuración General</div><div class="two">'+R.prof.map(p=>'<div>'+av(p)+'<small>'+p.r+'</small><b>'+p.n+'</b></div>').join('')+'</div></button>';
 return '<p class="hint">Hacé clic en cualquier recuadro para ver su ficha y las áreas que dependen de él.</p><div class="l0">'+nd(st[0],'side l')+root+nd(st[1],'side r')+'</div><div class="stem"></div><ul class="kids">'+ar.map(x=>'<li>'+nd(x,'')+'</li>').join('')+'</ul>';
}
function ficha(c){
 const path=[];for(let x=c;x;x=M[x.p])path.unshift(x);const k=kids(c.id),boss=M[c.p];
 let h='<div class="fi"><nav class="crumbs"><a data-g="inicio">Organigrama</a> ›'+path.map((x,i)=>i<path.length-1?' <a data-g="'+x.id+'">'+x.t+'</a> ›':' <b>'+x.t+'</b>').join('')+'</nav>';
 const row='<p><button class="btn o" data-g="inicio">← Volver al organigrama</button> '+(boss?'<button class="btn o" data-g="'+boss.id+'">↑ Reporta a: '+boss.t+'</button>':'')+'</p>';
 let tabs,body,P=c.prof?c.prof[S.prof]:null;
 if(P){
  h+='<h1>'+c.t+'</h1><p>'+c.d+'</p>'+row+'<div class="pcs">'+c.prof.map((p,i)=>'<button class="pc'+(i==S.prof?' on':'')+'" data-prof="'+i+'">'+av(p)+'<small>'+p.r+'</small><b>'+p.n+'</b><p>'+p.d+'</p></button>').join('')+'</div>';
  tabs=['Rol y funciones','Áreas bajo su órbita','Video','Capacitación'];
  body=[card('¿Qué es la Procuración General?','<p>'+c.q+'</p>')+card('Funciones y responsabilidades del '+P.r,list(P.fn)),
   card('Áreas y dependencias',P.orb==='all'?gcs(k):PEND+'<p style="margin-top:8px;color:var(--mute);font-size:.85rem">Se completará según la estructura vigente.</p>'),
   vf('Video: '+P.r),train()];
  if(P.orb==='all'){tabs.unshift(tabs.splice(1,1)[0]);body.unshift(body.splice(1,1)[0])}
  body=body[S.tab];
 }else{
  const w=c.who;
  h+='<div class="hero">'+av(w||c)+'<div><h1>'+c.t+'</h1>'+(w?'<p><b>'+w.n+'</b> · '+w.r+'</p>':'')+'<p>'+(c.d||'Descripción breve pendiente de completar.')+'</p></div>'+(c.mz?miniMap():'')+'</div>'+row;
  tabs=['Qué es y qué hace','Quién está a cargo','Áreas que dependen','Cómo funciona','Videos','Capacitación'];
  body=[mapc(c)+card('¿Qué es esta dependencia?',c.q?'<p>'+c.q+'</p>':PEND)+card('¿Qué hace?',list(c.f))+(c.x||[]).map(e=>card(e[0],Array.isArray(e[1])?list(e[1]):'<p>'+e[1]+'</p>')).join(''),
   card('¿Quién está a cargo?',w?'<p><b>'+w.n+'</b> · '+w.r+'</p><p>'+(w.d||'')+'</p>':(c.a?'<p>'+c.a+'</p><div class="pend" style="margin-top:10px">Nombre y fotografía del responsable: pendiente de completar.</div>':PEND)),
   card('¿Qué áreas o personas dependen de ella?',k.length?gcs(k):PEND),
   card('¿Cómo funciona?',c.c?'<p>'+c.c+'</p>':PEND),
   '<div class="vg">'+['¿Qué hace esta dependencia?','¿Cómo funciona?','¿Con qué otras áreas trabaja?'].map(vf).join('')+'</div>',train()];
  if(k.length){tabs.unshift(tabs.splice(2,1)[0]);body.unshift(body.splice(2,1)[0])}
  body=body[S.tab];
 }
 return h+'<div class="tabs">'+tabs.map((n,i)=>'<button class="tab'+(i==S.tab?' on':'')+'" data-tab="'+i+'">'+n+'</button>').join('')+'</div><div class="stack">'+body+'</div></div>';
}
function render(keep){
 const c=M[(location.hash||'').slice(1)];
 document.getElementById('app').innerHTML=c?ficha(c):chart();
 document.title=(c?c.t:'Organigrama')+' · MPA Jujuy';if(!keep)window.scrollTo(0,0);
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-g],[data-tab],[data-prof]');if(!t)return;
 if(t.dataset.g){S={tab:0,prof:0};location.hash=t.dataset.g}
 else{if(t.dataset.tab!=null)S.tab=+t.dataset.tab;else{S.prof=+t.dataset.prof}render(true)}});

const norm=t=>(t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const IDX=D.map(x=>({x,t:norm(x.t),h:norm([x.t,x.d,x.q,(x.f||[]).join(' '),x.a,x.c,(x.x||[]).map(e=>e[0]+' '+[].concat(e[1]).join(' ')).join(' ')].join(' '))}));
const qi=document.getElementById('q'),rs=document.getElementById('res');
function doSearch(){const w=norm(qi.value).split(/\s+/).filter(Boolean);if(!w.length){rs.hidden=true;return}
 const r=IDX.filter(o=>w.every(k=>o.h.includes(k))).map(o=>({o,sc:w.filter(k=>o.t.includes(k)).length*3})).sort((a,b)=>b.sc-a.sc).slice(0,8);
 rs.innerHTML=r.length?r.map(e=>'<button data-g="'+e.o.x.id+'"><b>'+e.o.x.t+'</b><small>'+(M[e.o.x.p]?'Depende de: '+M[e.o.x.p].t:'Autoridad máxima del MPA')+'</small></button>').join(''):'<p>No encontré resultados. Probá con otra palabra o preguntale al asistente.</p>';rs.hidden=false}
qi.addEventListener('input',doSearch);qi.addEventListener('focus',doSearch);qi.addEventListener('keydown',e=>{if(e.key==='Escape'){rs.hidden=true;qi.blur()}});
document.addEventListener('click',e=>{if(e.target.closest('[data-g]')&&e.target.closest('#res')){qi.value='';rs.hidden=true}else if(!e.target.closest('.srch'))rs.hidden=true});
/* Asistente */
const ab=document.getElementById('ab'),ap=document.getElementById('ap'),mg=document.getElementById('msgs'),ci=document.getElementById('ci');let SM=null,hist=[],busy=false;
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const fmt=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\[\[(\w+)\]\]/g,(m,id)=>M[id]?'<button class="chip" data-g="'+id+'">'+M[id].t+' ›</button>':'');
function say(r,h){mg.insertAdjacentHTML('beforeend','<div class="m '+r+'">'+h+'</div>');mg.scrollTop=mg.scrollHeight}
const INSTR='Sos el asistente del organigrama interactivo del Ministerio Público de la Acusación (MPA) de la Provincia de Jujuy. Respondé en español, en tono cordial y breve (máximo 4 oraciones), usando SOLO los datos JSON de abajo. Si un dato no está cargado, decí que todavía no está cargado y no lo inventes. Cuando menciones una dependencia, escribí su id entre dobles corchetes, por ejemplo [[fnp]], para que la persona pueda abrir su ficha. Autoridades: Procurador General Dr. Alejandro Atilio Bossatti y Procurador General Adjunto Dr. Diego Eduardo Chacón (ficha: [[procuracion]]). Campos: t nombre, p id de la dependencia de la que depende, d descripción, q qué es, f funciones, a quién está a cargo, c cómo funciona, x información extra.\nDATOS: ';
async function ask(q){if(busy||!q.trim())return;busy=true;say('u',esc(q));ci.value='';say('b','Pensando…');const th=mg.lastChild;
 if(!SM){const st=['que','hace','como','donde','quien','cual','las','los','del','una','por','con','para','esta','este','area','areas'];const w=norm(q).split(/\s+/).filter(x=>x.length>2&&!st.includes(x));const r=IDX.map(o=>({o,sc:w.filter(k=>o.h.includes(k)).length+w.filter(k=>o.t.includes(k)).length*3})).filter(e=>e.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,3);
  th.innerHTML=r.length?'<small>Respuesta por búsqueda</small><br>'+r.map(e=>{const x=e.o.x;return '<p style="margin:6px 0"><button class="chip" data-g="'+x.id+'">'+x.t+' ›</button><br>'+esc(x.d||x.q||'Información pendiente de completar.')+'</p>'}).join(''):'No encontré eso. Probá con otras palabras, por ejemplo el nombre de una dependencia.';
  busy=false;mg.scrollTop=mg.scrollHeight;return}
 const ctx=JSON.stringify(D.map(({id,t,p,d,q,f,a,c,x})=>({id,t,p,d,q,f,a,c,x})));
 const conv=hist.slice(-6).map(m=>(m[0]==='u'?'Persona: ':'Asistente: ')+m[1]).join('\n');
 try{const r=await SM(INSTR+ctx+'\n\nCONVERSACIÓN PREVIA:\n'+conv+'\n\nPregunta actual: '+q+'\nRespuesta:',{cache:false,modelTier:'quick'});
  th.innerHTML=fmt(r.text.trim());hist.push(['u',q],['a',r.text.trim()])}
 catch(e){th.textContent=e&&e.code==='not_granted'?'No tengo permiso para responder en este momento.':'No pude responder ahora, probá de nuevo en un momento.'}
 busy=false;mg.scrollTop=mg.scrollHeight}
document.getElementById('cf').addEventListener('submit',e=>{e.preventDefault();ask(ci.value)});
ab.addEventListener('click',()=>{ap.hidden=!ap.hidden;if(!ap.hidden){ci.focus();if(!mg.children.length){say('b','¡Hola! Soy el asistente del organigrama. Preguntame qué hace una dependencia, de quién depende o dónde encontrar algo.<br>'+['¿Qué hace el CAV?','¿Qué áreas integran Investigaciones?','¿Quién es el Procurador General?'].map(x=>'<button class="chip" data-q="'+x+'">'+x+'</button>').join(''))}}});
document.getElementById('ax').addEventListener('click',()=>ap.hidden=true);
mg.addEventListener('click',e=>{const t=e.target.closest('[data-q]');if(t)ask(t.dataset.q);if(e.target.closest('[data-g]')&&innerWidth<600)ap.hidden=true});
ab.hidden=false;if(window.claude&&claude.use)claude.use('sample').then(s=>{if(s)SM=s}).catch(()=>{});
addEventListener('hashchange',()=>{S={tab:0,prof:0};render()});render();
