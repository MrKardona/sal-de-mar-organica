// Encabezado, pie de página y bloques dinámicos compartidos por todas las páginas.
(() => {
  const S = window.SITE;
  const D = window.DATA;
  document.documentElement.classList.remove("no-js");

  const icons = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.3-1.5-5.2 0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9 1.8 1.8 2.9 4.3 2.9 6.9 0 5.4-4.4 9.8-9.8 9.8zm8.4-18.2C18.1 1.3 15.2.1 12 .1 5.5.1.2 5.4.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.7c1.7.9 3.7 1.4 5.6 1.4 6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.4-8.3z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  };
  S.icons = icons;

  const logoMark =
    '<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"/><path d="M8 24c4-4 8-4 12 0s8 4 12 0" fill="none" stroke="#8fdcd5" stroke-width="2.2" stroke-linecap="round"/><path d="M8 18c4-4 8-4 12 0s8 4 12 0" fill="none" stroke="#b48d48" stroke-width="2.2" stroke-linecap="round"/></svg>';

  const page = document.body.dataset.page || "inicio";
  const links = [
    ["inicio", "index.html", "Inicio"],
    ["nosotros", "quienes-somos.html", "¿Quiénes somos?"],
    ["productos", "index.html#productos", "Productos"],
    ["faq", "preguntas-frecuentes.html", "Preguntas"],
    ["contacto", "contacto.html", "Contacto"],
  ];

  const pedidoGeneral = `Hola, vi su página web y quiero pedir ${S.producto}.`;

  // Header
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header" + (document.body.dataset.header === "light" ? " is-light" : "");
    header.innerHTML = `
      <div class="container nav">
        <a class="logo" href="index.html" aria-label="${S.marca} inicio">${logoMark}<span>Sal de Mar<small>Orgánica · Mineralizada</small></span></a>
        <ul class="nav-links" id="nav-links">
          ${links.map(([id, href, label]) => `<li><a href="${href}"${id === page ? ' aria-current="page"' : ""}>${label}</a></li>`).join("")}
        </ul>
        <a class="btn btn-primary nav-cta" href="index.html#productos">Comprar ahora</a>
        <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
      </div>`;

    const toggle = header.querySelector(".menu-toggle");
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open);
    });
    header.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => header.classList.remove("menu-open"))
    );

    const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Footer
  const footer = document.getElementById("site-footer");
  if (footer) {
    const year = new Date().getFullYear();
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="logo" href="index.html">${logoMark}<span>Sal de Mar<small>Orgánica · Mineralizada</small></span></a>
            <p style="margin-top:18px;max-width:36ch">${S.producto}. Sin refinar, sin químicos, empacada con cuidado en ${S.empresa.ciudad}.</p>
            <p class="disclaimer">Este producto es un alimento y no reemplaza tratamientos médicos. Consume sal con moderación como parte de una alimentación balanceada.</p>
          </div>
          <div>
            <h4>Tienda</h4>
            <ul>
              <li><a href="index.html#productos">Productos</a></li>
              <li><a href="quienes-somos.html">¿Quiénes somos?</a></li>
              <li><a href="preguntas-frecuentes.html">Preguntas frecuentes</a></li>
              <li><a href="contacto.html">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Políticas</h4>
            <ul>
              <li><a href="envios-y-devoluciones.html">Envíos, reembolsos y devoluciones</a></li>
              <li><a href="tratamiento-de-datos.html">Tratamiento de datos</a></li>
              <li><a href="terminos-y-condiciones.html">Términos y condiciones</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul>
              <li><a href="${S.linkWhatsApp(pedidoGeneral)}" target="_blank" rel="noopener">WhatsApp</a></li>
              ${S.email ? `<li><a href="mailto:${S.email}">${S.email}</a></li>` : ""}
              ${S.instagram ? `<li><a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a></li>` : ""}
              <li>${S.empresa.ciudad}</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${year} ${S.empresa.razonSocial}${S.empresa.nit ? " · NIT " + S.empresa.nit : ""}. Todos los derechos reservados.</span>
          <span>${S.eslogan}</span>
        </div>
      </div>`;
  }

  // WhatsApp flotante
  const wa = document.createElement("a");
  wa.className = "wa-float";
  wa.href = S.linkWhatsApp(pedidoGeneral);
  wa.target = "_blank";
  wa.rel = "noopener";
  wa.setAttribute("aria-label", "Escríbenos por WhatsApp");
  wa.innerHTML = icons.wa;
  document.body.appendChild(wa);

  // Enlaces de WhatsApp declarados en el HTML: data-wa="mensaje"
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = S.linkWhatsApp(el.dataset.wa || pedidoGeneral);
    el.target = "_blank";
    el.rel = "noopener";
  });
  document.querySelectorAll("[data-requires]").forEach((el) => {
    if (!S[el.dataset.requires]) el.remove();
  });
  document.querySelectorAll("[data-site]").forEach((el) => {
    const value = el.dataset.site.split(".").reduce((o, k) => (o ? o[k] : ""), S);
    if (value) el.textContent = value;
  });

  // Productos
  const grid = document.getElementById("product-grid");
  if (grid) {
    grid.innerHTML = S.productos
      .map(
        (p) => `
        <article class="product reveal" data-id="${p.id}">
          <div class="product-media">
            <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="900" height="1125">
            ${p.etiqueta ? `<span class="product-tag">${p.etiqueta}</span>` : ""}
            <span class="product-weight">${p.peso}</span>
          </div>
          <div class="product-body">
            <h3>${p.nombre}</h3>
            <p>${p.descripcion}</p>
            <div class="price">${S.formatoPrecio(p.precio)}${p.precioAntes ? `<s>${S.formatoPrecio(p.precioAntes)}</s>` : ""}<small class="price-note">+ envío</small></div>
            <div class="buy-row">
              <div class="qty" role="group" aria-label="Cantidad">
                <button type="button" data-step="-1" aria-label="Quitar uno">−</button>
                <output aria-live="polite">1</output>
                <button type="button" data-step="1" aria-label="Agregar uno">+</button>
              </div>
              <a class="btn btn-wa" href="#" target="_blank" rel="noopener">${icons.wa} Pedir por WhatsApp</a>
            </div>
          </div>
        </article>`
      )
      .join("");

    grid.querySelectorAll(".product").forEach((card) => {
      const p = S.productos.find((x) => x.id === card.dataset.id);
      const out = card.querySelector("output");
      const link = card.querySelector(".btn-wa");
      const update = () => {
        const n = Number(out.value || out.textContent);
        link.href = S.linkWhatsApp(
          `Hola, quiero pedir:\n• ${n} x ${p.nombre} (${S.formatoPrecio(p.precio)} c/u)\nTotal productos: ${S.formatoPrecio(p.precio * n)} (sin envío)\n\nMi nombre:\nCiudad / barrio:\nDirección:`
        );
      };
      card.querySelectorAll("[data-step]").forEach((b) =>
        b.addEventListener("click", () => {
          const n = Math.min(20, Math.max(1, Number(out.textContent) + Number(b.dataset.step)));
          out.textContent = n;
          out.value = n;
          update();
        })
      );
      update();
    });
  }

  // Preguntas frecuentes
  document.querySelectorAll("[data-faq]").forEach((list) => {
    const limit = Number(list.dataset.faq) || D.faqs.length;
    list.innerHTML = D.faqs
      .slice(0, limit)
      .map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`)
      .join("");
  });

  // Testimonios (se duplican para el carrusel infinito)
  const tTrack = document.getElementById("t-track");
  if (tTrack) {
    const cards = D.testimonios
      .map(
        (t) => `
        <figure class="t-card">
          <div class="stars" aria-label="5 de 5 estrellas">★★★★★</div>
          <blockquote>“${t.texto}”</blockquote>
          <footer><b>${t.nombre}</b>${t.ciudad}</footer>
        </figure>`
      )
      .join("");
    tTrack.innerHTML = cards + cards.replaceAll('class="t-card"', 'class="t-card" aria-hidden="true"');
  }

  // Videos de uso: solo se muestran si el archivo carga
  const vGrid = document.getElementById("video-grid");
  if (vGrid) {
    vGrid.innerHTML = S.videos
      .map(
        (v) => `
        <figure class="video-card reveal">
          <video muted loop playsinline preload="metadata" poster="${v.poster}">
            <source src="${v.src}" type="video/mp4">
          </video>
          <figcaption>${v.titulo}</figcaption>
        </figure>`
      )
      .join("");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }),
      { threshold: 0.4 }
    );
    vGrid.querySelectorAll("video").forEach((v) => io.observe(v));
  }

  // Revelados al hacer scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // Carrusel de diferenciadores
  const track = document.querySelector(".feature-track");
  if (track) {
    document.querySelectorAll("[data-slide]").forEach((b) =>
      b.addEventListener("click", () => {
        const card = track.querySelector(".feature-card");
        track.scrollBy({ left: Number(b.dataset.slide) * (card.offsetWidth + 24), behavior: "smooth" });
      })
    );
  }
})();
