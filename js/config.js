// Configuración central del sitio. Todo lo que cambie (precios, número, datos legales)
// se edita aquí y se refleja en todas las páginas.
// ⚠️ Los valores marcados con PENDIENTE deben confirmarse antes de publicar.
window.SITE = {
  marca: "Sal de Mar Orgánica",
  producto: "Sal de Mar Orgánica Mineralizada",
  eslogan: "¡Buena es la sal!",

  // Número que recibe los pedidos (formato internacional, sin + ni espacios)
  whatsapp: "573044819878", // PENDIENTE: número definitivo de leads
  email: "", // PENDIENTE: correo de contacto (si queda vacío no se muestra)
  instagram: "", // PENDIENTE: URL del perfil

  empresa: {
    razonSocial: "Sal de Mar Orgánica", // PENDIENTE: razón social o nombre del titular
    nit: "", // PENDIENTE
    ciudad: "Itagüí, Antioquia, Colombia",
    direccion: "", // PENDIENTE (opcional)
  },

  productos: [
    {
      id: "1kg",
      nombre: "Sal Delgada para Preparaciones 1 kg",
      peso: "1 kg",
      precio: 69900,
      precioAntes: null,
      etiqueta: "Más vendida",
      imagen: "assets/img/packshot.webp",
      descripcion: "La presentación familiar. Rinde para semanas de cocina diaria, parrilla, conservas y baños de sal.",
    },
    {
      id: "500g",
      nombre: "Sal de Mar Orgánica 500 g",
      peso: "500 g",
      precio: 39900,
      precioAntes: null,
      etiqueta: "Para probar",
      imagen: "assets/img/packshot.webp", // PENDIENTE: foto real de 500 g
      descripcion: "Ideal para conocerla o para tener a mano en la mesa y en la parrilla.",
    },
  ],

  envio: {
    cobertura: "toda Colombia",
    procesamiento: "1 a 2 días hábiles",
    areaMetropolitana: "1 a 2 días hábiles", // Valle de Aburrá
    nacional: "2 a 5 días hábiles",
    gratisDesde: null, // PENDIENTE: ej. 80000 para envío gratis desde $80.000
  },

  // Animación del banner por scroll. Cuando exista el video del hero, se extraen los
  // cuadros con ffmpeg a assets/hero/frames/ y se pone aquí la cantidad (ej. 120).
  heroFrames: 0,

  // Videos cortos de uso (5 s). Se muestran solo si el archivo existe.
  videos: [
    { src: "assets/video/uso-cocina.mp4", poster: "assets/img/cocina.webp", titulo: "En tu cocina de todos los días" },
    { src: "assets/video/uso-parrilla.mp4", poster: "assets/img/parrilla.webp", titulo: "El secreto de la parrilla" },
  ],
};

window.SITE.formatoPrecio = (valor) =>
  "$" + valor.toLocaleString("es-CO", { maximumFractionDigits: 0 });

window.SITE.linkWhatsApp = (mensaje) =>
  `https://wa.me/${window.SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
