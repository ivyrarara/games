import re
p=open('page.html').read(); e=open('engine.js').read().replace("if(typeof module!=='undefined') module.exports","if(false) module.exports")
m=open('module.js').read()
def rep(a,b,cnt=1):
    global p
    assert p.count(a)==cnt,(a,p.count(a)); p=p.replace(a,b)
rep('<title>Chess</title>','<title>Chess</title>\n<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#f4ecd8">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<link rel="apple-touch-icon" href="icon-192.png">\n<link rel="icon" href="icon-192.png">')
rep('    <div class="btns">','    <div class="info"><div id="scoreBox" class="box time"></div><div id="timeBox" class="box time"></div></div>\n    <div class="btns">')
rep('<button class="btn wide" id="bMenu">☰ 새 게임</button>','<button class="btn" id="bMenu">☰ 새 게임</button>\n      <button class="btn holdable" id="bParent">👪 부모님<small>꾹 누르기</small></button>')
rep('.btns{grid-template-columns:repeat(5,1fr)}','.btns{grid-template-columns:repeat(3,1fr)}')
rep('</style>','''.time{font-size:17px;padding:8px 14px;text-align:center}
.time.low{background:#fff0c9;border-color:#e0a100}
.btn small{display:block;font-size:12px;opacity:.6}
.btn.holdable{background-image:linear-gradient(#ffcf70,#ffcf70);background-repeat:no-repeat;background-size:0 100%}
.btn.hold{background-size:100% 100%;transition:background-size .9s linear}
.sub{font-size:16px;opacity:.75;margin:4px 0 8px}
.sub.err{color:#a52a0d;opacity:1}
.pins{display:flex;gap:14px;justify-content:center;margin:10px 0 14px}
.pin{width:20px;height:20px;border-radius:50%;border:3px solid var(--ink)}
.pin.on{background:var(--ink)}
.pad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:330px;margin:0 auto}
.pad button{min-height:56px;font-size:26px;border:0;border-radius:16px;background:#fff;box-shadow:0 4px 0 var(--edge);cursor:pointer}
.pad button:active{transform:translateY(3px);box-shadow:0 1px 0 var(--edge)}
</style>''')
rep('closeOverlay(); render(); maybeCpu();','closeOverlay(); saveGame(); render(); maybeCpu();')
rep('LM=legalMoves(G); endCheck();','LM=legalMoves(G); endCheck(); saveGame();')
rep('over=false; result=null; animSq=-1; capAnim=null;\n  render();','over=false; result=null; animSq=-1; capAnim=null;\n  saveGame(); render();')
rep("$('bFlip').addEventListener('click',()=>{ flipped=!flipped; render(); });","$('bFlip').addEventListener('click',()=>{ flipped=!flipped; saveGame(); render(); });")
rep("gameId++;\n  do{ undoMove(G); keys.pop(); }","const wasOver=over; gameId++;\n  do{ undoMove(G); keys.pop(); }")
rep("capAnim=null;\n  saveGame(); render();","capAnim=null;\n  if(wasOver) unrecordResult();\n  saveGame(); render();")
rep('LM=legalMoves(G); endCheck(); saveGame();','LM=legalMoves(G); endCheck(); if(over) recordResult(); saveGame();')
rep('closeOverlay(); saveGame(); render(); maybeCpu();','closeOverlay(); scoredKey=null; saveGame(); render(); maybeCpu();')
rep("$('bSound').textContent=muted?'🔇 소리 꺼짐':'🔊 소리';","$('bSound').textContent=muted?'🔇 소리 꺼짐':'🔊 소리';\n  renderScore();")
rep("  h+='<button class=\"go\" data-act=\"start\">시작하기</button>';","  h+='<button class=\"go\" data-act=\"start\">시작하기</button>';\n  h+='<a class=\"go alt\" href=\"algakki/\" style=\"display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)\">🪨 알까기 하러 가기</a>';\n  h+='<a class=\"go alt\" href=\"multiply/\" style=\"display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)\">✖️ 곱셈 몬스터 하러 가기</a>';\n  h+='<a class=\"go alt\" href=\"connect4/\" style=\"display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)\">🔴 Connect 4</a>';\n  h+='<a class=\"go alt\" href=\"spot/\" style=\"display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)\">👀 Spot It</a>';\n  h+='<a class=\"go alt\" href=\"uno/\" style=\"display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)\">🃏 UNO</a>';")
rep('</style>','''.info{display:flex;flex-direction:column;gap:10px}
@media (orientation:portrait){.info{flex-direction:row;gap:8px}.info>.box{flex:1;padding:8px 6px;font-size:15px}}
</style>''')
i=p.index('/* boot:'); j=p.index('})();',i)
p=p[:i]+m+'\n'+p[j:]
p=p.replace('<style>','<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jua&display=swap">\n<style>',1).replace('/*ENGINE*/',e)
import re as _re,os as _os
p=_re.sub(r'href="(algakki|multiply|connect4|spot|uno)/',lambda m:'href="../'+m.group(1)+'/',p)
p=p.replace('href="manifest.webmanifest"','href="../manifest.webmanifest"').replace('href="icon-192.png"','href="../icon-192.png"').replace("register('sw.js')","register('../sw.js')")
_k="  h+='<a class=\"go alt\" href=\"../algakki/\"".replace('\\"','"')
_n=p.count('  h+=\'<a class="go alt" href="../algakki/"')
assert _n==1,_n
p=p.replace('  h+=\'<a class="go alt" href="../algakki/"','  h+=\'<a class="go alt" href="../" style="display:block;text-align:center;line-height:56px;text-decoration:none;color:var(--ink)">🏠 처음 화면</a>\';\n  h+=\'<a class="go alt" href="../algakki/"',1)
p=_re.sub(r"(  h\+='<a class=\"go alt\" href=\"\.\./uno/\"[^\n]*\n)",lambda m:m.group(1)+m.group(1).replace('../uno/','../memory/').replace('🃏 UNO','🧠 Memory'),p,count=1)
p=_re.sub(r"  h\+='<a class=\"go alt\" href=\"\.\./(algakki|multiply|connect4|spot|uno|memory)/\"[^\n]*\n",'',p)
p=p.replace('🏠 처음 화면','🏠 처음으로')
_os.makedirs('chess',exist_ok=True)
open('chess/index.html','w').write(p)
