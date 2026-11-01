/* Design-system switcher: a hamburger button (bottom-left) that opens a sidebar listing every system.
   Self-contained (Shadow DOM) so it never inherits or leaks styles from the page it sits on.
   Include on any page with: <script src="../systems-nav.js" defer></script> (or "systems-nav.js" at the root). */
(() => {
  const SYSTEMS = [
    { id: 'oat', path: 'index.html', name: 'Oat', ko: '눌리는 물건', c: ['#f3f1e7', '#2f5a3c', '#e8b45a'] },
    { id: 'riso', path: 'riso/index.html', name: 'Riso', ko: '2도 리소 인쇄', c: ['#f2ede2', '#2c4fa0', '#ff4fa7'] },
    { id: 'arcology', path: 'arcology/index.html', name: 'Arcology', ko: '봉인 구조체 단말', c: ['#0d0e0f', '#ff8a1f', '#74c6d8'] },
    { id: 'dal', path: 'dal/index.html', name: 'Dal', ko: '조선 백자 · 한옥', c: ['#f3eee2', '#24418f', '#a5302a'] },
    { id: 'canopy', path: 'canopy/index.html', name: 'Canopy', ko: '우림 공방', c: ['#12352a', '#3f8f4f', '#a8693a'] },
    { id: 'sansa', path: 'sansa/index.html', name: 'Sansa', ko: '산사의 새벽', c: ['#f3eee2', '#4f7a68', '#8e3b2a'] },
    { id: 'abyss', path: 'abyss/index.html', name: 'Abyss', ko: '심해 연구 기지', c: ['#051220', '#4ff3e6', '#c9a24a'] },
    { id: 'atomic', path: 'atomic/index.html', name: 'Atomic', ko: '우주시대 다이너', c: ['#fdf6e6', '#6fd0c4', '#f4856f'] },
    { id: 'riad', path: 'riad/index.html', name: 'Riad', ko: '모로코 리아드', c: ['#efe3cc', '#1f4fa0', '#c8763a'] },
    { id: 'cockpit', path: 'cockpit/index.html', name: 'Cockpit', ko: '거대 로봇 조종석', c: ['#0e1420', '#7dffb0', '#ff3b3b'] },
    { id: 'tactical', path: 'tactical/index.html', name: 'Tactical', ko: '전술 작전 게임 UI', c: ['#141c28', '#7cc8f0', '#ffffff'] },
    { id: 'lagoon', path: 'lagoon/index.html', name: 'Lagoon', ko: '섬 다이빙 가게', c: ['#5fd3d8', '#3a2418', '#ff3d8b'] },
    { id: 'clay', path: 'clay/index.html', name: 'Clay', ko: '클레이 애니메이션', c: ['#efe2c8', '#e2553f', '#f2c14e'] },
    { id: 'carte', path: 'carte/index.html', name: 'Carte', ko: '메뉴판', c: ['#e9d7b0', '#1b1b1b', '#1f8a55'] },
    { id: 'sticker', path: 'sticker/index.html', name: 'Sticker', ko: '스티커 얼굴 꾸미기', c: ['#ffffff', '#f2c230', '#e2453a'] },
    { id: 'ratio', path: 'ratio/index.html', name: 'Ratio', ko: '서양화 색 비율', c: ['#4995cc', '#4e5436', '#c2a153'] },
    { id: 'zoo', path: 'zoo/index.html', name: 'Zoo Orbit', ko: '동물 우주비행단', c: ['#101632', '#f2f0ea', '#ff7a2f'] },
    { id: 'sanctum', path: 'sanctum/index.html', name: 'Sanctum', ko: '천국과 지옥', c: ['#0f0c0b', '#c9a24a', '#d0401f'] },
    { id: 'reverie', path: 'reverie/index.html', name: 'Reverie', ko: '꿈속', c: ['#e9e2f6', '#b9a6e8', '#f7c6b4'] },
    { id: 'bottega', path: 'bottega/index.html', name: 'Bottega', ko: '르네상스 공방', c: ['#efe4cf', '#26408f', '#c0432b'] },
    { id: 'pleinair', path: 'pleinair/index.html', name: 'Plein Air', ko: '인상주의', c: ['#f4ecd8', '#6f8fd0', '#e7a24a'] },
    { id: 'absurd', path: 'absurd/index.html', name: 'Absurd', ko: '포스트모던 × 실존', c: ['#f2f0eb', '#111111', '#e5322d'] },
    { id: 'tratteggio', path: 'tratteggio/index.html', name: 'Tratteggio', ko: '해칭과 펜선', c: ['#e4e3d1', '#efab8f', '#17120f'] },
    { id: 'doppio', path: 'doppio/index.html', name: 'Doppio', ko: '소꿉 계산대와 아침 커피', c: ['#f3c9a8', '#1a1a1c', '#9fdcc4'] },
    { id: 'gloam', path: 'gloam/index.html', name: 'Gloam', ko: '가라앉은 왕국의 등불', c: ['#123a3a', '#f1ece0', '#7a1f3a'] },
    { id: 'dabang', path: 'dabang/index.html', name: '판방', ko: '오래된 집의 음악 다방', c: ['#eee6d6', '#6a3d22', '#2b1f17'] },
    { id: 'chalet', path: 'chalet/index.html', name: 'Unruh', ko: '전생이 시계공이었던 디자이너의 꿈 장비', c: ['#f4f1ea', '#33414f', '#2f5fa8'] },
    { id: 'rookery', path: 'rookery/index.html', name: 'Rookery', ko: '사람이 떠난 뒤, 북쪽으로 온 펭귄들의 물건', c: ['#14181d', '#f3efe6', '#f0b45a'] },
    { id: 'offcut', path: 'offcut/index.html', name: 'Offcut', ko: '피라미드를 짓고 남은 돌로', c: ['#ece3d2', '#2b2622', '#b0412e'] },
    { id: 'inkstone', path: 'inkstone/index.html', name: 'Inkstone', ko: '크로스오버 · Sansa×Dal×Riso', c: ['#f3eee2', '#24418f', '#8e3b2a'], x: true },
    { id: 'bunker', path: 'bunker/index.html', name: 'Bunker', ko: '크로스오버 · Oat×Arcology', c: ['#f3f1e7', '#2f5a3c', '#ff8a1f'], x: true },
    { id: 'mix1', path: 'mix1/index.html', name: 'Lacuna', ko: '추상 크로스오버 · 바탕 없는 겹테 장치', c: ['#ffffff', '#111111', '#2457d6'], m: true },
    { id: 'mix2', path: 'mix2/index.html', name: 'Halide', ko: '추상 크로스오버 · 느리게 현상되는 회색 선체', c: ['#1a1a1a', '#f2f2f2', '#8a8a8a'], m: true },
    { id: 'mix3', path: 'mix3/index.html', name: 'Plumb', ko: '추상 크로스오버 · 고르면 반듯해지는 귀리밭', c: ['#e4d3aa', '#902f3b', '#0a40c3'], m: true },
    { id: 'mix4', path: 'mix4/index.html', name: 'Verso', ko: '추상 크로스오버 · 뒷면에서 본 새벽', c: ['#040915', '#d3b561', '#59d0c0'], m: true },
    { id: 'mix5', path: 'mix5/index.html', name: 'Natrium', ko: '추상 크로스오버 · 꺼진 나트륨등', c: ['#ff8a1f', '#0d0e0f', '#00e5ff'], m: true },
    { id: 'lento', path: 'lento/index.html', name: 'Lento', ko: '마지막 곡, 출격 직전', c: ['#1a1210', '#f1e4cc', '#e2b45c'], m: true },
    { id: 'sortita', path: 'sortita/index.html', name: 'Molo Lento', ko: '산복도로 불빛 아래, 마지막 곡에 맞춘 출격', c: ['#3a0f1e', '#f1e4cc', '#e2b45c'], m: true },
    { id: 'somnia', path: 'somnia/index.html', name: 'Dormant', ko: '휴면계좌 · 꿈의 원장, 궤도 위의 눈마을', c: ['#f1eee6', '#1b2140', '#c8962a'], m: true },
    { id: 'rebound', path: 'rebound/index.html', name: 'Rebound', ko: '위로 떨어지는 공의 증명서', c: ['#f4f2ec', '#1f4fa0', '#8a22a8'], m: true },
    { id: 'field', path: 'field/index.html', name: 'Halitus', ko: '숨 쉬는 색면', c: ['#3b2a5e', '#c2553a', '#e8c9a0'], a: true },
    { id: 'score', path: 'score/index.html', name: 'Tacet', ko: '도형 악보, 여섯 장', c: ['#efe8da', '#141414', '#c23a2b'], a: true },
    { id: 'glyph', path: 'glyph/index.html', name: 'Ignota', ko: '해독되지 않은 문자', c: ['#d9cdb4', '#3a2e22', '#8a6a3a'], a: true },
    { id: 'chaesaek', path: 'chaesaek/index.html', name: 'Chaesaek', ko: '튤립 · 얇은 색 열두 겹', c: ['#efebe4', '#b3243a', '#3f7a3a'], a: true },
    { id: 'aisthesis', path: 'aisthesis/index.html', name: 'Aisthesis', ko: '이해하지 않고 겪는 열 개의 방', c: ['#0d0c0b', '#dcd7d0', '#c8452c'], a: true },
    { id: 'darye', path: 'darye/index.html', name: 'Darye', ko: '다례 · 한 잔을 우리는 동안', c: ['#ece6dc', '#2a1a16', '#c2c98a'], a: true },
    { id: 'poom', path: 'poom/index.html', name: '품', ko: '두 살 딸을 꼭 안았을 때', c: ['#fbefe4', '#f2b9a0', '#e88a74'], a: true },
  ];

  const me = document.currentScript;
  const base = new URL('.', me ? me.src : location.href);
  const here = location.href.replace(/[?#].*$/, '').replace(/\/$/, '/index.html');
  const isHere = s => here === new URL(s.path, base).href;

  const host = document.createElement('div');
  host.setAttribute('data-systems-nav', '');
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `
<style>
  :host { all: initial; }
  * { box-sizing: border-box; }
  /* hamburger: a round button floating at the bottom-left, clear of every page's own header */
  .tab { position: fixed; left: max(16px, env(safe-area-inset-left, 0px)); bottom: max(16px, env(safe-area-inset-bottom, 0px)); z-index: 2147483000; display: grid; place-items: center; width: 54px; height: 54px; padding: 0; border: 0; border-radius: 50%; cursor: pointer;
    background: #17161a; color: #f4f1ea; box-shadow: 0 0 0 2px rgba(244,241,234,.9), 0 8px 22px rgba(0,0,0,.4); transition: transform .15s; }
  .tab:hover { background: #2a2830; transform: scale(1.06); }
  .tab:focus-visible { outline: 3px solid #ffb84d; outline-offset: 4px; }
  .tab i { display: grid; gap: 5px; width: 22px; }
  .tab i b { display: block; height: 2.5px; border-radius: 2px; background: currentColor; }
  .scrim { position: fixed; inset: 0; z-index: 2147483001; background: rgba(10,10,12,.45); opacity: 0; pointer-events: none; transition: opacity .2s; }
  .panel { position: fixed; left: 0; top: 0; bottom: 0; z-index: 2147483002; width: min(320px, 88vw); display: grid; grid-template-rows: auto 1fr auto; background: #17161a; color: #f4f1ea;
    font: 400 15px/1.4 system-ui, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; transform: translateX(-102%); transition: transform .25s cubic-bezier(.2,.8,.2,1); box-shadow: 10px 0 30px rgba(0,0,0,.4); visibility: hidden; }
  :host([open]) .panel { transform: none; visibility: visible; }
  :host([open]) .scrim { opacity: 1; pointer-events: auto; }
  :host([open]) .tab { visibility: hidden; }
  .head { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 18px 16px 14px 20px; border-bottom: 1px solid #2e2c34; }
  .head b { font-size: 16px; letter-spacing: .02em; }
  .head small { display: block; margin-top: 3px; font-size: 12px; color: #a9a5b0; }
  .x { width: 40px; height: 40px; border: 0; border-radius: 8px; background: #26242c; color: #f4f1ea; cursor: pointer; font-size: 18px; }
  .x:hover { background: #34313b; }
  .x:focus-visible, a:focus-visible { outline: 3px solid #ffb84d; outline-offset: -3px; }
  nav { overflow: auto; padding: 8px 8px 16px; }
  .group { margin: 14px 12px 6px; font-size: 11.5px; letter-spacing: .14em; color: #8e8a96; }
  a { display: grid; grid-template-columns: 38px 1fr; align-items: center; gap: 12px; min-height: 52px; padding: 6px 12px; border-radius: 10px; color: inherit; text-decoration: none; }
  a:hover { background: #24222a; }
  a[aria-current="page"] { background: #f4f1ea; color: #17161a; }
  a[aria-current="page"] small { color: #5b5763; }
  .sw { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; width: 38px; height: 38px; border-radius: 9px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,.18); }
  .sw span:first-child { grid-row: 1 / 3; }
  a b { display: block; font-size: 15px; }
  a small { display: block; font-size: 12.5px; color: #a9a5b0; }
  .foot { padding: 12px 20px 16px; border-top: 1px solid #2e2c34; font-size: 12px; color: #8e8a96; }
  kbd { font: inherit; padding: 1px 5px; border-radius: 4px; background: #26242c; color: #d8d4de; }
  @media (prefers-reduced-motion: reduce) { .panel, .scrim { transition: none; } }
</style>
<button class="tab" type="button" aria-label="디자인 시스템 목록 열기" aria-expanded="false" aria-controls="dsn-panel"><i aria-hidden="true"><b></b><b></b><b></b></i></button>
<div class="scrim" part="scrim"></div>
<aside class="panel" id="dsn-panel" role="dialog" aria-modal="true" aria-label="디자인 시스템 목록">
  <div class="head"><div><b>디자인 시스템</b><small>${SYSTEMS.length}개 · 다른 시스템으로 이동</small></div><button class="x" type="button" aria-label="닫기">✕</button></div>
  <nav aria-label="디자인 시스템">
    <div class="group">시스템</div>
    ${SYSTEMS.filter(s => !s.x && !s.m && !s.a).map(link).join('')}
    <div class="group">크로스오버</div>
    ${SYSTEMS.filter(s => s.x).map(link).join('')}
    <div class="group">추상 크로스오버</div>
    ${SYSTEMS.filter(s => s.m).map(link).join('')}
    <div class="group">작품</div>
    ${SYSTEMS.filter(s => s.a).map(link).join('')}
  </nav>
  <div class="foot"><kbd>Esc</kbd> 닫기 · <kbd>[</kbd> <kbd>]</kbd> 이전 / 다음 시스템</div>
</aside>`;
  function link(s) {
    return `<a href="${new URL(s.path, base).href}"${isHere(s) ? ' aria-current="page"' : ''}><span class="sw" aria-hidden="true">${s.c.map(c => `<span style="background:${c}"></span>`).join('')}</span><span><b>${s.name}</b><small>${s.ko}</small></span></a>`;
  }

  const tab = root.querySelector('.tab'), panel = root.querySelector('.panel'), scrim = root.querySelector('.scrim'), closeBtn = root.querySelector('.x');
  let lastFocus = null;
  const open = () => { lastFocus = document.activeElement; host.setAttribute('open', ''); tab.setAttribute('aria-expanded', 'true'); (root.querySelector('a[aria-current]') || root.querySelector('a')).focus(); };
  const close = () => { host.removeAttribute('open'); tab.setAttribute('aria-expanded', 'false'); (lastFocus && lastFocus.focus) ? lastFocus.focus() : tab.focus(); };
  tab.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  scrim.addEventListener('click', close);
  panel.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      const f = [...root.querySelectorAll('.x, nav a')], a = f[0], z = f[f.length - 1];
      if (e.shiftKey && root.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && root.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  // [ and ] jump to the previous / next system (ignored while typing)
  document.addEventListener('keydown', e => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target; if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.key !== '[' && e.key !== ']') return;
    const i = SYSTEMS.findIndex(isHere); if (i < 0) return;
    const n = SYSTEMS[(i + (e.key === ']' ? 1 : -1) + SYSTEMS.length) % SYSTEMS.length];
    location.href = new URL(n.path, base).href;
  });

  (document.body || document.documentElement).appendChild(host);
})();
