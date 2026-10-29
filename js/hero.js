// Banner con animación ligada al scroll.
// - Si SITE.heroFrames > 0 reproduce una secuencia de cuadros (extraída del video del hero).
// - Si no, anima la fotografía (zoom + desplazamiento) con cristales de sal flotando.
(() => {
  const hero = document.querySelector(".hero");
  if (!hero || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frames = window.SITE.heroFrames || 0;

  // Entrada del titular
  gsap.from(".hero h1 .line > span", { yPercent: 110, duration: 1.2, ease: "power4.out", stagger: 0.12, delay: 0.15 });
  gsap.from(".hero .eyebrow, .hero-sub, .hero-actions", { y: 24, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.5 });
  const mobile = window.matchMedia("(max-width: 700px)").matches;

  // En celular el banner no queda fijo (fijarlo da la sensación de que la página no baja):
  // los datos se muestran desde el inicio y la foto hace parallax mientras el banner sale.
  if (mobile) {
    gsap.fromTo(".hero-stage-2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.8 });
    if (reduce) return;
    gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.4 } })
      .fromTo(".hero-media img", { scale: 1.06, yPercent: 0 }, { scale: 1, yPercent: 14, ease: "none", duration: 1 }, 0)
      .to(".hero-content", { y: -60, opacity: 0, ease: "power1.in", duration: 0.7 }, 0)
      .to(".hero-stage-2", { y: -30, ease: "none", duration: 1 }, 0);
  }
  if (reduce) return;

  if (!mobile) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });

    if (frames > 0) {
      hero.classList.add("has-frames");
      const canvas = hero.querySelector(".hero-canvas");
      const ctx = canvas.getContext("2d");
      const images = [];
      const state = { frame: 0 };
      const src = (i) => `assets/hero/frames/f_${String(i + 1).padStart(3, "0")}.webp`;
      for (let i = 0; i < frames; i++) {
        const img = new Image();
        img.src = src(i);
        images.push(img);
      }
      const draw = () => {
        const img = images[Math.round(state.frame)];
        if (!img || !img.complete) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        if (canvas.width !== w * dpr) { canvas.width = w * dpr; canvas.height = h * dpr; }
        const scale = Math.max((w * dpr) / img.width, (h * dpr) / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        ctx.drawImage(img, (w * dpr - dw) / 2, (h * dpr - dh) / 2, dw, dh);
      };
      images[0].onload = draw;
      window.addEventListener("resize", draw);
      tl.to(state, { frame: frames - 1, ease: "none", duration: 1, onUpdate: draw }, 0);
    } else {
      tl.fromTo(".hero-media img", { scale: 1.12 }, { scale: 1, yPercent: -4, ease: "none", duration: 1 }, 0);
    }

    tl.to(".hero-content", { y: -80, opacity: 0, ease: "power1.in", duration: 0.35 }, 0.45)
      .fromTo(".hero-stage-2", { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.3 }, 0.55)
      .to(".hero-shade", { opacity: 0.55, duration: 0.4 }, 0.5)
      .to(".scroll-cue", { opacity: 0, duration: 0.1 }, 0.05);
  }

  // Cristales de sal flotando
  const pc = hero.querySelector(".hero-particles");
  if (!pc) return;
  const pctx = pc.getContext("2d");
  let W, H, crystals;
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = pc.width = pc.clientWidth * dpr;
    H = pc.height = pc.clientHeight * dpr;
    crystals = Array.from({ length: Math.round(pc.clientWidth / 22) }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: (Math.random() * 3 + 1.2) * dpr,
      d: Math.random() * 0.6 + 0.2,
      r: Math.random() * Math.PI,
      a: Math.random() * 0.5 + 0.25,
    }));
  };
  resize();
  window.addEventListener("resize", resize);

  let progress = 0;
  ScrollTrigger.create({ trigger: hero, start: "top top", end: mobile ? "bottom top" : "bottom bottom", onUpdate: (st) => (progress = st.progress) });

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

  const loop = () => {
    if (visible) {
      pctx.clearRect(0, 0, W, H);
      for (const c of crystals) {
        c.y -= c.d * (1 + progress * 6);
        c.r += 0.004;
        if (c.y < -10) { c.y = H + 10; c.x = Math.random() * W; }
        pctx.save();
        pctx.translate(c.x, c.y);
        pctx.rotate(c.r);
        pctx.fillStyle = `rgba(236, 248, 246, ${c.a})`;
        pctx.fillRect(-c.s / 2, -c.s / 2, c.s, c.s);
        pctx.restore();
      }
    }
    requestAnimationFrame(loop);
  };
  loop();
})();
