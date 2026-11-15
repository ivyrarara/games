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
function limChips(cur){ return [15,30,45,60,90,0].map(v=>'<button class="chip'+(cur===v?' on':'')+'" data-gl="'+v+'">'+(v?v+'분':'제한 없음')+'</button>').join(''); }
function showLock(){ open('<div class="big">🌙</div><h2>오늘 놀이 시간이 끝났어요</h2><div class="sub">내일 또 만나요!</div><button class="go alt" data-ga="parent">👪 부모님 확인</button>','lock'); }
function showParent(){
  const s=dayState(), lim=LS.get('limit',30);
  let h='<h2>👪 부모님 설정</h2><div class="sub">오늘 '+Math.floor(s.used/60)+'분 사용 · '+(lim?'한도 '+(lim+s.extra)+'분':'제한 없음')+'</div>';
  if(lim) h+='<div class="row"><b>오늘만 시간 더 주기</b><div class="chips">'+[10,20,30].map(v=>'<button class="chip" data-ga="extra" data-v="'+v+'">+'+v+'분</button>').join('')+'</div></div>';
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
  else if(a==='score-yes'){ LS.set('score.chess',null); LS.set('score.algakki',null); LS.set('score.mult',null); LS.set('mult.hwdone',null); resetAsk=false; if(opts.onReset) opts.onReset(); showParent(); }
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
window.Guard={
  start(o){
    opts=o||{};
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
