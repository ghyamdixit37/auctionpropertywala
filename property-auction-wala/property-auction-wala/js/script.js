/* Property Auction Wala — script.js (vanilla JS, no dependencies) */
(function () {
  'use strict';

  var NUMBERS = ['918875515555', '918561088777'];
  var FALLBACK_IMG = 'assets/images/placeholder.svg';

  // Hero photograph candidates: the first one that loads is used.
  var HERO_SOURCES = [
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2400&q=85',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=85',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=85',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85'
  ];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function waUrl(number, text) {
    return 'https://wa.me/' + number + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  function openDialog(d) {
    if (typeof d.showModal === 'function') {
      if (!d.open) d.showModal();
    } else {
      d.setAttribute('open', '');
    }
  }
  function closeDialog(d) {
    if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
  }

  // Footer year
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Hero background (tries each source in turn; dark green shows if none load)
  (function () {
    var bg = $('#hero-bg');
    if (!bg) return;
    var i = 0;
    (function tryNext() {
      if (i >= HERO_SOURCES.length) return;
      var src = HERO_SOURCES[i++];
      var probe = new Image();
      probe.onload = function () { bg.style.setProperty('--hero-img', "url('" + src + "')"); };
      probe.onerror = tryNext;
      probe.src = src;
    })();
  })();

  // Header scroll state
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = $('#menu-toggle');
  var nav = $('#main-nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 899) setMenu(false); });

  // Reveal on scroll
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Image fallback
  function applyFallback(img) {
    if (img.dataset.fb) return;
    img.dataset.fb = '1';
    img.src = FALLBACK_IMG;
  }
  $$('img').forEach(function (img) {
    img.addEventListener('error', function () { applyFallback(img); });
    if (img.complete && img.naturalWidth === 0 && img.src) applyFallback(img);
  });

  // WhatsApp chooser
  var waDialog = $('#wa-dialog');
  var waSub = $('#wa-sub');
  function openWaChooser(propertyName) {
    var msg = propertyName
      ? 'Hello Property Auction Wala, I am interested in learning more about ' + propertyName + '. Please share further details.'
      : 'Hello Property Auction Wala, I would like to learn more about your property opportunities.';
    $('#wa-link-1').href = waUrl(NUMBERS[0], msg);
    $('#wa-link-2').href = waUrl(NUMBERS[1], msg);
    waSub.textContent = propertyName
      ? 'Inquiry about: ' + propertyName + '. Select which number you would like to contact.'
      : 'Select which number you would like to contact.';
    openDialog(waDialog);
  }
  $$('[data-wa]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (nav.classList.contains('open')) setMenu(false);
      openWaChooser(btn.getAttribute('data-property'));
    });
  });
  $$('#wa-dialog .wa-card').forEach(function (a) {
    a.addEventListener('click', function () { setTimeout(function () { closeDialog(waDialog); }, 150); });
  });

  // Privacy
  var pDialog = $('#privacy-dialog');
  $$('[data-privacy]').forEach(function (b) { b.addEventListener('click', function () { openDialog(pDialog); }); });

  // Dialog close buttons + backdrop click
  $$('dialog').forEach(function (d) {
    $$('[data-close]', d).forEach(function (b) { b.addEventListener('click', function () { closeDialog(d); }); });
    d.addEventListener('click', function (e) {
      if (e.target === d) closeDialog(d);
    });
  });

  // Contact form -> WhatsApp
  var form = $('#inquiry-form');
  var err = $('#form-error');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var message = form.elements.message.value.trim();
    var target = form.elements.target.value;

    [form.elements.name, form.elements.phone, form.elements.message].forEach(function (el) { el.classList.remove('invalid'); });
    var problems = [];
    if (!name) { problems.push('name'); form.elements.name.classList.add('invalid'); }
    if (!/^[+\d][\d\s\-()]{6,}$/.test(phone)) { problems.push('a valid phone number'); form.elements.phone.classList.add('invalid'); }
    if (!message) { problems.push('a message'); form.elements.message.classList.add('invalid'); }

    if (problems.length) {
      err.textContent = 'Please enter ' + problems.join(', ') + '.';
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var text = 'Hello Property Auction Wala,\n\nName: ' + name + '\nPhone: ' + phone + '\n\n' + message;
    var url = waUrl(target, text);
    var w = window.open(url, '_blank', 'noopener');
    if (!w) window.location.href = url;
  });
})();
