# Sal de Mar Orgánica Mineralizada — sitio web

Landing page estática (HTML, CSS y JS) para vender un solo producto en dos presentaciones (1 kg y 500 g). Los pedidos llegan por WhatsApp.

## Editar datos
Todo lo editable está en `js/config.js`: número de WhatsApp, precios, correo, razón social, NIT, tiempos de envío.
Preguntas frecuentes y testimonios: `js/data.js`.

## Imágenes y videos
- Imágenes de la web: `assets/img/` (generadas con Higgsfield a partir de `fotos-originales/`).
- Prompts de imágenes y videos: `docs/PROMPTS-HIGGSFIELD.md`.
- Videos de uso: `assets/video/uso-cocina.mp4` y `assets/video/uso-parrilla.mp4`.

## Probar en local
```bash
npx http-server -p 5173 -c-1
```

## Publicar en GitHub Pages
Settings → Pages → Deploy from a branch → `main` / root.
