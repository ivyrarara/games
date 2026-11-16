/* ---------- 저장 / 이어하기 ---------- */
const LS={
  get(k,d){ try{ const v=localStorage.getItem('chess.'+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem('chess.'+k,JSON.stringify(v)); }catch(e){} }
};
let scoredKey=null, resetAsk=false;
function saveGame(){ LS.set('game',{cfg}); }   // 설정(말 색, 단계 등)만 저장. 판은 저장하지 않음
function loadSaved(){
  const sv=LS.get('game',null); if(!sv||!sv.cfg) return false;
  cfg=sv.cfg; if(!cfg.l7){ cfg.level={1:2,2:6,3:7}[cfg.level]||2; cfg.l7=true; }
  return false;   // 항상 새 판으로 시작
}

/* ---------- 전적 ---------- */
const SCK='score.chess';
function getScore(){ const d={cpu:{a:0,b:0,d:0},two:{a:0,b:0,d:0}}; const s=LS.get(SCK,d)||d; s.cpu=s.cpu||d.cpu; s.two=s.two||d.two; return s; }
function recordResult(){
  const sc=getScore(), m=cfg.mode; let k='d';
  if(result.t==='mate') k=m==='cpu'?(result.w===cfg.color?'a':'b'):(result.w===1?'a':'b');
  const prev=cfg.level;
  if(m==='cpu'){ if(k==='a') cfg.level=Math.min(7,cfg.level+1); else if(k==='b') cfg.level=Math.max(1,cfg.level-1); }
  sc[m][k]++; LS.set(SCK,sc); scoredKey={m,k,prev};
}
function unrecordResult(){
  if(!scoredKey) return;
  const sc=getScore(); if(sc[scoredKey.m][scoredKey.k]>0) sc[scoredKey.m][scoredKey.k]--;
  if(scoredKey.m==='cpu'&&scoredKey.prev) cfg.level=scoredKey.prev;
  LS.set(SCK,sc); scoredKey=null;
}
function renderScore(){
  const r=getScore()[cfg.mode], d=r.d?' · 무 '+r.d:'';
  $('scoreBox').textContent=cfg.mode==='cpu'?'🏆 나 '+r.a+' : '+r.b+' 컴퓨터'+d:'🏆 흰색 '+r.a+' : '+r.b+' 검정'+d;
}

/* ---------- 부모 확인 (기기 지문/화면 잠금, 없으면 PIN) ---------- */
function b64u(buf){ let s=''; new Uint8Array(buf).forEach(c=>s+=String.fromCharCode(c)); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function unb64u(s){ s=s.replace(/-/g,'+').replace(/_/g,'/'); s+='='.repeat((4-s.length%4)%4); return Uint8Array.from(atob(s),c=>c.charCodeAt(0)); }
async function hashPin(pin,salt){ const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+pin)); return b64u(d); }
async function bioAvailable(){ try{ return !!(window.PublicKeyCredential&&await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()); }catch(e){ return false; } }
async function bioRegister(){
  const cred=await navigator.credentials.create({publicKey:{
    challenge:crypto.getRandomValues(new Uint8Array(32)),
    rp:{name:'체스 놀이'},
    user:{id:crypto.getRandomValues(new Uint8Array(16)),name:'parent',displayName:'부모님'},
    pubKeyCredParams:[{type:'public-key',alg:-7},{type:'public-key',alg:-257}],
    authenticatorSelection:{authenticatorAttachment:'platform',userVerification:'required',residentKey:'discouraged'},
    attestation:'none',timeout:60000}});
  return b64u(cred.rawId);
}
async function bioVerify(id){
  await navigator.credentials.get({publicKey:{
    challenge:crypto.getRandomValues(new Uint8Array(32)),
    allowCredentials:[{type:'public-key',id:unb64u(id)}],
    userVerification:'required',timeout:60000}});
}
function pinPad(title,sub){
  return new Promise(res=>{
    let v='';
    const draw=()=>{
      let h='<h2>'+title+'</h2><div class="sub">'+(sub||'')+'</div><div class="pins">';
      for(let i=0;i<4;i++) h+='<i class="pin'+(i<v.length?' on':'')+'"></i>';
      h+='</div><div class="pad">';
      for(const k of ['1','2','3','4','5','6','7','8','9','←','0','취소']) h+='<button data-k="'+k+'">'+k+'</button>';
      openOverlay(h+'</div>','pin');
      $('overlay').querySelector('.pad').onclick=e=>{
        const b=e.target.closest('button'); if(!b) return;
        const k=b.dataset.k;
        if(k==='취소'){ res(null); return; }
        if(k==='←') v=v.slice(0,-1); else if(v.length<4) v+=k;
        if(v.length===4){ res(v); return; }
        draw();
      };
    };
    draw();
  });
}
async function confirmParent(){
  const p=LS.get('parent',null);
  if(!p) return true;
  if(p.cred){ try{ await bioVerify(p.cred); return true; }catch(e){ return false; } }
  for(let tries=0;;tries++){
    const v=await pinPad('부모님 확인',tries?'다시 입력해 주세요':'PIN 4자리');
    if(v===null) return false;
    if(await hashPin(v,p.salt)===p.pin) return true;
  }
}

/* ---------- 하루 시간 제한 ---------- */
let DAY=null, tickLast=Date.now(), saveAt=0, setupLimit=30, firstRun=false;
function today(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
function dayState(){
  if(!DAY||DAY.d!==today()){
    const sv=LS.get('day',null);
    DAY=(sv&&sv.d===today())?sv:{d:today(),used:0,extra:0};
  }
  return DAY;
}
function timeLeft(){
  const lim=LS.get('limit',30);
  if(!lim) return Infinity;
  const s=dayState(); return (lim+s.extra)*60-s.used;
}
function updateTime(){
  const b=$('timeBox'), sec=timeLeft();
  b.textContent=sec===Infinity?'⏱ 시간 제한 없음':'⏱ 남은 시간 '+Math.max(0,Math.ceil(sec/60))+'분'+(sec<=300&&sec>0?' · 곧 끝나요':'');
  b.className='box time'+(sec<=300?' low':'');
}
setInterval(()=>{
  const now=Date.now(), dt=Math.min(5,(now-tickLast)/1000); tickLast=now;
  if(!LS.get('parent',null)) return;
  if(document.visibilityState==='visible'&&['','menu','end','promo'].includes(overlayMode)){
    const s=dayState(); s.used+=dt;
    if(now-saveAt>4000){ LS.set('day',s); saveAt=now; }
    if(timeLeft()<=0) showLock();
  }
  updateTime();
},1000);
function flushDay(){ if(DAY) LS.set('day',DAY); }
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') flushDay(); tickLast=Date.now(); });
window.addEventListener('pagehide',flushDay);

/* ---------- 화면: 설정 / 잠금 / 부모 메뉴 ---------- */
function limChips(cur){
  return [15,30,45,60,0].map(v=>'<button class="chip'+(cur===v?' on':'')+'" data-lim="'+v+'">'+(v?v+'분':'제한 없음')+'</button>').join('');
}
async function showSetup(msg){
  const bio=await bioAvailable();
  let h='<h2>👪 부모님 설정</h2><div class="row"><b>하루 체스 시간</b><div class="chips">'+limChips(setupLimit)+'</div></div>'
    +'<div class="row"><b>시간을 늘리거나 설정을 바꿀 때 쓸 확인 방법</b></div>';
  if(msg) h+='<div class="sub err">'+msg+'</div>';
  if(bio) h+='<button class="go" data-act="s-bio">지문 / 화면 잠금으로 등록</button>';
  else h+='<div class="sub">이 기기에서는 지문 인증을 쓸 수 없어서 PIN을 사용해요.</div>';
  h+='<button class="go'+(bio?' alt':'')+'" data-act="s-pin">PIN 4자리로 등록</button>';
  openOverlay(h,'setup');
}
function finishSetup(){
  tickLast=Date.now(); closeOverlay();
  if(firstRun){ firstRun=false; showMenu(); }
  updateTime();
}
function showLock(){
  flushDay(); location.href='../'; return;
  openOverlay('<div class="big">🌙</div><h2>오늘 체스 시간이 끝났어요</h2><div class="sub">내일 또 만나요!</div><button class="go alt" data-act="l-parent">👪 부모님 확인</button>','lock');
}
function showParent(){
  const s=dayState(), lim=LS.get('limit',30);
  let h='<h2>👪 부모님 설정</h2><div class="sub">오늘 '+Math.floor(s.used/60)+'분 사용 · '+(lim?'한도 '+(lim+s.extra)+'분':'제한 없음')+'</div>';
  h+='<div class="row"><b>하루 한도</b><div class="chips">'+limChips(lim)+'</div></div>'
    +'<div class="row"><button class="chip" data-act="p-rereg">확인 방법 다시 정하기</button></div>'
    +'<div class="row">'+(resetAsk?'<b>모든 게임 전적을 지울까요?</b><div class="chips"><button class="chip" data-act="p-score-yes">지우기</button><button class="chip" data-act="p-score-no">취소</button></div>':'<button class="chip" data-act="p-score">전적 초기화</button>')+'</div>'
    +'<button class="go" data-act="p-close">닫기</button>';
  openOverlay(h,'parent');
}
function backFromParent(){ tickLast=Date.now(); if(timeLeft()<=0) showLock(); else closeOverlay(); updateTime(); }
async function parentFlow(){ resetAsk=false; if(await confirmParent()) showParent(); else backFromParent(); }

$('overlay').addEventListener('click',async e=>{
  const t=e.target.closest('[data-lim],[data-act]'); if(!t) return;
  if(t.dataset.lim!==undefined){
    const v=+t.dataset.lim;
    if(overlayMode==='setup'){ setupLimit=v; showSetup(); }
    else if(overlayMode==='parent'){ LS.set('limit',v); showParent(); updateTime(); }
    return;
  }
  const a=t.dataset.act;
  if(a==='s-bio'){
    try{ const id=await bioRegister(); LS.set('parent',{cred:id}); LS.set('limit',setupLimit); finishSetup(); }
    catch(err){ showSetup('지문 등록이 안 됐어요. 다시 해 보거나 PIN을 써 주세요.'); }
  } else if(a==='s-pin'){
    const a1=await pinPad('PIN 만들기','숫자 4자리'); if(a1===null) return showSetup();
    const a2=await pinPad('PIN 한 번 더','같은 숫자를 입력해요'); if(a2===null) return showSetup();
    if(a1!==a2) return showSetup('두 번 입력한 PIN이 달라요.');
    const salt=b64u(crypto.getRandomValues(new Uint8Array(8)));
    LS.set('parent',{pin:await hashPin(a1,salt),salt}); LS.set('limit',setupLimit); finishSetup();
  } else if(a==='l-parent'){ parentFlow(); }
  else if(a==='p-extra'){ const s=dayState(); s.extra+=+t.dataset.v; LS.set('day',s); showParent(); updateTime(); }
  else if(a==='p-rereg'){ setupLimit=LS.get('limit',30); showSetup(); }
  else if(a==='p-score'){ resetAsk=true; showParent(); }
  else if(a==='p-score-no'){ resetAsk=false; showParent(); }
  else if(a==='p-score-yes'){ LS.set('score.chess',null); LS.set('score.algakki',null); LS.set('score.mult',null); resetAsk=false; renderScore(); showParent(); }
  else if(a==='p-close'){ backFromParent(); }
});

let holdT=null; const bP=$('bParent');
bP.addEventListener('pointerdown',()=>{ bP.classList.add('hold'); holdT=setTimeout(()=>{ holdT=null; bP.classList.remove('hold'); parentFlow(); },900); });
['pointerup','pointerleave','pointercancel'].forEach(ev=>bP.addEventListener(ev,()=>{ clearTimeout(holdT); bP.classList.remove('hold'); }));

/* boot */
const hasParent=!!LS.get('parent',null);
const resumed=loadSaved();
if(!resumed){ G=newState(); keys=[posKey(G)]; LM=legalMoves(G); last=null; over=false; flipped=false; }
sel=-1; tmap=new Map(); hint=null; thinking=false;
render(); updateTime();
if(!hasParent){ firstRun=true; showSetup(); }
else if(timeLeft()<=0) showLock();
else if(resumed&&!over&&G.stack.length){ maybeCpu(); }
else { showMenu(); maybeCpu(); }
if('serviceWorker' in navigator&&location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{});

/* 테스트용 훅 */
window.__chess={cfg:()=>cfg,setLevel:n=>{cfg.level=n;},win:()=>{result={t:'mate',w:cfg.color};over=true;recordResult();},lose:()=>{result={t:'mate',w:-cfg.color};over=true;recordResult();},undo:()=>unrecordResult(),end:()=>showEnd(),menu:()=>showMenu(),close:()=>closeOverlay()};
