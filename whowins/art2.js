/* 동물 그림 2 — 포유류와 바다 동물 */
(function(){
const ART=window.WW_ART;
const O='stroke="#14212b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
const eye=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r||2.4}" fill="#0d141a" stroke="none"/><circle cx="${x+.8}" cy="${y-.8}" r="${(r||2.4)*.35}" fill="#fff" stroke="none"/>`;
const rc=(s,m)=>{ for(const k in m) s=s.split(k).join(m[k]); return s; };

/* 사자: 갈기가 있어요 */
ART.lion=`<g ${O}>
<rect x="84" y="72" width="14" height="20" rx="3" fill="#b88547"/><rect x="122" y="72" width="14" height="20" rx="3" fill="#b88547"/>
<path d="M32 50 C16 52 8 42 12 28 C16 34 22 40 32 44 Z" fill="#d9a15a"/>
<path d="M10 28 q-3 -8 4 -10 q7 2 4 10 q-4 3 -8 0 Z" fill="#7a4a22"/>
<path d="M30 44 C42 32 72 30 100 32 C122 34 138 36 148 42 C158 40 172 42 184 48 C192 54 194 64 186 68 L170 68 C164 72 160 74 154 72 L150 92 L136 92 L138 74 L128 74 C112 78 92 76 80 74 L78 92 L64 92 L62 74 C46 72 30 64 30 44 Z" fill="#d9a15a"/>
<path d="M62 74 C80 80 112 80 128 74 L138 74 C140 68 150 68 154 72 C130 76 90 80 62 74 Z" fill="#f3dfb8" stroke="none"/>
<path d="M140 40 C132 22 156 10 176 20 C196 30 196 56 182 70 C172 80 150 76 144 62 Z" fill="#7a4a22"/>
<path d="M150 50 C152 36 176 34 188 46 C194 56 190 66 180 68 L164 68 C156 66 150 58 150 50 Z" fill="#d9a15a"/>
<path d="M160 36 L164 26 L172 36 Z" fill="#c78d4a" stroke-width="1.8"/>
<path d="M186 64 C178 70 166 68 162 62 C172 62 180 62 186 64 Z" fill="#f3dfb8" stroke-width="1.4"/>
<circle cx="190" cy="53" r="2.6" fill="#2a1a1a" stroke="none"/>
${eye(176,48,2.3)}</g>`;

/* 표범 / 치타: 재규어 변형 */
ART.leopard=rc(ART.jaguar,{'#e8ad4e':'#e2bd68','#e4a64a':'#e2bd68'});
ART.cheetah=rc(ART.jaguar,{'#e8ad4e':'#e6c070','#e4a64a':'#e6c070','stroke="#2a1a10" stroke-width="2.4"':'stroke="#2a1a10" stroke-width="0"'}).replace(/<g fill="#2a1a10" stroke="none">/,'<g fill="#2a1a10" stroke="none"><circle cx="50" cy="48" r="3"/><circle cx="68" cy="42" r="3"/><circle cx="88" cy="42" r="3"/><circle cx="108" cy="44" r="3"/><circle cx="126" cy="48" r="3"/><circle cx="58" cy="62" r="3"/><circle cx="80" cy="58" r="3"/><circle cx="102" cy="58" r="3"/><circle cx="122" cy="62" r="3"/><circle cx="76" cy="50" r="2.6"/><circle cx="96" cy="50" r="2.6"/>');

/* 북극곰: 불곰 변형 */
ART.polarbear=rc(ART.bear,{'#7b5238':'#f1efe6','#6a4630':'#e4e1d6','#8c6144':'#e4e1d6','#5e3c28':'#d6d3c6','#a78460':'#c9c5b6'});

/* 늑대 */
ART.wolf=`<g ${O}>
<rect x="88" y="70" width="12" height="22" rx="3" fill="#6f7479"/><rect x="122" y="70" width="12" height="22" rx="3" fill="#6f7479"/>
<path d="M32 46 C18 50 8 62 6 80 C14 70 24 64 36 62 Z" fill="#8a9096"/>
<path d="M30 52 C34 36 64 30 96 32 C118 34 136 38 148 44 C158 40 176 42 190 52 C197 58 197 64 190 66 L170 64 C164 68 160 72 154 70 L152 92 L138 92 L140 72 L130 72 C114 76 98 74 86 72 L84 92 L68 92 L68 70 C46 66 30 62 30 52 Z" fill="#9aa0a6"/>
<path d="M68 70 C88 76 116 76 130 72 L140 72 C142 66 152 66 154 70 C130 76 90 80 68 70 Z" fill="#e6e8ea" stroke="none"/>
<path d="M152 44 L156 28 L168 42 Z" fill="#8a9096"/>
<path d="M180 62 C186 66 192 64 196 60 L190 56 Z" fill="#e6e8ea" stroke-width="1.4"/>
<circle cx="196" cy="58" r="2.6" fill="#1d1a18" stroke="none"/>
<path d="M60 40 q8 -6 20 -6 M100 36 q8 0 14 4" fill="none" stroke="#6f7479" stroke-width="3"/>
${eye(176,50,2.2)}</g>`;

/* 하이에나: 등이 앞으로 높고 뒤로 경사 */
ART.hyena=`<g ${O}>
<rect x="86" y="68" width="12" height="24" rx="3" fill="#a08a63"/><rect x="118" y="66" width="12" height="26" rx="3" fill="#a08a63"/>
<path d="M30 60 C20 62 12 70 10 82 C18 74 26 70 34 70 Z" fill="#6a5a3e"/>
<path d="M30 60 C36 48 64 40 92 30 C112 24 134 26 146 36 C156 34 172 36 186 46 C196 52 196 60 188 64 L170 64 C164 70 160 72 154 70 L152 92 L138 92 L140 72 L128 72 C112 76 96 76 86 74 L84 92 L66 92 L66 74 C44 72 30 68 30 60 Z" fill="#b9a276"/>
<path d="M66 74 C88 80 116 80 128 72 L140 72 C142 66 152 66 154 70 C130 78 90 82 66 74 Z" fill="#e6dcc0" stroke="none"/>
<g fill="#3a2d1a" stroke="none"><circle cx="64" cy="54" r="3.5"/><circle cx="82" cy="44" r="3.5"/><circle cx="100" cy="42" r="3.5"/><circle cx="118" cy="46" r="3.5"/><circle cx="76" cy="62" r="3.2"/><circle cx="98" cy="60" r="3.2"/></g>
<path d="M104 30 q10 -10 24 -4 M108 34 q10 -6 22 0" fill="none" stroke="#6a5a3e" stroke-width="3"/>
<path d="M150 42 L152 28 L164 38 Z" fill="#a08a63"/>
<path d="M172 54 C182 52 192 56 196 62 L180 64 Z" fill="#4a3d2a" stroke-width="1.4"/>
<path d="M170 58 C176 52 186 52 192 56" fill="#4a3d2a" stroke="none"/>
${eye(172,46,2.2)}</g>`;

/* 아프리카물소 */
ART.buffalo=`<g ${O}>
<rect x="88" y="72" width="16" height="20" rx="3" fill="#2f2b2a"/><rect x="124" y="72" width="16" height="20" rx="3" fill="#2f2b2a"/>
<path d="M30 46 C22 50 18 62 22 74 L32 66 Z" fill="#3a3533"/>
<path d="M28 56 C28 34 64 24 100 26 C122 26 138 30 148 38 C158 34 172 38 180 46 C186 52 188 62 182 70 L170 74 L166 70 L158 72 L156 92 L138 92 L138 76 C120 80 102 80 90 78 L90 92 L68 92 L68 74 C46 72 28 68 28 56 Z" fill="#43403e"/>
<path d="M150 36 C140 26 136 14 146 8 C148 16 154 22 164 28 M176 40 C188 34 194 22 190 12 C184 20 180 26 172 32" fill="#e8dfc8" stroke-width="2.4"/>
<path d="M150 36 C146 26 152 18 160 18 C172 18 180 28 176 40 Z" fill="#2f2b2a" stroke-width="2"/>
<path d="M176 60 C182 66 188 68 190 74 L178 74 Z" fill="#5a5250" stroke-width="1.4"/>
${eye(172,50,2.2)}</g>`;

/* 고릴라 (손등으로 걷는 모습) */
ART.gorilla=`<g ${O}>
<rect x="64" y="70" width="22" height="24" rx="8" fill="#2f3135"/>
<path d="M24 66 C20 46 48 30 82 28 C108 26 124 32 136 40 C142 36 152 36 158 42 C166 40 176 44 178 52 C180 60 174 66 166 66 C160 74 154 78 150 78 L152 94 L126 94 C124 86 120 78 118 72 C100 78 84 78 76 72 C52 74 30 72 24 66 Z" fill="#3a3d42"/>
<path d="M100 40 C112 50 130 60 144 76 L156 94 L130 94 L118 72 C106 62 96 52 100 40 Z" fill="#454950"/>
<ellipse cx="164" cy="48" rx="14" ry="11" fill="#2b2d31"/>
<path d="M150 40 C150 28 166 24 174 34" fill="#5b5f66" stroke-width="2"/>
<ellipse cx="170" cy="56" rx="9" ry="6" fill="#6b6e75" stroke-width="1.6"/>
<circle cx="166" cy="58" r="1.4" fill="#111" stroke="none"/><circle cx="173" cy="58" r="1.4" fill="#111" stroke="none"/>
<path d="M166 63 q5 3 10 0" fill="none" stroke-width="1.6"/>
<path d="M104 36 C112 30 124 30 130 36" fill="none" stroke="#c9ced6" stroke-width="3" opacity=".7"/>
<ellipse cx="158" cy="45" rx="2.6" ry="2" fill="#0d141a" stroke="none"/></g>`;

/* 울버린 */
ART.wolverine=`<g ${O}>
<rect x="76" y="72" width="12" height="20" rx="3" fill="#2b221b"/><rect x="128" y="72" width="12" height="20" rx="3" fill="#2b221b"/>
<path d="M30 62 C16 62 8 72 8 86 C18 76 28 74 36 72 Z" fill="#3a2d22"/>
<path d="M30 62 C32 44 64 36 100 38 C124 38 140 42 150 48 C160 46 174 48 184 56 C192 62 192 68 186 72 L170 74 L164 74 L158 76 L158 92 L140 92 L140 78 C118 82 100 82 90 80 L90 92 L68 92 L68 76 C46 74 30 72 30 62 Z" fill="#4b3a2a"/>
<path d="M44 52 C60 44 92 42 120 46 C134 48 142 52 148 58" fill="none" stroke="#c9ad7a" stroke-width="6"/>
<path d="M152 50 L154 40 L164 48 Z" fill="#3a2d22"/>
<path d="M176 64 C182 68 190 66 194 62 Z" fill="#c9ad7a" stroke-width="1.4"/>
<circle cx="192" cy="60" r="2.6" fill="#0d141a" stroke="none"/>
<path d="M162 76 l-3 5 M168 76 l-3 5" fill="none" stroke="#f4ecd8" stroke-width="1.8"/>
${eye(174,56,2.2)}</g>`;

/* 태즈메이니아데빌 */
ART.tasdevil=`<g ${O}>
<rect x="80" y="74" width="12" height="18" rx="3" fill="#1b1b1f"/><rect x="132" y="74" width="12" height="18" rx="3" fill="#1b1b1f"/>
<path d="M34 66 C22 66 14 72 12 82 C22 78 30 76 38 76 Z" fill="#25252a"/>
<path d="M34 64 C34 48 62 42 96 44 C122 44 140 48 152 54 C164 52 178 56 188 62 C194 68 192 74 186 76 L170 78 L162 78 L160 92 L140 92 L140 80 C122 84 104 84 94 82 L94 92 L70 92 L70 78 C48 76 34 72 34 64 Z" fill="#2b2b31"/>
<path d="M104 52 C112 62 112 72 104 82 C120 80 132 74 136 62 Z" fill="#f4f4f0" stroke-width="1.6"/>
<path d="M152 56 L152 46 L164 54 Z" fill="#c26b6b" stroke-width="2"/>
<path d="M178 70 C184 72 190 72 194 68 L188 66 Z" fill="#c26b6b" stroke-width="1.4"/>
<path d="M176 70 l2 4 l2 -4 M184 70 l2 4 l2 -4" fill="#fff" stroke-width="1"/>
<circle cx="192" cy="64" r="2.6" fill="#0d141a" stroke="none"/>
${eye(176,60,2.2)}</g>`;

/* 몽구스 */
ART.mongoose=`<g ${O}>
<rect x="76" y="66" width="10" height="26" rx="3" fill="#7a6a4a"/><rect x="132" y="66" width="10" height="26" rx="3" fill="#7a6a4a"/>
<path d="M30 60 C14 56 6 66 8 82 C16 72 24 68 36 70 Z" fill="#9a8964"/>
<path d="M30 60 C36 44 70 40 100 42 C124 44 140 46 152 54 C166 52 182 56 194 64 C196 68 192 72 186 72 L164 72 L158 74 L156 92 L142 92 L142 76 C126 78 108 78 96 76 L94 92 L78 92 L78 72 C52 72 32 70 30 60 Z" fill="#a8946a"/>
<path d="M60 56 q6 -6 14 -2 M84 52 q6 -6 14 -2 M108 54 q6 -4 14 0" fill="none" stroke="#7a6a4a" stroke-width="2"/>
<path d="M156 54 L158 44 L168 52 Z" fill="#9a8964"/>
<circle cx="192" cy="63" r="2.6" fill="#0d141a" stroke="none"/>
${eye(176,58,2.1)}</g>`;

/* 황소상어, 귀상어: 상어 변형 */
ART.bullshark=rc(ART.shark,{'#84a0b6':'#7a8794','#5f7a91':'#56616c','#6a8399':'#56616c'}).replace(/<path d="M146 46 q3 6[^>]*>/,'<path d="M150 46 q3 6 0 13 M156 46 q3 6 0 13" fill="none" stroke-width="1.8"/>');
ART.hammerhead=`<g ${O}>
<path d="M10 36 Q28 48 36 55 Q28 64 12 84 Q16 62 24 56 Q16 50 10 36 Z" fill="#6f7b86"/>
<path d="M32 52 C56 38 100 34 128 40 C150 44 164 50 172 56 C150 72 130 76 108 74 C84 76 56 68 32 59 Z" fill="#8a9aa8"/>
<path d="M38 59 C62 68 90 74 108 74 C130 76 150 72 172 56 C150 66 130 66 108 66 C90 66 62 62 38 59 Z" fill="#eef2f4" stroke="none"/>
<path d="M92 36 L110 6 L128 40 Z" fill="#75868f"/>
<path d="M108 72 L90 94 L132 76 Z" fill="#75868f"/>
<path d="M170 44 C176 40 192 38 197 40 L198 62 C192 64 178 62 170 58 Z" fill="#8a9aa8"/>
<path d="M146 48 q3 6 0 12 M152 49 q3 6 0 11" fill="none" stroke-width="1.8"/>
${eye(192,42,2.4)}${eye(180,60,2.4)}</g>`;

/* 향유고래 */
ART.spermwhale=`<g ${O}>
<path d="M30 54 Q14 40 2 42 Q10 54 14 58 Q8 66 2 76 Q18 72 30 62 Z" fill="#59656f"/>
<path d="M28 54 C40 34 80 28 124 28 C160 26 190 30 197 44 C198 56 190 72 170 76 C140 82 80 82 48 70 C36 66 30 60 28 54 Z" fill="#6b7882"/>
<path d="M50 70 C90 82 140 82 170 76 C186 72 194 62 197 52 C180 66 150 70 120 70 C92 70 68 66 50 70 Z" fill="#aab4bc" stroke="none"/>
<path d="M96 28 q4 -8 10 0" fill="#59656f"/>
<path d="M60 40 q10 6 8 16 M72 38 q10 6 8 18 M84 36 q10 6 8 20 M96 36 q10 6 8 20 M108 36 q10 6 8 18" fill="none" stroke="#56626c" stroke-width="2" opacity=".7"/>
<path d="M150 60 Q154 88 168 84 Q164 72 162 62 Z" fill="#59656f"/>
<path d="M190 62 q-12 6 -24 2" fill="none" stroke-width="1.8"/>
${eye(176,52,2.4)}</g>`;

/* 대왕오징어 */
ART.squid=`<g ${O}>
<path d="M120 50 C150 20 196 20 198 50 C196 80 150 80 120 50 Z" fill="#b4413c"/>
<path d="M170 22 L186 8 L196 30 Z M170 78 L186 92 L196 70 Z" fill="#a23834"/>
<path d="M122 42 C90 30 60 38 24 30 M122 46 C86 42 56 54 22 56 M122 50 C86 52 56 68 24 82 M122 54 C94 62 70 80 40 92 M122 58 C100 72 84 86 66 96" fill="none" stroke="#b4413c" stroke-width="9"/>
<path d="M122 42 C90 30 60 38 24 30 M122 46 C86 42 56 54 22 56 M122 50 C86 52 56 68 24 82 M122 54 C94 62 70 80 40 92 M122 58 C100 72 84 86 66 96" fill="none" stroke="#d96a63" stroke-width="4"/>
<path d="M24 30 C12 24 6 26 4 34 C12 32 18 36 24 30 M22 56 C12 58 6 62 6 68" fill="none" stroke="#d96a63" stroke-width="4"/>
<circle cx="132" cy="48" r="10" fill="#fff"/><circle cx="130" cy="48" r="5.5" fill="#0d141a" stroke="none"/><circle cx="128" cy="46" r="1.8" fill="#fff" stroke="none"/></g>`;

ART.squid='<g transform="translate(200 0) scale(-1 1)">'+ART.squid+'</g>';
ART.coin=`<g ${O}><circle cx="100" cy="50" r="46" fill="#cfd5db"/><circle cx="100" cy="50" r="38" fill="none" stroke="#9aa4ae" stroke-width="2"/><path d="M84 60 L100 30 L116 60 Z M88 54 H112" fill="none" stroke="#6b7782" stroke-width="3"/></g>`;
})();
