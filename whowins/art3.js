/* 동물 그림 3 — 파충류와 공룡 */
(function(){
const ART=window.WW_ART;
const O='stroke="#14212b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
const eye=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r||2.4}" fill="#0d141a" stroke="none"/><circle cx="${x+.8}" cy="${y-.8}" r="${(r||2.4)*.35}" fill="#fff" stroke="none"/>`;
const rc=(s,m)=>{ for(const k in m) s=s.split(k).join(m[k]); return s; };

/* 악어 변형 */
ART.seacroc=rc(ART.croc,{'#82934f':'#7b7a52','#6f7f45':'#6a6a46','#68773c':'#5a5a3a','#d7dca0':'#d9d6b0'});
ART.alligator=rc(ART.croc,{'#82934f':'#4f6b4a','#6f7f45':'#435a3e','#68773c':'#38503a','#d7dca0':'#c8d4b4'});

/* 뱀: 아나콘다 몸통을 바꿔서 */
const snake=(body,spot,path,head)=>`<g ${O}>
<path d="${path}" fill="none" stroke="#14212b" stroke-width="${head.w+4}"/>
<path d="${path}" fill="none" stroke="${body}" stroke-width="${head.w}"/>
${head.deco||''}
<path d="${head.h}" fill="${body}"/>
<path d="M197 ${head.ty} L206 ${head.ty+4} M197 ${head.ty} L206 ${head.ty-4}" fill="none" stroke="#c4282d" stroke-width="1.8"/>
${eye(head.ex,head.ey,2.4)}</g>`;
const P1='M10 76 C26 94 54 94 66 78 C78 62 98 58 114 70 C128 80 146 80 156 68 C164 58 162 50 172 46';
ART.python=snake('#b79a58','',P1,{w:16,ty:46,ex:184,ey:41,h:'M164 40 C172 32 192 34 197 44 C198 52 190 56 180 54 C172 54 166 48 164 40 Z',
 deco:'<g fill="#6a4e22" stroke="none"><path d="M20 82 l8 -6 l6 8 z M42 88 l8 -6 l6 8 z M66 76 l8 -6 l6 8 z M92 62 l8 -6 l6 8 z M118 72 l8 -6 l6 8 z M142 76 l8 -6 l6 8 z"/></g>'});
ART.kingcobra=`<g ${O}>
<path d="M6 84 C30 96 60 90 72 76 C86 60 108 66 122 78 C134 86 150 82 154 66" fill="none" stroke="#14212b" stroke-width="20"/>
<path d="M6 84 C30 96 60 90 72 76 C86 60 108 66 122 78 C134 86 150 82 154 66" fill="none" stroke="#6f6a3a" stroke-width="16"/>
<path d="M154 66 C150 50 150 38 160 30" fill="none" stroke="#14212b" stroke-width="20"/>
<path d="M154 66 C150 50 150 38 160 30" fill="none" stroke="#6f6a3a" stroke-width="16"/>
<path d="M150 44 C140 34 150 14 168 14 C186 14 192 30 180 44 C172 52 160 52 150 44 Z" fill="#7d7842"/>
<path d="M160 14 C170 8 190 14 194 28 C196 36 192 40 186 42 C176 44 164 40 160 14 Z" fill="#7d7842"/>
<path d="M176 40 C184 44 196 42 198 34 C196 28 188 26 182 28 Z" fill="#f0e6b4" stroke-width="1.6"/>
<path d="M198 36 L207 40 M198 36 L207 32" fill="none" stroke="#c4282d" stroke-width="1.6"/>
<path d="M156 52 q8 4 16 0" fill="none" stroke="#3d3a1c" stroke-width="2.4"/>
<path d="M30 90 l-3 -8 M50 88 l-3 -8 M90 66 l3 -8 M112 72 l3 -8" fill="none" stroke="#4b4826" stroke-width="3"/>
${eye(178,28,2.6)}</g>`;
ART.mamba=snake('#7a7f78','',P1,{w:10,ty:46,ex:184,ey:41,h:'M164 42 C172 36 192 38 197 46 C198 52 190 54 180 53 C172 52 166 48 164 42 Z',deco:''});

/* 코모도왕도마뱀 */
ART.komodo=`<g ${O}>
<path d="M4 72 C28 74 46 66 60 58 L58 74 C40 82 20 82 4 72 Z" fill="#7a6a4e"/>
<path d="M40 62 C58 48 96 46 124 52 C146 50 172 52 196 58 L197 64 C180 66 160 66 146 68 C140 74 132 80 124 80 L122 92 L106 92 L108 82 C94 84 80 84 68 80 L66 92 L50 92 L52 78 C44 74 40 68 40 62 Z" fill="#8a7a5a"/>
<path d="M58 76 C84 84 112 84 130 78 C140 74 146 70 148 68 C170 66 184 66 197 64 C180 70 160 72 140 76 C112 86 80 86 58 76 Z" fill="#cdbf9c" stroke="none"/>
<g fill="#6a5a3e" stroke="none"><circle cx="64" cy="58" r="3"/><circle cx="82" cy="54" r="3"/><circle cx="100" cy="54" r="3"/><circle cx="118" cy="58" r="3"/><circle cx="72" cy="66" r="2.6"/><circle cx="92" cy="64" r="2.6"/></g>
<path d="M150 64 L196 64" fill="none" stroke-width="1.6"/>
<path d="M197 60 l9 -4 m-9 4 l9 2" fill="none" stroke="#c4282d" stroke-width="1.6"/>
<circle cx="190" cy="57" r="1.6" fill="#0d141a" stroke="none"/>
${eye(160,56,2.3)}</g>`;

/* 공룡 변형들 */
ART.allosaurus=rc(ART.trex,{'#7aa05a':'#b5693a','#6b8f4e':'#99562e','#cfe0a4':'#e8c9a6','#4f7036':'#7a3f20'});
ART.spinosaurus=`<g ${O}>
<path d="M4 64 C28 64 46 58 60 50 L56 68 C40 72 20 70 4 64 Z" fill="#4f7d82"/>
<path d="M60 20 L66 38 L76 14 L86 36 L98 10 L108 34 L120 14 L126 38 L136 40 L130 52 L60 52 Z" fill="#c24a3a"/>
<path d="M44 58 C54 42 80 38 100 40 C112 30 138 26 162 28 C186 28 197 36 197 44 C197 52 186 54 172 54 L150 54 C146 66 138 74 130 80 L128 96 L110 96 L112 86 C104 88 96 88 90 84 L88 96 L70 96 L76 78 C60 74 48 68 44 58 Z" fill="#5f9399"/>
<path d="M76 78 C84 86 98 88 112 86 C122 82 130 74 132 66 C120 70 96 74 76 78 Z" fill="#d6e8e6" stroke="none"/>
<path d="M160 52 L197 50" fill="none" stroke-width="1.6"/>
<path d="M168 53 l2 5 l3 -5 M178 53 l2 5 l3 -5 M188 52 l2 4 l3 -4" fill="#fff" stroke-width="1"/>
<path d="M126 58 L140 66 L128 70" fill="#4f7d82"/>
${eye(168,36,2.8)}</g>`;
ART.raptor=`<g ${O}>
<path d="M6 60 C28 66 50 62 66 54 L64 70 C44 76 24 72 6 60 Z" fill="#8a6f4a"/>
<path d="M50 62 C60 44 88 38 108 40 C118 32 140 30 160 34 C182 38 192 46 192 54 C192 60 182 62 170 62 L152 62 C148 72 142 80 136 84 L134 96 L120 96 L122 88 C116 90 108 90 102 86 L100 96 L86 96 L90 82 C70 78 54 72 50 62 Z" fill="#a98558"/>
<path d="M90 82 C98 88 112 90 122 88 C130 84 136 78 138 72 C124 76 106 80 90 82 Z" fill="#e3cfa6" stroke="none"/>
<path d="M130 62 l12 8 l-8 4" fill="#8a6f4a"/>
<path d="M128 94 l8 6 l-4 -10" fill="#f4ecd8" stroke-width="1.6"/>
<path d="M162 62 L190 58" fill="none" stroke-width="1.5"/>
<path d="M168 62 l2 4 l2 -4 M176 61 l2 4 l2 -4 M184 59 l2 4 l2 -4" fill="#fff" stroke-width="1"/>
<path d="M104 42 q10 -14 22 -4 M112 44 q8 -10 18 -2 M40 58 q6 -10 14 -4" fill="none" stroke="#c24a3a" stroke-width="3"/>
${eye(172,44,2.6)}</g>`;
ART.protoceratops=`<g ${O}>
<path d="M4 66 C24 66 38 62 50 56 L48 70 C30 74 16 72 4 66 Z" fill="#a98a5c"/>
<path d="M28 58 C34 42 70 38 100 42 C124 44 136 48 142 58 L146 68 L146 86 L132 86 L130 92 L116 92 L116 76 C100 82 80 82 66 78 L64 92 L50 92 L50 80 C38 76 28 68 28 58 Z" fill="#b99c6a"/>
<ellipse cx="146" cy="50" rx="16" ry="20" fill="#c9774a"/>
<path d="M148 54 C164 50 182 56 194 66 C196 72 188 78 176 78 L150 74 Z" fill="#b99c6a"/>
<path d="M186 62 L196 56 L192 68 Z" fill="#f4ecd8" stroke-width="1.6"/>
${eye(166,58,2.4)}</g>`;
ART.stegosaurus=`<g ${O}>
<path d="M4 70 C22 72 40 68 56 60 L54 76 C38 82 18 80 4 70 Z" fill="#6e8a4a"/>
<path d="M50 42 L58 18 L72 38 Z M74 38 L84 8 L100 36 Z M102 36 L114 8 L128 38 Z M130 40 L140 18 L150 44 Z" fill="#d9803a"/>
<path d="M30 64 C34 44 74 34 112 38 C136 40 150 46 156 56 L172 62 C186 62 196 66 196 72 C196 78 186 80 174 78 L158 76 L156 94 L136 94 L134 80 C116 84 96 84 82 80 L80 94 L58 94 L58 82 C40 78 28 72 30 64 Z" fill="#7d9a56"/>
<path d="M62 82 C90 88 120 88 136 80 L156 78 C146 86 120 92 90 90 C74 90 66 86 62 82 Z" fill="#d6e2b4" stroke="none"/>
<path d="M12 70 L2 62 M18 76 L6 78" fill="none" stroke="#f4ecd8" stroke-width="3.4"/>
${eye(178,66,2.4)}</g>`;
ART.ankylosaurus=`<g ${O}>
<path d="M4 72 C20 72 34 70 46 64 L46 80 C30 84 14 82 4 72 Z" fill="#8a7a56"/>
<circle cx="10" cy="72" r="10" fill="#6d5f40"/>
<path d="M30 68 C30 40 70 30 110 34 C140 36 156 44 160 58 L176 62 C190 64 196 70 194 76 C190 82 178 82 164 80 L162 94 L140 94 L138 82 C120 86 98 86 84 82 L82 94 L58 94 L58 84 C40 80 30 76 30 68 Z" fill="#9a8a64"/>
<g fill="#6d5f40" stroke-width="1.8"><path d="M50 50 l8 -12 l8 14 z M72 42 l8 -14 l8 14 z M96 40 l8 -14 l8 14 z M120 42 l8 -14 l8 14 z M142 48 l7 -11 l7 13 z"/></g>
<path d="M62 84 C90 90 122 90 140 82 L162 80 C150 88 124 94 92 92 C76 92 66 88 62 84 Z" fill="#d9ceaa" stroke="none"/>
<path d="M168 60 l6 -10 l6 12 z" fill="#6d5f40" stroke-width="1.8"/>
${eye(178,68,2.4)}</g>`;

})();
