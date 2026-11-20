// Portfolio: navigation, scroll effects, counters, hero network, galleries and viewer.
'use strict';

(function () {
  var nav = document.getElementById('nav');
  var toggle = nav.querySelector('.nav__toggle');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));

  // border under the bar once the page scrolls
  function onScroll() { nav.classList.toggle('is-scrolled', scrollY > 8); }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // phone menu
  function closeMenu() { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Ouvrir le menu'); document.body.style.overflow = ''; }
  toggle.addEventListener('click', function () {
    var open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  addEventListener('resize', function () { if (innerWidth > 900) closeMenu(); });

  // the nav word of the section on screen
  if ('IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        var a = byId[en.target.id]; if (a) { a.classList.add('is-active'); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });

    // gentle reveal, once
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rev.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { rev.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // reading progress
  var bar = document.querySelector('.progress i');
  function progress() { var h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty('--p', h > 0 ? (scrollY / h).toFixed(4) : 0); }
  addEventListener('scroll', progress, { passive: true }); addEventListener('resize', progress); progress();

  // stagger: siblings in a grid come in one after another
  [['.projects > .reveal', 90], ['.skills > .reveal', 110], ['.path .side > .reveal', 140]].forEach(function (g) {
    document.querySelectorAll(g[0]).forEach(function (el, i) { el.style.setProperty('--stagger', (i % 3) * g[1] + 'ms'); });
  });
  document.querySelectorAll('.timeline').forEach(function (tl) { tl.querySelectorAll('.tl').forEach(function (el, i) { el.style.setProperty('--i', i); }); });
  document.querySelectorAll('.exp ul').forEach(function (ul) { ul.querySelectorAll('li').forEach(function (el, i) { el.style.setProperty('--i', i); }); });

  // counters: the figures count up once, when they come on screen
  var counted = false, statsBox = document.querySelector('.stats');
  function countUp() {
    if (counted) return; counted = true;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var end = +el.dataset.count, t0 = null, dur = 1600;
      if (still) { el.textContent = end; return; }
      el.textContent = '0';
      function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4); el.textContent = Math.round(end * e); if (k < 1) requestAnimationFrame(step); }
      requestAnimationFrame(step);
    });
  }
  if (statsBox && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en, o) { if (en[0].isIntersecting) { countUp(); o.disconnect(); } }, { threshold: .4 }).observe(statsBox);
  }

  // the profile card types itself line by line, then a cursor blinks
  var pre = document.querySelector('.code-card pre');
  if (pre && !still) {
    var lines = pre.innerHTML.split('\n');
    pre.innerHTML = lines.map(function (l) { return '<span class="cl">' + l + '</span>'; }).join('\n');
    var cls = pre.querySelectorAll('.cl'), i = 0;
    setTimeout(function next() {
      if (i < cls.length) { cls[i++].classList.add('on'); setTimeout(next, 150); }
      else { var c = document.createElement('span'); c.className = 'caret'; cls[cls.length - 1].appendChild(c); }
    }, 900);
  }

  // a cyan light follows the pointer on the cards and the contact block
  if (fine) {
    document.querySelectorAll('.project, .skill, .box, .exp, .contact').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    // the profile card leans a little toward the pointer
    var card = document.querySelector('.code-card'), hero = document.querySelector('.hero');
    if (card && !still) {
      hero.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - (r.left + r.width / 2)) / innerWidth, y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        card.style.transform = 'perspective(1000px) rotateY(' + (x * 8).toFixed(2) + 'deg) rotateX(' + (-y * 8).toFixed(2) + 'deg)';
      });
      hero.addEventListener('pointerleave', function () { card.style.transform = ''; });
    }
  }

  // copy the e-mail address in one click
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var txt = b.dataset.copy;
      function done() { b.classList.add('is-done'); setTimeout(function () { b.classList.remove('is-done'); }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, function () {});
      else { var t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove(); }
    });
  });

  // ---------------------------------------------------------------- the full-screen viewer, shared by both games
  var viewer = (function () {
    var lb = document.querySelector('.lightbox'), img = lb.querySelector('.lightbox__img'), lab = lb.querySelector('[data-lb-label]'), cnt = lb.querySelector('[data-lb-count]');
    var list = [], at = 0, back = null, done = null;
    function show(n) {
      at = (n + list.length) % list.length;
      img.src = list[at].src; img.alt = list[at].alt;
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
      lab.textContent = list[at].label; cnt.textContent = (at + 1) + ' / ' + list.length;
    }
    function close() { if (lb.close) lb.close(); else { lb.removeAttribute('open'); lb.dispatchEvent(new Event('close')); } }
    lb.addEventListener('close', function () { document.body.style.overflow = ''; if (done) done(at); if (back) back.focus({ preventScroll: true }); });
    lb.querySelector('[data-lb-close]').addEventListener('click', close);
    lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(at - 1); });
    lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(at + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox__inner')) close(); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(at + 1); else if (e.key === 'ArrowLeft') show(at - 1); });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1)); sx = null; });
    return {
      open: function (items, i, onClose) {
        list = items; done = onClose; back = document.activeElement; show(i);
        lb.setAttribute('aria-label', 'Captures');
        if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
        document.body.style.overflow = 'hidden';
      }
    };
  })();

  // Aegis Defender: the screen cycles through the captures; a click opens the full-screen viewer
  var gal = document.querySelector('[data-gallery]');
  if (gal) {
    var shots = gal.querySelectorAll('.screen__view img'), thumbs = gal.querySelectorAll('.thumb');
    var label = gal.querySelector('[data-shot-label]'), cur = 0, timer = 0, DUR = 4500, hold = false, onScreen = false;
    gal.style.setProperty('--dur', DUR + 'ms');
    function show(n, user) {
      cur = (n + shots.length) % shots.length;
      shots.forEach(function (im, k) { im.classList.toggle('is-on', k === cur); });
      thumbs.forEach(function (t, k) {
        var on = k === cur; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', String(on));
        var b = t.querySelector('.thumb__bar'); b.classList.remove('run'); if (on && !still && !hold) { void b.offsetWidth; b.classList.add('run'); }
      });
      label.textContent = thumbs[cur].dataset.label;
      if (user) restart();
    }
    function restart() { clearTimeout(timer); if (still || hold || !onScreen) return; timer = setTimeout(function () { show(cur + 1); restart(); }, DUR); }
    function pause(p) { hold = p; gal.classList.toggle('gallery-paused', p); if (p) clearTimeout(timer); else show(cur, true); }
    thumbs.forEach(function (t) { t.addEventListener('click', function () { show(+t.dataset.to, true); }); });
    gal.addEventListener('pointerenter', function () { pause(true); });
    gal.addEventListener('pointerleave', function () { pause(false); });
    gal.addEventListener('focusin', function () { pause(true); });
    gal.addEventListener('focusout', function (e) { if (!gal.contains(e.relatedTarget)) pause(false); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; if (onScreen) show(cur, true); else clearTimeout(timer); }, { threshold: .35 }).observe(gal);
    // keyboard on the rail: arrows move between captures
    gal.querySelector('.thumbs').addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault(); show(cur + d, true); thumbs[cur].focus();
    });

    var items = Array.prototype.map.call(shots, function (im, k) { return { src: im.getAttribute('src'), alt: im.alt, label: thumbs[k].dataset.label }; });
    function openAegis() { pause(true); viewer.open(items, cur, function (at) { show(at, false); pause(false); }); }
    gal.querySelector('.screen__view').addEventListener('click', openAegis);
    show(0);
  }

  // ---------------------------------------------------------------- Snake: the captures cycle; a click opens the viewer
  var snk = document.querySelector('[data-snk]');
  if (snk) {
    var snkCard = snk.closest('.snk');
    var slides = snk.querySelectorAll('.snk__slide'), sThumbs = snkCard.querySelectorAll('[data-snk-thumbs] .thumb');
    var sCur = 0, sTimer = 0, sHold = false, sVis = false, SD = 5000;
    snkCard.style.setProperty('--dur', SD + 'ms');
    var sItems = Array.prototype.map.call(slides, function (s, k) { var im = s.querySelector('img'); return { src: im.getAttribute('src'), alt: im.alt, label: sThumbs[k].dataset.label }; });
    function sShow(n) {
      sCur = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('is-on', k === sCur); });
      sThumbs.forEach(function (t, k) {
        var on = k === sCur; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', String(on));
        var b = t.querySelector('.thumb__bar'); b.classList.remove('run'); if (on && !still && !sHold) { void b.offsetWidth; b.classList.add('run'); }
      });
      sRestart();
    }
    function sRestart() { clearTimeout(sTimer); if (still || sHold || !sVis) return; sTimer = setTimeout(function () { sShow(sCur + 1); }, SD); }
    function sPause(p) { sHold = p; snkCard.classList.toggle('gallery-paused', p); if (p) clearTimeout(sTimer); else sShow(sCur); }
    sThumbs.forEach(function (t) { t.addEventListener('click', function () { sShow(+t.dataset.to); }); });
    snkCard.querySelector('[data-snk-thumbs]').addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!d) return; e.preventDefault(); sShow(sCur + d); sThumbs[sCur].focus();
    });
    var stageEl = snkCard.querySelector('.snk__stage');
    stageEl.addEventListener('pointerenter', function () { sPause(true); });
    stageEl.addEventListener('pointerleave', function () { sPause(false); });
    stageEl.addEventListener('focusin', function () { sPause(true); });
    stageEl.addEventListener('focusout', function (e) { if (!stageEl.contains(e.relatedTarget)) sPause(false); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { sVis = en[0].isIntersecting; if (sVis) sShow(sCur); else clearTimeout(sTimer); }, { threshold: .3 }).observe(snkCard);
    snk.querySelector('[data-snk-zoom]').addEventListener('click', function () { sPause(true); viewer.open(sItems, sCur, function (at) { sShow(at); sPause(false); }); });
    sShow(0);
  }

  // the hero's data network: points drift, link to their neighbours and to the pointer
  var cv = document.querySelector('.hero__net');
  if (cv && !still && cv.getContext) {
    var ctx = cv.getContext('2d'), heroEl = cv.parentElement, pts = [], W = 0, H = 0, dpr = Math.min(2, devicePixelRatio || 1);
    var mouse = { x: -9999, y: -9999 }, running = true, raf = 0;
    function size() {
      W = heroEl.offsetWidth; H = heroEl.offsetHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, Math.max(28, W * H / 16000)));
      pts = [];
      for (var k = 0; k < n; k++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .6 });
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      var L = 130;
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        var dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 160) { p.x += dxm / dm * .6; p.y += dym / dm * .6; ctx.strokeStyle = 'rgba(90,216,234,' + (1 - dm / 160) * .5 + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        for (var b = a + 1; b < pts.length; b++) {
          var q = pts[b], dx = p.x - q.x, dy = p.y - q.y, d = dx * dx + dy * dy;
          if (d < L * L) { ctx.strokeStyle = 'rgba(34,197,220,' + (1 - Math.sqrt(d) / L) * .22 + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(140,230,242,.75)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      if (running) raf = requestAnimationFrame(frame);
    }
    size(); frame();
    var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(size, 200); });
    heroEl.addEventListener('pointermove', function (e) { var r = heroEl.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    heroEl.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });
    // stop drawing when the hero is off screen or the tab is hidden
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting && !document.hidden;
      if (vis && !running) { running = true; frame(); } else if (!vis) { running = false; cancelAnimationFrame(raf); }
    }).observe(heroEl);
    document.addEventListener('visibilitychange', function () { if (document.hidden) { running = false; cancelAnimationFrame(raf); } else if (!running) { running = true; frame(); } });
  }
})();
