/* 동물 그림 4 — 새와 곤충 */
(function(){
const ART=window.WW_ART;
const O='stroke="#14212b" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
const eye=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r||2.4}" fill="#0d141a" stroke="none"/><circle cx="${x+.8}" cy="${y-.8}" r="${(r||2.4)*.35}" fill="#fff" stroke="none"/>`;
const rc=(s,m)=>{ for(const k in m) s=s.split(k).join(m[k]); return s; };

/* 흰머리수리 */
ART.eagle=`<g ${O}>
<path d="M34 54 L4 84 L30 78 L22 94 L50 82 Z" fill="#f4f1ea"/>
<path d="M40 40 C54 26 86 22 110 30 C128 36 138 48 140 64 C142 80 130 90 112 92 C86 94 58 86 46 66 C42 58 40 48 40 40 Z" fill="#5a3a24"/>
<path d="M60 40 C74 36 96 40 106 52 C96 60 76 62 62 56 Z" fill="#6e4a30" stroke-width="1.6"/>
<path d="M118 36 C112 18 130 8 146 14 C160 20 162 36 154 46 C144 52 128 50 118 36 Z" fill="#f7f4ec"/>
<path d="M150 22 C166 20 180 30 184 42 C176 54 160 52 152 46 Z" fill="#f2b82a"/>
<path d="M184 42 C182 50 176 56 168 56 C170 50 176 46 184 42 Z" fill="#d9981c" stroke-width="1.6"/>
<path d="M100 90 L98 98 M118 90 L120 98" fill="none" stroke="#f2b82a" stroke-width="4"/>
<path d="M94 98 l-6 0 M96 98 l4 -3 M120 98 l6 0 M122 98 l-4 -3" fill="none" stroke="#f2b82a" stroke-width="3"/>
<path d="M142 28 L158 24" fill="none" stroke-width="2"/>
${eye(150,28,2.6)}</g>`;
/* 큰뿔부엉이 */
ART.owl=`<g ${O}>
<path d="M44 54 L14 84 L40 80 L30 96 L58 86 Z" fill="#7a6a52"/>
<path d="M62 44 C62 24 90 14 112 18 C132 22 146 36 146 58 C146 80 132 94 108 94 C84 94 62 80 62 44 Z" fill="#8a7658"/>
<path d="M76 62 C86 58 96 60 104 66 M76 72 C88 68 100 70 108 76 M80 82 C90 78 100 80 106 86" fill="none" stroke="#5e4e38" stroke-width="2.6"/>
<path d="M112 36 C112 14 132 6 152 12 C172 18 178 38 172 54 C166 66 144 70 128 62 C116 56 112 46 112 36 Z" fill="#a8946e"/>
<path d="M120 20 L116 6 L132 14 Z M158 14 L172 4 L174 22 Z" fill="#6a5a42"/>
<path d="M126 34 C132 28 144 28 148 34 C148 44 138 50 130 46 C126 44 124 38 126 34 Z" fill="#e8dcc0" stroke-width="1.6"/>
<path d="M150 34 C156 28 166 30 168 38 C168 46 160 50 154 46 C150 44 148 38 150 34 Z" fill="#e8dcc0" stroke-width="1.6"/>
<circle cx="136" cy="38" r="5.4" fill="#f0b81e"/><circle cx="159" cy="39" r="5.4" fill="#f0b81e"/>
<circle cx="136" cy="38" r="2.4" fill="#0d141a" stroke="none"/><circle cx="159" cy="39" r="2.4" fill="#0d141a" stroke="none"/>
<path d="M146 44 L150 52 L154 44 Z" fill="#3a3326" stroke-width="1.6"/>
<path d="M96 92 L94 98 M114 92 L116 98" fill="none" stroke="#c9b27a" stroke-width="4"/></g>`;
/* 타조 */
ART.ostrich=`<g ${O}>
<path d="M62 64 C62 44 86 36 110 40 C132 44 142 58 138 74 C132 88 108 92 86 90 C70 88 62 78 62 64 Z" fill="#2b2b31"/>
<path d="M62 58 C48 52 36 56 30 66 C42 68 52 70 62 70 Z" fill="#f2f0ea"/>
<path d="M118 46 C124 36 130 24 134 12" fill="none" stroke="#14212b" stroke-width="16"/>
<path d="M118 46 C124 36 130 24 134 12" fill="none" stroke="#e9b49a" stroke-width="12"/>
<ellipse cx="143" cy="10" rx="12" ry="8" fill="#e9b49a"/>
<path d="M152 8 L172 12 L152 16 Z" fill="#e8a64a" stroke-width="1.8"/>
<path d="M98 88 L96 96 M106 88 L124 96" fill="none" stroke="#14212b" stroke-width="12"/>
<path d="M98 88 L96 96 M106 88 L124 96" fill="none" stroke="#e9b49a" stroke-width="8"/>
<path d="M98 66 C108 60 120 62 124 72 C116 78 104 76 98 66 Z" fill="#f2f0ea" stroke-width="1.6"/>
${eye(140,9,2.6)}</g>`;
/* 화식조 */
ART.cassowary=`<g ${O}>
<path d="M44 66 C44 48 72 40 100 44 C126 48 138 60 134 74 C128 88 100 92 78 90 C56 88 44 80 44 66 Z" fill="#202228"/>
<path d="M44 60 C32 58 22 64 18 74 C30 74 38 74 46 72 Z" fill="#2b2d34"/>
<path d="M118 52 C126 44 132 36 138 28" fill="none" stroke="#14212b" stroke-width="16"/>
<path d="M118 52 C126 44 132 36 138 28" fill="none" stroke="#2c6fd0" stroke-width="12"/>
<path d="M126 44 C134 40 140 36 144 30" fill="none" stroke="#e24b4b" stroke-width="5"/>
<ellipse cx="146" cy="22" rx="12" ry="9" fill="#3a82e0"/>
<path d="M138 16 C140 4 152 2 154 14 C150 14 144 14 138 16 Z" fill="#b8a46a" stroke-width="2"/>
<path d="M154 20 L178 26 L154 28 Z" fill="#d9c07a" stroke-width="1.8"/>
<path d="M92 90 L90 98 M106 90 L124 98" fill="none" stroke="#14212b" stroke-width="12"/>
<path d="M92 90 L90 98 M106 90 L124 98" fill="none" stroke="#c9b27a" stroke-width="8"/>
<path d="M118 98 l8 0 M122 98 l4 -5" fill="none" stroke="#f4ecd8" stroke-width="3"/>
${eye(148,20,2.6)}</g>`;
/* 하피독수리 */
ART.harpy=rc(ART.eagle,{'#5a3a24':'#3a3d44','#6e4a30':'#4e525a','#f7f4ec':'#c9ccd2','#f2b82a':'#1d1f24'}).replace('<path d="M142 28 L158 24" fill="none" stroke-width="2"/>','<path d="M126 14 L112 0 M134 12 L128 -2 M142 12 L146 -2" fill="none" stroke="#14212b" stroke-width="3"/><path d="M150 22 C166 20 180 30 184 42 C176 54 160 52 152 46 Z" fill="#8a8e96" stroke-width="2"/>').replace('<path d="M184 42 C182 50 176 56 168 56 C170 50 176 46 184 42 Z" fill="#d9981c" stroke-width="1.6"/>','<path d="M184 42 C182 50 176 56 168 56 C170 50 176 46 184 42 Z" fill="#2a2d33" stroke-width="1.6"/>');

/* 곤충과 거미: 몸이 크게 보이도록 200x100 안에 꽉 차게 */
const legs=(pts,col,w)=>pts.map(p=>`<path d="${p}" fill="none" stroke="#14212b" stroke-width="${w+3}"/><path d="${p}" fill="none" stroke="${col}" stroke-width="${w}"/>`).join('');
const ant=(c,big)=>`<g ${O}>
${legs(['M96 60 L80 40 L66 52','M104 62 L104 36 L90 22','M112 62 L132 44 L146 56','M96 66 L78 84 L66 96','M106 68 L100 92 L88 98','M114 66 L134 86 L146 96'],c,5)}
<ellipse cx="58" cy="64" rx="${big?30:24}" ry="${big?24:20}" fill="${c}"/>
<ellipse cx="102" cy="62" rx="14" ry="12" fill="${c}"/>
<ellipse cx="146" cy="54" rx="${big?22:18}" ry="${big?20:16}" fill="${c}"/>
<path d="M162 46 C170 38 178 40 182 46 M162 50 C170 54 180 56 186 50" fill="none" stroke="#14212b" stroke-width="2.4"/>
<path d="M164 46 C176 30 188 22 198 26 M164 50 C178 48 190 44 198 46" fill="none" stroke="#14212b" stroke-width="3"/>
<path d="M178 58 L190 66 L182 70 Z M170 60 L182 72 L174 74 Z" fill="#f4ecd8" stroke-width="1.6"/>
${eye(166,46,2.6)}</g>`;
ART.fireant=ant('#c24a2a',false);
ART.bulletant=ant('#3a2a22',true);
ART.hornet=`<g ${O}>
<path d="M100 40 C70 4 40 14 56 40 C72 52 92 50 100 40 Z" fill="#dff2ff" stroke-width="2" opacity=".9"/>
<path d="M100 38 C86 -2 120 -6 124 34 C118 42 104 44 100 38 Z" fill="#dff2ff" stroke-width="2" opacity=".9"/>
${legs(['M96 66 L84 86 L74 96','M108 68 L106 92 L98 98','M120 66 L136 84 L146 94'],'#3a2a1a',4)}
<path d="M70 64 C36 54 12 66 8 72 C14 82 40 86 72 76 Z" fill="#f2b81e"/>
<path d="M30 60 L26 82 M46 58 L42 84 M62 60 L58 80" fill="none" stroke="#1d1710" stroke-width="7"/>
<ellipse cx="102" cy="62" rx="22" ry="20" fill="#3a2a1a"/>
<ellipse cx="158" cy="52" rx="24" ry="22" fill="#e89a1a"/>
<path d="M142 40 C140 56 150 70 168 72 C180 72 184 60 182 50 Z" fill="#e89a1a" stroke="none"/>
<path d="M176 48 L196 60 L184 66 Z" fill="#3a2a1a" stroke-width="2"/>
<path d="M170 34 C176 22 186 16 196 18 M164 32 C166 20 174 12 184 10" fill="none" stroke="#14212b" stroke-width="2.6"/>
<circle cx="166" cy="46" r="7" fill="#2a2a2a"/>${eye(170,50,2.2)}
<path d="M8 72 l-8 4" fill="none" stroke="#14212b" stroke-width="3"/></g>`;
ART.mantis=`<g ${O}>
${legs(['M64 66 L50 90 L40 98','M80 68 L76 94 L70 98','M96 68 L110 92 L122 98'],'#6aa338',4)}
<path d="M14 60 C30 52 56 54 74 60 C96 56 112 40 122 24 L132 22 C128 42 112 66 90 74 C64 82 30 78 14 60 Z" fill="#7ab53f"/>
<path d="M60 56 C80 20 114 10 144 22 C130 32 108 40 90 58 Z" fill="#a6d066" stroke-width="2"/>
<path d="M126 22 L150 6 L158 12 L136 30" fill="#6aa338"/>
<path d="M146 8 L158 38 L168 18 L170 40" fill="none" stroke="#14212b" stroke-width="8"/>
<path d="M146 8 L158 38 L168 18 L170 40" fill="none" stroke="#6aa338" stroke-width="5"/>
<path d="M150 20 L166 22 M152 28 L166 30" fill="none" stroke="#14212b" stroke-width="1.6"/>
<path d="M150 6 L168 -2 L176 8 L160 22 Z" fill="#7ab53f" stroke-width="2"/>
<path d="M160 6 L200 -10 M164 12 L200 4" fill="none" stroke="#14212b" stroke-width="2"/>
${eye(164,8,2.4)}</g>`;
ART.tarantula=`<g ${O}>
${legs(['M96 56 L66 28 L36 36 L20 70','M100 62 L68 54 L36 62 L22 90','M104 70 L76 84 L48 90 L34 98','M110 74 L104 92 L90 98','M128 56 L158 28 L188 38 L198 72','M126 62 L160 54 L190 64 L198 92','M122 70 L150 84 L176 92 L190 98','M118 74 L124 92 L136 98'],'#6a4a32',5)}
<ellipse cx="70" cy="66" rx="30" ry="22" fill="#6a4a32"/>
<ellipse cx="124" cy="62" rx="20" ry="16" fill="#8a6244"/>
<path d="M110 60 q14 -14 28 0" fill="none" stroke="#4a3220" stroke-width="2"/>
<path d="M134 66 L152 74 L146 80 Z M128 70 L140 82 L132 84 Z" fill="#f4ecd8" stroke-width="1.6"/>
<circle cx="136" cy="54" r="3.2" fill="#f4ecd8" stroke-width="1.4"/><circle cx="144" cy="58" r="2.6" fill="#f4ecd8" stroke-width="1.4"/></g>`;
ART.blackwidow=`<g ${O}>
${legs(['M96 54 L70 24 L40 30 L18 60','M100 60 L70 50 L40 58 L22 84','M104 70 L80 84 L56 90 L40 98','M110 74 L104 92 L92 98','M130 54 L160 24 L190 30 L198 58','M128 60 L160 50 L190 58 L198 84','M122 70 L150 84 L176 90 L190 98'],'#1f1f24',3.6)}
<ellipse cx="66" cy="66" rx="34" ry="26" fill="#1b1b20"/>
<path d="M56 62 L66 74 L76 62 L66 52 Z M62 64 L66 68 L70 64 L66 60 Z" fill="#d9232b" stroke-width="1.4"/>
<ellipse cx="128" cy="62" rx="16" ry="13" fill="#2a2a30"/>
<circle cx="138" cy="58" r="2.4" fill="#e8e8ec" stroke="none"/><circle cx="143" cy="62" r="2" fill="#e8e8ec" stroke="none"/></g>`;
ART.recluse=`<g ${O}>
${legs(['M100 56 L74 26 L44 32 L22 62','M104 62 L74 52 L44 60 L26 86','M106 72 L82 86 L58 92 L42 98','M112 76 L106 92 L94 98','M128 56 L158 26 L188 32 L198 60','M126 62 L158 52 L188 60 L198 86','M122 72 L148 86 L174 92 L188 98'],'#b89a6a',3)}
<ellipse cx="74" cy="66" rx="28" ry="20" fill="#c8a876"/>
<ellipse cx="124" cy="62" rx="15" ry="12" fill="#b8955e"/>
<path d="M118 52 C124 48 132 50 134 56 C132 62 124 66 120 62 Z M116 56 L132 66" fill="none" stroke="#5e4220" stroke-width="2"/>
<circle cx="134" cy="58" r="2" fill="#2a1c10" stroke="none"/><circle cx="139" cy="61" r="1.8" fill="#2a1c10" stroke="none"/></g>`;
ART.scorpion=`<g ${O}>
${legs(['M96 64 L84 86 L72 96','M106 68 L100 92 L90 98','M116 66 L124 90 L134 98'],'#4a3a2a',4)}
<path d="M80 64 C50 70 26 62 14 44 C10 30 22 16 38 20 C50 24 46 36 36 34" fill="none" stroke="#14212b" stroke-width="16"/>
<path d="M80 64 C50 70 26 62 14 44 C10 30 22 16 38 20 C50 24 46 36 36 34" fill="none" stroke="#3a2a1c" stroke-width="12"/>
<path d="M32 36 L26 46 L40 42 Z" fill="#c9a34a" stroke-width="2"/>
<ellipse cx="108" cy="62" rx="24" ry="16" fill="#3a2a1c"/>
<path d="M126 56 C142 44 154 36 168 38 M126 62 C146 66 160 64 172 56" fill="none" stroke="#14212b" stroke-width="9"/>
<path d="M126 56 C142 44 154 36 168 38 M126 62 C146 66 160 64 172 56" fill="none" stroke="#3a2a1c" stroke-width="5"/>
<path d="M164 38 C174 22 194 24 196 34 C190 34 182 38 178 46 Z" fill="#4a3a2a" stroke-width="2"/>
<path d="M168 54 C180 54 194 60 196 70 C188 66 180 66 174 62 Z" fill="#4a3a2a" stroke-width="2"/>
<circle cx="116" cy="54" r="2.2" fill="#f4ecd8" stroke="none"/></g>`;
ART.centipede=`<g ${O}>
<path d="M12 76 C30 90 56 88 72 72 C86 58 110 56 128 66 C144 74 160 66 170 52" fill="none" stroke="#14212b" stroke-width="20"/>
<path d="M12 76 C30 90 56 88 72 72 C86 58 110 56 128 66 C144 74 160 66 170 52" fill="none" stroke="#c24a2a" stroke-width="16"/>
<path d="M12 76 C30 90 56 88 72 72 C86 58 110 56 128 66 C144 74 160 66 170 52" fill="none" stroke="#e8a14a" stroke-width="4" stroke-dasharray="3 8"/>
<path d="M24 88 l-4 10 M40 92 l-3 8 M56 86 l-4 10 M72 76 l-6 8 M88 62 l-4 -10 M104 62 l0 -10 M122 66 l4 10 M138 74 l2 10 M154 68 l8 8" fill="none" stroke="#e8a14a" stroke-width="3.4"/>
<ellipse cx="176" cy="46" rx="16" ry="12" fill="#a83a22"/>
<path d="M186 54 L196 66 L186 62 Z M178 56 L184 70 L176 62 Z" fill="#14212b" stroke-width="1.6"/>
<path d="M180 36 C186 24 194 18 200 20 M174 36 C176 24 182 14 190 10" fill="none" stroke="#14212b" stroke-width="2.4"/>
${eye(180,44,2.4)}</g>`;
ART.beetle=`<g ${O}>
${legs(['M80 70 L62 92 L52 98','M100 72 L98 94 L90 100','M120 70 L136 90 L146 96'],'#2a1a10',5)}
<path d="M34 62 C40 34 80 30 112 40 C132 46 140 58 138 72 C120 82 60 84 40 76 Z" fill="#6a3a1c"/>
<path d="M44 52 C70 40 104 42 126 54" fill="none" stroke="#9a5a2c" stroke-width="3"/>
<ellipse cx="146" cy="58" rx="14" ry="12" fill="#3a1c0c"/>
<path d="M142 50 C140 30 162 12 188 8 C196 8 198 16 190 18 C176 22 166 36 160 54 Z" fill="#3a1c0c"/>
<path d="M156 66 C170 70 184 66 190 58 C184 62 170 62 160 56 Z" fill="#3a1c0c"/>
<path d="M150 34 C156 30 160 34 160 40" fill="none" stroke-width="3"/>
${eye(150,56,2.2)}</g>`;
ART.stagbeetle=`<g ${O}>
${legs(['M80 70 L62 92 L52 98','M100 72 L98 94 L90 100','M120 70 L136 90 L146 96'],'#2a1a10',5)}
<path d="M30 62 C36 36 76 30 108 38 C130 44 138 58 136 72 C118 82 56 84 36 76 Z" fill="#3a2418"/>
<path d="M40 54 C66 42 100 44 122 56" fill="none" stroke="#5e3c28" stroke-width="3"/>
<ellipse cx="146" cy="58" rx="14" ry="12" fill="#26150c"/>
<path d="M152 52 C164 40 178 40 188 44 C194 48 190 52 184 50 C176 48 168 50 160 58 Z M154 62 C166 72 180 72 190 66 C194 62 190 60 184 62 C176 66 166 64 158 58 Z" fill="#26150c" stroke-width="2.4"/>
<path d="M176 42 L182 36 M176 70 L182 76" fill="none" stroke-width="2"/>
${eye(150,56,2.2)}</g>`;
})();
(function(){
const ART=window.WW_ART;
const wrap=(k,t)=>{ ART[k]='<g transform="'+t+'">'+ART[k]+'</g>'; };
['eagle','owl','ostrich','cassowary','harpy'].forEach(k=>wrap(k,'translate(12 6) scale(.9)'));
['tarantula','blackwidow','recluse'].forEach(k=>wrap(k,'translate(18 10) scale(.82)'));
['scorpion','mantis','hornet'].forEach(k=>wrap(k,'translate(10 8) scale(.9)'));
delete ART.eaglecoin;
})();
