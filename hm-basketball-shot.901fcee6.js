/*
 * HealingMart Basketball Shot v25 VERIFIED
 * External JS build for Blogger.
 * Keep this file on GitHub Pages / hm-mini-game-dist so Blogger cannot rewrite inline JavaScript.
 */
(function(){
  'use strict';
  var ROOT_ID='hm-basketball-game';
  var AUDIO_URL='https://healingmart.github.io/hm-mini-game-sound-pack/js/hm-audio-manager.v1.js?v=1.2.0';
  var started=false;

  function hasThree149(){
    return !!(window.THREE && window.THREE.WebGLRenderer && String(window.THREE.REVISION)==='149');
  }

  function status(msg){
    var root=document.getElementById(ROOT_ID);
    var el=root ? root.querySelector('#status-text') : null;
    if(el) el.textContent=msg;
  }

  function loadAudioLater(){
    if(window.HMAudio) return;
    try{
      var s=document.createElement('script');
      s.src=AUDIO_URL;
      s.async=true;
      s.onload=function(){
        try{
          if(window.HMAudio){
            window.HMAudio.init({baseUrl:'https://healingmart.github.io/hm-mini-game-sound-pack/sfx/core/v1/',volume:0.88});
          }
        }catch(e){console.warn('[Basketball Shot] audio init skipped',e);}
      };
      s.onerror=function(){console.warn('[Basketball Shot] audio pack unavailable; game continues without it.');};
      (document.head||document.documentElement).appendChild(s);
    }catch(e){console.warn('[Basketball Shot] audio loader skipped',e);}
  }

  function start(){
    if(started) return;
    var root=document.getElementById(ROOT_ID);
    if(!root) return;
    if(!hasThree149()){
      status('3D 엔진을 불러오지 못했습니다. 페이지를 새로고침해 주세요.');
      console.error('[Basketball Shot] THREE.js r149 did not load.');
      return;
    }
    started=true;
    try{
      (() => {
        'use strict';

  const root = document.getElementById('hm-basketball-game');
  const canvas = root.querySelector('#game-canvas');
  const menuOverlay = root.querySelector('#menu-overlay');
  const resultOverlay = root.querySelector('#result-overlay');
  const stageOverlay = root.querySelector('#stage-overlay');
  const demoOverlay = root.querySelector('#demo-overlay');
  const demoGrid = root.querySelector('#demo-grid');
  const autoDemoHud = root.querySelector('#auto-demo-hud');
  const autoDemoCount = root.querySelector('#auto-demo-count');
  const autoDemoTitle = root.querySelector('#auto-demo-title');
  const autoDemoProgressFill = root.querySelector('#auto-demo-progress-fill');
  const autoDemoNextBtn = root.querySelector('#auto-demo-next');
  const autoDemoStopBtn = root.querySelector('#auto-demo-stop');
  const soundBtn = root.querySelector('#sound-btn');
  const vibrationBtn = root.querySelector('#vibration-btn');
  const feverBanner = root.querySelector('#fever-banner');
  const goalFlash = root.querySelector('#goal-flash');
  const missFlash = root.querySelector('#miss-flash');
  const powerWrap = root.querySelector('#power-wrap');
  const powerFill = root.querySelector('#power-fill');
  const powerText = root.querySelector('#power-text');
  const aimGuide = root.querySelector('#aim-guide');
  const backBtn = root.querySelector('#back-btn');
  const toast = root.querySelector('#toast');
  const swipeLine = root.querySelector('#swipe-line');
  const hudMode = root.querySelector('#hud-mode');
  const hudMainLabel = root.querySelector('#hud-main-label');
  const hudMain = root.querySelector('#hud-main');
  const hudScore = root.querySelector('#hud-score');
  const hudCombo = root.querySelector('#hud-combo');
  const statusText = root.querySelector('#status-text');
  const stageDesc = root.querySelector('#stage-desc');
  const bestText = root.querySelector('#best-text');
  const menuProgress = root.querySelector('#menu-progress');
  const menuStars = root.querySelector('#menu-stars');
  const menuCombo = root.querySelector('#menu-combo');
  const stageGrid = root.querySelector('#stage-grid');
  const chapterChip = root.querySelector('#chapter-chip');
  const stageProgressFill = root.querySelector('#stage-progress-fill');
  const missionTitle = root.querySelector('#mission-title');
  const missionMeta = root.querySelector('#mission-meta');
  const stagePlayBtn = root.querySelector('#stage-play');
  const locationBanner = root.querySelector('#location-banner');
  const ballRack = root.querySelector('#ball-rack');

  const resultTitle = root.querySelector('#result-title');
  const resultStars = root.querySelector('#result-stars');
  const resultRank = root.querySelector('#result-rank');
  const resultMessage = root.querySelector('#result-message');
  const resultGoals = root.querySelector('#result-goals');
  const resultShots = root.querySelector('#result-shots');
  const resultCombo = root.querySelector('#result-combo');
  const resultNext = root.querySelector('#result-next');

  const STORAGE = {
    unlocked: 'hm_basketball_unlocked_v5',
    bestCombo: 'hm_basketball_best_combo_v1',
    freeShots: 'hm_basketball_free_shots_v1',
    freeGoals: 'hm_basketball_free_goals_v1',
    timeBest: 'hm_basketball_time_best_v1',
    stars: 'hm_basketball_stage_stars_v5',
    sound: 'hm_basketball_sound_v2',
    vibration: 'hm_basketball_vibration_v1'
  };

  const safeGet = (key, fallback = 0) => {
    try {
      const n = Number(localStorage.getItem(key));
      return Number.isFinite(n) ? n : fallback;
    } catch (_) { return fallback; }
  };
  const safeSet = (key, value) => {
    try { localStorage.setItem(key, String(value)); } catch (_) {}
  };
  const safeGetJSON = (key, fallback) => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (_) { return fallback; }
  };
  const safeSetJSON = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} };


  const MAX_STAGE = 20;
  let unlockedStage = Math.min(MAX_STAGE, Math.max(1, safeGet(STORAGE.unlocked, 1)));
  let globalBestCombo = Math.max(0, safeGet(STORAGE.bestCombo, 0));
  let freeTotalShots = Math.max(0, safeGet(STORAGE.freeShots, 0));
  let freeTotalGoals = Math.max(0, safeGet(STORAGE.freeGoals, 0));
  let timeBest = Math.max(0, safeGet(STORAGE.timeBest, 0));
  let stageStars = safeGetJSON(STORAGE.stars, {});
  let soundEnabled = safeGet(STORAGE.sound, 1) !== 0;
  let vibrationEnabled = safeGet(STORAGE.vibration, 1) !== 0;
  let selectedStage = unlockedStage;
  let selectedChapter = Math.floor((selectedStage - 1) / 5);
  let stageDemoMode = false;
  let autoDemoActive = false;
  let autoDemoStage = 1;
  let autoDemoShotActive = false;
  let autoDemoShotStartedAt = 0;
  let autoDemoShotDuration = 720;
  let autoDemoGoalRegistered = false;
  let autoDemoStartPos = new THREE.Vector3();
  let autoDemoP1 = new THREE.Vector3();
  let autoDemoP2 = new THREE.Vector3();
  let autoDemoEndPos = new THREE.Vector3();
  let autoDemoBoardPoint = new THREE.Vector3();
  let autoDemoBankHit = false;
  let autoDemoRimHit = false;
  let autoDemoFloorHit = false;
  let autoDemoBoardFinish = false;
  let autoDemoShotKind = 'swish';
  let autoDemoTransitionTimer = null;

  stageDesc.textContent = unlockedStage > 1 ? `${unlockedStage}단계부터 이어하기` : '매 스테이지 슛 위치와 규칙이 바뀝니다';
  bestText.textContent = `최고 연속 ${globalBestCombo}골 · 60초 최고 ${timeBest}점`;
  function syncQuickControls(){
    soundBtn.textContent=soundEnabled?'🔊 사운드 ON':'🔇 사운드 OFF';
    vibrationBtn.textContent=vibrationEnabled?'📳 진동 ON':'📴 진동 OFF';
    soundBtn.classList.toggle('off',!soundEnabled);
    vibrationBtn.classList.toggle('off',!vibrationEnabled);
  }
  syncQuickControls();
  if (window.HMAudio) { try { window.HMAudio.setEnabled(soundEnabled); } catch (_) {} }

  // ---------- Three.js scene ----------
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050709);
  scene.fog = new THREE.FogExp2(0x050709, 0.035);

  const camera = new THREE.PerspectiveCamera(43, 1, 0.1, 90);
  camera.position.set(0, 4.55, 14.7);
  camera.lookAt(0, 2.35, -4.25);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if ('outputColorSpace' in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
  else if ('outputEncoding' in renderer && THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const hemi = new THREE.HemisphereLight(0x7ea7c8, 0x111417, 1.45);
  scene.add(hemi);

  const keyLight = new THREE.SpotLight(0xffffff, 42, 40, Math.PI / 5.5, 0.42, 1.45);
  keyLight.position.set(-6.2, 11.5, 6.5);
  keyLight.target.position.set(0, 1.5, -4.8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight, keyLight.target);

  const rimLight = new THREE.SpotLight(0x78dfff, 18, 34, Math.PI / 6, 0.55, 1.6);
  rimLight.position.set(6, 9, -1);
  rimLight.target.position.set(0, 2.7, -5.8);
  scene.add(rimLight, rimLight.target);

  const warmLight = new THREE.PointLight(0xff7a1a, 10, 18, 2);
  warmLight.position.set(0, 4.8, -5.4);
  scene.add(warmLight);

  // FIBA-inspired full court: 28m x 15m, 5cm markings
  function createCourtWoodTexture() {
    const c=document.createElement('canvas'); c.width=2048; c.height=2048;
    const ctx=c.getContext('2d'); ctx.fillStyle='#c89258'; ctx.fillRect(0,0,c.width,c.height);
    const rows=44,cols=28;
    for(let r=0;r<rows;r++){
      const y=Math.floor(r*c.height/rows),h=Math.ceil(c.height/rows);
      ctx.fillStyle=`hsl(${29+(r%4)}, ${46+(r%3)*2}%, ${50+(r*5)%7}%)`; ctx.fillRect(0,y,c.width,h);
      for(let col=0;col<cols;col++){const x=Math.floor((col+(r%2)*.5)*c.width/cols);ctx.fillStyle='rgba(62,34,14,.18)';ctx.fillRect(x,y,2,h);}
      ctx.fillStyle='rgba(255,255,255,.025)';ctx.fillRect(0,y,c.width,1);
    }
    const tex=new THREE.CanvasTexture(c);if('colorSpace' in tex&&THREE.SRGBColorSpace)tex.colorSpace=THREE.SRGBColorSpace;else if('encoding' in tex&&THREE.sRGBEncoding)tex.encoding=THREE.sRGBEncoding;tex.anisotropy=8;return tex;
  }

  const COURT_WIDTH=15.0,COURT_LENGTH=28.0,LINE_W=0.05;
  const courtBasketZ=-6.25;
  const baselineZ=courtBasketZ-1.575;
  const farBaselineZ=baselineZ+COURT_LENGTH;
  const courtCenterZ=(baselineZ+farBaselineZ)/2;
  const ftLineZ=baselineZ+5.80;
  const keyHalfW=2.45;
  const visualKeyHalfW=1.80;
  const corner3X=6.60;
  const threeRadius=6.75;
  const threeJoinZ=courtBasketZ+Math.sqrt(threeRadius*threeRadius-corner3X*corner3X);

  const boundaryFloor=new THREE.Mesh(new THREE.PlaneGeometry(19,32),new THREE.MeshStandardMaterial({color:0x111820,roughness:.95}));
  boundaryFloor.rotation.x=-Math.PI/2;boundaryFloor.position.set(0,-.006,courtCenterZ);boundaryFloor.receiveShadow=true;scene.add(boundaryFloor);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(COURT_WIDTH,COURT_LENGTH),new THREE.MeshPhysicalMaterial({map:createCourtWoodTexture(),color:0xffffff,roughness:.56,metalness:.01,clearcoat:.26,clearcoatRoughness:.64}));
  floor.rotation.x=-Math.PI/2;floor.position.set(0,0,courtCenterZ);floor.receiveShadow=true;scene.add(floor);
  const laneFill=new THREE.Mesh(new THREE.PlaneGeometry(visualKeyHalfW*2,5.80),new THREE.MeshStandardMaterial({color:0xb8733e,roughness:.72,transparent:true,opacity:.42}));
  laneFill.rotation.x=-Math.PI/2;laneFill.position.set(0,.006,(baselineZ+ftLineZ)/2);scene.add(laneFill);

  const lineMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.97});
  const courtLineMat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.97});
  function addCourtLine(x,z,w,d){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),courtLineMat);m.rotation.x=-Math.PI/2;m.position.set(x,.014,z);scene.add(m);return m;}
  function addEllipseArc(cx,cz,rx,rz,startA,endA,segments=128){const pts=new THREE.EllipseCurve(cx,cz,rx,rz,startA,endA,false,0).getPoints(segments).map(p=>new THREE.Vector3(p.x,.018,p.y));const geo=new THREE.BufferGeometry().setFromPoints(pts);const ln=new THREE.Line(geo,lineMat);scene.add(ln);return ln;}
  function addDashedEllipseArc(cx,cz,r,startA,endA,dashes=18){const span=(endA-startA)/dashes;for(let i=0;i<dashes;i++){const a=startA+i*span,b=a+span*.56;addEllipseArc(cx,cz,r,r,a,b,18);}}

  // 28 x 15m boundary, centre line and centre circle
  addCourtLine(-COURT_WIDTH/2,courtCenterZ,LINE_W,COURT_LENGTH);addCourtLine(COURT_WIDTH/2,courtCenterZ,LINE_W,COURT_LENGTH);
  addCourtLine(0,baselineZ,COURT_WIDTH,LINE_W);addCourtLine(0,farBaselineZ,COURT_WIDTH,LINE_W);
  addCourtLine(0,courtCenterZ,COURT_WIDTH+.30,LINE_W);addEllipseArc(0,courtCenterZ,1.80,1.80,0,Math.PI*2,144);

  // Key / free-throw circle based on the uploaded reference style
  // The two long lane lines should clearly meet the horizontal free-throw line.
  addCourtLine(-visualKeyHalfW,(baselineZ+ftLineZ)/2+LINE_W*0.5,LINE_W,ftLineZ-baselineZ+LINE_W);addCourtLine(visualKeyHalfW,(baselineZ+ftLineZ)/2+LINE_W*0.5,LINE_W,ftLineZ-baselineZ+LINE_W);
  addCourtLine(0,ftLineZ,visualKeyHalfW*2+LINE_W,LINE_W);
  // Solid outside half / dashed inside half, like the uploaded reference.
  addEllipseArc(0,ftLineZ,1.80,1.80,0,Math.PI,128);
  addDashedEllipseArc(0,ftLineZ,1.80,Math.PI,Math.PI*2,18);
  // Restore the previous three-point line feel.
  addCourtLine(-corner3X,(baselineZ+threeJoinZ)/2,LINE_W,threeJoinZ-baselineZ+LINE_W*.8);addCourtLine(corner3X,(baselineZ+threeJoinZ)/2,LINE_W,threeJoinZ-baselineZ+LINE_W*.8);
  const threeAngle=Math.acos(corner3X/threeRadius);addEllipseArc(0,courtBasketZ,threeRadius,threeRadius,threeAngle-0.01,Math.PI-threeAngle+0.01,180);
  // Lane rebound-place ticks
  for(const side of [-1,1]){for(const off of [1.75,2.60,3.45,4.30])addCourtLine(side*visualKeyHalfW,baselineZ+off,.32,LINE_W);}

  // Hoop group
  const hoopGroup = new THREE.Group();
  scene.add(hoopGroup);
  const HOOP_Y = 3.05;
  const HOOP_Z = -6.25;
  const HOOP_RADIUS = 0.62;
  let hoopX = 0;

  const frameMat = new THREE.MeshStandardMaterial({ color: 0xced6de, roughness: 0.34, metalness: 0.78 });
  const supportMat = new THREE.MeshStandardMaterial({ color: 0x404b57, roughness: 0.48, metalness: 0.66 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe9f7ff,
    transparent: true,
    opacity: 0.10,
    roughness: 0.04,
    transmission: 0.88,
    thickness: 0.03,
    ior: 1.46,
    side: THREE.DoubleSide
  });

  // Cleaner backboard: thin transparent panel + simple white outline only, no chunky protruding pad.
  const backboard = new THREE.Mesh(new THREE.PlaneGeometry(1.80, 1.05), glassMat);
  backboard.position.set(0, 3.60, -6.955);
  backboard.castShadow = true;
  hoopGroup.add(backboard);

  const boardOutline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.80, 1.05)),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.82 })
  );
  boardOutline.position.set(0, 3.60, -6.948);
  hoopGroup.add(boardOutline);

  const targetBox = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.59, 0.45)),
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 })
  );
  targetBox.position.set(0, 3.40, -6.946);
  hoopGroup.add(targetBox);

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(HOOP_RADIUS, 0.052, 14, 64),
    new THREE.MeshStandardMaterial({ color: 0xff671d, roughness: 0.26, metalness: 0.56 })
  );
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, HOOP_Y, HOOP_Z);
  rim.castShadow = true;
  hoopGroup.add(rim);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.17, 4.55, 20), supportMat);
  pole.position.set(0, 2.05, -7.85);
  pole.castShadow = true;
  hoopGroup.add(pole);

  const support = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 1.42), supportMat);
  support.position.set(0, 3.38, -7.34);
  support.rotation.x = -0.18;
  hoopGroup.add(support);

  function cylinderBetween(a, b, radius, material) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 6), material);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    return mesh;
  }

  // Animated net: stretches and sways after the ball drops through
  const netMat=new THREE.MeshBasicMaterial({color:0xf5fbff,transparent:true,opacity:.82});
  const netGroup=new THREE.Group();netGroup.position.set(0,HOOP_Y,HOOP_Z);hoopGroup.add(netGroup);
  for(let i=0;i<18;i++){
    const a=(i/18)*Math.PI*2;
    const top=new THREE.Vector3(Math.cos(a)*0.57,-.03,Math.sin(a)*0.57);
    const bottom=new THREE.Vector3(Math.cos(a+.08)*0.30,-.84,Math.sin(a+.08)*0.30);
    netGroup.add(cylinderBetween(top,bottom,.0085,netMat));
  }
  for(const yOff of [.22,.44,.66,.82]){const r=.57-yOff*.33;const ringNet=new THREE.Mesh(new THREE.TorusGeometry(r,.007,6,56),netMat);ringNet.rotation.x=Math.PI/2;ringNet.position.set(0,-yOff,0);netGroup.add(ringNet);}
  let netAnim=0;
  function kickNet(){netAnim=1;}
  function updateNet(dt){
    if(netAnim<=0){netGroup.scale.set(1,1,1);netGroup.rotation.set(0,0,0);return;}
    netAnim=Math.max(0,netAnim-dt*1.75);const wave=Math.sin((1-netAnim)*Math.PI*8)*netAnim;
    netGroup.scale.y=1+Math.max(0,wave)*.22;netGroup.scale.x=1-wave*.045;netGroup.scale.z=1-wave*.045;
    netGroup.rotation.z=wave*.035;netGroup.rotation.x=-wave*.025;
  }

  // Procedural basketball texture and micro-bump
  function createBasketballTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0,0,1024,512);
    g.addColorStop(0,'#d95f12'); g.addColorStop(.5,'#f07a20'); g.addColorStop(1,'#c84e0b');
    ctx.fillStyle = g; ctx.fillRect(0,0,c.width,c.height);
    ctx.strokeStyle = '#2b160d'; ctx.lineWidth = 14; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0,256); ctx.lineTo(1024,256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(512,0); ctx.lineTo(512,512); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(512,256,210,340,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(512,256,430,150,0,0,Math.PI*2); ctx.stroke();
    const t = new THREE.CanvasTexture(c); if('colorSpace' in t&&THREE.SRGBColorSpace)t.colorSpace=THREE.SRGBColorSpace;else if('encoding' in t&&THREE.sRGBEncoding)t.encoding=THREE.sRGBEncoding; t.anisotropy = 4; return t;
  }
  function createBallBump() {
    const c = document.createElement('canvas'); c.width=256; c.height=256;
    const ctx=c.getContext('2d'); ctx.fillStyle='#777'; ctx.fillRect(0,0,256,256);
    for(let i=0;i<9000;i++){
      const v=100+Math.floor(Math.random()*70); ctx.fillStyle=`rgb(${v},${v},${v})`;
      const x=Math.random()*256,y=Math.random()*256,r=.35+Math.random()*.7; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    }
    const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(5,3); return t;
  }
  const BALL_R = 0.34;
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(BALL_R, 96, 64),
    new THREE.MeshStandardMaterial({ map:createBasketballTexture(), bumpMap:createBallBump(), bumpScale:0.018, roughness:0.76, metalness:0.0 })
  );
  ball.castShadow = true;
  scene.add(ball);

  // Arena bowl: brighter stepped stands and visible spectators
  const wall=new THREE.Mesh(new THREE.PlaneGeometry(30,14),new THREE.MeshStandardMaterial({color:0x09111a,roughness:1}));wall.position.set(0,6.3,-15.8);scene.add(wall);
  const standGroup=new THREE.Group();scene.add(standGroup);
  const standMat=new THREE.MeshStandardMaterial({color:0x1a2430,roughness:.92});
  const seatMat=new THREE.MeshStandardMaterial({color:0x304154,roughness:.76});
  for(let row=0;row<8;row++){
    const step=new THREE.Mesh(new THREE.BoxGeometry(21.5,.38,1.12),standMat);
    step.position.set(0,.30+row*.50,-10.5-row*.86);
    standGroup.add(step);
  }
  const seatGeo=new THREE.BoxGeometry(.30,.22,.26);const seatCount=8*38;const seats=new THREE.InstancedMesh(seatGeo,seatMat,seatCount);const dummy=new THREE.Object3D();let si=0;
  for(let row=0;row<8;row++){
    for(let col=0;col<38;col++){
      dummy.position.set((col-18.5)*.54,.68+row*.50,-10.00-row*.86);
      dummy.rotation.y=(Math.random()-.5)*.10;dummy.updateMatrix();seats.setMatrixAt(si++,dummy.matrix);
    }
  }
  seats.instanceMatrix.needsUpdate=true;standGroup.add(seats);

  // Side stands so the crowd is visible from the player camera
  for(const side of [-1,1]){
    for(let row=0;row<5;row++){
      const sideStep=new THREE.Mesh(new THREE.BoxGeometry(1.12,.34,8.5),standMat);
      sideStep.position.set(side*8.8,.28+row*.42,-1.2-row*.35);
      standGroup.add(sideStep);
    }
  }

  const crowdGeo=new THREE.BufferGeometry();const crowdCount=980;const crowdPos=new Float32Array(crowdCount*3);const crowdCol=new Float32Array(crowdCount*3);
  const c1=new THREE.Color(0x90b4d7),c2=new THREE.Color(0xffa34d),c3=new THREE.Color(0xe4edf6),c4=new THREE.Color(0x9b7dff),c5=new THREE.Color(0x59d0ff);
  for(let i=0;i<crowdCount;i++){
    let x,y,z;
    if(i<700){
      const row=i%8,col=Math.floor(i/8)%76;
      x=((col%38)-18.5)*.54+(Math.random()-.5)*.16;
      y=.98+row*.50+Math.random()*.26;
      z=-10.00-row*.86+(Math.random()-.5)*.14;
    }else{
      const idx=i-700,row=idx%5,col=Math.floor(idx/5)%28,side=(idx%2===0?-1:1);
      x=side*(8.65+Math.random()*.38);
      y=.95+row*.42+Math.random()*.25;
      z=-4.2+col*.28+(Math.random()-.5)*.16;
    }
    crowdPos[i*3]=x;crowdPos[i*3+1]=y;crowdPos[i*3+2]=z;
    const cc=i%19===0?c2:(i%13===0?c4:(i%7===0?c5:(i%3===0?c1:c3)));
    crowdCol[i*3]=cc.r;crowdCol[i*3+1]=cc.g;crowdCol[i*3+2]=cc.b;
  }
  crowdGeo.setAttribute('position',new THREE.BufferAttribute(crowdPos,3));crowdGeo.setAttribute('color',new THREE.BufferAttribute(crowdCol,3));
  const crowd=new THREE.Points(crowdGeo,new THREE.PointsMaterial({size:.14,vertexColors:true,transparent:true,opacity:.92,depthWrite:false}));scene.add(crowd);

  // Arena light bars
  const lightBarMat = new THREE.MeshBasicMaterial({color:0xeaf8ff});
  for (const x of [-5.4,5.4]) {
    const bar=new THREE.Mesh(new THREE.BoxGeometry(2.4,.08,.08),lightBarMat); bar.position.set(x,8.0,-7.8); scene.add(bar);
  }

  // Fireworks particle burst for successful shots
  const fireworks = [];
  function spawnFireworks(){
    const count = 72;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = [];
    const palette = [new THREE.Color(0xffd34f),new THREE.Color(0xff6b5f),new THREE.Color(0x6bdcff),new THREE.Color(0x8dff9a),new THREE.Color(0xffffff)];
    for(let i=0;i<count;i++){
      positions[i*3]=hoopX; positions[i*3+1]=HOOP_Y+.15; positions[i*3+2]=HOOP_Z+.2;
      const c=palette[i%palette.length]; colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
      const a=Math.random()*Math.PI*2; const up=1.4+Math.random()*3.2; const out=.8+Math.random()*2.8;
      velocities.push(new THREE.Vector3(Math.cos(a)*out,up,Math.sin(a)*out));
    }
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
    const mat=new THREE.PointsMaterial({size:.11,vertexColors:true,transparent:true,opacity:1,depthWrite:false});
    const pts=new THREE.Points(geo,mat); scene.add(pts);
    fireworks.push({pts,velocities,life:1.15,maxLife:1.15});
  }
  function updateFireworks(dt){
    for(let k=fireworks.length-1;k>=0;k--){
      const fw=fireworks[k]; fw.life-=dt;
      const pos=fw.pts.geometry.attributes.position.array;
      for(let i=0;i<fw.velocities.length;i++){
        const v=fw.velocities[i]; v.y-=4.2*dt;
        pos[i*3]+=v.x*dt; pos[i*3+1]+=v.y*dt; pos[i*3+2]+=v.z*dt;
      }
      fw.pts.geometry.attributes.position.needsUpdate=true;
      fw.pts.material.opacity=Math.max(0,fw.life/fw.maxLife);
      if(fw.life<=0){ scene.remove(fw.pts); fw.pts.geometry.dispose(); fw.pts.material.dispose(); fireworks.splice(k,1); }
    }
  }
  function flashElement(el){ el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); }

  // ---------- Game state ----------
  const clock = new THREE.Clock();
  const ballVelocity = new THREE.Vector3();
  let mode = 'menu'; // menu | stage | free | time
  let currentStage = unlockedStage;
  let stageConfig = null;
  let shots = 0;
  let goals = 0;
  let score = 0;
  let combo = 0;
  let bestComboRun = 0;
  let ballFlying = false;
  let shotResolved = true;
  let shotStartTime = 0;
  let lastBallY = 1.2;
  let lastBallZ = 0;
  let touchedRim = false;
  let touchedBoard = false;
  let bankGoalCount = 0;
  let timeLeft = 60;
  let timerStartedAt = 0;
  let timerRunning = false;
  let gameEnded = false;
  let windX = 0;
  let moveHoop = false;
  let hoopMoveSpeed = 0;
  let startX = 0;
  let startZ = 4.6;
  let resetTimer = null;
  let stagePoints = 0;
  let currentShotValue = 1;
  let currentPositionKey = 'center_ft';
  let stageDeadline = 0;
  let stageTimeLeft = 0;
  let hoopMotionPhase = 0;
  let cameraTween = null;

  const SHOT_POSITIONS = {
    center_ft:   { x: 0.0,  z: 4.65, label: 'FREE THROW' },
    left45:      { x:-3.05, z: 2.55, label: 'LEFT WING' },
    right45:     { x: 3.05, z: 2.55, label: 'RIGHT WING' },
    left_corner: { x:-4.15, z:-1.25, label: 'LEFT CORNER' },
    right_corner:{ x: 4.15, z:-1.25, label: 'RIGHT CORNER' },
    center_3:    { x: 0.0,  z: 6.35, label: 'TOP OF THE KEY' },
    deep_center: { x: 0.0,  z: 8.10, label: 'DEEP SHOT' },
    bank_left:   { x:-2.15, z: 2.80, label: 'BACKBOARD ANGLE' }
  };

  const STAGE_LIST = [
    // 1-5: EASY / success-first onboarding
    {label:'웜업 자유투', attempts:6,target:2,positions:['center_ft'],motion:'fixed',assist:.52},
    {label:'왼쪽 45도', attempts:6,target:2,positions:['left45'],motion:'fixed',assist:.48},
    {label:'오른쪽 45도', attempts:6,target:2,positions:['right45'],motion:'fixed',assist:.46},
    {label:'3포인트 로테이션', attempts:6,target:3,positions:['left45','center_ft','right45','left45','right45','center_ft'],motion:'fixed',assist:.42},
    {label:'첫 MONEY BALL', attempts:6,target:5,positions:['center_ft'],motion:'fixed',moneyBall:true,targetType:'points',assist:.40},

    // 6-10: NORMAL / moving hoop introduction
    {label:'무빙 훕 입문', attempts:6,target:3,positions:['center_ft'],motion:'horizontal',moveSpeed:.54,moveRange:.75,assist:.38},
    {label:'왼쪽에서 무빙 훕', attempts:6,target:3,positions:['left45'],motion:'horizontal',moveSpeed:.66,moveRange:.90,assist:.34},
    {label:'오른쪽에서 무빙 훕', attempts:6,target:3,positions:['right45'],motion:'horizontal',moveSpeed:.76,moveRange:1.00,assist:.31},
    {label:'코너 스위치', attempts:6,target:3,positions:['left_corner','right_corner','left_corner','right_corner','center_ft','center_ft'],motion:'fixed',assist:.29},
    {label:'BUZZER BEATER', attempts:6,target:3,positions:['left45','center_ft','right45','left_corner','right_corner','center_ft'],motion:'horizontal',moveSpeed:.72,moveRange:.85,timeLimit:20,assist:.28},

    // 11-15: HARD / distance and shot-type missions
    {label:'중앙 3점슛', attempts:6,target:3,positions:['center_3'],motion:'fixed',assist:.25},
    {label:'왼쪽 코너 3', attempts:6,target:3,positions:['left_corner'],motion:'fixed',assist:.23},
    {label:'오른쪽 코너 3', attempts:6,target:3,positions:['right_corner'],motion:'fixed',assist:.21},
    {label:'AROUND THE WORLD', attempts:6,target:4,positions:['left_corner','left45','center_3','right45','right_corner','center_ft'],motion:'fixed',assist:.18},
    {label:'보드 맞고 골인', attempts:6,target:3,positions:['bank_left'],motion:'fixed',bankRequired:1,assist:.18},

    // 16-20: EXPERT / speed + pressure
    {label:'FAST MOVING HOOP', attempts:6,target:3,positions:['center_ft'],motion:'horizontal',moveSpeed:1.18,moveRange:1.25,assist:.16},
    {label:'SIDE + MOVING', attempts:6,target:4,positions:['left45','right45','left_corner','right_corner','center_ft','center_3'],motion:'horizontal',moveSpeed:1.08,moveRange:1.15,assist:.14},
    {label:'MONEY BALL RUSH', attempts:6,target:6,positions:['left45','center_3','right45','left_corner','right_corner','center_ft'],motion:'horizontal',moveSpeed:.95,moveRange:1.05,moneyBall:true,targetType:'points',assist:.12},
    {label:'CLUTCH 14', attempts:6,target:4,positions:['left_corner','right_corner','left45','right45','center_3','center_ft'],motion:'horizontal',moveSpeed:1.25,moveRange:1.25,timeLimit:14,assist:.08},
    {label:'FINAL CHAMPIONSHIP', attempts:6,target:6,positions:['left_corner','left45','deep_center','right45','right_corner','center_3'],motion:'horizontal',moveSpeed:1.38,moveRange:1.40,timeLimit:18,moneyBall:true,targetType:'points',assist:.04}
  ];

  function getStageConfig(level) {
    const base = STAGE_LIST[Math.max(0, Math.min(MAX_STAGE - 1, level - 1))];
    return {
      level,
      attempts: base.attempts || 5,
      target: base.target || 3,
      positions: base.positions || ['center_ft'],
      motion: base.motion || 'fixed',
      moveSpeed: base.moveSpeed || 0,
      moveRange: base.moveRange || 0,
      bankRequired: base.bankRequired || 0,
      moneyBall: !!base.moneyBall,
      targetType: base.targetType || 'goals',
      timeLimit: base.timeLimit || 0,
      assist: Number.isFinite(base.assist) ? base.assist : 0,
      label: base.label || 'BASKET RUSH'
    };
  }

  const CHAPTERS = [
    ['ROOKIE ROTATION','1-5 · 슛 위치 변화'],
    ['MOVING HOOP','6-10 · 움직이는 골대'],
    ['AROUND WORLD','11-15 · 코너와 3점'],
    ['CLUTCH ARENA','16-20 · 속도와 압박']
  ];

  function difficultyLabel(level){
    if(level<=5) return 'EASY';
    if(level<=10) return 'NORMAL';
    if(level<=15) return 'HARD';
    return 'EXPERT';
  }

  function demoFeatureTags(cfg) {
    const tags = [difficultyLabel(cfg.level)];
    const posLabels = [...new Set(cfg.positions.map(k => SHOT_POSITIONS[k]?.label || k))];
    if (posLabels.length === 1) tags.push(posLabels[0]);
    else tags.push(`위치 ${posLabels.length}곳`);
    if (cfg.motion !== 'fixed') tags.push('MOVING HOOP');
    if (cfg.moneyBall) tags.push('MONEY BALL');
    if (cfg.bankRequired) tags.push('BACKBOARD SCORE');
    if (cfg.timeLimit) tags.push(`${cfg.timeLimit}초`);
    return tags.slice(0, 4);
  }

  function renderDemoGrid() {
    demoGrid.innerHTML = '';
    for (let level = 1; level <= MAX_STAGE; level++) {
      const cfg = getStageConfig(level);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'demo-stage-card';
      const objective = cfg.targetType === 'points' ? `${cfg.target}점 목표` : `${cfg.attempts}번 중 ${cfg.target}골`;
      const tags = demoFeatureTags(cfg);
      btn.innerHTML = `<span class="demo-no">STAGE ${level}</span><strong>${cfg.label}</strong><small>${objective}</small><span class="demo-tags">${tags.map(t => `<i>${t}</i>`).join('')}</span>`;
      btn.addEventListener('click', () => {
        soundUI();
        stageDemoMode = true;
        selectedStage = level;
        demoOverlay.classList.add('hidden');
        startStage(level);
      });
      demoGrid.appendChild(btn);
    }
  }

  function openDemoSelect() {
    stageDemoMode = true;
    menuOverlay.classList.add('hidden');
    stageOverlay.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    demoOverlay.classList.remove('hidden');
    soundBtn.classList.add('menu-pos');
    renderDemoGrid();
  }


  function autoDemoRepresentativePosition(cfg, level) {
    if (!cfg.positions || !cfg.positions.length) return 'center_ft';
    if (cfg.positions.length === 1) return cfg.positions[0];
    return cfg.positions[(level - 1) % cfg.positions.length];
  }

  function predictedHoopXAt(ms) {
    if (!stageConfig || stageConfig.motion === 'fixed') return 0;
    const t = ms / 1000;
    const r = stageConfig.moveRange || 1.2;
    const sp = stageConfig.moveSpeed || .8;
    if (stageConfig.motion === 'burst') return Math.sin(t * sp * 2.7) * r * (0.55 + 0.45 * Math.sin(t * .7) ** 2);
    return Math.sin(t * sp * 2.1) * r;
  }

  function cubicBezier(out, p0, p1, p2, p3, t) {
    const u = 1 - t;
    out.set(0,0,0)
      .addScaledVector(p0, u*u*u)
      .addScaledVector(p1, 3*u*u*t)
      .addScaledVector(p2, 3*u*t*t)
      .addScaledVector(p3, t*t*t);
    return out;
  }

  function quadraticBezier(out, p0, p1, p2, t) {
    const u = 1 - t;
    out.set(0,0,0)
      .addScaledVector(p0, u*u)
      .addScaledVector(p1, 2*u*t)
      .addScaledVector(p2, t*t);
    return out;
  }

  function updateAutoDemoHud() {
    if (!autoDemoActive) { autoDemoHud.classList.add('hidden'); return; }
    autoDemoHud.classList.remove('hidden');
    autoDemoCount.textContent = `${autoDemoStage} / ${MAX_STAGE}`;
    autoDemoProgressFill.style.width = `${(autoDemoStage / MAX_STAGE) * 100}%`;
    const cfg = getStageConfig(autoDemoStage);
    const posKey = autoDemoRepresentativePosition(cfg, autoDemoStage);
    const posLabel = SHOT_POSITIONS[posKey]?.label || '';
    const extra = [cfg.motion !== 'fixed' ? 'MOVING HOOP' : '', cfg.moneyBall ? 'MONEY BALL' : '', cfg.bankRequired ? 'BACKBOARD SCORE' : '', cfg.timeLimit ? 'BUZZER' : ''].filter(Boolean).join(' · ');
    autoDemoTitle.textContent = `STAGE ${autoDemoStage} · ${cfg.label} · ${posLabel}${extra ? ' · ' + extra : ''}`;
  }

  function stopAutoDemo(returnHome = true) {
    autoDemoActive = false;
    autoDemoShotActive = false;
    autoDemoGoalRegistered = false;
    autoDemoBankHit = false;
    autoDemoRimHit = false;
    autoDemoFloorHit = false;
    autoDemoBoardFinish = false;
    clearTimeout(autoDemoTransitionTimer);
    autoDemoTransitionTimer = null;
    autoDemoHud.classList.add('hidden');
    ball.material.color.set(0xffffff);
    if (returnHome) goHome();
  }

  function startAutoDemo() {
    clearTimeout(resetTimer);
    clearTimeout(autoDemoTransitionTimer);
    stageDemoMode = true;
    autoDemoActive = true;
    autoDemoStage = 1;
    autoDemoShotActive = false;
    statusText.style.display='none';
    menuOverlay.classList.add('hidden');
    stageOverlay.classList.add('hidden');
    demoOverlay.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    backBtn.classList.remove('hidden');
    soundBtn.classList.remove('menu-pos');
    startAmbience();
    beginAutoDemoStage(1);
  }

  function beginAutoDemoStage(level) {
    if (!autoDemoActive) return;
    autoDemoStage = Math.max(1, Math.min(MAX_STAGE, level));
    currentStage = autoDemoStage;
    mode = 'stage';
    gameEnded = false;
    stageConfig = getStageConfig(currentStage);
    shots = 0; goals = 0; score = 0; combo = 0; bestComboRun = 0; bankGoalCount = 0; stagePoints = 0;
    moveHoop = stageConfig.motion !== 'fixed';
    hoopMoveSpeed = stageConfig.moveSpeed;
    hoopMotionPhase = 0;
    setHoopX(0);
    stageDeadline = 0;
    stageTimeLeft = 0;
    hudMode.textContent = 'AUTO DEMO';
    hudMainLabel.textContent = '진행';
    hudMain.textContent = `${currentStage}/${MAX_STAGE}`;
    hudScore.textContent = '0';
    hudCombo.textContent = '0';
    const posKey = autoDemoRepresentativePosition(stageConfig, currentStage);
    applyShotPosition(posKey, currentStage > 1);
    startX = SHOT_POSITIONS[posKey].x;
    startZ = SHOT_POSITIONS[posKey].z;
    currentShotValue = stageConfig.moneyBall ? 3 : 1;
    ball.material.color.set(stageConfig.moneyBall ? 0xffd166 : 0xffffff);
    ball.position.set(startX, 1.05, startZ);
    ball.rotation.set(0,0,0);
    ball.visible = true;
    ballFlying = false;
    shotResolved = false;
    touchedRim = false;
    touchedBoard = false;
    aimGuide.style.display = 'none';
    ballRack.innerHTML = '';
    updateAutoDemoHud();
    const previewKind = getAutoDemoShotKind(currentStage, stageConfig);
    const demoTag = `${shotKindLabel(previewKind)} 자동 시연`;
    statusText.textContent = `${demoTag} · STAGE ${currentStage}`;
    showLocation(SHOT_POSITIONS[posKey].label);
    clearTimeout(autoDemoTransitionTimer);
    autoDemoTransitionTimer = setTimeout(launchAutoDemoShot, currentStage === 1 ? 650 : 500);
  }

  function getAutoDemoShotKind(level, cfg) {
    if (cfg?.bankRequired) return 'board-rim';
    const plan = {
      1:'swish',2:'swish',3:'rim',4:'swish',5:'swish',
      6:'rim',7:'swish',8:'board',9:'swish',10:'rim',
      11:'swish',12:'board',13:'swish',14:'rim',15:'board-rim',
      16:'swish',17:'rim',18:'swish',19:'board',20:'swish'
    };
    return plan[level] || 'swish';
  }

  function shotKindLabel(kind) {
    return kind === 'swish' ? 'CLEAN SWISH' :
      kind === 'rim' ? 'RIM IN' :
      kind === 'board' ? 'BOARD IN' : 'BOARD + RIM';
  }

  function launchAutoDemoShot() {
    if (!autoDemoActive || autoDemoShotActive) return;
    ensureAudio();
    soundShoot(stageConfig.moneyBall ? 1.18 : 1.0);
    hapticShoot();
    autoDemoShotActive = true;
    autoDemoGoalRegistered = false;
    autoDemoBankHit = false;
    autoDemoRimHit = false;
    autoDemoFloorHit = false;
    autoDemoShotKind = getAutoDemoShotKind(currentStage, stageConfig);
    autoDemoBoardFinish = autoDemoShotKind === 'board' || autoDemoShotKind === 'board-rim';
    autoDemoShotStartedAt = performance.now();
    autoDemoShotDuration = autoDemoBoardFinish ? 960 : 820;
    shots = 1;
    autoDemoStartPos.copy(ball.position);
    const landingTime = autoDemoShotStartedAt + autoDemoShotDuration * .79;
    const predictedX = predictedHoopXAt(landingTime);
    const rimTop = new THREE.Vector3(predictedX, HOOP_Y + .30, HOOP_Z + .03);
    autoDemoEndPos.set(predictedX + .28, BALL_R, HOOP_Z + 1.75);
    const flatMid = autoDemoStartPos.clone().lerp(rimTop, .48);
    autoDemoP1.set(flatMid.x, Math.max(5.1, HOOP_Y + 2.5), flatMid.z + 1.0);
    autoDemoP2.set(predictedX, HOOP_Y + 1.10, HOOP_Z + .28);
    autoDemoBoardPoint.set(predictedX + (currentPositionKey.includes('left') ? .38 : -.38), 3.63, -6.50);
    powerWrap.classList.add('show');
    powerFill.style.width = '72%';
    powerText.textContent = stageConfig.moneyBall ? 'MONEY BALL' : 'AUTO PERFECT';
  }

  function updateAutoDemoShot(now) {
    if (!autoDemoActive || !autoDemoShotActive) return;
    const p = THREE.MathUtils.clamp((now - autoDemoShotStartedAt) / autoDemoShotDuration, 0, 1);
    const goalX = predictedHoopXAt(autoDemoShotStartedAt + autoDemoShotDuration * .72);
    const goalExit = new THREE.Vector3(goalX, HOOP_Y - .28, HOOP_Z);
    const floorPoint = new THREE.Vector3(goalX + .28, BALL_R, HOOP_Z + 1.75);

    if (autoDemoBoardFinish) {
      // Board shots are explicit demo types; ordinary stages no longer force a board touch.
      if (p < .54) {
        const q = p / .54;
        const boardControl = autoDemoStartPos.clone().lerp(autoDemoBoardPoint, .48);
        boardControl.y = Math.max(5.25, HOOP_Y + 2.55);
        quadraticBezier(ball.position, autoDemoStartPos, boardControl, autoDemoBoardPoint, q);
      } else if (p < .80) {
        if (!autoDemoBankHit) {
          autoDemoBankHit = true;
          touchedBoard = true;
          soundBoard(1.2); hapticBoard();
          showToast('BACKBOARD!', true);
        }
        const q = (p - .54) / .26;
        if (autoDemoShotKind === 'board-rim') {
          const rimTouch = new THREE.Vector3(goalX + (currentPositionKey.includes('left') ? .22 : -.22), HOOP_Y + .07, HOOP_Z + .13);
          if (q < .58) {
            const qq = q / .58;
            const c = autoDemoBoardPoint.clone().lerp(rimTouch,.55); c.y += .55;
            quadraticBezier(ball.position, autoDemoBoardPoint, c, rimTouch, qq);
          } else {
            if (!autoDemoRimHit) {
              autoDemoRimHit = true; touchedRim = true;
              soundRim(1.1); hapticRim();
            }
            const qq = (q-.58)/.42;
            const c = rimTouch.clone().lerp(goalExit,.5); c.y += .18;
            quadraticBezier(ball.position, rimTouch, c, goalExit, qq);
          }
        } else {
          const c = autoDemoBoardPoint.clone().lerp(goalExit,.52); c.y += .42;
          quadraticBezier(ball.position, autoDemoBoardPoint, c, goalExit, q);
        }
      } else {
        const q = (p - .80) / .20;
        const c = goalExit.clone().lerp(floorPoint,.55); c.y = Math.max(1.35, c.y);
        quadraticBezier(ball.position, goalExit, c, floorPoint, q);
      }
    } else {
      if (p < .80) {
        const q = p / .80;
        const p1 = autoDemoP1;
        const p2 = new THREE.Vector3(goalX, HOOP_Y + 1.10, HOOP_Z + .28);
        cubicBezier(ball.position, autoDemoStartPos, p1, p2, goalExit, q);
        if (autoDemoShotKind === 'rim' && q >= .86 && !autoDemoRimHit) {
          autoDemoRimHit = true;
          touchedRim = true;
          soundRim(1.0); hapticRim();
        }
      } else {
        const q = (p - .80) / .20;
        const c = goalExit.clone().lerp(floorPoint,.55); c.y = Math.max(1.35, c.y);
        quadraticBezier(ball.position, goalExit, c, floorPoint, q);
      }
    }
    ball.rotation.x += .14;
    ball.rotation.z += .10;

    if (!autoDemoGoalRegistered && p >= .775) {
      autoDemoGoalRegistered = true;
      ball.position.x = goalX;
      ball.position.z = HOOP_Z;
      ball.position.y = HOOP_Y - .18;
      registerGoal();
      hudScore.textContent = stageConfig.moneyBall ? '3' : '1';
      statusText.textContent = `SUCCESS · STAGE ${currentStage} · 다음 단계로 이동`;
    }
    if (!autoDemoFloorHit && p >= .965) {
      autoDemoFloorHit = true;
      soundBounce(6.2); hapticFloor(6.2);
    }

    if (p >= 1) {
      autoDemoShotActive = false;
      powerWrap.classList.remove('show');
      ball.visible = false;
      clearTimeout(autoDemoTransitionTimer);
      if (autoDemoStage >= MAX_STAGE) {
        autoDemoTitle.textContent = 'AUTO DEMO COMPLETE · 20 STAGES';
        autoDemoCount.textContent = '20 / 20';
        autoDemoProgressFill.style.width = '100%';
        statusText.textContent = '20단계 자동 시연 완료!';
        soundClear();
        autoDemoTransitionTimer = setTimeout(() => stopAutoDemo(true), 1600);
      } else {
        autoDemoTransitionTimer = setTimeout(() => beginAutoDemoStage(autoDemoStage + 1), 340);
      }
    }
  }

  function totalStars() {
    return Object.values(stageStars).reduce((sum, v) => sum + Math.max(0, Math.min(3, Number(v) || 0)), 0);
  }

  function updateMenuStats() {
    menuProgress.textContent = `${unlockedStage}/${MAX_STAGE}`;
    menuStars.textContent = `${totalStars()}/${MAX_STAGE*3}`;
    menuCombo.textContent = String(globalBestCombo);
    stageDesc.textContent = unlockedStage > 1 ? `${unlockedStage}단계까지 해제 · 원하는 단계 선택` : '매 스테이지 슛 위치와 규칙이 바뀝니다';
    bestText.textContent = `최고 연속 ${globalBestCombo}골 · 60초 최고 ${timeBest}점`;
    stageProgressFill.style.width = `${Math.min(100, unlockedStage / MAX_STAGE * 100)}%`;
  }

  function stageStarString(level) {
    const n = Math.max(0, Math.min(3, Number(stageStars[level]) || 0));
    return '★'.repeat(n) + '☆'.repeat(3 - n);
  }

  function renderStageSelect() {
    selectedChapter = Math.max(0, Math.min(CHAPTERS.length - 1, selectedChapter));
    const [name, theme] = CHAPTERS[selectedChapter];
    const start = selectedChapter * 5 + 1;
    chapterChip.textContent = `${name} · ${start}-${start + 4}`;
    stageGrid.innerHTML = '';
    for (let level = start; level < start + 5; level++) {
      const btn = document.createElement('button');
      const locked = level > unlockedStage;
      btn.type = 'button';
      btn.className = 'stage-card' + (locked ? ' locked' : '') + (level === selectedStage ? ' active' : '');
      btn.innerHTML = `<b>${level}</b><span>${stageStarString(level)}</span>${locked ? '<i class="lock">🔒</i>' : ''}`;
      btn.disabled = locked;
      btn.addEventListener('click', () => {
        soundUI();
        selectedStage = level;
        renderStageSelect();
        updateMissionPreview(level);
      });
      stageGrid.appendChild(btn);
    }
    updateMissionPreview(selectedStage);
    updateMenuStats();
  }

  function updateMissionPreview(level) {
    const first = selectedChapter * 5 + 1;
    const last = first + 4;
    const playable = level >= first && level <= last && level <= unlockedStage;
    if (!playable) {
      const [name] = CHAPTERS[selectedChapter];
      missionTitle.textContent = `${name} · 아직 잠긴 리그입니다`;
      missionMeta.innerHTML = `<span>STAGE ${first}부터 시작</span><span>현재 ${unlockedStage}단계 해제</span>`;
      stagePlayBtn.textContent = '스테이지 잠김';
      stagePlayBtn.disabled = true;
      stagePlayBtn.style.opacity = '.45';
      return;
    }
    stagePlayBtn.disabled = false;
    stagePlayBtn.style.opacity = '';
    const cfg = getStageConfig(level);
    missionTitle.textContent = `STAGE ${level} · ${cfg.label}`;
    const tags = [
      `난이도 ${difficultyLabel(level)}`,
      cfg.targetType === 'points' ? `${cfg.target}점 이상` : `${cfg.attempts}번 중 ${cfg.target}골`,
      cfg.positions.length > 1 ? `위치 ${cfg.positions.length}곳 순환` : SHOT_POSITIONS[cfg.positions[0]].label,
      cfg.motion !== 'fixed' ? '움직이는 골대' : '고정 골대',
      cfg.timeLimit ? `${cfg.timeLimit}초 제한` : '시간 제한 없음'
    ];
    if (cfg.moneyBall) tags.push('마지막 MONEY BALL 3점');
    if (cfg.bankRequired) tags.push(`보드 맞고 골인 ${cfg.bankRequired}골 필수`);
    missionMeta.innerHTML = tags.map(t => `<span>${t}</span>`).join('');
    stagePlayBtn.textContent = `STAGE ${level} 시작`;
  }

  function openStageSelect() {
    stageDemoMode = false;
    selectedStage = Math.min(unlockedStage, Math.max(1, selectedStage));
    selectedChapter = Math.floor((selectedStage - 1) / 5);
    menuOverlay.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    stageOverlay.classList.remove('hidden');
    soundBtn.classList.add('menu-pos');
    renderStageSelect();
  }

  function setHoopX(x) {
    hoopX = x;
    hoopGroup.position.x = x;
  }

  function showLocation(text) {
    locationBanner.textContent = text;
    locationBanner.classList.remove('show');
    void locationBanner.offsetWidth;
    locationBanner.classList.add('show');
  }

  function updateBallRack() {
    ballRack.innerHTML = '';
    if (mode !== 'stage' || !stageConfig) return;
    for (let i = 0; i < stageConfig.attempts; i++) {
      const b = document.createElement('span');
      b.className = 'rack-ball' + (stageConfig.moneyBall && i === stageConfig.attempts - 1 ? ' money' : '');
      if (i < shots) b.classList.add('used');
      ballRack.appendChild(b);
    }
  }

  function markRackResult(index, made) {
    const el = ballRack.children[index];
    if (!el) return;
    el.classList.add('used');
    if (made) el.classList.add('made');
  }

  function cameraForPosition(pos) {
    const hoopTarget = new THREE.Vector3(hoopX, 2.45, HOOP_Z);
    const groundStart = new THREE.Vector3(pos.x, 0, pos.z);
    const groundHoop = new THREE.Vector3(hoopX, 0, HOOP_Z);
    const dir = groundHoop.clone().sub(groundStart).normalize();
    const camPos = new THREE.Vector3(pos.x, 4.45, pos.z).addScaledVector(dir, -8.7);
    const look = hoopTarget.clone().lerp(new THREE.Vector3(pos.x, 1.25, pos.z), 0.12);
    return {camPos, look};
  }

  function applyShotPosition(key, animate=true) {
    const pos = SHOT_POSITIONS[key] || SHOT_POSITIONS.center_ft;
    currentPositionKey = key;
    startX = pos.x;
    startZ = pos.z;
    const view = cameraForPosition(pos);
    if (animate) {
      cameraTween = {
        fromPos: camera.position.clone(), toPos: view.camPos.clone(),
        fromLook: (camera.userData.lookTarget || new THREE.Vector3(0,2.35,-4.25)).clone(),
        toLook: view.look.clone(), start: performance.now(), duration: 520
      };
    } else {
      camera.position.copy(view.camPos);
      camera.lookAt(view.look);
      camera.userData.lookTarget = view.look.clone();
      cameraTween = null;
    }
    showLocation(pos.label);
  }

  function updateCameraTween(now) {
    if (!cameraTween) return;
    const p = THREE.MathUtils.clamp((now - cameraTween.start) / cameraTween.duration, 0, 1);
    const e = 1 - Math.pow(1 - p, 3);
    camera.position.lerpVectors(cameraTween.fromPos, cameraTween.toPos, e);
    const look = cameraTween.fromLook.clone().lerp(cameraTween.toLook, e);
    camera.lookAt(look);
    camera.userData.lookTarget = look;
    if (p >= 1) cameraTween = null;
  }

  function setBallStart() {
    ballFlying = false;
    shotResolved = true;
    ballVelocity.set(0, 0, 0);
    if (mode === 'stage' && stageConfig) {
      const posKey = stageConfig.positions[Math.min(shots, stageConfig.attempts - 1) % stageConfig.positions.length];
      applyShotPosition(posKey, shots > 0);
      currentShotValue = stageConfig.moneyBall && shots === stageConfig.attempts - 1 ? 3 : 1;
    } else {
      applyShotPosition('center_ft', false);
      currentShotValue = 1;
    }
    ball.position.set(startX, 1.05, startZ);
    ball.rotation.set(0, 0, 0);
    lastBallY = ball.position.y;
    lastBallZ = ball.position.z;
    touchedRim = false;
    touchedBoard = false;
    ball.visible = true;
    aimGuide.style.display = mode === 'menu' ? 'none' : 'block';
    powerWrap.classList.remove('show');
    powerFill.style.width = '0%';
    powerText.textContent = currentShotValue === 3 ? 'MONEY BALL' : 'READY';
    updateBallRack();
    if (mode === 'stage') updateStageTension();
  }

  function configureMode(newMode) {
    clearTimeout(resetTimer);
    mode = newMode;
    gameEnded = false;
    shots = 0; goals = 0; score = 0; combo = 0; bestComboRun = 0; bankGoalCount = 0; stagePoints = 0;
    timeLeft = 60; timerRunning = false; lastHurrySecond = -1; windX = 0; moveHoop = false; hoopMoveSpeed = 0; stageDeadline = 0; stageTimeLeft = 0;
    setHoopX(0);

    if (mode === 'stage') {
      currentStage = selectedStage;
      stageConfig = getStageConfig(currentStage);
      moveHoop = stageConfig.motion !== 'fixed';
      hoopMoveSpeed = stageConfig.moveSpeed;
      if (stageConfig.timeLimit) { stageDeadline = performance.now() + stageConfig.timeLimit * 1000; stageTimeLeft = stageConfig.timeLimit; }
      hudMode.textContent = 'BASKET RUSH';
      hudMainLabel.textContent = stageConfig.timeLimit ? '남은 시간' : '스테이지';
      hudMain.textContent = stageConfig.timeLimit ? stageConfig.timeLimit.toFixed(1) : `${currentStage}/${MAX_STAGE}`;
      statusText.textContent = `${stageConfig.label} · ${stageConfig.targetType === 'points' ? stageConfig.target+'점' : stageConfig.target+'골'} 목표`;
    } else if (mode === 'free') {
      stageConfig = null; applyShotPosition('center_ft', false);
      hudMode.textContent = '자유투'; hudMainLabel.textContent = '누적'; hudMain.textContent = `${freeTotalGoals}/${freeTotalShots}`; statusText.textContent = '시간 제한 없이 편안하게 슛하세요';
    } else if (mode === 'time') {
      stageConfig = null; applyShotPosition('center_ft', false);
      hudMode.textContent = '60초'; hudMainLabel.textContent = '남은 시간'; hudMain.textContent = '60.0'; statusText.textContent = '첫 슛부터 60초가 시작됩니다';
    }
    hudScore.textContent = '0'; hudCombo.textContent = '0';
    menuOverlay.classList.add('hidden'); resultOverlay.classList.add('hidden'); backBtn.classList.remove('hidden'); soundBtn.classList.remove('menu-pos');
    startAmbience(); setBallStart();
  }

  function startStage(level) {
    mode = 'stage';
    menuOverlay.classList.add('hidden'); stageOverlay.classList.add('hidden'); demoOverlay.classList.add('hidden'); backBtn.classList.remove('hidden'); soundBtn.classList.remove('menu-pos');
    startAmbience(); currentStage = Math.min(MAX_STAGE, Math.max(1, level));
    hudMode.textContent = stageDemoMode ? 'DEMO' : 'BASKET RUSH';
    stageConfig = getStageConfig(currentStage);
    shots = goals = score = combo = bestComboRun = bankGoalCount = stagePoints = 0;
    gameEnded = false; moveHoop = stageConfig.motion !== 'fixed'; hoopMoveSpeed = stageConfig.moveSpeed; hoopMotionPhase = 0; setHoopX(0);
    stageDeadline = stageConfig.timeLimit ? performance.now() + stageConfig.timeLimit * 1000 : 0;
    stageTimeLeft = stageConfig.timeLimit || 0;
    hudMainLabel.textContent = stageConfig.timeLimit ? '남은 시간' : '스테이지';
    hudMain.textContent = stageConfig.timeLimit ? stageConfig.timeLimit.toFixed(1) : `${currentStage}/${MAX_STAGE}`;
    hudScore.textContent = '0'; hudCombo.textContent = '0';
    statusText.textContent = `${stageConfig.label} · ${stageConfig.targetType === 'points' ? stageConfig.target+'점' : stageConfig.target+'골'} 목표`;
    resultOverlay.classList.add('hidden');
    setBallStart();
  }

  function updateStageTension(message='') {
    if (mode !== 'stage' || !stageConfig) return;
    const left = Math.max(0, stageConfig.attempts - shots);
    const progress = stageConfig.targetType === 'points' ? stagePoints : goals;
    const need = Math.max(0, stageConfig.target - progress);
    const unit = stageConfig.targetType === 'points' ? '점' : '골';
    const money = currentShotValue === 3 && left > 0 ? ' · MONEY BALL 3점!' : '';
    statusText.textContent = `${message ? message+' · ' : ''}남은 공 ${left}개 · 앞으로 ${need}${unit}${money}`;
  }

  function showToast(text, good = true) {
    toast.textContent = text;
    toast.style.color = good ? 'var(--good)' : 'var(--bad)';
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
  }

  // ---------- Healing Mart Sound Pack + WebAudio fallback ----------
  let hmAudioPreloaded = false;
  function ensurePackAudio() {
    if (!soundEnabled || !window.HMAudio) return false;
    try {
      window.HMAudio.setEnabled(true);
      window.HMAudio.unlock();
      if (!hmAudioPreloaded) {
        hmAudioPreloaded = true;
        window.HMAudio.preload([
          'ui-tap','ready','swipe','whoosh','impact-soft','impact-hard','bounce',
          'target-hit','target-miss','perfect','correct','score-up','combo','combo-up',
          'timer-urgent','round-clear','fail','stage-up','achievement','bonus'
        ]).catch(()=>{});
      }
      return true;
    } catch (_) { return false; }
  }
  function hmPlay(name, options={}) {
    if (!soundEnabled || !window.HMAudio) return false;
    try { window.HMAudio.play(name, options).catch(()=>{}); return true; } catch (_) { return false; }
  }

  // ---------- Commercial-style WebAudio SFX ----------
  let audioCtx = null;
  let masterGain = null;
  let sfxGain = null;
  let ambienceGain = null;
  let dynamicsComp = null;
  let noiseBuffer = null;
  let lastBounceSoundAt = 0;
  let lastRimSoundAt = 0;
  let ambienceTimer = null;
  let ambienceSource = null;
  let lastHurrySecond = -1;

  function ensureAudio() {
    if (!soundEnabled) return;
    ensurePackAudio();
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = new Ctx();
      masterGain = audioCtx.createGain();
      sfxGain = audioCtx.createGain();
      ambienceGain = audioCtx.createGain();
      masterGain.gain.value = .92;
      sfxGain.gain.value = 1.0;
      ambienceGain.gain.value = .04;
      dynamicsComp = audioCtx.createDynamicsCompressor();
      dynamicsComp.threshold.value = -18;
      dynamicsComp.knee.value = 12;
      dynamicsComp.ratio.value = 5;
      dynamicsComp.attack.value = .002;
      dynamicsComp.release.value = .16;
      sfxGain.connect(masterGain);
      ambienceGain.connect(masterGain);
      masterGain.connect(dynamicsComp);
      dynamicsComp.connect(audioCtx.destination);
      const length = audioCtx.sampleRate * 4;
      noiseBuffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  }

  function osc(freq, duration, type='sine', gain=.05, delay=0, endFreq=null) {
    if (!soundEnabled || !audioCtx || !sfxGain) return;
    const t = audioCtx.currentTime + delay;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(1,endFreq), t + duration);
    g.gain.setValueAtTime(Math.max(.0001,gain), t);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    o.connect(g).connect(sfxGain);
    o.start(t); o.stop(t + duration + .02);
  }

  function noise(duration=.08, gain=.03, delay=0, highpass=0, lowpass=0) {
    if (!soundEnabled || !audioCtx || !noiseBuffer || !sfxGain) return;
    const t = audioCtx.currentTime + delay;
    const src = audioCtx.createBufferSource();
    const g = audioCtx.createGain();
    src.buffer = noiseBuffer;
    let node = src;
    if (highpass) { const f=audioCtx.createBiquadFilter(); f.type='highpass'; f.frequency.value=highpass; node.connect(f); node=f; }
    if (lowpass) { const f=audioCtx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=lowpass; node.connect(f); node=f; }
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    node.connect(g).connect(sfxGain);
    src.start(t); src.stop(t + duration + .02);
  }

  function noiseSweep(duration=.12, gain=.04, startFreq=900, endFreq=5200, delay=0, type='bandpass') {
    if (!soundEnabled || !audioCtx || !noiseBuffer || !sfxGain) return;
    const t = audioCtx.currentTime + delay;
    const src = audioCtx.createBufferSource();
    const f = audioCtx.createBiquadFilter();
    const g = audioCtx.createGain();
    src.buffer = noiseBuffer;
    f.type = type; f.Q.value = .7;
    f.frequency.setValueAtTime(Math.max(20,startFreq), t);
    f.frequency.exponentialRampToValueAtTime(Math.max(20,endFreq), t + duration);
    g.gain.setValueAtTime(Math.max(.0001,gain), t);
    g.gain.exponentialRampToValueAtTime(.0001, t + duration);
    src.connect(f).connect(g).connect(sfxGain);
    src.start(t); src.stop(t + duration + .03);
  }


  function startAmbience(){
    ensureAudio();
    if (!soundEnabled || !audioCtx || !noiseBuffer || !ambienceGain || ambienceSource) return;
    const src = audioCtx.createBufferSource();
    const band = audioCtx.createBiquadFilter();
    const g = audioCtx.createGain();
    src.buffer = noiseBuffer; src.loop = true;
    band.type = 'bandpass'; band.frequency.value = 520; band.Q.value = .45;
    g.gain.value = .12;
    src.connect(band).connect(g).connect(ambienceGain);
    src.start(); ambienceSource = src;
  }
  function stopAmbience(){
    if (!ambienceSource) return;
    try { ambienceSource.stop(); } catch(_) {}
    try { ambienceSource.disconnect(); } catch(_) {}
    ambienceSource = null;
  }

  function soundUI(){ ensureAudio(); hmPlay('ui-tap',{volume:.42,rate:1.05}); }
  function soundReady(){ ensureAudio(); hmPlay('ready',{volume:.58,rate:1.0}); }

  function soundShoot(power=1){
    ensureAudio();
    const p = THREE.MathUtils.clamp(power, .65, 1.45);
    // Pack-driven release: leather hand-off + air movement. Minimal low-end synth only adds body.
    hmPlay('swipe',{volume:.34,rate:1.0+((p-1)*.12)});
    setTimeout(()=>hmPlay('whoosh',{volume:.62,rate:.82+((p-1)*.18)}),16);
    osc(78*p,.055,'sine',.028,0,54*p);
  }
  function soundRim(intensity=1){
    if (performance.now()-lastRimSoundAt<70) return; lastRimSoundAt=performance.now();
    ensureAudio();
    const v=THREE.MathUtils.clamp(.46*intensity,.34,.82);
    // Bright target-hit at a higher rate reads more metallic than the previous oscillator stack.
    hmPlay('target-hit',{volume:v,rate:1.35});
    hmPlay('impact-soft',{volume:v*.30,rate:1.7});
    osc(1220,.10,'sine',.012,0,980);
  }
  function soundBoard(intensity=1){
    ensureAudio();
    const v=THREE.MathUtils.clamp(.46*intensity,.34,.86);
    hmPlay('impact-hard',{volume:v,rate:.88});
    hmPlay('impact-soft',{volume:v*.36,rate:.72});
    osc(112,.075,'sine',.018,0,76);
  }
  function soundBounce(speed=1){
    if (performance.now()-lastBounceSoundAt<85) return; lastBounceSoundAt=performance.now();
    ensureAudio();
    const strength=THREE.MathUtils.clamp(speed/7,.25,1.35);
    hmPlay('bounce',{volume:Math.min(.86,.38+strength*.26),rate:THREE.MathUtils.clamp(.76+strength*.10,.78,1.05)});
    if(strength>.8) hmPlay('impact-soft',{volume:.16+strength*.08,rate:.82});
  }
  function soundNet(){
    ensureAudio();
    // The pack has no dedicated net recording, so use a light whoosh and a very thin filtered-noise tail.
    hmPlay('whoosh',{volume:.26,rate:1.42});
    noiseSweep(.16,.020,5200,2300,0,'bandpass');
  }
  function soundCrowdPop(){ ensureAudio(); hmPlay('bonus',{volume:.22,rate:.92}); noise(.28,.012,0,260,3200); }
  function soundFirework(){ ensureAudio(); hmPlay('achievement',{volume:.42,rate:1.0}); }
  function soundGoal(shotType='swish'){
    ensureAudio();
    soundNet();
    if(shotType==='swish') hmPlay('perfect',{volume:.46,rate:1.12});
    else if(shotType==='rim') hmPlay('score-up',{volume:.34,rate:1.04});
    else if(shotType==='board') hmPlay('correct',{volume:.32,rate:.98});
    else hmPlay('success',{volume:.30,rate:.96});
    soundCrowdPop();
  }
  function soundCombo(n){ ensureAudio(); hmPlay(n>=5?'combo-up':'combo',{volume:.46,rate:1+Math.min(n,8)*.015}); }
  function soundFever(){ ensureAudio(); hmPlay('combo-up',{volume:.62,rate:1.08}); setTimeout(()=>hmPlay('combo',{volume:.48,rate:1.12}),80); }
  function soundMiss(){ ensureAudio(); hmPlay('target-miss',{volume:.62,rate:.94}); setTimeout(()=>hmPlay('ui-error',{volume:.32,rate:.90}),45); }
  function soundHurryBeep(){ ensureAudio(); hmPlay('timer-urgent',{volume:.48,rate:1.0}); }
  function soundClear(){ ensureAudio(); hmPlay('round-clear',{volume:.60,rate:1.0}); setTimeout(()=>hmPlay('achievement',{volume:.42,rate:1.04}),90); }
  function soundFail(){ ensureAudio(); hmPlay('fail',{volume:.62,rate:1.0}); }
  function soundUnlock(){ ensureAudio(); hmPlay('stage-up',{volume:.52,rate:1.0}); }

  function pulseHaptic(pattern){ try{ if (vibrationEnabled && navigator.vibrate) navigator.vibrate(pattern); }catch(_){} }
  function hapticShoot(){ pulseHaptic(12); }
  function hapticBoard(){ pulseHaptic([22,10,18]); }
  function hapticRim(){ pulseHaptic([7,7,12]); }
  function hapticFloor(speed=1){ const p=Math.round(10+Math.min(18,speed*2)); pulseHaptic([p,18,Math.max(6,Math.round(p*.45))]); }
  function hapticGoal(){ pulseHaptic([24,18,38,22,68]); }
  function hapticMiss(){ pulseHaptic([32,28,32]); }

  soundBtn.addEventListener('click', () => {
    soundEnabled=!soundEnabled;safeSet(STORAGE.sound,soundEnabled?1:0);syncQuickControls();
    if(window.HMAudio){try{window.HMAudio.setEnabled(soundEnabled);}catch(_){}}
    if(soundEnabled){ensureAudio();soundUI();if(mode!=='menu')startAmbience();}else{stopAmbience();}
  });
  vibrationBtn.addEventListener('click',()=>{
    vibrationEnabled=!vibrationEnabled;safeSet(STORAGE.vibration,vibrationEnabled?1:0);syncQuickControls();
    if(vibrationEnabled)pulseHaptic([18,20,18]);
  });

  // ---------- Input ----------
  let pointerDown = false;
  let pointerId = null;
  let dragStart = { x: 0, y: 0 };
  let dragNow = { x: 0, y: 0 };

  function getLocalPoint(e) {
    const r = root.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  root.addEventListener('pointerdown', (e) => {
    if (autoDemoActive || mode === 'menu' || gameEnded || ballFlying) return;
    if (e.target && e.target.closest && e.target.closest('button')) return;
    if (e.cancelable) e.preventDefault();
    pointerDown = true;
    pointerId = e.pointerId;
    root.setPointerCapture?.(e.pointerId);
    dragStart = getLocalPoint(e);
    dragNow = { ...dragStart };
    swipeLine.style.display = 'block';
    powerWrap.classList.add('show');
    powerFill.style.width = '0%';
    powerText.textContent = 'HOLD';
    soundReady();
    updateSwipeLine();
    ensureAudio();
  }, {capture:true, passive:false});

  root.addEventListener('pointermove', (e) => {
    if (!pointerDown || e.pointerId !== pointerId) return;
    if (e.cancelable) e.preventDefault();
    dragNow = getLocalPoint(e);
    updateSwipeLine();
    const dragPower = THREE.MathUtils.clamp((dragStart.y - dragNow.y) / 250, 0, 1);
    powerFill.style.width = `${Math.round(dragPower * 100)}%`;
    powerText.textContent = dragPower >= .58 && dragPower <= .76 ? 'PERFECT' : dragPower > .82 ? 'MAX' : dragPower > .25 ? 'POWER' : 'HOLD';
  }, {capture:true, passive:false});

  root.addEventListener('pointerup', (e) => {
    if (!pointerDown || e.pointerId !== pointerId) return;
    if (e.cancelable) e.preventDefault();
    pointerDown = false;
    swipeLine.style.display = 'none';
    setTimeout(() => powerWrap.classList.remove('show'), 180);
    const end = getLocalPoint(e);
    const dx = end.x - dragStart.x;
    const dy = dragStart.y - end.y;
    if (dy > 28) shoot(dx, dy);
    pointerId = null;
  }, {capture:true, passive:false});

  root.addEventListener('pointercancel', () => {
    pointerDown = false;
    pointerId = null;
    swipeLine.style.display = 'none';
    powerWrap.classList.remove('show');
  });

  function updateSwipeLine() {
    const x1 = dragStart.x;
    const y1 = dragStart.y;
    const x2 = dragNow.x;
    const y2 = dragNow.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx) * 180 / Math.PI;
    swipeLine.style.left = `${x1}px`;
    swipeLine.style.top = `${y1}px`;
    swipeLine.style.width = `${len}px`;
    swipeLine.style.transform = `rotate(${ang}deg)`;
  }

  function shoot(dx, dy) {
    if (ballFlying || gameEnded || mode === 'menu') return;
    if (mode === 'stage' && shots >= stageConfig.attempts) return;

    ensureAudio(); aimGuide.style.display = 'none';
    if (mode === 'time' && !timerRunning) { timerRunning = true; timerStartedAt = performance.now(); }

    const shotIndex = shots;
    shots++;
    if (mode === 'stage') updateStageTension('슛!');
    if (mode === 'free') { freeTotalShots++; safeSet(STORAGE.freeShots, freeTotalShots); }

    const vertical = THREE.MathUtils.clamp(dy, 35, 320);
    const powerNorm = THREE.MathUtils.clamp(vertical / 165, 0.48, 1.38);
    const stageAssist = mode === 'stage' ? THREE.MathUtils.clamp(stageConfig.assist || 0, 0, .58) : 0;
    const rawPowerError = (powerNorm - 1.0);
    const powerError = rawPowerError * (1 - stageAssist * .72);

    soundShoot(powerNorm);
    hapticShoot();

    // Early stages lightly compensate for moving-hoop timing; the assist fades toward stage 20.
    let assistedHoopX = hoopX;
    if (mode === 'stage' && stageConfig.motion !== 'fixed' && stageAssist > 0) {
      const futureX = predictedHoopXAt(performance.now() + 1180);
      assistedHoopX = THREE.MathUtils.lerp(hoopX, futureX, stageAssist * .82);
    }
    const target = new THREE.Vector3(assistedHoopX, HOOP_Y + 0.22, HOOP_Z);
    const flat = new THREE.Vector3(target.x - ball.position.x, 0, target.z - ball.position.z);
    const distance = flat.length();
    const forward = flat.clone().normalize();
    const sideAxis = new THREE.Vector3(-forward.z, 0, forward.x);
    const flightTime = THREE.MathUtils.clamp(1.08 + distance * 0.025 - powerError * 0.13, 1.12, 1.48);
    const horizontalSpeed = distance / flightTime * (1 + powerError * 0.16);
    const sideRaw = THREE.MathUtils.clamp(dx / 125, -2.4, 2.4);
    const side = sideRaw * (1 - stageAssist * .62);
    const vyIdeal = (target.y - ball.position.y + 0.5 * 9.8 * flightTime * flightTime) / flightTime;
    const vy = vyIdeal * (1 + powerError * 0.12);

    ballVelocity.copy(forward).multiplyScalar(horizontalSpeed).addScaledVector(sideAxis, side);
    ballVelocity.y = vy;

    ballFlying = true; shotResolved = false; shotStartTime = performance.now(); lastBallY = ball.position.y; lastBallZ = ball.position.z; touchedRim = false; touchedBoard = false;
    if (mode === 'stage') markRackResult(shotIndex, false);
  }

  // ---------- Collision / scoring ----------
  function resolveRimCollision() {
    const localX = ball.position.x - hoopX;
    const dx = localX;
    const dz = ball.position.z - HOOP_Z;
    const planar = Math.hypot(dx, dz);
    const vertical = Math.abs(ball.position.y - HOOP_Y);
    const rimTube = 0.065;
    const minDist = BALL_R + rimTube;
    if (vertical < minDist && Math.abs(planar - HOOP_RADIUS) < minDist) {
      const nearestX = hoopX + (dx / (planar || 1)) * HOOP_RADIUS;
      const nearestZ = HOOP_Z + (dz / (planar || 1)) * HOOP_RADIUS;
      const normal = new THREE.Vector3(
        ball.position.x - nearestX,
        ball.position.y - HOOP_Y,
        ball.position.z - nearestZ
      );
      const dist = normal.length() || 0.001;
      if (dist < minDist && ballVelocity.dot(normal) < 0) {
        normal.normalize();
        ball.position.addScaledVector(normal, minDist - dist + 0.003);
        ballVelocity.reflect(normal).multiplyScalar(0.72);
        ballVelocity.y *= 0.9;
        touchedRim = true;
        soundRim(Math.min(1.5, Math.max(.7, ballVelocity.length()/10)));
        hapticRim();
      }
    }
  }

  function resolveBackboardCollision() {
    // Match the visible transparent backboard exactly: 1.80m x 1.05m.
    // The previous collision box was roughly twice as wide/tall, causing phantom board shots.
    const boardHalfW = 0.90;
    const boardHalfH = 0.525;
    const boardCenterY = 3.60;
    const boardFrontZ = -6.94;
    const hitX = ball.position.x > hoopX - boardHalfW - BALL_R && ball.position.x < hoopX + boardHalfW + BALL_R;
    const hitY = ball.position.y > boardCenterY - boardHalfH - BALL_R && ball.position.y < boardCenterY + boardHalfH + BALL_R;
    const contactZ = boardFrontZ + BALL_R;
    const crossedPlane = lastBallZ > contactZ && ball.position.z <= contactZ;
    if (hitX && hitY && crossedPlane && ballVelocity.z < 0) {
      ball.position.z = contactZ + 0.004;
      const impact = Math.abs(ballVelocity.z);
      ballVelocity.z = impact * 0.66;
      ballVelocity.x *= 0.92;
      ballVelocity.y *= 0.93;
      touchedBoard = true;
      soundBoard(Math.min(1.5, Math.max(.7, impact/8)));
      hapticBoard();
    }
  }

  function checkGoal() {
    if (shotResolved) return;
    const crossedDown = lastBallY > HOOP_Y && ball.position.y <= HOOP_Y && ballVelocity.y < 0;
    if (!crossedDown) return;
    const dx = ball.position.x - hoopX;
    const dz = ball.position.z - HOOP_Z;
    const inside = Math.hypot(dx, dz) < (HOOP_RADIUS - BALL_R * 0.62);
    if (inside) registerGoal();
  }

  function currentShotType() {
    if (touchedBoard && touchedRim) return 'board-rim';
    if (touchedBoard) return 'board';
    if (touchedRim) return 'rim';
    return 'swish';
  }

  function registerGoal() {
    shotResolved = true;
    goals++;
    if (mode === 'stage') stagePoints += currentShotValue;
    combo++;
    bestComboRun = Math.max(bestComboRun, combo);
    globalBestCombo = Math.max(globalBestCombo, combo);
    safeSet(STORAGE.bestCombo, globalBestCombo);
    if (touchedBoard) bankGoalCount++;

    const shotType = currentShotType();
    let label = shotType === 'swish' ? 'CLEAN SWISH!' :
      shotType === 'rim' ? 'RIM IN!' :
      shotType === 'board' ? 'BOARD IN!' : 'BOARD + RIM!';
    if (combo >= 5) label = `🔥 ${label} · ON FIRE!`;
    else if (combo >= 3) label = `${label} · ${combo} COMBO!`;
    if (combo === 3) {
      feverBanner.classList.remove('show'); void feverBanner.offsetWidth; feverBanner.classList.add('show');
      soundFever(); pulseHaptic([35,25,50]);
    } else if (combo > 3) { soundCombo(combo); }

    if (mode === 'time') {
      const fever = combo >= 3;
      score += !touchedBoard && !touchedRim ? (fever ? 3 : 2) : (fever ? 2 : 1);
    } else {
      score = goals;
    }
    if (mode === 'stage') {
      markRackResult(shots - 1, true);
      const progress = stageConfig.targetType === 'points' ? stagePoints : goals;
      updateStageTension(progress >= stageConfig.target ? (currentShotValue === 3 ? 'MONEY BALL!' : '클리어 조건 달성!') : (currentShotValue === 3 ? '+3 MONEY BALL!' : '골인!'));
    }
    if (mode === 'free') {
      freeTotalGoals++;
      safeSet(STORAGE.freeGoals, freeTotalGoals);
    }

    hudScore.textContent = String(mode === 'time' ? score : (mode === 'stage' && stageConfig?.targetType === 'points' ? stagePoints : goals));
    hudCombo.textContent = String(combo);
    if (mode === 'free') hudMain.textContent = `${freeTotalGoals}/${freeTotalShots}`;
    showToast(label, true);
    spawnFireworks();
    flashElement(goalFlash);
    kickNet();
    soundGoal(shotType);
    hapticGoal();
  }

  function registerMissIfNeeded() {
    if (shotResolved) return;
    shotResolved = true;
    combo = 0;
    hudCombo.textContent = '0';
    showToast('MISS!', false);
    flashElement(missFlash);
    soundMiss();
    hapticMiss();
    if (mode === 'stage') { markRackResult(shots - 1, false); updateStageTension('MISS'); }
  }

  function finishShotSoon() {
    if (!ballFlying) return;
    ballFlying = false;
    registerMissIfNeeded();

    if (mode === 'stage') {
      const progress = stageConfig.targetType === 'points' ? stagePoints : goals;
      const enoughGoals = progress >= stageConfig.target;
      const bankOk = bankGoalCount >= stageConfig.bankRequired;
      if (enoughGoals && bankOk) {
        endStage(true);
        return;
      }
      if (shots >= stageConfig.attempts) {
        endStage(false);
        return;
      }
    }
    if (mode === 'time' && timeLeft <= 0) {
      endTimed();
      return;
    }
    resetTimer = setTimeout(setBallStart, 520);
  }

  function endStage(clear) {
    gameEnded = true;
    aimGuide.style.display = 'none';
    resultOverlay.classList.remove('hidden');
    resultGoals.textContent = String(goals);
    resultShots.textContent = String(shots);
    resultCombo.textContent = String(bestComboRun);

    if (clear) {
      const swishBonus = shots > 0 && goals === shots;
      const starsEarned = shots <= stageConfig.target ? 3 : (swishBonus || shots <= stageConfig.target + 1 ? 2 : 1);
      if (!stageDemoMode) {
        stageStars[currentStage] = Math.max(Number(stageStars[currentStage]) || 0, starsEarned);
        safeSetJSON(STORAGE.stars, stageStars);
      }
      resultStars.textContent = '★'.repeat(starsEarned) + '☆'.repeat(3 - starsEarned);
      resultRank.textContent = starsEarned === 3 ? 'PERFECT CLEAR' : starsEarned === 2 ? 'GREAT CLEAR' : 'STAGE CLEAR';
      soundClear(); pulseHaptic([45,35,80]);
      resultTitle.textContent = currentStage === MAX_STAGE ? '🏆 CHAMPION!' : 'STAGE CLEAR!';
      resultTitle.style.color = 'var(--good)';
      if (stageDemoMode) {
        resultMessage.textContent = `DEMO STAGE ${currentStage} 완료 · 다른 데모 단계도 바로 확인할 수 있습니다.`;
        resultNext.textContent = currentStage < MAX_STAGE ? '다음 데모 단계' : 'STAGE 1 데모';
        resultNext.style.display = '';
      } else if (currentStage < MAX_STAGE) {
        unlockedStage = Math.max(unlockedStage, currentStage + 1);
        safeSet(STORAGE.unlocked, unlockedStage);
        soundUnlock();
        stageDesc.textContent = `${unlockedStage}단계부터 이어하기`;
        resultMessage.textContent = `${currentStage}단계를 통과했습니다. 다음에는 새로운 슛 위치와 규칙이 기다립니다.`;
        resultNext.textContent = '다음 단계';
        resultNext.style.display = '';
      } else {
        unlockedStage = MAX_STAGE;
        safeSet(STORAGE.unlocked, MAX_STAGE);
        resultMessage.textContent = '20개의 BASKET RUSH 챌린지를 모두 완주했습니다!';
        resultNext.textContent = 'FINAL 다시';
        resultNext.style.display = '';
      }
    } else {
      resultStars.textContent = '☆☆☆';
      resultRank.textContent = 'TRY AGAIN';
      soundFail();
      resultTitle.textContent = '다시 도전!';
      resultTitle.style.color = 'var(--bad)';
      const bankText = stageConfig.bankRequired && bankGoalCount < stageConfig.bankRequired ? ' 보드를 맞고 들어가는 골인 조건도 확인하세요.' : '';
      resultMessage.textContent = `${stageConfig.target}${stageConfig.targetType === 'points' ? '점' : '골'}이 필요합니다.${bankText}`;
      resultNext.textContent = '재도전';
      resultNext.style.display = '';
    }
    resultNext.dataset.clear = clear ? '1' : '0';
  }

  function endTimed() {
    if (gameEnded) return;
    gameEnded = true;
    timerRunning = false;
    ballFlying = false;
    aimGuide.style.display = 'none';
    timeBest = Math.max(timeBest, score);
    safeSet(STORAGE.timeBest, timeBest);
    resultOverlay.classList.remove('hidden');
    resultStars.textContent = score >= 30 ? '★★★' : score >= 18 ? '★★☆' : '★☆☆';
    resultRank.textContent = score >= 30 ? 'ALL STAR' : score >= 18 ? 'SHARPSHOOTER' : 'ROOKIE';
    resultTitle.textContent = 'TIME UP!';
    resultTitle.style.color = 'var(--accent)';
    resultMessage.textContent = `이번 기록 ${score}점 · 최고 기록 ${timeBest}점`;
    resultGoals.textContent = String(goals);
    resultShots.textContent = String(shots);
    resultCombo.textContent = String(bestComboRun);
    resultNext.textContent = '다시 하기';
    resultNext.style.display = '';
    resultNext.dataset.clear = 'time';
  }

  // ---------- Loop ----------
  function updateBall(dt) {
    if (!ballFlying) return;
    lastBallY = ball.position.y;
    lastBallZ = ball.position.z;

    ballVelocity.y -= 9.8 * dt;
    ballVelocity.x += windX * dt;
    ball.position.addScaledVector(ballVelocity, dt);
    ball.rotation.x += ballVelocity.z * dt * 0.65;
    ball.rotation.z -= ballVelocity.x * dt * 0.85;

    resolveBackboardCollision();
    resolveRimCollision();
    checkGoal();

    // floor bounce
    if (ball.position.y < BALL_R) {
      ball.position.y = BALL_R;
      if (Math.abs(ballVelocity.y) > 0.8) {
        soundBounce(Math.abs(ballVelocity.y));
        hapticFloor(Math.abs(ballVelocity.y));
        ballVelocity.y = Math.abs(ballVelocity.y) * 0.48;
        ballVelocity.x *= 0.76;
        ballVelocity.z *= 0.76;
      } else {
        ballVelocity.y = 0;
      }
    }

    const elapsed = (performance.now() - shotStartTime) / 1000;
    const tooFar = Math.abs(ball.position.x) > 9 || ball.position.z < -14 || ball.position.z > 12 || ball.position.y > 14;
    const settled = ball.position.y <= BALL_R + 0.01 && ballVelocity.length() < 0.9;
    if (elapsed > 3.1 || tooFar || (elapsed > 1.4 && settled)) finishShotSoon();
  }

  function updateTimer(now) {
    if (autoDemoActive) return;
    if (mode === 'stage' && stageConfig?.timeLimit && !gameEnded) {
      stageTimeLeft = Math.max(0, (stageDeadline - now) / 1000);
      hudMain.textContent = stageTimeLeft.toFixed(1);
      if (stageTimeLeft <= 5) {
        statusText.textContent = `HURRY UP! · ${stageTimeLeft.toFixed(1)}초`;
        const sec = Math.ceil(stageTimeLeft);
        if (sec !== lastHurrySecond && sec > 0) { lastHurrySecond = sec; soundHurryBeep(); }
      }
      if (stageTimeLeft <= 0) {
        stageTimeLeft = 0; hudMain.textContent = '0.0';
        if (!ballFlying) endStage(false);
      }
      return;
    }
    if (mode !== 'time' || !timerRunning || gameEnded) return;
    timeLeft = Math.max(0, 60 - (now - timerStartedAt) / 1000);
    hudMain.textContent = timeLeft.toFixed(1);
    if (timeLeft <= 10) {
      statusText.textContent = 'HURRY UP!';
      const sec = Math.ceil(timeLeft);
      if (sec !== lastHurrySecond && sec > 0) { lastHurrySecond = sec; soundHurryBeep(); }
    }
    if (timeLeft <= 0) { timeLeft = 0; hudMain.textContent = '0.0'; if (!ballFlying) endTimed(); }
  }

  function updateHoop(t) {
    if (!moveHoop || gameEnded || !stageConfig) return;
    const r = stageConfig.moveRange || 1.2;
    const sp = hoopMoveSpeed || .8;
    let x = Math.sin(t * sp * 2.1) * r;
    if (stageConfig.motion === 'burst') x = Math.sin(t * sp * 2.7) * r * (0.55 + 0.45 * Math.sin(t * .7) ** 2);
    setHoopX(x);
  }

  function animate() {
    const dt = Math.min(clock.getDelta(), 0.033);
    const now = performance.now();
    const t = now / 1000;
    updateHoop(t);
    updateCameraTween(now);
    updateAutoDemoShot(now);
    if (!autoDemoActive) updateBall(dt);
    updateFireworks(dt);
    updateNet(dt);
    updateTimer(now);
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  function resize() {
    const r = root.getBoundingClientRect();
    const w = Math.max(1, Math.floor(r.width));
    const h = Math.max(1, Math.floor(r.height));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  try {
    if (typeof ResizeObserver === 'function') {
      const hmResizeObserver = new ResizeObserver(resize);
      hmResizeObserver.observe(root);
    } else {
      window.addEventListener('resize', resize, {passive:true});
    }
  } catch (_) {
    window.addEventListener('resize', resize, {passive:true});
  }
  resize();

  // ---------- UI events ----------
  root.querySelector('#mode-stage').addEventListener('click', () => { soundUI(); openStageSelect(); });
  root.querySelector('#mode-demo').addEventListener('click', () => { soundUI(); openDemoSelect(); });
  root.querySelector('#mode-auto-demo').addEventListener('click', () => { soundUI(); startAutoDemo(); });
  root.querySelector('#mode-free').addEventListener('click', () => { stageDemoMode = false; soundUI(); configureMode('free'); });
  root.querySelector('#mode-time').addEventListener('click', () => { stageDemoMode = false; soundUI(); configureMode('time'); });


  autoDemoNextBtn.addEventListener('click', () => { if (!autoDemoActive) return; soundUI(); clearTimeout(autoDemoTransitionTimer); autoDemoShotActive = false; if (autoDemoStage >= MAX_STAGE) stopAutoDemo(true); else beginAutoDemoStage(autoDemoStage + 1); });
  autoDemoStopBtn.addEventListener('click', () => { if (!autoDemoActive) return; soundUI(); stopAutoDemo(true); });

  root.querySelector('#stage-close').addEventListener('click', () => { soundUI(); goHome(); });
  root.querySelector('#demo-close').addEventListener('click', () => { soundUI(); goHome(); });
  root.querySelector('#stage-menu-home').addEventListener('click', () => { soundUI(); goHome(); });
  root.querySelector('#chapter-prev').addEventListener('click', () => { soundUI(); selectedChapter = Math.max(0, selectedChapter - 1); const first=selectedChapter*5+1; selectedStage = Math.min(first + 4, Math.max(first, Math.min(unlockedStage, selectedStage))); renderStageSelect(); });
  root.querySelector('#chapter-next').addEventListener('click', () => { soundUI(); selectedChapter = Math.min(CHAPTERS.length - 1, selectedChapter + 1); const first=selectedChapter*5+1; selectedStage = unlockedStage >= first ? Math.min(first + 4, Math.max(first, unlockedStage)) : unlockedStage; renderStageSelect(); });
  stagePlayBtn.addEventListener('click', () => { if (stagePlayBtn.disabled || selectedStage > unlockedStage) return; soundUI(); startStage(selectedStage); });

  function goHome() {
    clearTimeout(resetTimer);
    clearTimeout(autoDemoTransitionTimer);
    autoDemoTransitionTimer = null;
    autoDemoActive = false;
    autoDemoShotActive = false;
    autoDemoHud.classList.add('hidden');
    ball.material.color.set(0xffffff);
    mode = 'menu';
    gameEnded = false;
    timerRunning = false;
    ballFlying = false;
    moveHoop = false;
    stopAmbience();
    setHoopX(0);
    ballRack.innerHTML = '';
    applyShotPosition('center_ft', false);
    setBallStart();
    aimGuide.style.display = 'none';
    backBtn.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    stageOverlay.classList.add('hidden');
    demoOverlay.classList.add('hidden');
    stageDemoMode = false;
    menuOverlay.classList.remove('hidden');
    soundBtn.classList.add('menu-pos');
    hudMode.textContent = '대기';
    hudMainLabel.textContent = '스테이지';
    hudMain.textContent = '-';
    hudScore.textContent = '0';
    hudCombo.textContent = '0';
    statusText.textContent = '모드를 선택해 시작하세요';
    soundBtn.textContent = soundEnabled ? '사운드 ON' : '사운드 OFF';
    updateMenuStats();
  }

  backBtn.addEventListener('click', () => { soundUI(); if (autoDemoActive) stopAutoDemo(true); else goHome(); });
  root.querySelector('#result-home').addEventListener('click', () => { soundUI(); goHome(); });
  resultNext.addEventListener('click', () => {
    soundUI();
    const type = resultNext.dataset.clear;
    if (mode === 'stage') {
      if (stageDemoMode && type === '1') {
        selectedStage = currentStage >= MAX_STAGE ? 1 : currentStage + 1;
        startStage(selectedStage);
      } else if (type === '1') {
        selectedStage = currentStage >= MAX_STAGE ? MAX_STAGE : currentStage + 1;
        startStage(selectedStage);
      } else startStage(currentStage);
    } else if (mode === 'time') {
      configureMode('time');
    } else {
      configureMode(mode);
    }
  });

  // Initial placement
  updateMenuStats();
  renderStageSelect();
  renderDemoGrid();
  setBallStart();
  statusText.textContent = '모드를 선택해 시작하세요';
  root.dataset.hmBasketballReady = '1';

      })();
      loadAudioLater();
    }catch(err){
      started=false;
      root.dataset.hmBasketballReady='0';
      status('게임 초기화 오류: '+(err && err.message ? err.message : '알 수 없는 오류'));
      console.error('[Basketball Shot] initialization failed.',err);
    }
  }

  function waitForThree(maxMs) {
    return new Promise(function(resolve){
      var startedAt = performance.now();
      (function check(){
        if (hasThree149()) { resolve(true); return; }
        if (performance.now() - startedAt >= maxMs) { resolve(false); return; }
        setTimeout(check, 60);
      })();
    });
  }

  function loadScriptWithTimeout(url, marker, timeoutMs) {
    return new Promise(function(resolve){
      var finished = false;
      var timer = null;
      function done(ok){
        if (finished) return;
        finished = true;
        if (timer) clearTimeout(timer);
        resolve(!!ok);
      }

      if (window.THREE && window.THREE.WebGLRenderer) { done(true); return; }

      var existing = document.querySelector('script[data-hm-loader="' + marker + '"]');
      if (existing) {
        existing.addEventListener('load', function(){ waitForThree(1200).then(done); }, {once:true});
        existing.addEventListener('error', function(){ done(false); }, {once:true});
        timer = setTimeout(function(){ done(hasThree149()); }, timeoutMs);
        return;
      }

      var script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'no-referrer';
      script.setAttribute('data-hm-loader', marker);
      script.onload = function(){ waitForThree(1200).then(done); };
      script.onerror = function(){ done(false); };
      timer = setTimeout(function(){
        try { script.remove(); } catch (_) {}
        done(hasThree149());
      }, timeoutMs);
      (document.head || document.documentElement).appendChild(script);
    });
  }

  async function boot() {
    var root=document.getElementById(ROOT_ID);
    if(!root) return;
    if(root.dataset.hmBasketballReady==='1') return;
    if(root.dataset.hmBasketballBoot==='loading' && root.dataset.hmBasketballBootStarted){
      var age = Date.now() - Number(root.dataset.hmBasketballBootStarted || 0);
      if (age < 6500) return;
    }
    root.dataset.hmBasketballBoot='loading';
    root.dataset.hmBasketballBootStarted=String(Date.now());

    if(hasThree149()){
      root.dataset.hmBasketballBoot='three-ready';
      start();
      return;
    }

    var sources = [
      ['https://cdnjs.cloudflare.com/ajax/libs/three.js/0.149.0/three.min.js','three-r149-cdnjs'],
      ['https://unpkg.com/three@0.149.0/build/three.min.js','three-r149-unpkg'],
      ['https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js','three-r149-jsdelivr']
    ];

    for (var i=0;i<sources.length;i++) {
      status('3D 엔진을 불러오는 중입니다... ' + (i+1) + '/' + sources.length);
      var ok = await loadScriptWithTimeout(sources[i][0], sources[i][1], 5000);
      if (ok && hasThree149()) {
        root.dataset.hmBasketballBoot='three-ready';
        start();
        return;
      }
    }

    root.dataset.hmBasketballBoot='error';
    root.dataset.hmBasketballReady='0';
    status('3D 엔진 연결에 실패했습니다. 새로고침 후 다시 시도해 주세요.');
    console.error('[Basketball Shot] THREE.js failed from all CDN sources.');
  }

  // Blogger-safe boot: DOM ready + delayed retries in case Blogger reorders external scripts.
  function scheduleBoot(){
    boot();
    setTimeout(function(){
      var r=document.getElementById(ROOT_ID);
      if(r && r.dataset.hmBasketballReady!=='1') boot();
    }, 7000);
    setTimeout(function(){
      var r=document.getElementById(ROOT_ID);
      if(r && r.dataset.hmBasketballReady!=='1') boot();
    }, 15000);
  }
  if(document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', scheduleBoot, {once:true});
  } else {
    setTimeout(scheduleBoot, 0);
  }
  window.addEventListener('load', function(){
    var r=document.getElementById(ROOT_ID);
    if(r && r.dataset.hmBasketballReady!=='1') boot();
  }, {once:true});
})();
