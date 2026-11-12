# Organigrama interactivo · MPA Jujuy

Sitio estático (HTML + CSS + JavaScript). No necesita instalación ni servidor: funciona en GitHub Pages.

## Estructura

```
organigrama-mpa/
├── index.html                 ← página principal
├── .nojekyll                  ← evita el procesamiento de Jekyll en GitHub Pages
├── README.md
├── css/
│   └── styles.css             ← estilos (modo claro/oscuro, responsive)
├── js/
│   ├── data.js                ← DATOS EDITABLES: dependencias, descripciones, funciones, responsables
│   ├── map-data.js            ← mapa vectorial de Jujuy y coordenadas de localidades
│   └── app.js                 ← lógica: organigrama, fichas, pestañas, mapas, buscador, asistente
└── assets/
    └── img/
        ├── logo-mpa.png
        ├── procurador-general.jpg
        └── procurador-general-adjunto.jpg
```

## Cómo actualizar contenido
- Textos, responsables, funciones y ubicaciones: `js/data.js` (cada dependencia es un bloque con `id`, `t`, `p`, `d`, `q`, `f`, `a`, `c`).
- Fotos: copiarlas en `assets/img/` y agregarlas en `IMG` al inicio de `js/data.js` (la clave es el `id` de la persona).
- Ubicación de un área: agregar `"loc": ["sansalvador"]` en su bloque (localidades disponibles en `js/map-data.js`).

## Nota sobre el asistente
El asistente con IA funciona solo dentro de claude.ai. En GitHub Pages el botón "Asistente" responde por búsqueda
sobre el contenido cargado. El buscador de la parte superior funciona igual en todos lados.
