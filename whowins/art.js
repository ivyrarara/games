/* 누가 이길까? — 직접 그린 동물 그림 (모두 오른쪽을 보는 옆모습, 200x100) */
(function(){
const O='stroke="#14212b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
const eye=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r||2.4}" fill="#0d141a" stroke="none"/><circle cx="${x+.8}" cy="${y-.8}" r="${(r||2.4)*.35}" fill="#fff" stroke="none"/>`;
const ART={};

ART.shark=`<g ${O}>
<path d="M10 36 Q28 48 36 55 Q28 64 12 84 Q16 62 24 56 Q16 50 10 36 Z" fill="#5f7a91"/>
<path d="M32 52 C56 36 100 32 130 38 C160 42 184 54 197 62 C180 72 150 76 118 74 C84 76 56 68 32 59 Z" fill="#84a0b6"/>
<path d="M38 59 C62 68 90 74 118 74 C150 76 180 72 197 62 C176 66 150 66 120 66 C90 66 62 62 38 59 Z" fill="#f1f5f7" stroke="none"/>
<path d="M38 59 C62 68 90 74 118 74 C150 76 180 72 197 62" fill="none"/>
<path d="M94 35 L112 6 L130 39 Z" fill="#6a8399"/>
<path d="M110 70 L92 94 L136 74 Z" fill="#6a8399"/>
<path d="M68 68 L60 80 L82 70 Z" fill="#6a8399"/>
<path d="M146 46 q3 6 0 13 M153 46 q3 6 0 13 M160 48 q3 6 0 12" fill="none" stroke-width="1.8"/>
<path d="M188 65 Q176 70 163 65" fill="none" stroke-width="1.8"/>
<path d="M186 66 l2 4 l2 -4 M178 68 l2 4 l2 -4 M170 67 l2 4 l2 -4 M163 66 l2 3.5 l2 -3.5" fill="#fff" stroke-width="1.2"/>
${eye(183,57,2.6)}</g>`;

ART.orca=`<g ${O}>
<path d="M30 52 Q16 38 3 40 Q11 50 15 54 Q9 60 3 68 Q18 66 30 58 Z" fill="#1f2733"/>
<path d="M28 52 C50 30 108 26 140 36 C168 44 188 52 197 59 C182 72 156 78 122 78 C84 80 48 70 28 58 Z" fill="#202a38"/>
<path d="M58 72 C90 80 124 80 150 74 C170 70 186 66 197 59 C180 64 160 64 140 64 C112 64 84 62 58 72 Z" fill="#f6f7f9" stroke="none"/>
<path d="M58 72 C90 80 124 80 150 74 C170 70 186 66 197 59" fill="none"/>
<path d="M102 32 L113 5 L128 36 Z" fill="#202a38"/>
<path d="M104 38 Q122 46 128 60 Q108 54 96 42 Z" fill="#9aa5b2" stroke="none"/>
<path d="M138 68 Q148 96 163 92 Q160 78 156 68 Z" fill="#202a38"/>
<ellipse cx="168" cy="46" rx="10" ry="4.2" transform="rotate(-18 168 46)" fill="#fff" stroke="none"/>
<path d="M186 66 Q176 68 166 64" fill="none" stroke="#f6f7f9" stroke-width="1.6"/>
${eye(177,50,2.2)}</g>`;

ART.trex=`<g ${O}>
<path d="M4 62 C28 62 46 56 60 48 L56 66 C40 70 20 68 4 62 Z" fill="#6b8f4e"/>
<path d="M44 58 C54 40 80 32 100 34 C112 22 138 14 162 16 C186 18 197 28 197 38 C197 48 186 52 172 52 L150 52 C146 64 138 74 130 80 L128 96 L110 96 L112 86 C104 88 96 88 90 84 L88 96 L70 96 L76 78 C60 74 48 68 44 58 Z" fill="#7aa05a"/>
<path d="M76 78 C84 86 98 88 112 86 C122 82 130 74 132 66 C120 70 96 74 76 78 Z" fill="#cfe0a4" stroke="none"/>
<path d="M150 52 C160 58 182 56 196 46" fill="none" stroke-width="1.8"/>
<path d="M156 52 l3 6 l3 -6 M165 55 l3 6 l3 -6 M175 55 l3 5 l3 -5 M185 52 l3 5 l3 -5" fill="#fff" stroke-width="1"/>
<path d="M126 54 L140 62 L128 66" fill="#6b8f4e"/>
<path d="M92 40 q6 -4 10 0 M108 36 q4 -3 8 0" fill="none" stroke="#4f7036" stroke-width="2.4"/>
${eye(166,28,3)}
<path d="M160 22 L176 24" fill="none" stroke-width="1.8"/></g>`;

ART.trike=`<g ${O}>
<path d="M4 62 C24 62 38 58 50 52 L48 66 C30 70 16 68 4 62 Z" fill="#a78a55"/>
<path d="M26 54 C32 38 70 32 106 36 C128 38 140 42 146 52 L150 64 L150 84 L136 84 L134 90 L120 90 L120 74 C104 80 80 80 66 76 L64 92 L50 92 L50 78 C36 74 24 66 26 54 Z" fill="#b99d66"/>
<path d="M104 78 L106 92 L92 92 L90 78 Z M70 76 L70 94 L56 94 L56 78 Z" fill="#9c8250"/>
<ellipse cx="146" cy="46" rx="22" ry="27" fill="#c9774a"/>
<path d="M130 40 a4 4 0 1 0 0.1 0 M138 24 a4 4 0 1 0 0.1 0 M154 22 a4 4 0 1 0 0.1 0 M166 32 a4 4 0 1 0 0.1 0" fill="#e8b384" stroke-width="1.6"/>
<path d="M150 50 C166 46 186 52 197 64 C198 72 190 78 176 78 L150 74 Z" fill="#b99d66"/>
<path d="M162 38 L196 14 L172 46 Z" fill="#f4ecd8"/>
<path d="M158 46 L184 30 L170 52 Z" fill="#f4ecd8" transform="translate(0 4)"/>
<path d="M186 58 L198 48 L194 62 Z" fill="#f4ecd8"/>
${eye(168,52,2.6)}</g>`;

ART.tiger=`<g ${O}>
<rect x="84" y="72" width="14" height="20" rx="3" fill="#c9791f"/><rect x="122" y="72" width="14" height="20" rx="3" fill="#c9791f"/>
<path d="M30 52 C14 52 8 38 12 24 C16 30 22 38 34 42 Z" fill="#e08a2c"/>
<path d="M30 40 C42 30 70 28 100 30 C124 32 140 34 150 40 C158 38 172 38 184 44 C196 50 196 62 186 66 L170 66 C164 70 160 72 154 70 L150 92 L136 92 L138 72 L128 72 C112 76 92 74 80 72 L78 92 L64 92 L62 72 C46 70 30 62 30 40 Z" fill="#ea9a3c"/>
<path d="M62 72 C80 78 112 78 128 72 L138 72 C140 66 150 66 154 70 C130 74 90 78 62 72 Z" fill="#fdf2dc" stroke="none"/>
<path d="M186 66 C176 70 164 68 160 62 C170 62 180 62 186 66 Z" fill="#fdf2dc" stroke-width="1.4"/>
<path d="M44 44 q4 10 2 22 M58 38 q5 12 3 26 M74 34 q5 14 3 30 M92 33 q4 14 2 30 M110 34 q4 12 2 26 M126 38 q3 10 1 22" fill="none" stroke="#1d1710" stroke-width="3.2"/>
<path d="M18 38 q6 4 8 10 M14 28 q6 2 10 6" fill="none" stroke="#1d1710" stroke-width="2.6"/>
<path d="M156 40 L162 26 L172 38 Z" fill="#ea9a3c"/>
<path d="M164 34 q3 -1 4 2" fill="none" stroke="#1d1710" stroke-width="1.6"/>
<path d="M170 44 q6 -2 10 2 M174 52 q6 -1 9 3" fill="none" stroke="#1d1710" stroke-width="2.2"/>
<circle cx="193" cy="52" r="2.6" fill="#2a1a1a" stroke="none"/>
${eye(177,46,2.3)}</g>`;

ART.bear=`<g ${O}>
<rect x="92" y="74" width="16" height="18" rx="3" fill="#5e3c28"/><rect x="116" y="74" width="16" height="18" rx="3" fill="#5e3c28"/>
<path d="M30 56 C26 50 28 42 34 40 L40 52 Z" fill="#6a4630"/>
<path d="M32 50 C34 36 58 26 84 24 C104 22 120 28 132 34 C146 32 164 34 176 40 C190 44 197 52 194 60 C192 66 184 68 176 66 L162 66 C158 72 156 74 150 72 L152 92 L134 92 L134 74 C122 78 106 78 94 76 L92 92 L74 92 L74 74 C52 72 32 66 32 50 Z" fill="#7b5238"/>
<path d="M118 34 C128 22 140 24 146 34 C140 36 128 38 118 34 Z" fill="#8c6144" stroke-width="1.6"/>
<path d="M150 36 L152 28 L160 34 Z" fill="#6a4630"/>
<path d="M176 62 C184 66 192 64 196 58 C190 56 182 58 176 62 Z" fill="#a78460" stroke-width="1.5"/>
<circle cx="195" cy="54" r="3" fill="#1d1710" stroke="none"/>
${eye(172,48,2.4)}</g>`;

ART.croc=`<g ${O}>
<path d="M4 70 C22 70 40 62 56 56 L58 70 C38 78 20 78 4 70 Z" fill="#6f7f45"/>
<path d="M40 60 C58 46 98 44 126 50 C146 48 172 50 196 54 L197 60 C180 62 160 62 146 64 C140 70 132 76 124 76 L122 90 L108 90 L110 78 C96 80 80 80 68 76 L66 90 L52 90 L54 74 C46 70 40 66 40 60 Z" fill="#82934f"/>
<path d="M58 72 C84 80 112 80 130 74 C140 70 146 66 148 64 C170 64 184 62 197 60 C180 64 160 68 140 72 C112 82 80 82 58 72 Z" fill="#d7dca0" stroke="none"/>
<path d="M54 56 l4 -6 l4 6 M70 52 l4 -6 l4 6 M86 50 l4 -6 l4 6 M102 50 l4 -6 l4 6 M118 52 l4 -6 l4 6" fill="#68773c" stroke-width="1.6"/>
<path d="M150 60 L198 62" fill="none" stroke-width="1.6"/>
<path d="M156 61 l2 4 l2 -4 M166 61 l2 4 l2 -4 M176 61 l2 4 l2 -4 M186 61 l2 4 l2 -4" fill="#fff" stroke-width="1"/>
<path d="M136 48 C140 42 150 42 154 48 Z" fill="#82934f" stroke-width="1.6"/>
<circle cx="146" cy="46" r="2.8" fill="#e8c93a" stroke-width="1.4"/><rect x="145.4" y="44" width="1.3" height="4" fill="#0d141a" stroke="none"/>
<circle cx="190" cy="53" r="1.6" fill="#0d141a" stroke="none"/></g>`;

ART.hippo=`<g ${O}>
<rect x="88" y="76" width="20" height="16" rx="3" fill="#7e7288"/><rect x="108" y="76" width="20" height="16" rx="3" fill="#7e7288"/>
<path d="M30 50 C28 44 32 40 38 42 L36 54 Z" fill="#8d8196"/>
<path d="M30 52 C30 32 66 26 100 28 C122 28 134 30 142 36 C156 30 176 32 190 42 C198 50 198 62 190 70 C184 76 170 76 158 74 L150 74 L150 92 L130 92 L130 76 C116 80 100 80 88 78 L86 92 L64 92 L64 76 C44 72 30 64 30 52 Z" fill="#9b8fa5"/>
<path d="M64 76 C88 82 118 82 150 74 C146 80 130 86 110 86 C86 86 70 82 64 76 Z" fill="#c9b9bf" stroke="none"/>
<path d="M158 74 C170 78 186 76 192 68" fill="none" stroke-width="1.8"/>
<path d="M168 73 l2 -5 l3 5 M180 73 l2 -5 l3 5" fill="#fff" stroke-width="1.2"/>
<path d="M148 34 L152 24 L160 34 Z" fill="#8d8196"/>
<circle cx="164" cy="38" r="3.2" fill="#8d8196"/>
<circle cx="182" cy="48" r="2" fill="#2a2030" stroke="none"/><circle cx="188" cy="50" r="2" fill="#2a2030" stroke="none"/>
${eye(168,41,2.4)}</g>`;

ART.elephant=`<g ${O}>
<rect x="96" y="74" width="18" height="20" rx="3" fill="#7f8b97"/><rect x="124" y="74" width="18" height="20" rx="3" fill="#7f8b97"/>
<path d="M26 40 C20 38 14 44 14 54 C16 62 20 66 26 66 L30 56 Z" fill="#8e9aa6"/>
<path d="M26 54 C24 30 60 22 96 24 C120 24 136 28 144 36 C154 30 172 30 180 40 C184 46 182 54 178 60 C170 60 168 66 168 70 L168 94 L148 94 L146 76 C126 78 106 78 92 76 L92 94 L70 94 L70 72 C48 70 28 66 26 54 Z" fill="#9aa6b2"/>
<path d="M108 34 C116 22 144 22 150 40 C150 58 140 68 124 68 C110 64 102 48 108 34 Z" fill="#8a97a3" stroke-width="2"/>
<path d="M176 50 C190 52 197 68 193 86 C191 93 183 94 181 88 C183 78 183 68 174 64 Z" fill="#9aa6b2"/>
<path d="M168 64 C180 70 192 66 198 56 C191 62 181 64 172 60 Z" fill="#f4ecd8"/>
<path d="M184 62 q4 3 5 8 M186 74 q4 3 5 8" fill="none" stroke-width="1.4" opacity=".6"/>
${eye(170,44,2.4)}</g>`;

ART.rhino=`<g ${O}>
<rect x="92" y="76" width="18" height="16" rx="3" fill="#7f878e"/><rect x="118" y="76" width="16" height="16" rx="3" fill="#7f878e"/>
<path d="M32 46 C26 44 22 50 24 58 C26 62 30 62 32 60 Z" fill="#8f979e"/>
<path d="M30 52 C30 34 64 26 100 28 C124 28 138 32 148 38 C160 36 178 40 188 48 C196 54 198 62 192 66 C184 68 172 66 164 64 L156 70 L154 92 L136 92 L136 76 C122 80 104 80 92 78 L90 92 L70 92 L70 76 C48 72 30 66 30 52 Z" fill="#9aa2a9"/>
<path d="M176 40 C182 30 194 22 198 14 C198 28 192 38 188 46 Z" fill="#d9d2bf"/>
<path d="M150 34 L150 22 L160 34 Z" fill="#8f979e"/>
<path d="M90 36 C80 40 76 52 82 62 M120 36 C130 40 136 50 132 62" fill="none" stroke-width="1.6" opacity=".6"/>
<path d="M70 78 C90 82 118 82 136 76" fill="none" stroke-width="1.4" opacity=".5"/>
${eye(172,48,2.2)}</g>`;

ART.anaconda=`<g ${O}>
<path d="M10 72 C26 92 54 92 66 74 C76 60 96 52 112 66 C124 78 142 82 154 68 C162 58 160 48 172 44" fill="none" stroke="#14212b" stroke-width="22"/>
<path d="M10 72 C26 92 54 92 66 74 C76 60 96 52 112 66 C124 78 142 82 154 68 C162 58 160 48 172 44" fill="none" stroke="#6a8a3e" stroke-width="18"/>
<path d="M10 72 C26 92 54 92 66 74 C76 60 96 52 112 66 C124 78 142 82 154 68 C162 58 160 48 172 44" fill="none" stroke="#9bb85a" stroke-width="5" stroke-dasharray="2 9" stroke-linecap="butt" opacity=".9"/>
<path d="M24 80 l-3 4 M44 86 l-1 5 M60 78 l-4 4" fill="none" stroke="#3d5524" stroke-width="5" stroke-dasharray="1 0" opacity="0"/>
<ellipse cx="22" cy="80" rx="4.5" ry="3.2" fill="#3d5524" stroke="none"/><ellipse cx="46" cy="86" rx="4.5" ry="3.4" fill="#3d5524" stroke="none"/><ellipse cx="70" cy="68" rx="4.5" ry="3.4" fill="#3d5524" stroke="none"/><ellipse cx="96" cy="60" rx="4.5" ry="3.4" fill="#3d5524" stroke="none"/><ellipse cx="124" cy="78" rx="4.5" ry="3.4" fill="#3d5524" stroke="none"/><ellipse cx="146" cy="76" rx="4.5" ry="3.4" fill="#3d5524" stroke="none"/><ellipse cx="160" cy="58" rx="4" ry="3" fill="#3d5524" stroke="none"/>
<path d="M164 38 C172 30 192 32 197 42 C198 50 190 54 180 52 C172 52 166 48 164 38 Z" fill="#6a8a3e"/>
<path d="M197 46 L206 50 M197 46 L206 42" fill="none" stroke="#c4282d" stroke-width="1.8"/>
<path d="M170 34 q8 -3 14 0" fill="none" stroke="#3d5524" stroke-width="2.4"/>
${eye(184,41,2.4)}</g>`;

ART.jaguar=`<g ${O}>
<rect x="84" y="72" width="14" height="20" rx="3" fill="#c98f35"/><rect x="122" y="72" width="14" height="20" rx="3" fill="#c98f35"/>
<path d="M32 50 C16 52 8 42 12 28 C16 34 22 40 32 44 Z" fill="#e4a64a"/>
<path d="M30 44 C42 32 72 30 100 32 C122 34 138 36 150 42 C158 38 172 38 184 44 C196 50 196 62 186 66 L170 66 C164 70 160 72 154 70 L150 92 L136 92 L138 72 L128 72 C112 76 92 74 80 72 L78 92 L64 92 L62 72 C46 70 30 62 30 44 Z" fill="#e8ad4e"/>
<path d="M62 72 C80 78 112 78 128 72 L138 72 C140 66 150 66 154 70 C130 74 90 78 62 72 Z" fill="#fdf0d4" stroke="none"/>
<g fill="none" stroke="#2a1a10" stroke-width="2.4"><circle cx="50" cy="48" r="4.2"/><circle cx="68" cy="42" r="4.2"/><circle cx="88" cy="42" r="4.2"/><circle cx="108" cy="44" r="4.2"/><circle cx="126" cy="48" r="4.2"/><circle cx="58" cy="62" r="4"/><circle cx="80" cy="58" r="4"/><circle cx="102" cy="58" r="4"/><circle cx="122" cy="62" r="4"/><circle cx="26" cy="40" r="3"/></g>
<g fill="#2a1a10" stroke="none"><circle cx="50" cy="48" r="1.4"/><circle cx="68" cy="42" r="1.4"/><circle cx="88" cy="42" r="1.4"/><circle cx="108" cy="44" r="1.4"/><circle cx="126" cy="48" r="1.4"/><circle cx="58" cy="62" r="1.4"/><circle cx="80" cy="58" r="1.4"/><circle cx="102" cy="58" r="1.4"/><circle cx="122" cy="62" r="1.4"/></g>
<path d="M158 40 L164 27 L174 39 Z" fill="#e8ad4e"/>
<path d="M186 66 C176 70 166 68 162 62 C172 62 180 62 186 66 Z" fill="#fdf0d4" stroke-width="1.4"/>
<circle cx="193" cy="52" r="2.6" fill="#2a1a1a" stroke="none"/>
${eye(177,47,2.3)}</g>`;

/* 비교용: 7살 아이(키 약 1.2m), 승용차(길이 약 4.5m) */
ART.kid=`<g ${O}><circle cx="100" cy="14" r="11" fill="#f2c9a0"/><path d="M89 12 C90 2 110 2 111 12 C106 8 94 8 89 12 Z" fill="#3a2a22" stroke-width="1.6"/><path d="M82 28 H118 L114 66 H86 Z" fill="#4a90e2"/><path d="M86 66 H98 V98 H86 Z M102 66 H114 V98 H102 Z" fill="#2c3e66"/><path d="M82 30 L72 56 M118 30 L128 56" fill="none" stroke="#f2c9a0" stroke-width="7"/></g>`;
ART.car=`<g ${O}><path d="M4 74 L4 56 C4 50 10 48 18 47 L50 44 C60 32 80 28 108 28 C134 28 150 34 160 44 L186 48 C196 50 197 58 197 66 L197 74 Z" fill="#e24b4b"/><path d="M62 44 C70 36 84 34 100 34 L100 46 Z M108 34 C128 34 142 38 150 46 L108 46 Z" fill="#cfe9f7" stroke-width="1.6"/><circle cx="48" cy="76" r="14" fill="#2b2f36"/><circle cx="48" cy="76" r="5" fill="#aab4bd" stroke="none"/><circle cx="154" cy="76" r="14" fill="#2b2f36"/><circle cx="154" cy="76" r="5" fill="#aab4bd" stroke="none"/></g>`;

window.WW_ART=ART;
})();
