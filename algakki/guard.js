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
.gcard h2,.gcard .sub{word-break:keep-all}
.gcard .pins{display:flex;gap:14px;justify-content:center;margin:10px 0 14px}
.gcard .pin{width:20px;height:20px;border-radius:50%;border:3px solid #2a2a33}.gcard .pin.on{background:#2a2a33}
.gcard .pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:330px;margin:0 auto}
.gcard .pad button{min-height:56px;font-size:26px;border:0;border-radius:16px;background:#fff;box-shadow:0 4px 0 #dccfae;cursor:pointer;font-family:inherit;color:inherit}`;
document.head.appendChild(st);
const ov=document.createElement('div'); ov.id='gov'; document.body.appendChild(ov);
let mode='', DAY=null, lockPick=false, tickLast=Date.now(), saveAt=0, opts={}, started=false, resetAsk=false;
function open(html,m){ mode=m; ov.innerHTML='<div class="gcard">'+html+'</div>'; ov.className='on'; }
function close(){ mode=''; ov.className=''; ov.innerHTML=''; }
function sess(){ if(DAY===null) DAY=LS.get('sess',false)||false; return DAY; }
function setSess(min){ DAY=min?{left:min*60}:{unl:1}; LS.set('sess',DAY); }
function timeLeft(){ const x=sess(); if(!x) return 0; if(x.unl) return Infinity; return x.left; }
function fmtLeft(){ const t=timeLeft(); return t===Infinity?'제한 없음':(t<=0?'끝났어요':'남은 시간 '+Math.floor(Math.ceil(t)/60)+':'+String(Math.ceil(t)%60).padStart(2,'0')); }
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
function showLock(){ flush(); const pre=opts.hub?'':'../'; open('<div class="big">🌙</div><h2>게임 시간이 끝났어요</h2><div class="sub">부모님이 확인하면 새로 시간을 정할 수 있어요.</div><button class="go alt" data-ga="parent">🙅🏻‍♀️ 부모님 확인</button><a class="go alt" href="'+pre+'multiply/" style="display:block;line-height:56px;text-decoration:none;text-align:center">✖️ 곱셈 몬스터</a>'+(opts.hub?'':'<a class="go alt" href="../" style="display:block;line-height:56px;text-decoration:none;text-align:center">🏠 처음으로</a>'),'lock'); }
function showParent(){
  const x=sess(), cur=!x?-1:(x.unl?0:-1);
  let h='<h2>🙅🏻‍♀️ 부모님 설정</h2><div class="sub">'+(timeLeft()<=0?'이번엔 몇 분 놀까요?':'지금 '+fmtLeft()+' · 새로 고르면 다시 시작돼요')+'</div>';
  h+='<div class="row"><b>이번 놀이 시간</b><div class="chips">'+limChips(cur)+'</div></div>'
    +'<div class="row">'+(resetAsk?'<b>모든 게임 전적을 지울까요?</b><div class="chips"><button class="chip" data-ga="score-yes">지우기</button><button class="chip" data-ga="score-no">취소</button></div>':'<button class="chip" data-ga="score">전적 초기화</button>')+'</div>'
    +'<button class="go" data-ga="close">닫기</button>';
  open(h,'parent');
}
function back(){ tickLast=Date.now(); if(timeLeft()<=0) showLock(); else close(); tick(true); }
async function parentFlow(){ resetAsk=false; if(await confirmParent()){ lockPick=timeLeft()<=0; showParent(); } else back(); }
ov.addEventListener('click',e=>{
  const t=e.target.closest('[data-gl],[data-ga]'); if(!t) return;
  if(t.dataset.gl!==undefined){ if(mode==='parent'){ setSess(+t.dataset.gl); tickLast=Date.now(); if(lockPick){ lockPick=false; back(); } else showParent(); tick(true); } return; }
  const a=t.dataset.ga;
  if(a==='parent') parentFlow();
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
      const x=sess(); if(x&&!x.unl) x.left-=dt;
      if(now-saveAt>4000){ LS.set('sess',x||false); saveAt=now; }
      if(timeLeft()<=0) showLock();
    }
  }
  if(opts.onTick) opts.onTick(timeLeft());
}
setInterval(()=>tick(),1000);
function flush(){ if(DAY) LS.set('sess',DAY); }
document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') flush(); tickLast=Date.now(); });
window.addEventListener('pagehide',flush);
window.addEventListener('pageshow',e=>{ if(e.persisted){ DAY=null; tickLast=Date.now(); if(started&&!opts.noLimit&&timeLeft()<=0) showLock(); } });

let xInit=false;
function xInstall(){
  if(xInit) return; xInit=true;
  const st=document.createElement('style');
  st.textContent='.xicons{display:flex;justify-content:flex-end;gap:10px;margin:16px 0 0}.xicons .ic{width:56px;height:56px;border-radius:50%;background:#fff;border:3px solid #dccfae;box-shadow:0 3px 0 #dccfae;display:flex;align-items:center;justify-content:center;font-size:26px;text-decoration:none;padding:0;cursor:pointer;color:inherit;font-family:inherit}.xicons .ic.xhold{background-image:linear-gradient(#ffcf70,#ffcf70);background-repeat:no-repeat;background-size:0 100%}.xicons .ic.xhold.hold{background-size:100% 100%;transition:background-size .9s linear}';
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
function xLabel(off){ return off?'🔇':'🔊'; }
function xSoundLabel(){
  const s=document.getElementById('bSound'); return xLabel(!!s&&s.textContent.indexOf('🔇')>=0);
}
function extras(){
  xInstall();
  return '<div class="xicons"><button class="ic xhold" data-x="parent" aria-label="부모님 (꾹 누르기)">🙅🏻‍♀️</button><button class="ic" data-x="sound" aria-label="소리">'+xSoundLabel()+'</button><a class="ic" href="../" aria-label="처음으로">🏠</a></div>';
}
window.Guard={
  extras,
  start(o){
    opts=o||{};
    if(opts.hub){ started=false;
      if(!LS.get('parent',null)){ open('<div class="big">⏱️</div><h2>부모님이 시간을 먼저 설정해주세요</h2><div class="sub">시간 제한과 확인 방법(지문/PIN)을 정하면 게임을 할 수 있어요.</div><a class="go" href="chess/" style="display:block;line-height:64px;text-decoration:none;text-align:center">부모님 설정하러 가기</a><a class="go alt" href="multiply/" style="display:block;line-height:56px;text-decoration:none;text-align:center">✖️ 곱셈 몬스터</a>','setup'); return; }
      if(timeLeft()<=0) showLock(); return; }
    if(opts.free){ started=false; tick(true); return; }
    if(!LS.get('parent',null)){ location.replace('../'); return; }
    started=true; tickLast=Date.now();
    if((!opts.noLimit||opts.lockOnly)&&timeLeft()<=0) showLock();
    tick(true);
  },
  parentFlow,
  label(sec){ return sec===Infinity?'⏱ 시간 제한 없음':'⏱ 남은 시간 '+(()=>{const t=Math.max(0,Math.ceil(sec));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');})(); },
  LS
};
})();
