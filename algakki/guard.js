/* 체스 앱과 같은 시간 제한/부모 확인을 쓰는 공용 모듈 */
(function(){
const LS={
  get(k,d){ try{ const v=localStorage.getItem('chess.'+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem('chess.'+k,JSON.stringify(v)); }catch(e){} }
};
function b64u(buf){ let s=''; new Uint8Array(buf).forEach(c=>s+=String.fromCharCode(c)); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function unb64u(s){ s=s.replace(/-/g,'+').replace(/_/g,'/'); s+='='.repeat((4-s.length%4)%4); return Uint8Array.from(atob(s),c=>c.charCodeAt(0)); }
async function hashPin(pin,salt){ const d=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+':'+pin)); return b64u(d); }
async function bioVerify(id){
  await navigator.credentials.get({publicKey:{challenge:crypto.getRandomValues(new Uint8Array(32)),
    allowCredentials:[{type:'public-key',id:unb64u(id)}],userVerification:'required',timeout:60000}});
}
const st=document.createElement('style');
st.textContent=`#gov{position:fixed;inset:0;background:rgba(40,35,25,.6);display:none;align-items:center;justify-content:center;padding:12px;z-index:99;font-family:inherit;-webkit-user-select:none;user-select:none}
#gov.on{display:flex}
.gcard{background:#fffdf6;color:#2a2a33;border-radius:24px;padding:18px 22px;width:min(560px,100%);max-height:100%;overflow:auto;text-align:center;box-shadow:0 8px 0 rgba(0,0,0,.18)}
.gcard h2{margin:0 0 10px;font-size:28px}
.gcard .sub{font-size:16px;opacity:.75;margin:4px 0 8px}
.gcard .row{margin:10px 0}.gcard .row>b{display:block;font-size:17px;margin-bottom:6px;font-weight:400;opacity:.75}
.gcard .chips{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.gcard .chip{min-height:54px;padding:0 18px;border-radius:16px;border:3px solid #dccfae;background:#fff;font-size:19px;cursor:pointer;font-family:inherit;color:inherit}
.gcard .chip.on{border-color:#2f8f4e;background:#e3f5e7}
.gcard .go{width:100%;min-height:64px;margin-top:8px;border:0;border-radius:18px;background:#2f8f4e;color:#fff;font-size:26px;box-shadow:0 5px 0 #20703a;cursor:pointer;font-family:inherit}
.gcard .go.alt{background:#fff;color:#2a2a33;box-shadow:0 5px 0 #dccfae;font-size:21px;min-height:56px}
.gcard .big{font-size:56px;line-height:1.1}
.gcard .pins{display:flex;gap:14px;justify-content:center;margin:10px 0 14px}
.gcard .pin{width:20px;height:20px;border-radius:50%;border:3px solid #2a2a33}.gcard .pin.on{background:#2a2a33}
.gcard .pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:330px;margin:0 auto}
.gcard .pad button{min-height:56px;font-size:26px;border:0;border-radius:16px;background:#fff;box-shadow:0 4px 0 #dccfae;cursor:pointer;font-family:inherit;color:inherit}`;
document.head.appendChild(st);
const ov=document.createElement('div'); ov.id='gov'; document.body.appendChild(ov);
let mode='', DAY=null, tickLast=Date.now(), saveAt=0, opts={}, started=false, resetAsk=false;
function open(html,m){ mode=m; ov.innerHTML='<div class="gcard">'+html+'</div>'; ov.className='on'; }
function close(){ mode=''; ov.className=''; ov.innerHTML=''; }
function today(){ const d=new Date(); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
function dayState(){
  if(!DAY||DAY.d!==today()){ const sv=LS.get('day',null); DAY=(sv&&sv.d===today())?sv:{d:today(),used:0,extra:0}; }
  return DAY;
}
function timeLeft(){ const lim=LS.get('limit',30); if(!lim) return Infinity; const s=dayState(); return (lim+s.extra)*60-s.used; }
function pinPad(title,sub){
  return new Promise(res=>{
    let v='';
    const draw=()=>{
      let h='<h2>'+title+'</h2><div class="sub">'+(sub||'')+'</div><div class="pins">';
      for(let i=0;i<4;i++) h+='<i class="pin'+(i<v.length?' on':'')+'"></i>';
      h+='</div><div class="pad">';
      for(const k of ['1','2','3','4','5','6','7','8','9','←','0','취소']) h+='<button data-k="'+k+'">'+k+'</button>';
      open(h+'</div>','pin');
      ov.querySelector('.pad').onclick=e=>{
        const b=e.target.closest('button'); if(!b) return; const k=b.dataset.k;
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
  const p=LS.get('parent',null); if(!p) return true;
  if(p.cred){ try{ await bioVerify(p.cred); return true; }catch(e){ return false; } }
  for(let t=0;;t++){
    const v=await pinPad('부모님 확인',t?'다시 입력해 주세요':'PIN 4자리');
    if(v===null) return false;
    if(await hashPin(v,p.salt)===p.pin) return true;
  }
}
function limChips(cur){ return [15,30,45,60,0].map(v=>'<button class="chip'+(cur===v?' on':'')+'" data-gl="'+v+'">'+(v?v+'분':'제한 없음')+'</button>').join(''); }
function showLock(){ if(!opts.hub){ flush(); location.href='../'; return; } open('<div class="big">🌙</div><h2>오늘 게임 시간이 끝났어요</h2><div class="sub">내일 또 만나요!</div><button class="go alt" data-ga="parent">👪 부모님 확인</button>','lock'); }
function showParent(){
  const s=dayState(), lim=LS.get('limit',30);
  let h='<h2>👪 부모님 설정</h2><div class="sub">오늘 '+Math.floor(s.used/60)+'분 사용 · '+(lim?'한도 '+(lim+s.extra)+'분':'제한 없음')+'</div>';
  h+='<div class="row"><b>하루 한도</b><div class="chips">'+limChips(lim)+'</div></div>'
    +'<div class="row">'+(resetAsk?'<b>모든 게임 전적을 지울까요?</b><div class="chips"><button class="chip" data-ga="score-yes">지우기</button><button class="chip" data-ga="score-no">취소</button></div>':'<button class="chip" data-ga="score">전적 초기화</button>')+'</div>'
    +'<button class="go" data-ga="close">닫기</button>';
  open(h,'parent');
}
function back(){ tickLast=Date.now(); if(timeLeft()<=0) showLock(); else close(); tick(true); }
async function parentFlow(){ resetAsk=false; if(await confirmParent()) showParent(); else back(); }
ov.addEventListener('click',e=>{
  const t=e.target.closest('[data-gl],[data-ga]'); if(!t) return;
  if(t.dataset.gl!==undefined){ if(mode==='parent'){ LS.set('limit',+t.dataset.gl); showParent(); tick(true); } return; }
  const a=t.dataset.ga;
  if(a==='parent') parentFlow();
  else if(a==='extra'){ const s=dayState(); s.extra+=+t.dataset.v; LS.set('day',s); showParent(); tick(true); }
  else if(a==='score'){ resetAsk=true; showParent(); }
  else if(a==='score-no'){ resetAsk=false; showParent(); }
  else if(a==='score-yes'){ LS.set('score.chess',null); LS.set('score.algakki',null); LS.set('score.mult',null); LS.set('score.connect4',null); LS.set('score.spot',null); LS.set('score.uno',null); LS.set('score.memory',null); LS.set('mult.hwdone',null); resetAsk=false; if(opts.onReset) opts.onReset(); showParent(); }
  else if(a==='close') back();
});
function tick(noCount){
  const now=Date.now(), dt=Math.min(5,(now-tickLast)/1000);
  if(!noCount){
    tickLast=now;
    if(started&&!opts.noLimit&&document.visibilityState==='visible'&&mode===''){
      const s=dayState(); s.used+=dt;
      if(now-saveAt>4000){ LS.set('day',s); saveAt=now; }
      if(timeLeft()<=0) showLock();
    }
  }
  if(opts.onTick) opts.onTick(timeLeft());
}
setInterval(()=>tick(),1000);
function flush(){ if(DAY) LS.set('day',DAY); }
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') flush(); tickLast=Date.now(); });
window.addEventListener('pagehide',flush);

let xInit=false;
function xInstall(){
  if(xInit) return; xInit=true;
  const st=document.createElement('style');
  st.textContent='.xrow{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0 10px}.xrow .go{margin:0!important;min-height:74px;padding:8px 4px!important;font-size:17px!important;line-height:1.25;gap:3px;display:flex!important;flex-direction:column;align-items:center;justify-content:center;white-space:nowrap}.xrow .go small{font-size:11px;opacity:.65;margin-top:2px}.xrow .go.xhold{background-image:linear-gradient(#ffcf70,#ffcf70);background-repeat:no-repeat;background-size:0 100%}.xrow .go.xhold.hold{background-size:100% 100%;transition:background-size .9s linear}';
  document.head.appendChild(st);
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-x="sound"]'); if(!b) return;
    const wasOff=b.textContent.indexOf('🔇')>=0;
    const s=document.getElementById('bSound'); if(s) s.click();
    b.innerHTML=xLabel(!wasOff);
  },true);
  let t=null,cur=null;
  const stop=()=>{ clearTimeout(t); t=null; if(cur){cur.classList.remove('hold'); cur=null;} };
  document.addEventListener('pointerdown',e=>{
    const b=e.target.closest('[data-x="parent"]'); if(!b) return;
    cur=b; b.classList.add('hold'); t=setTimeout(()=>{ t=null; b.classList.remove('hold'); cur=null; parentFlow(); },900);
  },true);
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>document.addEventListener(ev,stop,true));
}
function xLabel(off){ return off?'🔇<span>소리 꺼짐</span>':'🔊<span>소리 켜짐</span>'; }
function xSoundLabel(){
  const s=document.getElementById('bSound'); return xLabel(!!s&&s.textContent.indexOf('🔇')>=0);
}
function extras(){
  xInstall();
  return '<div class="xrow"><button class="go alt" data-x="sound">'+xSoundLabel()+'</button><button class="go alt xhold" data-x="parent">👪<span>부모님</span><small>꾹 누르기</small></button></div>';
}
window.Guard={
  extras,
  start(o){
    opts=o||{};
    if(opts.hub){ started=false;
      if(!LS.get('parent',null)){ open('<div class="big">👪</div><h2>처음 한 번, 부모님 설정이 필요해요</h2><div class="sub">시간 제한과 확인 방법(지문/PIN)을 정해요. 체스 화면에서 설정할 수 있어요.</div><a class="go" href="chess/" style="display:block;line-height:64px;text-decoration:none;text-align:center">부모님 설정하러 가기</a>','setup'); return; }
      if(timeLeft()<=0) showLock(); return; }
    if(!LS.get('parent',null)){ location.replace('../'); return; }
    started=true; tickLast=Date.now();
    if(!opts.noLimit&&timeLeft()<=0) showLock();
    tick(true);
  },
  parentFlow,
  label(sec){ return sec===Infinity?'⏱ 시간 제한 없음':'⏱ 남은 시간 '+Math.max(0,Math.ceil(sec/60))+'분'+(sec<=300&&sec>0?' · 곧 끝나요':''); },
  LS
};
})();
